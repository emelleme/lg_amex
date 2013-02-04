<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Designer Spotlight</title>
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
	<object type="application/x-netcast-av" id="fullPlayer" data="" width="1080" height="520">
	</object>

	

	<div id="test" style="display:none;z-index:3000;background-color: rgba(20, 20,20, .5);color:#ffffff;position:absolute;top:10px;left:10px;width:300px;height:400px;">
	<p></p>
	</div>
	<div id="wrapper" class="container">
		<div>
			<!-- header area (1024 x 80)-->
			<section  style="padding-left:128px;" id="header-new" class="row">
				<div id="header-title" class="span5">
					<h1 style="margin-bottom: -9px;"><img src="themes/v1/images/bazaar-logo.png"></h1>
					<h3 class="gray">View the featured designers and their collections.</h3>
				</div>

				<% include Logo %>
			</section>

<div id="gallery-area" style="position:absolute;top:129px;left:138px;">
	<!-- Gallery Item Details -->
	<% loop galleryPanels %>
		<div class="galleryContent" id="gallery-item-$ItemNumber" style="background: #ffffff;">
			<div class="gallery-items">
			
			</div>
		</div>
	<% end_loop %>
</div>
			<section id="content-new" class="row">
				
					<div id="showcase-container">
						<div class="gallery-arrow-l arrows" id="videos_arrowleft">
							<img src="assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
						</div>

						<div style="width: 942px; height:400px; margin: 27px 0 0 45px; overflow: hidden;">

							<div id="image-scroller">
							<% loop galleryPanels %>
								<div id="panel$ItemNumber" style="height:400px;" class="panelHeader" data-title="$Title.RAW">
									<div class="video-panel-icon">$GalleryPanelImage</div>
								</div>
								<div id="panel{$ItemNumber}_content" class="showcaseimage">
									<img src="$GalleryImage.Url" alt="image" />
								</div>
							<% end_loop %>
								<div class="fix"></div>
							</div>
						</div>

						<div class="gallery-arrow-r arrows" id="videos_arrowright">
						<img src="assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
						</div>
						
						<p class="termsconditions" style="margin: 18px 90px 0 0;"><span class="bazaar-footer">Find the American Express<sup>&reg;</sup> Card that suits your style. Call 866-848-1297 to apply.</span>&nbsp;&nbsp;&nbsp;<a class="termsbtn" href="terms.html">Terms &amp; Conditions</a></p>

					</div>
					<!-- End showcase container -->

			</section>
		</div>
		<div id="mainMenu" class="navbar navbar-fixed-bottom">
			
			<div class="menubar-inner">
			<div class="container">
			  
			<ul>
				<li><a class="navbtn" href="tipstrends.html">Tips &amp Trends</a>
				<li class="center"><a class="navbtn" href="designerspotlight.html">Designer Spotlight</a>
				<li><a class="navbtn" href="shopsmall.html">Shop Small<sup>&reg;</sup></a>
			</ul>
				
			<div style="clear: both;"></div>
			
			</div>
			</div>
		</div>
		
	</div>
	<div id="loading" title="Dialog Title">Loading...</div>
</body>
</html>
