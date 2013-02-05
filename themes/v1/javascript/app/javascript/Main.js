var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var nextPage = 'recipes.html';

//Define Levels
level = {};
level = {};
level.NEWS = 1;

level.MENU = 2;
level.VIDEO = 3;

MENU_POS = 0;
NEWS_POS = 1;
CUR_POS = 1;
//Current Level
curLevel = level.NEWS;

function clearActive(){
    $('.activeImage').removeClass('activeImage');
    $('.hover').removeClass('hover');
}

var Main =
{
	selectedVideo: 0
};

Main.updateCurrentVideo = function (index) {
    Player.setVideoURL('http://9415d76ee7de9f62f3ed-abfa988e4213bbf6e7d06542f0d11811.r69.cf2.rackcdn.com/intro.mp4');
}


Main.onLoad = function()
{
	//$('#pluginPlayer').hide();
	
	if (Player.init() && Server.init()) {
		// Start retrieving data from server
		Main.updateCurrentVideo(0);
		 Player.playVideo(0);
		/* Request video information from server */
		alert("All Data Received");
		// Enable key event processing
		this.enableKeys();
		widgetAPI.sendReadyEvent();
		
	} else {
		alert("Failed to initialise");
	}
	
	//Todo: move to common.js
	$('#news_arrowleft').hide();
	
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
		//logger.keys.push("news-"+NEWS_POS+":click");
	});

	$('#panel1,#panel2_content, #panel4_content, #panel3_content').hide();
	$('#news_arrowleft').on('click', function(){
		slideLeft('click');
	});

	$('#news_arrowright').on('click', function(){
		slideRight('click');
	});
};

Main.onUnload = function()
{
	Player.deinit();
};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
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
	}
	
	//Player.stopVideo();
    Main.selectedVideo = NEWS_POS-1;
    Main.updateCurrentVideo(NEWS_POS-1);
	alert(NEWS_POS-1);
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
		}
	//logger.keys.push("news-"+NEWS_POS+":"+keyCode);
	}
}

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
			alert('LEFT');
			var goto = 'travel.html';
			window.location =goto;
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			var goto = 'travel.html';
			window.location =goto;
			break;
		case tvKey.KEY_UP:
			alert("UP");
			var goto = 'travel.html';
			window.location =goto;
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			var goto = 'travel.html';
			window.location =goto;
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			//added as ux change
			var goto = 'travel.html';
			window.location =goto;
			break;
		case tvKey.KEY_PLAY:
            alert("PLAY");
			var goto = 'travel.html';
			window.location =goto;
            break;
		case tvKey.KEY_STOP:
            alert("STOP");
            Player.stopVideo();
			var goto = 'travel.html';
			window.location =goto;
            break;
		default:
			alert("Unhandled key");
			break;
	}
};