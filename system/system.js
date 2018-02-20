// system/system.js
const aux = require("./system.aux.js"); // Auxiliary system lib
const path = require('path');

// A macro to init and populate system global space
exports.init = function(){
    initSettings("settings");
    initSettings("paths");
    initSettings("HTTPStatusCodes","statusCodes");
}

// Init and populate globalspace with settings - specific global object member per file
initSettings = function(varname /* Name of variable, namespace-like*/, filename /* Filename, without extention; If null, then varname will be used instead*/){
    var settingsDirectory = "settings";

    try {
        console.log(__dirname);

        // Set the global object from an argument of varname to data from YAML file with path constructed from varname; or filename, if filename provided
        global[varname] = aux.loadYaml(path.join(__dirname, settingsDirectory, (filename ? filename : varname)));
    } catch (err) {
        // Set error level for the system
        global.systemErrorLevel = 4;
        console.error("Critical file not loaded for " + varname);
        // Error thrown for now. Because the caller handling of the systemErrorLevel variable does not exist yet.
        throw(err);
    }
}

setSystemErrorLevel = function(targetErrorLevel){
	var errorLevel;
// TODO: finish the function
    try{
		systemErrorLevelTable[targetErrorLevel].code 
    } catch(error) {
		errorLevel = 666;
    } finally {
		global.systemErrorLevel = errorLevel;
    }
}

// TODO: fill the function
// A function to match the key of HTTP status code with relevant object
exports.getHTTPStatusCode = function(key){
    return 200;
}