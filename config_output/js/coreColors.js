var versionsArr=[]

d3.csv("data/report_output.csv" + '?' + Math.floor(Math.random() * 1000), function(error, buckets) {
  if (error) throw error;

  //csv = csv.filter(function(d){return d.orig_table=='version history';});
  
  // Coerce the CSV data to the appropriate types.
  buckets=buckets.filter(function(d){return d.orig_table=='version history';});
  
  buckets.forEach(function(d) {
  d.coreMajor=d.coreMajor;
  
  if (versionsArr.indexOf(d.coreMajor) > -1)
  {console.log();}else{
  versionsArr.push(d.coreMajor);}
  
  })}) 


 // var distinctCoreVersions = d3.set(
    // buckets.map(function(d){ return d.coreMajor; })	
    // ).values().sort(d3.ascending);
	
	

var numberCoreVersions	= versionsArr.length

var colorScale = d3.scale.ordinal()
.range(colorbrewer.Set1[numberCoreVersions+1])
.domain([0,numberCoreVersions]);

