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
curLevel = level.MENU;

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
	$('body').css('padding-top','0px');
	curLevel = level.MENU;
    $('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
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
				curLevel = level.CARD;
				clearActive();
				$('#termsconditions a').addClass('hover');
				CUR_POS = 2;
			}else {
				//
			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			if (curLevel == level.MENU) {
				//chill
			}
			if (curLevel == level.CARD) {
				if(CUR_POS == 2){
					//On Terms, go to Menu
					$('#termsconditions a').removeClass('hover');
					curLevel = level.MENU;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
				}else{
					//Go to Terms
					$('#termsconditions a').addClass('hover');
					CUR_POS = 2;
				}
				
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			//added as ux change
			if (curLevel == level.MENU) {
				var g = $('.navbar .container ul li:eq('+MENU_POS+') a').attr('href');
				window.location =g;
			}else{
				var g = $('#termsconditions a').attr('href');
				window.location =g;
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};