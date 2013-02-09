Main.recipesLoad = function(){
	Main.MENU_POS = 0;
	document.getElementById('anchor').onkeydown = Main.recipesKeys; 
	alert(Main.GOBACK);
	if(!Main.GOBACK){
		//Refresh page
		Main.NEWS_POS = 1;
	}else{
		//Return Back to previous state
		Main.GOBACK = 0;
	}
	$('#cardsView').hide();
	$('#travelView').hide();
	$('#videosView').hide();
	$('#termsView').hide();
	$('#recipesView').show();
	
	//Hide Terms Text
	$('span.bazaar-footer').css('display','none');
	if(!Main.GALLERYITEMACTIVE){
		Main.curLevel = Main.level.GALLERY;
		$('#gallery_arrowleft').hide();
		$('#gallery-area').hide();
		$('#gallery-content-new').show();
		$('.panelHeader').show();
		$('#panel1-content,#panel2-content, #panel4-content, #panel3-content').hide();
		$('.viewcollection').addClass('hover');
		$('#panel'+Main.NEWS_POS).hide();
		$('#panel'+Main.NEWS_POS+'-content').show();
		setArrows();
	}else{
		Main.curLevel = Main.level.GALLERYITEM;
		$('#gallery-content-new').hide();
		$('.galleryContent').hide();
		$('#gallery-item-'+Main.NEWS_POS).show();
		$('.backbtn').addClass('hover');
	}
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
				alert('REturn to gallery')
				$('#gallery-area').hide();
				$('#gallery-content-new').show();
				$('.galleryContent').hide();
				$('#gallery-'+Main.NEWS_POS).show();
				Main.curLevel = Main.level.GALLERY;
				Main.GALLERYITEMACTIVE = false;
				$('.arrows').show();
				$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailactive')+")");
				setArrows();
			}else{
				var m = Main.prevPage.shift();
				if(m == 'shopsmall'){
					Main.cardsLoad();
				}else if(m == 'videos'){
					Main.videosLoad();
				}else if(m == 'tipstrends'){
					Main.travelLoad();
				}
				alert(Main.prevPage);
			}
			
			//widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS > 0){
					//Move left
					$('#designerNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS-1;
					Main.clearActive();
					$('#designerNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
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
					$('#designerNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS+1;
					Main.clearActive();
					$('#designerNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
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
			if (Main.curLevel == Main.level.MENU || Main.curLevel == Main.level.TERMS) {
				Main.clearActive();
				$('.arrows').show();
				if(Main.NEWS_POS == 1){
					//Hide left arrow
					$('#gallery_arrowleft').hide();
					$('#gallery_arrowright').show();
				}else if (Main.NEWS_POS < Main.MAX_ITEMS) {
					//show both arrows
					$('#gallery_arrowleft').show();
					$('#gallery_arrowright').show();
				}else{
					//hide right arrow
					$('#gallery_arrowright').hide();
					$('#gallery_arrowleft').show();
				}
				$('.navbar .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
				$('.backbtn, .viewcollection').addClass('hover');
				Main.curLevel = Main.prevLevel;
				
			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			if (Main.curLevel == Main.level.TERMS) {
				//On Terms, go to Menu
				Main.curLevel = Main.level.MENU;
				Main.clearActive();
				$('.arrows').hide();
				$('.arrows').removeClass('activeImage');
				$('.termsconditions a').removeClass('hover');
				$('#designerNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
			}else if (Main.curLevel == Main.level.GALLERY || Main.curLevel == Main.level.GALLERYITEM){
				//Go to terms
				$('.backbtn, .viewcollection').removeClass('hover');
				Main.prevLevel = Main.curLevel;
				Main.curLevel = Main.level.TERMS;
				$('.arrows').hide();
				$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailinactive')+")");
				$('.termsconditions a').addClass('hover');
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			if (Main.curLevel == Main.level.MENU) {
				Main.GOBACK = 0;
				Main.GALLERYITEMACTIVE = 0;
				$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailinactive')+")");
				var g = $('#designerNav .container ul li:eq('+Main.MENU_POS+') a').attr('data-page');
				if(g == 'tipstrends'){
				Main.prevPage.unshift('designerspotlight');
					Main.pageDepth += 1;
		  			Main.travelLoad();
				}else if(g == 'videos'){
				Main.prevPage.unshift('designerspotlight');
					Main.pageDepth += 1;
					Main.videosLoad();
				}else if(g == 'shopsmall'){
				Main.prevPage.unshift('designerspotlight');
					Main.pageDepth += 1;
					Main.cardsLoad();
				}
			}else if(Main.curLevel == Main.level.TERMS){
				$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailinactive')+")");
				Main.prevPage.unshift('designerspotlight');
				Main.termsLoad();
			}else if(Main.curLevel == Main.level.GALLERY){
				//display Gallery Item
				if(Main.NEWS_POS != Main.MAX_ITEMS){
					Main.curLevel = Main.level.GALLERYITEM;
					alert('Item')
					$('#gallery-content-new').hide();
					$('#gallery-area').show();
					$('.galleryContent').hide();
					$('#gallery-item-'+Main.NEWS_POS).show();
					$('.backbtn').addClass('hover');
					Main.GALLERYITEMACTIVE = true;
				}
			}else if(Main.curLevel == Main.level.GALLERYITEM){
				//return to gallery
				$('#gallery-area').hide();
				$('#gallery-content-new').show();
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
	if($('#panel'+Number(Main.NEWS_POS+1)+'-content').html()!=null){
		$('.panelHeader').show();
		$('#panel'+Main.NEWS_POS).show();
		$('#panel'+Main.NEWS_POS+'-content').hide();
		Main.NEWS_POS = Main.NEWS_POS+1;
		$('#panel'+Main.NEWS_POS+'-content').show();
		$('#panel'+Main.NEWS_POS).hide();
		if (Main.NEWS_POS > 1) {
			//Show Left Arrow
			$('#news_arrowleft').show();
		};
		if(Main.NEWS_POS >= Main.MAX_ITEMS){
		$('#news_arrowright').hide();
		$('span.bazaar-footer').css('display','inline-block');
		}
	}
}

function slideLeft(keyCode){
	if(Main.NEWS_POS > 0){
		if($('#panel'+Number(Main.NEWS_POS-1)+'-content').html()!=null){
			$('#panel'+Main.NEWS_POS).show();
			$('#panel'+Main.NEWS_POS+'-content').hide();
			Main.NEWS_POS = Main.NEWS_POS-1;
			alert(Main.NEWS_POS);
			$('#panel'+Main.NEWS_POS+'-content').show();
			$('#panel'+Main.NEWS_POS).hide();
			if (Main.NEWS_POS > 0) {
				//Show Right Arrow
				$('#news_arrowright').show();
				$('span.bazaar-footer').css('display','none');
			};
			if(Main.NEWS_POS == 1){
			$('#news_arrowleft').hide();
			}
		}
	}
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
		$('span.bazaar-footer').css('display','inline-block');
	}
}
