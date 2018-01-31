// master/delete.js
const events = require('events');
const serverMethods = require('./serverMethods.js');
const auxMethods = require('./auxMethods.js');
var restSyncEvent = new events.EventEmitter();

// Main function
exports.main = function(request, response){
	switch (request.method){
		case 'POST':
				serverMethods.serverPipeline(
					request,
					response,
					serverMethods.rcvPost,
					auxMethods.REST_TO_JSON,
					delete_requestProcessor,
					responseDataFormatter,
					responseProcessor,
					callback
				);
				rcvPost(request, doDelete);
			break;
		default: 
			serverMethods.serverForbidden(response);
	}
}

delete_requestProcessor = function(request_data_formatted, callback){
	// Do we start actual deletion or not
	var deletedionForbidden = false;

	// If the request is appropriate
	if(request_data_formatted.hasOwnProperty('type_target_id')){
		if(typeof request_data_formatted.type_target_id === 'number'){
			callback(null, request_data_formatted.type_target_id);
			return;
		}
	}

	// If we are here, means that one of the requirements was not met
	callback('The request is in incorrect format', null);
}

delete_responseProcessor = function(request_data_processed, callback){
	
}