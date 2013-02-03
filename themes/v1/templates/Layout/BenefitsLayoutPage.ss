<div id="mainArea">
	<!-- header area (1024 x 80)-->
	<section  style="padding-left:128px;" id="header-new" class="row">
		<div id="header-title" class="span10">
			<h1 class="header-home">On the Runway.</h1>
			<h3>Explore these looks and vote for your favorite at www.harpersbazaar.com.</h3>
			<h3>Return 2/14 to see the winning look LIVE.</h3>
		</div>

		<div id="header-logo" style="margin:0px 0px 0px 0px" class="span2">
		<img src="http://dev.amxp.cc/assets/images/logo-clean.png" alt="American Express">
		</div>
	</section>

	<section id="content-new" class="row">
		
		<div id="main-copy">
		</div>

		<div id="main-mosaic">
			<div id="imageMosaic">
				<div id="image_1-1" class="" style="">
				</div>
				<div id="image_2-3" class="disabledmosaicImage" style="">
				</div>
				<div id="image_disabled" class="disabledmosaicImage" style="">
				</div>

			<% loop allBenefits %>
				<div id="image_$Position" class="mosaicImage" data-wingcolor="$WingColor" style="">
				$Position
				<% if CurrentMember %>
				<span><a href="admin/benefits/Benefit/EditForm/field/Benefit/item/$ID" target="_blank" style="background-color:#0063B2;color:#fff">$Position<img src="http://dev.amxp.cc/assets/images/edit.png" /></a></span>
				<% end_if %>
					<div class="inner">
						<div id="benefit_$Position" class="hidden" data-title="$Title">
							$BoxText
						</div>
					</div>
				</div>
			<% end_loop %>

				
			<% loop allBenefits %>
				<% if Position = 6-2 %>
			<div id="image_6-3" style="">
				<a class="termsbtn" href="terms.html">Terms &#38; Conditions</a>
				<div id="benefit_6-3" class="hidden" data-title="$Title">
				</div>
			</div>
				<% end_if %>
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
				<li><a data-page="shopsmall" class="navbtn" href="shopsmall.html">Shop Small<sup>&reg;</sup></a>
			</ul>
				
			<div style="clear: both;"></div>
			</div>
			</div>
		</div>
		
		<img src="/assets/images/background-fashionweek.jpg" alt="" class="bg">
