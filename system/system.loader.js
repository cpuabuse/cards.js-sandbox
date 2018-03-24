// system/system.aux.js
"use strict";
const path = require("path"); // Need to resolve some while loading yaml and other
const fs   = require("fs");
const yaml = require("js-yaml");

/**
 * Required by system to perform file carcass initialization
 * @inner
 * @memberof module:system
 * @class Loader
 * @param {string} rootDir 
 * @param {string} relativeInitDir 
 * @param {string} initFilename
 * @throws {Error} Standard error with message
 */

class Loader{
	constructor(rootDir, arg_relativeInitDir, arg_initFilename){
		// Initialization recursion
		initRecursion(rootDir, arg_relativeInitDir, arg_initFilename, this);
	}
}

/**
 * @private
 * @param {string} rootDir 
 * @param {object} sourceObject 
 * @param {string} sourceKey 
 * @param {object} targetObject
 * @example <caption>Default filename - null</caption> @lang yaml
 * # Variable settings to be populated with data from "./settings.yml"
 * [settings:]
 * @example <caption>Default filename - empty string</caption> @lang yaml
 * # Variable settings to be populated with data from "./settings.yml"
 * [settings: ""] 
 * @example <caption>Specified filename</caption> @lang yaml
 * # Variable settings to be populated with data from ".\xxx.yml"
 * [settings: "xxx"]
 * @example <caption>Default extension</caption> @lang yaml
 * # The "extension"(recursion) with default variables will be assumed, so that variable "settings" will be recursively populated with files located in "settings/settings.yml"
 * settings:
 *   folder:
 *   file:
 *   name:
 *   path: # Note: path may be either absolute(default) or relative(relative to the folder from which the file containing instructions is read), the system will not read files outside of system_root_dir tree.
 * @example <caption>Specified extension</caption> @lang yaml
 * # The  "extension"(recursion) with only specified variables will be performed, in this example "settings" variable will be populated with the files described in the "system_root_dir/hello/settings.yml"
 * settings:
 *   folder: "hello"
 *   file:
 *   name:
 *   path: # Note: path may be either absolute(default) or relative(relative to the folder from which the file containing instructions is read), the system will not read files outside of system_root_dir tree.
 */
var initRecursion = function(rootDir, relativePath, initFilename, targetObject){
	// Initialize the initialization file
	let initPath = path.resolve(rootDir, relativePath);
	let init = initSettings(initPath, initFilename);

	// Initialize files FIXME: Wont process properties after the extension...
	for (var key in init) {
		switch (typeof init[key]){
			case "object":
			if(init[key] === null){ // Filename is same as the key
				break; 
			} else { // "Extension"	
				let checkDefaultDirective = function (property) {
					if (init[key].hasOwnProperty(property)){
						if ((typeof init[key][property]) === "string"){
							if (init[key][property] != "") {
								return init[key][property];
							}
						}
					}
					return key;
				}	

				let folder = checkDefaultDirective("folder");
				let file = checkDefaultDirective("file");	
				let path = "absolute";
	
				targetObject[key] = {};
				initRecursion(rootDir, folder, file, targetObject[key]);	
				return;
			}
			
			case "String": // Standard filename
			if (init[key] == ""){ // Filename is same as the key
				break;
			}
			
			// Specific filename
			targetObject[key] = initSettings(path.resolve(rootDir, relativePath), init[key]);
	
			return;

			default:
			throw("critical_system_error", "Invalid intialization entry type - " + sourceKey);
		}


		// By default we are looking for the settings files to reside within the initialization folder, but this can be changed later
		targetObject[key] = initSettings(path.resolve(rootDir, relativePath), key);
	}
}

// Init and populate globalspace with settings - specific global object member per file
var initSettings = function(
	initPath,
	filename // Filename, without extention; If null, then varname will be used instead
){
    try {
        // Set the global object from an argument of varname to data from YAML file with path constructed from varname; or filename, if filename provided
        return loadYaml(path.join(initPath, filename));
    } catch (err) {
        console.error("Critical file not loaded - " + filename);
        // Error thrown for now. Because the caller handling of the systemErrorLevel variable does not exist yet.
        throw(err);
    }
}

// Parses YAML file, and returns and object; Adds extension if absent
var loadYaml = function(filename){
	var fileExtension = ".yml"; // Making a variale for interpreted language like this would not even save any memory, but it feels right

	// Add file extension if absent
	if(!filename.endsWith(fileExtension)){
		filename += fileExtension;
	}

	// Try to read the file contents and retuen them; If we fail, we log filename to error stream, and rethrow the error
	try {
		var contents = fs.readFileSync(filename, "utf8");
		return yaml.load(contents);
	} catch (err) {
		// Prints path of problem filename
		console.error("Could not open: " + filename);
		throw(err);
	}
}

module.exports = {
	loadYaml: loadYaml,
	Loader: Loader
}