<div id="mainArea">
			<!-- header area (1024 x 80)-->
			<section  style="padding-left:128px;" id="header-new" class="row">
				<div id="header-title" class="span6">
					<h1>Experience Membership.</h1>
					<h3>Use your remote to explore the benefits.</h3>
				</div>

				<% include Logo %>
			</section>

			<section id="content-new" class="row">
				<div id="wing-low">
					<div class="uguu"></div>
					<div class="ugum"></div>
					<div class="uguv"></div>
				</div>
				
				<div id="main-copy" class="span4">

				</div>

				<div id="main-mosaic" class="span6">
					<div id="imageMosaic">
						<div id="image_1-1" class="disabledmosaicImage" style="">
						</div>
						<div id="image_2-3" class="disabledmosaicImage" style="">
						</div>
						<div id="image_disabled" class="disabledmosaicImage" style="">
						</div>

				<% loop allBenefits %>
						<div id="image_$Position" class="mosaicImage" style="">
						<% if CurrentMember %>
						<span><a href="admin/benefits/Benefit/EditForm/field/Benefit/item/$ID" target="_blank" style="background-color:#0063B2;color:#fff">$Position<img src="assets/images/edit.png" /></a></span>
						<% end_if %>
							<div class="inner">
								<div id="benefit_$Position" class="hidden">
									<div class="benefit-title">
										<h2>$Title.RAW</h2>
									</div>
									<div class="benefit-description">
										<h4>$Description.RAW</h4>
									</div>
									<div id="twitter_$Position" class="blue-box">
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

						<div id="image_6-3" style="">
							<a class="termsbtn" href="lg/terms">
								Terms &#38; Conditions
							</a>
							<% loop allBenefits %>
							<% if Position = 6-2 %>
							<div id="benefit_6-3" class="hidden">
								<div class="benefit-title">
									<!--<img alt="Welcome In." src="assets/images/entertainmentaccess.png"/>-->
									<h2>$Title.RAW</h2>
								</div>
								<div class="benefit-description">
									<!--<img alt="Welcome In." src="assets/images/entertainmentaccess_bodycopy.png"/>-->
									<h4>$Description.RAW</h4>
								</div>
								<div id="twitter_$Position" class="blue-box">
									<div class="twitter-text">
										<!--<img alt="Welcome In." src="assets/images/entertainmentaccess_tweet.png"/>-->
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
				</div>
			</section>

			
		</div>
