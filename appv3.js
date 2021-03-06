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

function sleep(ms)
{
	var stop = new Date().getTime();
	//console.log('entro a sleep:' + stop);
	var i = 0;
	while (new Date().getTime() < stop + ms) {
		i++;
	}
	//console.log('salio de sleep:' + (stop + ms));
	return true;
}

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
										'image_request[locale]': 'en_US'
										, 'image_request[language]': 'en'
										, 'image_request[remote_image_url]': pictureURL
									}
							, dataType: 'json'
						}
						, function (err2, data2, res2) {
							  if (err2) {
								throw err2; // you need to handle error
							  }
							  console.log('Reconocimiento foto:');
							  console.log('-------------------');
							  console.log(res2.statusCode);
							  //console.log(res.headers);
							  console.log('token='+data2.token+'\n\n');
							  sleep(2000);
							  urllib.request('https://camfind.p.mashape.com/image_responses/'+data2.token
								, {
									method: 'GET'
									, timeout: 60000
									, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
									, dataType: 'json'
								}
								, function (err3, data3, res3) {
									  if (err3) {
										throw err3; // you need to handle error
									  }
									  console.log('Resultado encontrado reintento 1:');
									  console.log('--------------------------------');
									  console.log(res3.statusCode);
									  //console.log(res.headers);
									  console.log('status: '+data3.status);
									  console.log('name: '+data3.name);
									  if (data3.status != 'not completed')
									  	{res.set({'content-type': 'application/json'}).send(data3);}
									  else
									  {
										  sleep(5000);
										  urllib.request('https://camfind.p.mashape.com/image_responses/'+data2.token
											, {
												method: 'GET'
												, timeout: 60000
												, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
												, dataType: 'json'
											}
											, function (err4, data4, res4) {
												  if (err4) {
													throw err4; // you need to handle error
												  }
												  console.log('Resultado encontrado reintento 2:');
												  console.log('--------------------------------');
												  console.log(res4.statusCode);
												  //console.log(res.headers);
												  console.log('status: '+data4.status);
												  console.log('name: '+data4.name);
												  if (data4.status != 'not completed')
												  	{res.set({'content-type': 'application/json'}).send(data4);}
												  else
												  {
													  sleep(5000);
													  urllib.request('https://camfind.p.mashape.com/image_responses/'+data2.token
														, {
															method: 'GET'
															, timeout: 60000
															, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
															, dataType: 'json'
														}
														, function (err5, data5, res5) {
															  if (err5) {
																throw err5; // you need to handle error
															  }
															  console.log('Resultado encontrado reintento 3:');
															  console.log('--------------------------------');
															  console.log(res5.statusCode);
															  //console.log(res.headers);
															  console.log('status: '+data5.status);
															  console.log('name: '+data5.name);
															  if (data5.status != 'not completed')
															  	{res.set({'content-type': 'application/json'}).send(data5);}
															  else
															  {
																  sleep(5000);
																  urllib.request('https://camfind.p.mashape.com/image_responses/'+data2.token
																	, {
																		method: 'GET'
																		, timeout: 60000
																		, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
																		, dataType: 'json'
																	}
																	, function (err6, data6, res6) {
																		  if (err6) {
																			throw err6; // you need to handle error
																		  }
																		  console.log('Resultado encontrado reintento 4:');
																		  console.log('--------------------------------');
																		  console.log(res6.statusCode);
																		  //console.log(res.headers);
																		  console.log('status: '+data6.status);
																		  console.log('name: '+data6.name);
																		  if (data6.status != 'not completed')
																		  	{res.set({'content-type': 'application/json'}).send(data6);}
																		  else
																		  {
																			  sleep(5000);
																			  urllib.request('https://camfind.p.mashape.com/image_responses/'+data2.token
																				, {
																					method: 'GET'
																					, timeout: 60000
																					, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
																					, dataType: 'json'
																				}
																				, function (err7, data7, res7) {
																					  if (err7) {
																						throw err7; // you need to handle error
																					  }
																					  console.log('Resultado encontrado reintento 5:');
																					  console.log('--------------------------------');
																					  console.log(res7.statusCode);
																					  //console.log(res.headers);
																					  console.log('status: '+data7.status);
																					  console.log('name: '+data7.name);
																					  if (data7.status != 'not completed')
																					  	{res.set({'content-type': 'application/json'}).send(data7);}
																					  else
																					  {
																						  sleep(5000);
																						  urllib.request('https://camfind.p.mashape.com/image_responses/'+data2.token
																							, {
																								method: 'GET'
																								, timeout: 60000
																								, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
																								, dataType: 'json'
																							}
																							, function (err8, data8, res8) {
																								  if (err8) {
																									throw err8; // you need to handle error
																								  }
																								  console.log('Resultado encontrado reintento 6:');
																								  console.log('--------------------------------');
																								  console.log(res8.statusCode);
																								  //console.log(res.headers);
																								  console.log('status: '+data8.status);
																								  console.log('name: '+data8.name);
																								  if (data8.status != 'not completed')
																									{res.set({'content-type': 'application/json'}).send(data8);}
																								  else
																								  {
																									  sleep(5000);
																									  urllib.request('https://camfind.p.mashape.com/image_responses/'+data2.token
																										, {
																											method: 'GET'
																											, timeout: 60000
																											, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
																											, dataType: 'json'
																										}
																										, function (err9, data9, res9) {
																											  if (err9) {
																												throw err9; // you need to handle error
																											  }
																											  console.log('Resultado encontrado reintento 7:');
																											  console.log('--------------------------------');
																											  console.log(res9.statusCode);
																											  //console.log(res.headers);
																											  console.log('status: '+data9.status);
																											  console.log('name: '+data9.name);
																											  if (data9.status != 'not completed')
																												{res.set({'content-type': 'application/json'}).send(data9);}
																											  else
																											  {
																												  sleep(5000);
																												  urllib.request('https://camfind.p.mashape.com/image_responses/'+data2.token
																													, {
																														method: 'GET'
																														, timeout: 60000
																														, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
																														, dataType: 'json'
																													}
																													, function (err10, data10, res10) {
																														  if (err10) {
																															throw err10; // you need to handle error
																														  }
																														  console.log('Resultado encontrado reintento 8:');
																														  console.log('--------------------------------');
																														  console.log(res10.statusCode);
																														  //console.log(res.headers);
																														  console.log('status: '+data10.status);
																														  console.log('name: '+data10.name);
																														  if (data10.status != 'not completed')
																															{res.set({'content-type': 'application/json'}).send(data10);}
																														  else
																														  {
																															  sleep(5000);
																															  urllib.request('https://camfind.p.mashape.com/image_responses/'+data2.token
																																, {
																																	method: 'GET'
																																	, timeout: 60000
																																	, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
																																	, dataType: 'json'
																																}
																																, function (err11, data11, res11) {
																																	  if (err11) {
																																		throw err11; // you need to handle error
																																	  }
																																	  console.log('Resultado encontrado reintento 9:');
																																	  console.log('--------------------------------');
																																	  console.log(res11.statusCode);
																																	  //console.log(res.headers);
																																	  console.log('status: '+data11.status);
																																	  console.log('name: '+data11.name);
																																	  if (data11.status != 'not completed')
																																		{res.set({'content-type': 'application/json'}).send(data11);}
																																	  else
																																	  {
																																		  sleep(5000);
																																		  urllib.request('https://camfind.p.mashape.com/image_responses/'+data2.token
																																			, {
																																				method: 'GET'
																																				, timeout: 60000
																																				, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
																																				, dataType: 'json'
																																			}
																																			, function (err12, data12, res12) {
																																				  if (err12) {
																																					throw err12; // you need to handle error
																																				  }
																																				  console.log('Resultado encontrado reintento 10:');
																																				  console.log('--------------------------------');
																																				  console.log(res12.statusCode);
																																				  //console.log(res.headers);
																																				  console.log('status: '+data12.status);
																																				  console.log('name: '+data12.name);
																																				  res.set({'content-type': 'application/json'}).send(data12);
																																			});
																																	  }
																																});
																														  }
																													});
																											  }
																										});
																								  }
																							});

																					  }
																				});

																		  }
																	});

															  }
														});

												  }
											});
									  }
								});
						});
	}
});


app.use(router);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});