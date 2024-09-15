import React from "react";

const ProjectList = ({ projects, onAddProject, onSelectProject }) => {
  return (
    <div>
      <h1>Your Projects</h1>
      <button onClick={onAddProject}>Create New Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name}
            <button onClick={() => onSelectProject(project.id)}>Open</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
