function navBar(Selection)
{
	if 	(Selection==2)
{
	if ($(".deploy").length!==1){
		deployChart(1)
		}
	$(".njchart").hide()
	$(".deploy").show()
	
		document.body.style.backgroundColor = "#333333";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = 'active';
	}	
else if (Selection==1)
{
	if ($(".njchart").length!==1){
		nj(1)
		}
	$(".deploy").hide()
	$(".njchart").show()
	
		document.body.style.backgroundColor = "#000000";
	
		document.getElementById("Nightly Jobs").className = 'active';
		document.getElementById("Deploy Versions").className = '';
	
}
// if 	(Selection==3)
// {
// document.getElementById("body").innerHTML='<object type=""text/html"" data="versionhistory/versionhistory.html" ></object>';
	// }







};