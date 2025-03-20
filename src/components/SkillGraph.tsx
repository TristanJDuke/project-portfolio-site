//THIS WAS AN ATTEMPT TO MAKE MY SKILLS A GRAPH BUT IVE GIVEN UP FOR NOW


// import { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";

// const skillsData = [
//   { id: "React", category: "Frontend" },
//   { id: "JavaScript", category: "Frontend" },
//   { id: "CSS", category: "Frontend" },
//   { id: "Node.js", category: "Backend" },
//   { id: "Python", category: "Backend" },
//   { id: "MongoDB", category: "Database" },
//   { id: "SQL", category: "Database" },
// ];

// // Define links between categories
// const linksData = [
//   { source: "Frontend", target: "React" },
//   { source: "Frontend", target: "JavaScript" },
//   { source: "Frontend", target: "CSS" },
//   { source: "Backend", target: "Node.js" },
//   { source: "Backend", target: "Python" },
//   { source: "Database", target: "MongoDB" },
//   { source: "Database", target: "SQL" },
// ];

// export default function SkillGraph() {
//   const svgRef = useRef(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const width = 500, height = 400;

//     // Create simulation
//     const simulation = d3
//       .forceSimulation(skillsData)
//       .force("link", d3.forceLink(linksData).id((d: any) => d.id))
//       .force("charge", d3.forceManyBody().strength(-100))
//       .force("center", d3.forceCenter(width / 2, height / 2));

//     // Select SVG and clear it
//     const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
//     svg.selectAll("*").remove();

//     // Draw links (edges)
//     const link = svg
//       .selectAll("line")
//       .data(linksData)
//       .enter()
//       .append("line")
//       .attr("stroke", "#999")
//       .attr("stroke-width", 1.5);

//     // Draw nodes (skills)
//     const node = svg
//       .selectAll("circle")
//       .data(skillsData)
//       .enter()
//       .append("circle")
//       .attr("r", 10)
//       .attr("fill", (d: { category: string }) => d.category === "Frontend" ? "blue" : d.category === "Backend" ? "green" : "red")
//       .call(
//   d3
//     .drag() // ✅ Remove explicit type arguments
//     .on("start", (event: any, d: SkillNode) => { 
//       if (!event.active) simulation.alphaTarget(0.3).restart();
//       d.fx = d.x;
//       d.fy = d.y;
//     })
//     .on("drag", (event: any, d: SkillNode) => {
//       d.fx = event.x;
//       d.fy = event.y;
//     })
//     .on("end", (event: any, d: SkillNode) => {
//       if (!event.active) simulation.alphaTarget(0);
//       d.fx = null;
//       d.fy = null;
//     })
// );
//     // Add skill labels
//     const text = svg
//       .selectAll("text")
//       .data(skillsData)
//       .enter()
//       .append("text")
//       .text((d) => d.id)
//       .attr("font-size", "12px")
//       .attr("fill", "white");

//     // Update positions on tick
//     simulation.on("tick", () => {
//       link
//         .attr("x1", (d: any) => d.source.x)
//         .attr("y1", (d: any) => d.source.y)
//         .attr("x2", (d: any) => d.target.x)
//         .attr("y2", (d: any) => d.target.y);

//       node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

//       text.attr("x", (d: any) => d.x + 12).attr("y", (d: any) => d.y + 4);
//     });

//     return () => simulation.stop();
//   }, []);

//   return (
//     <div className="text-center">
//       <h2>Interactive Skill Graph</h2>

//       {/* Search Box */}
//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="Search skills..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {/* Graph Visualization */}
//       <svg ref={svgRef}></svg>
//     </div>
//   );
// }
