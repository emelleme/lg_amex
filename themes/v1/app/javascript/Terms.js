Main.termsLoad = function(){
	Main.MENU_POS = 0;
	Main.CUR_ROW = 4;
	Main.CUR_COL = 1;
	Main.PREV_ROW = Main.CUR_ROW;
	Main.PREV_COL = Main.PREV_COL;
	Main.NEWS_POS = 1;
	Main.clearActive();
	Main.curLevel = Main.level.TERMS;
	document.getElementById('anchor').onkeydown = Main.termsKeys; 
	$('#cardsView').hide();
	$('#travelView').hide();
	$('#videosView').hide();
	$('#recipesView').hide();
	$('#termsView').show();
	$('.backbtn').addClass('hover');
	
}

Main.termsKeys = function(event) {
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);
	switch (keyCode) {
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//Return to Travel Page//
			event.preventDefault();
			if(Main.prevLevel == 'cards'){
				Main.cardsLoad();
			}else if(Main.prevLevel == 'recipes'){
				Main.recipesLoad();
			}else if(Main.prevLevel == 'travel'){
				Main.travelLoad();
			}
			alert("RETURN");
			//widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS > 0){
					//Move left
					$('#termsNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS-1;
					Main.clearActive();
					$('#termsNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					
				}
			}

			if (Main.curLevel == Main.level.TERMS) {
				// Do nada
			}
			break;
		case tvKey.KEY_RIGHT:
		
			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS < 2){
					//Move Right
					$('#termsNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS+1;
					Main.clearActive();
					$('#termsNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
				}
			}
			if (Main.curLevel == Main.level.TERMS) {
				$('#termsconditions').addClass('hover');
				CUR_POS = 2;
			}
			break;
		case tvKey.KEY_DOWN:
			if (Main.curLevel == Main.level.MENU) {
				//chill
			}else if (Main.curLevel == Main.level.TERMS) {
				Main.curLevel = Main.level.MENU;
				Main.clearActive();
				$('#termsNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
			}
			break;
		case tvKey.KEY_UP:
			if (Main.curLevel == Main.level.MENU) {
				//return to matrix
				$('#termsNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
				Main.curLevel = Main.level.TERMS;
				Main.clearActive();
				$('.backbtn').addClass('hover');
				CUR_POS = 2;
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//added as ux change
			if (Main.curLevel == Main.level.MENU) {
				var g = $('#termsNav .container ul li:eq('+Main.MENU_POS+') a').attr('data-page');
				if(g == 'travel'){
		  			Main.travelLoad();
				}else if(g == 'videos'){
					Main.videosLoad();
				}else if(g == 'recipes'){
					Main.recipesLoad();
				}
			}else{
				if(Main.prevLevel == 'cards'){
					Main.cardsLoad();
				}else if(Main.prevLevel == 'recipes'){
					Main.recipesLoad();
				}else if(Main.prevLevel == 'travel'){
					Main.travelLoad();
				}
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
}
