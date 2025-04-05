import { useState } from "react";
import { Project } from "../types/Project";
import { addProject } from "../api/ProjectsAPI";

interface NewProjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewProjectForm = ({ onSuccess, onCancel }: NewProjectFormProps) => {
  const [formData, setFormData] = useState<Project>({
    projectId: 0,
    projectName: "",
    projectType: "",
    projectRegionalProgram: "",
    projectImpact: 0,
    projectPhase: "",
    projectFunctionalityStatus: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting project:", formData);
    await addProject(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new Project</h2>
      <label>
        Project Name:
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Project Type:
        <input
          type="text"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Regional Program:
        <input
          type="text"
          name="projectRegionalProgram"
          value={formData.projectRegionalProgram}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Impact:
        <input
          type="number"
          name="projectImpact"
          value={formData.projectImpact}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Project Phase:
        <input
          type="text"
          name="projectPhase"
          value={formData.projectPhase}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Project Functionality Status:
        <input
          type="text"
          name="projectFunctionalityStatus"
          value={formData.projectFunctionalityStatus}
          onChange={handleChange}
        ></input>
      </label>
      <button type="submit">Add Project</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewProjectForm;
