// set the dimensions and margins of the graph
const width_b = 600,
    height_b = 450;

// append the svg object to the body of the page
const svg_b = d3.select("#black3")
    .append("svg")
    .attr("width", width_b)
    .attr("height", height_b)
    .append("g")
    .attr("transform", `translate(225, 225)`);

/*Create chart title*/
svg_b.append("text")
    .attr("x",-120)
    .attr("y",-200)
    .attr("font-size","15px")
    .text("Number of kills in VALORANT Masters 2021");

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = 200 ;

// set the color scale
const color_b = d3.scaleOrdinal()
    .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'])

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.K; });

d3.csv("d3/player_stats.csv").then(function(data){

    console.log(pie(data));

    data.sort((a,b)=>d3.ascending(a.Team,b.Team));

    container_b = svg_b.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    container_b.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color_b(d.data.Team); })
        .style("stroke",function(d) { return color_b(d.data.Team); });

    svg_b.append("g")
        .attr("class", "legendQuant")
        .attr("transform", "translate(200,-200)");

    var legend_b = d3.legendColor()
        .useClass(false)
        .title("legend")
        .titleWidth(100)
        .scale(color_b);

    svg_b.select(".legendQuant")
        .call(legend_b);
})

