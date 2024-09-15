import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import ControlPanel from "./components/ControlPanel";
import Canvas from "./components/Canvas";
import DraggableElement from "./components/DraggableElement";
import RotationControls from "./components/RotationControls";
import DragControl from "./components/DragControls";
import ProjectList from "./components/ProjectList"; // New component for project list
import "./App.css";
import DeleteControl from './components/DeleteControl';

const App = () => {
  const [projects, setProjects] = useState([]); // Manage multiple projects
  const [currentProjectId, setCurrentProjectId] = useState(null); // Currently selected project
  const canvasRef = React.useRef(null);

  // Add a new project
  const addProject = () => {
    const newProject = {
      id: `project-${projects.length}`,
      name: `Project ${projects.length + 1}`,
      elements: [],
    };
    setProjects([...projects, newProject]);
    setCurrentProjectId(newProject.id);
  };

  const selectProject = (projectId) => {
    setCurrentProjectId(projectId);
  };

  const addElement = (type, content = "") => {
    const newElement = {
      id: `element-${projects.find(p => p.id === currentProjectId)?.elements.length || 0}`,
      type,
      style: {
        position: "absolute",
        top: Math.random() * 300,
        left: Math.random() * 300,
      },
      rotation: 0,
      content: type === "text" ? "Editable text" : content, // Content for images or videos
    };
    setProjects(projects.map(project =>
      project.id === currentProjectId
        ? { ...project, elements: [...project.elements, newElement] }
        : project
    ));
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const { id } = active;

    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();

    setProjects(projects.map((project) =>
      project.id === currentProjectId
        ? {
            ...project,
            elements: project.elements.map((el) => {
              if (el.id === id) {
                const newTop = el.style.top + delta.y;
                const newLeft = el.style.left + delta.x;

                const adjustedTop = Math.max(0, Math.min(canvasRect.height - 100, newTop));
                const adjustedLeft = Math.max(0, Math.min(canvasRect.width - 100, newLeft));

                return {
                  ...el,
                  style: {
                    ...el.style,
                    top: adjustedTop,
                    left: adjustedLeft,
                  },
                };
              }
              return el;
            }),
          }
        : project
    ));
  };

  const updateElementRotation = (id, newRotation) => {
    setProjects(projects.map((project) =>
      project.id === currentProjectId
        ? {
            ...project,
            elements: project.elements.map((el) =>
              el.id === id ? { ...el, rotation: newRotation } : el
            ),
          }
        : project
    ));
  };

  const handleTextChange = (id, newText) => {
    setProjects(projects.map((project) =>
      project.id === currentProjectId
        ? {
            ...project,
            elements: project.elements.map((el) =>
              el.id === id ? { ...el, content: newText } : el
            ),
          }
        : project
    ));
  };

  // Delete element handler
  const handleDelete = (id) => {
    setProjects(projects.map((project) =>
      project.id === currentProjectId
        ? { ...project, elements: project.elements.filter((el) => el.id !== id) }
        : project
    ));
  };

  // Get current project elements
  const currentProject = projects.find((p) => p.id === currentProjectId);

  return (
    <div className="App">
      {currentProjectId ? (
        <DndContext onDragEnd={handleDragEnd}>
          <div>
            <button onClick={() => setCurrentProjectId(null)}>Back to Projects</button>
            <ControlPanel addElement={addElement} setCurrentProjectId={setCurrentProjectId} />
            <Canvas ref={canvasRef}>
              {currentProject?.elements.map((el) => (
                <div className="elementsWrapper" key={el.id}>
                  <DraggableElement
                    id={el.id}
                    type={el.type}
                    style={el.style}
                    rotation={el.rotation}
                    content={el.content}
                    onTextChange={(newText) => handleTextChange(el.id, newText)}
                    onDelete={() => handleDelete(el.id)} // Pass delete handler
                  />
                  <RotationControls id={el.id} updateRotation={updateElementRotation} position={el.style} />
                  <DragControl id={el.id} position={el.style} />
                  <DeleteControl onDelete={() => handleDelete(el.id)}position={el.style}/>
                </div>
              ))}
            </Canvas>
          </div>
        </DndContext>
      ) : (
        <ProjectList
          projects={projects}
          onAddProject={addProject}
          onSelectProject={selectProject}
        />
      )}
    </div>
  );
};

export default App;
