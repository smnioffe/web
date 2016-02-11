function mp(selectVar){









	 


		

	
	        var tip = d3.tip()
            .attr('class', 'd3-tip2')
            .offset([-10, 0])
            .html(function(d) {
                return "<p2><strong2>Last Run:</strong2> <span>" + d + "</span></p2>";
            });

        
	            //Client Label
            var MPleg = d3.select("#MPlegend")
                .append("svg:svg").attr("class","measurePeriodLegend")
                .attr("width", "100%")
                .attr("height", "33px");
				
			var legVal=[{"label":"Enabled; Number Meas/Period Run","x":5},
						{"label":"Disabled; Previosuly Run","x":250},
						{"label":"Disabled","x":435}];
			
			var legBox=[{"color":materializeColors.green,"x":210,"opacity":.9},
						{"color":materializeColors.yellow2,"x":395,"opacity":.4},
						{"color":materializeColors.lgrey,"x":490,"opacity":1}];


			
			 MPleg.selectAll(".textLabel")
                .data(legVal)
                .enter().append("text")
                .attr("text-anchor", "left")
                .attr("textAlign", "left")
				.attr("font-size", "12px")
				.attr("font-family","Roboto Slab")
                .attr("x", function(d) {return d.x})	
                .attr("y", "28px")
                .attr("class", "MPtextLabel")
				 .text(function(d) {return d.label});		
	
	
			 MPleg.selectAll(".boxLabel")
                    .data(legBox)
                    .enter().append("rect")
                    .attr("class", "legBoxes")
                    .attr("x", function(d) {return d.x})
                    .attr("y", "13px")
                    .attr("width", "20px")
                    .attr("height", "20px")
                    .style("opacity",function(d) {return d.opacity})
                    .style("fill", function(d) {return d.color});
		
		

        var margin = {
                top: 10,
                right: 20,
                bottom: 0,
                left: 20
            },
            width = 600 - margin.left - margin.right,
            height = 90 - margin.top - margin.bottom;


        var allMeasures = [];
        var allPeriods = [];

        d3.csv("data/report_output.csv", function(error, data) {

		
           data.filter(function(d){ return d.orig_table == "measures and periods"; }).forEach(function(d) {
				d.orig_table=d.orig_table;
                d.database_name = d.database_name;
                d.measures = d.value4;
                d.CLIENT = d.client;
                d.ENV = d.env;
                d.periods = d.type;
                d.periods_count = d.value1;
				d.measure_count = d.value5;
				d.periods_inactive=d.value2;
				d.periods_inactive_run=d.value3;
				d.inactive_measures=d.value6;
				d.inactive_measures_run=d.value7;
				d.max_run=d.date_value.substring(0, 10);
                if (d.database_name == "all") {
                    allMeasures.push(d.measures);
                    allPeriods.push(d.periods);
                };

                if (d.measures !== undefined) {
                    d.subMeasures = d.measures.split(/;/);
                } else(d.subMeasures = "none")

                if (d.periods !== undefined) {
                    d.subPeriods = d.periods.split(/;/);
                } else(d.subPeriods = "none")

                if (d.periods_count !== undefined) {
                    d.subPeriods_count = d.periods_count.split(/;/);
                } else(d.subPeriods_count = "none")
				
				 if (d.measure_count !== undefined) {
                    d.subMeasures_count = d.measure_count.split(/;/);
                } else(d.subMeasures_count = "none")
				
				if (d.periods_inactive !== undefined) {
                    d.subInactivePeriods = d.periods_inactive.split(/;/);
                } else(d.subInactivePeriods = "none")
								
				if (d.periods_inactive_run !== undefined) {
                    d.subInactivePeriodsRun = d.periods_inactive_run.split(/;/);
					
                } else(d.subInactivePeriodsRun = "none")
				
				if (d.inactive_measures!== undefined ) {
                    d.subInactiveMeasures = d.inactive_measures.split(/;/);
                } else(d.subInactiveMeasures = "none")
								
				if (d.inactive_measures_run !== undefined ) {
                    d.subInactiveMeasuresRun = d.inactive_measures_run.split(/;/);
                } else(d.subInactiveMeasuresRun = "none")				
				

            });

		
		
			
            allMeasures = allMeasures.toString().split(";");
            allMeasures.sort(d3.ascending);

           

            allPeriods = allPeriods.toString().split(";");
			
			combinedTitle = allMeasures.concat("");

            combinedTitle = combinedTitle.concat(allPeriods);
			

		   var  distinctClients = d3.set(
                data
				.filter(function(d) { //console.log(d.ENV); console.log(envVar)
                    return d.CLIENT !== ""
                })
                .map(function(d) {
                    return d.CLIENT;
                })).values();


distinctClients.forEach(function(d) {				
					 $(function() {
 $("#clientDropDown").append('<option class="MPdroptext" value="'+d+'">'+d+'</option>');
    $( "#clientDropDown" ).selectmenu();
 
  });	
     });	

 $(function() {

     $( "#clientDropDown" ).selectmenu({
         change: function( event, ui ) {
             //console.log(ui);
			 $(".MPTitleLabel").remove();
			 $("#DEVMPheaderLi").removeClass("active");				
			 $("#DEVMPheaderDi").removeClass("active");
			 $("#QAMPheaderLi").removeClass("active");				
			 $("#QAMPheaderDi").removeClass("active");
			 $("#UATMPheaderLi").removeClass("active");				
			 $("#UATMPheaderDi").removeClass("active");
			 $("#PRDMPheaderLi").removeClass("active");				
			 $("#PRDMPheaderDi").removeClass("active");			 
             var selected_value = ui.item.value;
			 filterByClient(selected_value);

         }
     });
});	 
	 
	 
	 
	 

				
	 
	 

function envLoop(envVar,client){
            //Find Distinct Clients
            distinctClients = d3.set(
                data.filter(function(d) { //console.log(d.ENV); console.log(envVar)
				if (client=='All'){return d.ENV == envVar}else{return d.ENV == envVar && d.CLIENT==client}
                    
                })
                .map(function(d) {
                    return d.CLIENT;
                })).values();
				

	distinctClients.sort(d3.ascending);


        var svg = d3.select("#"+envVar+"MP").append("svg").attr("class","MPTitleLabel")
            .attr("width", "99%")
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


            //Client Label
            var clientLabel = d3.select("#"+envVar+"CLI")
                .append("svg:svg").attr("class","measurePeriodChart")
                .attr("width", "100%")
                .attr("height", function(d) { 
                    return distinctClients.length * 40 +20+ "px";
                })

            clientLabel.selectAll(".textLabel")
                .data(distinctClients)
                .enter().append("text")
                .attr("text-anchor", "left")
                .attr("textAlign", "left")
				//.attr("font-size", "12px")
                .attr("x", "20")
                .attr("y", function(d) {
                    return distinctClients.indexOf(d) * 40 + 40 + "px";
                })
                .text(function(d) {
                    return d
                })
                .attr("class", "textLabel");

            //Define the main body
            var clientBody = d3.select("#"+envVar+"CLILine")
                .append("svg:svg").attr("class","measurePeriodChart")
                .attr("width", "99%")
                .attr("height", function(d) {
                    return distinctClients.length * 40 + 40 + "px";
                });

            clientBody.selectAll(".clientLine")
                .data(distinctClients)
                .enter().append("svg:line")
                .attr("class", 'd3-dp-line')
                .attr("x1", 0)
                .attr("y1", function(d) {
                    return distinctClients.indexOf(d) * 40 + 20 + "px";
                })
                .attr("x2", "90%")
                .attr("y2", function(d) {
                    return distinctClients.indexOf(d) * 40 + 20 + "px";
                })
                //.style("stroke-dasharray", ("3, 3"))
                // .style("stroke-opacity", 0.8)
                .style("stroke", materializeColors.dgrey)
                .attr("stroke-width", ".5")
                .attr("class", "clientLine");
				
				
			clientBody.call(tip);


            clientsFil = data.filter(function(d) { if(client=='All'){return d.ENV == envVar}
                else {return d.ENV == envVar&&d.CLIENT == client;}
            });

            clientsFil.sort(d3.ascending)



            clientsFil.forEach(function(a, i) {

				//remove empty strings
				a.subMeasures = a.subMeasures.filter(function(e){return e}); 
				//a.subInactiveMeasures = a.subInactiveMeasures.filter(function(e){return e}); 



                //All measures that are run
                clientBody.selectAll(".clientBox")
                    .data(a.subMeasures)
                    .enter().append("rect")
                    .attr("class", "tile")

                .attr("x", function(d,k) { 
				if(a.subMeasures[k]==' 1TOTAL MEASURES'){return allMeasures.indexOf(a.subMeasures[k]) * 30 +10 + "px";}
				else {return allMeasures.indexOf(a.subMeasures[k]) * 30 + 20+"px";}
                    })
                    .attr("y", function(d) {
                        return distinctClients.indexOf(a.CLIENT) * 40 + 20 + "px";
                    })
					.attr("width", function(d, i) { 
				if(a.subMeasures[i]==' 1TOTAL MEASURES'){return "30px";}
				else{return "20px";}                       
                    })
					.attr("height", function(d, i) { 
				if(a.subMeasures[i]==' 1TOTAL MEASURES'){return "30px";}
				else{return "20px";}                       
                    })
                    .style("opacity", .9)
                    .style("fill", function(d,i) { if(a.subMeasures[i]==' 1TOTAL MEASURES'){return materializeColors.dblue}else{return materializeColors.green} })
					.on('mouseover', function(d){tip.show(a.max_run);})
					.on('mouseout', function(d){tip.hide(a.max_run);});
					
					
				//All measures that are NOT run
                var measuresNotRun = allMeasures.filter(function(el) {
                    return a.subMeasures.indexOf(el) < 0;
                });

				measuresNotRun = measuresNotRun.filter(function(el) {
                    return a.subInactiveMeasures.indexOf(el) < 0;
                });


                clientBody.selectAll(".clientBoxNotRun")
                    .data(measuresNotRun)
                    .enter().append("rect")
                    .attr("class", "tileNotRun")
                    .attr("x", function(d, i) { 
                        return allMeasures.indexOf(measuresNotRun[i]) * 30+ 20 + "px";
                    })
                    .attr("y", function(d) {
                        return distinctClients.indexOf(a.CLIENT) * 40 + 20 + "px";
                    })
                    .attr("width", "20px")
                    .attr("height", "20px")
                    .style("opacity", 1)
                    .style("fill", materializeColors.lgrey);

                //Text Counts for all measures per Initiative
                clientBody.selectAll(".clientBoxMeasures")
                    .data(a.subMeasures_count)
                    .enter().append("text")

                .attr("x", function(d, i) {
				z=a.subMeasures_count[i];
				
				if (a.subMeasures[i]==' 1TOTAL MEASURES')
				{return combinedTitle.indexOf(a.subMeasures[i])  * 30+ 20 +6.5-z.length*3.75+ "px";}
						else if ( z!==undefined)

						{return combinedTitle.indexOf(a.subMeasures[i]) * 30 + 20+12.5-z.length*3.25+ "px";}
                    })
                    .attr("y", function(d,i) { if (a.subMeasures[i]==' 1TOTAL MEASURES'){return distinctClients.indexOf(a.CLIENT) * 40 + 39 + "px";}
					else {return distinctClients.indexOf(a.CLIENT) * 40 + 34 + "px";}
                        
                    })
					.attr("fill","white")
					//.attr("font-weight","bold")
					.attr("font-size",function(d,i) {
					if(a.subMeasures[i]==' 1TOTAL MEASURES') {return "16px";}
                     else  {return "12.5px";}
                    })	
					                  .attr("text-anchor", "center")
                .attr("textAlign", "center")
					.text(function(d,i) {
                        return a.subMeasures_count[i]
                    })
					.on('mouseover', function(d){tip.show(a.max_run);})
					.on('mouseout', function(d){tip.hide(a.max_run);});

	
					

				//remove empty strings
				a.subInactiveMeasuresRun = a.subInactiveMeasuresRun.filter(function(e){return e}); 
				a.subInactiveMeasures = a.subInactiveMeasures.filter(function(e){return e}); 
					
				//All measures that WERE run inactive_measures	
                clientBody.selectAll(".clientBox")
                    .data(a.subInactiveMeasuresRun)
                    .enter().append("rect")
                    .attr("class", "tile")

                .attr("x", function(d,k) { 
                        return allMeasures.indexOf(a.subInactiveMeasures[k]) * 30+ 20 + "px";
                    })
                    .attr("y", function(d) {
                        return distinctClients.indexOf(a.CLIENT) * 40 + 20 + "px";
                    })
                    .attr("width", "20px")
                    .attr("height", "20px")
                    .style("opacity", .4)
                    .style("fill", materializeColors.yellow2)
					.on('mouseover', function(d){tip.show(d);})
					.on('mouseout', function(d){tip.hide(d);});

               


                //All periods that are run
                clientBody.selectAll(".clientBoxPeriod")
                    .data(a.subPeriods)
                    .enter().append("rect")
                    .attr("class", "tilePeriod")

                .attr("x", function(d, i) { 
				if(a.subPeriods[i]==" TOTAL"){return combinedTitle.indexOf(a.subPeriods[i]) * 30+ 20 -10 + "px";}
				else{return combinedTitle.indexOf(a.subPeriods[i]) * 30+ 20 + "px";}                       
                    })
                    .attr("y", function(d) {
                        return distinctClients.indexOf(a.CLIENT) * 40 + 20 + "px";
                    })
					.attr("width", function(d, i) { 
				if(a.subPeriods[i]==" TOTAL"){return "30px";}
				else{return "20px";}                       
                    })
					.attr("height", function(d, i) { 
				if(a.subPeriods[i]==" TOTAL"){return "30px";}
				else{return "20px";}                       
                    })
                    // .attr("width", "20px")
                    // .attr("height", "20px")
                    .style("opacity", .9)
                    .style("fill", function(d,i) {   if(a.subPeriods[i]==' TOTAL'){return materializeColors.dblue}else{return materializeColors.green} })
					.on('mouseover', function(d){tip.show(a.max_run);})
					.on('mouseout', function(d){tip.hide(a.max_run);});		

					
					
					
					
                //Text Count for all periods that are run
                clientBody.selectAll(".clientBox")
                    .data(a.subPeriods_count)
                    .enter().append("text")


                .attr("x", function(d, i) {
				z=a.subPeriods_count[i];
						if(a.subPeriods[i]==" TOTAL"){return combinedTitle.indexOf(a.subPeriods[i])  * 30+ 20 +6-z.length*3.25+ "px";}
				
						else if ( z!==undefined)

						{return combinedTitle.indexOf(a.subPeriods[i])  * 30+ 20 +12.5-z.length*3.25+ "px";}
                    })
                    .attr("y", function(d,i) {
					if(a.subPeriods[i]==" TOTAL") {return distinctClients.indexOf(a.CLIENT) * 40 + 39 + "px";}
                     else  {return distinctClients.indexOf(a.CLIENT) * 40 + 34 + "px";}
                    })
					.attr("fill","white")
					      // .attr("fill",function(d,i) {
					// if (-a.subPeriods_count[i]*-1>15){return materializeColors.red}
					// if (-a.subPeriods_count[i]*-1>8){return materializeColors.yellow2}
					// else{return "white"}
					// })
					.attr("font-size",function(d,i) {
					if(a.subPeriods[i]==" TOTAL") {return "16px";}
                     else  {return "12.5px";}
                    })
				.attr("text-anchor", "center")
                .attr("textAlign", "center")
					.text(function(d,i) {
                        return a.subPeriods_count[i]
                    })
					.on('mouseover', function(d){tip.show(a.max_run);})
					.on('mouseout', function(d){tip.hide(a.max_run);});		
 			
				//remove empty strings
				a.subInactivePeriods = a.subInactivePeriods.filter(function(e){return e}); 
				a.subInactivePeriodsRun = a.subInactivePeriodsRun.filter(function(e){return e}); 

                //All periods that WERE are run
                clientBody.selectAll(".clientBoxPeriod")
                    .data(a.subInactivePeriodsRun)
                    .enter().append("rect")
                    .attr("class", "tilePeriod")
                .attr("x", function(d, i) {
                        return combinedTitle.indexOf(a.subInactivePeriods[i]) * 30+ 20 + "px";
                    })
                    .attr("y", function(d) {
                        return distinctClients.indexOf(a.CLIENT) * 40 + 20 + "px";
                    })
                    .attr("width", "20px")
                    .attr("height", "20px")
                    .style("opacity", .4)
                    .style("fill", materializeColors.yellow2)
					.on('mouseover', function(d){tip.show(d);})
					.on('mouseout', function(d){tip.hide(d);});			
				
				
				
				//All periods that are NOT run
                var periodsNotRun = allPeriods.filter(function(el) {
                    return a.subPeriods.indexOf(el) < 0;
                });
				
				periodsNotRun = periodsNotRun.filter(function(el) {
                    return a.subInactivePeriods.indexOf(el) < 0;
                });

                clientBody.selectAll(".clientBox")
                    .data(periodsNotRun )
                    .enter().append("rect")
                    .attr("class", "tile")
                    .attr("x", function(d, i) {
                        return combinedTitle.indexOf(periodsNotRun[i]) * 30+ 20 + "px";
                    })
                    .attr("y", function(d) {
                        return distinctClients.indexOf(a.CLIENT) * 40 + 20 + "px";
                    })
                    .attr("width", "20px")
                    .attr("height", "20px")
                    .style("opacity", 1)
                    .style("fill", materializeColors.lgrey);	


            })




            Title = svg.selectAll(".textLabel")
                .data(combinedTitle)
                .enter().append("text")
            .attr("text-anchor", "left")
                .attr("textAlign", "center")
            .text(function(d) {
                    if(d==' 1TOTAL MEASURES'){return 'TOTAL'} else {return d}})
                 .attr("class", "cliLabel")              
				.attr("font-weight",function(d){if (d==' 1TOTAL MEASURES' ||d==" TOTAL"){return "bold"}})
				.style("font-size",function(d){if (d==' 1TOTAL MEASURES' ||d==" TOTAL"){return "16px"}else {return "12px"}})
                .attr("transform", function(d) {
				if (d==' 1TOTAL MEASURES' ||d==" TOTAL"){k = combinedTitle.indexOf(d) * 30;}else{k = combinedTitle.indexOf(d) * 30+ 5;};
                    
                    return "translate(" + k + ",10) rotate(90)"
                });

				
		
// $("#"+envVar+"MPheaderLi").removeClass("active");				
// $("#"+envVar+"MPheaderDi").removeClass("active");				
if((distinctClients.length>0 && client!=='All'))
 {
//console.log(envVar)
 $("#"+envVar+"MPheaderDi").addClass("active");
 $("#"+envVar+"MPheaderLi").addClass("active");
 };
//document.getElementById(envVar+"MPheader").className = 'collapsible-header active grey lighten-3';

// }
//else
//{

//document.getElementById(envVar+"MPheader").className = 'collapsible-header grey lighten-3';




//}

            








};

function populateEnviornments(client){

$("#DEVMPheader").removeClass("active");	
envLoop("DEV",client)
$("#QAMPheader").removeClass("active");
envLoop("QA",client)
$("#UATMPheader").removeClass("active");
envLoop("UAT",client)
$("#PRDMPheader").removeClass("active");
envLoop("PRD",client)



    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
			
			
}

populateEnviornments('All')

function filterByClient(client)		
{
$(".measurePeriodChart").remove();
populateEnviornments(client)


}



      });
		

};