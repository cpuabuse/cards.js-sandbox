async function processRequest(request){
	try{
		// Determine path
		var path = request.url;

		// Determine HTTP method
		var method = request.method;
		
		// Extract POST body
		await new Promise(function(resolve, reject){
			// Process chunk extraction
		});

		await requestFormatter;
		await dataProcessing;
		await responseFormatter;
		
	} catch (errorCode) {

	} finally {
		await processResponse;
	}

}