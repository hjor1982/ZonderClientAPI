var urllib = require('urllib');

urllib.request('https://camfind.p.mashape.com/image_requests'
				, {
					method: 'POST'
					, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he', 'Content-Type': 'application/x-www-form-urlencoded' }
					, data: {
								'image_request[locale]': 'en_US'
								, 'image_request[remote_image_url]': 'http://autogenayaccesoriosdesinaloa.com/productos/images/stories/martillo%20oct.png'
							}
					, dataType: 'json'
				}
				, function (err, data, res) {
					  if (err) {
					    throw err; // you need to handle error
					  }
					  console.log('Reconocimiento foto:');
					  console.log('*******************');
					  console.log(res.statusCode);
					  //console.log(res.headers);
					  console.log('token='+data.token+'\n\n');
					  urllib.request('https://camfind.p.mashape.com/image_responses/'+data.token
						, {
							method: 'GET'
							, headers: { 'X-Mashape-Key': '7kgKkYLMqumshUnHQUzcbHZvxJ1Ep1pWZzdjsnXyb7UA4C79he' }
							, dataType: 'json'
						}
						, function (err, data, res) {
							  if (err) {
							    throw err; // you need to handle error
							  }
							  console.log('Resultado encontrado:');
							  console.log('********************');
							  console.log(res.statusCode);
							  //console.log(res.headers);
							  console.log('status: '+data.status);
							  console.log('name: '+data.name);
						});
				});
/*

*/
