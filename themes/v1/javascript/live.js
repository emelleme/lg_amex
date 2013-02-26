NAV_HOVER = false;
var fCnt = 0;
level=[];
level.VIDEO = 1;
playTimeInterval = 0;
playBarTimeout = 0;
//Define Levels
curLevel = 1;

String.prototype.toMMSS = function(){
	sec_numb = parseInt(this);
	var hours = Math.floor(sec_numb / 3600);
	var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
	var seconds = sec_numb - (hours * 3600) - (minutes * 60);

	if (hours < 10) {hours="0"+hours;};
	if (minutes < 10) {minutes="0"+minutes;};
	if (seconds < 10) {seconds="0"+seconds;};
	if(minutes == '00' && seconds == '00'){
		var t = '--:--';
	}else{
		var t = minutes+":"+seconds;
	}
	return t;
};
function processBuffering(isStarted){
	if (isStarted) {
		$('.debugText').html('Buffering...');
	}else{
		$('.debugText').html('Playing')
		window.NetCastSetPageLoadingIcon('disabled');
	}
}

function processPlayStateChange(){
	//$('#test p').html(document._video.playState);
	if(document._video.playState == 5){
		//Video Stopped. Close frame
		stopCurrentVideo();
	}else if(document._video.playState == 4){
		$('.debugText').html('Buffering...');
		window.NetCastSetPageLoadingIcon('enabled');
	}else if(document._video.playState == 3){
		$('.debugText').html('Loading...');
		window.NetCastSetPageLoadingIcon('enabled');
	}else if(document._video.playState == 1){
		$('.debugText').html('');
		window.NetCastSetPageLoadingIcon('disabled');
	}else if(document._video.playState == 2){
		$('.debugText').html('Paused')
	}
}

function playCurrentVideo(){
	curLevel = level.VIDEO;
	
	document._video.play();
	/*playTimeInterval = setInterval(function(){
		var p = document._video.mediaPlayInfo();
		var c = String(Math.floor(p.currentPosition/1000));
		var d = String(Math.ceil(p.duration/1000));
		$("#videoPlayState").html(c.toMMSS()+" / "+d.toMMSS());
	},400);*/
}

function stopCurrentVideo(){
	document._video.stop();
	window.history.back();
}

$(document).ready(function() {
	window.NetCastSetPageLoadingIcon('enabled');
if(document.getElementById("livePlayer")){
	document._video = document.getElementById("livePlayer");
	document._video.onPlayStateChange = processPlayStateChange;
	document._video.onBuffering = processBuffering;
	$('body').css('padding-top','0px');
	playCurrentVideo();
	console.log('Playing');
}
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
			break;
		}
		case VK_BACK:
		{
		  window.history.back();
		break;
		}
		case VK_STOP:
		{
			if(curLevel == level.VIDEO){
				stopCurrentVideo();
				break;
			}
			break;
		}
		case VK_PLAY:
		{
			if(document._video.playState == 2){
				document._video.play(1);
			}else if(document._video.playState == 1){
				document._video.play(1);
			}
			break;
		}
		case VK_PAUSE:
		{
			if(curLevel == level.VIDEO){
				document._video.pause();
			}
			break;
		}
	}
}