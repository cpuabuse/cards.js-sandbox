// cards.js
const server = require("./server/server.js");
const system = require("./system/system.js");

// Init all system stuff
system.init();

// Run server - will stay inside, executing
var myServer = new server.Server;
myServer.startServer();