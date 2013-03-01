<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>News and Offers</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require themedCSS(sbs) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/common.js) %>
<% require javascript(themes/v1/javascript/news.js) %>
<% include Analytics %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<div id="wrapper" class="container">
		<div>
			<!-- header area (1024 x 80)-->
			<section  style="padding-left:159px;" id="header-new" class="row">
				<div id="header-title" class="span5">
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
								<!--<span style="position: relative;"><a href="admin/benefits/Benefit/EditForm/field/NewsOffers/item/$ID" target="_blank" style="color:#fff"><img src="assets/images/edit.png" /></a></span>-->
								<% end_if %>
									<h3 class="news-panel-text" style="$CustomStyles"><span class="headerText">$Title.RAW</span></h3>
									<div class="month"><p>$Month</p></div>
								</div>
								<div id="panel{$Panel}_content" class="showcaseimage">
									<img src="$PanelImage.Url" height="288" width="671" alt="image" />
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

				<div class="span2"></div>
				<div id="sbs-newsbottom" class="span12">
				
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
