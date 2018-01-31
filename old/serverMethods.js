/* Globals */
const https = require('https');
const sitename = 'example.com';

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

exports.serverForbidden = function(response){
	var response_data = '<html><body>403 Forbidden</html></body>'
	response.writeHead(401, {'Content-Type': 'text/html; charset=utf-8'});
	response.end(response_data);
}

// An entrypoint for a pipeline to handle the response and request data for the request to the server
exports.serverPipeline = function(
	request,
	response,
	rcvFunction,
	requestDataFormatter,
	requestProcessor,
	responseDataFormatter,
	responseProcessor
){
	// Send the response data to the client
	function pipeRespond(code, response_data_formatted){
		var response_data = '<html><body>' + response_data_formatted + '</html></body>'
		response.writeHead(code, {'Content-Type': 'text/html; charset=utf-8'});
		response.end(response_data);
	}

	// Process successful response
	function pipeSuccess(response_data_formatted){
		respond(200, response_data_formatted);
	}

	// Process failed response
	function pipeFail(response_data_formatted){
		respond(500, response_data_formatted);
	}

	// Declare the response body
	var response_body = '';

	// Start the pipeline; Implemented as anonymous functions callbacks, to let the error handling be centralized / allow more flexibility in functionality / save time
	rcvFunction(request, function(err, request_data){
		if(err){
			pipeFail(err);
		} else{
			requestDataFormatter(request_data, function(err, request_data_formatted){
				if(err){
					pipeFail(err);
				} else{
					requestProcessor(request_data_formatted, function(err, request_data_processed){
						if(err){
							pipeFail(err);
						} else{
							responseProcessor(request_data_processed, function(err, response_data_processed){
								if(err){
									pipeFail(err);
								} else{
									responseDataFormatter(response_data_processed, function(err, response_data_formatted){
										if(err){
											pipeFail(err);
										} else{
											pipeSuccess(response_data_formatted);
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