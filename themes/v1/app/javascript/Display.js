/** Display **/
var Display = {};

Display.init = function() {
    return true;
}

Display.setTotalTime = function(total) {
    this.totalTime = total;
}

Display.toMMSS = function(timeToParse){
    sec_numb = parseInt(timeToParse/ 1000);
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

Display.setTime = function(time) {
    var timePercent = (100 * time) / this.totalTime,
        totalTime = Display.toMMSS(this.totalTime);
    if (Player.state == Player.PLAYING) {
        $('h3.videoPlayStatus').html(Display.toMMSS(time)+' / '+totalTime);
    } else {
         $('h3.videoPlayStatus').html('--:--');
    }
}

Display.setVolume = function(level)
{
    document.getElementById("volumeBar").style.width = level + "%";
    var volumeElement = document.getElementById("volumeInfo");
    widgetAPI.putInnerHTML(volumeElement, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Audio.getVolume());
}
