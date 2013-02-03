<object type="video/mp4" id="fullPlayer" src="http://9415d76ee7de9f62f3ed-abfa988e4213bbf6e7d06542f0d11811.r69.cf2.rackcdn.com/foodieGetaways_1mbps.mp4" width="1280" height="720">
	</object>

	

	<div id="test" style="display:none;z-index:3000;background-color: rgba(20, 20,20, .5);color:#ffffff;position:absolute;bottom:10px;left:0px;width:1280px;height:200px;">
	<p></p>
	</div>
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
							<img src="{$BaseHref}assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
						</div>

						<div style="width: 979px;height:400px;margin: 36px 0 0 36px; overflow: hidden;">

							<div id="image-scroller">
							<% loop videoPanels %>
								<div id="panel$PanelNumber" style="height:400px;" class="panelHeader" data-video="$Filename">
								
									<h3 class="video-panel-text" style="$CustomStyles"><span class="headerText">$Title.RAW</span></h3>
									<div class="video-panel-icon"><p><img src="$PanelIcon.AbsoluteURL" alt="icon" /></p></div>
								</div>
								<div id="panel{$PanelNumber}_content" class="showcaseimage">
									<img src="$PanelImage.AbsoluteURL" alt="image" />
								</div>
							<% end_loop %>
								<div class="fix"></div>
							</div>
						</div>

						<div class="gallery-arrow-r arrows" id="news_arrowright">
						<img src="{$BaseHref}assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
						</div>

					</div>
					<!-- End showcase container -->
				
					<p id="termsconditions" style="float: right; margin: 69px 37px 0 0;"><a class="termsbtn" href="/terms">Terms &#38; Conditions</a></p>
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

		<div id="videoMenu" class="navbar navbar-fixed-bottom">

			<div class="videobar-inner">
			<div id="VideoMenuContent" class="container">
			  
			<h2 class="left" id="currentVideoTitle">FOODIE GETAWAYS</h2>
			<h3 class="right" id="videoPlayStatus"><span id="videoPlayState">0:01</span> / <span id="videoDuration">0:35</span></h3></div>

			</div>
			</div>
		</div>
