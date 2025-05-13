import SkillList from "../components/SkillList";

export default function About() {
  document.title = "About Me | Portfolio";

  return (
    <div>
      <h1>About Me</h1>
      <SkillList />
    </div>
  );
}
