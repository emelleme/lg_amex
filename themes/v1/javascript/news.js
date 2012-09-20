//Define Levels
level = {};
level.NEWS = 1;
level.MENU = 2;

MENU_MATRIX = {
	1: "1,2,3,4"
}

FOOTER_MATRIX = {
	1: "benefits",
	2: "newsoffers",
	3: "findacard",
	4: "exit"
}

START_IMAGE = 2;
CUR_ROW = 2;
CUR_COL = 1;
MAX_ROW = 4;
MAX_COL = 4;
MENU_POS = 0;
NEWS_POS = 3;
ACTIVE_PAGE = 1;
//Current Index
curIndex = 1;

//Current Level
curLevel = level.NEWS;
logger.page = 'news';
$(document).ready(function() {
	//Todo: move to common.js
	$('#news_arrowleft').addClass('activeImage');
	
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

	$('#showcase-container').on('click',function(){
		//Clear active
		clearActive();
		//Set level to news
		curLevel = level.NEWS;
	})
	$('.arrows2, #showcase').on('hover',function(){
		//Clear active
		clearActive();
		//Set level to news
		curLevel = level.NEWS;
	})

	$('.panelHeader').on('click', function(e){
		var a = $(this).attr('id');
		$('.panelHeader').show();
		$('.showcaseimage').hide();
		NEWS_POS = Number(a.charAt(a.length-1));
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
		console.log(NEWS_POS);
	});

	$('#panel3,#panel2_content, #panel4_content, #panel1_content').hide();
	$('#news_arrowleft').on('click', function(){
		slideLeft();
	});

	$('#news_arrowright').on('click', function(){
		slideRight();
	})
});

function slideRight(){
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
	}
	logger.keys.push("news-"+NEWS_POS);
}

function slideLeft(){
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
		}
		logger.keys.push("news-"+NEWS_POS);
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
					/*if (MENU_POS-1 == ACTIVE_PAGE) {
						MENU_POS = MENU_POS-2;
						clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					}else{*/
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS-1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					//}
				}
			}
			if (curLevel == level.NEWS) {
				$('#news_arrowleft').addClass('activeImage');
				$('#news_arrowright').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowleft').removeClass('activeImage');},200);
				slideLeft();
			}
			break;
		}
		case VK_RIGHT:
		{
			if (curLevel == level.MENU) {
				if (MENU_POS < 2){
					//Move Right
					/*if (MENU_POS+1 == ACTIVE_PAGE) {
						MENU_POS = MENU_POS+2;
						clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					}else{*/
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS+1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					//}
				}
			}
			if (curLevel == level.NEWS) {
				$('#news_arrowright').addClass('activeImage');
				$('#news_arrowleft').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowright').removeClass('activeImage');},200);
				slideRight();
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
				curLevel = level.MENU;
				$('.arrows2').hide();
				$('.arrows2').removeClass('activeImage');
				$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
			}
			break;
			break;
		}
		case VK_UP:
		{
			if (curLevel == level.MENU) {
				//return to matrix
				if(NEWS_POS > 4){
					$('#news_arrowleft').show();
				}else if(NEWS_POS == 1){
					$('#news_arrowright').show();
				}else{
					$('#news_arrowright').show();
					$('#news_arrowleft').show();
				}
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					curLevel = level.NEWS;
					clearActive();
				
			}else {
				
			}
			break;
		}
		case VK_ENTER:
		{
			//added as ux change
			if (curLevel == level.MENU) {
				$.post('lg/userData',logger,function(logger){
					var goto = $('.navbar .container ul li:eq('+MENU_POS+') a').attr('href');
					window.location =goto;
				});
			} 
			break;
		}
		case VK_BACK:
		{
			$.post('lg/userData',logger,function(logger){
				window.history.back();
			});
		break;
		}
	}
	if(curLevel == level.MENU){
		logger.keys.push("footer-"+MENU_POS);
	}else{
		logger.keys.push("news-"+NEWS_POS);
	}
}
