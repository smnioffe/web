
 function loadLineChart(DimensionVar,CategoryVar,dimensionVarLabel,chartType){
d3.selectAll("svg")
       .remove();

var svg = d3.select('#mainChart').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  if (CategoryVar !== "blank"){
categoryVarUpdated= CategoryVar
dimensionVarLabelUpdated=dimensionVarLabel
}

	if (DimensionVar !== "blank"){
dimensionVarUpdated=DimensionVar
}

d3.select("#Title").text(dimensionVarLabelUpdated +" by "+dimensionVarUpdated);


var x = d3.scale.ordinal().rangeRoundBands([0, width]);
var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#6D594A", "#CAC5B0", "#69A399", "#B8BFC6", "#8BA4B5"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
	.ticks(7)
    .tickFormat(d3.format(".0f'"));

var line = d3.svg.line()
    .interpolate("bundle")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });
	
	console.log(chartType)
var csvFile 
if(chartType=="line") {csvFile="data/category4.csv";}
	else if (chartType=="lineG") {csvFile="data/category.csv";}


d3.csv(csvFile
, function(error, data) {
  if (error) throw error;
  
  
  
   var categoryNames = d3.keys(data[0]).filter(function(key) { return key !== "type" & key !== "dimension"  & key !== "n" & key !== "category" & key !== "Efficacy" & key !== "Safety" & key !== "Convenience" & key !== "Insurance"  }); 
  
color.domain(d3.keys(data[0]).filter(function(key) { return key !== "type" & key !== "dimension"  & key !== "category" & key !== "n"& key !== "Efficacy" & key !== "Safety" & key !== "Convenience" & key !== "Insurance" ;}));

    var dataFiltered = data.filter(function(d){ return d.dimension==dimensionVarUpdated && d.category==categoryVarUpdated && d.type !== "Overall"});

  dataFiltered.forEach(function(d) {
    d.date = d.type;
	nVar=d.n;
  });

  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: dataFiltered.map(function(d) {
        return {date: d.date, temperature: +d[name]};
      })
    };
  });


x.domain(dataFiltered.map(function(d) { return d.type; }));
  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Rating");

  var medication = svg.selectAll(".medication")
      .data(cities)
    .enter().append("g")
      .attr("class", "medication");

  medication.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  medication.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
	  
	  
	  

	  
  var legend = svg.selectAll(".legend")
      .data(categoryNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
	  .attr("y", -120)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", -112)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });	  
	  
	  
	  
});

		}
		
	