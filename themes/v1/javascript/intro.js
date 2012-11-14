level.INTROVIDEO = 5;
curLevel = level.INTROVIDEO;
nextPage = 'benefits';
$(document).ready(function() {
	$('body').css('padding-top','0px');
	$('#videoPlayer').on('click',function(){
		window.location = nextPage; 
	})
	var media = document.getElementById("introVideo");
	var playInfo = media.mediaPlayInfo();
	media.stop();
	media.onPlayStateChange = processPlayStateChangeFunction;
	curLevel = level.INTROVIDEO;
});

function processPlayStateChangeFunction() {
	var media = document.getElementById("introVideo");
	var playstate = media.playstate;
	//$('.debug').html(media.playstate);
	if(playstate == 5){
		window.location = nextPage;
	}else if(playstate ==1){
		$('.loadingVideo').hide();
	}
}

function keyDown(event) {
	//alert(event.keyCode);
	switch (event.keyCode) {
		case VK_LEFT:
		{
			if (curLevel == level.INTROVIDEO) {
				//var media = document.getElementById("introVideo");
				window.location = nextPage;
			}
			break;
		}
		case VK_RIGHT:
		{
			if (curLevel == level.INTROVIDEO) {
				//var media = document.getElementById("introVideo");
				window.location = nextPage;
			}
			break;
		}
		case VK_DOWN:
		{
			if (curLevel == level.INTROVIDEO) {
				//var media = document.getElementById("introVideo");
				window.location = nextPage;
			}
			break;
		}
		case VK_UP:
		{
			if (curLevel == level.INTROVIDEO) {
				//var media = document.getElementById("introVideo");
				window.location = nextPage;
			}
			break;
		}
		case VK_ENTER:
		{
			if (curLevel == level.INTROVIDEO) {
				//var media = document.getElementById("introVideo");
				window.location = nextPage;
			}
			break;
		}
		case VK_BACK:
		{
		  window.history.back();
		break;
		}
	}
}
