<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Make-Ahead Recipes</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require themedCSS(gallery) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/gallery.js) %>
<% require javascript(themes/v1/javascript/analytics.js) %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<div id="wrapper" class="container">
		<div>
			<!-- header area (1024 x 80)-->
			<section  style="padding-left:159px;" id="header-new" class="row">
				<div id="header-title" class="span6">
					<h1>Make-Ahead Recipes.</h1>
					<h3>Get time-saving recipes and find out how to save. </h3>
				</div>

				<% include Logo %>
			</section>
			<div id="main-area">
			$Layout
			</div>
		</div>
		<div class="navbar navbar-fixed-bottom">
			
			<div class="menubar-inner">
			<div class="container">
			  
			<ul>
				<li><a class="navbtn" href="/travel">Travel Tips</a>
				<li class="center"><a class="navbtn" href="/videos">Video Gallery</a>
				<li><a class="navbtn" href="/cards">See Cards</a>
			</ul>
				
			<div style="clear: both;"></div>
			
			</div>
			</div>
		</div>
		<% loop galleryPanels %>
		<div class="galleryContent" id="gallery-$ItemNumber">
			<div style="float:left">$GalleryImage</div>
			<% if Content %>
			<div class="recipes-main">
				<h2>$Title</h2>
				<p>$Content</p>
				<p><span class="benton-bold">SELECT for more details</span></p>
			</div>
			<% end_if %>
		</div>
		<% end_loop %>
		
		<% loop galleryPanels %>
	<div class="galleryContent" id="gallery-item-$ItemNumber">
		<div class="gallery-items" style="width: 963px; position: absolute; top: 140px; left: 160px;">
		<div style="float: left; margin: 0 0 0 30px;">
		<h2>$Title</h2>
		<img src="assets/images/brought-to-you.png" style="margin: 6px 6px 6px 0;" alt="$Title">
		</div>
		
		<p style="float: right; margin: 12px 0 0 0;"><a class="backbtn" href="#">Back</a></p>
		
		<div style="clear: both;"></div>
		 
		<div class="full-recipe">
		$FullRecipe
		</div>

		<p id="termsconditions" style="float: right; margin: 15px 21px 0 0;"><a class="termsbtn" href="/terms">Terms &#38; Conditions</a></p>
		<img src="assets/images/icon-mobilephone.png" style="float: left; margin: 0 9px 6px 30px;" alt="Phone">
		<p class="para-one">Text $SmsKeyword to 74642 to get this recipe and more</p>
		<p class="para-two">Message & Data rates may apply. Max 4 messages per month. To quit, text STOP to 74642.<br> 
		Not available on all carriers. Your contact information will not be sold or used for any other purposes.</p>
		</div>
	</div>
<% end_loop %>

	<div style="display:none" id="main-holder">
	</div>
</body>
</html>
