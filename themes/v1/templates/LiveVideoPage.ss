<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>News and Offers</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/live.js) %>
<% include Analytics %>
</head>
<body style="margin-top: 10px;background-color:#000;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	
		<% if Filename != '' %>
		<div class="fullscrn" style="background:#000000;">
		<div class="liveHeader">
		<img style="padding-right: 10px;" src="assets/images/amex-txt.png" alt="American Express" /><span class="presents">PRESENTS</span>
		<span style="float:right" class="debugText">Loading...</span>
		</div>
		<object type="application/x-netcast-av" id="livePlayer" style="position:relative;width:920px; height:518px" data-title="$MenuTitle" data="{$CDN}{$Filename}">
		</object>
		<img src="$StaticImage.URL" alt="$Title" />
		</div>
		<!--div id="videoMenu" class="navbar navbar-fixed-bottom">
		<div class="videobar-inner">
		<div id="VideoMenuContent" class="container">
			<h2 class="left" id="currentVideoTitle" style="padding-bottom:20px;padding-left:10px;width:400px">$MenuTitle</h2>
			<h2 class="right" id="videoPlayState"  style="padding-bottom:20px;padding-right:10px;width:180px">--:-- / --:--</h2></div>
			<div style="clear: both;"></div>
		</div>
		</div>
	</div -->
		<% else %>
		<div class="fullscrn">
		<img src="$StaticImage.URL" alt="$Title" />
		<div class="closescrn"><a class="backbtn" href="#">BACK</a></div>
		</div>
		<% end_if %>
	
	
</body>
</html>
