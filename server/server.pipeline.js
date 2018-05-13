/**
 * 
 * 
 * @class serverPipeline
 */
class serverPipeline{
	constructor(server, request, response){
		this.request = {
			in : {
				format : "raw",
				data: {
					raw : {
						value: request
					}
				}
			},
			out : {
				format: "raw"
			}
		};

		this.data = {
			in : {
				format : "raw"
			},
			out : {
				format: "raw",
				data: {
					raw : {
						value : ""
					}
				}
			}
		};
		
		this.response = {
			in : {
				format : "raw",
				data : {
					raw: {}
				}
			},
			out: {
				format : "raw",
				data: {
					raw : {
						value: response
					}
				}
			}
		};
		this.server = server;
	}

	/**
	 * Executes pipeline - from processing the request, to processing the response.
	 * @instance serverPipeline
	 */
	async execute(){
		await this.processRequest();
		await this.formatRequest();
		await this.processData();
		await this.formatResponse();
		await this.processResponse();
	}

	/**
	 * Processes the request; currently is performing a role of a route table as well
	 * @private
	 * @async
	 * @param {any} request 
	 * @param {any} response 
	 * @param {any} server 
	 */
	processRequest(){
		let request = this.request.in.data.raw.value;
		let server = this.server;
		let response = this.response.out.data.raw.value;

		return new Promise(async (resolve,reject) =>{
			try{
				let appRequest = new Object(); // Request object to be passed to app
		
				// Determine requested path
				appRequest.requestPath = pathToArray(request.url);
		
				// Determine which app endpoint url directs to
				// FIXME: Add depth check, and endpoint logic
				var serverPath = server.routes;
				let app;
				for (
						// Set counter, maximum depth, array length, and initial traverse point to root
						let i = 0, depth = server.routesDepth, requestPathLength = appRequest.requestPath.length, serverPath = server.routes;
						// We should not go lower than contstructed routes
						i < depth;
						// Move traverse point down and iterate counter
						// NOTE: order is important
						serverPath=serverPath[appRequest.requestPath[i]], i++
					) {
					// Check if the requested path was just too short
					if(requestPathLength == i){
						throw 500;
					}
						
					// Traveling down
					if(serverPath.hasOwnProperty(appRequest.requestPath[i])){
						// Check if reached the bottom of the routes tree
						if((typeof serverPath[appRequest.requestPath[i]]) === "number"){
							app = server.apps[serverPath[appRequest.requestPath[i]]];
							break;
						}
					} else { // There is no such requested path in the intermediate node
						throw 500;
					}
				}
		
				// Throw error if url not matched
				// TODO: IF path not in array throw bad request
		
				// Match url
				// TODO: Get the url with the system function
		
				// Determine HTTP method
				var request_method = request.method;
		
				// Throw error if method is not matched
				// TODO: If method not in allowed methods throw 405 Method Not Allowed
		
				// Determine the functions to be used
				// TODO: We have some array or something, where we extract the functions to use based on method and path
		
		
				var responseData = "";
		
				// Extract POST body
				if (request_method == 'post'){
					await extractBody(request);
				}
		
				// Temp identity pathing
				console.log(request.url);
				this.request.out.app=app;
				this.request.out.appRequest=appRequest;
			} catch (thrownErrorCode) {
				let errorCode = thrownErrorCode;
		
				console.log(thrownErrorCode);
				// FIXME: Do a proper response query
				responseData = "500";
			} finally {
				// Set headers
				// TODO: ??
					resolve(true);
			}
		});
	}

	formatRequest(){
		return new Promise((resolve, reject) => {
			this.request.in.data.format = "raw";
			this.request.in.data.raw = this.request.in.data[this.request.in.format];
			resolve(true);
		});
	}
	async processData(){
		let app = this.request.out.app;
		return await app.getResource(app.getResourceByPath(this.request.in.data.raw.value.url, app.paths, this.request.out.appRequest)).then(result => this.data.out.data.raw.value=result[0]);
	}
	formatResponse(){
		return new Promise((resolve, reject) => {
			this.response.in.format = "raw";
			this.response.in.data.raw = this.data.out.data.raw;
			resolve(true);
		});
	}
	processResponse(){
		return new Promise((resolve, reject) => {
			// End response
			this.response.out.data.raw.value.end(this.response.in.data.raw.value);
		});
	}
}
/**
 * 
 * @private
 * @param {any} url 
 * @returns {Array}
 */
var pathToArray = function (url) {
	// Define array
	var pathArray = url.split("/");

	// Cache length
	let pathArrayLength = pathArray.length;

	// Ensure that there is always a "/" at the beginning
	if((pathArrayLength < 2) || (pathArray[0] != "")){
		throw 400; // Bad request, whatever
	}

	// Remove the last space is present; Array length is guaranteed to be >= 2 
	if(pathArray[pathArrayLength - 1] == ""){
		pathArray.splice(pathArrayLength - 1 , 1);
	}

	// Remove empty space from splice of first "/"; The first array element is guaranteed to be empty
	pathArray.splice(0, 1);

	return pathArray;
}

module.exports = {
	serverPipeline : serverPipeline
}