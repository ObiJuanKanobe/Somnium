'use strict'

var express = require('express');
var plaid = require('plaid');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

//hard-coded port, user name, user 'secret':
var A_PORT = 8080;
var CLIENT_ID = "test_id";
var PLAID_SECRET = "test_secret";

var plaidClient = 
	new plaid.Client(CLIENT_ID, PLAID_SECRET, plaid.environments.tartan);


app.use(express.static('public'));	

app.post('/accounts', function(req, res, next) {
	var public_token = req.body.public_token;

	plaidClient.exchangeToken(public_token, function(err, tokenResponse) {
		if (err != null) {
			console.log("error: " + err);
		}
		else {
			var access_token = tokenResponse.access_token;

			plaidClient.getAuthUser(access_token, function(err, authResponse) {
				if (err != null) {
					console.log("error: " + err);
				}
				else {
					res.json({accounts: authResponse.accounts});
				}
			});

			plaidClient.getConnectUser(access_token, {
				gte: '30 days ago',
			}, function(err, response) {
				console.log('you have ' + response.transactions.length + 'transactions from the last 30 days');
			});
		}
	});
});

var server = app.listen(A_PORT, function() {
	console.log('listening at port ' + String(A_PORT));
});
