

	<div id="videoMenu" style="z-index:14000;background-color: rgba(20, 20,20, .5);color:#ffffff;position:absolute;bottom:0px;left:0px;width:1280px;height:60px;">
	<h2 class="left" id="currentVideoTitle">FOODIE GETAWAYS <span id="status"></span></h2>
	<h3 class="right" id="videoPlayStatus"> / </h3>
	</div>

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
						<div class="gallery-arrow-l arrows" id="videos_arrowleft">
							<img src="{$BaseHref}assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
						</div>

						<div style="width: 979px;height:400px;margin: 36px 0 0 36px; overflow: hidden;">

							<div id="image-scroller">
							<% loop videoPanels %>
								<div id="panel$PanelNumber" style="height:400px;" class="panelHeader" data-video="$Filename" data-title="$PlainTitle">
								
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

						<div class="gallery-arrow-r arrows" id="videos_arrowright">
						<img src="{$BaseHref}assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
						</div>

					</div>
					<!-- End showcase container -->
				
			</section>
		</div>
		<div id="videosNav" class="navbar navbar-fixed-bottom">
			
			<div class="menubar-inner">
			<div class="container">
			  
			<ul>
				<li><a class="navbtn" data-page="travel" href="travel.html">Travel Ideas</a>
				<li class="center"><a class="navbtn" data-page="recipes" href="recipes.html">Party Recipes</a>
				<li><a class="navbtn" data-page="cards" href="cards.html">See Cards</a>
			</ul>
				
			<div style="clear: both;"></div>
			
			</div>
			</div>
		</div>

		
