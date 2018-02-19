async function processRequest(request){
	try{
		// Determine path
		var path = request.url;

		// Throw error if url not matched
		// IF path not in array throw bad request

		// Match url
		// Get the url with the system function

		// Determine HTTP method
		var method = request.method;

		// Throw error if method is not matched
		// If method not in allowed methods throw 405 Method Not Allowed

		// Determine the functions to be used
		// We have some array or something, where we extract the functions to use based on method and path
		
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
		
		var formattedData = await requestFormatter();
		var processedData = await dataProcessing(formattedData);
		var responseData = await responseFormatter(processedData);
		
	} catch (thrownErrorCode) {
		errorCode = thrownErrorCode;
	} finally {
		await processResponse({responseData, errorCode});
	}
}