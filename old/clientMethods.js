/* Globals */
const https = require('https');
const sitename = 'example.com';
const events = require('events');
var restSyncEvent = new events.EventEmitter();

// Sends the POST request, and calls back with status code and response data
exports.sendPOST = function(post_path, post_data, callback/* args:statusCode, res_data*/){
	// Declare the POST options
	var post_options = {
		hostname: sitename,
		port    : '443',
		path    : post_path,
		method  : 'POST',
		headers : {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(post_data, 'utf8')
		}
	};

	// Perform the request
	var post_req = https.request(post_options, function (response) {
		// Hold POST response data
		var res_data = '';

		response.on('data', function (data) {
			// Seems this bit required to run
			res_data += data;
		});

		response.on('end', function(){
			callback(response.statusCode, res_data);
		});
	});
}

// Sends the GET request, and calls back returned data as an array
exports.sendGet = function(get_path, callback/* args:statusCode, res_data*/){
	/*
		About:
		This is a combo function that is quickly written to perform specific small operations of getting data from a website.
		Ideally, these operations should be done via the client pipeline, similarly to the server pipline.
		But due to time constraints, it will be a unified straightforward function, especially since currently there are only two places where the client methods are to be used.
	*/

	// Declare the GET options
	var post_options = {
		hostname: sitename,
		port: '443',
		path: get_path,
		method: 'GET'
	};

	// Holds the body reply from the pool
	var response_body = "";

	// Request for a pool
	var request = https.request(options, function (response) {
		// The readable.setEncoding() method sets the character encoding for data read from the Readable stream.
		res.setEncoding('utf8');
		response.on('data', function (chunk) {
			pool_body+=chunk;
		});
		response.on('end',function(){
			callback(response_body);
		});
	});

	request.end();
}

exports.getView = function(view_path, callback){
	sendGet(view_path, function(response_body){
		var response_JSON = (JSON.parse(response_body));
		callback(response_JSON);
	})
}