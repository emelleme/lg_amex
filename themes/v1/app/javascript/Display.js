/** Display **/
var Display = {};

Display.init = function() {
    return true;
}

Display.setTotalTime = function(total) {
    this.totalTime = total;
}

Display.setTime = function(time) {

    var timePercent = (100 * time) / this.totalTime,
        timeElement = document.getElementById("videoPlayStatus"),
        timeHTML = "",
        timeHour = 0,
        timeMinute = 0,
        timeSecond = 0,
        totalTimeHour = 0,
        totalTimeMinute = 0,
        totalTimesecond = 0;
   
    
    if (Player.state == Player.PLAYING) {

        totalTimeHour = Math.floor(this.totalTime / 3600000);
        timeHour = Math.floor(time / 3600000);
        totalTimeMinute = Math.floor((this.totalTime % 3600000) / 60000);
        timeMinute = Math.floor((time % 3600000) / 60000);
        totalTimeSecond = Math.floor((this.totalTime % 60000) / 1000);
        timeSecond = Math.floor((time % 60000) / 1000);
        timeHTML = timeHour + ":";

        if (timeMinute == 0) {
            //timeHTML += "00:";
        } else if (timeMinute < 10) {
             //timeHTML += "0" + timeMinute + ":";
        } else {
             //timeHTML += timeMinute + ":";
        }

        if (timeSecond == 0) {
            timeHTML += "00/";
        } else if (timeSecond < 10) {
             timeHTML += "0" + timeSecond + "/";
        } else {
             timeHTML += timeSecond + "/";
        }
        //timeHTML += totalTimeHour + ":";

        if (totalTimeMinute == 0) {
             timeHTML += "00:";
        } else if (totalTimeMinute < 10)
            timeHTML += "0" + totalTimeMinute + ":";
        else {
             timeHTML += totalTimeMinute;

        }

        if (totalTimeSecond == 0) {
             timeHTML += "00";
        } else if (totalTimeSecond < 10) {
            timeHTML += "0" + totalTimeSecond;
        } else
            timeHTML += totalTimeSecond;

    } else {
         timeHTML = "0:00:00/0:00:00";
    }
    
    $('#videoPlayStatus').html(timeHTML);
    alert(timeHTML);
}
Display.setVolume = function(level)
{
    document.getElementById("volumeBar").style.width = level + "%";
    
    var volumeElement = document.getElementById("volumeInfo");

    widgetAPI.putInnerHTML(volumeElement, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Audio.getVolume());
}