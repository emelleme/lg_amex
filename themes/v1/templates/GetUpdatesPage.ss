<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Get Updates</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require themedCSS(sbs) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/common.js) %>
<% require javascript(themes/v1/javascript/page.js) %>
<% include Analytics %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<div id="wrapper" class="container">
		<div>
			<!-- header area (1024 x 80)-->
			<section style="padding: 0 0 0 159px;" id="header-new" class="row">
				<div id="header-title" class="span5">
					<h1>Get Updates.</h1>
					<h3>Learn more and get updates at shopsmall.com</h3>
				</div>

				<% include Logo %>
			</section>

			<section id="content-new" class="row">
				
				<div class="span2">&nbsp;</div>
			
				<div class="span13">
				
					<div id="getupdates-image"><img src="themes/v1/images/sbs/getupdates-image.jpg" alt="House"></div>
				
					<div id="getupdates-main">
					
						<p class="jointheconversation">JOIN THE CONVERSATION <img src="themes/v1/images/sbs/getupdates-shopsmallcircle.png" style="height: 69px; margin: -6px 0 0 0;" alt="Shop Small"></p>
			
						<div class="callout-1">Follow us at <span class="bentonbold">twitter.com/shopsmall</span><br>
						and tweet with <span class="bentonbold">#SmallBizSat</span></div>
					
						<div class="callout-2">Like us at<br>
						<span class="bentonbold">Facebook.com/SmallBusinessSaturday</span></div>
					
					</div>
					
				</div>
					
			</section>
		</div>
		<div class="navbar navbar-fixed-bottom">
			<% include DefaultNavigation %>
		</div>
	</div>
</body>
</html>
