// system/system.js
"use strict"; // Why not
const aux = require("./system.aux.js"); // Auxiliary system lib
const path = require("path"); // Need to resolve some while loading yaml and other
var md = require('markdown-it')(); // Presumabely constructs new instance, thus var

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
			this.error("Super mega error encountered");
		} catch (error) {
			// Some logging and what not
			this.error("Could not construct system class object.");
			this.System._systemErrorLevel = 666;
			return
		}
	}
	set systemErrorLevel(key){
		this.System._systemErrorLevel = key;
	}
	get systemErrorLevel(){
		return this.System._systemErrorLevel;
	}

	// Log an error
	error(text){
		System.error(this.System.id + ": " + text);
	}

	// Log
	log(text){
		System.log(this.System.id + ": " + text);
	}

	// Print to stderr
	static error(text){
		console.error("[Error] " + text);
	}

	// Print to stdout
	static log(text){
		console.log("[OK] " + text);
	}

	// Process markdown
	static md(data){
		// Test process extra MD
		return md.render('### parsed from MD');
	}

	// Process nunjucks template
	static njk(data){
		return "test";
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

module.exports = {
	System: System
}