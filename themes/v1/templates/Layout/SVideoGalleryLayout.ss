	<div id="videoMenu" class="videoDetails" data-livestream="$LiveStream1" style="z-index:26000;background-color: #000000;color:#fafafa;position:absolute;bottom:0px;left:0px;width:1280px;height:0px;">
	<h2 class="currentVideoTitle left" style="padding-left:25px;">Experience AMEX <span id="status"></span></h2>
	<h3 class="videoPlayStatus right" id="videoPlayStatus" style="padding-right:25px;"> / </h3>
	</div>
		<div>
			<!-- header area (1024 x 80)-->
		<section  style="padding-left:128px;" id="header-new" class="row">
			<div id="header-title" class="span5">
				<h1>Video Gallery.</h1>
				<h3 class="gray">Use your remote to select and play each video.</h3>
			</div>
			<% include Logo %>
		</section>

		<section id="content-new" class="row">
			<div id="showcase-container">
				<div class="gallery-arrow-l arrows" id="videos_arrowleft">
				</div>

				<div style="width: 809px; height:400px; margin: 27px 0 0 121px; overflow: hidden;">

					<div id="image-scroller">
					<% loop videoPanels %>
						<div id="video-panel$PanelNumber" style="height:400px;" class="panelHeader" data-video="$SamsungFilename" data-title="$PlainTitle.RAW">
							<div class="video-panel-icon" style="background-image:url({$BaseHref}$PanelIcon.Url);width:75px;height:400px;"></div>
						</div>
						<div id="video-panel{$PanelNumber}_content" class="showcaseimage" style="background-color:#000;" data-image="{$BaseHref}$PanelImage.Url" data-bwimage="{$BaseHref}$PanelImageBW.Url">
							<img src="{$BaseHref}$PanelImage.Url" alt="image" />
						</div>
					<% end_loop %>
						<div class="fix"></div>
					</div>
				</div>

				<div class="gallery-arrow-r arrows" id="videos_arrowright">
				</div>
				<p class="termsconditions" style="float: right; margin: 18px 124px 0 0;"><a class="termsbtnblk" href="terms.html">Terms &amp; Conditions</a></p>
			</div>
			<!-- End showcase container -->
		</section>
		</div>
		<div id="videosNav" class="navbar navbar-fixed-bottom">
			
			<div class="menubar-inner">
			<div class="container">
			  
			<ul>
				<li><a class="navbtn" data-page="tipstrends" href="travel.html">Tips &amp; Trends</a>
				<li class="center"><a class="navbtn" data-page="designerspotlight" href="recipes.html">Designer Spotlight</a>
				<li><a class="navbtn" data-page="shopsmall" href="shopsmall">Sync to Buy</a>
			</ul>
				
			<div style="clear: both;"></div>
			
			</div>
			</div>
		</div>