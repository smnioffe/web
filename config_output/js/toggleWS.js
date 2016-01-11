$(document).on('click', '.toggle-button', function() {
    $(this).toggleClass('toggle-button-selected'); 
	
	if ( document.getElementById("Nightly Jobs").className == 'active'	) {
	$(".njchart").remove();
	nj(1); 
	}

		if ( document.getElementById("Job Run Time").className == 'active'	) {
	$(".njdurationchart").remove();
	njduration(1); 
	}
	
});