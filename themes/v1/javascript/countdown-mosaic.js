$(document).ready(function() {
/*jwplayer('mediaspace').setup({
    'flashplayer': '../mp/player.swf',
    'file': 'testing_1_240@50102',
    'streamer': 'rtmp://cp128604.live.edgefcs.net/live',
    'controlbar': 'none',
    'width': '960',
    'height': '540',
    'logo.position': 'bottom-right',
    'image': '../images/killersscreengrab.jpg'
});*/
	var liftoffTime = new Date(2012, 12-4, 18,18)
     $('#counter').countdown({until: liftoffTime});
});
