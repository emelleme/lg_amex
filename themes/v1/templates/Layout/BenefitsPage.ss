<div id="mainArea">
	<!-- header area (1024 x 80)-->
	<section  style="padding-left:128px;" id="header-new" class="row">
		<div id="header-title">
			<h1>Holiday Travel Made Easy.</h1>
			<h3>Use your remote to explore helpful travel tips.</h3>
		</div>

		<div id="header-logo" style="margin:0px 0px 0px 0px">
		<img src="http://dev.amxp.cc/assets/images/logo.png" alt="Founding Partner">
		</div>
	</section>

	<section id="content-new" class="row">
		<div id="wing-low">
			<div class="uguu"></div>
			<div class="ugum"></div>
			<div class="uguv"></div>
		</div>
		
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
						<div id="benefit_$Position" class="hidden">
							<div class="benefit-title">
								<h2 style="color: $BoxColor;">$Title.RAW</h2>
							</div>
							<div class="benefit-description">
								<h4>$Description.RAW</h4>
							</div>
							<div id="twitter_$Position" class="$BoxClass">
								<div class="twitter-text">
									<p>$BoxText</p>
								</div>
							</div>
							<% if LegalCopy %>
							<div class="legalcopy">
							$LegalCopy.RAW
							</div>
							<% end_if %>
						</div>
					</div>
				</div>
			<% end_loop %>

				
			<% loop allBenefits %>
			<div id="image_6-3" style="" data-wingcolor="$WingColor">
				<a class="termsbtn" href="terms.html">Terms &#38; Conditions</a>
				<% if Position = 6-2 %>
				<div id="benefit_6-3" class="hidden">
					<div class="benefit-title">
						<!--<img alt="Welcome In." src="http://dev.amxp.cc/assets/images/entertainmentaccess.png"/>-->
						<h2 style="color: $BoxColor;">$Title.RAW</h2>
					</div>
					<div class="benefit-description">
						<!--<img alt="Welcome In." src="http://dev.amxp.cc/assets/images/entertainmentaccess_bodycopy.png"/>-->
						<h4>$Description.RAW</h4>
					</div>
					<div id="twitter_$Position" class="$BoxClass">
						<div class="twitter-text">
							<!--<img alt="Welcome In." src="http://dev.amxp.cc/assets/images/entertainmentaccess_tweet.png"/>-->
							<p>$BoxText.RAW</p>
						</div>
					</div>

					<div class="legalcopy">
						$LegalCopy.RAW
					</div>
				</div>
				<% end_if %>
			<% end_loop %>
			</div>
				
	</div>
	</section>	
</div>
<div class="navbar navbar-fixed-bottom">
			<div class="menubar-inner">
			<div class="container">
			<ul>
				<li><a class="navbtn" href="videos.html">Video Gallery</a>
				<li class="center"><a class="navbtn" href="recipes.html">Party Recipes</a>
				<li><a class="navbtn" href="cards.html">See Cards</a>
			</ul>
				
			<div style="clear: both;"></div>
			</div>
			</div>
		</div>
