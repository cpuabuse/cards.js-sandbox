// system/system.aux.js
var fs   = require("fs");
var yaml = require("js-yaml");

// Parses YAML file, and returns and object
exports.loadYaml = function(filename){
	try {
		var contents = fs.readFileSync(filename, "utf8");
		return yaml.load(contents);
	} catch (err) {
		throw(err);
	}
}
