/**
 * @module app
 * @see module:system
 */
//	server/app.js
"use strict";
const system = require("../system/system.js");
var md = require('markdown-it')(); // Presumabely constructs new instance, thus var

/**
 * @class App
 * @extends module:system~System
 * @param {string} id
 * @param {string} rootDir
 */
class App extends system.System{
	constructor(id, rootDir, behaviors){
		// Some constants to use in functionsm centralized here
		let initDir = "settings"; // The default directory relative to app root directory for init file
		let initFilename = "init"; // The default name for an init file

		// Call parents constructor with the default parameters for the App
		super(id, rootDir, initDir, initFilename, behaviors);

		// Load complete - postponing till constructor is finished
		this.addBehaviors({
			"system_load":()=>{this.behave("app_load");}
		});
		
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

	/** 
	 * Returns one of the expected behaviors for the server to act
	 * @readonly
	 * @memberof App
	 * @returns {string} - Behavior
	 */
	get behaviour(){
		return("ok");
	}

	// Process markdown
	static md(data){
		// Test process extra MD
		return md.render('### parsed from MD');
	}

	static getResorce(rc){
		/*
		- nunjucks: "node"
  with:
    - content:
	  markdown: "home"
	  */
	}
	
};

module.exports = {
	App : App
}