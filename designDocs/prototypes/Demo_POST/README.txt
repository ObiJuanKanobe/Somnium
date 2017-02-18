NOTE: in POST requests 
-use body in the request object (instead of query which is used for GET)
ex:
	var express = require('express');
	var plaid = require('plaid');
	var app = express();
	(...)
	app.post('/accounts', function(req, res, next) {
	var public_token = req.body.public_token;

So, app.post uses req.body.public_token;
whereas app.get uses req.query.public_token (because in a get the information is taken out of a query string in the url)

Also worth noting:
	in the accounts.html (the page that displays the data returned from plaid) under type: this field must be 
changed from 'GET' to 'POST'. Took me a long time to figure that one out.