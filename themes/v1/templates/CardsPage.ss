<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>See Cards</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout-110812) %>
<% require themedCSS(countdown-mosaic) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/jquery.countdown.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/common.js) %>
<% require javascript(themes/v1/javascript/card.js) %>
<% require javascript(themes/v1/javascript/analytics.js) %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<div id="wrapper" class="container">
	<div id="cardsMain">
			<!-- header area (1024 x 80)-->
			<section  style="padding-left:128px;" id="header-new" class="row">
				<div id="header-title" class="span6">
					<h1>Featured Card.</h1>
					<h3>Go to americanexpress.com to see more Cards.</h3>
				</div>

			<div id="header-logo" style="margin:0px 0px 0px 0px" class="span6">
			<img src="assets/images/logo.png" alt="Founding Partner">
			</div>
			</section>

			<section id="content-new" class="row">
				<div class="span2">&nbsp;</div>
				
				<div id="findacard">
				
					<div id="featuredcard-one" class="span12">
					
						<img src="themes/v1/images/findacard-prepaidcard.jpg" class="card-image-one" alt="Prepaid" />
						
						<div style="float: left;">
						<h2>American Express<sup>&reg;</sup> Prepaid Card</h2>
						
						<p class="subtitle">Load. Spend. Repeat.</p>
						
						<p>&bull; No monthly or annual fees<br>
						&bull; Use in stores, online and at ATMs<br>
						&bull; Reload as often as you wish</p>
						
						<p class="bsm-blue">Call 1-800-528-4800 or apply at<br>
						AmericanExpress.com/Prepaid</p>
						</div>
						
					</div>
					
					<div style="clear: both;"></div>
					
					<p id="termsconditions" style="margin: 18px 130px 0 0 !important;"><a class="termsbtn" href="lg/terms">Terms &#38; Conditions</a></p>
					
					
					<!--div id="featuredcard-left" class="span6">
					
						<img src="themes/v1/images/findacard-goldcard.jpg" class="card-image" alt="Gold Card" />
						<h2>Premier Rewards&nbsp; Gold Card</h2>
						<div class="clearfix"></div>
						
						<p class="subtitle">Earn Rewards Fast.</p>
						
						<p>&bull; 3X points on airfare<br>
						&bull; 2X points on gas &amp; groceries<br>
						&bull; 1X points on everything else</p>
						
						<p class="bsm-blue">Call 1-800-AXP-GOLD or<br>
						apply at AXPGOLD.com</p>
						
						<p class="bsm">Apply now & you can <span class="bsb">earn 25,000</span><br>
						Membership Rewards<sup>&reg;</sup> points</p>
						
					</div>
					
					
					<div id="featuredcard-right" class="span5">
					
						<img src="themes/v1/images/findacard-prepaidcard.jpg" class="card-image" alt="Prepaid" />
						
						<h2>American Express<sup>&reg;</sup>&nbsp; Prepaid Card</h2>
						<div class="clearfix"></div>
						
						<p class="subtitle">Load. Spend. Repeat.</p>
						
						<p>&bull; No monthly or annual fees<br>
						&bull; Use in stores, online and at ATMs<br>
						&bull; Reload as often as you wish</p>
						
						<p class="bsm-blue">Call 1-800-528-4800 or apply at
						AmericanExpress.com/Prepaid</p>
					</div>
					
					<div style="clear: both;"></div>
					
					<p id="termsconditions"><a class="termsbtn" href="lg/terms">Terms &#38; Conditions</a></p-->
				
				</div>
				<!-- /findacard -->
			</section>
		</div>

		<!-- Footer -->
		<div class="navbar navbar-fixed-bottom">
			<div class="menubar-inner">
				<div class="container">
				<ul>
					<li><a class="navbtn" href="lg/benefits">Benefits</a>
					<li class="center"><a class="navbtn" href="lg/news">News &amp; Offers</a>
					<li><a class="navbtn" href="lg/live">Watch Concert</a>
				</ul>
				<div style="clear: both;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- /wrapper -->

</body>
</html>
