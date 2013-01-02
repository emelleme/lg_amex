Main.recipesLoad = function(){
	Main.MENU_POS = 0;
	Main.curLevel = Main.level.GALLERY;
	Main.CUR_ROW = 4;
	Main.CUR_COL = 1;
	Main.PREV_ROW = Main.CUR_ROW;
	Main.PREV_COL = Main.PREV_COL;
	Main.NEWS_POS = 1;
	Main.clearActive();
	document.getElementById('anchor').onkeydown = Main.recipesKeys; 
	$('#icon-1').addClass('mini-image-active');
	$('.galleryContent').hide();
	$('#gallery-'+Main.NEWS_POS).show();
	$('#news_arrowright').show();
	$('#news_arrowleft,#panel3,#panel2_content, #panel4_content, #panel1_content').hide();
	$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailactive')+")");
	$('#cardsView').hide();
	$('#travelView').hide();
	$('#videosView').hide();
	$('#termsView').hide();
	$('#recipesView').show();
}

Main.recipesKeys = function(){
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//Return to Previous Page//
			event.preventDefault();
			if(Main.curLevel == Main.level.GALLERYITEM){
				$('#gallery-area').hide();
				$('#main-area').show();
				$('.galleryContent').hide();
				$('#gallery-'+Main.NEWS_POS).show();
				Main.curLevel = Main.level.GALLERY;
				Main.GALLERYITEMACTIVE = false;
				$('.arrows').show();
				$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailactive')+")");
				setArrows();
			}else{
				
				if(Main.prevPage == 'cards'){
					Main.prevPage = 'recipes';
					Main.cardsLoad();
				}else if(Main.prevPage == 'recipes'){
					Main.prevPage = 'recipes';
					Main.recipesLoad();
				}else if(Main.prevPage == 'travel'){
					Main.prevPage = 'recipes';
					Main.travelLoad();
				}
			}
			alert("RETURN");
			//widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS > 0){
					//Move left
					$('#recipesNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS-1;
					Main.clearActive();
					$('#recipesNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					//}
				}
			}
			if (Main.curLevel == Main.level.GALLERY) {
				$('#news_arrowleft').addClass('activeImage');
				$('#news_arrowright').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowleft').removeClass('activeImage');},200);
				slideLeft('left');
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS < 2){
					//Move Right
					$('#recipesNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS+1;
					Main.clearActive();
					$('#recipesNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					//}
				}
			}
			if (Main.curLevel == Main.level.GALLERY) {
				$('#news_arrowright').addClass('activeImage');
				$('#news_arrowleft').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowright').removeClass('activeImage');},200);
				slideRight('right');
			}
			break;
		case tvKey.KEY_UP:
			alert("UP");
			if (Main.curLevel == Main.level.MENU) {
				$('#recipesNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
				if(Main.GALLERYITEMACTIVE == true){
				Main.curLevel = Main.level.GALLERYITEM;
				$('.backbtn').addClass('hover');
				}else{
				Main.curLevel = Main.level.TERMS;
				$('.termsconditions a').addClass('hover');
				}
				$('.arrows').hide();
				
			}else if(Main.curLevel == Main.level.TERMS){
				//return to matrix
				if(Main.GALLERYITEMACTIVE == true){
				Main.curLevel = Main.level.GALLERYITEM;
				$('.backbtn').addClass('hover');
				$('.termsconditions a').removeClass('hover');
				}else{
					$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailactive')+")");
					$('.termsconditions a').removeClass('hover');
					$('.arrows').show();
					setArrows();
					Main.curLevel = Main.level.GALLERY;
				}
			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			if (Main.curLevel == Main.level.MENU) {
				//chill
			}
			if (Main.curLevel == Main.level.TERMS) {
				//On Terms, go to Menu
				Main.curLevel = Main.level.MENU;
				$('.arrows').hide();
				$('.arrows').removeClass('activeImage');
				$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailinactive')+")");
				$('#recipesNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
				$('.termsconditions a').removeClass('hover');
			}
			if (Main.curLevel == Main.level.GALLERY){
				//Go to terms
				Main.curLevel = Main.level.TERMS;
				$('.arrows').hide();
				$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailinactive')+")");
				$('.termsconditions a').addClass('hover');
			}else if(Main.curLevel == Main.level.GALLERYITEM){
				//Move Down to menu
				Main.curLevel = Main.level.TERMS;
				$('.backbtn').removeClass('hover');
				$('.termsconditions a').addClass('hover');
				
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			if (Main.curLevel == Main.level.MENU) {
				Main.prevPage = 'recipes';
				var g = $('#recipesNav .container ul li:eq('+Main.MENU_POS+') a').attr('data-page');
				if(g == 'travel'){
		  			Main.travelLoad();
				}else if(g == 'videos'){
					Main.videosLoad();
				}else if(g == 'cards'){
					Main.cardsLoad();
				}
			}else if(Main.curLevel == Main.level.TERMS){
				Main.prevPage = 'recipes';
				Main.termsLoad();
			}else if(Main.curLevel == Main.level.GALLERY){
				//display Gallery Item
				if(Main.NEWS_POS != 5){
					Main.curLevel = Main.level.GALLERYITEM;
					
					$('#main-area').hide();
					$('#gallery-area').show();
					$('.galleryContent').hide();
					$('#gallery-item-'+Main.NEWS_POS).show();
				
					Main.GALLERYITEMACTIVE = true;
					console.log(Main.curLevel);
				
					$('.backbtn').addClass('hover');
				}
			}else if(Main.curLevel == Main.level.GALLERYITEM){
				//return to gallery
				
				$('#gallery-area').hide();
				$('#main-area').show();
				$('.galleryContent').hide();
				$('#gallery-'+Main.NEWS_POS).show();
				Main.curLevel = Main.level.GALLERY;
				Main.GALLERYITEMACTIVE = false;
				$('.arrows').show();
				$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailactive')+")");
				setArrows();
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};

function slideRight(keyCode){
	if((Main.NEWS_POS+1) <= Main.MAX_ITEMS){
		var a = $('#icon-'+Main.NEWS_POS).attr('id');
		$('#gallery-'+Main.NEWS_POS).hide();
		$('.mini-image-active').removeClass('mini-image-active').addClass('mini-image');
		
		$('.showcaseimage').hide();
		$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailinactive')+")");
		Main.NEWS_POS = Main.NEWS_POS + 1;
		$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailactive')+")");
		//Change Content
		$('#gallery-'+Main.NEWS_POS).show();
		
		if(Main.NEWS_POS == 1){
			//Hide left arrow
			$('#news_arrowleft').hide();
			$('#news_arrowright').show();
		}else if (Main.NEWS_POS < 5) {
			//show both arrows
			$('#news_arrowleft').show();
			$('#news_arrowright').show();
		}else{
			//hide right arrow
			$('#news_arrowright').hide();
			$('#news_arrowleft').show();
		}
	}
	//logger.keys.push("news-"+Main.NEWS_POS+":"+keyCode);
}

function slideLeft(keyCode){
	if((Main.NEWS_POS-1) > 0){
		var a = $('#icon-'+Main.NEWS_POS).attr('id');
		$('.showcaseimage').hide();
		$('#gallery-'+Main.NEWS_POS).hide();
		$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailinactive')+")");
		Main.NEWS_POS = Main.NEWS_POS - 1;
		$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailactive')+")");
		$('#gallery-'+Main.NEWS_POS).show();
		
		if(Main.NEWS_POS == 1){
			//Hide left arrow
			$('#news_arrowleft').hide();
			$('#news_arrowright').show();
		}else if (Main.NEWS_POS < 5) {
			//show both arrows
			$('#news_arrowleft').show();
			$('#news_arrowright').show();
		}else{
			//hide right arrow
			$('#news_arrowright').hide();
			$('#news_arrowleft').show();
		}
	}
	//logger.keys.push("news-"+Main.NEWS_POS+":"+keyCode);
}

function setArrows(){
	$('.arrows').show();
	$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailactive')+")");
	if(Main.NEWS_POS == 1){
		//Hide left arrow
		$('#news_arrowleft').hide();
		$('#news_arrowright').show();
	}else if (Main.NEWS_POS < 5) {
		//show both arrows
		$('#news_arrowleft').show();
		$('#news_arrowright').show();
	}else{
		//hide right arrow
		$('#news_arrowright').hide();
		$('#news_arrowleft').show();
	}
}
