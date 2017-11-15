'use strict';

(function(){
	let get_data = {},
		request = require('request'),
		express = require('express'),
		app = express();

	get_data.summary = function(error, scode, body){
		
		console.log('error:', error);
		console.log('statusCode: ',scode);
		console.log(body);

		let data = JSON.parse(body);
		return data;
	};

	get_data.price = function(){};


	return module.exports = get_data;
})();
