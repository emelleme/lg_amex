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
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/common.js) %>
<% require javascript(themes/v1/javascript/news.js) %>
<% require javascript(themes/v1/javascript/analytics.js) %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<div id="wrapper" class="container">
		<div>
			<!-- header area (1024 x 80)-->
			<section  style="padding-left:128px;" id="header-new" class="row">
				<div id="header-title" class="span6">
					<h1>News &amp; Offers.</h1>
					<h3>Check back often to see what’s new.</h3>
				</div>

				<% include Logo %>
			</section>

			<section id="content-new" class="row">
				
					<div id="showcase-container">
						<div class="arrows2" id="news_arrowleft">
							<img src="assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
						</div>

						<div id="showcase">

							<div id="image-scroller">
							<% loop newsPanels %>
								<div id="panel$Panel" class="panelHeader">
								<% if CurrentMember %>
								<span style="position: relative;"><a href="admin/benefits/Benefit/EditForm/field/NewsOffers/item/$ID" target="_blank" style="color:#fff"><img src="assets/images/edit.png" /></a></span>
								<% end_if %>
									<h3><span class="headerText">$Title.RAW</span></h3>
									<div class="month"><p>$Month</p></div>
								</div>
								<div id="panel{$Panel}_content" class="showcaseimage">
									$PanelImage
								</div>
							<% end_loop %>
								<div class="fix"></div>
							</div>
						</div>

						<div class="arrows2" id="news_arrowright">
						<img src="assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
						</div>

					</div>
					<!-- End showcase container -->

				<div id="news-copy" class="span4">
					<div id="copy-left">
						<h2> Tweet your way to savings</h2>
						<img src="assets/images/twitterbird_dark.png" alt="Twitter Bird" width="43" height="32"/>
						<span class="darkblue2">Tweet #AmexSync <span id="moveleft">to learn how</span></span>
					</div>

					<div id="copy-right">
						<h3><img src="assets/images/newsoffers/circle_1.png" alt="blank" width="26" height="27"/><span class="lightblue2"> Sync</span> your eligible Card with Twitter</h3>
						<h3><img src="assets/images/newsoffers/circle_2.png" alt="blank" width="26" height="27"/><span class="lightblue2"> Tweet</span> special offer #hashtags</h3>
						<h3><img src="assets/images/newsoffers/circle_3.png" alt="blank" width="26" height="27"/><span class="lightblue2"> Save</span> with statement credits on qualified purchases using your synced Card</h3>
					</div>
				</div>
			</section>
		</div>
		<div class="navbar navbar-fixed-bottom">
			<div class="menubar-inner">
				<div class="container">
					<ul>
						<li><a class="navbtn" href="lg/benefits">Benefits</a>
						<li class="center"><a class="navbtn" href="lg/cards">See Cards</a>
						<li><a class="navbtn" href="lg/live">Watch Concert</a>
					</ul>
					<div style="clear: both;"></div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
