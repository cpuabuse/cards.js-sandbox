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
 * @param {string} relativeInitDir - The relative directory to root of the location of the initialization file
 * @param {string} initFilename - Initialization file filename
 * @param {object=} behaviors - [Optional] Behaviors to add in format `{"behavior_name":()=>{function_body}}`.
 * @throws {Error} Throws standard error if failed to perform basic initializations, or system failure that cannot be reported otherwise has occured
*/
class System extends loader.Loader{
	/** 
	 * The constructor will perform necessary preparations, so that failures can be processed with system events. Up until these preparations are complete, the failure will result in thrown standard Error.
	 */
	constructor(id, rootDir, relativeInitDir, initFilename, behaviors){
		// First things first, call a loader, if loader has failed, there are no tools to report gracefully, so will have to just rethrow a standard error(which super generates), same as "error hell"
		super(rootDir, relativeInitDir, initFilename);
		
		// Make sure basic system carcass was initialized
		if(!this.hasOwnProperty("events")){
			throw("error");
		}

		// System variables
		this.system = {}; // Make a placeholder for system-specific data
		this.system.id = id; // Instance identifier
		this.system.rootDir = rootDir; // Root directory; In general expecting an absolute path
		this.system.initFilename = initFilename; // Set the initial filename
		this.system.relativeInitDir = relativeInitDir; // Set the relative directory for the settings file
		this.system.behavior = new events.EventEmitter(); // Create event emitter for the behaviors

		// Initialize the behaviors; If behaviors not provided as argument, it is OK
		setImmediate(() => {
			this.addBehaviors(behaviors);
			this.fire("system_load");
		})
	}

	/**
	 * Adds behaviors to the system, and fires post-addtion events.
	 * Firstly, this function attempts to add the behaviors.
	 * When the behavior addition has been processed, the function will attempt to fire post-addition events, depending on success/failure of behavior additions.
	 * Logically the two stage separation should be done with promises, but due to huge overhead of promises and low total processing required, it will be simplified to syncronous.
	 * @param {array} behaviors 
	 * @memberof System
	 */
	addBehaviors(behaviors){
		if(Array.isArray(behaviors)){
			if (behaviors.length > 0){
				let postAddition = [];

				// Addition loop
				behaviors.forEach((element)=>{
					if(typeof element === "object"){
						let properties = Object.getOwnPropertyNames(element);
						if(properties.length == 1){
							let key = properties[0];
							let value = element[key];
							if(typeof key === "string"){
								if ( key.length > 0 && typeof value === "function"){
									this.system.behavior.addListener(key, value);
									postAddition.push([true, key]);
									return;
								}
								postAddition.push([false, key]);
								return;
							}
						}
					}
					postAddition.push(null);
				});
				
				// Post-addition event fire loop
				postAddition.forEach((element)=>{
					if(element === null){
						this.fire("bad");
					} else if (element[0]){
						this.fire("good");
					} else {
						this.fire("future");
					}
				});

				return;
			}
		}

		// Behaviors not an array || empty array
		this.fire("bad");
	}
	/**
	 * Log message from the System context
	 * @instance
	 * @param {string} text - Message
	 */
	log(text){
		System.log(this.system.id + ": " + text);
	}
	/**
	 * Fires a system event
	 * @instance
	 * @param {string} name 
	 * @param {string=} message
	 */
	fire(name, message){
		try{
			// Locate event
			let event = this.events[name];

			// Log
			if (event.log){
				this.log(event.log + " - " + messsage);
			}

			// Error
			if (event.error){
				this.error(name, message);
			}

			// Behavior
			if (event.behavior) {
				this.behave(name)
			}
			// Callback
		} catch (error) {

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