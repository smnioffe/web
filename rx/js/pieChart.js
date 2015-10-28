 function loadPie(DimensionVar,CategoryVar,dimensionVarLabel,chartType){

 var w = 300,                        //width
    h = 300,                            //height
    r = 60;                            //radius
  
		//console.log(DimensionVar,CategoryVar,dimensionVarLabel,chartType)
d3.selectAll("svg")
       .remove();

	   var svg2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right +200)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + 170 + "," + 250 + ")");
	
// svg.selectAll("*").remove();

  

if (categoryVarUpdated!=="Cytogenetic"){
d3.select("#Title").text(dimensionVarLabelUpdated +" by "+dimensionVarUpdated);
}
else
{d3.select("#Title").text("Prescriptions with and without Cytogentic Anomaly");}



d3.csv("data/category2.csv", function(error, data) {
  if (error) throw error;

		
var color = d3.scale.ordinal()
    .range(["#6D594A", "#CAC5B0", "#69A399", "#B8BFC6"]);

	


 
if(CategoryVar=="Prescription"||CategoryVar=="Cytogenetic")
{ var categoryNames =
  d3.keys(data[0]).filter(function(key) { return key !== "type" & key !== "dimension"  & key !== "Convenience" & key !== "Efficacy" & key !== "Safety" & key !== "Insurance" & key !== "n"; }).sort();
}
else if (
CategoryVar=="Factors"
)
{
	var categoryNames
	= d3.keys(data[0]).filter(function(key) { return key !== "type" & key !== "dimension"  & key !== "Crudaxil" & key !== "Xanastin" & key !== "Plasmotropin" & key !== "Spamoprofin" & key !== "n"; }).sort();
}


if(CategoryVar=="Cytogenetic")
{
	var dataFiltered = data.filter(function(d){ return d.dimension==CategoryVar});
}
else {
	var dataFiltered = data.filter(function(d){ return d.dimension==DimensionVar});
}
  
  
var arr1
var pieLab
var nVar



  dataFiltered.forEach(function(d,i) {
	  
	  if (CategoryVar=="Cytogenetic"){i=i+1}
	  
    arr1 = categoryNames.map(function(name) { 	
	return {label: name, value: +d[name]};  });
	  pieLab=d.type;
      nVar=d.n;
    arr1=arr1.sort()
 //console.log(nVar)
    
    var svg = d3.select('#pie'+i)
        .append("svg:svg")              
        .data([arr1])   
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(250,250)"); 

	
			
    var arc = d3.svg.arc()             
        .outerRadius(r);
		
    var pie = d3.layout.pie()          
        .value(function(d) { return d.value; });    
		
    var arcs = svg.selectAll("g.slice")     
        .data(pie)                          
        .enter()                            
            .append("svg:g")                
                .attr("class", "slice");    
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) 
                .attr("d", arc);                                    
        
		
		
		// arcs.append("svg:text")                                     
                // .attr("transform", function(d) {                    
                
                // d.innerRadius = 0;
                // d.outerRadius = r;
                // return "translate(" + arc.centroid(d) + ")";        
            // })
            // .attr("text-anchor", "middle")                          
            // .text(function(d, i) { return arr1[i].label; });       

       			
	   svg.append("svg:text")                                     
			.attr("dy",-r-20)
            .attr("text-anchor", "middle")     
			.attr("font-size","12px")			
            .text(pieLab);  
			
		
	   svg.append("svg:text")                                     
			.attr("dy",r+23)
            .attr("text-anchor", "middle")     
			.attr("font-size","12px")		
.attr("font-style","italic")					
            .text('n='+nVar);  		
			
			

  var legend = svg2.selectAll(".legend")
      .data(categoryNames)
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
  

// var categoryNames2 = d3.keys(data[0]).filter(function(key) { return key !== "type" & key !== "dimension"  & key !== "Crudaxil" & key !== "Xanastin" & key !== "Plasmotropin" & key !== "Spamoprofin"; });
// var dataFiltered2 = data.filter(function(d){ return d.dimension==dimensionVarUpdated })

// var arr2



  // dataFiltered.forEach(function(d,i) {
    // arr2 = categoryNames2.map(function(name) { 	
	// return {label: name, value: +d[name]};  });
	  // pieLab=d.type;


	 // var color = d3.scale.ordinal()
    // .range(["#49475b","#E9EB9E", "#799496", "#acc196", "#e9eb9e"]);

    
    // var svg = d3.select('#pie'+i+'b')
        // .append("svg:svg")              
        // .data([arr2])   
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
  // .append("g")
    // .attr("transform", "translate(250,250)"); 

	
			
    // var arc = d3.svg.arc()             
        // .outerRadius(r);
		
    // var pie = d3.layout.pie()          
        // .value(function(d) { return d.value; });    
		
    // var arcs = svg.selectAll("g.slice")     
        // .data(pie)                          
        // .enter()                            
            // .append("svg:g")                
                // .attr("class", "slice");    
        // arcs.append("svg:path")
                // .attr("fill", function(d, i) { return color(i); } ) 
				// //.attr("opacity",.5)
                // .attr("d", arc);                                    
        
		




  //});
  



	 
	  
	});	
		
		

 }	
		