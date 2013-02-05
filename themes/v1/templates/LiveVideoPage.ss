<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>News and Offers</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(themes/v1/javascript/lge/framework/VideoPlayer/api/api.js) %>
<% require javascript(themes/v1/javascript/lge/framework/VideoPlayer/util/keycode.js) %>
<% require javascript(themes/v1/javascript/live.js) %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	
		<% if Filename != '' %>
		<div class="fullscrn">
		<object id="videoPlayer" style="width:1280px; height:720px" data-title="$MenuTitle" src="{$CDN}{$Filename}">
		</object>
		</div>
		<div id="videoMenu" class="navbar navbar-fixed-bottom">
		<div class="videobar-inner">
		<div id="VideoMenuContent" class="container">
			<h2 class="left" id="currentVideoTitle" style="padding-bottom:20px;padding-left:10px;width:400px">$MenuTitle</h2>
			<h2 class="right" id="videoPlayState"  style="padding-bottom:20px;padding-right:10px;width:180px">--:-- / --:--</h2></div>
			<div style="clear: both;"></div>
		</div>
		</div>
	</div>
		<% else %>
		<div class="fullscrn">
		<img src="$StaticImage.URL" alt="$Title" />
		<div class="closescrn"><a class="backbtn" href="#">BACK</a></div>
		</div>
		<% end_if %>
	
	
</body>
</html>
