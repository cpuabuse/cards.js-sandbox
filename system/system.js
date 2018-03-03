// system/system.js
"use strict"; // Why not
const aux = require("./system.aux.js"); // Auxiliary system lib
const path = require("path"); // Need to resolve some while loading yaml and other

class System{
	// Constructor for the file relations and data initialization basics for System
	constructor(id, rootDir, arg_relativeInitDir, arg_initFilename){
		try{
			// System variables
			this.System = {}; // Make a placeholder for system-specific data
			this.System.id = id; // Instance identifier
			this.System.rootDir = rootDir; // Root directory; In general expecting an absolute path
			this.System.initFilename = arg_initFilename; // Set the initial filename
			this.systemErrorLevel = 0; // Set systemErrorLevel to 0 by default

			// Initialize the initialization file
			let initPath = path.resolve(rootDir, arg_relativeInitDir);
			this.System.init = initSettings(initPath, arg_initFilename);

			// Initialize files
			for (var setting in this.System.init) {
				// By default we are looking for the settings files to reside within the initialization folder, but this can be changed later
				this[setting] = initSettings(initPath, setting, this.System.init[setting]);
			}
		} catch (error) {
			// Some logging and what not
			console.error("Could not construct system class object.");
			this.System._systemErrorLevel = 666;
			throw(error);
		}
	}
	set systemErrorLevel(key){
		this.System._systemErrorLevel = key;
	}
}


// Init and populate globalspace with settings - specific global object member per file
var initSettings = function(
	initPath,
	varname,
	filename // Filename, without extention; If null, then varname will be used instead
){
	console.log(initPath+ varname+ filename);
    try {
        // Set the global object from an argument of varname to data from YAML file with path constructed from varname; or filename, if filename provided
        return aux.loadYaml(path.join(initPath, (filename?filename:varname)));
    } catch (err) {
        console.error("Critical file not loaded for " + varname);
        // Error thrown for now. Because the caller handling of the systemErrorLevel variable does not exist yet.
        throw(err);
    }
}

// System context member
class App extends System{
	constructor(id, rootDir){
		// Some constants to use in functionsm centralized here
		let initDir = "settings"; // The default directory relative to app root directory for init file
		let initFilename = "init"; // The default name for an init file

		// Call parents constructor with the default parameters for the App
		super(id, rootDir, initDir, initFilename);
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