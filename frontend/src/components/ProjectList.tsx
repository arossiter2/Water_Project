import { useEffect, useState } from "react";
import { Project } from "../types/Project";
import { useNavigate } from "react-router-dom";
import { fetchProjects } from "../api/ProjectsAPI";
import Pagination from "./Pagination";

type ProjectListProps = {
  selectedCategories: string[];
};

function ProjectList({ selectedCategories }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects(pageSize, pageNum, selectedCategories);

        if (data) {
          setProjects(data.projects);
          setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
          setError(null);
        } else {
          setError("No data returned from server.");
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>loading projects...</p>;
  if (error) return <p className="text-red-500">Error</p>;

  return (
    <>
      <br />
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          <h3 className="cardTitle">{p.projectName}</h3>
          <div className="cardBody">
            <ul className="list-unstyled">
              <li>
                <strong>Project Type: </strong>
                {p.projectType}
              </li>
              <li>
                <strong>Regional Program:</strong> {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact:</strong> {p.projectImpact} Individuals Served
              </li>
              <li>
                <strong>Project Phase:</strong> {p.projectPhase}
              </li>
              <li>
                <strong>Project Status: </strong>
                {p.projectFunctionalityStatus}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donate/${p.projectName}/${p.projectId}`)
              }
            >
              Donate
            </button>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default ProjectList;
