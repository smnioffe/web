
var parseDate = d3.time.format("%Y-%m-%d").parse,
    formatDate = d3.time.format("%b %Y");
	var MaxEndDate
	
d3.csv("data/report_output.csv" + '?' + Math.floor(Math.random() * 1000), function(error, buckets) {
  if (error) throw error;
  
  	

	
buckets=buckets.filter(function(d){return d.orig_table=='version history';});
  
  buckets.forEach(function(d) {

	d.end_date=d.date_value.substring(0, 10);
	d.end_date = parseDate(d.end_date);
   
	
  });
  
   MaxEndDate=d3.max(buckets, function(d) { return d.end_date; })
  
    });
  

function versionHistory(){
	
// var parseDate = d3.time.format("%Y-%m-%d").parse,
    // formatDate = d3.time.format("%b %Y");



var xStep = 864e5;


	
var versionArr=[];
	
var StartDate= "2015-10-15";
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
	
	
	
	
	

	  
	
	
   var distinctCoreVersions = d3.set(
    buckets.map(function(d){ return d.coreMajor; })	
    ).values().sort(d3.ascending);

 var numberCoreVersions	= distinctCoreVersions.length	
	
	 var colorScale = d3.scale.ordinal()
 .range(colorbrewer.Set1[numberCoreVersions+1])
 .domain(distinctCoreVersions);
 
var	EndDate=d3.max(buckets, function(d) { return d.end_date; })


// if (MaxEndDate==undefined)
// {
 // MaxEndDate=EndDate;
// }
	
  function drawVChart (distinctCoreVersions,colorScale,numberCoreVersions,buckets,distinctDB,StartDate,EndDate){ 	
	
		var max=ydomain.length*20 + 140;


  	var margin = {top: 20, right: 100, bottom: 30, left: 50},
    width = 1100 - margin.left - margin.right,
    height = max - margin.top - margin.bottom;

var x = d3.time.scale().range([0, width]),
    y = d3.scale.ordinal().range([height, 0]);
		

	  
	  x.domain([StartDate,EndDate]);
  y.domain(distinctDB);  

		



	



		var svg = d3.select("body").append("svg").attr("class", "vhistory")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.style("position", "relative")
	 .attr("z-index", 999)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");	


	
	   var yAxis = svg.selectAll(".tile")
  .data(ydomain).enter();
  
  	   var yAxis2 = svg.selectAll(".tile")
  .data(buckets).enter();





 function formatTitle(str)
{
    str=str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	str=str.replace("_", " ");
	return str.replace("_", " ");
}

var clientMem

yAxis2.append("text")
		.attr("x", width+15)
	   .attr("y",function(d) {return ydomain.indexOf(d.database_name)*20+50+13+"px";})
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

function convStartDate(d)	{if(parseDate(d.modify_timestamp)<StartDate)
	{return StartDate;} else	
	{return parseDate(d.modify_timestamp);}}


function convEndDate(d)	{if(d.end_date>EndDate)
	{return EndDate;} else	
	{return d.end_date;}}		
 

  svg.selectAll(".tile")
      .data(buckets)
    .enter().append("rect")
      .attr("class", "tile")
      .attr("x", function(d) { return x(convStartDate(d)); })
	   .attr("y",function(d) {    
                return ydomain.indexOf(d.database_name)*20+50+"px";})
      //.attr("y", function(d) { return y(d.database_name + 5); })
      .attr("width", function(d) {if (x(convEndDate(d))-x(convStartDate(d))-1 < 0) {return 0} else  {return x(convEndDate(d))-x(convStartDate(d))-1; }})
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
      .attr("transform", "translate(0," + 1520 + ")")
	  .style("fill", materializeColors.lgrey)
      .call(d3.svg.axis().scale(x).ticks(d3.time.months).tickFormat(formatDate).orient("bottom"))  
    .append("text")
      .attr("class", "label")
      .attr("x", width+2)
         .attr("y", 27)
      .attr("text-anchor", "end")
	  .style("fill", materializeColors.lgrey)
	   .style("font-size","12px")
      .style("font-family","Roboto")
      .text("Date");	
	  

  // Add a 2nd top x-axis with label.
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 65 + ")")
	  .style("fill", materializeColors.lgrey)
      .call(d3.svg.axis().scale(x).ticks(d3.time.months).tickFormat(formatDate).orient("top"));
	  	   
		   
			  		   svg.selectAll(".x.axis")
  .selectAll("text").style("font-size","12px")
      .style("font-family","Roboto Condensed");	   
	  
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
	  
	  
	}

drawVChart (distinctCoreVersions,colorScale,numberCoreVersions,buckets,distinctDB,StartDate,EndDate)	  
	  
	  
	  
	  
	  
	  
	  
	  
	  	
		var svg2 = d3.select("#sideDivVH").append("svg").attr("class", "vhistorySide")
		.style("position", "fixed")
     //.attr("x", 1000)
	    // .attr("left", '100px')
    // .attr("y", 1000)
	 .attr("z-index", 1)
    .attr("width", 900)
    .attr("height",1000);
	  //.append("g")
	    //.attr("transform", "translate(" + 1100 + "," + 20 + ")");	
		
		
		
  svg2.append('g')//.selectAll(".tile")
			//.attr("class", 'svg')
                //.data(clientsFil.filter(function(d){ return d.type == "last step" || d.type == "previous run" || d.type == "failed"; }))

                //.enter()
				.append("circle")
                .attr("class", "innercircle")
                .attr("cx",223)
                .attr("cy",580)
                .attr("r", "108px")
                .style("stroke-width",0)
				.style("opacity",.04)
                .style("fill",materializeColors.lgrey)
                .style("font-family","Roboto")		


var leftBt = svg2.append("text").attr("class", 'svg')
             .attr("x",150)
			.attr("y", 600)
            .style("fill",materializeColors.lgrey)
            .style("font-size","58px")
			.style("opacity",.5)
            .style("text-anchor", "middle")
            .attr('font-family', 'FontAwesome')
			.style("cursor","pointer")
            .text(function(d) { return '\uf190' });

			
			
var rightBt = svg2.append("text").attr("class", 'svg')
             .attr("x",300)
			.attr("y", 600)
            .style("fill",materializeColors.lgrey)
            .style("font-size","58px")
			.style("opacity",.5)			
            .style("text-anchor", "middle")
            .attr('font-family', 'FontAwesome')
			.style("cursor","pointer")
            .text(function(d) { return '\uf18e' });			


var inBt = svg2.append("text").attr("class", 'svg')
             .attr("x",222.5)
			.attr("y", 530)
            .style("fill",materializeColors.lgrey)
            .style("font-size","58px")
			.style("opacity",.5)
            .style("text-anchor", "middle")
            .attr('font-family', 'FontAwesome')
			.style("cursor","pointer")
            .text(function(d) { return '\uf00e' });	


var outBt = svg2.append("text").attr("class", 'svg')
             .attr("x",222.5)
			.attr("y", 670)
            .style("fill",materializeColors.lgrey)
            .style("font-size","58px")
			.style("opacity",.5)
            .style("text-anchor", "middle")
            .attr('font-family', 'FontAwesome')
			.style("cursor","pointer")
            .text(function(d) { return '\uf010' });	


var StartDateHis=StartDate
var EndDateHis=EndDate

leftBt.on("click", function() {
StartDate=StartDateHis.setMonth(StartDateHis.getMonth() - 1);
EndDate=EndDateHis.setMonth(EndDateHis.getMonth() - 1);
$(".vhistory").remove();
drawVChart(distinctCoreVersions,colorScale,numberCoreVersions,buckets,distinctDB,StartDate,EndDate)
});	

rightBt.on("click", function(d) {
if (MaxEndDate>EndDate){
StartDate=StartDateHis.setMonth(StartDateHis.getMonth() + 1);
EndDate=EndDateHis.setMonth(EndDateHis.getMonth() + 1);
$(".vhistory").remove();
drawVChart(distinctCoreVersions,colorScale,numberCoreVersions,buckets,distinctDB,StartDate,EndDate)
}
});	


outBt.on("click", function(d) {
StartDate=StartDateHis.setMonth(StartDateHis.getMonth() - 1);
if (MaxEndDate>EndDate){
EndDate=EndDateHis.setMonth(EndDateHis.getMonth() + 1);
}
$(".vhistory").remove();
drawVChart(distinctCoreVersions,colorScale,numberCoreVersions,buckets,distinctDB,StartDate,EndDate)

});	


inBt.on("click", function(d) {

if (
StartDateHis.getYear()*1+StartDateHis.getMonth()/12+1/12<EndDateHis.getYear()*1+EndDateHis.getMonth()/12){
StartDate=StartDateHis.setMonth(StartDateHis.getMonth() + 1);
//EndDate=EndDateHis.setMonth(EndDateHis.getMonth() + 1);
$(".vhistory").remove();
drawVChart(distinctCoreVersions,colorScale,numberCoreVersions,buckets,distinctDB,StartDate,EndDate)
}
});	
	
	  svg2.append("text")
      .attr("class", "alt-label")
	  .attr("textAlign", "center")
      .attr("x", 10)
      .attr("y", 10)
      .attr("dy", ".35em")
	
      .text("Place mouse over indivudal bars to get the exact deployment dates.");
	  
	  	  svg2.append("text")
      .attr("class", "alt-label")
	  .attr("textAlign", "center")
      .attr("x", 10)
      .attr("y", 27)
      .attr("dy", ".35em")
      .text("Place mouse over legend to see minor releases and to see which deploys correspond with which version.");
	  
	  	  	  svg2.append("text")
      .attr("class", "alt-label")
	  .attr("textAlign", "center")
      .attr("x", 10)
      .attr("y", 47)
      .attr("dy", ".35em")
      .text("Click the version in the legend to be taken to that versions release notes on Github.");
	  
	  
		  
  // // Add a legend for the color values.
  var legend = svg2.selectAll(".legend")
      .data(distinctCoreVersions)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(" + (5 +i * 50) + "," + (120) + ")"; });

  legend.append("svg:a")
  .attr("xlink:href", function(d){return "https://github.com/arcadia/qdw/wiki/"+d.substr(1)+".0-Release-Notes";})
      .append("svg:rect")
      .attr("width", 30)
      .attr("height", 30)

	  .attr("id", function(d, i){ var mCoreid = 'core'+i; return mCoreid; })
      .style("fill",  function(d,i) { return colorScale(d)});	  

  legend.append("text")
      .attr("x", 5)
      .attr("y", 38)
      .attr("dy", ".35em")
	  .style("font-size","13px")
	  .style("font-family","Roboto Condensed")
	  .style("fill", materializeColors.lgrey)

      .text(String);

  svg2.append("text")
      .attr("class", "label")
	  .attr("textAlign", "center")
      .attr("x",  10)
      .attr("y", 105)
      .attr("dy", ".35em")
	     .style("font-size","13px")
	  .style("font-family","Roboto")
	.style("font-weight","bold")
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


		svg2.append("text")
      .attr("class", "minorVersionTitle")
	  .attr("textAlign", "center")
	  
	  .attr("y", 200 )
      .attr("x",5)
      .attr("dy", ".35em")
	  .style("fill", materializeColors.lgrey)
	  .style("opacity",0)
	   .style("font-size","13px")
	  .style("font-family","Roboto")
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
	  updateLink(minorVersions,coreVar,result);	
	  
	}  

var minorVersions = [];

function update(minorVersions,coreVar,sortedLabel) {
	

		   
	
	
  var selection = //d3//.select("#chart")
   svg2.selectAll(".bar")//.transition()
   //.attr("class","graph-scroll-fixed")
   .data(sortedLabel)
  .attr("y",function(k, i) {  d=k.substr(k.indexOf("_") + 1); 
	  return 220+ i * 35 ;})
  .attr("x",5)
	    .attr("width", 20)
      .attr("height", 20)  
	  //.style("position", "fixed")
	 // .attr("id","sticker")
      .style("fill",function(k){ d=k.substr(k.indexOf("_") + 1);
		  if (d<0){  
		  return d3.rgb(colorScale(coreVar)).darker(d*-.6);
	  } else {return d3.rgb(colorScale(coreVar)).brighter(d*.2)};
		  });
	

	  
  selection.enter()
.append("svg:a")
.append("svg:rect").attr("class", "bar")//.attr("id","sticker")
  .attr("y",function(d, i) { return 220 + i * 35 ;})
  .attr("x",5)
	    .attr("width", 20)
      .attr("height", 20)  
	 // .style("position", "fixed")
      .style("fill",function(k){d=k.substr(k.indexOf("_") + 1);
		  if (d<0){  
		  return d3.rgb(colorScale(coreVar)).darker(d*-.6);
	  } else {return d3.rgb(colorScale(coreVar)).brighter(d*.2)};
		  });
		   // .on('mouseover', synchronizedMouseOverSubLeg)
        // .on('mouseout', synchronizedMouseOutSubLeg);
		
		
		
	  
		  	  
		  
		   selection.exit().remove();	
		   



		


		
};

d3.selectAll(".tile").style.position = 'absolute';

function updateText(minorVersions,coreVar,sortedLabel) {
	
	 var sublegend2 = svg2.selectAll(".sublegend")
      .data(sortedLabel)
    
    // .attr("class", "sublegend")
 .attr("y",function(d, i) { return 233 + i * 35 ;})
  .attr("x",28)
	 .attr("textAlign", "center")
//attr("dy", ".35em")
	 // .attr("transform", "rotate(-45)" )
	 .style("font-size","11.5px")
	 .style("font-family","Roboto Condensed")
	 .style("fill", materializeColors.lgrey)
      .text(function(d){return d.slice(0, d.indexOf("_"));});


  sublegend2.enter().append("text").attr("class", "sublegend").attr("id", "sublegend")
    .attr("y",function(d, i) { return 233 + i * 35 ;})
  .attr("x",28)
		  .attr("textAlign", "center")
      //.attr("dy", ".35em")
	  //.attr("transform", "rotate(-45)" )
	  .style("font-size","11px")
	   .style("font-family","Roboto Condensed")
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

function updateLink(minorVersions,coreVar,sortedLabel) {

		  var selection3 = //d3//.select("#chart")
   svg2.selectAll(".node")//.transition()
   .attr("xlink:href", '')
   .data(sortedLabel)
	  .attr("y",function(d, i) { return 220 + i * 35 ;})
  .attr("x",5)
	    .attr("width", 20)
      .attr("height", 20);
	


	  
  selection3.enter()
.append("svg:a")
.attr("xlink:href", function(d){
k=d.slice(0, d.indexOf("_"));
if (k.indexOf("rc") > -1)
{k=k.substr(0, k.indexOf('-')); }

return "https://github.com/arcadia/qdw/wiki/"+k.substr(1)+"-Release-Notes";})
.append("svg:rect")
	  .attr("y",function(d, i) { return 220 + i * 35 ;})
  .attr("x",5)
	    .attr("width", 60)
      .attr("height", 20)
	  .style("opacity",0)
		 .on('mouseover', synchronizedMouseOverSubLeg)
        .on('mouseout', synchronizedMouseOutSubLeg);
		
selection3.exit().remove();	





selection3.on('mouseout', synchronizedMouseOutSubLeg)
		 .on('mouseover', synchronizedMouseOverSubLeg);	

	

	function synchronizedMouseOverSubLeg(d) {	  
	
	
	

	  
	  d3.selectAll(".tile").filter(function(k) { 
	  return k.config_value!== d.substr(0, d.indexOf('_'));  }).transition(200)         
		.style("fill-opacity",.4);
		
		}
		
			function synchronizedMouseOutSubLeg(d) {	

	
	  

	  
	  d3.selectAll(".tile").transition(200)         
		.style("fill-opacity",1);}	
	
};	
	

	

	function synchronizedMouseOverLeg(d) {	  
	  
	  d3.selectAll(".tile").filter(function(k) { 
			return k.coreMajor!== d;}).transition(200)         
		.style("fill-opacity",.4);}
		
			function synchronizedMouseOutLeg(d) {	  
	  
	  d3.selectAll(".tile").transition(200)         
		.style("fill-opacity",1);}	
		 
	
	  
	  
	  
	


});




}



