$(document).ready(function() {
	jwplayer('ytapiplayer').setup({
    'flashplayer': 'themes/v1/javascript/mp/player.swf',
    'playlist': [
        {
            'title':'Killers Concert',
            'provider': 'rtmp',
            'image': 'assets/images/killersscreengrab.jpg',
            'streamer': 'rtmp://cp140824.live.edgefcs.net/live',
            'levels':[
                {bitrate:"2600", file:"thekillers_1_2600@80754"}
            ]
        }
    ],
    'controlbar': 'none',
    'width': '960',
    'height': '540',
    'logo.hide': 'true',
     'events': {
   onComplete: function() {
		 // e.ref is a reference to the Flash object. We'll pass it to jwplayer() so the API knows where the player is.

		 // Add event listeners
		 // Interact with the player
		 jwplayer().play();
		}
    },
	});

	 jwplayer().play();
});
