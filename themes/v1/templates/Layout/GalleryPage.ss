<!-- header area (1024 x 80)-->
<section  style="padding-left:159px;" id="header-new" class="row">
	<div id="header-title" class="span6">
		<h1>$Title</h1>
		<h3>$MetaDescription</h3>
	</div>

	<% include Logo %>
</section>
<div id="gallery-area" style="position:absolute;top:129px;left:138px;">
	<!-- Full Recipes -->
	<% loop galleryPanels %>
		<div class="galleryContent" id="gallery-item-$ItemNumber">
			<div class="gallery-items">
			<div style="float: left; margin: 0 0 0 30px;">
			<h2>$Title.RAW</h2>
			<img src="assets/images/brought-to-you.png" style="margin: 6px 6px 6px 0;" alt="$Title">
			</div>
			
			<p style="float: right; margin: 12px 0 0 0;"><a class="backbtn" href="#">Back</a></p>
			
			<div style="clear: both;"></div>
			 
			<div class="full-recipe">
			$FullRecipe
			</div>

			<p id="termsconditions" style="float: right; margin: 15px 21px 0 0;"><a class="termsbtn" href="terms.html">Terms &#38; Conditions</a></p>
			<img src="assets/images/icon-mobilephone.png" style="float: left; margin: 0 9px 6px 30px;" alt="Phone">
			<p class="para-one">Text $SmsKeyword to 74642 to get this recipe and more</p>
			<p class="para-two">Message & Data rates may apply. Max 4 messages per month. To quit, text STOP to 74642.<br> 
			Not available on all carriers. Your contact information will not be sold or used for any other purposes.</p>
			</div>
		</div>
	<% end_loop %>
</div>
<div id="main-area">
	<section id="mini-gallery" class="row">
		<div id="gal" class="span12" style="width: 1037px; height: 70px; position: relative; top: 50px; left: 138px;">
		
			<div class="mini-gallery-arrow-l arrows" id="news_arrowleft">
				<img src="assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
			</div>

			<div class="row" style="margin:auto;overflow:hidden;position:absolute;left:80px;width:1000px;">
				<div style="position:relative;left:0px;width:900px">
				
				<% loop galleryPanels %>
					<div id="icon-$ItemNumber" class="span mini-image" style="background-image:url(<% if First %>$ThumbnailActive.URL<% else %>$Thumbnail.URL<% end_if %>);" data-thumbnailactive="$ThumbnailActive.URL" data-thumbnailinactive="$Thumbnail.URL"></div>
				<% end_loop %>
				</div>
			</div>

			<div class="mini-gallery-arrow-r arrows" id="news_arrowright">
				<img src="assets/images/transplaceholder.png" alt="blank" width="30" height="60" />
			</div>
		</div>
	</section>
	<section id="content-new" class="row">
		<div id="gallery-container" class="span12" style="width: 987px; height: 250px; position: absolute; top: 205px; left: 0px;">
			<div id="gallery-main" class="">
				<!-- Recipes Descriptions -->
				<% loop galleryPanels %>
				<div class="galleryContent" id="gallery-$ItemNumber" style="width: 987px; height: 250px; position: absolute; top: 0px; left: 0px;">
					<div style="float:left">$GalleryImage</div>
					<% if Content %>
						<div class="recipes-main">
							<h2>$Title.RAW</h2>
							<p>$Content.RAW</p>
							<p><span class="benton-bold">SELECT for more details</span></p>
						</div>
						<div class="sms-footer" style="width: 987px; height: 250px; position: absolute; top: 255px; left: 0px;">
							<p id="termsconditions" style="float: right; margin: 15px 36px 0 0;"><a class="termsbtn" href="terms.html">Terms &#38; Conditions</a></p>
							<img src="assets/images/icon-mobilephone.png" style="float: left; margin: 12px 9px 6px 30px;" alt="Phone">
							<p class="para-one">Text $SmsKeyword to 74642 to get this recipe and more</p>
							<p class="para-two">Message & Data rates may apply. Max 4 messages per month. To quit, text STOP to 74642.<br> 
							Not available on all carriers. Your contact information will not be sold or used for any other purposes.</p>
						</div>
					<% end_if %>
					<% if Last %>
						<div id="sync-footer">
							<p class="para-one"><img src="http://dev.amxp.cc/assets/images/icon-creditcard.png" style="float: left; margin: 6px 6px 6px 0;">Securely sync your eligible American Express Card with Facebook,<br> 
				Foursquare or Twitter at <span class="syncoffersgreen">Amex.co/syncoffers</span> for access to special<br> offers, content and experiences from top brands - no coupons required<sup>*</sup>.</p>
				<p class="para-two"><sup>*</sup>Savings will appear on your billing statement within 8 weeks after American Express receives information from the merchant<br>
				about your qualifying purchase. Corporate and all prepaid card products are not eligible. Program Terms and Conditions apply.</p>
							<p id="termsconditions" style="float: right; margin: -45px 0 0 0;"><a class="termsbtn" href="terms.html">Terms &amp; Conditions</a></p>
						</div>
					<% end_if %>
				</div>
				<% end_loop %>
			</div>
		</div>
		<!-- End gallery container -->
	</section>
</div>
<div class="navbar navbar-fixed-bottom">
			
	<div class="menubar-inner">
	<div class="container">
	  
	<ul>
		<li><a class="navbtn" href="travel.html">Travel Tips</a>
		<li class="center"><a class="navbtn" href="videos.html">Video Gallery</a>
		<li><a class="navbtn" href="cards.html">See Cards</a>
	</ul>
		
	<div style="clear: both;"></div>
	
	</div>
	</div>
</div>
