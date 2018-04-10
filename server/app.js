/**
 * server/app.js
 * @module app
 */
//	server/app.js
"use strict";
const system = require("../system/system.js");
const fs = require("fs");
const path = require("path");
var md = require('markdown-it')(); // Presumabely constructs new instance, thus var

/**
 * Resource management
 * @class
 * @extends module:system.System
 * @param {string} id
 * @param {string} rootDir
 */
class App extends system.System{
	constructor(id, rootDir){
		/** @event module:app.App~app_load */
		let behaviors = [
			// Initialize resources
			{"system_load":()=>{
				// Declare structures
				this.app={
					rc:{}
				};

				// Anonymous async arrow function expression
				(async () => {
					// Local variables
					let rcFolder = this.folders.rc;
					let results = new Array();

					// Retrieve absolute paths
					let rcFolders = await this.system.file.list(rcFolder, this.system.file.filter.isDir);
					let rcAmount = rcFolders.length; // Amount of resources
				
					// Populate the promises
					rcFolders.forEach(folder => {
						results.push(
							Promise.all([
								this.system.file.toRelative(rcFolder, folder),
								this.system.file.toAbsolute(folder, "main.yml")
							]).then(result => {
								this.system.file.getFile(result[1]).then(file => {
									return new Promise(()=>{
										this.app.rc[result[0]]={
											main: file
										};
									})
								})
							})
						);
					});
				
					await Promise.all(results);
				})(); // <== (async () => {...})();
			}},
			// App post-load routines
			{"app_load":()=>{
				this.initThings();
			}}
		];
		// Some constants to use in functionsm centralized here
		let initDir = "settings"; // The default directory relative to app root directory for init file
		let initFilename = "init"; // The default name for an init file

		// Call parents constructor with the default parameters for the App
		super(id, rootDir, initDir, initFilename, behaviors);		
	}

	get endpoints () {
		return this.settings.endpoints;
	}

	/**
	 * Retrieves a resource
	 * @instance
	 * @param {string} [rc_name=index] [Optional], resource identifier
	 */
	rc(rc_name){
		// TODO: verify resource exists
		var rc = {};
		rc.appContext = this;
		rc.resource
		rc.folder = path.resolve(this.system.rootDir, )

		App.resourceProcessor(this/* As a context */, this.resources[rc]);
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

	// Processes a specific resource command
	static resourceProcessor(appContext, rc){
		// For now test with the command that is simple and primitive - file
		let command = "file";

		// TODO: Determine args

		// Switch on incoming command
		switch(command){
			// Get contents from the file
			case "file":
			rc.with.forEach(element=>{
				fileProcessor(element);
			});
			break;

			case "nunjucks":
			break;

			case "markdown":
			break;

			// TODO: Default behavior, let us make it something noninterruptive
			default:
			break;
		}


		let returnArray = new Array();
		rc.with.forEach(element => {
			returnArray.push(resourceProcessor(element));
		});
	}
};



var fileProcessor = function(rc){
	fs.fileReadSync(rc);
}

exports.App = App;