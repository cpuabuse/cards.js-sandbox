// Process the incoming POST request, and call the callback with the retrieved raw data
exports.rcvPost = function(request, callback/* args:err, rcv_postData */){
	// Hold POST request data
	var req_postData = '';

	/* Handling http.IncomingMessage events of additional to stream.Readable */
	// Event: 'close'

	// Event: 'data' - Get the data from body
	request.on('data', function (data) {
		req_postData += data;
	});
	
	// Event: 'end' - When the transmission ended
	request.on('end', function () {
		callback(null, req_postData);
	});

	// Event: 'error'
	// Event: 'readable'

	/* Handling http.IncomingMessage events inherited from stream.Readable */
	// Event: 'aborted'
	// Event: 'close'
}

//
exports.rcvGet = function(request, callback/* args:err, rcv_getData */){
	
}
