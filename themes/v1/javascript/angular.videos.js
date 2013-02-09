//Define Levels
level = {};
level.NEWS = 1;
level.MENU = 2;
level.TERMS = 4;
level.VIDEO = 3;
var versionStr;
getUserAgent();
var logger = {};
logger.keys = [];
eggCount =0;
logger.version = versionStr;
var curLevel = level.MENU;
var prevLevel = curLevel;
var pageNo = 0;
var curIndex = 1;
playTimeInterval = 0;
playBarTimeout = 0;
MENU_MATRIX = {
	1: "1,2,3,4"
}

MENU_POS = 0;
NEWS_POS = 1;
MAX_ITEMS = 3;
CDN='http://3b8ffb0b6ca1c4312d7a-f6478897881b831aa0d618e78a4be408.r12.cf1.rackcdn.com/',
LIVETEST = 'http://rightsteru-i.akamaihd.net/205269/hls_test_u_1/master-high.m3u8';

//Current Index
curIndex = 1;
String.prototype.toMMSS = function(){
	sec_numb = parseInt(this);
	var hours = Math.floor(sec_numb / 3600);
	var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
	var seconds = sec_numb - (hours * 3600) - (minutes * 60);

	if (hours < 10) {hours="0"+hours;};
	if (minutes < 10) {minutes="0"+minutes;};
	if (seconds < 10) {seconds="0"+seconds;};
	if(minutes == '00' && seconds == '00'){
		var t = '--:--';
	}else{
		var t = minutes+":"+seconds;
	}
	return t;
};

angular.module('project', ['ngResource']).
config(function($routeProvider) {
$routeProvider.
  when('/', {controller:VideosController, templateUrl:'/videos/lglayout.html'}).
  otherwise({redirectTo:'/'});
});

function playCurrentVideo(){
	prevLevel = curLevel;
	curLevel = level.VIDEO;
	console.log(prevLevel);
	$('#fullPlayer').show();
	$('#videoMenu').show();
	
	document._video.play();
	playTimeInterval = setInterval(function(){
		var p = document._video.mediaPlayInfo();
		var c = String(Math.floor(p.currentPosition/1000));
		var d = String(Math.ceil(p.duration/1000));
		$("#videoPlayState").html(c.toMMSS()+" / "+d.toMMSS());
	},400);
}

function stopCurrentVideo(){
	window.clearTimeout(playBarTimeout);
	window.clearInterval(playTimeInterval);
	document._video.stop();
	$('#fullPlayer').hide();
	$('#mainMenu').show();
	$('#videoMenu').hide();
	curLevel = prevLevel;
}

//Current Level
curLevel = level.NEWS;
logger.page = 'news';
function VideosController($scope,$http,$location){
$(document).ready(function() {
	$.preloadCssImages();
	$('#videos_arrowleft').hide();
	$('#fullPlayer').hide();
	$('#videoMenu').hide();
	document._video = document.getElementById("fullPlayer");
	document._video.setAttribute("data", CDN+$('#panel'+NEWS_POS).attr('data-video'));
	$('#currentVideoTitle').html($('#panel'+NEWS_POS).attr('data-title'));
	document._video.onPlayStateChange = processPlayStateChange;
	document._video.onBuffering = processBuffering;
	
	$('.panelHeader').on('hover', function(e){
		//console.log($(this).children('h3'));
		$('#panel'+NEWS_POS+'_content img').css('webkit-filter','grayscale(0)');
		$(this).children('h3').children('span').toggleClass('panelHover');
		
	});
	$('.backButton').on('click', function(e){
		window.history.back();
	});

	// $('#fullPlayer').on('click',function(){
	// 	if(curLevel == level.VIDEO){
	// 		$('#videoMenu').show();
	// 		setTimeout(function(){
	// 		$('#videoMenu').hide();
	// 	}, 3000);
	// }
	// })
	
	$('.navbtn').hover(function(){
		clearActive();
		$('#panel'+NEWS_POS+'_content img').css('webkit-filter','grayscale(0.85)');
		NAV_HOVER = true;
		
		curLevel = level.MENU;
		$(this).addClass('hover');
		curLevel = level.MENU;
		MENU_POS = $(this).parent().index();
	},function(){
		NAV_HOVER = false;
		curLevel = level.NEWS;
	});
	
	
	$('.navbtn').on('click', function(e){
		e.preventDefault();
		var link = $(this);
		$.post('lg/userData',logger,function(logger){
			window.location = link.attr('href');
			return false;
		});		
	});

	$('.panelHeader').on('click', function(e){
		var a = $(this).attr('id');
		$('.panelHeader').show();
		$('.showcaseimage').hide();
		NEWS_POS = Number(a.charAt(a.length-1));
		document._video.setAttribute("data", CDN+$('#panel'+NEWS_POS).attr('data-video'));
		$('#currentVideoTitle').html($('#panel'+NEWS_POS).attr('data-title'));
		if(NEWS_POS == 1){
			//Hide left arrow
			$('#videos_arrowleft').hide();
			$('#videos_arrowright').show();
		}else if (NEWS_POS < MAX_ITEMS) {
			//show both arrows
			$('#videos_arrowleft').show();
			$('#videos_arrowright').show();
		}else{
			//hide right arrow
			$('#videos_arrowright').hide();
			$('#videos_arrowleft').show();
		}
		$('#panel'+NEWS_POS).hide();
		$('#panel'+NEWS_POS+'_content').show();
	}).on('hover',function(){
		clearActive();
		if(NEWS_POS == 1){
			//Hide left arrow
			$('#videos_arrowleft').hide();
			$('#videos_arrowright').show();
		}else if (NEWS_POS < MAX_ITEMS) {
			//show both arrows
			$('#videos_arrowleft').show();
			$('#videos_arrowright').show();
		}else{
			//hide right arrow
			$('#videos_arrowright').hide();
			$('#videos_arrowleft').show();
		}
	});
	
	$('.showcaseimage').on('click',function(){
		//Play Video
		playCurrentVideo();
	}).on('hover',function(){
		$('#panel'+NEWS_POS+'_content img').css('webkit-filter','grayscale(0)');
		if(curLevel != level.VIDEO){
			clearActive();
			if(NEWS_POS == 1){
				//Hide left arrow
				$('#videos_arrowleft').hide();
				$('#videos_arrowright').show();
			}else if (NEWS_POS < MAX_ITEMS) {
				//show both arrows
				$('#videos_arrowleft').show();
				$('#videos_arrowright').show();
			}else{
				//hide right arrow
				$('#videos_arrowright').hide();
				$('#videos_arrowleft').show();
			}
		}
	});

	$('#panel1,#panel2_content, #panel4_content, #panel3_content').hide();
	$('#videos_arrowleft').on('click', function(){
		slideLeft('click');
	});

	$('#videos_arrowright').on('click', function(){
		slideRight('click');
	});
	
	$('.termsbtnblk').hover(function(){
		clearActive();
		$('#panel'+NEWS_POS+'_content img').css('webkit-filter','grayscale(0.85)');
		$('.termsconditions a').addClass('hover');
		curLevel = level.TERMS;
	});
});
}

function processPlayStateChange(){
	//$('#test p').html(document._video.playState);
	if (document._video.playState == 6){
		//$('#test p').append(document._video.error);
		$('#fullPlayer').hide();
		curLevel = level.NEWS;
	}else if(document._video.playState == 5){
		//Video Stopped. Close frame
		window.clearInterval(playTimeInterval);
		$('#fullPlayer').hide();
		$('#mainMenu').show();
		$('#videoMenu').hide();
		curLevel = level.NEWS;
	}
}

function processBuffering(isStarted){
	if (isStarted) {
		$('#videoPlayState').html('Buffering...');
	}else{
		$('#videoPlayState').html('Playing')
	}
}

function slideRight(keyCode){
	if(NEWS_POS < MAX_ITEMS){
		$('.panelHeader').show();
		$('#panel'+NEWS_POS).show();
		$('#panel'+NEWS_POS+'_content').hide();
		NEWS_POS = NEWS_POS+1;
		$('#panel'+NEWS_POS+'_content').show();
		$('#panel'+NEWS_POS).hide();
		$('#videos_arrowleft').show();
		console.log(NEWS_POS);
		if(NEWS_POS+1 > MAX_ITEMS)
			$('#videos_arrowright').hide();
		document._video.setAttribute("data", CDN+$('#panel'+NEWS_POS).attr('data-video'));
		$('#currentVideoTitle').html($('#panel'+NEWS_POS).attr('data-title'));
	}
}

function slideLeft(keyCode){
	if(NEWS_POS > 1){
		$('#panel'+NEWS_POS).show();
		$('#panel'+NEWS_POS+'_content').hide();
		NEWS_POS = NEWS_POS-1;
		$('#panel'+NEWS_POS+'_content').show();
		$('#panel'+NEWS_POS).hide();
		$('#videos_arrowright').show();
		console.log(NEWS_POS);
		if(NEWS_POS-1 == 0)
			$('#videos_arrowleft').hide();
		document._video.setAttribute("data", CDN+$('#panel'+NEWS_POS).attr('data-video'));
		$('#currentVideoTitle').html($('#panel'+NEWS_POS).attr('data-title'));
	}
}

function keyDown(event) {
	//alert(event.keyCode);
	switch (event.keyCode) {
		case VK_LEFT:
		{
			if (curLevel == level.MENU) {
				if (MENU_POS > 0){
					//Move left
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS-1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					//}
				}
			}else if (curLevel == level.NEWS) {
				$('#videos_arrowleft').addClass('activeImage');
				$('#videos_arrowright').removeClass('activeImage');
				setTimeout(function(){$('#videos_arrowleft').removeClass('activeImage');},200);
				slideLeft('left');
			}else{
				//
				$('#videoMenu').show();
			}
			break;
		}
		case VK_RIGHT:
		{
			if (curLevel == level.MENU) {
				if (MENU_POS < 2){
					//Move Right
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS+1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					//}
				}
			}else if (curLevel == level.NEWS) {
				$('#videos_arrowright').addClass('activeImage');
				$('#videos_arrowleft').removeClass('activeImage');
				setTimeout(function(){$('#videos_arrowright').removeClass('activeImage');},200);
				slideRight('right');
			}else if(curLevel == level.VIDEO){
				//No action
				$('#videoMenu').show();
			}
			break;
		}
		case VK_DOWN:
		{
			if (curLevel == level.VIDEO) {
				window.clearTimeout(playBarTimeout);
				$('#videoMenu').show();
			}
			else if (curLevel == level.NEWS) {
				clearActive();
				curLevel = level.TERMS;
				$('#panel'+NEWS_POS+'_content img').css('webkit-filter','grayscale(0.85)');
				$('.arrows').hide();
				$('.arrows').removeClass('activeImage');
				$('.termsbtnblk').addClass('hover');
			}else if(curLevel == level.TERMS) {
				clearActive();
				curLevel = level.MENU;
				$('.arrows').hide();
				$('.arrows').removeClass('activeImage');
				$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
			}
			break;
		}
		case VK_UP:
		{
			if (curLevel == level.MENU) {
				clearActive();
				$('#panel'+NEWS_POS+'_content img').css('webkit-filter','grayscale(0)');
				$('.arrows').show();
				if(NEWS_POS == 1){
					//Hide left arrow
					$('#videos_arrowleft').hide();
					$('#videos_arrowright').show();
				}else if (NEWS_POS < 5) {
					//show both arrows
					$('#videos_arrowleft').show();
					$('#videos_arrowright').show();
				}else{
					//hide right arrow
					$('#videos_arrowright').hide();
					$('#videos_arrowleft').show();
				}
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					curLevel = level.NEWS;
				
			}else if(curLevel == level.TERMS){
				clearActive();
				$('#panel'+NEWS_POS+'_content img').css('webkit-filter','grayscale(0)');
				$('.arrows').show();
				if(NEWS_POS == 1){
					//Hide left arrow
					$('#videos_arrowleft').hide();
					$('#videos_arrowright').show();
				}else if (NEWS_POS < 5) {
					//show both arrows
					$('#videos_arrowleft').show();
					$('#videos_arrowright').show();
				}else{
					//hide right arrow
					$('#videos_arrowright').hide();
					$('#videos_arrowleft').show();
				}
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					curLevel = level.NEWS;
					}
			break;
		}
		case VK_ENTER:
		{
			//added as ux change
			if (curLevel == level.MENU) {
			window.NetCastSetPageLoadingIcon('enabled');
				var g = $('.navbar .container ul li:eq('+MENU_POS+') a').attr('href');
				window.location =g;
			}else if(curLevel == level.NEWS){
				playCurrentVideo();
				console.log('Playing');
			}else if(curLevel == level.TERMS){
				var g = $('.termsconditions a').attr('href');
				window.location =g;
			}
			break;
		}
		case VK_STOP:
		{
			if(curLevel == level.VIDEO){
				stopCurrentVideo();
				break;
			}
			break;
		}
		case VK_PLAY:
		{
			if(document._video.playState == 2){
				document._video.play(1);
			}else if(document._video.playState == 1){
				document._video.play(1);
			}else{
				if(curLevel == level.NEWS){
					playCurrentVideo();
				}
			}
			break;
		}
		case VK_PAUSE:
		{
			if(curLevel == level.VIDEO){
				document._video.pause();
			}
			break;
		}
		case VK_RED:
		{
			if(curLevel != level.VIDEO){
				document._video.setAttribute("data", LIVETEST);
				$('#currentVideoTitle').html('Live Stream Test');
				playCurrentVideo();
			}
			break;
		}
		case VK_FAST_FWD:
		{
			if(curLevel == level.VIDEO){
				var duration = document._video.duration;
				seekFivePercent = Math.floor(duration/15);
				var ffd = document._video.playPosition + seekFivePercent*1000;
				
				//document._video.play(0);
				
				document._video.seek(ffd);
			}
			break;
		}
		case VK_REWIND:
		{
			if(curLevel == level.VIDEO){
				var duration = document._video.duration;
				seekFivePercent = Math.floor(duration/15);
				var rewind = document._video.playPosition - seekFivePercent*1000;
				
				//document._video.play(0);
				
				document._video.seek(rewind);
				/*document._video.play(1);
				document._video.play(-10.0);*/
			}
			break;
		}
		case VK_BACK:
		{
			if(window.NetCastGetMouseOnOff) {
				mouseOnOffStatus = window.NetCastGetMouseOnOff();
				if(document._video.playState != 1){
					window.NetCastSetPageLoadingIcon('enabled');
					window.history.back();
					break;
				}else{
					stopCurrentVideo();
					break;
				}
			}
			
			if(curLevel != level.VIDEO){
				window.NetCastSetPageLoadingIcon('enabled');
				window.history.back();
				break;
			}else{
				stopCurrentVideo();
				break;
			}
			
		break;
		}

		case VK_RED:
		{
			eggCount = 1;
			break;
		}
		case VK_GREEN:
		{
			if(eggCount == 1){
				eggCount++;
			}else{
				eggCount = 0;
			}
				
			break;
		}
		case VK_BLUE:
		{
			if(eggCount == 2){
				eggCount++;
			}else{
				eggCount = 0;
			}
			break;
		}
		case VK_2:
		{
			eggCount = 1;
			break;
		}
		case VK_5:
		{
			if(eggCount == 1){
				eggCount++;
			}else if(eggCount == 2){
				//do action
				easterEgg();
			}else{
				eggCount = 0;
			}
		}
	}
}

function clearActive(){
	$('.activeImage').removeClass('activeImage');
	$('.arrows').hide();
	$('.hover').removeClass('hover');
}

function getUserAgent() {
	userAgent = new String(navigator.userAgent);
	var LG_TV = document.getElementById("versionInfo");
	var LG_TV_BG = document.getElementById("key_tv_bg");
	var LG_MEDIA = document.getElementById("key_bdp");
	var LG_MEDIA_BG = document.getElementById("key_bdp_bg");

	if (userAgent.search("LG NetCast.TV") > -1 ) {			
		versionStr = "v 1.003 (20110310) -TV";	
	} else if (userAgent.search("LG NetCast.Media") > -1 ){
		versionStr = "v 1.003 (20110310) -BDP";
	} else {	
		versionStr = "v 1.003 (20110310) -TV";	
	}
	console.log(versionStr);
}

function easterEgg(){
	//Play live Stream
	$('#fullPlayer').attr('type', 'application/vnd.apple.mpegurl');
	//$('#fullPlayer').attr('src','http://rightsteru-i.akamaihd.net/205269/hls_test_u_1/master-high.m3u8');
	$('#fullPlayer').attr('data','http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8');
	playCurrentVideo();
	console.log('Playing');

}