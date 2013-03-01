<!-- header area (1024 x 80)-->
			<section  style="padding-left:128px;" id="header-new" class="row">
				<div id="header-title" class="span5">
					<h1 style="margin-bottom: -9px;"><img src="{$BaseHref}themes/v1/images/bazaar-logo.png" alt="Bazaar"></h1>
					<h3 class="gray">View the featured designers and their collections.</h3>
				</div>

				<% include Logo %>
			</section>

			<section id="content-details" class="row">
				<div id="gallery-area" style="width: 1037px;height: 288px;position: absolute;top: 126px;left: 113px;">
					<!-- Full Recipes -->
					<% loop galleryPanels %>
						<div class="galleryContent" id="gallery-item-$ItemNumber">
						<p style="margin: 18px 22px 0 0;"><a class="backbtn" href="#">Back</a></p>
						</div>
					<% end_loop %>
					<% include GalleryTermsButton %>
				</div>
			</section>

			<section id="gallery-content-new" class="row">
				<div id="showcase-container">
					<div class="gallery-arrow-l arrows" id="news_arrowleft">
						<img src="{$BaseHref}assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
					</div>

					<div style="width: 942px; height:400px; margin: 27px 0 0 45px; overflow: hidden;">

						<div id="image-scroller">
						<% loop galleryPanels %>
							<div id="panel$ItemNumber" style="height:400px;" class="panelHeader" data-title="$Title.RAW">
								<div class="video-panel-icon" style="background-image:url({$BaseHref}$GalleryPanelImage.Url);width:75px;height:400px;"></div>
							</div>
							<div id="panel{$ItemNumber}-content" class="showcaseimage">
								$GalleryPanelContent.AbsoluteLinks
							</div>
						<% end_loop %>
							<div class="fix"></div>
						</div>
					</div>

					<div class="gallery-arrow-r arrows" id="news_arrowright">
					<img src="{$BaseHref}assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
					</div>
					
					<% include GalleryTermsButton %>

				</div>
					<!-- End showcase container -->
			</section>
		<div id="designerNav" class="navbar navbar-fixed-bottom">
			
			<div class="menubar-inner">
			<div class="container">
			  
	<ul>
		<li><a class="navbtn" data-page="tipstrends" href="tipstrends">Tips &amp; Trends</a>
		<li class="center"><a data-page="videos" class="navbtn" href="videos.html">Video Gallery</a>
		<li><a class="navbtn" data-page="shopsmall" href="shopsmall">Shop Small<sup>&reg;</sup></a>
	</ul>
				
			<div style="clear: both;"></div>
			
			</div>
			</div>
		</div>