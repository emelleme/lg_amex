<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>News and Offers</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require themedCSS(countdown-live) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/jquery.countdown.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/common.js) %>
<% require javascript(themes/v1/javascript/live.js) %>
<% require javascript(themes/v1/javascript/countdown-mosaic.js) %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<div class="fullscrn" id="beforeImage">
		<div>
		<div id="counter"></div>
		</div>
		<img src="assets/images/c2-pro.jpg" alt="Watch Live September 18th!">
		<div class="closescrn"><a class="backbtn" href="#">BACK</a></div>
	</div>
</body>
</html>
