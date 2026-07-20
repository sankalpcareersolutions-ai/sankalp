import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface FlowChartProps {
  category: string;
}

export default function CareerFlowChart({ category }: FlowChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous rendering

    const width = 800;
    const height = 400;
    
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .style("max-width", "100%");

    // Define data based on category
    let nodesData: { id: string, label: string, level: number }[] = [];
    let linksData: { source: string, target: string }[] = [];

    if (category.toLowerCase() === 'defence') {
      nodesData = [
        { id: "1", label: "NDA (10+2)", level: 1 },
        { id: "2", label: "CDS/OTA (Grad)", level: 1 },
        { id: "3", label: "Cadet Training", level: 2 },
        { id: "4", label: "Lieutenant / Flying Officer", level: 3 },
        { id: "5", label: "Captain / Flight Lt", level: 4 },
        { id: "6", label: "Major / Sqn Ldr", level: 5 },
        { id: "7", label: "Lt. Colonel / Wg Cdr", level: 6 },
      ];
      linksData = [
        { source: "1", target: "3" },
        { source: "2", target: "3" },
        { source: "3", target: "4" },
        { source: "4", target: "5" },
        { source: "5", target: "6" },
        { source: "6", target: "7" },
      ];
    } else if (category.toLowerCase() === 'drdo' || category.toLowerCase() === 'isro' || category.toLowerCase() === 'research') {
       nodesData = [
        { id: "1", label: "10+2 (PCM)", level: 1 },
        { id: "2", label: "B.Tech / B.Sc", level: 2 },
        { id: "3", label: "GATE / Exam", level: 3 },
        { id: "4", label: "Scientist B", level: 4 },
        { id: "5", label: "Scientist C", level: 5 },
        { id: "6", label: "Scientist D", level: 6 },
      ];
      linksData = [
        { source: "1", target: "2" },
        { source: "2", target: "3" },
        { source: "3", target: "4" },
        { source: "4", target: "5" },
        { source: "5", target: "6" },
      ];
    } else {
      nodesData = [
        { id: "1", label: "Education (Degree)", level: 1 },
        { id: "2", label: "Entrance / Interview", level: 2 },
        { id: "3", label: "Entry Level Role", level: 3 },
        { id: "4", label: "Mid-Level Management", level: 4 },
        { id: "5", label: "Senior Leadership", level: 5 },
      ];
      linksData = [
        { source: "1", target: "2" },
        { source: "2", target: "3" },
        { source: "3", target: "4" },
        { source: "4", target: "5" },
      ];
    }

    const maxLevel = Math.max(...nodesData.map(d => d.level));
    
    // Assign coordinates
    nodesData.forEach(d => {
       const levelNodes = nodesData.filter(n => n.level === d.level);
       const index = levelNodes.findIndex(n => n.id === d.id);
       
       // @ts-ignore
       d.x = 100 + (d.level - 1) * ((width - 200) / (maxLevel - 1 || 1));
       // @ts-ignore
       d.y = height/2 - ((levelNodes.length - 1) * 60) / 2 + (index * 60);
    });

    const defs = svg.append("defs");
    
    defs.append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "#D4AF37")
      .style("stroke", "none");

    const link = svg.append("g")
      .attr("stroke", "#D4AF37")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)
      .selectAll("path")
      .data(linksData)
      .enter().append("path")
      .attr("d", (d) => {
         const sourceNode = nodesData.find(n => n.id === d.source) as any;
         const targetNode = nodesData.find(n => n.id === d.target) as any;
         if (sourceNode && targetNode) {
            // Bezier curve for flow
            return `M${sourceNode.x + 80},${sourceNode.y} C${sourceNode.x + 120},${sourceNode.y} ${targetNode.x - 40},${targetNode.y} ${targetNode.x - 10},${targetNode.y}`;
         }
         return "";
      })
      .attr("fill", "none")
      .attr("marker-end", "url(#arrowhead)");

    const node = svg.append("g")
      .selectAll("g")
      .data(nodesData)
      .enter().append("g")
      // @ts-ignore
      .attr("transform", d => `translate(${d.x},${d.y})`);

    node.append("rect")
      .attr("x", -75)
      .attr("y", -20)
      .attr("width", 150)
      .attr("height", 40)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", "#051221")
      .attr("stroke", "#D4AF37")
      .attr("stroke-width", 1.5)
      .style("filter", "drop-shadow(0px 4px 6px rgba(0,0,0,0.4))");

    node.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("fill", "#FFFAEB")
      .attr("font-family", "ui-sans-serif, system-ui, -apple-system, sans-serif")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .text(d => d.label)
      .style("pointer-events", "none");
      
    // Add interactions
    node.on("mouseover", function() {
        d3.select(this).select("rect").attr("fill", "#0a223f").attr("stroke-width", 2);
    })
    .on("mouseout", function() {
        d3.select(this).select("rect").attr("fill", "#051221").attr("stroke-width", 1.5);
    });

  }, [category]);

  return (
    <div className="mt-12 bg-navy-950/80 border border-gold-600/20 rounded-2xl p-6 md:p-8 animate-fade-in w-full overflow-x-auto">
        <div className="mb-6 border-b border-gold-500/20 pb-4">
            <h3 className="text-xl md:text-2xl font-black text-lightyellow-100 uppercase tracking-tight font-sans">
              Career Progression Flow
            </h3>
            <p className="text-xs text-lightyellow-200/70 mt-1 max-w-xl">
              A visual representation of the typical hierarchical progression for this career track.
            </p>
        </div>
        <div className="w-full min-w-[700px] h-[400px]">
           <svg ref={svgRef}></svg>
        </div>
    </div>
  );
}
