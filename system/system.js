/**
 * system/system.js
 * @module system
 */
"use strict";
const events = require("events");
const loader = require("./system.loader.js"); // Auxiliary system lib
const systemError = require("./system.error.js");

/**
 * Provides wide range of functionality
 * @class
 * @extends module:system~Loader
 * @param {string} id - System instace internal ID
 * @param {string} rootDir - The root directory for the System instance
 * @param {string} arg_relativeInitDir - The relative directory to root of the location of the initialization file
 * @param {string} arg_initFilename - Initialization file filename
 * @param {object=} behaviors - [Optional] Behaviors to add in format `{"behavior_name":()=>{function_body}}`.
*/
class System extends loader.Loader{
	// Constructor for the file relations and data initialization basics for System
	constructor(id, rootDir, arg_relativeInitDir, arg_initFilename, behaviors){
		// First things first, call a loader, if loader has failed, there are no tools to report gracefully, so will have to just rethrow a standard error(which super generates), same as "error hell"
		super(rootDir, arg_relativeInitDir, arg_initFilename);

		let load_failed = false; // Changes to true if failure happend during loading
		try{
			// System variables
			this.system = {}; // Make a placeholder for system-specific data
			this.system.id = id; // Instance identifier
			this.system.rootDir = rootDir; // Root directory; In general expecting an absolute path
			this.system.initFilename = arg_initFilename; // Set the initial filename
			this.system.relativeInitDir = arg_relativeInitDir; // Set the relative directory for the settings file
			this.system.behaviorsDelayed = true;
			this.system.behavior = new events.EventEmitter();

			// Initialize the behaviors; If behaviors not provided as argument, it is OK
			this.addBehaviors(behaviors);
		} catch (error) { // Construction errors
			load_failed = true;
		} finally { // Finally constructor finished
			// Postponing till constructor is finished
			setImmediate(() => {
				this.behave(load_failed?"system_load_fail":"system_load");
			})
		}
	}
	/**
	 * Create and process an error
	 * @instance 
	 * @param {string} code 
	 * @param {string} message 
	 */
	processNewSystemError(code, message){
		this.processError(new systemError.SystemError(this, code, message));
	}
	/**
	 * Process a system error - log, behavior or further throw
	 * @instance
	 * @param {(module:system~SystemError|string)} error - SystemError error or error text
	 * @instance
	 */
	processError(error){
		// First things first, decide on how this was called
		if (error instanceof systemError.SystemError){// We process it as plain system error
			let final_text = this.system.id + ": "; // To go to std_err
			try {
				// Try to set a behavior or something...
				let behavior = this.errors[error.code].behavior;
				console.log(behavior);
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
		} else { // Out of context
			throw error;
		}
	}
	setMode(mode){
		switch(mode){
			case "immediate":

			case "postponed":
		}
	}
	behave(event){
		if (typeof this.behaviors[event] !== "undefined"){
			this.log("Bahavior - " + this.behaviors[event].text);
		} else { // Complain about undocumented behaviors
			this.log("Behavior - Undocumented behavior - " + event)
		}
		this.system.behavior.emit(event);
	}
	addBehaviors(behaviors){
		for (var key in behaviors){
			this.system.behavior.on(key, behaviors[key]);
		}
	}
	
	on(event,callback){
		let behavior = {};
		behavior[event] = callback;
		this.addBehaviors(behavior);
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

module.exports = {
	System: System
}