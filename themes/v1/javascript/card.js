//Define Levels
level = {};
level.CARD = 1;
level.MENU = 2;
level.TERMS = 2;

MENU_MATRIX = {
	1: "1,2,3,4"
}

FOOTER_MATRIX = {
	1: "benefits",
	2: "newsoffers",
	3: "findacard",
	4: "exit"
}

MENU_POS = 0;
CUR_POS = 1;
//Current Index
curIndex = 1;
ACTIVE_PAGE = 2;
//Current Level
curLevel = level.MENU;
function CardsController($scope,$http,$location){
$(document).ready(function() {
	//Todo: move to common.js
	$('#cardsNav .container ul li:eq('+MENU_POS+') a').addClass('hover');
	//$('.termsconditions a').addClass('hover');
	CUR_POS = 2;
	$('.backButton').on('click', function(e){
		window.history.back();
		return false;
	});
	
	$('.termsbtnblk').hover(function(){
		clearActive();
		$('.termsconditions a').addClass('hover');
		curLevel = level.TERMS;
	});
	$('.navbtn').hover(function(){
		clearActive();
		curLevel = level.MENU;
		$(this).addClass('hover');
		MENU_POS = $(this).parent().index();
	});
});
}

angular.module('project', ['ngResource']).
config(function($routeProvider) {
$routeProvider.
  when('/', {controller:CardsController, templateUrl:'/shopsmall/slayout.html'}).
  otherwise({redirectTo:'/'});
});

function keyDown(event) {
	//alert(event.keyCode);
	switch (event.keyCode) {
		case VK_LEFT:
		{
			if (curLevel == level.MENU) {
				if (MENU_POS > 0){
					//Move left
					/*if (MENU_POS-1 == ACTIVE_PAGE) {
						//chill
					}else{*/
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS-1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					//}
				}
			}

			if (curLevel == level.CARD) {
				// Do nada
				$('.termsconditions').addClass('hover');
				CUR_POS = 2;
			}
			break;
		}
		case VK_RIGHT:
		{
			if (curLevel == level.MENU) {
				if (MENU_POS < 2){
					//Move Right
					/*if (MENU_POS+1 == ACTIVE_PAGE) {
						//chill
					}else{*/
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS+1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					//}
				}
			}
			if (curLevel == level.CARD) {
				$('.termsconditions a').addClass('hover');
				CUR_POS = 2;
			}
			break;
		}
		case VK_DOWN:
		{
			if (curLevel == level.MENU) {
				//chill
			}
			if (curLevel == level.CARD) {
				if(CUR_POS == 2){
					//On Terms, go to Menu
					$('.termsconditions a').removeClass('hover');
					curLevel = level.MENU;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
				}else{
					//Go to Terms
					$('.termsconditions a').addClass('hover');
					CUR_POS = 2;
				}
				
			}
			break;
		}
		case VK_UP:
		{
			if (curLevel == level.MENU) {
				//return to matrix
				$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
				curLevel = level.CARD;
				clearActive();
				$('.termsconditions a').addClass('hover');
				CUR_POS = 2;
			}else {
				//
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
			}else{
				analytics.track($('title').html(), {
				    'Select'  :  'Terms Button'
				});
				var g = $('.termsconditions a').attr('href');
				window.location =g;

			}
			break;
		}
		case VK_BACK:
		{
			window.NetCastSetPageLoadingIcon('enabled');
			window.history.back();
		break;
		}
	}
}
