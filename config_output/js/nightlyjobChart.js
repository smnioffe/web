






function nj(selectVar){
    d3.csv("data/report_output.csv" + '?' + Math.floor(Math.random() * 1000), function(error, clients) {
        if (error) throw error;

		var laststepArr=[]
		var stepArr=[]
		var dbArr=[]
		var xArr=[]
		var yArr=[]		

		

		
        // Coerce the CSV data to the appropriate types.
        clients.filter(function(d){ return d.orig_table == "nightly job"; }).forEach(function(d,i) {
            d.ENV = d.env;
            d.CLIENT = d.client;
            d.name = d.name;
            d.status= d.value1;
            //d.run_duration= d.run_duration;
            d.orig_table=d.orig_table;
            d.type=d.type;
            d.step_name=d.value2;
            d.most_recent=-d.value3*-1;
            d.run_date=d.value4;
            d.step=parseInt(d.value2.substring(0, 3));
            d.last_job_step=-d.value5*-1;
			d.updated_timestamp=d.updated_timestamp;
			d.database_name=d.database_name;
			

            if (d.CLIENT=="ONPOINT"){d.CLIENT="ONPT"}

            if ( d.most_recent==1 && d.type == "last step"
                && d.step !== d.last_job_step && d.status=="Success"
                ){ d.inprog=1	}
				
		if (d.type == "last step" || d.type == "previous run" || d.type == "failed" )
			{		
		laststepArr.push(d.last_job_step);
		stepArr.push(d.step);
		dbArr.push(d.database_name);
			}

        })




        var distinctClients = d3.set(
            clients.filter(function(d){ return d.orig_table == "nightly job"; })
                .map(function(d){ return d.CLIENT; })
            //.filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
        ).values();


       
		
		
		 var middle = Math.ceil(distinctClients.length / 2);

        var leftDistinctClients= distinctClients.slice( 0, middle );
        var rightDistinctClients= distinctClients.slice( middle );
		
		
		
		

function draw(distinctClients){

clientsFil=clients.filter(function(d){ return distinctClients.indexOf(d.CLIENT) > -1; })



		 var xdomain=['DEV','QA','UAT','PRD'];
        var ydomain= distinctClients.sort(d3.ascending);

        var max = d3.max(clientsFil, function(d) {return ydomain.indexOf(d.CLIENT)*160+75;} );

        var margin = {top: 100, right: 100, bottom: 10, left: 100},
            width = 960 - margin.left - margin.right,
            height = max + 300 - margin.top - margin.bottom;

        var svg = d3.select("body").append("svg").attr("class","njchart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		

        var yAxis = svg.selectAll(".tile")
            .data(distinctClients).enter();

        var xAxis = svg.selectAll(".tile")
            .data(xdomain).enter();

        var zAxis = svg.selectAll(".tile")
            .data(clientsFil.filter(function(d){ return d.type == "last step"  || d.type == "previous run" || d.type == "failed"; }))
            .enter();

        var zAxisErr = svg.selectAll(".tile")
            .data(clientsFil.filter(function(d){ return d.type == "failed step"}))
            .enter();

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<p2><strong>Step:</strong> <span>" + d.step_name + "</span></p2><br><strong>Status:</strong> <span>" + d.status + "</span>";
            });

        svg.call(tip);



        yAxis.append("svg:line")
            .attr("class", 'd3-dp-line')
            .attr("x1", -25)
            .attr("y1", function(d) {
                return distinctClients.indexOf(d)*160+75+77+"px";
            })
            .attr("x2", 800)
            .attr("y2", function(d) {
                return distinctClients.indexOf(d)*160+75+77+"px";
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
            .attr("height", max+130)
            .style("opacity",.9)
            // function(d) {
            // if (xdomain.indexOf(d) % 2 == 0)
            // {return .7} else {return 1} })
            .style("fill", "#1C1C1C");




        yAxis.append("text")
		    .attr("class", 'svg')
            .attr("x", -15
        )
            .attr("y",function(d) {
                return distinctClients.indexOf(d)*160+75+"px";
            })
            .style("fill",materializeColors.white)
            .style("font-size","16px")
            .style("font-family","Roboto")
            .style("font-weight","bold")
            .text(function(d){
                return d;
            });


        xAxis.append("text")
		.attr("class", 'svg')
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


        var colorstat=function(d){
            if (d.status == "Success" && d.most_recent == 1 && d.inprog !== 1) {return materializeColors.lgreen}
            if (d.type == "previous run" && d.status!=="Success" && d.ENV !== "DEV") {return materializeColors.yellow2}
            if (d.most_recent == 1 && d.status =="Failed") {return materializeColors.red2}
            if (d.most_recent == 1 && d.status =="Cancelled") {return materializeColors.yellow2}
            if (d.ENV == "DEV" || d.inprog == 1) {return materializeColors.lblue}
            if (d.type == "previous run" ) {return materializeColors.yellow2}
            else{return materializeColors.red2}
            //return colorScale(-d.step_name.substring(0, 3)*-1)
        }






        var circle2=
            svg.append('g').selectAll(".tile")
			//.attr("class", 'svg')
                .data(clientsFil.filter(function(d){ return d.type == "last step" || d.type == "previous run" || d.type == "failed"; }))

                .enter().append("circle")
                .attr("class", "innercircle")
                .attr("cx",function(d) {
                    return xdomain.indexOf(d.ENV)*175+75+75+"px";
                })
                .attr("cy",function(d) {
                    return ydomain.indexOf(d.CLIENT)*160+75+"px";
                })
                .attr("r", "63px")
                .style("stroke-width",0)
                .style("fill","#2A2A2A")
                .style("font-family","Roboto")
        // .style("stroke",function(d) {return colorstat(d)} );
        //   .transition()
        // .filter(function(d){ return d.inprog==1; })
        // .duration(800)
        // .each(flash);






        var pi = Math.PI;

        clientsFil.filter(function(d){ return d.orig_table == "nightly job"; }).forEach(function(d,i) {
            d.x = xdomain.indexOf(d.ENV)*175+75+75;



            d.y = ydomain.indexOf(d.CLIENT)*160+75;

            
			d.k = d.step/d.last_job_step*360 * (Math.PI/180);
			
			if (d.type == "last step" || d.type == "previous run" || d.type == "failed" )
			{
		xArr.push(d.x);
		yArr.push(d.y);
			}
        })
		
		

        var arc = d3.svg.arc()
            .innerRadius(63)
            .outerRadius(68.5)
            //.startAngle(0)
        //.startAngle(45 * (Math.PI/180)) //converting from degs to radians
        //just radians
        var arc2 = d3.svg.arc()
            .innerRadius(72)
            .outerRadius(74)
            .startAngle(0)
			
		var arcPiece1 = d3.svg.arc()
            .innerRadius(72)
            .outerRadius(74)

	        var arcPiece2 = d3.svg.arc()
            .innerRadius(63)
            .outerRadius(68.5)	
		
		// var Arcjobs = d3.set(
        // clientsFil.filter(function(d){ return d.orig_table == "nightly job"; })
        // .map()
            // //.filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
        // ).values();	
		// var laststepArr=[]
		// var stepArr=[]
		// var dbArr=[]
		// clientsFil.filter(function(d){ return d.orig_table == "nightly job"; }).forEach(function(d,i) {
			
		// laststepVar=clientsFil.map(function (d) {if (isNaN(d.last_job_step)){return 0} else 
					// return d.last_job_step;})
					
		// stepVar=clientsFil.map(function (d) {if (isNaN(d.step)){return 0} else 
					// return d.step;})
					
		// dbVar=clientsFil.map(function (d) {if (isNaN(d.database_name)){return 0} else 
					// return d.database_name;})	
		
		// laststepArr.push(laststepVar);
		// stepArr.push(stepVar);
		// dbArr.push(dbVar);
					
		// })
	 	//console.log(laststepArr) 
// for (k=0;k<1;k++)	{
// for (i = 0; i < stepArr[k]; i++) {
	
		// end = ((360/laststepArr[k]))*i+2 * (Math.PI/180);
		// start = ((360/laststepArr[k]))*i-2 * (Math.PI/180);
// console.log(start +' '+end +' '+ dbArr[k]+' '+i+' '+k) 
        var innerArc=
            svg.append('g').selectAll(".tile")
                .data(clientsFil.filter(function(d){ return d.type == "last step" || d.type == "previous run" || d.type == "failed"; }))
				//.data(dbArr)
                .enter().append("path")
				.attr("class", 'svg')
                .attr("d",
                arc.startAngle(0)//function(d){ if (isNaN(start)){return 0} else 
					//return start
					//function(d){return d.start})
					.endAngle( function(d){ return d.k//if (isNaN(end)){return 0} else 
					//return end					
					})
					)
                .attr("transform", function(d) {
                    return "translate(" + 
					//xArr[k]
					d.x + "," + 
					//yArr[k]
					d.y	+ ")";})
                //,materializeColors.yellow2)//
                .style("fill",function(d) {
					if (d.inprog==1){return materializeColors.lgreen} else
					return colorstat(d)} );
// }
// }

        var innerArcPiece=
            svg.append('g').selectAll(".tile")
                .data(clientsFil.filter(function(d){ return( d.type == "last step" || d.type == "previous run" || d.type == "failed")&& d.inprog==1; }))
                .enter().append("path")
				.attr("class", 'svg')
                .attr("d",
                arcPiece1.startAngle( function(d){ return d.k					
					})
					.endAngle( function(d){ return d.k	+.4				
					})
					)
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y+ ")";})
                .style("fill",function(d) {
					if (d.inprog==1){return materializeColors.lblue} else
					return colorstat(d)} )
                .transition()
                .filter(function(d){ return d.inprog==1; })
				//.delay(200)
                .duration(600)
                .each(flash);


        var outerArc=
            svg.append('g').selectAll(".tile")
                .data(clientsFil.filter(function(d){ return d.type == "last step" || d.type == "previous run" || d.type == "failed"; }))
                .enter().append("path")
                .attr("d",
                arc2.endAngle( function(d){return d.k})
            )
				.attr("class", 'svg')
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";})
                .style("fill",function(d) {
					if (d.inprog==1){return materializeColors.lgreen} else
					return colorstat(d)} );

				
				
		        var outerArcPiece=
            svg.append('g').selectAll(".tile")
                .data(clientsFil.filter(function(d){ return( d.type == "last step" || d.type == "previous run" || d.type == "failed")&& d.inprog==1; }))
                .enter().append("path")
				.attr("class", 'svg')
                .attr("d",
                arcPiece2.startAngle( function(d){ return d.k					
					})
					.endAngle( function(d){ return d.k	+.4					
					})
					)
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y+ ")";})
                .style("fill",function(d) {
					if (d.inprog==1){return materializeColors.lblue} else
					return colorstat(d)} )
                .transition()
                .filter(function(d){ return d.inprog==1; })
				//.delay(200)
                .duration(600)
                .each(flash);		

   MainStat= zAxis.append("text").attr("class", 'svg')
            .attr("x",function(d) {
                return xdomain.indexOf(d.ENV)*175+75+75+"px";
            })
            .attr("y",function(d) {
                return ydomain.indexOf(d.CLIENT)*160+65+"px";
            })
            .style("fill",function(d) {
                if(d.inprog==1) {return materializeColors.yellow2} else
                    return colorstat(d)} )
            .style("font-size","14px")
            .style("font-family","Roboto")
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .text(function(d) {
                if (d.type == "previous run") {return "NOT RUN"} else
                if(d.inprog==1) {return "IN PROGRESS"} else
                    return  d.status.toUpperCase();//modify_timestamp.substring(0, 10);
            })
            .on('mouseover', synchronizedMouseOver)
            .on("mouseout", synchronizedMouseOut)
            .transition()
            .filter(function(d){ return d.inprog==1; })
            .duration(600)
            .each(flash)
			;


        zAxis.append("text").attr("class", 'svg')
            .attr("x",function(d) {
                return xdomain.indexOf(d.ENV)*175+75+75+"px";
            })
            .attr("y",function(d) {
                return ydomain.indexOf(d.CLIENT)*160+77.5+"px";
            })
            .style("fill",
            function(d){
                if(d.type == "previous run" && d.status!=="Success")
                {return materializeColors.yellow2}
                else return materializeColors.lgrey})//function(d) {return colorstat(d)} )
            .style("font-size","10px")
            .style("font-family","Roboto")
            .style("text-anchor", "middle")
            .text(function(d) {
                if (d.type == "previous run" && d.step !== d.last_job_step && d.status=="Success")
                {return "LAST: STOPPED AT "+d.step}
                if (d.type == "previous run")
                {return "LAST RUN: "+d.status.toUpperCase()}
			    if (d.inprog == 1)
                {return "STEP: "+(d.step+1)}
                else return "LAST STEP: "+d.step
            })

            .transition()
            .filter(function(d){ return d.inprog==1; })
            .duration(600)
            .each(flash);



        zAxis.append("text").attr("class", 'svg')
            .attr("x",function(d) {
                return xdomain.indexOf(d.ENV)*175+75+75+"px";
            })
            .attr("y",function(d) {
                return ydomain.indexOf(d.CLIENT)*160+90+"px";
            })
            .style("fill",materializeColors.lgrey)//function(d) {return colorstat(d)} )
            .style("font-size","10px")
            .style("font-family","Roboto")
            .style("text-anchor", "middle")
            .text(function(d) {
                return  d.run_date.substring(4, 6)+"/"+d.run_date.substring(6, 8)+"/"+d.run_date.substring(2, 4)+" ";
            })  .transition()
            .filter(function(d){ return d.inprog==1; })
            .duration(600)
            .each(flash);


        warning=zAxisErr
            //.filter(function(d){ return d.step_name !== "38 Trigger for Measure Processing Deleted Persons"})
            .append("text").attr("class", 'svg')
            .attr("x",function(d) {
                return xdomain.indexOf(d.ENV)*175+75+75+"px";
            })
            .attr("y",function(d) {
                return ydomain.indexOf(d.CLIENT)*160+118+"px";
            })
            .style("fill",materializeColors.yellow2)
            .style("font-size","18px")
            .style("text-anchor", "middle")
            .attr('font-family', 'FontAwesome')
            .text(function(d) { return '\uf071' });


        function flash() {
            var circle = d3.select(this);
            (function repeat() {
                circle = circle.transition()
                    .style("opacity", .9)
                    //.style("fill",materializeColors.blue)
                    .transition()
                    .style("opacity", .2)
                    //.style("fill",materializeColors.lblue)
                    .each("end", repeat);
            })();
        }


			
        warning
            .on('mouseover', synchronizedMouseOver)
            .on("mouseout", synchronizedMouseOut);


        function synchronizedMouseOver(d) {
            tip.show(d);
        }

        function synchronizedMouseOut(d) {
            tip.hide(d);
        }

		
	}
	

	if($(window).width()>1700 && $(".njchart").length!==1&& $(".njchart").length!==2){
	draw(leftDistinctClients);
	draw(rightDistinctClients);}
	else if ($(".njchart").length!==1&& $(".njchart").length!==2){
	draw(distinctClients)}

	

// $(window).resize(function() {

// alert('window was resized!');

// });





    });

};
