import { useState, useEffect } from "react";

interface Project {
    id: number;
    name: string;
    author: string;
    languages: string[];
    description: string;
    url?: string;
}

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [clickedProject, setClickedProject] = useState<number | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/projects.json");
                if (!response.ok) throw new Error("Failed to fetch projects");
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

    const handleProjectClick = (project: Project) => {
        if (!project.url || project.url.trim() === "") {
            alert("No valid URL available for this project.");
            return;
        }

        setClickedProject(project.id);

        setTimeout(() => {
            window.open(project.url, "_blank", "noopener,noreferrer");
            setClickedProject(null);
        }, 500);
    };

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p className="text-danger">Error: {error}</p>;

    return (
        <div className="container mt-4">
            <h2>Projects</h2>
            <div className="row">
                {projects.map((project) => (
                    <div key={project.id} className="col-md-6 col-lg-4 mb-4">
                        <div
                            className="card p-3 project-card"
                            onClick={() => handleProjectClick(project)}
                            style={{
                                backgroundColor: "var(--card-bg)",
                                color: "var(--card-text)",
                                border: "1px solid var(--text-color)",
                                cursor: clickedProject === project.id ? "wait" : "pointer",
                                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                                opacity: clickedProject === project.id ? 0.5 : 1,
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            <h4>{project.name}</h4>
                            <p><strong>Author:</strong> {project.author}</p>
                            <p><strong>Languages:</strong> {project.languages.join(", ")}</p>
                            <p>{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
