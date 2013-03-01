<!DOCTYPE html>
<html>
<head lang="en">
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Video Gallery</title>
<% require themedCSS(bootstrap) %>
<% require themedCSS(layout) %>
<% require themedCSS(gallery) %>
<% require themedCSS(videos) %>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular.min.js" ng:autobind></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular-resource.min.js"></script>
<% require javascript(http://code.jquery.com/jquery-1.7.2.min.js) %>
<% require javascript(themes/v1/javascript/keycode.js) %>
<% require javascript(themes/v1/javascript/preloadCssImages.jQuery_v5.js) %>
<% require javascript(themes/v1/javascript/angular.videos.js) %>
<% include Analytics %>
</head>
<body style="margin: 0px;" onkeydown="keyDown(event);" ng-app="project">
	<div ng-view></div>
</body>
</html>
