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

/*Create chart title*/
svg.append("text")
    .attr("x",30)
    .attr("y",15)
    .attr("font-size","15px")
    .text("Constructor's Championship Points after first 3 races (2021 vs 2022) ");

var xScale = d3.scaleBand().range([0,width]);
var yScale = d3.scaleLinear().range([height,0]);
var color = d3.scaleOrdinal().range(['#e41a1c','#377eb8']);
var xScale2 = d3.scaleBand();

// Parse the Data
d3.csv("d3/data.csv").then( function(data) {

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = data.map(d => d.Team)

    console.log(groups)

    // Add X axis
    xScale
        .domain(groups)
        .padding([0.2])
    container_g.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickSize(0));

    // Add Y axis
    yScale
        .domain([0,110])
    container_g.append("g")
        .call(d3.axisLeft(yScale));

    // Another scale for subgroup position?
    xScale2
        .domain(subgroups)
        .range([0,xScale.bandwidth()])
        .padding([0.05])

    // color palette = one color per subgroup
    color.domain(subgroups)

    // Show the bars
    container_g.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .join("g")
        .attr("transform", d => `translate(${xScale(d.Team)}, 0)`)
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .join("rect")
        .attr("x", d => xScale2(d.key))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale2.bandwidth())
        .attr("height", d => height - yScale(d.value))
        .attr("fill", d => color(d.key));

    svg.append("g")
        .attr("class", "legendQuant")
        .attr("transform", "translate(400,100)");

    var legend = d3.legendColor()
        .labelFormat(d3.format(".2f"))
        .useClass(false)
        .title("legend")
        .titleWidth(100)
        .scale(color);

    svg.select(".legendQuant")
        .call(legend);
})