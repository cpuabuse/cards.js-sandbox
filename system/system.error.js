"use strict";

/**
 * Extended system error class
 * @class SystemError
 * @private
 * @inner
 * @memberof module:system
 * @extends Error
 */
class SystemError extends Error{
	constructor(systemContext, code, message){
		if(typeof systemContext.errors[code] !== "string"){
			throw new Error("System error undefined.");
		} else {
			super(message);
			this.code = code;
		}
	}
}

module.exports = {
	SystemError: SystemError
}