d3.csv("data/report_output.csv", function(error, csvData) {
  if (error) throw error;
  
  
  csvData.forEach(function(d) {
  d.updated_timestamp=d.updated_timestamp;
  })
    

var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse,
    formatDate = d3.time.format("%a %m/%d/%y %I:%M %p");

	 var updateTS = d3.max(csvData, function(d) {return d.updated_timestamp.substring(0, 19);}) ;
	 updateTS= formatDate(parseDate(updateTS));
		
		d3.select("#updatetime").html("<timeLabel>Updated: </timeLabel><timeValue>"+updateTS+"</timeValue>");
})	