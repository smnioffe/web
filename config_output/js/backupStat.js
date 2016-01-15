






function backup(selectVar){
    d3.csv("data/report_output.csv" + '?' + Math.floor(Math.random() * 1000), function(error, clients) {
        if (error) throw error;


		var xArr=[]
		var yArr=[]		




        clients
		.forEach(function(d,i) {


            d.ENV = d.env;
            d.CLIENT = d.client;
            d.name = d.database_name;
			d.backupColor=-d.value2*-1;		
	        d.step_name=d.type;
            d.last_step_name=d.type;
			d.updated_timestamp=d.updated_timestamp;
			d.date_value=d.date_value;		
			d.status=d.type;
			
			

            if (d.CLIENT=="ONPOINT"){d.CLIENT="ONPT"}

            d.job_complete=d.value1;


        })

		

		
		clients=clients.filter(function(d){ return d.orig_table == "backup"; })
		
		


        var distinctClients = d3.set(
            clients
			//.filter(function(d){ return d.orig_table == "job duration"; })
                .map(function(d){ return d.CLIENT; })
            //.filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
        ).values();


		
		distinctClients.sort(d3.ascending);
		
		 var middle = Math.ceil(distinctClients.length / 2);

        var leftDistinctClients= distinctClients.slice( 0, middle );
        var rightDistinctClients= distinctClients.slice( middle );
		
		
		

function drawrun_hours(distinctClients,countVar){

clientsFil=clients.filter(function(d){ return distinctClients.indexOf(d.CLIENT) > -1; })


		



		 var xdomain=['DEV','QA','UAT','PRD'];
        var ydomain= distinctClients.sort(d3.ascending);

        var max = d3.max(clientsFil, function(d) {return ydomain.indexOf(d.CLIENT)*100+75;} );

      var margin = {top: 100, right: 100, bottom: 10, left: 100},
            width = 600 - margin.left - margin.right,
            height = max + 300 - margin.top - margin.bottom;

        var svg = d3.select("body").append("svg").attr("class","backupchart")
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



function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

        yAxis.append("svg:line")
            .attr("class", 'd3-dp-line')
            .attr("x1", -25)
            .attr("y1", function(d) {
                return distinctClients.indexOf(d)*100+100+"px";
            })
            .attr("x2", 500)
            .attr("y2", function(d) {
                return distinctClients.indexOf(d)*100+100+"px";
            })
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke-opacity", 0.6)
            .style("stroke", materializeColors.lgrey);

        xAxis.append("rect")
            .attr("class", "tile")
            .attr("x", function(d) {
                return xdomain.indexOf(d)*100+80+"px";}
        )
            .attr("y",-40)
            .attr("rx",15)
            .attr("ry",15)
            .attr("width", "90px")
            .attr("height", max+115)
            .style("opacity",.9)
            // function(d) {
            // if (xdomain.indexOf(d) % 2 == 0)
            // {return .7} else {return 1} })
            .style("fill", "#404040");




        yAxis.append("text")
		    .attr("class", 'svg')
            .attr("x", -15
        )
            .attr("y",function(d) {
                return distinctClients.indexOf(d)*100+50+"px";
            })
            .style("fill",materializeColors.white)
            .style("font-size","14px")
            .style("font-family","Roboto")
            .style("font-weight","bold")
            .text(function(d){
                return d;
            });


        xAxis.append("text")
		.attr("class", 'svg')
            .attr("x", function(d) {
                return xdomain.indexOf(d)*100+65+50+"px";}
        )
            .attr("y",-15)
            .style("fill",materializeColors.white)
            .style("font-size","16px")
            .style("font-family","Roboto")
            .style("font-weight","bold")
            .text(function(d){
                return d;
            });

			
		




 






        var pi = Math.PI;

        clientsFil.forEach(function(d,i) {
            d.x = xdomain.indexOf(d.ENV)*100+75+50;



            d.y = ydomain.indexOf(d.CLIENT)*100+50;

            

		xArr.push(d.x);
		yArr.push(d.y);

        })
		
		

        var arcOut = d3.svg.arc()
            .innerRadius(40)
            .outerRadius(43.5)
		
		var arcIn = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(38)		

		

        var OuterArc=
            svg.append('g').selectAll(".tile")
                .data(clientsFil)
                .enter().append("path")
				.attr("class", 'svg')
                .attr("d",
                arcOut.startAngle(0)
					.endAngle(360)
					)
                .attr("transform", function(d) {
                    return "translate(" + 
					d.x + "," + 
					d.y	+ ")";})
                .style("fill",		
				function(d) {
					if (d.backupColor==1){return materializeColors.lgreen} else
					if (d.backupColor==2){return materializeColors.yellow2} else
				{return materializeColors.red2}
							});
					
				
				
        var InnerArc=
            svg.append('g').selectAll(".tile")
                .data(clientsFil)
                .enter().append("path")
				.attr("class", 'svg')
                .attr("d",
                arcIn.startAngle(0)
					.endAngle(360)
					)
                .attr("transform", function(d) {
                    return "translate(" + 
					d.x + "," + 
					d.y	+ ")";})
				.style("opacity",.5)	
                .style("fill",		
				function(d) {
					if (d.backupColor==1){return materializeColors.lgreen} else
					if (d.backupColor==2){return materializeColors.yellow2} else
				{return materializeColors.red2}
							});
					
	
				

	var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse,
    formatDate = d3.time.format("%m/%d/%y");	
	formatTime = d3.time.format("%I:%M %p");
	
	
	//var updateTS = d3.max(csvData, function(d) {return d.updated_timestamp.substring(0, 19);}) ;
	 

   MainStat= zAxis.append('text').attr("class", 'svg')
            .attr("x",function(d) {
                return xdomain.indexOf(d.ENV)*100+75+50+"px";
            })
            .attr("y",function(d) {
                return ydomain.indexOf(d.CLIENT)*100+46+"px";
            })
			.text(function(d) {return  formatDate(parseDate(d.date_value));   })
			.style("fill","white")
			// function(d) {
					// if (d.run_days>0){return materializeColors.red2} else
					// //if (d.run_hours > 12){return materializeColors.yellow2} else
					// {return materializeColors.lgreen} })
            .style("font-size","14px")
            .style("font-family","Roboto")
            .style("text-anchor", "middle")
            .style("font-weight", "bold")        
			;


			
   MinorStat= zAxis.append('text').attr("class", 'svg')
            .attr("x",function(d) {
                return xdomain.indexOf(d.ENV)*100+75+50+"px";
            })
            .attr("y",function(d) {
                return ydomain.indexOf(d.CLIENT)*100+60+"px";
            })
			.text(function(d) {return  formatTime(parseDate(d.date_value));   })
			.style("fill","white")

            .style("font-size","12px")
            .style("font-family","Roboto")
            .style("text-anchor", "middle");
            //.style("font-weight", "bold");       





			


		


		
	}
	
	if($(".toggle-button").is( '.toggle-button-selected' ) && $(".backupchart").length!==1&& $(".backupchart").length!==2){
	//if($(window).width()>1700 && $(".backupchart").length!==1&& $(".backupchart").length!==2){
	drawrun_hours(leftDistinctClients,1);
	drawrun_hours(rightDistinctClients,2);}
	else if ($(".backupchart").length!==1&& $(".backupchart").length!==2){
	drawrun_hours(distinctClients,1)}

	

// $(window).resize(function() {

// alert('window was resized!');

// });





    });

};
