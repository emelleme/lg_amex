<div id="livevideoMenu" class="videoDetails" data-livestream="$LiveStream1" style="z-index:16000;background-color: #000000;color:#fafafa;position:absolute;bottom:0px;left:0px;width:1280px;height:0px;">
	<h2 class="currentVideoTitle left" style="padding-left:25px;">On The Runway.	<span id="status"></span></h2>
	<h3 class="videoPlayStatus right" style="padding-right:25px;"> / </h3>
	</div>
<div id="mainArea">
	<!-- header area (1024 x 80)-->
	<section  style="padding-left:128px;" id="header-new" class="row">
		<div id="header-title" class="span10">
			<h1 class="header-home">Joe Zee's Fashion Trends.</h1>
			<h3>Explore trends and more at venteprivee.com/AmexTV</h3>
		</div>

		<div id="header-logo" style="margin:0px 0px 0px 0px" class="span2">
		<img src="{$BaseHref}assets/images/logo-clean.png" alt="American Express">
		</div>
	</section>

	<section id="content-new" class="row">
		
		<div id="main-copy">
		</div>

		<div id="main-mosaic">
			<div id="imageMosaic">
				<div id="image_2-3" class="disabledmosaicImage" style="">
				</div>
				<div id="image_disabled" class="disabledmosaicImage" style="">
				</div>

			<% loop displayItems($CurrentPhase) %>
				<div id="image_$Position" <% if $Position != '1-1' %>class="mosaicImage"<% end_if %> data-wingcolor="$WingColor" style="">
				
					<div class="inner">
						<div id="benefit_$Position" class="hidden" data-title="$Title">
							$BoxText.AbsoluteLinks
						</div>
					</div>
				</div>
			<% end_loop %>
		</div>

	</div>
	</section>
</div>

<div id="home-toapply">Find the American Express<sup>&reg;</sup> Card that suits your style. Call 866-848-1297 to apply. <p class="termsconditions" style="float: right;"><a class="termsbtn" href="terms.html">Terms &amp; Conditions</a></p></div>

<div id="travelNav" class="navbar navbar-fixed-bottom navbar-home">
	<div class="menubar-inner">
	<div class="container">
	<ul>
		<li><a class="navbtn" data-page="videos" href="videos.html">Video Gallery</a>
		<li class="center"><a data-page="designerspotlight" class="navbtn" href="designerspotlight.html">Designer Spotlight</a>
		<li><a class="navbtn" data-page="shopsmall" href="shopsmall">Shop Small<sup>&reg;</sup></a>
	</ul>
		
	<div style="clear: both;"></div>
	</div>
	</div>
</div>
		
		<img src="{$BaseHref}/assets/images/background-fashionweek.jpg" alt="" class="bg">
