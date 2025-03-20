import { useState, useEffect } from "react";

interface Project {
  id: number;
  name: string;
  author: string;
  languages: string[];
  description: string;
  url: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/projects.json"); // ✅ Fetch from public/
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Projects</h2>
      <ul className="list-group">
        {projects.map((project) => (
          <li
            key={project.id}
            className="list-group-item"
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--card-text)",
              border: "1px solid var(--text-color)",
            }}
          >
            <h4>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-color)" }}
              >
                {project.name}
              </a>
            </h4>
            <p><strong>Author:</strong> {project.author}</p>
            <p><strong>Languages:</strong> {project.languages.join(", ")}</p>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
