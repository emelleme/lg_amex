<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<title>SilverStripe - User Data</title>
	<link rel="stylesheet" type="text/css" href="/framework/css/GridField_print.css?m=1348013797" />
</head>
	<body onload="">
		<h3>LG - User Data</h3>
		<table>
			<thead>
				<tr><th>Date</th><th>Version</th><th>Page</th><th>Keystrokes</th></tr>
			</thead>
			<tbody>
				<% loop Data %>	
					<tr><td>$Created</td><td>$Version</td><td>$Page</td>
					<td><% if Page = benefits %><% if Keys %><% loop Keys %>$Button button click on <img src="/assets/images/$Image" height="50px"/><% if Last %><% else %> to <% end_if %><% end_loop %><% end_if %>
					<% else %><% if Keys %><% loop Keys %>$Button button  $Position<% if Last %><% else %> to <% end_if %><% end_loop %><% end_if %><% end_if %></td>
					</tr>
				<% end_loop %>
			</tbody>
		</table>
		<p>
			<br />
			Accessed by $CurrentMember.FirstName $CurrentMember.Surname
		</p>
	</body>

</html>
