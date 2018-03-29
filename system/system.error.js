"use strict";
/**
 * Extended system error class
 * @inner
 * @memberof module:system
 * @extends external:Error
 * @throws {external:Error}
 */
class SystemError extends Error{
	/**
	 * Creates an instance of SystemError.
	 * @param {module:system.System} systemContext 
	 * @param {string} code 
	 * @param {string} message 
	 */
	constructor(systemContext, code, message){
		// System guarantees that errors defined in context
		
		let errorNotSet = true; // Flag if fail to get error 

		if(systemContext.errors.hasOwnProperty(code)){ // Check that error exists as an event
			if (systemContext.errors[code].hasOwnProperty("error")){ // Check that event can do errors
				if(typeof systemContext.errors[code].error === "string"){
					super(message);
					this.code = code;
					errorNotSet = false;
				}
			}
		}

		if(errorNotSet){
			throw new Error("System error undefined.");
		}
	}
}

exports.SystemError = SystemError;