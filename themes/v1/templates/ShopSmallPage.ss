<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Sync to Buy</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular.min.js" ng:autobind></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular-resource.min.js"></script>
<script type="text/javascript" src="http://www.google.com/jsapi?sensor=true&key=AIzaSyA8nm-oVmptUiIvW3NJJE_bXk54nfMHjmk"></script>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/jquery.countdown.js) %>
<% require javascript(themes/v1/javascript/common.js) %>
<% require javascript(themes/v1/javascript/card.js) %>
<% include Analytics %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);" ng-app="project">
	<!-- App Wrapper: 1280px x 720 (full application size) -->
	<div id="wrapper" class="container">
	<div ng-view></div>
	</div>
	<!-- /wrapper -->

</body>
</html>