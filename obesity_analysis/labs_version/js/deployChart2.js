function deployChart(){

d3.csv("configoutput.csv", function(error, clients) {
  if (error) throw error;
  
  

  var parseDate = d3.time.format("%Y-%m-%d").parse;
  // Coerce the CSV data to the appropriate types.
  clients.forEach(function(d,i) {
    // d.ENV = d.env;
     d.CLIENT = d.database_name.substr(0, d.database_name.indexOf('_'));
    // d.rank = d.value3;
	d.modify_timestamp= d.modify_timestamp;
	// d.updated_timestamp=d.updated_timestamp;
	d.config_value= d.config_value;
	//d.config_item=d.type;
	d.database_name=d.database_name;
	// d.dateMatch="w/ core";
	// d.coreMajor=d.value1.substring(0, 4); 
	// var coreL = d.value1.length;
	// d.coreMinor=d.value1.substring(coreL-4, coreL); 
	
	 d.date = parseDate(d.modify_timestamp.substring(0, 10));
	
	
	// clients.forEach(function(k,j){
	// if (d.database_name == k.database_name
	// && d.modify_timestamp.substring(0, 10) !== k.modify_timestamp.substring(0, 10)
	// //&& k.config_item=="CoreRevision"
	// )
	// {
		
	// d.dateMatch= d.modify_timestamp;	
		 // // console.log(d.database_name)
		  // // console.log(k.database_name)
	// }
	// })
	
  });


  //http://bl.ocks.org/mbostock/3202354
 distinctDBs = d3.set(
    clients
	.map(function(d){ return d.database_name; })	
    .filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
    ).values();
	

 distinctVersions = d3.set(
    clients
	.map(function(d){ return d.config_value; })	
    .filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
    ).values();	

var x = d3.time.scale().range([0, width]);
	
	x.domain(d3.extent(clients, function(d) { return d.date; }));


	
  var xdomain= distinctVersions.sort(d3.ascending);
  var ydomain= distinctDBs.sort(d3.ascending);

  
  
  var max = d3.max(clients, function(d) {return ydomain.indexOf(d.database_name);} );

 var margin = {top: 100, right: 100, bottom: 10, left: 100},
    width = 1500 - margin.left - margin.right,
    height = max*50 + 300 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg").attr("class", "deploy")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
  var distinctCoreVersions = d3.set(
    clients.map(function(d){ return d.coreMajor; })	
        .filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
    ).values();

	
		//var updateTS = d3.max(clients, function(d) {return d.updated_timestamp.substring(0, 19);}) ;
		
		//d3.select("#updatetime").text("Data Updated: "+updateTS);
	
var distinctCoreVersions = d3.set(
    clients.map(function(d){ return d.config_value.substring(0, 4); })	
       // .filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
    ).values();

var numberCoreVersions	= distinctCoreVersions.length

	
var colorScale = d3.scale.ordinal()
.range(colorbrewer.Pastel1[numberCoreVersions])
.domain([0,numberCoreVersions]);


  
  var yAxis = svg.selectAll(".tile")
  .data(distinctDBs).enter();
				
  var xAxis_old = svg.selectAll(".tile")
  .data(distinctVersions).enter();
				
  var zAxisCore = svg.selectAll(".tile")
  .data(clients).enter();
		
		
  var zAxisClient = svg.selectAll(".tile")
  .data(clients).enter();

          xAxis_old.append("text")
		.attr("class", 'svg')
            .attr("x", function(d) { //console.log(distinctVersions);
                return distinctVersions.indexOf(d)*50+50+"px";} )
            .attr("y",-15)
            .style("fill",materializeColors.black)
            .style("font-size","10px")
			.style("text-align","center")
            .style("font-family","Roboto")
            //.style("font-weight","bold")
            .text(function(d){
                return d;});

	
 var rect= 
  svg.append('g').selectAll(".tile")
       .data(clients)

      .enter().append("rect")
      .attr("class", "innerrrect")
		// .attr("x",function(d) { //console.log(d.config_value)
		// return xdomain.indexOf(d.config_value)*50+50+"px";
		// })
		.attr("x", function(d) { console.log(d.date); return x(d.date); })
		.attr("y",function(d) { //console.log(d.database_name)
		return ydomain.indexOf(d.database_name)*50+50+"px";
		})
		.attr("rx",10)
		.attr("ry",10)
	  .attr("width", "50px")
	  .attr("height", "50px")
	  .style("stroke-width",2)
	  .style("fill","#2B3856")//function(d){return colorScale(d.coreMajor)})
	  .style("opacity",.5)
	  .style("font-family","Roboto")
	  .style("stoke","#2B3856");
	 //  .style("stroke", function(d){return colorScale(d.coreMajor)});
				
		

 

})


};