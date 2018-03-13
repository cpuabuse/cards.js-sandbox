// cards.js
const server = require("./server/server.js");
const app = require("./server/app.js");
const path = require("path");

// Init all system stuff
var cards_js = new app.App("cards_js", path.join(__dirname, "apps", "cards"));

// Run server - will stay inside, executing
var myServer = new server.Server(cards_js).startServer();