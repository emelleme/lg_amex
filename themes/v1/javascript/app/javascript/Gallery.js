var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var nextPage = 'recipes.html';

//Define Levels
level = {};
level.GALLERY = 1;
level.TERMS = 2;
level.MENU = 3;
level.GALLERYITEM = 4;

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
NEWS_POS = 1;
MAX_ITEMS = 1;
GALLERYITEMACTIVE = false;
//Current Index
curIndex = 3;
//Current Level
curLevel = level.GALLERY;

function clearActive(){
    $('.activeImage').removeClass('activeImage');
    $('.hover').removeClass('hover');
}

var Main =
{

};

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	MAX_ITEMS = $('#icon-1').parent().children('div').size();
	$('#icon-1').addClass('mini-image-active');
	
	
	$('.backButton').on('click', function(e){
		
	});
	
	$('.navbtn').on('click', function(e){
		e.preventDefault();
		var link = $(this);
		nowLoading(this);		
	});

	$('#mini-gallery').on('click',function(){
		//Clear active
		clearActive();
		//Set level to news
		curLevel = level.GALLERY;
	})
	$('#content-new, #mini-gallery').on('hover',function(){
		//Clear active
		clearActive();
		//Set level to news
		curLevel = level.GALLERY;
	})

	$('.mini-image').on('click', function(e){
		var a = $(this).attr('id');
		$('.mini-image-active').removeClass('mini-image-active').addClass('mini-image');
		$(this).removeClass('mini-image').addClass('mini-image-active');
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
		
		//Switch Content
		
		$('#panel'+NEWS_POS+'_content').show();
		//logger.keys.push("news-"+NEWS_POS+":click");
	});

	$('#panel3,#panel2_content, #panel4_content, #panel1_content').hide();
	$('#news_arrowleft').on('click', function(){
		slideLeft('click');
	});

	$('#news_arrowright').on('click', function(){
		slideRight('click');
	})
};

Main.onUnload = function()
{
	
};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

function slideRight(keyCode){
	if((NEWS_POS+1) <= MAX_ITEMS){
		var a = $('#icon-'+NEWS_POS).attr('id');
		$('.mini-image-active').removeClass('mini-image-active').addClass('mini-image');
		
		$('.showcaseimage').hide();
		$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailinactive')+")");
		NEWS_POS = NEWS_POS + 1;
		$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailactive')+")");
		//Change Content
		$('#gallery-main').html($('#gallery-'+NEWS_POS).html());
		
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
}

function slideLeft(keyCode){
	if((NEWS_POS-1) > 0){
		var a = $('#icon-'+NEWS_POS).attr('id');
		$('.showcaseimage').hide();
		$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailinactive')+")");
		NEWS_POS = NEWS_POS - 1;
		$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailactive')+")");
		//Change Content
		$('#gallery-main').html($('#gallery-'+NEWS_POS).html());
		
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

Main.keyDown = function()
{
	var keyCode = event.keyCode;

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
			alert('LEFT');
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
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
			alert("UP");
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
				$('#icon-'+NEWS_POS).css('background-image',"url("+$('#icon-'+NEWS_POS).attr('data-thumbnailactive')+")");
				$('#termsconditions a').removeClass('hover');
				$('.arrows').show();
				if(NEWS_POS > 4){
					$('#news_arrowleft').show();
				}else if(NEWS_POS == 1){
					$('#news_arrowright').show();
				}else{
					$('#news_arrowright').show();
					$('#news_arrowleft').show();
				}
				
				curLevel = level.GALLERY;
				clearActive();
			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
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
				$('#termsconditions a').addClass('hover');
			}else if(curLevel == level.GALLERYITEM){
				//Move Down to menu
				curLevel = level.MENU;
				$('.backbtn').removeClass('hover');
				$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
				
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
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
					$('#main-holder').html($('#main-area').html());
					$('#main-area').html($('#gallery-item-'+NEWS_POS).html());
				
					GALLERYITEMACTIVE = true;
					console.log(curLevel);
				
					$('.backbtn').addClass('hover');
				}
			}else if(curLevel == level.GALLERYITEM){
				//return to gallery
				
				$('#main-area').html($('#main-holder').html());
				curLevel = level.GALLERY;
				GALLERYITEMACTIVE = false;
				$('.arrows').show();
				if(NEWS_POS > 4){
					$('#news_arrowleft').show();
				}else if(NEWS_POS == 1){
					$('#news_arrowright').show();
				}else{
					$('#news_arrowright').show();
					$('#news_arrowleft').show();
				}
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};