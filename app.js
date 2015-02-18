var sslRootCAs = require('ssl-root-cas/latest')
sslRootCAs.inject();

var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
var urllib = require('urllib');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/exactsearch/:url', function(req, res) {

	console.log('exactsearch');

	res.setHeader('Access-Control-Allow-Origin', '*');

	var pictureURL = 'http://'+req.params.url.replace(/_/g,'/');
    console.log('url='+pictureURL);

	if (pictureURL != 'http://favicon.ico') {
		urllib.request('http://api.moodstocks.com/v2/search'
					, {method: 'POST', timeout: 600000, digestAuth: 'e6vg4nj69j0hisaglkea:qAkP5as98m95iRdF', data: {'image_url': pictureURL}}
					, function (err, data, res2) {
						  if (err) {
							throw err; // you need to handle error
						  }
						  //console.log(res.statusCode);
						 // console.log(res.headers);
						  // data is Buffer instance
						 // console.log(data.toString());
						 console.log(data.toString());
						 
						 res.set({'content-type': 'application/json'}).send(data.toString());
					});
	}
});

router.get('/aproxsearch/:url', function(req, res) {

	console.log('aproxsearch');

	res.setHeader('Access-Control-Allow-Origin', '*');

	var pictureURL = 'http://'+req.params.url.replace(/_/g,'/');
    console.log('url='+pictureURL);

	if (pictureURL != 'http://favicon.ico') {
		urllib.request('https://camfind.p.mashape.com/image_requests'
						, {
							method: 'POST'
							, timeout: 600000
							, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he', 'Content-Type': 'application/x-www-form-urlencoded' }
							, data: {
										'image_request[locale]': 'es_ES'
										, 'image_request[language]': 'es'
										, 'image_request[remote_image_url]': pictureURL
									}
							, dataType: 'json'
						}
						, function (err2, data2, res2) {
							  if (err2) {
								throw err2; // you need to handle error
							  }
							  console.log('Reconocimiento foto:');
							  console.log('*******************');
							  console.log(res2.statusCode);
							  //console.log(res.headers);
							  console.log('token='+data2.token+'\n\n');
							  urllib.request('https://camfind.p.mashape.com/image_responses/'+data2.token
								, {
									method: 'GET'
									, timeout: 600000
									, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
									, dataType: 'json'
								}
								, function (err3, data3, res3) {
									  if (err3) {
										throw err3; // you need to handle error
									  }
									  console.log('Resultado encontrado:');
									  console.log('********************');
									  console.log(res3.statusCode);
									  //console.log(res.headers);
									  console.log('status: '+data3.status);
									  console.log('name: '+data3.name);
									  res.set({'content-type': 'application/json'}).send(data3);
								});
						});
	}
});


app.use(router);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});