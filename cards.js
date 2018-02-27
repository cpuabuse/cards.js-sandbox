// cards.js
const server = require("./server/server.js");
const system = require("./system/system.js");
const path = require("path");

// Init all system stuff
var cards_js = new system.App("cards_js", path.join(__dirname, "app"));

// Run server - will stay inside, executing
var myServer = new server.Server(cards_js).startServer();