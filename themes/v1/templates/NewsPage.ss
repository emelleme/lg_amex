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
								<div id="panel1" class="panelHeader">
									<h3><span class="headerText">Tribeca <br />Film Festival</span></h3>
									<div class="month"><p>apr</p></div>
								</div>
								<div id="panel1_content" class="showcaseimage">
									<img src="assets/images/banner_tribecafilm.jpg" height="288" width="671" alt="Tribeca Film Festival" />
								</div>

								<div id="panel2" class="panelHeader">
									<h3><span class="headerText">US Open<br />Tennis</span></h3>
									<div class="month"><p>aug</p></div>
								</div>
								<div id="panel2_content" class="showcaseimage">
									<img src="assets/images/banner_USopen.jpg" height="288" width="671" alt="US Open Tennis" />
								</div>

								<div id="panel3" class="panelHeader">
									<h3><span class="headerText">MERCEDES-BENZ FASHION WEEK</span></h3>
									<div class="month"><p>sept</p></div>
								</div>
								<div id="panel3_content" class="showcaseimage">
									<img src="assets/images/banner_mercedes.jpg" height="288" width="671" alt="MERCEDES-BENZ FASHION WEEK" />
								</div>


								<div id="panel4" class="panelHeader">
									<h3><span class="headerText">nba <br />2012 season</span></h3>
									<div class="month"><p>oct</p></div>
								</div>
								<div id="panel4_content" class="showcaseimage">
									<img src="assets/images/banner_NBA.jpg" height="288" width="671" alt="NBA" />
								</div>

								<div id="panel5" class="panelHeader">
									<h3><span class="headerText">SMALL BUSINESS SATURDAY</span></h3>
									<div class="month"><p>nov</p></div>
								</div>
								<div id="panel5_content" class="showcaseimage">
									<img src="assets/images/banner_smallbusiness.jpg" height="288" width="671" alt="Small BUSINESS SATURDAY" />
								</div>


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
						<h3><img src="assets/images/circle_1.png" alt="blank" width="26" height="27"/><span class="lightblue2"> Sync</span> your eligible Card with Twitter</h3>
						<h3><img src="assets/images/circle_2.png" alt="blank" width="26" height="27"/><span class="lightblue2"> Tweet</span> special offer #hashtags</h3>
						<h3><img src="assets/images/circle_3.png" alt="blank" width="26" height="27"/><span class="lightblue2"> Save</span> with statement credits on qualified purchases using your synced Card</h3>
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
