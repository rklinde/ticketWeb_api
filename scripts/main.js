$(document).ready(function(){

	$('#welcome').hide();

	// nav 
	if ($(window).width() <= 401) {
		$('nav li ul').hide();
	}
	else {
		$('nav li').hover(
			function(){
				$(this).find('ul').show();
			}, function(){
				$(this).find('ul').hide();
			});
	}


	loadEvents();

	// school name
	$('#s_school').change(function() {
		var school = '';
		$('#s_school select option:selected').each(function(){
			
			if ($('#s_school select option:selected').val() != 0) {
				school += $(this).text() + '';
				$('#welcome').text('Welcome ' + school);
				$('#welcome').show();
				loadEvents();
			} else{
				$('#welcome').hide();
			};
		});
	
	})

	
	// add tags
		$('#tag :button').on('click', function(){
			$(this).toggleClass('active');
			loadEvents();
			});


	// clear filters
		$(':button.clear').on('click', function(){
			$(':button.active').removeClass('active');
			loadEvents();
		});

	// modal function
	$(document).on('click', '.exit', function(e){
		e.preventDefault();
		$('.modal-wrapper').hide();
		$('body').removeClass('modal-on');
	})	

});



function showModal(eventId) {
	$('#modal-'+eventId).show();
 	$('body').addClass('modal-on');
}

$(function() {
		$('.truncate').succinct({
			size: 240
		});
	});

// add variables to dataURL
function loadEvents() {
	
	// var startDate = "";
	var schoolId = $("#s_school select option:selected").val();
	var venueId = $("#venueId").val();
	var query = $("#query").val();
	var tags = $(":button.active");

	
	var tagList = new Array();
	$(tags).each(function(i){
		tagList.push($(this).attr("value"));
	});
	
	
	// console.log(tagList);


	// ticketweb API
	var location_protocol = window.location.protocol.toLowerCase().indexOf("https:")==0?"https":"http"; 
	var staticServerPath = location_protocol == 'https' ? 'https://a248.e.akamai.net/f/248/15404/24h/i.ticketweb.com' : 'http://i.ticketweb.com';  
	var eventLink = location_protocol+"://api.ticketweb.com/snl/EventAPI.action?key=YS5t6hOMUlxCEoDnFAy4&version=1&orgID=128432&venueId="+venueId+"&cr="+schoolId+"&tag="+tagList+"&event_set_order=additional&method=json";

	if (typeof jQuery == 'undefined') 
	{ 
	document.write('<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js" type="text/javascript"><\/script>'); 
	}  
	

	
		TwEventList.create("tw-eventlist", { 
		dataUrl: eventLink,
		showPagination:false,
		styleCss:"css/main.css", 
		imageServerBaseUrl:staticServerPath,
		artistgrouping: 1,
		resultsPerPage:10, 
		template:"<div class='col-3 eventimage'><img src='%eventimagelarge%'></div><div class='col-2 event-title'><h3>%artist_list%</h3><br><br><div class='xtext' span style='font-size:10px;'>%additionallistingtext%</span></div><div class='truncate'>%description%</div><div class='activate-modal' onclick='showModal(%eventid%)'><a>Read More</a></div></div><div class='col-3'></div><div class='spacer'></div><div class='col-4'  style='padding:0px;'>Show times:</div><div class='spacer'></div><div class='showtime'><div class='col-4 eventdetails'>%start_date_week% %start_date_month% %start_date_day%</div><div class='col-4 eventdetails'>%start_time%</div><div class='col-4 eventdetails'>%venuename%</div></div><div class='col-4'><a href='%eventurl%' target='_blank'><button>BUY TICKETS</button></a></div></div><div id='modal-%eventid%' class='modal-wrapper'><div class='modal'><a href='#' class='exit'>x</a><h2>%artist_list%</h2><br></div></div></div><div class='spacer'></div><script>$(function(){$('.truncate').succinct({size:200});});</script>"
		

		});
		
		console.log(eventLink);
		

}




