 function barSummary(DimensionVar,CategoryVar,dimensionVarLabel,chartType){

	console.log(1)

//svg.selectAll("*").remove();
 d3.selectAll("svg")
        .remove();

var svg = d3.select('#dynamicChart').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		   

d3.select("#Title").text("Perceived Efficacy");	
	
$("#barBt").attr('class','btn-floating red lighten-2');
$("#pieBt").attr('class','btn-floating disabled');
$("#lineBt").attr('class','btn-floating disabled');	


//Width and height
			var w = 400;
			var h = 250;
			

					
				var 	dataset = [{"label":"High Prescribers", "value":58.4,"scaletype":1}, 
            {"label":"Average", "value":56.9,"scaletype":1}, 
            {"label":"Low Prescribers", "value":54,"scaletype":1}];
			
			var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, w], 0.05);

			var yScale = d3.scale.linear()
							.domain([0, d3.max(dataset, function(d) { return d.value; })])
							.range([0, h]);
			
var color = d3.scale.ordinal()
    .range(["#6D594A", "#CAC5B0", "#69A399", "#B8BFC6"]);
	
	
  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d,i) {
                return "<p2><strong>Name:</strong> <span>" + d.label + "</span></p2><br><strong>Value:</strong> <span>" + d.value + "</span>";
            });

        svg.call(tip);	
		
			//Create bars
			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d,i) {
			   		return h - yScale(dataset[i].value);
			   })
			   .attr("width", xScale.rangeBand())
			   .attr("height", function(d,i) {
			   		return yScale(dataset[i].value);
			   })
			   // .attr("fill", function(d,i) {
					// return "rgb(0, 0, " + (dataset[i].value * 10) + ")";
			   // });
			       .attr("fill", function(d, i) { return color(i); } )
 .on("mouseover", synchronizedMouseOver)
            .on("mouseout", synchronizedMouseOut) ;				   ;

			        
        
				   
				   
			//Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d,i) {
			   		return dataset[i].value;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.rangeBand() / 2;
			   })
			   .attr("y", function(d,i) {
			   		return h - yScale(dataset[i].value) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");
			   
			     svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -10)
	  .attr("x", -185)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Rating");

			   
			   			svg.selectAll("text2")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d,i) {
			   		return dataset[i].label;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.rangeBand() / 2;
			   })
			   .attr("y", function(d) {
			   		return h+12;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			     .attr("fill", "black") ;
	
// Efficacy_overall	58.4	56.85185185	54.16666667
// Safety_Tolerability_overall	22.6	22.90123457	24.58333333
// Patient_Convenience_overall	5.84	9.111111111	9.5
// Insurance_Coverage_overall	13.16	11.13580247	11.75


			//On click, update with new data			
			d3.select("#efficacy")
				.on("click", function() {
			dataset = [{"label":"High Prescribers", "value":58.4,"scaletype":1}, 
            {"label":"Average", "value":56.9,"scaletype":1}, 
            {"label":"Low Prescribers", "value":54,"scaletype":1}];
	
d3.select("#Title").text("Importance of Efficacy");	
				updateBars(dataset)			
});

			d3.select("#convenience")
				.on("click", function() {
			dataset = [{"label":"High Prescribers", "value":5.8,"scaletype":3}, 
            {"label":"Average", "value":9.1,"scaletype":3}, 
            {"label":"Low Prescribers", "value":9.5,"scaletype":3}];
d3.select("#Title").text("Importance of Patient Convenience");							
				updateBars(dataset)			
});

			d3.select("#safety")
				.on("click", function() {
			dataset = [{"label":"High Prescribers", "value":22.6,"scaletype":1}, 
            {"label":"Average", "value":22.9,"scaletype":1}, 
            {"label":"Low Prescribers", "value":24.6,"scaletype":1}];
d3.select("#Title").text("Importance of Safety Tolerability");							
				updateBars(dataset)			
});

			d3.select("#insurance")
				.on("click", function() {
			dataset = [{"label":"High Prescribers", "value":13.2,"scaletype":2}, 
            {"label":"Average", "value":11.1,"scaletype":2}, 
            {"label":"Low Prescribers", "value":11.2,"scaletype":2}];
d3.select("#Title").text("Importance of Insurance Coverage");							
				updateBars(dataset)			
});

			d3.select("#plasmotropincytogenetic")
				.on("click", function() {
			dataset = [{"label":"High Prescribers", "value":42.1,"scaletype":1}, 
            {"label":"Average", "value":12.0,"scaletype":1}, 
            {"label":"Low Prescribers", "value":3.3,"scaletype":1.2}];
d3.select("#Title").text("Plasmotropin Prescription w/ Cytogenetic Anomaly");							
				updateBars(dataset)			
});

			d3.select("#plasmotropinwithoutcytogenetic")
				.on("click", function() {
			dataset = [{"label":"High Prescribers", "value":21.7,"scaletype":2}, 
            {"label":"Average", "value":10.9,"scaletype":2}, 
            {"label":"Low Prescribers", "value":4.6,"scaletype":2}];
d3.select("#Title").text("Plasmotropin Prescription w/o Cytogenetic Anomaly");							
				updateBars(dataset)			
});

			d3.select("#totalpatients")
				.on("click", function() {
			dataset = [{"label":"High Prescribers", "value":19.7,"scaletype":1}, 
            {"label":"Average", "value":25.8,"scaletype":1}, 
            {"label":"Low Prescribers", "value":38.4,"scaletype":1}];
d3.select("#Title").text("Number of Patients");							
				updateBars(dataset)			
});

	// Low	Medium	High
// Total_Patients	38.4	25.8	19.7
// Efficacy_Plasmotropin	3.0	3.9	4.2
// Safety_Tolerability_Plasmotropin	4.1	4.5	3.7
// Patient_Convenience_Plasmotropin	4.3	4.0	4.1
// Insurance_Coverage_Plasmotropin	3.3	3.9	3.9


			d3.select("#perceivedefficacy")
				.on("click", function() {
			dataset = [{"label":"High Prescribers", "value":4.2,"scaletype":4}, 
            {"label":"Average", "value":3.9,"scaletype":4}, 
            {"label":"Low Prescribers", "value":3.0,"scaletype":4}];
	
d3.select("#Title").text("Plasmotropin Perceived Efficacy");	
				updateBars(dataset)			
});

			d3.select("#perceivedconvenience")
				.on("click", function() {
			dataset = [{"label":"High Prescribers", "value":4.1,"scaletype":4}, 
            {"label":"Average", "value":4.0,"scaletype":4}, 
            {"label":"Low Prescribers", "value":4.3,"scaletype":4}];
d3.select("#Title").text("Plasmotropin Perceived Patient Convenience");							
				updateBars(dataset)			
});

			d3.select("#perceivedsafety")
				.on("click", function() {
			dataset = [{"label":"High Prescribers", "value":3.7,"scaletype":4}, 
            {"label":"Average", "value":4.5,"scaletype":4}, 
            {"label":"Low Prescribers", "value":4.1,"scaletype":4}];
d3.select("#Title").text("Plasmotropin Perceived Safety Tolerability");							
				updateBars(dataset)			
});

			d3.select("#perceivedinsurance")
				.on("click", function() {
			dataset = [{"label":"High Prescribers", "value":3.9,"scaletype":4}, 
            {"label":"Average", "value":3.9,"scaletype":4}, 
            {"label":"Low Prescribers", "value":3.3,"scaletype":4}];
d3.select("#Title").text("Plasmotropin Perceived Insurance Coverage");							
				updateBars(dataset)			
});




					
function updateBars(dataset){
					//Update all rects
					svg.selectAll("rect")
					   .data(dataset)
					   .transition()								
					   .attr("y", function(d,i) {
					   		return h - yScale(dataset[i].value)*dataset[i].scaletype;
					   })
					   .attr("height", function(d,i) {return yScale(dataset[i].value)*dataset[i].scaletype;})

					    .attr("fill", function(d, i) { return color(i); } ) ;

					//Update all labels
					svg.selectAll("text")
					   .data(dataset)
					   .text(function(d,i) {
					   		return dataset[i].value;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d,i) {
					   		return h - yScale(dataset[i].value) + 14;
					   });
					   
					   
					   
					   					//Update all labels
					svg.selectAll("text2")
					   .data(dataset)
					   .text(function(d,i) {
					   		return dataset[i].label;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return h-12 ;
					   });
					   
				   
					   
} ;

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
		
		
	