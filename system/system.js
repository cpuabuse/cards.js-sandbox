// system/system.js

const aux = require("./system.aux.js");

// Init and populate globalspace with settings
initSettings = function(varname /* Name of variable, namespace-like*/, filename /* Filename, without extention; If null, then varname will be used instead*/){
    try {
        global[varname] = aux.loadYaml("./system/settings/" + (filename ? filename : varname));
    } catch (err) {
        // Set error level for the system
        global.systemErrorLevel = 4;
        console.error("Critical file not loaded for " + varname);
        // Error thrown for now. Because the caller handling of the systemErrorLevel variable does not exist yet.
        throw(err);
    }
}

// A macro to init and populate system global space
exports.init = function(){
    initSettings("settings");
    initSettings("paths");
    initSettings("HTTPStatusCodes","statusCodes");
    console.log(global);
}

// TODO: fill the function
// A function to match the key of HTTP status code with relevant object
exports.getHTTPStatusCode = function(key){
    return 200;
}