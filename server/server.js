//	server/server.js
"use strict";
/**
 * Server module coordinates requests and apps.
 * 
 * There are two primary types:
 * 
 * - Server - is a logical representation of listener.
 * - Global server controller - is a logical representation of an interface.
 * 
 * There are following files:
 * 
 * - server/server.js
 *   - Server pipeline
 * - server/serverController.js
 *   - App distribution and initialization
 *   - Redirections, http codes processing
 * @module server
 */
const http = require("http");
const https = require("https");
const nunjucks = require("nunjucks");
const sass = require("node-sass");
const system = require("../system/system.js"); 
const serverPipeline = require("../server/server.pipeline.js");

/**
 * Server or "listener"
 * @param {module:app~App} [app=null] - App to instantiate on server creation
 */
class Server{
	// Constructor
	constructor(settings, app){
		// Init server structure
		this.apps = new Array(); // Create the app pool
		this.routes = {};　// Define app routes
		this.settings = settings; // Set settings

		// Add app if provided
		if(app){
			this.addApp(app);
		}
	}

	/**
	 * Start the server 
	 * @instance
	 */
	startServer (){
		// Create server
		this.server = http.createServer((request, response) => processRequest(request, response, this));

		// Start listening
		this.server.listen(this.settings);

		// Log the status to the console
		console.log('Server listening @ ' + this.settings.host + ':' + this.settings.port);

		/* Handling http.Server events, additional to net.Server */
		// TODO: Event: 'checkContinue'
		// TODO: Event: 'checkExpectation'

		// Event: 'clientError' - Gracefully close connection on client error; Client connection socket forwards it's error event here. The socket would be terminated if not handled.
		this.server.on('clientError', (err, socket) => {
			socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
		});

		// TODO: Event: 'connect'
		// TODO: Event: 'connection' - For some reason this is listed as additional to net.Server, but it seems it is inherited
		// TODO: Event: 'request'
		// TODO: Event: 'upgrade'

		/* Handling http.Server inherited events from net.Server */
		// TODO: Event: 'close'
		// TODO: Event: 'connection'
		// TODO: Event: 'error'
		// TODO: Event: 'listening'
	}

	/**
	 * Add an app to the server app pool
	 * @param {module:app~App} app 
	 * @instance
	 */
	addApp (app){
		// The push should go by reference
		this.apps.push(app);
		
		// Reconstruct route table
		this.reconstructRouteTable();
	}

	/**
	 * Stop and remove the app from the app pool, then reconstruct the routing table
	 * @param {module:app~App} app 
	 * @instance
	 */
	removeApp (app){
		// TODO: add removal of app code
	}

	/**
	 * Start the app from the pool
	 * @param {module:app~App} app 
	 * @instance
	 */
	startApp (app){
		// TODO: add starting of app
	}

	/**
	 * Stop the app from the pool
	 * @param {module:app~App} app 
	 * @instance
	 */
	stopApp (app){
		// TODO: add stopping of app
	}

	/**
	 * Reconstruct the routing table to correspond to the modified app pool
	 * @instance
	 */
	reconstructRouteTable (){
		// We verify locally, not centrally, the types of the endpoints array and it's elements, as this function only runs when there is a change in app pool
		// TODO: This will reconstruct the route table by which the server determines which app to use
		// FIXME: For now, we will be taking only a single endpoint from our first app
		
		// Verify that endpoints is an array
		if (typeof this.apps[0].endpoints !== "object"){
			console.error("Application endpoints corrupt.")
			throw 500;
		}

		for (var element in this.apps[0].endpoints) {
			if ((typeof element) !== "string"){
				console.error("Application endpoints corrupt.")
				throw 500;
			}
			this.routes[element] = 0;
		}

		// How deep does the route tree go down
		this.routesDepth = 1;
	}
}

async function processRequest(request, response, server){
	let pipeline = new serverPipeline.serverPipeline(server, request, response);
	await (pipeline.processRequest());
}


/** Extracts POST body from request */
var extractBody = function(request){ 
	return new Promise(function(resolve, reject){
		// Hold POST request data
		var postData = '';

		/* Handling http.IncomingMessage events of additional to stream.Readable */
		// Event: 'close'

		// Event: 'data' - Get the data from body
		request.on('data', function (data) {
			postData += data;
			
			// We do have some post limit, actually let it be 64KB
			// if size of req_postData exceeds 64KB reject with 413 Payload Too Large
		});

		// Event: 'end' - When the transmission ended
		request.on('end', function () {
			resolve(postData);
		});

		// TODO: Event: 'error'
		// TODO: Event: 'readable'

		/* Handling http.IncomingMessage events inherited from stream.Readable */
		// TODO: Event: 'aborted'
		// TODO: Event: 'close'
	});
}

module.exports = {
	Server : Server
}