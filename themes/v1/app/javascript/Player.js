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
    REWIND : 4,
    CONTROLSACTIVE : 0
}



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
    this.plugin.OnConnectionFailed = 'Player.ConnectionFailed';
    this.plugin.OnNetworkDisconnected = 'Player.NetworkDisconnected';          
            
    return success;
}

Player.ConnectionFailed = function()
{
    $('#pluginPlayer').css('z-index','0');
    Player.stopVideo();
    Main.curLevel = Main.prevLevel;
    alert('Check Network Connection!')
}

Player.NetworkDisconnected = function()
{
    $('#pluginPlayer').css('z-index','0');
    Player.stopVideo();
    Main.curLevel = Main.prevLevel;
    alert('Check Network Connection!')
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
        this.plugin.Play( this.url );
        this.setFullscreen();

    }
}

Player.pauseVideo = function()
{
    this.state = this.PAUSED;
    this.plugin.Pause();
    
}

Player.fastforward = function()
{
    this.plugin.SetPlaybackSpeed(4);
}

Player.stopVideo = function()
{
	this.CONTROLSACTIVE = 0;
    if (this.state != this.STOPPED)
    {
        this.state = this.STOPPED;
        this.plugin.Stop();
        $('.videoDetails').css('height','0px');
        Main.curLevel = Main.prevLevel;
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

Player.getControlsState = function()
{
    return this.CONTROLSACTIVE;
}

// Global functions called directly by the player 

Player.onBufferingStart = function()
{
    $("h3.videoPlayState").html('Buffering...');
    Main.curLevel = Main.level.BUFFERING;
    $('.videoDetails').css('height','60px');
    switch(this.skipState)
    {
        case this.FORWARD:
            //document.getElementById("forward").style.opacity = '0.2';
            break;
        
        case this.REWIND:
            //document.getElementById("rewind").style.opacity = '0.2';
            break;
    }
    
    
}

Player.onBufferingProgress = function(percent)
{
     $('.videoDetails').css('height','60px');
	$('h3.videoPlayStatus').html('Buffering...');
    Main.curLevel = Main.level.NOSTATE;
}

Player.onBufferingComplete = function()
{
	Main.curLevel = Main.level.VIDEO;
    this.CONTROLSACTIVE = 1;
	
    playTimeInterval = setInterval(function(){
        //var c = String(Player.GetLiveDuration());
        //$("#videoPlayState").html(c.toMMSS());
        //alert('Playing');
    },500);
    $(".videoPlayState").html('Playing');
    
}

Player.setCurTime = function(time) {
	Main.curLevel = Main.level.VIDEO;
    if(time != Player.plugin.GetDuration()){
        Display.setTime(time);
    }else{
        $('#pluginPlayer').css('z-index','0');
        Player.stopVideo();
        alert('End of Video');
        Main.curLevel = Main.prevLevel;
    }
}

Player.setTotalTime = function() {
	
    Display.setTotalTime(Player.plugin.GetDuration());
    
    alert('Total time set')
}

Player.onServerError = function()
{
    $('#pluginPlayer').css('z-index','0');
    Player.stopVideo();
    //Show Network Error Dialog
}

Player.OnNetworkDisconnected = function()
{
    $('#pluginPlayer').css('z-index','0');
    Player.stopVideo();
    //Show Network Error Dialog
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




