"use strict";

/**
 * Functionality to separately manage system errors.
 */

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
		super(message);
		super(systemContext.errors[code].text);
		this.code = code;
	}
}

module.exports = {
	SystemError: SystemError
}