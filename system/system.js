/**
 * system/system.js
 * @module system
 */
"use strict";
const events = require("events");
const aux = require("./system.aux.js"); // Auxiliary system lib
const path = require("path"); // Need to resolve some while loading yaml and other
const systemError = require("./system.error.js");

/**
 * Provides wide range of functionality
 * @class
 * @param {string} id - System instace internal ID
 * @param {string} rootDir - The root directory for the System instance
 * @param {string} arg_relativeInitDir - The relative directory to root of the location of the initialization file
 * @param {string} arg_initFilename - Initialization file filename
*/
class System{
	// Constructor for the file relations and data initialization basics for System
	constructor(id, rootDir, arg_relativeInitDir, arg_initFilename, behaviors){
		try{ // Try initialize instance
			// System variables
			this.system = {}; // Make a placeholder for system-specific data
			this.system.id = id; // Instance identifier
			this.system.rootDir = rootDir; // Root directory; In general expecting an absolute path
			this.system.initFilename = arg_initFilename; // Set the initial filename
			this.system.relativeInitDir = arg_relativeInitDir; // Set the relative directory for the settings file
			this.system._systemErrorLevel = 0; // Set systemErrorLevel to 0 by default
			this.system.behavior = new events.EventEmitter();

			// Initialize the behaviors
			for (var key in behaviors){
				this.system.behavior.on(key, behavior);
			}

			// Initialization recursion
			initRecursion(this, arg_relativeInitDir, arg_initFilename, this);
		} catch (error) { // Construction errors
			if (error instanceof systemError.SystemError){
				// Generally the system initialization does not need to have errors
				this.newError("warning", "System constructor expects to execute without errors");

				// Process whatever the error we had
				this.error(error);
			} else { // We do not even know what kind of error this is
				throw error;
			}
		} finally { // Finally constructor finished
			this.behave("load");
		}
	}
	/**
	 * Create and process an error 
	 * @param {string} code 
	 * @param {string} message 
	 * @memberof System
	 */
	processNewSystemError(code, message){
		this.processError(new systemError.SystemError(this, code, message));
	}
	/**
	 * Process a system error - log, behavior or further throw
	 * @param {module:systemError~error||string} error - The error described in systemErrorLevelTable.yml  
	 * @param {string=} text - Error log message
	 * @memberof System
	 */
	processError(error, text){
		// First things first, decide on how this was called
		if (error instanceof systemError.SystemError){// We process it as plain system error
			let final_text = this.system.id + ": "; // To go to std_err
			try {
				// Try to set a behavior or something...
				let behavior = this.errors[error.code].behavior;
				if(typeof behavior === "string"){
					this.behave(behavior);
				}

				// Set text for error log
				final_text += this.errors[error.code].text + " - " + error.message;
			} catch (exception){
				// Complete final text
				final_text += "Error hell." 

				// This will generate an exception out of system context since "null" as argument will generate a throw
				this.processNewSystemError(null, "Error hell");
			} finally {
				// Finaly log the error
				System.error(final_text);
			}
		} else { // We did not get the error itself, assuming we just wanted to construct a new one
			this.error(new systemError.SystemError(this, error, text));
		}
	}
	behave(event){
		this.log(event);
		this.system.behavior.emit(event);
	}

	throw(code, message){
		throw new systemError.SystemError(this, code, message);
	}

	set systemErrorLevel(key){
		// TODO: Add error interpreter. and comparison logic
		this.log("Setting error level to " + key);
		this.system._systemErrorLevel = key;
	}

	/**
	 * @instance
	 */
	get systemErrorLevel(){
		return this.system._systemErrorLevel;
	}


	/**
	 * Log message  from the System context
	 * @param {string} text - Message
	 * @memberof System
	 */
	log(text){
		System.log(this.system.id + ": " + text);
	}

	/**
	 * Static System function to access stderr
	 * @static
	 * @param {string} text
	 */
	static error(text){
		console.error("[Error] " + text);
	}
	/**
	 * 
	 * 
	 * @static
	 * @readonly
	 * @param {any} text 
	 */
	static log(text){
		console.log("[OK] " + text);
	}

	// Process nunjucks template
	static njk(data){
		return "test";
	}
}

/**
 * @private
 * @param {System} systemContext 
 * @param {object} sourceObject 
 * @param {string} sourceKey 
 * @param {object} targetObject
 * @example <caption>Default filename - null</caption> @lang yaml
 * # Variable settings to be populated with data from "./settings.yml"
 * [settings:]
 * @example <caption>Default filename - empty string</caption> @lang yaml
 * # Variable settings to be populated with data from "./settings.yml"
 * [settings: ""] 
 * @example <caption>Specified filename</caption> @lang yaml
 * # Variable settings to be populated with data from ".\xxx.yml"
 * [settings: "xxx"]
 * @example <caption>Default extension</caption> @lang yaml
 * # The "extension"(recursion) with default variables will be assumed, so that variable "settings" will be recursively populated with files located in "settings/settings.yml"
 * settings:
 *   folder:
 *   file:
 *   name:
 *   path: # Note: path may be either absolute(default) or relative(relative to the folder from which the file containing instructions is read), the system will not read files outside of system_root_dir tree.
 * @example <caption>Specified extension</caption> @lang yaml
 * # The  "extension"(recursion) with only specified variables will be performed, in this example "settings" variable will be populated with the files described in the "system_root_dir/hello/settings.yml"
 * settings:
 *   folder: "hello"
 *   file:
 *   name:
 *   path: # Note: path may be either absolute(default) or relative(relative to the folder from which the file containing instructions is read), the system will not read files outside of system_root_dir tree.
 */
var initRecursion = function(systemContext, relativePath, initFilename, targetObject){
	// Initialize the initialization file
	let initPath = path.resolve(systemContext.system.rootDir, relativePath);
	let init = initSettings(initPath, initFilename);

	// Initialize files
	for (var key in init) {
		switch (typeof init[key]){
			case "object":
			if(init[key] === null){ // Filename is same as the key
				break; 
			} else { // "Extension"
				systemContext.log("Loading... " + key);
	
				let checkDefaultDirective = function (property) {
					if (init[key].hasOwnProperty(property)){
						if ((typeof init[key][property]) === "string"){
							if (init[key][property] != "") {
								return init[key][property];
							}
						}
					}
					return key;
				}	

				let folder = checkDefaultDirective("folder");
				let file = checkDefaultDirective("file");	
				let path = "absolute";
	
				targetObject[key] = {};
				initRecursion(systemContext, folder, file, targetObject[key]);	
				return;
			}
			
			case "String": // Standard filename
			if (init[key] == ""){ // Filename is same as the key
				break;
			}
			
			// Specific filename
			targetObject[key] = initSettings(path.resolve(systemContext.system.rootDir, relativePath), init[key]);
	
			return;

			default:
			systemContext.error("critical_system_error", "Invalid intialization entry type - " + sourceKey);
		}


		// By default we are looking for the settings files to reside within the initialization folder, but this can be changed later
		targetObject[key] = initSettings(path.resolve(systemContext.system.rootDir, relativePath), key);
	}
}

// Init and populate globalspace with settings - specific global object member per file
var initSettings = function(
	initPath,
	filename // Filename, without extention; If null, then varname will be used instead
){
    try {
        // Set the global object from an argument of varname to data from YAML file with path constructed from varname; or filename, if filename provided
        return aux.loadYaml(path.join(initPath, filename));
    } catch (err) {
        console.error("Critical file not loaded - " + filename);
        // Error thrown for now. Because the caller handling of the systemErrorLevel variable does not exist yet.
        throw(err);
    }
}

module.exports = {
	System: System
}