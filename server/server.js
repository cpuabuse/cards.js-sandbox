//	server/server.js
const http = require('http');
const https = require('https');
const nunjucks = require('nunjucks');

exports.server = function(){
	// TODO: Make somehow an event or something to die, if system error level is too high


	const server = http.createServer(function (request, response) {
		// TODO: Reject request if systemErrorLevelHigh
		
		// Process request
		processRequest(request, response);
	});

	// Start listening
	server.listen(8080);

	// Log the status to the console
	console.log('Server running at *:8080');

	/* Handling http.Server events, additional to net.Server */
	// Event: 'checkContinue'
	// Event: 'checkExpectation'

	// Event: 'clientError' - Gracefully close connection on client error; Client connection socket forwards it's error event here. The socket would be terminated if not handled.
	server.on('clientError', (err, socket) => {
		socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
	});

	// Event: 'connect'
	// Event: 'connection' - For some reason this is listed as additional to net.Server, but it seems it is inherited
	// Event: 'request'
	// Event: 'upgrade'

	/* Handling http.Server inherited events from net.Server */
	// Event: 'close'
	// Event: 'connection'
	// Event: 'error'
	// Event: 'listening'
}

// Processes the request
async function processRequest(request, response){
	try{
		// Determine path
		var path = request.url;

		// Throw error if url not matched
		// TODO: IF path not in array throw bad request

		// Match url
		// TODO: Get the url with the system function

		// Determine HTTP method
		var method = request.method;

		// Throw error if method is not matched
		// TODO: If method not in allowed methods throw 405 Method Not Allowed

		// Determine the functions to be used
		// TODO: We have some array or something, where we extract the functions to use based on method and path


		var responseData = "Hello world";
		nunjucks.render('./templates/angular.twig', function(err,result){
			console.log(result);
		});
		// Extract POST body
		if (method == 'post'){
			await new Promise(function(resolve, reject){
				// Hold POST request data
				var req_postData = '';

				/* Handling http.IncomingMessage events of additional to stream.Readable */
				// Event: 'close'

				// Event: 'data' - Get the data from body
				request.on('data', function (data) {
					req_postData += data;
					
					// We do have some post limit, actually let it be 64KB
					// if size of req_postData exceeds 64KB reject with 413 Payload Too Large
				});

				// Event: 'end' - When the transmission ended
				request.on('end', function () {
					resolve(req_postData);
				});

				// Event: 'error'
				// Event: 'readable'

				/* Handling http.IncomingMessage events inherited from stream.Readable */
				// Event: 'aborted'
				// Event: 'close'
			});
		}
		/*
		var formattedData = await requestFormatter();
		var processedData = await dataProcessing(formattedData);
		var responseData = await responseFormatter(processedData);
		*/
	} catch (thrownErrorCode) {
		errorCode = thrownErrorCode;
		responseData = "";
	} finally {
		// Set headers
		// TODO: ??

		// End response
		response.end(responseData);
	}
}