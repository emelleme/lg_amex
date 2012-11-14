<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Experience the Benefits</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout-110812) %>
<% require themedCSS(countdown-mosaic) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(themes/v1/javascript/swfobject/swfobject.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/jquery.countdown.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/common.js) %>
<% require javascript(themes/v1/javascript/mosaic.js) %>
<% require javascript(themes/v1/javascript/countdown-mosaic.js) %>
<% require javascript(themes/v1/javascript/analytics.js) %>
<script type="text/javascript">

</script>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<!--<div id="livePlayer" class="videoModal">
		<div>
			<span><img src="assets/images/amex-txt.png" alt="AMEX LOGO" /> <span id="presents">Presents</span>
			<span class="controls"><a id="closeVideo" href="#">BACK</a></span></span>
			<div id="mediaspace">
				<div id="ytapiplayer">
				You need Flash player 8+ and JavaScript enabled to view this video.
				</div>
				<script type="text/javascript">
				var params = { allowScriptAccess: "always" };
				var atts = { id: "ytapiplayer" };
				swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3",
				                   "ytapiplayer", "960", "540", "8", null, null, params, atts);
				function onYouTubePlayerReady(playerId) {
  					ytplayer = document.getElementById("ytapiplayer");
				ytplayer.loadVideoById('J71ur0UpUXE');
}
				</script>
  			</div>
  			<div id="moreVideo">
	  			<h2><strong>GO TO</strong></h2>
	  			<p>youtube.com/AmericanExpress<br />
	  			TO SEE MORE</p>
  			</div>

  			<div id="checkBack">
  				<p><span style="font-family:BentonSansBold;font-size: 18px;">Check Back</span><br>
  				for more exclusive<br>
  				unstaged events</p>
				</div>

				<div style="clear: both;"></div>
  			</div>
	</div> -->
	<div id="wrapper" class="container">
		 <!--App Container (1025 x 576) -->
		$Layout
		
		<% include Footer %>
		
	</div>
</body>
</html>
