<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Experience the Benefits</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require themedCSS(countdown-mosaic) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.js) %>
<% require javascript(themes/v1/javascript/swfobject/swfobject.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/mp/jwplayer.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/common.js) %>
<% require javascript(themes/v1/javascript/mosaic.js) %>
<% require javascript(themes/v1/javascript/play.js) %>
<% include Analytics %>

</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
<script type="text/javascript">
$(document).ready(function() {
	$('#livePlayer').show();
});
$('.backbtn').on('click',function(e){
		$('#beforeImage').hide();
		curLevel = level.MOSAIC;
		//jwplayer().stop();
		$('body').css('padding-top','48px');
		console.log('closed');
	});
	$('#closeVideo').on('click',function(e){
		$('#livePlayer').hide();
		curLevel = level.MOSAIC;
		console.log('closed');
	});
</script>
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<div id="livePlayer" class="videoModal">
		<div>
			<span><img src="assets/images/amex-txt.png" alt="AMEX LOGO" /> <span id="presents">Presents</span>
			<span class="controls"><a id="closeVideo" href="#">BACK</a></span></span>
			<div id="mediaspace">
				<div id="ytapiplayer">
				
				</div>
				
  			</div>
  			<div id="moreVideo">
	  			<h2><strong>GO TO</strong></h2>
	  			<p>youtube.com/AmericanExpress<br />
	  			TO SEE MORE</p>
  			</div>

  			<div id="checkBack">
  				<p><span style="font-family:BentonSansBold;font-size: 18px;">Check Back</span><br>
  				for more exclusive<br>
  				unstaged events</p>
				</div>

				<div style="clear: both;"></div>
  			</div>
	</div>
	<div id="wrapper" class="container">
		 <!--App Container (1025 x 576) -->
		$Layout
		
		<% include Footer %>
		
	</div>
</body>
</html>
