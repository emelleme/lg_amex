<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>$Title</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require themedCSS(countdown-mosaic) %>
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/flick/jquery-ui.css" type="text/css" />
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/common.js) %>
<% require javascript(themes/v1/javascript/mosaic.js) %>
<% include Analytics %>
<script type="text/javascript">

</script>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<div id="wrapper" class="container">
		 <!--App Container (1025 x 576) -->
		
		$Layout
		 
	</div>
</body>
</html>
