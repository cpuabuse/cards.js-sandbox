//	system/system.mysql.js

var mysql = require("mysql");

// The generic database
class DB {

}

// Speficically mysql
class DB_mysql extends DB {
	constructor(sql_options){
		initSqlOptions(sql_options);
	}
}
var initSqlOptions = function() {

}