// system/system.js

const aux = require("./system.aux.js");

// Init and populate globalspace with site options
initSettings = function(){
    try { 
        global.settings = aux.loadYaml("./system/settings/settings.yml");
    } catch (err) {
        // Set error level for the system
        global.systemErrorLevel = 4;
        console.error("Critical file not loaded: settings");
        // Error thrown for now. Because the caller handling of the systemErrorLevel variable does not exist yet.
        throw(err);
    }
}
// Init and populate globalspace with path aliases
initPaths = function(){
    try { 
        global.paths = aux.loadYaml("./system/settings/paths.yml");
    } catch (err) {
        // Error code set for System Administrator
        global.systemErrorLevel = 4;
        console.error("System Critical file not loaded: paths");
        // Error thrown for now. Because the caller handling of the systemErrorLevel variable does not exist yet.
        throw(err);
    }
}

// Init and populate globalspace with status codes
initPaths = function(){
    try { 
        global.HTTPstatusCodes = aux.loadYaml("./system/settings/statusCodes.yml");
    } catch (err) {
        // Error code set for System Administrator
        global.systemErrorLevel = 4;
        console.error("System Critical file not loaded: paths");
        // Error thrown for now. Because the caller handling of the systemErrorLevel variable does not exist yet.
        throw(err);
    }
}

// A macro to init and populate system global space
exports.initAll = function(){
    initSettings();
    initPaths();
    console.log(global);
}

// TODO: fill the function
// A function to match the key of HTTP status code with relevant object
exports.getHTTPStatusCode = function(key){
    return 200;
}