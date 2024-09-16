import React from "react";
import { DndContext } from "@dnd-kit/core";
import ControlPanel from "./components/ControlPanel";
import Canvas from "./components/Canvas";
import DraggableElement from "./components/DraggableElement";
import RotationControls from "./components/RotationControls";
import DragControl from "./components/DragControls";
import ProjectList from "./components/ProjectList"; // New component for project list
import DeleteControl from './components/DeleteControl';
import useProjects from "./hooks/useProjects"; // Import the new custom hook

const App = () => {
  const {
    projects,
    currentProject,
    currentProjectId,
    addProject,
    selectProject,
    addElement,
    updateElement,
    deleteElement,
    saveProject,
  } = useProjects();

  const canvasRef = React.useRef(null);

  //console.log(currentProject.elements);
  
  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const { id } = active;

    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();

    const element = currentProject?.elements[id];
    if (element) {
      const newTop = element.style.top + delta.y;
      const newLeft = element.style.left + delta.x;

      const adjustedTop = Math.max(0, Math.min(canvasRect.height - 100, newTop));
      const adjustedLeft = Math.max(0, Math.min(canvasRect.width - 100, newLeft));

      updateElement(id, {
        style: { ...element.style, top: adjustedTop, left: adjustedLeft },
      });
    }
  };

  return (
    <div className="App">
      {currentProjectId ? (
        <DndContext onDragEnd={handleDragEnd}>
          <div>
            {/* <button onClick={() => selectProject(null)}>Back to Projects</button> */}
            <ControlPanel addElement={addElement} setCurrentProjectId={selectProject} saveProject={saveProject}/>
            <Canvas ref={canvasRef}>
              {Object.values(currentProject?.elements || {}).map((el) => (
                <div className="elementsWrapper" key={el.id}>
                  <DraggableElement
                    id={el.id}
                    type={el.type}
                    style={el.style}
                    rotation={el.rotation}
                    content={el.content}
                    onTextChange={(newText) => updateElement(el.id, { content: newText })}
                    updateSize={(id, newSize) =>
                      updateElement(el.id, { style: { ...el.style, ...newSize } })
                    } // <-- Pass updateSize
                  />
                  
                  <RotationControls id={el.id} updateRotation={(id, newRotation) => {updateElement(el.id, { rotation: newRotation });
                console.log(newRotation, "Hii");}} position={el.style} />
                  <DragControl id={el.id} position={el.style} />
                  <DeleteControl onDelete={() => deleteElement(el.id)} position={el.style} />
                </div>
              ))}
            </Canvas>
          </div>
        </DndContext>
      ) : (
        <ProjectList projects={Object.values(projects)} onAddProject={addProject} onSelectProject={selectProject} />
      )}
    </div>
  );
};

export default App;
