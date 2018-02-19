// system/system.aux.js
var fs   = require("fs");
var yaml = require("js-yaml");

// Parses YAML file, and returns and object; Adds extension if absent
exports.loadYaml = function(filename){
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
