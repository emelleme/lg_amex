var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var nextPage = 'recipes.html';

//Define Levels
level = {};
level.TERMS = 1;
level.MENU = 2;

MENU_POS = 0;
CUR_POS = 1;
//Current Level
curLevel = level.TERMS;

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

	$('.backbtn').hover(function(){
		clearActive();
		$('#termsconditions a').addClass('hover');
		$('.backbtn').addClass('hover');
		curLevel = level.TERMS;
	});
};

Main.onUnload = function()
{
	
};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

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
					
				}
			}else if (curLevel == level.TERMS) {
				// Do nada
			}
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
                }
            }else{
                curLevel = level.MENU;
                clearActive();
                $('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
            }
			break;
		case tvKey.KEY_UP:
			alert("UP");
			if (curLevel == level.MENU) {
				//return to matrix
				$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
				curLevel = level.TERMS;
				clearActive();
				$('.backbtn').addClass('hover');
				CUR_POS = 2;
			}else {
				
			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			if (curLevel == level.MENU) {
				//chill
			}
			if (curLevel == level.TERMS) {
				
				curLevel = level.MENU;
				clearActive();
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
			}else{
				window.history.back();
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};