import ProjectList from "../components/ProjectList";

export default function Projects() {
  document.title = "Projects | Portfolio";
    return (
      <div>
        <h1>Projects</h1>
        <p>Details about my projects will go here.</p>
        <ProjectList />
      </div>
    );
  }
  