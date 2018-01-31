"use strict";

var fs   = require("fs");
var yaml = require("js-yaml");

exports.test = function(){
    try {
        var filename = "system/settings/settings.yml",
            contents = fs.readFileSync(filename, "utf8"),
            data     = yaml.load(contents);
            console.log(data);
        } catch (err) {
            throw(err);
    }
}
