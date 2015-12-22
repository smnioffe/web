






function njduration(selectVar){
    d3.csv("data/output.csv" + '?' + Math.floor(Math.random() * 1000), function(error, clients) {
        if (error) throw error;

		var laststepArr=[]
		var stepArr=[]
		var dbArr=[]
		var xArr=[]
		var yArr=[]		



	//var thisName	
        // Coerce the CSV data to the appropriate types.
        clients//.filter(function(d){ return d.type == "job duration"; })
		.forEach(function(d,i) {
			//d.name	start_time	end_date	job_complete	run_days	run_hours	run_minutes	last_step_name	last_step_id	last_step_date	ENV	CLIENT	entry_timestamp	updated_timestamp

            d.ENV = d.ENV;
            d.CLIENT = d.CLIENT;
            d.name = d.name;
			d.durationClean=d.run_hours;
			d.run_date=d.run_days;
            d.run_hours= -d.run_hours*-1;
			d.run_days=-d.run_days*-1;
			d.run_hours=-d.run_hours*-1;
            //d.run_duration= d.run_duration;

          // d.type=d.type;
            d.step_name=d.last_step_name;
            d.last_step_id=d.last_step_id;
            //d.run_date=d.start_time;
            //d.step=parseInt(d.value2.substring(0, 3));
            d.last_job_step=-d.value5*-1;
			d.updated_timestamp=d.updated_timestamp;
			//d.database_name=d.database_name;
			
			
			d.orderRun=-d.job_complete*-1;
			d.duration=-d.run_minutes*-1;
			
			d.status=d.last_step_name;
			
			

            if (d.CLIENT=="ONPOINT"){d.CLIENT="ONPT"}

            d.job_complete=d.job_complete
			
			
			// if (d.type=="job duration history") 
			// {thisName = d.name}
				
		//if (d.type == "last step" || d.type == "previous run" || d.type == "failed" )
			//{		
		// laststepArr.push(d.last_job_step);
		// stepArr.push(d.step);
		// dbArr.push(d.database_name);
			//}

        })

		clientsHis=clients.filter(function(d){ return d.type == "job duration history"; })
		
		//clientsHis.sort(function(a,b) {return d3.descending(b.orderRun-a.orderRun);});

		
		clients=clients.filter(function(d){ return d.type == "job duration"; })
		
		


        var distinctClients = d3.set(
            clients.filter(function(d){ return d.type == "job duration"; })
                .map(function(d){ return d.CLIENT; })
            //.filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
        ).values();


       //console.log(clients.CLIENT)
		
		
		
		 var middle = Math.ceil(distinctClients.length / 2);

        var leftDistinctClients= distinctClients.slice( 0, middle );
        var rightDistinctClients= distinctClients.slice( middle );
		
		
		

function drawrun_hours(distinctClients){

clientsFil=clients.filter(function(d){ return distinctClients.indexOf(d.CLIENT) > -1; })

clientsHisFil=clientsHis.filter(function(d){ return distinctClients.indexOf(d.CLIENT) > -1; });
//.sort(function(a, b) {
    // return d3.descending(b.orderRun,a.orderRun)});

		



		 var xdomain=['DEV','QA','UAT','PRD'];
        var ydomain= distinctClients.sort(d3.ascending);

        var max = d3.max(clientsFil, function(d) {return ydomain.indexOf(d.CLIENT)*160+75;} );

        var margin = {top: 100, right: 100, bottom: 10, left: 100},
            width = 960 - margin.left - margin.right,
            height = max + 300 - margin.top - margin.bottom;

        var svg = d3.select("body").append("svg").attr("class","njdurationchart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		

        var yAxis = svg.selectAll(".tile")
            .data(distinctClients).enter();

        var xAxis = svg.selectAll(".tile")
            .data(xdomain).enter();

        var zAxis = svg.selectAll(".tile")
            .data(clientsFil)//.filter(function(d){ return d.type == "last step"  || d.type == "previous run" || d.type == "failed"; }))
            .enter();

        var zAxisErr = svg.selectAll(".tile")
            .data(clientsFil)//.filter(function(d){ return d.type == "failed step"}))
            .enter();

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<p2><strong>Last Step:</strong> <span>" + d.last_step_name + "</span></p2><br><strong>Step No:</strong> <span>" + d.last_step_id + "</span>";
            });

        svg.call(tip);
		
		
		 var tipHis = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<p2><strong>Run:</strong> <span>" + d.run_date+ "</span></p2><br><strong>Duration : </strong> <span>"
				+d.durationClean + "</span></p2><br><strong>Outcome: </strong> <span>" +d.status+ "</span>";
            });


        svg.call(tipHis);

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

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







        var circle2=
            svg.append('g').selectAll(".tile")
			//.attr("class", 'svg')
                .data(clientsFil)

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







        var pi = Math.PI;

        clientsFil.forEach(function(d,i) {
            d.x = xdomain.indexOf(d.ENV)*175+75+75;



            d.y = ydomain.indexOf(d.CLIENT)*160+75;

            
			//d.k = d.step/d.last_job_step*360 * (Math.PI/180);
			
			//if (d.type == "last step" || d.type == "previous run" || d.type == "failed" )
			//{
		xArr.push(d.x);
		yArr.push(d.y);
			//}
        })
		
		

        var arc = d3.svg.arc()
            .innerRadius(65)
            .outerRadius(68.5)

		

        var innerArc=
            svg.append('g').selectAll(".tile")
                .data(clientsFil)
				//.data(dbArr)
                .enter().append("path")
				.attr("class", 'svg')
                .attr("d",
                arc.startAngle(0)//function(d){ if (isNaN(start)){return 0} else 
					//return start
					//function(d){return d.start})
					.endAngle(360)
					)
                .attr("transform", function(d) {
                    return "translate(" + 
					//xArr[k]
					d.x + "," + 
					//yArr[k]
					d.y	+ ")";})
                //,materializeColors.yellow2)//
                .style("fill",function(d) {
					if (d.job_complete==1){return materializeColors.lblue} else
					if (d.run_days>0){return materializeColors.red2} else
					if (d.run_hours > 12){return materializeColors.yellow2} else
					{return materializeColors.lgreen} });

	var barHeight=30
	
	var y2 = d3.scale.linear()
    .range([barHeight,0]);			
				

		
			
  svg.selectAll(".hisbar")
      .data(clientsHisFil)
    .enter().append("rect")
      .attr("class", "hisbar")
      .attr("x",function(d) {return xdomain.indexOf(d.ENV)*175+190-10*d.orderRun+"px";})
      .attr("width", "9px")
      .attr("y",function(d) {
	   y2.domain([d3.max(clientsHisFil.filter(function(k){ return k.name == d.name;}), function(d) { return d.duration; }),0]);
	  return ydomain.indexOf(d.CLIENT)*160+150-y2(d.duration)-barHeight;
	  
	  })
      .attr("height", function(d) { 
	   y2.domain([d3.max(clientsHisFil.filter(function(k){ return k.name == d.name;}), function(d) { return d.duration; }),0]);
	  return y2(d.duration); 
	  
	  })
	  .style("fill",function(d){
	   if(d.duration>240000)  {return materializeColors.red2;}
	   else if (d.duration>120000) {return materializeColors.yellow2;}
	  else {return materializeColors.lgreen;}})
	  .style("opacity",.75)
            .on('mouseover', synchronizedMouseOverHis)
            .on("mouseout", synchronizedMouseOutHis);

		

   MainStat= zAxis.append("text").attr("class", 'svg')
            .attr("x",function(d) {
                return xdomain.indexOf(d.ENV)*175+75+75+"px";
            })
            .attr("y",function(d) {
                return ydomain.indexOf(d.CLIENT)*160+65+"px";
            })
			.style("fill",function(d) {
					if (d.run_days>0){return materializeColors.red2} else
					if (d.run_hours > 12){return materializeColors.yellow2} else
					{return materializeColors.lgreen} })
            .style("font-size","30px")
            .style("font-family","digital-7")
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .text(function(d) {return  d.run_days + ':'+ zeroPad(d.run_hours,2) + ':' +zeroPad(d.run_minutes,2);
            })
            .on('mouseover', synchronizedMouseOver)
            .on("mouseout", synchronizedMouseOut)
            .transition()
            .filter(function(d){ return d.job_complete==0; })
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
            function(d){return materializeColors.lgrey})
            .style("font-size","10px")
            .style("font-family","Roboto")
            .style("text-anchor", "middle")
            .text("day: hr: min")

            .transition()
            .filter(function(d){ return d.job_complete==0; })
            .duration(600)
            .each(flash);
			
			
			
			zAxis.append("text").attr("class", 'svg')
            .attr("x",function(d) {
                return xdomain.indexOf(d.ENV)*175+76+75+"px";
            })
            .attr("y",function(d) {
                return ydomain.indexOf(d.CLIENT)*160+35+"px";
            })
                .style("fill",function(d) {
					if (d.job_complete==1){return materializeColors.lblue} else
					if (d.run_days>0){return materializeColors.red2} else
					if (d.run_hours > 12){return materializeColors.yellow2} else
					{return materializeColors.lgreen} })
            .style("font-size","10px")
            .style("font-family","Roboto")
            .style("text-anchor", "middle").filter(function(d){ return d.job_complete==0; })
            .text("IN PROGRESS")

            .transition()
            .filter(function(d){ return d.job_complete==0; })
            .duration(600)
            .each(flash);





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


			
        // warning
            // .on('mouseover', synchronizedMouseOver)
            // .on("mouseout", synchronizedMouseOut);


        function synchronizedMouseOver(d) {
            tip.show(d);
        }

        function synchronizedMouseOut(d) {
            tip.hide(d);
        }
		
		function synchronizedMouseOverHis(d) {
            tipHis.show(d);
        }

        function synchronizedMouseOutHis(d) {
            tipHis.hide(d);
        }

		
	}
	

	if($(window).width()>1700 && $(".njchartduration").length!==1&& $(".njchartduration").length!==2){
	drawrun_hours(leftDistinctClients);
	drawrun_hours(rightDistinctClients);}
	else if ($(".njchartduration").length!==1&& $(".njchartduration").length!==2){
	drawrun_hours(distinctClients)}

	

// $(window).resize(function() {

// alert('window was resized!');

// });





    });

};
