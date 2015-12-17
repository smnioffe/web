
function navBar(Selection)
{
	if 	(Selection=='deploy')
{
	if ($(".deploy").length!==1){
		deployChart(1)
		}
	$(".njchart").hide()
	$(".vhistory").attr("display","none");
	//$(".vhistory").hide
	$(".deploy").show()
	
	
		document.body.style.backgroundColor = "#333333";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = 'active';
		document.getElementById("Version History").className = '';
	}	
else if (Selection=='nj')
{
	if ($(".njchart").length!==1){
		nj(1)
		}
	$(".deploy").hide()
	$(".vhistory").attr("display","none");
	//$(".vhistory").hide
	$(".njchart").show()
	
	
		document.body.style.backgroundColor = "#000000";
	
		document.getElementById("Nightly Jobs").className = 'active';
		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Version History").className = '';
	
}
else if (Selection=='vhistory')
{
 if (document.getElementById("Version History").className !== 'active'){
		versionHistory(1);
		
		 };
		 
	$(".deploy").hide()
	$(".njchart").hide()
	$(".vhistory").attr("display");
		 
		document.body.style.backgroundColor = "#333333";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Version History").className = 'active';		 
		

	

	
}


};


