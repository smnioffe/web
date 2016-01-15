
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
	$(".backupchart").hide()
	$(".deploy").show()
	
	$('[id^="toggleDiv"]').css('display','none');
	
		$("#help_image").attr("style","width:0px;height:0px;");
	
		document.body.style.backgroundColor = "#333333";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Job Run Time").className = '';
		document.getElementById("Latest Backup").className = '';
		document.getElementById("Deploy Versions").className = 'active';
		
		document.getElementById("Deploy Versions Text").style.color = "#B7F6F6"
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
	$(".njdurationchart").hide()
	$(".backupchart").hide()
	

	nj(1); 
	$(".njchart").show()
	
	$('[id^="toggleDiv"]').css('display','');
	
	
		
		$("#help_image").attr("style","width:180px;height:96px;");
		$("#help_image").attr("src","assets/monitoring_framework/img/job_status_leg.png");
	
		document.body.style.backgroundColor = "#000000";
	

		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Job Run Time").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Latest Backup").className = '';
		document.getElementById("Nightly Jobs").className = 'active';
		
		document.getElementById("Deploy Versions Text").style.color = "#FFFFFF"
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
	$(".vhistory").attr("display");
	

    $('[id^="toggleDiv"]').css('display','none');


	
		$("#help_image").attr("style","width:0px;height:0px;");

		document.body.style.backgroundColor = "#333333";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Job Run Time").className = '';
		document.getElementById("Latest Backup").className = '';
		document.getElementById("Version History").className = 'active';		 

		document.getElementById("Deploy Versions Text").style.color = "#FFFFFF"
		document.getElementById("Job Run Time Text").style.color = "#FFFFFF"
		document.getElementById("Nightly Jobs Text").style.color = "#FFFFFF"
		document.getElementById("Latest Backup Text").style.color = "#FFFFFF"
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
	$(".vhistory").attr("display","none");
	
	
	njduration(1); 
	$(".njdurationchart").show();
	
	$('[id^="toggleDiv"]').css('display','');
		 
		$("#help_image").attr("style","width:180px;height:128px;"); 
		$("#help_image").attr("src","assets/monitoring_framework/img/job_time_leg.png"); 
		 
		document.body.style.backgroundColor = "#000000";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Latest Backup").className = '';
		document.getElementById("Job Run Time").className = 'active';	

		document.getElementById("Deploy Versions Text").style.color = "#FFFFFF"
		document.getElementById("Job Run Time Text").style.color = "#B7F6F6"	
		document.getElementById("Nightly Jobs Text").style.color = "#FFFFFF"
		document.getElementById("Latest Backup Text").style.color = "#FFFFFF"
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
	$(".vhistory").attr("display","none");
	$(".backupchart").show();
	
	
	backup(1); 
	$(".backupchart").show();
	
		$('[id^="toggleDiv"]').css('display','');
		 
		$("#help_image").attr("style","width:180px;height:85px;"); 
		$("#help_image").attr("src","assets/monitoring_framework/img/backup_leg.png"); 
		 
		document.body.style.backgroundColor = "#333333";
	
		document.getElementById("Nightly Jobs").className = '';
		document.getElementById("Deploy Versions").className = '';
		document.getElementById("Version History").className = '';
		document.getElementById("Job Run Time").className = '';	
		document.getElementById("Latest Backup").className = 'active';
		

		document.getElementById("Deploy Versions Text").style.color = "#FFFFFF"
		document.getElementById("Job Run Time Text").style.color = "#FFFFFF"	
		document.getElementById("Nightly Jobs Text").style.color = "#FFFFFF"
		document.getElementById("Version History Text").style.color = "#FFFFFF"
		document.getElementById("Latest Backup Text").style.color = "#B7F6F6"
		
}


};


