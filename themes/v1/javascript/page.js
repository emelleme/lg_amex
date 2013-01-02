//Define Levels
level = {};
level.TERMS = 1;
level.FOOTER = 2;

MENU_POS = 0;
CUR_POS = 1;
//Current Level
curLevel = level.TERMS;
$(document).ready(function() {
	curLevel = level.MENU;
	$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
	
	$('.backbtn').on('click', function(e){
		window.history.back();
		//return false;
	});
	$('.backbtn').addClass('hover');

	$('.navbtn').hover(function(){
		clearActive();
		NAV_HOVER = true;
		$(this).addClass('hover');
		curLevel = level.MENU;
		MENU_POS = $(this).parent().index();
	},function(){
		NAV_HOVER = false;
	});

	$('.navbtn').focus(function() {
 		clearActive();
	});
	
	$('.termsconditions a').hover(function(){
		clearActive();
		$('.termsconditions a').addClass('hover');
	},function(){
		
	});

	$('.backbtn').hover(function(){
		clearActive();
		$('.termsconditions a').addClass('hover');
		$('.backbtn').addClass('hover');
		curLevel = level.TERMS;
	});
});

function clearActive(){
	$('.activeImage').removeClass('activeImage');
	$('.hover').removeClass('hover');
}

function keyDown(event) {
	//alert(event.keyCode);
	switch (event.keyCode) {

		case VK_LEFT:
		{
			leftCount++;
			if (curLevel == level.MENU) {
				if (MENU_POS > 0){
					//Move left
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS-1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
				}
			}else{
				curLevel = level.MENU;
				clearActive();
				$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
			}

			if (curLevel == level.TERMS) {
				// Do nada
			}
			break;
		}
		case VK_RIGHT:
		{
			if(leftCount == 2){
				rightCount++
			}else{
				leftCount =0;
				rightCount = 0;
			}
			if (curLevel == level.MENU) {
				if (MENU_POS < 2){
					//Move Right
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS+1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
				}
			}else{
				curLevel = level.MENU;
				clearActive();
				$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
			}
			if (curLevel == level.TERMS) {
				$('.termsconditions').addClass('hover');
				CUR_POS = 2;
			}
			break;
		}
		case VK_DOWN:
		{
			if (curLevel == level.MENU) {
				//chill
			}else{
				curLevel = level.MENU;
				clearActive();
				$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
			}
			break;
		}
		case VK_UP:
		{
			if(rightCount == 2){
				upCount++;
			}else{
				leftCount = 0;
				rightCount = 0;
			}
			if (curLevel == level.MENU) {
				//return to matrix
				$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
				curLevel = level.TERMS;
				clearActive();
				$('.backbtn').addClass('hover');
				CUR_POS = 2;
			}else{
				curLevel = level.MENU;
				clearActive();
				$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
			}
			break;
		}
		case VK_ENTER:
		{
			if(upCount == 1){
				window.location = "/videos";
			}else{
				upCount = 0;
				leftCount = 0;
				rightCount = 0;
			}
			//added as ux change
			if (curLevel == level.MENU) {
				var goto = $('.navbar .container ul li:eq('+MENU_POS+') a').attr('href');
				window.location =goto;
			}else{
				window.location = 'travel';
			}
			break;
		}
		case VK_BACK:
		{
		  window.location = 'travel';
		break;
		}
	}
}
