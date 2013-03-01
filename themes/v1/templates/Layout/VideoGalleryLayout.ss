<!-- App Wrapper: 1280px x 720 (full application size) -->
	<object type="application/x-netcast-av" id="fullPlayer" width="1280" height="668">
	</object>
	<div id="wrapper" class="container">
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
						<div id="panel$PanelNumber" style="height:400px;" class="panelHeader" data-video="$Filename" data-title="$PlainTitle.RAW">
							<div class="video-panel-icon" style="background-image:url({$BaseHref}$PanelIcon.Url);width:75px;height:400px;"></div>
						</div>
						<div id="panel{$PanelNumber}_content" data-image="{$BaseHref}$PanelImage.Url" data-bwimage="{$BaseHref}$PanelImageBW.Url" class="showcaseimage">
							<img src="$PanelImage.Url" alt="image" />
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
		<div id="mainMenu" class="navbar navbar-fixed-bottom">
			<div class="menubar-inner">
			<div class="container">
			  
			<ul>
				<li><a class="navbtn" href="tipstrends.html">Tips &amp; Trends</a>
				<li class="center"><a class="navbtn" href="designerspotlight.html">Designer Spotlight</a>
				<li><a class="navbtn" data-page="shopsmall" href="shopsmall">Shop Small<sup>&reg;</sup></a>
			</ul>
				
			<div style="clear: both;"></div>
			
			</div>
			</div>
		</div>

		<div id="videoMenu" class="navbar navbar-fixed-bottom">
			<div class="videobar-inner">
			<div id="VideoMenuContent" class="container">
				<h2 class="left" id="currentVideoTitle" style="padding-bottom:20px;padding-left:25px;width:400px">FOODIE GETAWAYS</h2>
				<h2 class="right" id="videoPlayState"  style="padding-bottom:20px;padding-right:10px;width:180px">0:01 / 0:35</h2></div>
				<div style="clear: both;"></div>
			</div>
			</div>
		</div>
	