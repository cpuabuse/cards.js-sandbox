// system/system.js

const aux = require("./system.aux.js");

// Init and populate globalspace with site options
initSettings = function(){
    global.settings = aux.loadYaml("./system/settings/settings.yml");  
}
// Init and populate globalspace with path aliases
initPaths = function(){
    global.paths = aux.loadYaml("./system/settings/paths.yml");
}
// A macro to init and populate system global space
exports.initAll = function(){
    initSettings();
    initPaths();
    console.log(global);
}