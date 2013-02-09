var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main =
{

};
//Define Levels
level = {};
level.GALLERY = 1;
level.TERMS = 2;
level.MENU = 3;
level.GALLERYITEM = 4;
var logger = {};
logger.keys = [];
var versionStr;
logger.version = versionStr;

MENU_MATRIX = {
	1: "1,2,3,4"
}

MENU_POS = 0;
NEWS_POS = 1;
MAX_ITEMS = 1;
GALLERYITEMACTIVE = false;
//Current Index
curIndex = 3;

//Current Level
curLevel = level.GALLERY;
logger.page = 'news';
$(document).ready(function() {
	

});
function GalleryController($scope,$http,$location){
	$(document).ready(function(){
		//Todo: move to common.js
	MAX_ITEMS = $('#icon-1').parent().children('div').size();
	$('#icon-1').addClass('mini-image-active');
	$('.galleryContent').hide();
	$('#gallery-'+NEWS_POS).show();
	
	$('.backbtn').on('hover', function(e){
		clearActive();
		$('.backbtn').addClass('hover');
	});

	$('.backbtn').on('click', function(e){
		e.preventDefault();
		
		$('#gallery-area').hide();
		$('#main-area').show();
		$('#gallery-'+NEWS_POS).show();
		
		$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailactive')+")");
		curLevel = level.GALLERY;
		GALLERYITEMACTIVE = false;
		setArrows();
		return false;
	});

	$('.termsbtn').hover(function(){
		clearActive();
		$('#termsconditions a').addClass('hover');
	},function(){
		
	});
	$('.navbtn').hover(function(){
		clearActive();
		NAV_HOVER = true;
		$(this).addClass('hover');
		curLevel = level.MENU;
		MENU_POS = $(this).parent().index();
	},function(){
		NAV_HOVER = false;
	});

	$('#mini-gallery, .recipes-main').on('hover',function(){
		//Clear active
		clearActive();
			$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailactive')+")");
			$('.arrows').hide();
			//Set level to news
			curLevel = level.GALLERY;
			$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
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
			if(GALLERYITEMACTIVE == true){
				curLevel = level.GALLERYITEM;
				$('.backbtn').addClass('hover');
			}
	})

	$('div.recipes-main').on('click',function(e){
		if(NEWS_POS != 5){
			curLevel = level.GALLERYITEM;
			
			$('#main-area').hide();
			$('#gallery-area').show();
			$('.galleryContent').hide();
			$('#gallery-item-'+NEWS_POS).show();
		
			GALLERYITEMACTIVE = true;
			console.log(curLevel);
		
			$('.backbtn').addClass('hover');
			
		}
	});
	
	$('.mini-image').on('click', function(e){
		var a = $(this).attr('id');
		$('#gallery-'+NEWS_POS).hide();
		$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailinactive')+")");
		$('.mini-image-active').removeClass('mini-image-active').addClass('mini-image');

		NEWS_POS = Number(a.charAt(a.length-1));
		$('#gallery-'+NEWS_POS).show();
		$(this).addClass('mini-image-active');
		$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailactive')+")");
		$('.showcaseimage').hide();
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
		//Switch Content
		
		$('#panel'+NEWS_POS+'_content').show();
		//logger.keys.push("news-"+NEWS_POS+":click");
	});

	$('#news_arrowleft,#panel3,#panel2_content, #panel4_content, #panel1_content').hide();
	$('#news_arrowleft').on('click', function(){
		slideLeft('click');
	});

	$('#news_arrowright').on('click', function(){
		slideRight('click');
	});
	});
}


angular.module('project', ['ngResource']).
config(function($routeProvider) {
$routeProvider.
  when('/', {controller:GalleryController, templateUrl:'http://s.amxp.cc/recipes/layout.html'}).
  otherwise({redirectTo:'/'});
});

function slideRight(keyCode){
	if((NEWS_POS+1) <= MAX_ITEMS){
		var a = $('#icon-'+NEWS_POS).attr('id');
		$('#gallery-'+NEWS_POS).hide();
		$('.mini-image-active').removeClass('mini-image-active').addClass('mini-image');
		
		$('.showcaseimage').hide();
		$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailinactive')+")");
		NEWS_POS = NEWS_POS + 1;
		$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailactive')+")");
		//Change Content
		$('#gallery-'+NEWS_POS).show();
		
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
	}
	//logger.keys.push("news-"+NEWS_POS+":"+keyCode);
}

function slideLeft(keyCode){
	if((NEWS_POS-1) > 0){
		var a = $('#icon-'+NEWS_POS).attr('id');
		$('.showcaseimage').hide();
		$('#gallery-'+NEWS_POS).hide();
		$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailinactive')+")");
		NEWS_POS = NEWS_POS - 1;
		$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailactive')+")");
		$('#gallery-'+NEWS_POS).show();
		
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
	}
	//logger.keys.push("news-"+NEWS_POS+":"+keyCode);
}

Main.onUnload = function()
{

};

Main.onLoad = function()
{
this.enableKeys();
	widgetAPI.sendReadyEvent();
};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			if (curLevel == level.MENU) {
				if (MENU_POS > 0){
					//Move left
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS-1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					//}
				}
			}
			if (curLevel == level.GALLERY) {
				$('#news_arrowleft').addClass('activeImage');
				$('#news_arrowright').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowleft').removeClass('activeImage');},200);
				slideLeft('left');
			}
			break;
		case tvKey.KEY_RIGHT:
			if (curLevel == level.MENU) {
				if (MENU_POS < 2){
					//Move Right
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS+1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					//}
				}
			}
			if (curLevel == level.GALLERY) {
				$('#news_arrowright').addClass('activeImage');
				$('#news_arrowleft').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowright').removeClass('activeImage');},200);
				slideRight('right');
			}
			break;
		case tvKey.KEY_UP:
			if (curLevel == level.MENU) {
				$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
				if(GALLERYITEMACTIVE == true){
				curLevel = level.GALLERYITEM;
				$('.backbtn').addClass('hover');
				}else{
				curLevel = level.TERMS;
				$('#termsconditions a').addClass('hover');
				}
				$('.arrows').hide();
				
			}else if(curLevel == level.TERMS){
				//return to matrix
				if(GALLERYITEMACTIVE == true){
				curLevel = level.GALLERYITEM;
				$('.backbtn').addClass('hover');
				$('#termsconditions a').removeClass('hover');
				}else{
					$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailactive')+")");
					$('#termsconditions a').removeClass('hover');
					$('.arrows').show();
					setArrows();
					curLevel = level.GALLERY;
				}
			}
			break;
		case tvKey.KEY_DOWN:
			if (curLevel == level.MENU) {
				//chill
			}
			if (curLevel == level.TERMS) {
				//On Terms, go to Menu
				curLevel = level.MENU;
				$('.arrows').hide();
				$('.arrows').removeClass('activeImage');
				$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailinactive')+")");
				$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
				$('#termsconditions a').removeClass('hover');
			}
			if (curLevel == level.GALLERY){
				//Go to terms
				curLevel = level.TERMS;
				$('.arrows').hide();
				$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailinactive')+")");
				$('#termsconditions a').addClass('hover');
			}else if(curLevel == level.GALLERYITEM){
				//Move Down to menu
				curLevel = level.TERMS;
				$('.backbtn').removeClass('hover');
				$('#termsconditions a').addClass('hover');
				
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//added as ux change
			if (curLevel == level.MENU) {
					var goto = $('.navbar .container ul li:eq('+MENU_POS+') a').attr('href');
					window.location =goto;
			}
			if(curLevel == level.TERMS){
				var g = $('#termsconditions a').attr('href');
				window.location =g;
			}
			if(curLevel == level.GALLERY){
				//display Gallery Item
				if(NEWS_POS != 5){
					curLevel = level.GALLERYITEM;
					
					$('#main-area').hide();
					$('#gallery-area').show();
					$('.galleryContent').hide();
					$('#gallery-item-'+NEWS_POS).show();
				
					GALLERYITEMACTIVE = true;
					alert(curLevel);
				
					$('.backbtn').addClass('hover');
				}
			}else if(curLevel == level.GALLERYITEM){
				//return to gallery
				
				$('#gallery-area').hide();
				$('#main-area').show();
				$('.galleryContent').hide();
				$('#gallery-'+NEWS_POS).show();
				curLevel = level.GALLERY;
				GALLERYITEMACTIVE = false;
				$('.arrows').show();
				$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailactive')+")");
				setArrows();
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};

function preload(arrayOfImages){
	$(arrayOfImages).each(function(){
		$('<img/>')[0].src = this;
	});
}

function clearActive(){
	$('.activeImage').removeClass('activeImage');
	$('.arrows').hide();
	$('.hover, .backbtn').removeClass('hover');
	$('#termsconditions a').removeClass('hover');
	$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailinactive')+")");
	$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
}

function setArrows(){
	$('.arrows').show();
	$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailactive')+")");
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
}
