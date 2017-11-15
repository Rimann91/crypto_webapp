'use strict';

const express = require('express'),
	request = require('request'),
	app = express();
	//get_data = require('./modules/get_data.js');

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');


app.get('/', function(req, res){
	let usrOption = req.query.pair || 'btcusd';
	console.log(usrOption);
	request({
		url:`https://api.cryptowat.ch/markets/gdax/${usrOption}`,
		timeout:25000, 
		method: 'GET' 
	
	}, function(error, scode, body){
		console.log('error:', error);
		console.log('statusCode: ',res.scode);
		console.log(body);

		let data = JSON.parse(body);

		request({
			url: `https://api.cryptowat.ch/markets/gdax/${usrOption}/price`,
			timeout: 15000,
			method: 'GET'
		},
		function(error2, scode2, body2){

			let priceData = JSON.parse(body2);


			request({
				url: `https://api.cryptowat.ch/markets/gdax/${usrOption}/summary`,
				timeout: 15000,
				method: 'GET' 
			},
			function(error3, scode3, body3){

				let summaryData = JSON.parse(body3);
				res.render('btc-usd', {
					data: JSON.stringify(data.result),
					exchange: data.result.exchange,
					pair: data.result.pair,
					price: priceData.result.price ,
					last: summaryData.result.price.last,
					high: summaryData.result.price.high,
					low: summaryData.result.price.low,
					percentage: summaryData.result.price.change.percentage,
					absolute: summaryData.result.price.change.absolute
				});


			});
		});
				
	});

});

const server = app.listen(3333, function(){
	console.log(`server started on port ${server.address().port}`);
});
