// Global functions called directly by the player
Player.playVideo = function() {

    if (this.url == null) {
        playVideo('http://9415d76ee7de9f62f3ed-abfa988e4213bbf6e7d06542f0d11811.r69.cf2.rackcdn.com/intro.mp4');
    } else {
        
        this.plugin.Play(this.url);
    }

}

Player.onBufferingProgress = function(percent) {
    Display.status("Buffering:" + percent + "%");
}

Player.onBufferingStart = function () {
    Display.status("Buffering...");
}

Player.onBufferingProgress = function (percent) {
    Display.status("Buffering:" + percent + "%");
}

Player.onBufferingComplete = function () {
    Display.status("Play");
}

Player.setCurTime = function (time) {
    Display.setTime(time);
}

Player.setTotalTime = function () {
    Display.setTotalTime(Player.plugin.GetDuration());
}

onServerError = function () {
    Display.status("Server Error!");
}
onNetworkDisconnected = function () {
    Display.status("Network Error!");
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
stopPlayer = function () {

    Player.stopVideo();

}
setTottalBuffer = function (buffer) {
    alert("setTottalBuffer " + buffer);
}