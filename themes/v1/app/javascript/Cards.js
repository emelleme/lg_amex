Main.cardsLoad = function(){
	Main.MENU_POS = 0;
	Main.CUR_ROW = 4;
	Main.CUR_COL = 1;
	Main.PREV_ROW = Main.CUR_ROW;
	Main.PREV_COL = Main.PREV_COL;
	Main.NEWS_POS = 1;
	Main.clearActive();

	Main.curLevel = Main.level.MENU;
	document.getElementById('anchor').onkeydown = Main.cardsKeys; 
	$('#cardsView').show();
	$('#travelView').hide();
	$('#videosView').hide();
	$('#recipesView').hide();
	$('#termsView').hide();

	$('#cardsNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
	CUR_POS = 2;
	
	$('.termsbtn').hover(function(){
		clearActive();
		$('.termsconditions a').addClass('hover');
		curLevel = level.CARD;
	})
	
}

Main.cardsKeys = function(){
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);
switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//Return to Travel Page//
			event.preventDefault();
				var m = Main.prevPage.shift();
				if(m == 'videos'){
					Main.videosLoad();
				}else if(m == 'recipes'){
					Main.recipesLoad();
				}else if(m == 'travel'){
					alert(Main.prevPage[Main.pageDepth]);
					Main.travelLoad();
				}
			alert(Main.prevPage);
			//widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS > 0){
					//Move left
					$('#cardsNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS-1;
					Main.clearActive();
					$('#cardsNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					//}
				}
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS < 2){
					//Move Right
					$('#cardsNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS+1;
					Main.clearActive();
					$('#cardsNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					//}
				}
			}
			break;
		case tvKey.KEY_UP:
			alert("UP");
			if (Main.curLevel == Main.level.MENU) {
				//return to matrix
				$('.navbar .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
				Main.curLevel = Main.level.TERMS;
				Main.clearActive();
				$('.termsconditions a').addClass('hover');
				Main.CUR_POS = 2;
			}else {
				//
			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			if (Main.curLevel == Main.level.MENU) {
				//chill
			}
			if (Main.curLevel == Main.level.TERMS) {
				if(Main.CUR_POS == 2){
					//On Terms, go to Menu
					$('.termsconditions a').removeClass('hover');
					Main.curLevel = Main.level.MENU;
					Main.clearActive();
					$('#cardsNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
				}else{
					//Go to Terms
					$('.termsconditions a').addClass('hover');
					Main.CUR_POS = 2;
				}
				
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			if (Main.curLevel == Main.level.MENU) {
				Main.prevPage.push('cards');
				var g = $('#cardsNav .container ul li:eq('+Main.MENU_POS+') a').attr('data-page');
				if(g == 'travel'){
					Main.prevPage.unshift('cards');
					Main.pageDepth += 1;
		  			Main.travelLoad();
				}else if(g == 'videos'){
					Main.prevPage.unshift('cards');
					Main.pageDepth += 1;
					Main.videosLoad();
				}else if(g == 'recipes'){
					Main.prevPage.unshift('cards');
					Main.pageDepth += 1;
					Main.recipesLoad();
				}
			}else{
				Main.prevPage.unshift('cards');
				Main.termsLoad();
			}
		break;
		default:
			alert("Unhandled key");
			break;
	}
}
