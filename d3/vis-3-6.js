//Parsing the data that we 
var data = d3.csvParse( iris, d3.autoType)
//console.log prints or send sout a fiunction to the browser console
console.log (data);

var w = 800;
var h = 800;
var margin = 20;
var height= h-20;
var width= w-20;

var chart = d3.select("#vis")
              .append("svg") 
              .attr("width", w)
              .attr("height", h)
              .style("background-color", "#fef9f1")

const xScale = d3.scaleLinear()
         //    .domain([0, d3.max(data, d=>d.PetalWidthCm)]) 
               //'data,' to call the data source
            .domain([0,15])
            .range([margin,width])
const x2Scale = d3.scaleLinear()
            .domain([15,0])
            .range([margin,width])


const yScale= d3.scaleLinear()
         // .domain([d3.max(data, d=>d.PetalLengthCm),0])
            .domain([15,0])
            .range([margin,height])
const y2Scale= d3.scaleLinear()
            .domain([0,15])
            .range([margin,height])

const colScale =d3.scaleOrdinal(d3.schemeSet2)
                  .domain(data.map(d=> d.Species))

const x1Axis= chart.append("g")
                   .call( d3.axisBottom(xScale))
                   .attr("transform",`translate(0,${height})`)
// `translate opposed to "translate(" + margin + "," + margin +")". The back tick makes transform into a function as opposed to a string.
const y1Axis= chart.append("g")
                   .call(d3.axisLeft(yScale))
                   .attr("transform",`translate(${margin},0)`)   
const x2Axis= chart.append("g")
                   .call(d3.axisTop(x2Scale))
                   .attr("transform",`translate(0,${margin})`)
const y2Axis= chart.append("g")
                   .call(d3.axisRight(y2Scale))
                   .attr("transform",`translate(${width},0)`) 


var viz=  chart.selectAll("circle")
                 .data(data)
     viz.enter()
        .append("circle")
        .attr("cx",d=>xScale(d.PetalWidthCm))
        .attr("cy",d=>yScale(d.PetalLengthCm))
        .attr("r",4)
        .attr("fill",d=>colScale(d.Species))
        .attr("fill-opacity", 0.8)


     viz.enter()
        .append("circle")
        .attr("cx",d=>x2Scale(d.SepalWidthCm))
        .attr("cy",d=>y2Scale(d.SepalLengthCm))
        .attr("r",4)
        .attr("fill","none")
        .attr("stroke",d=>colScale(d.Species))
        .attr("stroke-width",2)
        .attr("fill-opacity", 0.8)
       
     viz.enter()
        .append("line")
        .attr("x1",d=>xScale(d.PetalWidthCm))
        .attr("y1",d=>yScale(d.PetalLengthCm))
        .attr("x2",d=>x2Scale(d.SepalWidthCm))
        .attr("y2",d=>y2Scale(d.SepalLengthCm))
        .attr("stroke",d=>colScale(d.Species))
        .attr("stroke-width",0.25)
        .attr("fill-opacity", 0.1)

    
    




