NAV_HOVER = false;
var fCnt = 0;

//Define Levels
curLevel = 1;

$(document).ready(function() {
	/*$('.navbar').hide();
	var media = document.getElementById("introVideo");
	media.play(1.0);
	media.onPlayStateChange = processPlayStateChangeFunction;*/

	
	$('body').css('padding-top','0px');
	$('.backbtn').addClass('hover');
	$('.backbtn').on('click',function(e){
		window.history.back();
		return false;
	});
	$('#closeVideo').on('click',function(e){
		$('#livePlayer').hide();
		curLevel = level.MOSAIC;
		//jwplayer().stop();
		console.log('closed');
	});

	$('#fullscreenButton').on('click',function(e){
		jwplayer().setFullscreen(true);
		console.log('fullscreenButton');
	});
	
});

function keyDown(event) {
	//alert(event.keyCode);
	switch (event.keyCode) {
		case VK_LEFT:
		{
			$('.backbtn').addClass('hover');
			break;
		}
		case VK_RIGHT:
		{
			$('.backbtn').addClass('hover');
			break;
		}
		case VK_DOWN:
		{
			$('.backbtn').addClass('hover');
			break;
		}
		case VK_UP:
		{
			$('.backbtn').addClass('hover');
			break;
		}
		case VK_ENTER:
		{
			//added as ux change
			$('.backbtn').addClass('hover');
			window.history.back();
			break;
		}
		case VK_BACK:
		{
		  window.history.back();
		break;
		}
	}
}
