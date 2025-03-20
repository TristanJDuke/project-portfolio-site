import { useState } from "react";

const skillsData = [
  { id: 1, name: "React", category: "Frontend" },
  { id: 2, name: "Node.js", category: "Backend" },
  { id: 3, name: "JavaScript", category: "Frontend" },
  { id: 4, name: "Python", category: "Backend" },
  { id: 5, name: "CSS", category: "Frontend" },
  { id: 6, name: "MongoDB", category: "Database" },
  { id: 7, name: "Godot", category: "Engine" },
  { id: 8, name: "Unity", category: "Engine" },

];

export default function SkillList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const filteredSkills = skillsData.filter((skill) => {
    return (
      (category === "All" || skill.category === category) &&
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mt-4">
      <h2>My Skills</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search skills..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)", border: "1px solid var(--text-color)" }}
      />

      {/* Category Filter */}
      <select
        className="form-select mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)", border: "1px solid var(--text-color)" }}
      >
        <option value="All">All Categories</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Database">Database</option>
        <option value="Engine">Engine</option>

      </select>

      {/* Skill List Display */}
      <ul className="list-group">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <li
                key={skill.id}
                className="list-group-item"
                style={{
                    backgroundColor: "var(--card-bg)",
                    color: "var(--card-text)",
                    border: "1px solid var(--text-color)",
                }}
            >
                {skill.name} - <span className="badge bg-primary">{skill.category}</span>
            </li>
          ))
        ) : (
          <li
            className="list-group-item text-muted"
            style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}
          >
            No skills found.
          </li>
        )}
      </ul>
    </div>
  );
}
