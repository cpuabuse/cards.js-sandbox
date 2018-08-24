// cards.js
/** 
 * TODO: Add file docs
*/
const server = require("./server/server.js");
const app = require("./server/app.js");
const serverController = require("./server/serverController.js");
const path = require("path");

// DEBUG: Devonly - promise throw
process.on('unhandledRejection', up => { throw up })

// Launch an application
var cards_js;
cards_js = new app.App("cards_js", path.join(__dirname, "apps", "cards"));

// DELETEME:
// cards_js.addBehaviors([
// 	{system_load:()=>{
// 		cards_js.behave("post_system_load");
// 	}},
// 	{app_load:()=>{
// 		cards_js.behave("post_system_load");
// 	}}
// ]);

// Start server - will stay inside, executing
var serverSettings = {
	host: "127.0.0.1",
	port: 8080
};
var myServer = new server.Server(serverSettings, cards_js).startServer();

// Initialize the server controller
var myServerController = new serverController.ServerController(path.join(__dirname, "apps"));