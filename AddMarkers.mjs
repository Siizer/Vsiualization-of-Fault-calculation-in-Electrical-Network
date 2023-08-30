// Define arrow marker
export function Vmarker(svg, ObjColor, arrowSize, colors) {
 svg.append("defs").selectAll("marker")
    .data(ObjColor)
    .enter().append("marker")
    .attr("id", d => `arrow-${d}`)
    .attr("viewBox", ""+(-arrowSize)+" "+(-arrowSize)+" "+ 2*arrowSize+" 10")
    .attr("refX", arrowSize)
    .attr("refY", 0)
    .attr("markerWidth", arrowSize)
    .attr("markerHeight", arrowSize)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .style("fill", d => colors[d]);
    return { svg };
}
