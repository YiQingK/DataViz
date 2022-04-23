// set the dimensions and margins of the graph
const margin = {top: 50, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#white2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var container_g = svg
    .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);