<% if $SiteConfig.DevAnalytics = 1 %>
<% require javascript(themes/v1/javascript/dev-analytics.js) %>
<% else %>
<% require javascript(themes/v1/javascript/analytics.js) %>
<% end_if %>