Main.travelLoad = function(){
	Main.MENU_POS = 0;
	Main.curLevel = Main.level.MOSAIC;
	Main.CUR_ROW = 2;
	Main.CUR_COL = 1;
	Main.PREV_ROW = Main.CUR_ROW;
	Main.PREV_COL = Main.PREV_COL;
	Main.CUR_POS = 1;
	Main.MAX_ROW = 4;
	Main.prevPage = ['tipstrends'];
	Main.pageDepth = 0;
	Main.clearActive();
	document.getElementById('anchor').onkeydown = Main.travelKeys; 
	$('#main-copy').hide().html($('#benefit_'+Main.CUR_ROW+'-'+Main.CUR_COL).html()).show();//Wing Color
	$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
	$('#cardsView').hide();
	$('#recipesView').hide();
	$('#videosView').hide();
	$('#termsView').hide();
	$('#travelView').show();
}

Main.handleMosaicPlayKey = function()
{
    switch ( Player.getState() )
    {
        case Player.STOPPED:
			//alert(Main.CDN+$('#video-panel'+Main.VIDEO_POS).attr('data-video'));
			$('.currentVideoTitle').html("On The Runway.");
            Player.playVideo();
			Main.curLevel = Main.level.NOSTATE;
			alert(Main.curLevel);
			$('#livevideoMenu').css('height','60px');
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

Main.travelKeys = function(event){
var keyCode = event.keyCode;
	alert("Key pressed: " + Main.curLevel);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            alert(Main.prevPage);
            widgetAPI.blockNavigation(event);
            if(Main.curLevel != Main.level.VIDEO && Main.curLevel != Main.level.NOSTATE){
		        
		        	widgetAPI.sendReturnEvent();
            }else{
		    	if(Player.CONTROLSACTIVE){
		        	$('#pluginPlayer').css('z-index','0');
			        Player.stopVideo();
			        // Main.curLevel = Main.prevLevel;
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
		            Main.curLevel = Main.level.prevLevel;
		        }
            }
            //widgetAPI.sendReturnEvent(); 
            break; 
		case tvKey.KEY_LEFT:
			alert("LEFT");
			leftCount++;

			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS != 0){
					//Move left
					$('.navbar .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS-1;
					Main.clearActive();
					$('.navbar .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
				}
			}else if (Main.curLevel == Main.level.MOSAIC) {
				$('.mosaicImage').removeClass('mosaicImagehover');
				if(Main.CUR_ROW >= 6){
					//At terms
					if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL] == '6-3'){
						Main.CUR_COL = Main.CUR_COL - 1;
						Main.clearActive();
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
					}
				}else if (Main.CUR_COL == 1) {
					//First Column: do nothing
				}else if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL-1] == Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
					//Same as current. Move 2.
					Main.clearActive();
					Main.CUR_COL = Main.CUR_COL - 2;
					$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
					$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
					var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
					Main.CUR_ROW = Number(spl[0]);
					Main.CUR_COL = Number(spl[1]);
				}else{
					//Move to next Postion
					Main.clearActive();
					if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL-1] != null){
						Main.CUR_COL = Main.CUR_COL - 1;
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
						var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
						Main.CUR_ROW = Number(spl[0]);
						Main.CUR_COL = Number(spl[1]);
						curIndex--;
					}
				}
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			if(leftCount == 2){
				rightCount++
			}else{
				leftCount =0;
				rightCount = 0;
			}
			if (Main.curLevel == Main.level.VIDEO) {
				$('.backbtn').addClass('hover');
			}else if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS < 2){
					//Move Right
					$('.navbar .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS+1;
					Main.clearActive();
					$('.navbar .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					
				}
			}else if (Main.curLevel == Main.level.MOSAIC) {
				$('.mosaicImage').removeClass('mosaicImagehover');
				if ( Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL] == '2-1') {
					//Move to next Postion
					Main.clearActive();
					Main.CUR_COL = Main.CUR_COL + 1;
					//Set First item in footer Active
					$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
					$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
					var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
					Main.CUR_ROW = Number(spl[0]);
					Main.CUR_COL = Number(spl[1]);
					curIndex++;
				}else if (Main.CUR_COL >= 4) {
					//Do nothing
				}else if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL+1] == Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
					//Same as current. move two positions down
					
					if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL+2] != null){
						Main.clearActive();
						Main.CUR_COL = Main.CUR_COL + 2;
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
						var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
						Main.CUR_ROW = Number(spl[0]);
						Main.CUR_COL = Number(spl[1]);
					}
					
					
				}else{
					if(Main.CUR_COL+1 > Main.MAX_COL){
						// Reached the end of the row, move to next Row
						if(Main.CUR_ROW+1 > Main.MAX_ROW){
							//End of the line.
							
							
						}else{
							//Move to first position of next row
							curIndex++;
							Main.clearActive();
							Main.CUR_ROW = Main.CUR_ROW;
							Main.CUR_COL = 1;
							//Set First item in footer Active
							$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
							var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
							Main.CUR_ROW = Number(spl[0]);
							Main.CUR_COL = Number(spl[1]);
						}
					}else{
						//Move position to right
						if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL+1] == null){
							//No Image in this position. Do Nothing
							if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL+2] != null){
								//Move over two positions if its not null
								Main.clearActive();
								Main.CUR_COL = Main.CUR_COL + 2;
								$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
								$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
								var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
								Main.CUR_ROW = Number(spl[0]);
								Main.CUR_COL = Number(spl[1]);
							}
						}else if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL+1] == Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
							//Same as current. Move over 2
							Main.clearActive();
							Main.CUR_COL = Main.CUR_COL + 2;
							$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
							$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
							var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
							Main.CUR_ROW = Number(spl[0]);
							Main.CUR_COL = Number(spl[1]);
							console.log(Main.CUR_COL);
						}else{
							//Move into position
							Main.clearActive();
							Main.CUR_COL = Main.CUR_COL+1;
							$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
							$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
							var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
							Main.CUR_ROW = Number(spl[0]);
							Main.CUR_COL = Number(spl[1]);
							
						}
					}

				} 
				
			}
			break;
		case tvKey.KEY_UP:
			alert("UP");
			if(rightCount == 2){
				upCount++;
			}else{
				leftCount = 0;
				rightCount = 0;
			}
			if (Main.curLevel == Main.level.MENU) {
				//return to matrix
				$('.navbar .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
				Main.curLevel = Main.level.MOSAIC;
				Main.clearActive();
				$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
			}else if(Main.curLevel == Main.level.TERMS){
				//return to matrix
				$('.navbar .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
				Main.curLevel = Main.level.MOSAIC;
				Main.clearActive();
				$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
			}else if(Main.curLevel == Main.level.VIDEO || Main.curLevel == Main.level.NOSTATE){
				//Do nothing
				alert('Video playing');
			}else {
				$('.mosaicImage').removeClass('mosaicImagehover');
				if(Main.CUR_ROW == 1){
					//At the top. Do nothing
				}else{
					if(Main.IMAGE_MATRIX[Main.CUR_ROW-1][Main.CUR_COL] == null){
						//null space. do nothing
					}else if(Main.IMAGE_MATRIX[Main.CUR_ROW-1][Main.CUR_COL] == Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
						//same as current. move two positions
						if(Main.CUR_ROW > 2){
							if(Main.IMAGE_MATRIX[Main.CUR_ROW-2][Main.CUR_COL] != Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
								Main.clearActive();
								Main.CUR_ROW = Main.CUR_ROW - 2;
								$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
								$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
								var spl = IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
								if(Main.IMAGE_MATRIX[Main.CUR_ROW-2][Main.CUR_COL] == '6-3'){
									Main.PREV_COL = Main.CUR_COL;
									Main.PREV_ROW = Main.CUR_ROW;
									
								}else{
									Main.CUR_ROW = Number(spl[0]);
									Main.CUR_COL = Number(spl[1]);
									Main.PREV_COL = Main.CUR_COL;
									Main.PREV_ROW = Main.CUR_ROW;
								}
								//console.log(IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL])
							}
						}else{
							//Move to 1-2
							Main.clearActive();
							Main.CUR_ROW = 1;
							Main.CUR_COL = 2;
							$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
							$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
						}
					}else{
						Main.clearActive();
						Main.CUR_ROW = Main.CUR_ROW - 1;
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
						var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
						Main.CUR_ROW = Number(spl[0]);
						Main.CUR_COL = Number(spl[1]);
						if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL] == '6-3'){
							Main.PREV_COL = Main.CUR_COL;
							Main.PREV_ROW = Main.CUR_ROW;
						}else{
							Main.PREV_COL = Main.CUR_COL;
							Main.PREV_ROW = Main.CUR_ROW;
						}
					}
				}
			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			if (Main.curLevel == Main.level.TERMS) {
				//move to menu
				Main.clearActive();
				Main.curLevel = Main.level.MENU;
				$('#travelNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
			}else if (Main.curLevel == Main.level.MOSAIC) {
				$('.mosaicImage').removeClass('mosaicImagehover');
				alert(Main.CUR_ROW);
				if (Main.CUR_ROW >= Main.MAX_ROW){
					Main.clearActive();
					Main.curLevel = Main.level.TERMS
					$('.termsbtn').addClass('hover');
				}else if(Main.curLevel == Main.level.VIDEO || Main.curLevel == Main.level.NOSTATE){
					alery('Video Playing');
				}else{
					//Move to next Postion
					if(Main.IMAGE_MATRIX[Main.CUR_ROW+1][Main.CUR_COL] == null){
						//
					}else if(Main.IMAGE_MATRIX[Main.CUR_ROW+1][Main.CUR_COL] == Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
						//Same as current. move two positions down
						Main.clearActive();
						Main.CUR_ROW = Main.CUR_ROW + 2;
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
						var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
						Main.CUR_ROW = Number(spl[0]);
						Main.CUR_COL = Number(spl[1]);
						
					}else{
						Main.clearActive();
						Main.CUR_ROW = Main.CUR_ROW + 1;
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
						var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
						Main.CUR_ROW = Number(spl[0]);
						Main.CUR_COL = Number(spl[1]);
						curIndex--;
					}
				}
			}
			break;
		case tvKey.KEY_PLAY:
            alert("PLAY");
			$('#pluginPlayer').css('z-index','13000');
			Main.prevLevel = Main.curLevel;
			Player.setVideoURL(Main.INTROVIDEO);
            Main.handleMosaicPlayKey();
            break;
            
        case tvKey.KEY_STOP:
            alert("STOP");
            if(Main.curLevel == Main.level.VIDEO || Main.curLevel == Main.level.BUFFERING){
			$('#pluginPlayer').css('z-index','0');
			$('#livevideoMenu').css('height','0px');
            Player.stopVideo();
            Main.curLevel = Main.prevLevel;
            }else{
            	alert('Nothing to Stop');
            }
            break;
            
        case tvKey.KEY_PAUSE:
            alert(Player.CONTROLSACTIVE);
            if(Player.CONTROLSACTIVE){
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
            if(Player.CONTROLSACTIVE){
		        if(Player.getState() != Player.PAUSED){
		            Player.skipForwardVideo();
		        }
            }else{
            	alert('Nothing to FF');
            }
            break;
        
        case tvKey.KEY_RW:
            alert("RW");
			if(Player.CONTROLSACTIVE){
				if(Player.getState() != Player.PAUSED){
					Player.skipBackwardVideo();
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
		case tvKey.KEY_MUTE:
            alert("MUTE");
            Main.muteMode();
            break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			//added as ux change
			if(Main.curLevel == Main.level.MOSAIC){
				if (Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL] == "6-3") {
					Main.termsLoad();
				}else if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL] == "2-1"){
					//Play Intro Video
					$('#pluginPlayer').css('z-index','13000');
					Main.prevLevel = Main.curLevel;
					Player.setVideoURL(Main.INTROVIDEO);
		            Main.handleMosaicPlayKey();
				}else if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL] == "4-4"){
					//Play Intro Video
					$('#pluginPlayer').css('z-index','13000');
					Main.prevLevel = Main.curLevel;
					Player.setVideoURL(Main.HARPERSVIDEO);
		            Main.handleMosaicPlayKey();
				}		
			}else if (Main.curLevel == Main.level.MENU) {
				var g = $('#travelNav .container ul li:eq('+Main.MENU_POS+') a').attr('data-page');
				Main.prevPage.unshift('tipstrends');
				if(g == 'designerspotlight'){
		  			Main.recipesLoad();
				}else if(g == 'videos'){
					alert('VIDEOS!');
					Main.videosLoad();
				}else if(g == 'shopsmall'){
					Main.cardsLoad();
				}
			}else if(Main.curLevel == Main.level.TERMS){
				alert('TERMS!');
				Main.prevPage.unshift('tipstrends');
				Main.termsLoad();
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
