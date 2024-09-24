import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

const useProjects = () => {
  const [projects, setProjects] = useState({});
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // Track saving state

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
      setIsSaving(true); // Start saving
      await setDoc(doc(db, "projects", currentProjectId), projects[currentProjectId]);
      console.log("Project saved!");
      setIsSaving(false); // End saving
    }
  };

  const selectProject = (projectId) => setCurrentProjectId(projectId);

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
    saveProject,
    isSaving, // Expose isSaving state
  };
};

export default useProjects;
