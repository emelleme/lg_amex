<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Video Gallery</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require themedCSS(gallery) %>
<% require themedCSS(videos) %>
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/flick/jquery-ui.css" type="text/css" />
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/videos.js) %>
<% require javascript(themes/v1/javascript/analytics.js) %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<object type="video/mp4" id="fullPlayer" src="http://9415d76ee7de9f62f3ed-abfa988e4213bbf6e7d06542f0d11811.r69.cf2.rackcdn.com/foodieGetaways_1mbps.mp4" width="1280" height="720">
	</object>

	

	<div id="test" style="display:none;z-index:3000;background-color: rgba(20, 20,20, .5);color:#ffffff;position:absolute;top:10px;left:10px;width:300px;height:400px;">
	<p></p>
	</div>
	<div id="wrapper" class="container">
		<div>
			<!-- header area (1024 x 80)-->
			<section  style="padding-left:128px;" id="header-new" class="row">
				<div id="header-title" class="span5">
					<h1>Video Gallery.</h1>
					<h3>Use your remote to select and play each video.</h3>
				</div>

				<% include Logo %>
			</section>

			<section id="content-new" class="row">
				
					<div id="showcase-container">
						<div class="gallery-arrow-l arrows" id="news_arrowleft">
							<img src="assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
						</div>

						<div style="width: 979px;height:400px;margin: 36px 0 0 36px; overflow: hidden;">

							<div id="image-scroller">
							<% loop videoPanels %>
								<div id="panel$PanelNumber" style="height:400px;" class="panelHeader" data-video="$Filename" data-title="$Title.RAW">
								
									<h3 class="video-panel-text" style="$CustomStyles"><span class="headerText">$Title.RAW</span></h3>
									<div class="video-panel-icon"><p>$PanelIcon</p></div>
								</div>
								<div id="panel{$PanelNumber}_content" class="showcaseimage">
									<img src="$PanelImage.Url" alt="image" />
								</div>
							<% end_loop %>
								<div class="fix"></div>
							</div>
						</div>

						<div class="gallery-arrow-r arrows" id="news_arrowright">
						<img src="assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
						</div>

					</div>
					<!-- End showcase container -->
				
			</section>
		</div>
		<div id="mainMenu" class="navbar navbar-fixed-bottom">
			
			<div class="menubar-inner">
			<div class="container">
			  
			<ul>
				<li><a class="navbtn" href="travel.html">Travel Tips</a>
				<li class="center"><a class="navbtn" href="recipes.html">Party Recipes</a>
				<li><a class="navbtn" href="cards.html">See Cards</a>
			</ul>
				
			<div style="clear: both;"></div>
			
			</div>
			</div>
		</div>

			<div id="videoMenu" class="navbar navbar-fixed-bottom">
				<div class="videobar-inner">
				<div id="VideoMenuContent" class="container">
					<h2 class="left" id="currentVideoTitle" style="padding-bottom:20px;padding-left:10px">FOODIE GETAWAYS</h2>
					<h2 class="right" id="videoPlayState"  style="padding-bottom:20px;padding-right:10px">0:01 / 0:35</h2></div>
					<div style="clear: both;"></div>
				</div>
				</div>
			</div>
		
	</div>
	<div id="loading" title="Dialog Title">Loading...</div>
</body>
</html>
