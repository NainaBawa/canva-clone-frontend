import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

const useProjects = () => {
  const [projects, setProjects] = useState({});
  const [currentProjectId, setCurrentProjectId] = useState(null);

  // Fetch projects from Firestore on load
  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = {};
      querySnapshot.forEach((doc) => {
        projectsData[doc.id] = doc.data();
      });
      setProjects(projectsData);
    };
    fetchProjects();
  }, []);

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

  // Save current project to Firestore
  const saveProject = async () => {
    if (currentProjectId) {
      await setDoc(doc(db, "projects", currentProjectId), projects[currentProjectId]);
      console.log("Project saved!");
    }
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
      content: type === "text" ? "Editable text" : content, // Save the URL here
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
    saveProject, // Expose saveProject method
  };
};

export default useProjects;
