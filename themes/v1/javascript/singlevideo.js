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
		analytics.track($('title').html(), {
		    'End of Video' : $('#fullPlayer').attr('data-title')
		});
		stopCurrentVideo();
	}
}

function playCurrentVideo(){
	curLevel = level.VIDEO;
	
	document._video.play();
	playTimeInterval = setInterval(function(){
		var p = document._video.mediaPlayInfo();
		var c = String(Math.floor(p.currentPosition/1000));
		var d = String(Math.ceil(p.duration/1000));
		$("#videoPlayState").html(c.toMMSS()+" / "+d.toMMSS());
	},400);
}

function stopCurrentVideo(){
	document._video.stop();
	window.history.back();
}

$(document).ready(function() {
if(document.getElementById("fullPlayer")){
	document._video = document.getElementById("fullPlayer");
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
			analytics.track($('title').html(), {
				    'Select Button' : 'No Action'
				});
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
				analytics.track($('title').html(), {
				    'Stop Video' : $('#fullPlayer').attr('data-title')
				});
				stopCurrentVideo();
				break;
			}
			break;
		}
		case VK_PLAY:
		{
			if(document._video.playState == 2){
				analytics.track($('title').html(), {
				    'Resume Video' : $('#fullPlayer').attr('data-title')
				});
				document._video.play(1);
			}else if(document._video.playState == 1){
				analytics.track($('title').html(), {
				    'Play Video' : $('#fullPlayer').attr('data-title')
				});
				document._video.play(1);
			}
			break;
		}
		case VK_PAUSE:
		{
			if(curLevel == level.VIDEO){
				analytics.track($('title').html(), {
				    'Pause Video' : $('#fullPlayer').attr('data-title')
				});
				document._video.pause();
			}
			break;
		}
		case VK_FAST_FWD:
		{
			if(curLevel == level.VIDEO){
				var duration = document._video.duration;
				seekFivePercent = Math.floor(duration/15);
				var ffd = document._video.playPosition + seekFivePercent*1000;
				
				//document._video.play(0);
				analytics.track($('title').html(), {
				    'Fast Forward Video' : $('#fullPlayer').attr('data-title')
				});
				document._video.seek(ffd);
			}
			break;
		}
		case VK_REWIND:
		{
			if(curLevel == level.VIDEO){
				var duration = document._video.duration;
				seekFivePercent = Math.floor(duration/15);
				var rewind = document._video.playPosition - seekFivePercent*1000;
				analytics.track($('title').html(), {
				    'Rewind Video' : $('#fullPlayer').attr('data-title')
				});
				//document._video.play(0);
				
				document._video.seek(rewind);
				/*document._video.play(1);
				document._video.play(-10.0);*/
			}
			break;
		}
	}
}