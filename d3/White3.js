// set the dimensions and margins of the graph
const margin_w = {top: 50, right: 30, bottom: 50, left: 100},
    width_w = 550 - margin_w.left - margin_w.right,
    height_w = 450 - margin_w.top - margin_w.bottom;

// append the svg object to the body of the page
const svg_w = d3.select("#white3")
    .append("svg")
    .attr("width", width_w + margin_w.left + margin_w.right)
    .attr("height", height_w + margin_w.top + margin_w.bottom)
    .append("g")
    .attr("transform",`translate(${margin_w.left},${margin_w.top})`);

/*Create chart title*/
svg_w.append("text")
    .attr("x",20)
    .attr("y",-20)
    .attr("font-size","15px")
    .text("Number of kills in VALORANT Masters 2021");


var xScale_w = d3.scaleLinear().range([0,width]);
var yScale_w = d3.scaleBand().range([height,0]);

const mapped_data = new Map();

d3.csv("d3/player_stats.csv").then(function(data){

    data.forEach(function(d,i){
            if(mapped_data.has(d.Team))
            {
                mapped_data.set(d.Team,(mapped_data.get(d.Team)+(+d.K)));
            }
            else
            {
                mapped_data.set(d.Team,+d.K);
            }
    })

    const data_sorted = new Map([...mapped_data.entries()].sort((a, b) => a[1] - b[1]));

    yScale_w.domain(data_sorted.keys());
    xScale_w.domain([0,1300]);

    var bars = svg_w.selectAll(".bar")
        .data(data_sorted)
        .enter()
        .append("g")

    bars.append("rect")
        .attr("class","bar")
        .attr("x",0)
        .attr("y",function(d){return yScale_w(d[0])+5;})
        .attr("width",function(d){return xScale_w(d[1]);})
        .attr("height",20)
        .attr("fill","#1f78b4");

    svg_w.append("g")
        .attr("transform", `translate(0, 330)`)
        .call(d3.axisBottom(xScale_w))
        .append("text")
        .attr("x",200)
        .attr("y",30)
        .attr("fill", "black")
        .text("Kills");

    // Add Y axis
    svg_w.append("g")
        .call(d3.axisLeft(yScale_w));

});