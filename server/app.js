//	server/server.js
"use strict";
const system = require("../system/system.js"); 

// System context member
class App extends system.System{
	constructor(id, rootDir){
		// Some constants to use in functionsm centralized here
		let initDir = "settings"; // The default directory relative to app root directory for init file
		let initFilename = "init"; // The default name for an init file

		// Call parents constructor with the default parameters for the App
		super(id, rootDir, initDir, initFilename);

		this.log("Loading complete");
	}

	get endpoints () {
		return this.settings.endpoints;
	}

	// Return statusCode by the statusName
	getStatusCode (statusName) {
		// Verifies that the property exists
		if (!this.statusCodes.hasOwnProperty(statusName)){
			console.error("Status: '" + statusName + "' does not exist.");
			return (this.statusCodes["internal_server_error"].code);
		}
		return this.statusCodes[statusName].code;
	}

	// Return statusText by the statusName
	getStatusText (statusName) {
		// Verifies that the property exists
		if (!this.statusCodes.hasOwnProperty(statusName)){
			console.error("Status: '" + statusName + "' does not exist.");
			return (this.statusCodes["internal_server_error"].text);
		}
		return this.statusCodes[statusName].text;
	}

	// TODO: A function to retrieve the path by the name
	get_paths () {
		
	}

	// TODO: A function to retrieve the path by the url

	// TODO: A function to synchronize the current paths array to reverse paths array

	// A function to match the key of HTTP status code with relevant object
	getHTTPStatusCode (key){
		return 200;
	}
};

module.exports = {
	App : App
}