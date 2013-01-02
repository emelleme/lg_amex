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
CDN='http://3b8ffb0b6ca1c4312d7a-f6478897881b831aa0d618e78a4be408.r12.cf1.rackcdn.com/',

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
	var t = minutes+":"+seconds;
	return t;
};
function playCurrentVideo(){
	prevLevel = curLevel;
	curLevel = level.VIDEO;
	console.log(prevLevel);
	$('#mainMenu').hide();
	$('#fullPlayer').show();
	$('#videoMenu').show();
	window.clearTimeout(playBarTimeout);
	playBarTimeout = setTimeout(function(){
		$('#videoMenu').hide();
	}, 15000);
	
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
$(document).ready(function() {
	//window.NetCastSetPageLoadingIcon('disabled');
	
	//Todo: move to common.js
	$('#videos_arrowleft').hide();
	$('#fullPlayer').hide();
	$('#videoMenu').hide();
	document._video = document.getElementById("fullPlayer");
	document._video.setAttribute("src", CDN+$('#panel'+NEWS_POS).attr('data-video'));
	$('#currentVideoTitle').html($('#panel'+NEWS_POS).attr('data-title'));
	document._video.onPlayStateChange = processPlayStateChange;
	document._video.onBuffering = processBuffering;
	
	$('.panelHeader').on('hover', function(e){
		//console.log($(this).children('h3'));
		$(this).children('h3').children('span').toggleClass('panelHover');
		
	});
	$('.backButton').on('click', function(e){
		$.post('lg/userData',logger,function(logger){
			window.history.back();
			return false;
		});
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
		NAV_HOVER = true;
		
		curLevel = level.MENU;
		$(this).addClass('hover');
		curLevel = level.MENU;
		MENU_POS = $(this).parent().index();
	},function(){
		NAV_HOVER = false;
		curLevel = level.NEWS;
	});
	
	$('.navbar').hover(function(){
		$('.inactive').show();
	},function(){
		$('.inactive').hide();
	});
	
	$('.navbtn').on('click', function(e){
		e.preventDefault();
		var link = $(this);
		$.post('lg/userData',logger,function(logger){
			window.location = link.attr('href');
			return false;
		});
		nowLoading(this);		
	});

	$('#showcase-container').on('click',function(){
		//Clear active
		//Set level to news
		curLevel = level.NEWS;
	})

	$('.panelHeader').on('click', function(e){
		var a = $(this).attr('id');
		$('.panelHeader').show();
		$('.showcaseimage').hide();
		NEWS_POS = Number(a.charAt(a.length-1));
		document._video.setAttribute("src", CDN+$('#panel'+NEWS_POS).attr('data-video'));
		$('#currentVideoTitle').html($('#panel'+NEWS_POS).attr('data-title'));
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
		$('#panel'+NEWS_POS).hide();
		$('#panel'+NEWS_POS+'_content').show();
	}).on('hover',function(){
		clearActive();
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
	});
	
	$('.showcaseimage').on('click',function(){
		//Play Video
		playCurrentVideo();
	}).on('hover',function(){
		clearActive();
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
	});

	$('#panel1,#panel2_content, #panel4_content, #panel3_content').hide();
	$('#videos_arrowleft').on('click', function(){
		slideLeft('click');
	});

	$('#videos_arrowright').on('click', function(){
		slideRight('click');
	})
});

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
	if($('#panel'+Number(NEWS_POS+1)+'_content').html()!=null){
		$('.panelHeader').show();
		$('#panel'+NEWS_POS).show();
		$('#panel'+NEWS_POS+'_content').hide();
		NEWS_POS = NEWS_POS+1;
		$('#panel'+NEWS_POS+'_content').show();
		$('#panel'+NEWS_POS).hide();
		if (NEWS_POS > 1) {
			//Show Left Arrow
			$('#videos_arrowleft').show();
			console.log(NEWS_POS)
		};
		if($('#panel'+Number(NEWS_POS+1)+'_content').html()==null){
		$('#videos_arrowright').hide();
		}
		document._video.setAttribute("src", CDN+$('#panel'+NEWS_POS).attr('data-video'));
		$('#currentVideoTitle').html($('#panel'+NEWS_POS).attr('data-title'));
	}
	//logger.keys.push("news-"+NEWS_POS+":"+keyCode);
}

function slideLeft(keyCode){
	if(NEWS_POS > 0){
		if($('#panel'+Number(NEWS_POS-1)+'_content').html()!=null){
			$('#panel'+NEWS_POS).show();
			$('#panel'+NEWS_POS+'_content').hide();
			NEWS_POS = NEWS_POS-1;
			$('#panel'+NEWS_POS+'_content').show();
			$('#panel'+NEWS_POS).hide();
			if (NEWS_POS > 0) {
				//Show Right Arrow
				$('#videos_arrowright').show();
				console.log(NEWS_POS);
			};
			if($('#panel'+Number(NEWS_POS-1)+'_content').html()==null){
			$('#videos_arrowleft').hide();
			}
		document._video.setAttribute("src", CDN+$('#panel'+NEWS_POS).attr('data-video'));
		$('#currentVideoTitle').html($('#panel'+NEWS_POS).attr('data-title'));
		}
	//logger.keys.push("news-"+NEWS_POS+":"+keyCode);
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
				window.clearTimeout(playBarTimeout);
				playBarTimeout=setTimeout(function(){
					$('#videoMenu').hide();
				}, 5000);
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
				window.clearTimeout(playBarTimeout);
				playBarTimeout=setTimeout(function(){
					$('#videoMenu').hide();
				}, 5000);
			}
			break;
		}
		case VK_DOWN:
		{
			if (curLevel == level.VIDEO) {
				window.clearTimeout(playBarTimeout);
				$('#videoMenu').show();
				playBarTimeout=setTimeout(function(){
					$('#videoMenu').hide();
				}, 5000);
			}
			else if (curLevel == level.NEWS) {
				//On Gallery, go to Terms
				//$('.inactive').show();
				curLevel = level.TERMS;
				$('.arrows').hide();
				$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailinactive')+")");
				$('.termsconditions a').addClass('hover');
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
				//return to terms
				//$('.inactive').hide();
				$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
				curLevel = level.TERMS;
				$('.termsconditions a').addClass('hover');
				$('.arrows').hide();
				
			}else if(curLevel == level.VIDEO){
				window.clearTimeout(playBarTimeout);
				$('#videoMenu').toggle();
				playBarTimeout=setTimeout(function(){
					$('#videoMenu').hide();
				}, 5000);
			}else if(curLevel == level.TERMS){
				clearActive();
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
				
			}else if(curLevel == level.VIDEO){
				window.clearTimeout(playBarTimeout);
				$('#videoMenu').toggle();
				playBarTimeout=setTimeout(function(){
					$('#videoMenu').hide();
				}, 5000);
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
		case VK_FAST_FWD:
		{
			if(curLevel == level.VIDEO){
				var duration = document._video.duration;
				seekFivePercent = Math.floor(duration/15);
				var ffd = document._video.playPosition + seekFivePercent*1000;
				
				//document._video.play(0);
				
				document._video.seek(ffd);
				$('#videoMenu').toggle();
				playBarTimeout=setTimeout(function(){
					$('#videoMenu').hide();
				}, 5000);
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
				$('#videoMenu').toggle();
				playBarTimeout=setTimeout(function(){
					$('#videoMenu').hide();
				}, 5000);
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

