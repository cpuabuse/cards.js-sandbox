//	server/serverController.js
//	Responsible for managing a port pool and assigning apps to servers.
"use strict";
const system = require("../system/system.js"); 

class ServerController extends system.System{
	constructor(rootDir, apps){
		// Some constants to use in functionsm centralized here
		let initDir = "settings"; // The default directory relative to app root directory for init file
		let initFilename = "init"; // The default name for an init file

		// Call parents constructor with the default parameters for the App
		super(/* FIXME: Delete the id as it is not necessary to have it*/ "serverControllerTempID", rootDir, initDir, "init");

		this.servers = []; // Global Server pool, acts as a port pool
		this.apps = []; // Global App pool

		// BTW: This is sufficient
		if(typeof apps === "object"){
			apps.forEach(function(app){
				// FIXME: proper memberof and require if needed
				if (!(app instanceof App)){
					throw "supererror";
				}
				
				// Add app to global pool
				this.apps.push(app);

				this.addApp(app);
			})
		}
	}

	addServer(port){
		// TODO: Add server to a port
	}
	addApp(app){
		// Determine a requested port
		let port = app.settings.http_port;

		// FIXME: how do we address, and how do we check that exists
		// NOTE: Dupe for all following addressing
		if(this.servers[http_port].exists){
			// Add an app to the server
		} else {
			// Create a new server
			this.servers[http_port] = this.addServer(port);

			this.servers[http_port].addApp(app);
		}
	}
}

module.exports = {
	ServerController : ServerController
}