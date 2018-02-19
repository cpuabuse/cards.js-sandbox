// cards.js
const server = require("./server/server.js");
const system = require("./system/system.js");

// Init all system stuff
system.initAll();

// Run server - will stay inside, executing
server.server();