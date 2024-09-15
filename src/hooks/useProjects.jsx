import { useState } from "react";

const useProjects = () => {
  const [projects, setProjects] = useState({});
  const [currentProjectId, setCurrentProjectId] = useState(null);

  // Add a new project
  const addProject = () => {
    const newId = `project-${Object.keys(projects).length}`;
    const newProject = {
      id: newId,
      name: `Project ${Object.keys(projects).length + 1}`,
      elements: {},
    };
    setProjects((prevProjects) => ({
      ...prevProjects,
      [newId]: newProject,
    }));
    setCurrentProjectId(newId);
  };

  // Select a project
  const selectProject = (projectId) => setCurrentProjectId(projectId);

  // Add element to the current project
  const addElement = (type, content = "") => {
    const project = projects[currentProjectId];
    const newElementId = `element-${Object.keys(project.elements).length}`;
    const newElement = {
      id: newElementId,
      type,
      style: {
        position: "absolute",
        top: Math.random() * 300,
        left: Math.random() * 300,
      },
      rotation: 0,
      content: type === "text" ? "Editable text" : content,
    };

    setProjects((prevProjects) => ({
      ...prevProjects,
      [currentProjectId]: {
        ...project,
        elements: {
          ...project.elements,
          [newElementId]: newElement,
        },
      },
    }));
  };

  // Update element within the current project
  const updateElement = (elementId, newProperties) => {
    const project = projects[currentProjectId];

    setProjects((prevProjects) => ({
      ...prevProjects,
      [currentProjectId]: {
        ...project,
        elements: {
          ...project.elements,
          [elementId]: {
            ...project.elements[elementId],
            ...newProperties,
          },
        },
      },
    }));
  };

  // Delete an element
  const deleteElement = (elementId) => {
    const { [elementId]: _, ...restElements } = projects[currentProjectId].elements;

    setProjects((prevProjects) => ({
      ...prevProjects,
      [currentProjectId]: {
        ...projects[currentProjectId],
        elements: restElements,
      },
    }));
  };

  const currentProject = projects[currentProjectId];

  return {
    projects,
    currentProject,
    currentProjectId,
    addProject,
    selectProject,
    addElement,
    updateElement,
    deleteElement,
  };
};

export default useProjects;
