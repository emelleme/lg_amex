<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Welcome In.</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/common.js) %>
<% require javascript(themes/v1/javascript/intro-static.js) %>
<% require javascript(themes/v1/javascript/analytics.js) %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
<!-- App Wrapper: 1280px x 720 (full application size) -->
	<div id="fullPlayer">
		<!--<div class="loadingVideo">
			<h2>Loading Your American Express Experience</h2>
			<img src="themes/v1/images/loading.gif" />
		</div> -->
		<div id="videoPlayer">
		<!--<object id="introVideo" type="video/mp4" data="assets/intro.mp4" width="1280" height="720" autoStart="true"></object> -->
		<img src="assets/images/StaticIntroVideo.jpg" alt="Shop Small">
		<div class="closescrn"><a class="backbtn" href="#">Continue</a></div>
		</div>
	</div>
</body>
</html>