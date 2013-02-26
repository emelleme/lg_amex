//Define Levels
level = {};
level.ITEM = 1;
level.MENU = 2;
level.TERMS = 4;
level.GALLERY = 3;


eggCount =0;

var curLevel = level.GALLERY;
var prevLevel = curLevel;
playTimeInterval = 0;
playBarTimeout = 0;
MENU_MATRIX = {
	1: "1,2,3,4"
}

MENU_POS = 0;
ITEM_POS = 1;
MAX_ITEMS = 5;


$(document).ready(function() {
	$('#gallery_arrowleft').hide();
	$('#gallery-area').hide();
	$('span.bazaar-footer').css('display','none');
	$('.viewcollection').addClass('hover');
	
	$('.panelHeader').on('hover', function(e){
		//console.log($(this).children('h3'));
		
	});

	$('.backbtn').on('hover', function(e){
		clearActive();
		$(this).addClass('hover');
		curLevel = level.ITEM;
	});

	$('.backbtn').on('click', function(e){
		e.preventDefault();
		curLevel = level.GALLERY;
			
		$('#gallery-content-new').show();
		$('#gallery-area').hide();
		$('#gallery-item-'+ITEM_POS).hide();
		GALLERYITEMACTIVE = false;
		setArrows();
		analytics.track($('title').html(), {
		    'Magic Remote Select Back'  :  $('#panel'+ITEM_POS).attr('data-title')
		});
		return false;
	});

	$('.navbtn').hover(function(){
		clearActive();
		NAV_HOVER = true;
		curLevel = level.MENU;
		$(this).addClass('hover');
		MENU_POS = $(this).parent().index();
		console.log('Test')
	});
	
	
	$('.navbtn').on('click', function(e){
		e.preventDefault();
		var link = $(this);
		window.location = link.attr('href');
		return false;
	});

	$('.panelHeader').on('click', function(e){
		var a = $(this).attr('id');
		$('.panelHeader').show();
		$('.showcaseimage').hide();
		ITEM_POS = Number(a.charAt(a.length-1));
		if(ITEM_POS == 1){
			//Hide left arrow
			$('#gallery_arrowleft').hide();
			$('#gallery_arrowright').show();
		}else if (ITEM_POS < MAX_ITEMS) {
			//show both arrows
			$('#gallery_arrowleft').show();
			$('#gallery_arrowright').show();
		}else{
			//hide right arrow
			$('#gallery_arrowright').hide();
			$('#gallery_arrowleft').show();
		}
		$('#panel'+ITEM_POS).hide();
		$('#panel'+ITEM_POS+'-content').show();
		analytics.track($('title').html(), {
		    'Magic Remote Select Panel'  :  $('#panel'+ITEM_POS).attr('data-title')
		});
	}).on('hover',function(){
		clearActive();
		curLevel = prevLevel;
		$('.backbtn, .viewcollection').addClass('hover');
		if(ITEM_POS == 1){
			//Hide left arrow
			$('#gallery_arrowleft').hide();
			$('#gallery_arrowright').show();
		}else if (ITEM_POS < 5) {
			//show both arrows
			$('#gallery_arrowleft').show();
			$('#gallery_arrowright').show();
		}else{
			//hide right arrow
			$('#gallery_arrowright').hide();
			$('#gallery_arrowleft').show();
		}
	});
	
	$('.showcaseimage, a.viewcollection').on('click',function(e){
		e.preventDefault();
		if(ITEM_POS != 5){
			curLevel = level.ITEM;
			prevLevel = curLevel;
			$('#gallery-content-new').hide();
			$('#gallery-area').show();
			$('#gallery-item-'+ITEM_POS).show();
		
			GALLERYITEMACTIVE = true;
			console.log(curLevel);
		
			$('.backbtn').addClass('hover');
			analytics.track($('title').html(), {
		    'Magic Remote Select View'  :  $('#panel'+ITEM_POS).attr('data-title')
		});
			return false;
		}
	});
	$('.showcaseimage').on('hover', function(e){
		
		clearActive();
		$('.viewcollection').addClass('hover');
		curLevel = level.GALLERY;
		if(ITEM_POS == 1){
			//Hide left arrow
			$('#gallery_arrowleft').hide();
			$('#gallery_arrowright').show();
		}else if (ITEM_POS < 5) {
			//show both arrows
			$('#gallery_arrowleft').show();
			$('#gallery_arrowright').show();
		}else{
			//hide right arrow
			$('#gallery_arrowright').hide();
			$('#gallery_arrowleft').show();
		}
	});

	$('#panel1,#panel2-content, #panel4-content, #panel3-content').hide();
	$('#gallery_arrowleft').on('click', function(){
		slideLeft('click');
	});

	$('#gallery_arrowright').on('click', function(){
		slideRight('click');
	});
	
	$('.termsbtnblk').hover(function(){
		clearActive();
		$('.termsconditions a').addClass('hover');
		curLevel = level.TERMS;
	});
});

function slideRight(keyCode){
	if($('#panel'+Number(ITEM_POS+1)+'-content').html()!=null){
		$('.panelHeader').show();
		$('#panel'+ITEM_POS).show();
		$('#panel'+ITEM_POS+'-content').hide();
		ITEM_POS = ITEM_POS+1;
		$('#panel'+ITEM_POS+'-content').show();
		$('#panel'+ITEM_POS).hide();
		if (ITEM_POS > 1) {
			//Show Left Arrow
			$('#gallery_arrowleft').show();
			console.log(ITEM_POS)
		};
		if($('#panel'+Number(ITEM_POS+1)+'-content').html()==null){
		$('#gallery_arrowright').hide();
		$('span.bazaar-footer').css('display','inline-block');
		}
	}
	//logger.keys.push("ITEM-"+ITEM_POS+":"+keyCode);
}

function slideLeft(keyCode){
	if(ITEM_POS > 0){
		if($('#panel'+Number(ITEM_POS-1)+'-content').html()!=null){
			$('#panel'+ITEM_POS).show();
			$('#panel'+ITEM_POS+'-content').hide();
			ITEM_POS = ITEM_POS-1;
			$('#panel'+ITEM_POS+'-content').show();
			$('#panel'+ITEM_POS).hide();
			if (ITEM_POS > 0) {
				//Show Right Arrow
				$('#gallery_arrowright').show();
				$('span.bazaar-footer').css('display','none');
				console.log(ITEM_POS);
			};
			if($('#panel'+Number(ITEM_POS-1)+'-content').html()==null){
			$('#gallery_arrowleft').hide();
			}
		}
	//logger.keys.push("ITEM-"+ITEM_POS+":"+keyCode);
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
			}else if (curLevel == level.GALLERY) {
				$('#gallery_arrowleft').addClass('activeImage');
				$('#gallery_arrowright').removeClass('activeImage');
				setTimeout(function(){$('#gallery_arrowleft').removeClass('activeImage');},200);
				slideLeft('left');
				analytics.track($('title').html(), {
				    'Left Button' : $('#panel'+ITEM_POS).attr('data-title')
				});
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
			}else if (curLevel == level.GALLERY) {
				$('#gallery_arrowright').addClass('activeImage');
				$('#gallery_arrowleft').removeClass('activeImage');
				setTimeout(function(){$('#gallery_arrowright').removeClass('activeImage');},200);
				slideRight('right');
				analytics.track($('title').html(), {
				    'Right Button' : $('#panel'+ITEM_POS).attr('data-title')
				});
			}
			break;
		}
		case VK_DOWN:
		{
			if (curLevel == level.ITEM || curLevel == level.GALLERY) {
				//Go to terms
				prevLevel = curLevel;
				curLevel = level.TERMS;
				$('.arrows').hide();
				$('#icon-'+ITEM_POS).css('background-image',"url("+$('#icon-'+ITEM_POS).attr('data-thumbnailinactive')+")");
				$('.termsconditions a').addClass('hover');
				$('.backbtn, .viewcollection').removeClass('hover');
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
			if (curLevel == level.MENU || curLevel == level.TERMS) {
				clearActive();
				$('.arrows').show();
				if(ITEM_POS == 1){
					//Hide left arrow
					$('#gallery_arrowleft').hide();
					$('#gallery_arrowright').show();
				}else if (ITEM_POS < MAX_ITEMS) {
					//show both arrows
					$('#gallery_arrowleft').show();
					$('#gallery_arrowright').show();
				}else{
					//hide right arrow
					$('#gallery_arrowright').hide();
					$('#gallery_arrowleft').show();
				}
				$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
				$('.backbtn, .viewcollection').addClass('hover');
				curLevel = prevLevel;
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
			}else if(curLevel == level.GALLERY){
				//Show Gallery Details
				if(ITEM_POS != MAX_ITEMS){
					curLevel = level.ITEM;
					$('#gallery-content-new').hide();
					$('#gallery-area').show();
					$('.galleryContent').hide();
					$('#gallery-item-'+ITEM_POS).show();
					GALLERYITEMACTIVE = true;
					console.log(curLevel);
					$('.backbtn').addClass('hover');
					analytics.track($('title').html, {
				    'Select Button' : $('#panel'+ITEM_POS).attr('data-title')
				});
				}
				curLevel = level.ITEM
			}else if(curLevel == level.ITEM){
				//return to gallery
				
				$('#gallery-area').hide();
				$('#gallery-content-new').show();
				$('.galleryContent').hide();
				$('#gallery-'+ITEM_POS).show();
				curLevel = level.GALLERY;
				GALLERYITEMACTIVE = false;
				$('#icon-'+ITEM_POS).css('background-image',"url("+$('#icon-'+ITEM_POS).attr('data-thumbnailactive')+")");
				setArrows();
				analytics.track($('title').html(), {
				    'Select Button Back' : $('#panel'+ITEM_POS).attr('data-title')
				});
			}else if(curLevel == level.TERMS){
				analytics.track($('title').html(), {
				    'Terms Button'  :  'Select Button Terms'
				});
				var g = $('.termsconditions a').attr('href');
				window.location =g;
			}
			break;
		}
		case VK_BACK:
		{
			analytics.track($('title').html(), {
				    'Back'  :  'Back Button'
				});
			window.NetCastSetPageLoadingIcon('enabled');
			window.history.back();
			break;
		}
	}
}

function clearActive(){
	$('.activeImage').removeClass('activeImage');
	$('.arrows').hide();
	$('.hover, .backbtn, .viewcollection').removeClass('hover');
	$('.termsconditions a').removeClass('hover');
	$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
}

function setArrows(){
	$('.arrows').show();
	$('#icon-'+ITEM_POS).css('background-image',"url("+$('#icon-'+ITEM_POS).attr('data-thumbnailactive')+")");
	if(ITEM_POS == 1){
		//Hide left arrow
		$('#gallery_arrowleft').hide();
		$('#gallery_arrowright').show();
	}else if (ITEM_POS < MAX_ITEMS) {
		//show both arrows
		$('#gallery_arrowleft').show();
		$('#gallery_arrowright').show();
	}else{
		//hide right arrow
		$('#gallery_arrowright').hide();
		$('#gallery_arrowleft').show();
		$('span.bazaar-footer').css('display','inline-block');
	}
}


function easterEgg(){
	console.log('EGG');

}