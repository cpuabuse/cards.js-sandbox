/**
 * system/system.js
 * @module system
 */

"use strict";
const events = require("events");
const loader = require("./system.loader.js"); // Auxiliary system lib
const systemError = require("./system.error.js");

/**
 * Provides wide range of functionality for file loading and event exchange.
 * @class
 * @extends module:system~Loader
 * @param {string} id - System instace internal ID
 * @param {string} rootDir - The root directory for the System instance
 * @param {string} relativeInitDir - The relative directory to root of the location of the initialization file
 * @param {string} initFilename - Initialization file filename
 * @param {object=} behaviors - [Optional] Behaviors to add in format `{"behavior_name":()=>{function_body}}`.
 * @throws {Error} Throws standard error if failed to perform basic initializations, or system failure that cannot be reported otherwise has occured
 * @fires system_load
*/
class System extends loader.Loader{
	/** 
	 * The constructor will perform necessary preparations, so that failures can be processed with system events. Up until these preparations are complete, the failure will result in thrown standard Error.
	 */
	constructor(id, rootDir, relativeInitDir, initFilename, behaviors){
		// First things first, call a loader, if loader has failed, there are no tools to report gracefully, so will have to just rethrow a standard error(which super generates), same as "error hell"
		super(rootDir, relativeInitDir, initFilename);
		
		/**
		 * Events to be populated by loader.
		 * @member events
		 * @abstract
		 * @instance
		 * @memberof module:system~System
		 */
		// Make sure basic system carcass was initialized
		if(!this.hasOwnProperty("events")){
			throw("error");
		}

		/** Contains system info. */
		this.system = {};
		/** Instance identifier. */
		this.system.id = id;
		/** Root directory; In general, expecting an absolute path. */
		this.system.rootDir = rootDir;
		/** Initial filename. */
		this.system.initFilename = initFilename;
		/** Relative directory for the settings file. */
		this.system.relativeInitDir = relativeInitDir;
		/** Event emitter for the behaviors.
		 * @private
		 */
		this.system.behavior = new events.EventEmitter();

		// Initialize the behaviors; If behaviors not provided as argument, it is OK; Immediate, since if behaviors would fire and they would access the instance, then it needs to be done, after the construction completed
		// FIXME: Immediate not needed as we have loader superclass
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
	 * @instance
	 * @param {array} behaviors 
	 * @fires behavior_attach
	 * @fires behavior_attach_fail
	 * @fires behavior_attach_request_fail
	 */
	addBehaviors(behaviors){
		if(Array.isArray(behaviors)){ // Sanity check - is an array
			if (behaviors.length > 0){ // Sanity check - is not empty
				// Array to use for firing post addition events
				let postAttachment = [];

				// Loop - attachment
				behaviors.forEach((element)=>{
					if(typeof element === "object"){
						let properties = Object.getOwnPropertyNames(element);
						if(properties.length == 1){
							let key = properties[0];
							let value = element[key];
							if(typeof key === "string"){
								if ( key.length > 0 && typeof value === "function"){
									this.system.behavior.addListener(key, value);
									postAttachment.push([true, key]);
									return;
								}
								postAttachment.push([false, key]);
								return;
							}
						}
					}
					postAttachment.push(null);
				});
				
				// Loop - post-attachment event fire
				postAttachment.forEach((element)=>{
					if(element === null){
						this.fire("behavior_attach_fail", "Request garbage");
					} else if (element[0]){
						this.fire("behavior_attach", element[1]);
					} else {
						this.fire("behavior_attach_fail", "Event not described.");
					}
				});

				// Terminate if successfully processed arrays
				return;
			}
		}

		// Behaviors not an array || empty array
		this.fire("behavior_attach_request_fail");
	}
	/**
	 * Log message from the System context
	 * @instance
	 * @param {string} text - Message
	 */
	log(text){
		if (typeof text === "string"){
			System.log(this.system.id + ": " + text);
		} else {
			// TODO: add string fail event
			this.fire("");
		}
	}
	/**
	 * Fires a system event
	 * @instance
	 * @param {string} name 
	 * @param {string=} message - [Optional] Message is not strictly required, but preferred. If not specified, will assume value of the name
	 * @throws {Error} Will throw "error_hell". The inability to process error - if event_fail event fails.
	 */
	fire(name, message){
		try{
			// Assign the message, as it is technically optional
			if (!message){
				message = name;
			}

			// Locate event
			let event = this.events[name];

			// Log
			if (event.log){
				this.log(event.log + " - " + message);
			}

			// Error
			if (event.error){
				this.error(name, message);
			}

			// Behavior
			if (event.behavior) {
				this.behave(name);
			}
			// Callback
		} catch (error) {
			let event_fail = "event_fail";
			if(event == event_fail){
				throw (error_hell);
			} else {
				this.fire("event_fail");
			}
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
	
	// FIXME: Do event type right
	/**
	 * Emit an event as a behavior.
	 * @instance
	 * @param {event} event 
	 */
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

	/**
	 * Access stderr
	 * @static
	 * @param {string} text
	 */
	static error(text){
		console.error("[Error] " + text);
	}
	
	/** 
	 * Access stdout
	 * @static
	 * @param {string} text 
	 */
	static log(text){
		console.log("[OK] " + text);
	}
}

module.exports = {
	System: System
}