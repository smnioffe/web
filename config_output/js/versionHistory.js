

function versionHistory(){
	
var parseDate = d3.time.format("%Y-%m-%d").parse,
    formatDate = d3.time.format("%b %Y");



var xStep = 864e5;


	
var versionArr=[];
	
var StartDate= "2015-08-15";
StartDate= parseDate(StartDate);






d3.csv("data/report_output.csv" + '?' + Math.floor(Math.random() * 1000), function(error, buckets) {
  if (error) throw error;

 
  buckets=buckets.filter(function(d){return d.orig_table=='version history';});
  
  buckets.forEach(function(d) {
  
	
	
	d.config_value=d.type;
	d.n_rank=d.value1;
	d.end_date=d.date_value.substring(0, 10);
	d.modify_timestamp=d.modify_timestamp.substring(0, 10);
	

	d.legendKey=d.config_value+'_'+d.n_rank;
	d.end_date = parseDate(d.end_date);
    d.database_name= d.database_name;
	d.n_rank=-d.n_rank*-1;
	d.coreMajor=d.config_value.substring(0, 4); 
	d.client=d.database_name.substr(0,d.database_name.indexOf('_'));
	d.envS=d.database_name.substr(d.database_name.length-4,d.database_name.length);
	d.env=d.envS.substr(d.envS.indexOf('_')+1,d.envS.length);
	if(parseDate(d.modify_timestamp)<StartDate)
	{d.date=StartDate;} else	
	{d.date = parseDate(d.modify_timestamp);}
 
	if(d.env=="PRD"){d.envR="zPRD"}else{d.envR=d.env}//For ordering
	
	d.database_name_sort= d.database_name.substr(0,d.database_name.length-4)+"_"+d.envR;
	
	
	versionArr.push(d.config_value,d.coreMajor)
	
  });
  //var buckets2=buckets

  
  buckets.sort(function(a, b) {
    return d3.ascending(a.client, b.client) || d3.ascending(a.envR, b.envR);
  });
  



   var distinctDB = d3.set(
    buckets.map(function(d){ return d.database_name; })	
    .filter(function(d){  return (d.database_name !== "undefined"&&d.database_name !== "")})
    ).values();//.sort(function(d){ return d3.ascending; });


   var distinctClients = d3.set(
    buckets.map(function(d){ return d.client })	
    .filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
    ).values();

	
  

  // Extend the x- and y-domain to fit the last bucket.
  // For example, the y-bucket 3200 corresponds to values [3200, 3300].
  //x.domain([x.domain()[0], +x.domain()[1] + xStep]);
  //y.domain([y.domain()[0], y.domain()[1] + 5]);
  
   var ydomain= distinctDB;//.sort(d3.ascending);
   

   //Add extra space between non-core versions
   var lastDB
   

   
   ydomain.forEach(function(d, i) {
    if (lastDB !== d.substring(0, 3)) {
		if(i>ydomain.length){ydomain.push(" ");}else
			{ydomain.splice(i, 0, " ");}
		;} 
		lastDB = d.substring(0, 3);
		})
		
	/////////////////WORKAROUND FOR LENGTH GETTING RESET IN ForLoop	
	   ydomain.forEach(function(d, i) {
		   if (d!==" "){
    if (lastDB !== d.substring(0, 3)&&lastDB!==" ") {
		if(i>ydomain.length){ydomain.push(" ");}else
			{ydomain.splice(i, 0, " ");}
		;}
		
		   };
		   lastDB = d.substring(0, 3);
		})	
		

	var MaxVal=d3.max(d3.values(ydomain))
	
	for (var i = ydomain.indexOf(MaxVal)+2; i < ydomain.length; i++){
   ydomain.pop();
	}
	/////////////////WORKAROUND FOR LENGTH GETTING RESET IN ForLoop
	
	
	

	var max=ydomain.length*20 + 140;
	
	
	
	
	var margin = {top: 20, right: 200, bottom: 30, left: 50},
    width = 1100 - margin.left - margin.right,
    height = max - margin.top - margin.bottom;


var x = d3.time.scale().range([0, width]),
    y = d3.scale.ordinal().range([height, 0]);
  //  z = d3.scale.ordinal().range(["white", "steelblue"]);	

 //x.domain([parseDate(StartDate),d3.max(buckets, function(d) { return d.date; })]);
  // Compute the scale domains.
  x.domain([StartDate,d3.max(buckets, function(d) { return d.end_date; })]);
  y.domain(distinctDB);
 // z.domain([0, d3.max(buckets, function(d) { return d.config_value; })]);	
		
	var svg = d3.select("body").append("svg").attr("class", "vhistory")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");	
	
	

	
	
	  svg.append("text")
      .attr("class", "alt-label")
	  .attr("textAlign", "center")
      .attr("x", 10)
      .attr("y", 15)
      .attr("dy", ".35em")
	
      .text("Place mouse over indivudal bars to get the exact deployment dates.");
	  
	  	  svg.append("text")
      .attr("class", "alt-label")
	  .attr("textAlign", "center")
      .attr("x", 10)
      .attr("y", 32)
      .attr("dy", ".35em")
      .text("Place mouse over legend to see minor releases and to see which deploys correspond with which version.");
		

   var distinctCoreVersions = d3.set(
    buckets.map(function(d){ return d.coreMajor; })	
    ).values().sort(d3.ascending);

	
	   var yAxis = svg.selectAll(".tile")
  .data(ydomain).enter();
  
  	   var yAxis2 = svg.selectAll(".tile")
  .data(buckets).enter();

var numberCoreVersions	= distinctCoreVersions.length

 var colorScale = d3.scale.ordinal()
 .range(colorbrewer.Set1[numberCoreVersions+1])
 .domain([0,numberCoreVersions]);


 function formatTitle(str)
{
    str=str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	str=str.replace("_", " ");
	return str.replace("_", " ");
}

var clientMem

yAxis2.append("text")
		.attr("x", width+15)
	   .attr("y",function(d) {return ydomain.indexOf(d.database_name)*20+80+13+"px";})
.style("fill", materializeColors.lgrey)
.style("font-size","10px")
.style("font-family","Roboto")
//.style("font-weight","bold")
     .text(function(d){if(clientMem!==d.env+" "+d.client){clientMem=d.env+" "+d.client; return clientMem;}});
	 
	   var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d,i) {
                return "<p2><strong>Version:</strong> <span>" + d.config_value + "</span></p2><br><strong>Deployed:</strong> <span>" + d.modify_timestamp + "</span>";
            });

        svg.call(tip);	
	 
   
  svg.selectAll(".tile")
      .data(buckets)
    .enter().append("rect")
      .attr("class", "tile")
      .attr("x", function(d) { return x(d.date); })
	   .attr("y",function(d) {    
                return ydomain.indexOf(d.database_name)*20+80+"px";})
      //.attr("y", function(d) { return y(d.database_name + 5); })
      .attr("width", function(d) { if (x(d.end_date)-x(d.date)-1 < 0) {return 0} else  {return x(d.end_date)-x(d.date)-1; }})
      .attr("height",  18)
      .style("fill",function(d){
		  if (d.n_rank<0){  
		  return d3.rgb(colorScale(d.coreMajor)).darker(d.n_rank*-.6);
	  } else {return d3.rgb(colorScale(d.coreMajor)).brighter(d.n_rank*.2)};
		  })
		   .on("mouseover", synchronizedMouseOver)
            .on("mouseout", synchronizedMouseOut) ;
			
  // Add an x-axis with label.
svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
	  .style("fill", materializeColors.lgrey)
      .call(d3.svg.axis().scale(x).ticks(d3.time.months).tickFormat(formatDate).orient("bottom"))
    .append("text")
      .attr("class", "label")
      .attr("x", width+2)
         .attr("y", 27)
      .attr("text-anchor", "end")
	  .style("fill", materializeColors.lgrey)
      .text("Date");	

  // Add a 2nd top x-axis with label.
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 95 + ")")
	  .style("fill", materializeColors.lgrey)
      .call(d3.svg.axis().scale(x).ticks(d3.time.months).tickFormat(formatDate).orient("top"));
	  
		  
		  
  // // Add a legend for the color values.
  var legend = svg.selectAll(".legend")
      .data(distinctCoreVersions)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(" + (width-100 +i * 40) + "," + (20) + ")"; });

  legend.append("rect")
      .attr("width", 20)
      .attr("height", 20)
	  .attr("id", function(d, i){ var mCoreid = 'core'+i; return mCoreid; })
      .style("fill",  function(d,i) { return colorScale(d)});	  

  legend.append("text")
      .attr("x", 0)
      .attr("y", 26)
      .attr("dy", ".35em")
	  .style("fill", materializeColors.lgrey)
      .text(String);

  svg.append("text")
      .attr("class", "label")
	  .attr("textAlign", "center")
      .attr("x", width-100 + 40)
      .attr("y", 10)
      .attr("dy", ".35em")
	  .style("fill", materializeColors.lgrey)
      .text("Major Versions");
	  

		
  legend.on('mouseover', synchronizedMouseOverLeg)
        .on('mouseout', synchronizedMouseOutLeg);
		  

		
	  

	  
	  legend.each(function(buckets) {            
  d3.select(this).selectAll("rect")
      .on("mouseover", function(d) { 
		subVersion(d)       
      });
});


		svg.append("text")
      .attr("class", "minorVersionTitle")
	  .attr("textAlign", "center")
	  .attr("y", 80 )
      .attr("x",width+100)
      .attr("dy", ".35em")
	  .style("fill", materializeColors.lgrey)
	  .style("opacity",0)
	  .style("font-weight","bold")
      .text("Minor Versions");



	 function subVersion(coreVar){
		 
d3.selectAll(".minorVersionTitle").transition(100).style("opacity",1);
		 
	minorVersions = d3.set(
    buckets.filter(function(d){ return d.coreMajor == coreVar; })
	.map(function(d){ return d.n_rank; })	
      ).values();
	  
	
	  	minorVersionsValues = d3.set(
    buckets.filter(function(d){ return d.coreMajor == coreVar; })
	.map(function(d){ return d.legendKey; })	
      ).values();
	  
	  minorVersions.forEach(function (d,i) {
  minorVersions[i] = +d;
});
	  
	
	  minorVersions.sort(d3.ascending);
	  

result = []

minorVersions.forEach(function(key) {
    var found = false;
    minorVersionsValues = minorVersionsValues.filter(function(item) { 
        if(!found && +(item.substr(item.indexOf("_") + 1)) == key) {
            result.push(item);
            found = true;
            return false;
        } else 
            return true;
    })
})


//var sortedLabel=result;

	  
	
	  
	  update(minorVersions,coreVar,result);	  
	  updateText(minorVersions,coreVar,result);	
	  
	}  

var minorVersions = [];

function update(minorVersions,coreVar,sortedLabel) {
	

		   
	
	
  var selection = //d3//.select("#chart")
   svg.selectAll(".bar").data(sortedLabel)//.transition()
  .attr("y",function(k, i) {  d=k.substr(k.indexOf("_") + 1); 
	  return 100 + i * 35 ;})
  .attr("x",width+100)
	    .attr("width", 20)
      .attr("height", 20)  
	  //.style("fixed",true)
      .style("fill",function(k){ d=k.substr(k.indexOf("_") + 1);
		  if (d<0){  
		  return d3.rgb(colorScale(coreVar)).darker(d*-.6);
	  } else {return d3.rgb(colorScale(coreVar)).brighter(d*.2)};
		  });
	

	  
  selection.enter()
    .append("rect").attr("class", "bar")
  .attr("y",function(d, i) { return 100 + i * 35 ;})
  .attr("x",width+100)
	    .attr("width", 20)
      .attr("height", 20)  
	  //.style("position","fixed")
      .style("fill",function(k){ d=k.substr(k.indexOf("_") + 1);
		  if (d<0){  
		  return d3.rgb(colorScale(coreVar)).darker(d*-.6);
	  } else {return d3.rgb(colorScale(coreVar)).brighter(d*.2)};
		  }).on('mouseover', synchronizedMouseOverSubLeg)
        .on('mouseout', synchronizedMouseOutSubLeg);
		

		  
		  	  
		  
		   selection.exit().remove();	
		   



selection.on('mouseout', synchronizedMouseOutSubLeg)
		 .on('mouseover', synchronizedMouseOverSubLeg);	

	

	function synchronizedMouseOverSubLeg(d) {	  
	  
	  d3.selectAll(".tile").filter(function(k) { 
	  return k.config_value!== d.substr(0, d.indexOf('_'));  }).transition(200)         
		.style("fill-opacity",.4);}
		
			function synchronizedMouseOutSubLeg(d) {	  
	  
	  d3.selectAll(".tile").transition(200)         
		.style("fill-opacity",1);}	

		


		
};

d3.selectAll(".tile").style.position = 'absolute';

function updateText(minorVersions,coreVar,sortedLabel) {
	
	 var sublegend2 = svg.selectAll(".sublegend")
      .data(sortedLabel)
    
    // .attr("class", "sublegend")
 .attr("y",function(d, i) { return 112.5 + i * 35 ;})
  .attr("x",width+122)
	 .attr("textAlign", "center")
//attr("dy", ".35em")
	 // .attr("transform", "rotate(-45)" )
	 .style("fill", materializeColors.lgrey)
      .text(function(d){return d.slice(0, d.indexOf("_"));});


  sublegend2.enter().append("text").attr("class", "sublegend").attr("id", "sublegend")
    .attr("y",function(d, i) { return 112.5 + i * 35 ;})
  .attr("x",width+122)
		  .attr("textAlign", "center")
      //.attr("dy", ".35em")
	  //.attr("transform", "rotate(-45)" )
	  .style("fill", materializeColors.lgrey)
      .text(function(d){return d.slice(0, d.indexOf("_"));});
	  
	  
	  
	  // sublegend2.append("text")
      // .attr("class", "sublabel")
	  // .attr("textAlign", "center")
      // .attr("x", 100 + 40)
       // .attr("y", function(d, i) {if (i%2 == 0) {return 50;}else {return 0;}})
      // .attr("dy", ".35em")
      // .text("Minor Versions");
            
	
	
 sublegend2.exit().remove();
 
 

	
	
	  
};	
	
	

	

	function synchronizedMouseOverLeg(d) {	  
	  
	  d3.selectAll(".tile").filter(function(k) { 
			return k.coreMajor!== d;}).transition(200)         
		.style("fill-opacity",.4);}
		
			function synchronizedMouseOutLeg(d) {	  
	  
	  d3.selectAll(".tile").transition(200)         
		.style("fill-opacity",1);}	
		 
	
	  
	  
	  
	  	     function synchronizedMouseOver(d) {
            tip.show(d);
				d3.select(this).transition(200)
               .style(
			   "fill-opacity",.6);
        }

        function synchronizedMouseOut(d) {
            tip.hide(d)
			d3.select(this).transition(200)
               .style(
			   "fill-opacity",1);
        }		


});

}

