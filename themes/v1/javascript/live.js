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
		$('#videoPlayState').html('Buffering...');
	}else{
		$('#videoPlayState').html('Playing')
	}
}

function processPlayStateChange(){
	//$('#test p').html(document._video.playState);
	if(document._video.playState == 5){
		//Video Stopped. Close frame
		stopCurrentVideo();
	}
}

function playCurrentVideo(){
	curLevel = level.VIDEO;
	window.clearTimeout(playBarTimeout);
	playBarTimeout = setTimeout(function(){
		$('#videoMenu').hide();
	}, 15000);
	
	document._video.play();
	playTimeInterval = setInterval(function(){
		var p = document._video.mediaPlayInfo();
		var c = String(Math.floor(p.currentPosition/1000));
		var d = String(Math.ceil(p.duration/1000));
		$("#videoPlayState").html(c.toMMSS()+" / "+d.toMMSS());
	},400);
}

function stopCurrentVideo(){
	window.clearTimeout(playBarTimeout);
	window.clearInterval(playTimeInterval);
	document._video.stop();
	window.history.back();
}

$(document).ready(function() {
if(document.getElementById("videoPlayer")){
	document._video = document.getElementById("videoPlayer");
	document._video.setAttribute("data", $('#videoPlayer').attr('src'));
	
	document._video.onPlayStateChange = processPlayStateChange;
	document._video.onBuffering = processBuffering;
	$('body').css('padding-top','0px');
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
	playCurrentVideo();
	console.log('Playing');
}
$('.backbtn').addClass('hover');
	$('.backbtn').on('click',function(e){
		window.history.back();
		return false;
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
			}else{
				if(curLevel == level.NEWS){
					playCurrentVideo();
				}
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