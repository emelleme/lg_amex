var Player =
{
    plugin : null,
    state : -1,
    skipState : -1,
    stopCallback : null,    /* Callback function to be set by client */
    originalSource : null,
    
    STOPPED : 0,
    PLAYING : 1,
    PAUSED : 2,  
    FORWARD : 3,
    REWIND : 4
}

String.prototype.toMMSS = function(){
    sec_numb = parseInt(this);
    var hours = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (hours < 10) {hours="0"+hours;};
    if (minutes < 10) {minutes="0"+minutes;};
    if (seconds < 10) {seconds="0"+seconds;};
    var t = minutes+":"+seconds;
    return t;
};

Player.init = function()
{
    var success = true;
    
    this.state = this.STOPPED;
    
    this.plugin = document.getElementById("pluginPlayer");
    
    if (!this.plugin)
    {
         success = false;
    }
    else
    {
        
        
        var mwPlugin = document.getElementById("pluginObjectTVMW");
        
        if (!mwPlugin)
        {
            success = false;
        }
        else
        {
            // If you use the srcctl by config.xml, don't need the source change in source code.
            /**
            // Save current TV Source 
            this.originalSource = mwPlugin.GetSource();
            
            // Set TV source to media player plugin 
            mwPlugin.SetMediaSource();
            **/
        }
    }
    
    this.setWindow();
    
    this.plugin.OnCurrentPlayTime = 'Player.setCurTime';
    this.plugin.OnStreamInfoReady = 'Player.setTotalTime';
    this.plugin.OnBufferingStart = 'Player.onBufferingStart';
    this.plugin.OnBufferingProgress = 'Player.onBufferingProgress';
    this.plugin.OnBufferingComplete = 'Player.onBufferingComplete';           
            
    return success;
}

Player.deinit = function()
{
        var mwPlugin = document.getElementById("pluginObjectTVMW");
        
        if (mwPlugin && (this.originalSource != null) )
        {
            // If you use the srcctl by config.xml, don't need the source change in source code.
            /**
            // Restore original TV source before closing the widget 
            mwPlugin.SetSource(this.originalSource);
            alert("Restore source to " + this.originalSource);
            **/
        }
}

Player.setWindow = function()
{
    this.plugin.SetDisplayArea(458, 58, 472, 270);
    if(this.state == this.PAUSED){
            this.state = this.PLAYING;
    }
}

Player.setFullscreen = function()
{
    this.plugin.SetDisplayArea(0, 0, 960, 540);
    if(this.state == this.PAUSED){
            this.state = this.PLAYING;
     }
}

/*Player.setWindow = function()
{
    this.plugin.SetDisplayArea(458, 58, 472, 270);
}

Player.setFullscreen = function()
{
    this.plugin.SetDisplayArea(0, 0, 960, 540);
}*/

Player.setVideoURL = function(url)
{
    this.url = url;
    alert("URL = " + this.url);
}

Player.playVideo = function()
{
    if (this.url == null)
    {
        alert("No videos to play");
    }
    else
    {
        this.state = this.PLAYING;
        this.setFullscreen();
        this.plugin.Play( this.url );

    }
}

Player.pauseVideo = function()
{
    this.state = this.PAUSED;
    this.plugin.Pause();
    
}

Player.stopVideo = function()
{
    if (this.state != this.STOPPED)
    {
        this.state = this.STOPPED;
        this.plugin.Stop();
        Display.setTime(0);
        if (this.stopCallback)
        {
            this.stopCallback();
        }
    }
    else
    {
        alert("Ignoring stop request, not in correct state");
    }
}

Player.resumeVideo = function()
{
    this.state = this.PLAYING;
    this.plugin.Resume();
}

Player.skipForwardVideo = function()
{
    this.skipState = this.FORWARD;
    this.plugin.JumpForward(5);    
}

Player.skipBackwardVideo = function()
{
    this.skipState = this.REWIND;
    this.plugin.JumpBackward(5);
}

Player.getState = function()
{
    return this.state;
}

// Global functions called directly by the player 

Player.onBufferingStart = function()
{
    switch(this.skipState)
    {
        case this.FORWARD:
            //document.getElementById("forward").style.opacity = '0.2';
            break;
        
        case this.REWIND:
            //document.getElementById("rewind").style.opacity = '0.2';
            break;
    }
    $("#videoPlayState").html('Buffering...');
    $('#videoMenu').css('height','60px');
}

Player.onBufferingProgress = function(percent)
{
	//$("#videoPlayState").html('Buffering '+percent+"%");
}

Player.onBufferingComplete = function()
{
    switch(this.skipState)
    {
        case this.FORWARD:
            //document.getElementById("forward").style.opacity = '1.0';
            break;
        
        case this.REWIND:
            //document.getElementById("rewind").style.opacity = '1.0';
            break;
    }

    playTimeInterval = setInterval(function(){
        //var c = String(Player.GetLiveDuration());
        //$("#videoPlayState").html(c.toMMSS());
        //alert('Playing');
    },500);
    $("#videoPlayState").html('Playing');
    
}

Player.OnStreamInfoReady = function(){
    //Update Duration
    $("#videoDuration").html(this.GetDuration());
}

Player.setCurTime = function(time) {
    Display.setTime(time);
}

Player.setTotalTime = function() {
    Display.setTotalTime(Player.plugin.GetDuration());
}

Player.setCurTime = function(time)
{
}

Player.setTotalTime = function()
{
    
}

onServerError = function()
{

}

OnNetworkDisconnected = function()
{
    
}

getBandwidth = function(bandwidth) { alert("getBandwidth " + bandwidth); }

onDecoderReady = function() { alert("onDecoderReady"); }

onRenderError = function() { alert("onRenderError"); }

stopPlayer = function()
{
    Player.stopVideo();
}

setTottalBuffer = function(buffer) { alert("setTottalBuffer " + buffer); }

setCurBuffer = function(buffer) { alert("setCurBuffer " + buffer); }

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
            timeHTML += "00:";
        } else if (timeMinute < 10) {
             timeHTML += "0" + timeMinute + ":";
        } else {
             timeHTML += timeMinute + ":";
        }

        if (timeSecond == 0) {
            timeHTML += "00/";
        } else if (timeSecond < 10) {
             timeHTML += "0" + timeSecond + "/";
        } else {
             timeHTML += timeSecond + "/";
        }
        timeHTML += totalTimeHour + ":";

        if (totalTimeMinute == 0) {
             timeHTML += "00:";
        } else if (totalTimeMinute < 10)
            timeHTML += "0" + totalTimeMinute;
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
}
