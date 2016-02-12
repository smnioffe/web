
function navBar(Selection)
{
	if 	(Selection=='deploy')
{
	// if ($(".deploy").length!==1){
		// deployChart(1)
		// }
		
		$(".deploy").remove();
		
	$(".njchart").hide()
	$(".vhistory").attr("display","none");
	$(".vhistorySide").attr("display","none");
	$("#MeasurePeriodDiv").hide();
	$(".njdurationchart").hide()
	$(".backupchart").hide()
	
	
	deployChart(1)
	$(".deploy").show()
	
	$('[id^="toggleDiv"]').css('display','');
	
		$("#help_image").attr("style","width:0px;height:0px;");
	
		document.body.style.backgroundColor = "#333333";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Job Run Time").className = '';
		document.getElementById("Latest Backup").className = '';
		document.getElementById("Measure Periods").className = '';
		document.getElementById("Deploy Versions").className = 'active';
		
		document.getElementById("Deploy Versions Text").style.color = "#B7F6F6"
		document.getElementById("Measure Periods Text").style.color = "#FFFFFF"
		document.getElementById("Job Run Time Text").style.color = "#FFFFFF"
		document.getElementById("Latest Backup Text").style.color = "#FFFFFF"		
		document.getElementById("Nightly Jobs Text").style.color = "#FFFFFF"
		document.getElementById("Version History Text").style.color = "#FFFFFF"
	}	
else if (Selection=='nj')
{
	//if ($(".njchart").length!==1){
			$(".njchart").remove();
	//	}
	$(".deploy").hide()
	$(".vhistory").attr("display","none");
	$(".vhistorySide").attr("display","none");
	$("#MeasurePeriodDiv").hide();
	$(".njdurationchart").hide()
	$(".backupchart").hide()
	

	nj(1); 
	$(".njchart").show()
	
	$('[id^="toggleDiv"]').css('display','');
	
	$("#help_image").attr("style","width:0px;height:0px;");
	
		document.body.style.backgroundColor = "#000000";
	

		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Job Run Time").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Latest Backup").className = '';
		document.getElementById("Measure Periods").className = '';
		document.getElementById("Nightly Jobs").className = 'active';
		
		document.getElementById("Deploy Versions Text").style.color = "#FFFFFF"
		document.getElementById("Measure Periods Text").style.color = "#FFFFFF"
		document.getElementById("Job Run Time Text").style.color = "#FFFFFF"
		document.getElementById("Latest Backup Text").style.color = "#FFFFFF"
		document.getElementById("Nightly Jobs Text").style.color = "#B7F6F6"
		document.getElementById("Version History Text").style.color = "#FFFFFF"
}
else if (Selection=='vhistory')
{
 if (document.getElementById("Version History").className !== 'active'){
		versionHistory(1);
		
		 };
		 
	$(".deploy").hide()
	$(".njchart").hide()
	$(".njdurationchart").hide()
	$(".backupchart").hide()
	$(".vhistorySide").attr("display");
	$("#MeasurePeriodDiv").hide();
	$(".vhistory").attr("display");
	
	

    $('[id^="toggleDiv"]').css('display','none');


	
		$("#help_image").attr("style","width:0px;height:0px;");

		document.body.style.backgroundColor = "#333333";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Job Run Time").className = '';
		document.getElementById("Latest Backup").className = '';
		document.getElementById("Measure Periods").className = '';
		document.getElementById("Version History").className = 'active';		 

		document.getElementById("Deploy Versions Text").style.color = "#FFFFFF"
		document.getElementById("Job Run Time Text").style.color = "#FFFFFF"
		document.getElementById("Nightly Jobs Text").style.color = "#FFFFFF"
		document.getElementById("Latest Backup Text").style.color = "#FFFFFF"
		document.getElementById("Measure Periods Text").style.color = "#FFFFFF"		
		document.getElementById("Version History Text").style.color = "#B7F6F6"
}

else if (Selection=='njduration')
{
	//if ($(".njdurationchart").length!==1){
		$(".njdurationchart").remove();
		//}
		
	$(".njchart").hide()
	$(".deploy").hide()
	$(".njdurationchart").hide()
	$(".backupchart").hide()
	$(".vhistorySide").attr("display","none");
	$(".vhistory").attr("display","none");
	$("#MeasurePeriodDiv").hide();
	
	
	njduration(1); 
	$(".njdurationchart").show();
	
	$('[id^="toggleDiv"]').css('display','');
		 
		$("#help_image").attr("style","width:180px;height:128px;"); 
		$("#help_image").attr("src","assets/monitoring_dashboard/img/job_time_leg.png"); 
		 
		document.body.style.backgroundColor = "#000000";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Latest Backup").className = '';
		document.getElementById("Measure Periods").className = '';
		document.getElementById("Job Run Time").className = 'active';	

		document.getElementById("Deploy Versions Text").style.color = "#FFFFFF"
		document.getElementById("Job Run Time Text").style.color = "#B7F6F6"	
		document.getElementById("Nightly Jobs Text").style.color = "#FFFFFF"
		document.getElementById("Latest Backup Text").style.color = "#FFFFFF"
		document.getElementById("Measure Periods Text").style.color = "#FFFFFF"
		document.getElementById("Version History Text").style.color = "#FFFFFF"
		
}

else if (Selection=='backup')
{
	//if ($(".njdurationchart").length!==1){
		$(".backupchart").remove();
		//}
		
	$(".njchart").hide()
	$(".deploy").hide()
	$(".njdurationchart").hide()
	$(".vhistorySide").attr("display","none");
	$(".vhistory").attr("display","none");
	$("#MeasurePeriodDiv").hide();
	$(".backupchart").show();
	
	
	backup(1); 
	$(".backupchart").show();
	
		$('[id^="toggleDiv"]').css('display','');
		 
		$("#help_image").attr("style","width:180px;height:85px;"); 
		$("#help_image").attr("src","assets/monitoring_dashboard/img/backup_leg.png"); 
		 
		document.body.style.backgroundColor = "#333333";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Job Run Time").className = '';	
		document.getElementById("Measure Periods").className = '';
		document.getElementById("Latest Backup").className = 'active';
		

		document.getElementById("Deploy Versions Text").style.color = "#FFFFFF"
		document.getElementById("Job Run Time Text").style.color = "#FFFFFF"	
		document.getElementById("Nightly Jobs Text").style.color = "#FFFFFF"
		document.getElementById("Version History Text").style.color = "#FFFFFF"
		document.getElementById("Measure Periods Text").style.color = "#FFFFFF"
		document.getElementById("Latest Backup Text").style.color = "#B7F6F6"
		
}

else if (Selection=='measureperiod')
{
	
	$(".MPTitleLabel").remove();
	$(".measurePeriodLegend").remove();
	$(".measurePeriodChart").remove();
	$(".MPdroptext").remove();
	$(".textLabel").remove();
		
	$(".njchart").hide()
	$(".deploy").hide()
	$(".njdurationchart").hide()
	$(".vhistorySide").attr("display","none");
	$(".vhistory").attr("display","none");
	$(".backupchart").hide();
	$("#MeasurePeriodDiv").show();
	
	
	mp(1); 

    $('[id^="toggleDiv"]').css('display','none');
	
		 
		$("#help_image").attr("style","width:0px;height:0px;"); 

		 
		document.body.style.backgroundColor = "#949494";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Job Run Time").className = '';		
		document.getElementById("Latest Backup").className = '';
		document.getElementById("Measure Periods").className = 'active';
		

		document.getElementById("Deploy Versions Text").style.color = "#FFFFFF"
		document.getElementById("Job Run Time Text").style.color = "#FFFFFF"	
		document.getElementById("Nightly Jobs Text").style.color = "#FFFFFF"
		document.getElementById("Version History Text").style.color = "#FFFFFF"
		document.getElementById("Latest Backup Text").style.color = "#FFFFFF"
		document.getElementById("Measure Periods Text").style.color = "#B7F6F6"
		
}


};


