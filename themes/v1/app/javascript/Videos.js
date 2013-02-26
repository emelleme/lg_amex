Main.videosLoad = function(){
	Main.MENU_POS = 0;
	Main.VIDEO_POS = 1;
	Main.selectedVideo = 0;
	Main.eggCount = 0;
	Player.setVideoURL(Main.CDN+$('#video-panel'+Main.VIDEO_POS).attr('data-video'));
	alert(Main.CDN+$('#video-panel'+Main.VIDEO_POS).attr('data-video'));
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
	$('#video-panel4,#video-panel2, #video-panel3,#video-panel5, #video-panel1_content').show();
	$('#video-panel1,#video-panel2_content, #video-panel4_content, #video-panel3_content, #video-panel5_content').hide();
	$('#videoMenu .currentVideoTitle').html($('#video-panel'+Main.VIDEO_POS).attr('data-title'));
};

Main.videosKeys = function()
{
	var keyCode = event.keyCode;
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            alert(Main.prevPage);
            widgetAPI.blockNavigation(event);
            if(Main.curLevel != Main.level.VIDEO && Main.curLevel != Main.level.NOSTATE){
		        
		        	var m = Main.prevPage.shift();
		        	if(m == 'shopsmall'){
						Main.cardsLoad();
					}else if(m == 'designerspotlight'){
						Main.recipesLoad();
					}else if(m == 'tipstrends'){
						Main.travelLoad();
					}
            }else{
		    	if(Player.CONTROLSACTIVE){
		        	$('#pluginPlayer').css('z-index','0');
			        Player.stopVideo();
			        Main.curLevel = Main.NEWS;
		        }
            }
            //widgetAPI.sendReturnEvent(); 
            break; 
        case tvKey.KEY_EXIT: 
        	widgetAPI.blockNavigation(event);
            if(Main.curLevel != Main.level.VIDEO && Main.curLevel != Main.level.NOSTATE){
		        	widgetAPI.sendExitEvent(); 
            }else{
		    	if(Player.CONTROLSACTIVE){
		        	$('#pluginPlayer').css('z-index','0');
			        Player.stopVideo();
			        widgetAPI.sendExitEvent(); 
		        }else{
		        	$('#pluginPlayer').css('z-index','0');
		            Player.stopVideo();
		            Main.curLevel = Main.level.NEWS;
		        }
            }
            //widgetAPI.sendReturnEvent(); 
            break; 
		case tvKey.KEY_PLAY:
            alert("PLAY");
			$('#pluginPlayer').css('z-index','3000');
			$('#pluginPlayer').css('height','660px');
			Main.prevLevel = Main.curLevel;
            Main.handlePlayKey();
            break;
        case tvKey.KEY_STOP:
            alert("STOP");
            if(Main.curLevel == Main.level.VIDEO || Main.curLevel == Main.level.BUFFERING){
			$('#pluginPlayer').css('z-index','0');
            Player.stopVideo();
            Main.curLevel = Main.level.NEWS;
            }else{
            	alert('Nothing to Stop');
            }
            break;
            
        case tvKey.KEY_PAUSE:
            alert(Player.CONTROLSACTIVE);
            if(Player.CONTROLSACTIVE){
		        Main.handlePauseKey();
		        $('#videoMenu').css('height','60px');
			}else{
            	alert('Nothing to Pause');
            }
            break;
            
        case tvKey.KEY_FF:
            
            if(Player.CONTROLSACTIVE){
		        if(Player.getState() != Player.PAUSED){
		            Player.skipForwardVideo();
		            alert("FF");
		        }
            }else{
            	alert('Nothing to FF');
            }
            break;
        
        case tvKey.KEY_RW:
            
			if(Player.CONTROLSACTIVE){
				if(Player.getState() != Player.PAUSED){
					Player.skipBackwardVideo();
					alert("RW");
				}
			}else{
            	alert('Nothing to REW');
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
		if(Main.curLevel != Main.level.NOSTATE){
			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS > 0){
					//Move left
					$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS-1;
					Main.clearActive();
					$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					//}
				}
				break;
			}
			if (Player.CONTROLSACTIVE != 1) {
				$('#videos_arrowleft').addClass('activeImage');
				$('#videos_arrowright').removeClass('activeImage');
				setTimeout(function(){$('#videos_arrowleft').removeClass('activeImage');},200);
				Main.slideVideosLeft('left');
			}
		}
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT!");
		if(Main.curLevel != Main.level.NOSTATE){
			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS < 2){
					//Move Right
					$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS+1;
					Main.clearActive();
					$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					//}
				}
				break;
			}
			if (Player.CONTROLSACTIVE != 1) {
				$('#videos_arrowright').addClass('activeImage');
				$('#videos_arrowleft').removeClass('activeImage');
				setTimeout(function(){$('#videos_arrowright').removeClass('activeImage');},200);
				Main.slideVideosRight('right');
			}
		}
			break;
		case tvKey.KEY_UP:
			alert("UP");
			
			if(Player.CONTROLSACTIVE){
				$('#videoMenu').css('height','60px');
			}else{
				if (Main.curLevel == Main.level.TERMS || Main.curLevel == Main.level.MENU) {
					//return to matrix
					$('#video-panel'+Main.VIDEO_POS+'_content img').attr('src',$('#video-panel'+Main.VIDEO_POS+'_content').attr('data-image'));
					
					Main.clearActive();
					if(Main.VIDEO_POS > 4){
						$('#videos_arrowleft').show();
					}else if(Main.VIDEO_POS == 1){
						$('#videos_arrowright').show();
					}else{
						$('#videos_arrowright').show();
						$('#videos_arrowleft').show();
					}
					$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.curLevel = Main.level.NEWS;
					
					break;
				}
			}
			break;
		case tvKey.KEY_DOWN:
			
			
			if(Player.CONTROLSACTIVE){
				$('#videoMenu').css('height','60px');
			}else{
				alert("DOWN!");
				if (Main.curLevel == Main.level.NEWS) {
					Main.curLevel = Main.level.TERMS;
					$('#video-panel'+Main.VIDEO_POS+'_content img').attr('src',$('#video-panel'+Main.VIDEO_POS+'_content').attr('data-bwimage'));
					$('.arrows').hide();
					$('.arrows').removeClass('activeImage');
					$('.termsbtnblk').addClass('hover');
				}else{
					//On Terms, go to Menu
					Main.curLevel = Main.level.MENU;
					$('.arrows').hide();
					$('.arrows').removeClass('activeImage');
					$('.termsbtnblk').removeClass('hover');
					$('#videosNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
				}
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			//added as ux change
			if (Main.curLevel == Main.level.MENU) {
				var g = $('#videosNav .container ul li:eq('+Main.MENU_POS+') a').attr('data-page');
				Main.prevPage.unshift('videos');
				if(g == 'tipstrends'){
					Main.prevPage.unshift('videos');
					Main.pageDepth += 1;
		  			Main.travelLoad();
				}else if(g == 'shopsmall'){
					Main.prevPage.unshift('videos');
					Main.pageDepth += 1;
					Main.cardsLoad();
				}else if(g == 'designerspotlight'){
					Main.prevPage.unshift('videos');
					Main.pageDepth += 1;
					Main.recipesLoad();
				}
			}else if(Main.curLevel == Main.level.VIDEO){
				$('#videoMenu').css('height','60px');
			}else if(Main.curLevel == Main.level.TERMS){
				Main.prevPage.unshift('videos');
				Main.termsLoad();
			}
			else{
				$('#pluginPlayer').css('z-index','3000');
				$('#pluginPlayer').css('height','660px');
				Main.curLevel = Main.level.NOSTATE;
				Main.handlePlayKey();
				break;
			}
			break;
		 case tvKey.KEY_MUTE:
            alert("MUTE");
            Main.muteMode();
            break;
         /*case tvKey.KEY_RED: 
         	eggCount = 1;
			break;
		case tvKey.KEY_GREEN:
			if(eggCount == 1){
				eggCount++;
			}else{
				eggCount = 0;
			}
			break;
		case tvKey.KEY_BLUE:
			if(eggCount == 2){
				eggCount++;
			}else{
				eggCount = 0;
			}
			break;*/
		case tvKey.KEY_2:
			Main.eggCount = 1;
			break;
		case tvKey.KEY_5:
			if(Main.eggCount == 1){
				Main.eggCount++;
			}else if(Main.eggCount == 2){
				//do action
				Main.easterEgg();
			}else{
				Main.eggCount = 0;
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};

Main.easterEgg = function(){
	$('.currentVideoTitle').html('Stream Test');
	
	$('#pluginPlayer').css('z-index','13000');
	$('#pluginPlayer').css('height','660px');
	Main.prevLevel = Main.curLevel;
	Main.handleLivePlayKey();
}
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
			Player.setVideoURL(Main.CDN+$('#video-panel'+Main.VIDEO_POS).attr('data-video'));
			$('#videoMenu .currentVideoTitle').html($('#video-panel'+Main.VIDEO_POS).attr('data-title'));
			alert(Main.CDN+$('#video-panel'+Main.VIDEO_POS).attr('data-video'));
            Player.playVideo();
			Main.curLevel = Main.level.NOSTATE;
			alert(Main.curLevel);
			$('#mainMenu').hide();
			$('#videoMenu').css('height','60px');
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

Main.handleLivePlayKey = function()
{
    switch ( Player.getState() )
    {
        case Player.STOPPED:
        	var d = $('#videoMenu').attr('data-livestream');
			Player.setVideoURL( d );
            Player.playVideo();
			Main.curLevel = Main.level.NOSTATE;
			alert(Main.curLevel);
			$('#mainMenu').hide();
			$('#videoMenu').css('height','60px');
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

/*Main.selectNextVideo = function(down)
{
    Player.stopVideo();
    
    Main.selectedVideo = (Main.selectedVideo + 1) % Data.getVideoCount();

    Main.updateCurrentVideo(down);
}

Main.selectPreviousVideo = function(up)
{
    if (--Main.selectedVideo < 0)
    {
        Main.selectedVideo += Data.getVideoCount();
    }

    Main.updateCurrentVideo(up);
}*/

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
	if(Main.VIDEO_POS > 1){
    	Player.setVideoURL(Main.CDN+$('#video-panel'+Main.VIDEO_POS).attr('data-video'));
		$('#video-panel'+Main.VIDEO_POS).show();
		$('#video-panel'+Main.VIDEO_POS+'_content').hide();
		Main.VIDEO_POS = Main.VIDEO_POS-1;
		$('#video-panel'+Main.VIDEO_POS+'_content').show();
		$('#video-panel'+Main.VIDEO_POS).hide();
		$('#videos_arrowright').show();
		if(Main.VIDEO_POS-1 == 0)
			$('#videos_arrowleft').hide();
	}
}

Main.slideVideosRight = function (keyCode){
	if(Main.VIDEO_POS < Main.MAX_VIDEO){
		Player.setVideoURL(Main.CDN+$('#video-panel'+Main.VIDEO_POS).attr('data-video'));
		$('#video-panel'+Main.VIDEO_POS).show();
		$('#video-panel'+Main.VIDEO_POS+'_content').hide();
		Main.VIDEO_POS = Main.VIDEO_POS+1;
		$('#video-panel'+Main.VIDEO_POS+'_content').show();
		$('#video-panel'+Main.VIDEO_POS).hide();
		$('#videos_arrowleft').show();
		if(Main.VIDEO_POS+1 > Main.MAX_VIDEO)
			$('#videos_arrowright').hide();
	}
}
