var Data = {
    videoNames : [],
    videoURLs : [],
    videoDescriptions : []

};

Data.setVideoNames = function(list) {
    this.videoNames = list;
}

Data.setVideoURLs = function(list) {
    this.videoURLs = list;
}

Data.setVideoDescriptions = function(list) {
    this.videoDescriptions = list;

}

Data.getVideoURL = function(index) {

    var url = this.videoURLs[index];
    if (url) {    // Check for undefined entry (outside of valid array)
        return url;
    } else {
        return null;
    }
}

Data.getVideoCount = function() {
    return this.videoURLs.length;
}

Data.getVideoNames = function() {
    return this.videoNames;
}

Data.getVideoDescription = function(index) {
    var description = this.videoDescriptions[index];

    if (description){// Check for undefined entry (outside of valid array) {
        return description;
    } else {
        return "No description";

    }
}

var Player = {
    plugin : null,
    state : -1,
    originalSource : null,
    STOPPED : 0,
    PLAYING : 1,
    PAUSED : 2,
};

Player.init = function () {
    var success = true;
    alert("success vale :  " + success);
    this.state = this.STOPPED;
    this.plugin = document.getElementById("pluginPlayer");
    if (!this.plugin) {
        alert("success vale this.plugin :  " + success);
        success = false;
    }

    alert("success vale :  " + success);
    this.setWindow();
    alert("success vale :  " + success);
    this.plugin.OnCurrentPlayTime = 'Player.setCurTime';
    this.plugin.OnStreamInfoReady = 'Player.setTotalTime';
    this.plugin.OnBufferingStart = 'Player.onBufferingStart';
    this.plugin.OnBufferingProgress = 'Player.onBufferingProgress';
    this.plugin.OnBufferingComplete = 'Player.onBufferingComplete';
    alert("success vale :  " + success);
    return success;
}

Player.deinit = function () {
    alert("Player deinit !!! ");
    if (this.plugin) {
        this.plugin.Stop();
    }
}

Player.setWindow = function () {
    this.plugin.SetDisplayArea(0, 0, 1280, 720);
}

Player.setVideoURL = function (url) {
    this.url = url;
    alert("URL = " + this.url);
}

Player.playVideo = function () {
    if (this.url == null) {
        playVideo('http://9415d76ee7de9f62f3ed-abfa988e4213bbf6e7d06542f0d11811.r69.cf2.rackcdn.com/intro.mp4');
    } else {
        this.plugin.Play(this.url);
    }
}

Player.stopVideo = function () {
    if (this.url == null) {
        alert("No videos to play");

    } else {
        this.state = this.STOPPED;
        this.plugin.Stop();
        alert("Stoping...");
    }

}
// Global functions called directly by the player

startDrawLoading = function () {
    alert("startDrawLoading");
}
endDrawLoading = function () {
    alert("endDrawLoading");
}
getBandwidth = function (bandwidth) {
    alert("getBandwidth " + bandwidth);
}
onDecoderReady = function () {
    alert("onDecoderReady");
}
onRenderError = function () {
    alert("onRenderError");
}
popupNetworkErr = function () {
    alert("popupNetworkErr");
}
setCurTime = function (time) {
    alert("setCurTime " + time);
}
setTottalTime = function (time) {
    alert("setTottalTime " + time);
}
stopPlayer = function () {
    alert("stopPlayer");
}
setTottalBuffer = function (buffer) {
    alert("setTottalBuffer " + buffer);
}
setCurBuffer = function (buffer) {
    alert("setCurBuffer " + buffer);
}
onServerError = function () {
    alert("onServerError");
}