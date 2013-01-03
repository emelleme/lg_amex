Main.videosLoad = function(){
	Main.MENU_POS = 0;
	Main.CUR_ROW = 4;
	Main.CUR_POS = 1;
	Main.PREV_ROW = Main.CUR_ROW;
	Main.PREV_COL = Main.PREV_COL;
	Main.NEWS_POS = 1;
	Main.selectedVideo = 0;
	Main.updateCurrentVideo(Main.NEWS_POS);
	Main.clearActive();

	Main.curLevel = Main.level.NEWS;
	Main.prevLevel = Main.curLevel;
	document.getElementById('anchor').onkeydown = Main.videosKeys; 
	

	$('#cardsView').hide();
	$('#travelView').hide();
	$('#videosView').show();
	$('#recipesView').hide();
	$('#termsView').hide();

	$('#videos_arrowleft').hide();
	$('#videoMenu').css('height','0px');
	$('#videos_arrowright').show();
	$('#panel4,#panel2, #panel3,#panel5, #panel1_content').show();
	$('#panel1,#panel2_content, #panel4_content, #panel3_content, #panel5_content').hide();
	$('#currentVideoTitle').html($('#panel'+Main.NEWS_POS).attr('data-title'));
};

Main.videosKeys = function()
{
	var keyCode = event.keyCode;
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            alert("RETURN");
            event.preventDefault();
            if(Main.curLevel != Main.level.VIDEO && Main.curLevel != Main.level.NOSTATE){
            	Main.travelLoad();
            }else{
            	$('#pluginPlayer').css('z-index','0');
	            Player.stopVideo();
	            Main.curLevel = Main.prevLevel;
            }
            //widgetAPI.sendReturnEvent(); 
            break;  
		case tvKey.KEY_PLAY:
            alert("PLAY");
			$('#pluginPlayer').css('z-index','13000');
			Main.prevLevel = Main.curLevel;
            Main.handlePlayKey();

            break;
            
        case tvKey.KEY_STOP:
            alert("STOP");
            if(Main.curLevel == Main.level.VIDEO){
			$('#pluginPlayer').css('z-index','0');
            Player.stopVideo();
            Main.curLevel = Main.level.NEWS;
            }else{
            	alert('Nothing to Stop');
            }
            break;
            
        case tvKey.KEY_PAUSE:
            alert("PAUSE");
            if(Main.curLevel == Main.level.VIDEO){
		        Main.handlePauseKey();
		        $('#videoMenu').css('height','60px');
				setTimeout(function(){
					$('#videoMenu').css('height','0px');
				}, 15000);
			}else{
            	alert('Nothing to Pause');
            }
            break;
            
        case tvKey.KEY_FF:
            alert("FF");
            if(Player.getState() != Player.PAUSED){
                Player.skipForwardVideo();
            }
            break;
        
        case tvKey.KEY_RW:
            alert("RW");
           if(Player.getState() != Player.PAUSED){
            	Player.skipBackwardVideo();
        	}
            break;
        case tvKey.KEY_VOL_UP:
        case tvKey.KEY_PANEL_VOL_UP:
            alert("VOL_UP");
                if(Main.mute == 0){
                    Audio.setRelativeVolume(0);
                }
            break;
            
        case tvKey.KEY_VOL_DOWN:
        case tvKey.KEY_PANEL_VOL_DOWN:
            alert("VOL_DOWN");
                if(Main.mute == 0){
                    Audio.setRelativeVolume(1);
                }
            break;      

		case tvKey.KEY_LEFT:
			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS > 0){
					//Move left
					$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS-1;
					Main.clearActive();
					$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					//}
				}
			}
			if (Main.curLevel == Main.level.NEWS) {
				$('#videos_arrowleft').addClass('activeImage');
				$('#videos_arrowright').removeClass('activeImage');
				setTimeout(function(){$('#videos_arrowleft').removeClass('activeImage');},200);
				Main.slideVideosLeft('left');
				Main.selectPreviousVideo('up');
			}else if(Main.curLevel == Main.level.VIDEO){
				$('#videoMenu').css('height','60px');
			setTimeout(function(){
				$('#videoMenu').css('height','0px');
			}, 15000);
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT!");
			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS < 2){
					//Move Right
					$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS+1;
					Main.clearActive();
					$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					//}
				}
			}else if (Main.curLevel == Main.level.NEWS) {
				$('#videos_arrowright').addClass('activeImage');
				$('#videos_arrowleft').removeClass('activeImage');
				setTimeout(function(){$('#videos_arrowright').removeClass('activeImage');},200);
				Main.slideVideosRight('right');
				Main.selectNextVideo('down');
			}else if(Main.curLevel == Main.level.VIDEO){
				$('#videoMenu').css('height','60px');
			setTimeout(function(){
				$('#videoMenu').css('height','0px');
			}, 15000);
			}
			break;
		case tvKey.KEY_UP:
			alert("UP");
			if (Main.curLevel == Main.level.MENU) {
				//return to matrix
				Main.clearActive();
				if(Main.NEWS_POS > 4){
					$('#videos_arrowleft').show();
				}else if(Main.NEWS_POS == 1){
					$('#videos_arrowright').show();
				}else{
					$('#videos_arrowright').show();
					$('#videos_arrowleft').show();
				}
				$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
				Main.curLevel = Main.level.NEWS;
				
				
			}else if(Main.curLevel == Main.level.VIDEO){
				$('#videoMenu').css('height','60px');
			setTimeout(function(){
				$('#videoMenu').css('height','0px');
			}, 15000);
			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN!");
			if (Main.curLevel == Main.level.NEWS) {
				//On Terms, go to Menu
				$('#inactive').show();
				Main.curLevel = Main.level.MENU;
				$('#videosNav').show();
				$('.arrows').hide();
				$('.arrows').removeClass('activeImage');
				$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
			}else if(Main.curLevel == Main.level.VIDEO){
				$('#videoMenu').css('height','60px');
			setTimeout(function(){
				$('#videoMenu').css('height','0px');
			}, 15000);
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			//added as ux change
			if (Main.curLevel == Main.level.MENU) {
				var g = $('#videosNav .container ul li:eq('+Main.MENU_POS+') a').attr('data-page');
				if(g == 'travel'){
		  			Main.travelLoad();
				}else if(g == 'cards'){
					Main.cardsLoad();
				}else if(g == 'recipes'){
					Main.recipesLoad();
				}
			}else if(Main.curLevel == Main.level.VIDEO){
				$('#videoMenu').css('height','60px');
				setTimeout(function(){
					$('#videoMenu').css('height','0px');
				}, 15000);
			}else{
				$('#pluginPlayer').css('z-index','13000');
				Main.prevLevel = Main.curLevel;
				Main.handlePlayKey();
				break;
			}
			break;
		 case tvKey.KEY_MUTE:
            alert("MUTE");
            Main.muteMode();
            break;
		default:
			alert("Unhandled key");
			break;
	}
};

Main.updateCurrentVideo = function(move)
{
    Player.setVideoURL( Data.getVideoURL(Main.selectedVideo) );
};

Main.OnBufferingProgress = function(percent) {
    //Draing buffering progress bar
    $('#videoPlayState').html('Buffering '+percent+"%");
}

Main.handlePlayKey = function()
{
    switch ( Player.getState() )
    {
        case Player.STOPPED:
			Main.updateCurrentVideo(Main.NEWS_POS-1);
            Player.playVideo();
			Main.curLevel = Main.level.NOSTATE;
			alert(Main.curLevel);
			$('#mainMenu').hide();
			$('#videoMenu').css('height','60px');
			setTimeout(function(){
				$('#videoMenu').css('height','0px');
			}, 15000);
			Main.setFullScreenMode();
            break;
            
        case Player.PAUSED:
            Player.resumeVideo();
            break;
            
        default:
            alert("Ignoring play key, not in correct state");
            break;
    }
}

Main.handlePauseKey = function()
{
    switch ( Player.getState() )
    {
        case Player.PLAYING:
            Player.pauseVideo();
            break;
        
        default:
            alert("Ignoring pause key, not in correct state");
            break;
    }
}

Main.selectNextVideo = function(down)
{
    Player.stopVideo();
    
    Main.selectedVideo = (Main.selectedVideo + 1) % Data.getVideoCount();

    Main.updateCurrentVideo(down);
}

Main.selectPreviousVideo = function(up)
{
    Player.stopVideo();
    
    if (--Main.selectedVideo < 0)
    {
        Main.selectedVideo += Data.getVideoCount();
    }

    Main.updateCurrentVideo(up);
}

Main.setFullScreenMode = function()
{
    if (Main.mode != Main.FULLSCREEN)
    {
        
        Player.setFullscreen();
        
        Main.mode = Main.FULLSCREEN;
    }
}

Main.setWindowMode = function()
{
    if (Main.mode != Main.WINDOW)
    {
        Player.setWindow();
        
        Main.mode = Main.WINDOW;
    }
}

Main.toggleMode = function()
{
    switch (Main.mode)
    {
        case Main.WINDOW:
            Main.setFullScreenMode();
            break;
            
        case Main.FULLSCREEN:
            Main.setWindowMode();
            break;
            
        default:
            alert("ERROR: unexpected mode in toggleMode");
            break;
    }
}


Main.setMuteMode = function()
{
    if (Main.mute != Main.YMUTE)
    {
        //var volumeElement = document.getElementById("volumeInfo");
        Audio.plugin.SetUserMute(true);
        $('#videoPlayStatus').html('MUTED');
        Main.mute = Main.YMUTE;
    }
}

Main.noMuteMode = function()
{
    if (Main.mute != Main.NMUTE)
    {
        Audio.plugin.SetUserMute(false); 
        Display.setVolume( Audio.getVolume() );
        Main.mute = Main.NMUTE;
    }
}

Main.muteMode = function()
{
    switch (Main.mute)
    {
        case Main.NMUTE:
            Main.setMuteMode();
            break;
            
        case Main.YMUTE:
            Main.noMuteMode();
            break;
            
        default:
            alert("ERROR: unexpected mode in muteMode");
            break;
    }
}

Main.slideVideosLeft = function (keyCode){
	if(Main.NEWS_POS > 0){
		if($('#panel'+Number(Main.NEWS_POS-1)+'_content').html()!=null){
			$('#panel'+Main.NEWS_POS).show();
			$('#panel'+Main.NEWS_POS+'_content').hide();
			Main.NEWS_POS = Main.NEWS_POS-1;
			$('#panel'+Main.NEWS_POS+'_content').show();
			$('#panel'+Main.NEWS_POS).hide();
			if (Main.NEWS_POS > 0) {
				//Show Right Arrow
				$('#videos_arrowright').show();
				console.log(Main.NEWS_POS);
			};
			if($('#panel'+Number(Main.NEWS_POS-1)+'_content').html()==null){
			$('#videos_arrowleft').hide();
			}
			$('#currentVideoTitle').html($('#panel'+Main.NEWS_POS).attr('data-title'));
		}
	//logger.keys.push("news-"+Main.NEWS_POS+":"+keyCode);
	}
}

Main.slideVideosRight = function (keyCode){
	alert('Sliding Right!');
	if($('#panel'+Number(Main.NEWS_POS+1)+'_content').html()!=null){
		$('.panelHeader').show();
		$('#panel'+Main.NEWS_POS).show();
		$('#panel'+Main.NEWS_POS+'_content').hide();
		Main.NEWS_POS = Main.NEWS_POS+1;
		$('#panel'+Main.NEWS_POS+'_content').show();
		$('#panel'+Main.NEWS_POS).hide();
		if (Main.NEWS_POS > 1) {
			//Show Left Arrow
			$('#videos_arrowleft').show();
			console.log(Main.NEWS_POS)
		};
		if($('#panel'+Number(Main.NEWS_POS+1)+'_content').html()==null){
		$('#videos_arrowright').hide();
		}
		$('#currentVideoTitle').html($('#panel'+Main.NEWS_POS).attr('data-title'));
	}
}
