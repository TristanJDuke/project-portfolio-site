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

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search skills..."
          className="form-control themed-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <select
          className="form-select themed-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
        </select>
      </div>

      <div className="row">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div key={skill.id} className="col-md-4 col-sm-6 mb-2">
              <div className="card p-1 themed-input">
                {skill.name} - <span className="badge bg-primary">{skill.category}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No skills found.</p>
        )}
      </div>
    </div>
  );
}
