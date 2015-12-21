
function navBar(Selection)
{
	if 	(Selection=='deploy')
{
	if ($(".deploy").length!==1){
		deployChart(1)
		}
	$(".njchart").hide()
	$(".vhistory").attr("display","none");
	$(".njdurationchart").hide()
	$(".deploy").show()
	
	
		document.body.style.backgroundColor = "#333333";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Job Run Time").className = '';
		document.getElementById("Deploy Versions").className = 'active';
	}	
else if (Selection=='nj')
{
	if ($(".njchart").length!==1){
		nj(1)
		}
	$(".deploy").hide()
	$(".vhistory").attr("display","none");
	$(".njdurationchart").hide()
	$(".njchart").show()
	
	
		document.body.style.backgroundColor = "#000000";
	

		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Job Run Time").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Nightly Jobs").className = 'active';
	
}
else if (Selection=='vhistory')
{
 if (document.getElementById("Version History").className !== 'active'){
		versionHistory(1);
		
		 };
		 
	$(".deploy").hide()
	$(".njchart").hide()
	$(".njdurationchart").hide()
	$(".vhistory").attr("display");
		 
		document.body.style.backgroundColor = "#333333";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Job Run Time").className = '';
		document.getElementById("Version History").className = 'active';		 
		
}

else if (Selection=='njduration')
{
	if ($(".njdurationchart").length!==1){
		njduration(1)
		}
		
	$(".njchart").hide()
	$(".deploy").hide()
	$(".vhistory").attr("display","none");
	$(".njdurationchart").show()
		 
		 
		document.body.style.backgroundColor = "#000000";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Job Run Time").className = 'active';		 
		
}


};


