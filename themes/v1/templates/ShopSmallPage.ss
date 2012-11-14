<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Shop Small&reg;</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require themedCSS(sbs) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/common.js) %>
<% require javascript(themes/v1/javascript/page.js) %>
<% require javascript(themes/v1/javascript/analytics.js) %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<div id="wrapper" class="container">
		<div>
			<!-- header area (1024 x 80)-->
			<section style="padding: 0 0 0 159px;" id="header-new" class="row">
				<div id="header-title" class="span5">
					<h1><img src="assets/images/sbs/sbs-logo.gif" alt="Small Business Saturday" style="margin: 0 0 -15px 0;"></h1>
				</div>

				<% include Logo %>
			</section>

			<section id="content-new" class="row">
			
			<div class="span2">&nbsp;</div>
			
			<div class="span12">
			
				<div id="sbs-main">
			
					<p class="callout-1"><span class="sbs-darkblue">Small Business Saturday<sup>&reg;</sup> is November 24<sup>th</sup>.</span><br>
					A day in between doorbusters and cyber<br>
					deals. A day to shop at stores owned<br>
					by our friends and our neighbors.</p>
					
					<p class="callout-2">On Saturday, November 24<sup>th</sup>, show your<br>
					support to all the great small businesses<br>
					near you, and Shop Small<sup>&reg;</sup>.</p>
					
				</div>
				
				<p id="sbs-text-1"><img src="themes/v1/images/sbs/sbs-star.gif" alt="star" style="margin: -6px 0 0 0;"> <span class="sbs-darkblue">TEXT</span> <span class="sbs-blue">SHOP</span> <span class="sbs-darkblue">TO 74642</span> <img src="themes/v1/images/sbs/sbs-star.gif" alt="star" style="margin: -6px 0 0 0;"></p>
				
				<p id="sbs-text-2">For a reminder to Shop Small<sup>&reg;</sup> on November 24<sup>th</sup>. Last year, 100 million people shopped small on Small Business Saturday*. This year, let's make it even more.</p>
				
				<p id="sbs-text-3">*Based on 2011 Small Business Saturday Consumer Survey by Echo Research, and commissioned by American Express. Message & Data rates may apply. Max 4 messages per month. To quit, text STOP to 74642. Not available on all carriers. Your contact information will not be sold or used for any other purposes.</p>
				
			</div>
			
			</section>
		</div>
		<div class="navbar navbar-fixed-bottom">
			<% include DefaultNavigation %>
		</div>
	</div>
</body>
</html>
