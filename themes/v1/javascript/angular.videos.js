//Define Levels
level = {};
level.NEWS = 1;
level.MENU = 2;
level.VIDEO = 3;
var versionStr;
getUserAgent();
var logger = {};
logger.keys = [];
logger.version = versionStr;
var curLevel = level.MENU;
var pageNo = 0;
var curIndex = 1;

MENU_MATRIX = {
	1: "1,2,3,4"
}

MENU_POS = 0;
NEWS_POS = 1;
CDN='http://9415d76ee7de9f62f3ed-abfa988e4213bbf6e7d06542f0d11811.r69.cf2.rackcdn.com/',

//Current Index
curIndex = 1;

//Current Level
curLevel = level.NEWS;


angular.module('project', ['ngResource']).
config(function($routeProvider) {
$routeProvider.
  when('/', {controller:VideosController, templateUrl:'/videos/layout.html'}).
  otherwise({redirectTo:'/'});
});

function VideosController($scope,$http,$location){
$(document).ready(function() {
	//Todo: move to common.js
	$('#news_arrowleft').hide();
	$('#fullPlayer').hide();
	document._video = document.getElementById("fullPlayer");
	document._video.onPlayStateChange = processPlayStateChange;
	
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
	
	$('.navbtn').hover(function(){
		clearActive();
		NAV_HOVER = true;
		
		curLevel = level.MENU;
		$(this).addClass('hover');
		curLevel = level.MENU;
		MENU_POS = $(this).parent().index();
	},function(){
		NAV_HOVER = false;
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
		if(NEWS_POS == 1){
			//Hide left arrow
			$('#news_arrowleft').hide();
			$('#news_arrowright').show();
		}else if (NEWS_POS < 5) {
			//show both arrows
			$('#news_arrowleft').show();
			$('#news_arrowright').show();
		}else{
			//hide right arrow
			$('#news_arrowright').hide();
			$('#news_arrowleft').show();
		}
		$('#panel'+NEWS_POS).hide();
		$('#panel'+NEWS_POS+'_content').show();
	}).on('hover',function(){
		clearActive();
		if(NEWS_POS == 1){
			//Hide left arrow
			$('#news_arrowleft').hide();
			$('#news_arrowright').show();
		}else if (NEWS_POS < 5) {
			//show both arrows
			$('#news_arrowleft').show();
			$('#news_arrowright').show();
		}else{
			//hide right arrow
			$('#news_arrowright').hide();
			$('#news_arrowleft').show();
		}
	});
	
	$('.showcaseimage').on('click',function(){
		//Play Video
		curLevel = level.VIDEO;
		$('#fullPlayer').show();
		document._video.play();
	}).on('hover',function(){
		clearActive();
		if(NEWS_POS == 1){
			//Hide left arrow
			$('#news_arrowleft').hide();
			$('#news_arrowright').show();
		}else if (NEWS_POS < 5) {
			//show both arrows
			$('#news_arrowleft').show();
			$('#news_arrowright').show();
		}else{
			//hide right arrow
			$('#news_arrowright').hide();
			$('#news_arrowleft').show();
		}
	});

	$('#panel1,#panel2_content, #panel4_content, #panel3_content').hide();
	$('#news_arrowleft').on('click', function(){
		slideLeft('click');
	});

	$('#news_arrowright').on('click', function(){
		slideRight('click');
	})
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
		$('#fullPlayer').hide();
		curLevel = level.NEWS;
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
			$('#news_arrowleft').show();
			console.log(NEWS_POS)
		};
		if($('#panel'+Number(NEWS_POS+1)+'_content').html()==null){
		$('#news_arrowright').hide();
		}
		document._video.setAttribute("src", CDN+$('#panel'+NEWS_POS).attr('data-video'));
	}
	logger.keys.push("news-"+NEWS_POS+":"+keyCode);
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
				$('#news_arrowright').show();
				console.log(NEWS_POS);
			};
			if($('#panel'+Number(NEWS_POS-1)+'_content').html()==null){
			$('#news_arrowleft').hide();
			}
		document._video.setAttribute("src", CDN+$('#panel'+NEWS_POS).attr('data-video'));
		}
	logger.keys.push("news-"+NEWS_POS+":"+keyCode);
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
				$('#news_arrowleft').addClass('activeImage');
				$('#news_arrowright').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowleft').removeClass('activeImage');},200);
				slideLeft('left');
			}else{
				$('#fullPlayer').hide();
				document._video.stop();
				curLevel = level.NEWS;
				$('#news_arrowleft').addClass('activeImage');
				$('#news_arrowright').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowleft').removeClass('activeImage');},200);
				slideLeft('left');
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
				$('#news_arrowright').addClass('activeImage');
				$('#news_arrowleft').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowright').removeClass('activeImage');},200);
				slideRight('right');
			}else{
				$('#fullPlayer').hide();
				document._video.stop();
				curLevel = level.NEWS;
				$('#news_arrowright').addClass('activeImage');
				$('#news_arrowleft').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowright').removeClass('activeImage');},200);
				slideRight('right');
			}
			break;
		}
		case VK_DOWN:
		{
			if (curLevel == level.MENU) {
				//chill
			}
			if (curLevel == level.NEWS) {
				//On Terms, go to Menu
				//$('.inactive').show();
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
				//return to matrix
				//$('.inactive').hide();
				clearActive();
				$('.arrows').show();
				if(NEWS_POS == 1){
					//Hide left arrow
					$('#news_arrowleft').hide();
					$('#news_arrowright').show();
				}else if (NEWS_POS < 5) {
					//show both arrows
					$('#news_arrowleft').show();
					$('#news_arrowright').show();
				}else{
					//hide right arrow
					$('#news_arrowright').hide();
					$('#news_arrowleft').show();
				}
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					curLevel = level.NEWS;
				
			}else {
				
			}
			break;
		}
		case VK_ENTER:
		{
			//added as ux change
			if (curLevel == level.MENU) {
				$('#loading').dialog({
	                autoOpen: true,
	                resizable: false,
	                draggable: false,
	                closeOnEscape: true,
	                width: 'auto',
	                minHeight: 80,
	                maxHeight: 200,
	                title: 'Now Loading',
	                modal: true
	            });
	            $('.ui-dialog-titlebar').hide();
				var goto = $('.navbar .container ul li:eq('+MENU_POS+') a').attr('href');
				window.location =goto;
			}else if(curLevel == level.NEWS){
				curLevel = level.VIDEO;
				$('#fullPlayer').show();
				document._video.play();
				
			}else{
				document._video.stop();
				$('#fullPlayer').hide();
				curLevel = level.NEWS;
				$('#test p').html('level '+curLevel);
			}
			break;
		}
		case VK_STOP:
		{
			if(curLevel == level.VIDEO){
				document._video.stop();
				$('#fullPlayer').hide();
				curLevel = level.NEWS;
			}
			break;
		}
		case VK_PLAY:
		{
			if(document._video.playState == 2){
				document._video.play();
			}else{
				if(curLevel == level.NEWS){
					curLevel = level.VIDEO;
					$('#fullPlayer').show();
					document._video.play();
					$('#test p').html('level '+curLevel);
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
				var ahead = document._video.playPosition + 3000;
				document._video.seek(ahead);
			}
			break;
		}
		case VK_REWIND:
		{
			if(curLevel == level.VIDEO){
				var rewind = document._video.playPosition - 3000;
				document._video.seek(rewind);
			}
			break;
		}
		case VK_BACK:
		{
			if(curLevel == level.Video){
				document._video.stop();
				$('#fullPlayer').hide();
				curLevel = level.NEWS;
			}else{
				window.history.back();
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
