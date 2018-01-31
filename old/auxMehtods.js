/* Globals */
const https = require('https');

exports.REST_to_JSON = function(request_data, callback){
	var rcv_data=JSON.parse(rcv_postData);
	callback(null, rcv_data);
}

exports.synchronous = function(callback1, callback2){
	for a to b
	callback1(emitter);

	callback2();
}