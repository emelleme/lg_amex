angular.module('project', ['ngResource']).
config(function($routeProvider) {
$routeProvider.
  when('/', {controller:VideosController, templateUrl:'http://s.amxp.cc/videos/layout.html'}).
  otherwise({redirectTo:'/'});
});
var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var pluginObj = new Common.API.Plugin();
Main = {
	 selectedVideo : 0,
    mode : 0,
    mute : 0,
    
    UP : 0,
    DOWN : 1,

    WINDOW : 0,
    FULLSCREEN : 1,
    
    NMUTE : 0,
    YMUTE : 1
};

//Define Levels
level = {};
level = {};
level.NEWS = 1;

level.MENU = 2;
level.VIDEO = 3;

MENU_POS = 0;
NEWS_POS = 1;
CUR_POS = 1;
enterCount = 0;
//Current Level
var curLevel = level.NEWS;
var prevLevel = curLevel;

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

showHandler = function()
{
	NNaviPlugin = document.getElementById("pluginObjectNNavi");
	alert("[APPS] : setBannerstate : 2")
	NNaviPlugin.SetBannerState(2);
	pluginObj.unregistKey(tvKey.KEY_VOL_UP);
	pluginObj.unregistKey(tvKey.KEY_VOL_DOWN);
	pluginObj.unregistKey(tvKey.KEY_MUTE);
}
Main.onUnload = function()
{
	Player.deinit();
};

Main.onLoad = function()
{	
	
	window.onShow = showHandler;
	
    if ( Player.init() && Audio.init() && Display.init() && Server.init() )
    {

        
        Player.stopCallback = function()
        {
            /* Return to windowed mode when video is stopped
                (by choice or when it reaches the end) */
            Main.setWindowMode();
        }

        // Start retrieving data from server
        Server.dataReceivedCallback = function()
            {
                /* Use video information when it has arrived */
                Main.updateCurrentVideo();
            }
        Server.fetchVideoList(); /* Request video information from server */

        // Enable key event processing
        this.enableKeys();

        widgetAPI.sendReadyEvent();   
        Display.setTime(0); 
    }
    else
    {
        alert("Failed to initialise");
    }
    var WIDGET_ID = curWidget.id;
    alert("#################################################################################");
    alert("############################################################################WIDGET_ID =" + WIDGET_ID);
    alert("#################################################################################");
    alert("#################################################################################");
	$('#news_arrowleft').hide();

	$('#panel1,#panel2_content, #panel4_content, #panel3_content').hide();
	$('#inactive').hide();
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();    
};

Main.updateCurrentVideo = function(move)
{
    Player.setVideoURL( Data.getVideoURL(this.selectedVideo) );
}

function VideosController($scope,$http,$location){
$(document).ready(function(){
	$('#news_arrowleft').hide();
	$('#fullPlayer').hide();
	//$('#videoMenu').css('height','0px');
	$('.panelHeader').on('hover', function(e){
		//console.log($(this).children('h3'));
		$(this).children('h3').children('span').toggleClass('panelHover');
		
	});
	$('.backButton').on('click', function(e){
		$.post('lg/userData',logger,function(logger){
			window.history.back();
			return false;
		});
	});
	
	$('.navbtn').on('click', function(e){
		e.preventDefault();
		var link = $(this);
		$.post('lg/userData',logger,function(logger){
			window.location = link.attr('href');
			return false;
		});
		nowLoading(this);		
	});

	$('#showcase-container').on('click',function(){
		//Clear active
		clearActive();
		//Set level to news
		curLevel = level.NEWS;
	})
	$('.arrows2, #showcase').on('hover',function(){
		//Clear active
		clearActive();
		//Set level to news
		curLevel = level.NEWS;
	})

	$('.panelHeader').on('click', function(e){
		var a = $(this).attr('id');
		$('.panelHeader').show();
		$('.showcaseimage').hide();
		NEWS_POS = Number(a.charAt(a.length-1));
		if(NEWS_POS == 1){
			//Hide left arrow
			$('#news_arrowleft').hide();
			$('#news_arrowright').show();
		}else if (NEWS_POS < 5) {
			//show both arrows
			$('#news_arrowleft').show();
			$('#news_arrowright').show();
		}else{
			//hide right arrow
			$('#news_arrowright').hide();
			$('#news_arrowleft').show();
		}
		$('#panel'+NEWS_POS).hide();
		$('#panel'+NEWS_POS+'_content').show();
		console.log(NEWS_POS);
		logger.keys.push("news-"+NEWS_POS+":click");
	});

	$('#panel1,#panel2_content, #panel4_content, #panel3_content').hide();
	$('#news_arrowleft').on('click', function(){
		slideLeft('click');
	});

	$('#news_arrowright').on('click', function(){
		slideRight('click');
	});
});
}


Main.keyDown = function()
{
	var keyCode = event.keyCode;

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            alert("RETURN");
            if(curLevel == level.VIDEO){
            	//Stop and Close Video
            	$('#pluginPlayer').css('z-index','0');
	            Player.stopVideo();
	             $('#mainMenu').show();
			$('#videoMenu').css('height','0px');
            curLevel = prevLevel;
            }else{
            	window.history.back();
            }
            widgetAPI.sendReturnEvent(); 
            break;
		case tvKey.KEY_PLAY:
            alert("PLAYIT");
			$('#pluginPlayer').css('z-index','1030');
			
            this.handlePlayKey();
            break;
            
        case tvKey.KEY_STOP:
            alert("STOP");
			$('#pluginPlayer').css('z-index','0');
            Player.stopVideo();
            $('#mainMenu').show();
			$('#videoMenu').css('height','0px');
            curLevel = prevLevel;
            break;
            
        case tvKey.KEY_PAUSE:
            alert("PAUSE");
            this.handlePauseKey();
            break;
            
        case tvKey.KEY_FF:
            alert("FF");
          //  if(Player.getState() != Player.PAUSED)
           //     Player.skipForwardVideo();
            break;
        
        case tvKey.KEY_RW:
            alert("RW");
           // if(Player.getState() != Player.PAUSED)
            //    Player.skipBackwardVideo();
            break;

        // case tvKey.KEY_VOL_UP:
        // case tvKey.KEY_PANEL_VOL_UP:
        //     alert("VOL_UP");
        //     if ((Audio.GetOutputDevice() != "PL_AUDIO_OUTPUT_DEVICE_EXTERNAL") || (Audio.GetOutputDevice() != "PL_AUDIO_OUTPUT_DEVICE_RECEIVER"))
        //     {
        //         if(this.mute == 0)
        //             Audio.setRelativeVolume(0);
        //     }
        //     else
        //      {
        //         alert("External Speaker Set... No effect!!");
        //      }
        //     break;
            
        // case tvKey.KEY_VOL_DOWN:
        // case tvKey.KEY_PANEL_VOL_DOWN:
        //     alert("VOL_DOWN");
        //     if ((Audio.GetOutputDevice() != "PL_AUDIO_OUTPUT_DEVICE_EXTERNAL") || (Audio.GetOutputDevice() != "PL_AUDIO_OUTPUT_DEVICE_RECEIVER"))
        //     {
        //         if(this.mute == 0)
        //             Audio.setRelativeVolume(1);
        //      }
        //      else
        //      {
        //         alert("External Speaker Set... No effect!!");
        //      }
            break;      

		case tvKey.KEY_LEFT:
			if (curLevel == level.MENU) {
				if (MENU_POS > 0){
					//Move left
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS-1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					//}
				}
			}
			if (curLevel == level.NEWS) {
				$('#news_arrowleft').addClass('activeImage');
				$('#news_arrowright').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowleft').removeClass('activeImage');},200);
				slideLeft('left');
				this.selectPreviousVideo(this.UP);
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
					//}
				}
			}else if (curLevel == level.NEWS) {
				$('#news_arrowright').addClass('activeImage');
				$('#news_arrowleft').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowright').removeClass('activeImage');},200);
				slideRight('right');
				this.selectNextVideo(this.DOWN);
			}else{
				curLevel = level.NEWS;
			}
			break;
		case tvKey.KEY_UP:
			alert("UP");
			if (curLevel == level.MENU) {
				//return to matrix
				$('#inactive').hide();
				if(NEWS_POS > 4){
					$('#news_arrowleft').show();
				}else if(NEWS_POS == 1){
					$('#news_arrowright').show();
				}else{
					$('#news_arrowright').show();
					$('#news_arrowleft').show();
				}
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					curLevel = level.NEWS;
					clearActive();
				
			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			if (curLevel == level.MENU) {
				//chill
			}
			if (curLevel == level.NEWS) {
				//On Terms, go to Menu
				$('#inactive').show();
				curLevel = level.MENU;
				$('.navbar').show();
				$('.arrows').hide();
				$('.arrows').removeClass('activeImage');
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
			}else if(curLevel == level.NEWS){
				$('#pluginPlayer').css('z-index','1030');
				this.handlePlayKey();
			}
			break;
		 case tvKey.KEY_MUTE:
            alert("MUTE");
            this.muteMode();
            break;
		default:
			alert("Unhandled key");
			break;
	}
};

function slideRight(keyCode){
	if($('#panel'+Number(NEWS_POS+1)+'_content').html()!=null){
		$('.panelHeader').show();
		$('#panel'+NEWS_POS).show();
		$('#panel'+NEWS_POS+'_content').hide();
		NEWS_POS = NEWS_POS+1;
		$('#panel'+NEWS_POS+'_content').show();
		$('#panel'+NEWS_POS).hide();
		if (NEWS_POS > 1) {
			//Show Left Arrow
			$('#news_arrowleft').show();
			console.log(NEWS_POS)
		};
		if($('#panel'+Number(NEWS_POS+1)+'_content').html()==null){
		$('#news_arrowright').hide();
		}
		$('#currentVideoTitle').html($('#panel'+NEWS_POS).attr('data-title'));
	}
	
	//Player.stopVideo();
    //Main.selectedVideo = NEWS_POS-1;
    //Main.updateCurrentVideo(NEWS_POS-1);
	//alert(NEWS_POS-1);
	//logger.keys.push("news-"+NEWS_POS+":"+keyCode);
}

function slideLeft(keyCode){
	if(NEWS_POS > 0){
		if($('#panel'+Number(NEWS_POS-1)+'_content').html()!=null){
			$('#panel'+NEWS_POS).show();
			$('#panel'+NEWS_POS+'_content').hide();
			NEWS_POS = NEWS_POS-1;
			$('#panel'+NEWS_POS+'_content').show();
			$('#panel'+NEWS_POS).hide();
			if (NEWS_POS > 0) {
				//Show Right Arrow
				$('#news_arrowright').show();
				console.log(NEWS_POS);
			};
			if($('#panel'+Number(NEWS_POS-1)+'_content').html()==null){
			$('#news_arrowleft').hide();
			}
			$('#currentVideoTitle').html($('#panel'+NEWS_POS).attr('data-title'));
		}
	//logger.keys.push("news-"+NEWS_POS+":"+keyCode);
	}
}

Main.handlePlayKey = function()
{
    switch ( Player.getState() )
    {
        case Player.STOPPED:
			Main.updateCurrentVideo(NEWS_POS-1);
            Player.playVideo();
            prevLevel = curLevel;
			curLevel = level.VIDEO;
			$('#mainMenu').hide();
			setTimeout(function(){
				$('#videoMenu').css('height','0px');
			}, 30000);
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
Main.OnBufferingProgress = function(percent) {
    //Draing buffering progress bar
    $('#videoPlayState').html('Buffering '+percent+"%");
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
    
    this.selectedVideo = (this.selectedVideo + 1) % Data.getVideoCount();

    this.updateCurrentVideo(down);
}

Main.selectPreviousVideo = function(up)
{
    Player.stopVideo();
    
    if (--this.selectedVideo < 0)
    {
        this.selectedVideo += Data.getVideoCount();
    }

    this.updateCurrentVideo(up);
}

Main.setFullScreenMode = function()
{
    if (this.mode != this.FULLSCREEN)
    {
        
        Player.setFullscreen();
        
        this.mode = this.FULLSCREEN;
    }
}

Main.setWindowMode = function()
{
    if (this.mode != this.WINDOW)
    {
        Player.setWindow();
        
        this.mode = this.WINDOW;
    }
}

Main.toggleMode = function()
{
    switch (this.mode)
    {
        case this.WINDOW:
            this.setFullScreenMode();
            break;
            
        case this.FULLSCREEN:
            this.setWindowMode();
            break;
            
        default:
            alert("ERROR: unexpected mode in toggleMode");
            break;
    }
}


Main.setMuteMode = function()
{
    if (this.mute != this.YMUTE)
    {
        var volumeElement = document.getElementById("volumeInfo");
        Audio.plugin.SetSystemMute(true);
        widgetAPI.putInnerHTML(volumeElement, "MUTE");
        this.mute = this.YMUTE;
    }
}

Main.noMuteMode = function()
{
    if (this.mute != this.NMUTE)
    {
        Audio.plugin.SetSystemMute(false); 
        Display.setVolume( Audio.getVolume() );
        this.mute = this.NMUTE;
    }
}

Main.muteMode = function()
{
    switch (this.mute)
    {
        case this.NMUTE:
            this.setMuteMode();
            break;
            
        case this.YMUTE:
            this.noMuteMode();
            break;
            
        default:
            alert("ERROR: unexpected mode in muteMode");
            break;
    }
}
function clearActive(){
    $('.activeImage').removeClass('activeImage');
    $('.hover').removeClass('hover');
}
