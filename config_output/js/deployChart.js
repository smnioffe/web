function deployChart(){

d3.csv("data/report_output.csv" + '?' + Math.floor(Math.random() * 1000), function(error, clients) {
  if (error) throw error;
  
  


  // Coerce the CSV data to the appropriate types.
  clients.forEach(function(d,i) {
    d.ENV = d.env;
    d.CLIENT = d.client;
    d.rank = d.value3;
	d.modify_timestamp= d.modify_timestamp;
	d.updated_timestamp=d.updated_timestamp;
	d.config_value= d.value1;
	d.config_item=d.type;
	d.database_name=d.database_name;
	d.dateMatch="w/ core";
	d.coreMajor=d.value1.substring(0, 4); 
	var coreL = d.value1.length;
	d.coreMinor=d.value1.substring(coreL-4, coreL); 
	
	
	clients.forEach(function(k,j){
	if (d.database_name == k.database_name
	&& d.modify_timestamp.substring(0, 10) !== k.modify_timestamp.substring(0, 10)
	//&& k.config_item=="CoreRevision"
	)
	{
		
	d.dateMatch= d.modify_timestamp;	
		 // console.log(d.database_name)
		  // console.log(k.database_name)
	}
	})
	
  });

  
  
 distinctClients = d3.set(
    clients.filter(function(d){ return d.config_item == "coreRevision"; })
	.map(function(d){ return d.CLIENT; })	
    .filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
    ).values();
	

  var xdomain=['DEV','QA','UAT','PRD'];
  var ydomain= distinctClients.sort(d3.ascending);
  //Compute the scale domains.
  // x.domain(xdomain);
  // y.domain(ydomain);
  
  
  var max = d3.max(clients, function(d) {return ydomain.indexOf(d.CLIENT)*160+75;} );

 var margin = {top: 100, right: 100, bottom: 10, left: 100},
    width = 960 - margin.left - margin.right,
    height = max + 300 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg").attr("class", "deploy")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
  var distinctCoreVersions = d3.set(
    clients.filter(function(d){ return d.config_item == "coreRevision"; }).map(function(d){ return d.coreMajor; })	
     .filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
    ).values();

		
		


var distinctCoreVersions = d3.set(
    clients.filter(function(d){ return d.config_item == "coreRevision"; }).map(function(d){ return d.config_value.substring(0, 4); })	
       // .filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
    ).values().sort(d3.ascending);
	


var numberCoreVersions	= distinctCoreVersions.length
//console.log(distinctCoreVersions.length)
// var numberCoreVersions = function(distinctCoreVersions){
// if(distinctCoreVersions.length > 12) {return 12} else {return distinctCoreVersions.length};};
	
// var colorScale = d3.scale.ordinal()
// .range(colorbrewer.Pastel1[numberCoreVersions])
// .domain([0,numberCoreVersions]);
   // var colorScale = d3.scale.pow(2)             
       // .range([materializeColors.dblue, materializeColors.green ])  
       // .domain(d3.extent(clients.filter(function(d){ return d.config_item == "coreRevision"; }), function(d){return d.rank})); 
//console.log(numberCoreVersions)
var colorScale = d3.scale.ordinal()
.range(colorbrewer.Set1[numberCoreVersions+1])
 .domain([0,numberCoreVersions]);
  
  var yAxis = svg.selectAll(".tile")
  .data(distinctClients).enter();
				
  var xAxis = svg.selectAll(".tile")
  .data(xdomain).enter();
				
  var zAxisCore = svg.selectAll(".tile")
  .data(clients.filter(function(d){ return d.config_item == "coreRevision"; }))			
                .enter();
		
		
  var zAxisClient = svg.selectAll(".tile")
  .data(clients.filter(function(d){ return d.config_item == "ScmRevision" }))		
                .enter();


 yAxis.append("svg:line")
                    .attr("class", 'd3-dp-line')
                    .attr("x1", -25)
                    .attr("y1", function(d) {
		return distinctClients.indexOf(d)*130+75+77+"px";
		})
                    .attr("x2", 800)
                    .attr("y2", function(d) {
		return distinctClients.indexOf(d)*130+75+77+"px";
		})
                    .style("stroke-dasharray", ("3, 3"))
                    .style("stroke-opacity", 0.6)	
.style("stroke", materializeColors.lgrey);					


xAxis.append("rect")
      .attr("class", "tile")
		.attr("x", function(d) { 
		return xdomain.indexOf(d)*175+73+"px";}
		)
		.attr("y",-40)
		.attr("rx",15)
		.attr("ry",15)
      .attr("width", "155px")
      .attr("height", max-170)
	  .style("opacity",.9)
	  .style("fill", "#404040");



yAxis.append("text")
		.attr("x", -15
		)
		.attr("y",function(d) {
		return distinctClients.indexOf(d)*130+75+10+"px";
		})
.style("fill",materializeColors.white)
.style("font-size","16px")
.style("font-family","Roboto")
.style("font-weight","bold")
     .text(function(d){
                    return d;
                });

xAxis.append("text")
		.attr("x", function(d) { 
		return xdomain.indexOf(d)*175+65+75+"px";}
		)
		.attr("y",-15)
.style("fill",materializeColors.white)
.style("font-size","16px")
.style("font-family","Roboto")
.style("font-weight","bold")
     .text(function(d){
                    return d;
                });	
				
			
 var rect2= 
  svg.append('g').selectAll(".tile")
       .data(clients.filter(function(d){ return d.config_item == "coreRevision"; }))

      .enter().append("rect")
      .attr("class", "innerrrect")
		.attr("x",function(d) { 
		return xdomain.indexOf(d.ENV)*175+75+11+"px";
		})
		.attr("y",function(d) { 
		return ydomain.indexOf(d.CLIENT)*130+35+"px";
		})
		.attr("rx",10)
		.attr("ry",10)
	  .attr("width", "126px")
	  .attr("height", "96px")
	  .style("stroke-width",2)
	  .style("fill",function(d){return colorScale(d.coreMajor)})
	  .style("opacity",.5)
	  .style("font-family","Roboto")
	   .style("stroke", function(d){return colorScale(d.coreMajor)});
				
  
 var rect= svg.append('g').selectAll(".tile")
       .data(clients.filter(function(d){ return d.config_item == "coreRevision"; }))
    .enter().append("rect")
      .attr("class", "outerrect")
		.attr("x",function(d) { 
		return xdomain.indexOf(d.ENV)*175+75+5.5+"px";
		})
		.attr("y",function(d) { 
		return ydomain.indexOf(d.CLIENT)*130+30+"px";
		})
		.attr("rx",15)
		.attr("ry",15)
	  .attr("width", "137px")
	  .attr("height", "107px")
	  .style("stroke-width",3.5)
	  .style("fill","none")
	   .style("stroke", function(d){return colorScale(d.coreMajor)});			

 

	 
zAxisCore.append("text")
.attr("x",function(d) { 
		return xdomain.indexOf(d.ENV)*175+75+75-30.5+"px";
		})
		.attr("y",function(d) { 
		return ydomain.indexOf(d.CLIENT)*130+65-8+"px";
		})	
	   .style("fill",materializeColors.white)// function(d){return colorScale(d.coreMajor)})
.style("font-size","24px")
//.style("font-weight","bold")
.style("font-family","Roboto")
.style("text-anchor", "middle")
 .text(function(d) {
	 return d.coreMajor;
  });
  
  zAxisCore.append("text")
.attr("x",function(d) { if(d.coreMinor.substring(0,2)=="rc")
	{return xdomain.indexOf(d.ENV)*175+75+75-7+"px";} else
		{return xdomain.indexOf(d.ENV)*175+75+75-8+"px";}
		})
		.attr("y",function(d) { 
		return ydomain.indexOf(d.CLIENT)*130+65-8+"px";
		})	
	   .style("fill",materializeColors.white)// function(d){return colorScale(d.coreMajor)})
.style("font-size","14px")
//.style("font-weight","bold")
.style("font-family","Roboto")
.style("text-anchor", "left")
 .text(function(d) { if(d.coreMinor.substring(0,2)=="rc"){
	 return d.coreMinor;}
	 else { return d.coreMinor.substring(2);}
  });
  
  

 
  zAxisCore.append("text")
.attr("x",function(d) { 
		return xdomain.indexOf(d.ENV)*175+75+75+"px";
		})
		.attr("y",function(d) { 
		return ydomain.indexOf(d.CLIENT)*130+105+"px";
		})	
.style("fill",materializeColors.lgrey)
.style("font-family","Roboto")
.style("font-size","11px")
.style("text-anchor", "middle")
.attr("id", function(d) {return  'name' + d.database_name;})
 .text(function(d) {
	 
	 return  "core: "+d.modify_timestamp.substring(0, 10);
  });
  
    zAxisClient.append("text")
.attr("x",function(d) { 
		return xdomain.indexOf(d.ENV)*175+75+75+"px";
		})
		.attr("y",function(d) { 
		return ydomain.indexOf(d.CLIENT)*130+120+"px";
		})	
.style("font-family","Roboto")		
.style("fill",materializeColors.lgrey)
.style("font-size","11px")
.style("text-anchor", "middle")
	  //.on('mouseover', function(d){d3.select(box).style("opacity",.9)})
	      .text(function(d){
			  if (ydomain.indexOf(d.CLIENT) !== -1) {
	 return  "client: "+d.dateMatch.substring(0, 10);
			  };
     
                });	
})


};