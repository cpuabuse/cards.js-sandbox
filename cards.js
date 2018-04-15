// cards.js
const server = require("./server/server.js");
const app = require("./server/app.js");
const path = require("path");
const serverController = require("./server/serverController.js");

// Devonly - promise throw
process.on('unhandledRejection', up => { throw up })

// Init all system stuff
var cards_js;
cards_js = new app.App("cards_js", path.join(__dirname, "apps", "cards"));

// cards_js.addBehaviors([
// 	{system_load:()=>{
// 		cards_js.behave("post_system_load");
// 	}},
// 	{app_load:()=>{
// 		cards_js.behave("post_system_load");
// 	}}
// ]);



// Run server - will stay inside, executing
var serverSettings = {
	host: "127.0.0.1",
	port: 8080
};
var myServer = new server.Server(serverSettings, cards_js).startServer();

// Initialize the server controller
var myServerController = new serverController.ServerController(path.join(__dirname, "apps"));