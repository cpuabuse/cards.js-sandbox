const https = require('https')
const fs = require('fs'); 
const superMethod = require('./serverMethods.js');
const mysql = require('mysql');
var sql_options = {
	host: "localhost",
	user: "123",
	password: "123",
	database: "123"
};

// A function to use with '/use'
exports.main = function(request, response){
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	switch (request.method){
		case'GET':
			doGet(request, response);
			break;
		case'POST':
			superMethod.rcvPost(request, function(err,rcv_postData){
				doPost(rcv_postData, response);
			});
			break;
		default: 
			response.end('<html>Wrong url</html>');
	}
}

// "./use" for rating update
function doPost(rcv_postData, response){
	// Interpret the data we received
	var rcv_data=JSON.parse(rcv_postData);
	console.log(rcv_data);
	console.log("#11");
	var con = mysql.createConnection(sql_options);
	con.connect(function(err) {
			if (err) throw err;
			console.log("Connected!");
			console.log(rcv_data.card_id);
			con.query('SELECT * FROM state WHERE nid =' + rcv_data.card_id + ';', function (err, result) {
				if (err) throw err;

				var stateUpdateQuery='';
				// Detemrine if the entry in state exists
				switch ((result).length){
					// Doesn't exist
					case 0:
						stateUpdateQuery = 'INSERT INTO state (nid, shortrating, assrating, longrating) \
						VALUES(' + rcv_data.card_id + 
						', ' + rcv_data.rating +
						', 0' + 
						', 0 ' +
						');';
						break;
					// Exists
					case 1:
						
						stateUpdateQuery = 'UPDATE state SET shortrating = ' +  (rcv_data.rating+result[0].shortrating)/2 +
						', assrating = 0' +
						', longrating = 0' + 
						 ' WHERE nid = ' + rcv_data.card_id +
						 ';';
						 break;

					// Several exist, need cleanup
					default:
					console.log("SQL Error");
					throw 'Too many rows';
				}
				// Log the query and perform the action
				console.log(stateUpdateQuery);
				con.query(stateUpdateQuery, function (err, result) {
					if (err) throw err;
				});
			});
		});
	console.log("start"+rcv_postData+"end");
	response.end("correct");
}

function doGet(request, response){
	fs.readFile('/var/node.js/html/use.form.rate.html', function(err, data) {
		if (err) throw err;
		response.end(data);
	});
}

exports.card_id = function(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	getPool(function(pool_body){
		var nid =1;

		// Deal with SQL
		var con = mysql.createConnection(sql_options);
		con.connect(function(err) {
			if (err) throw err;
			console.log("Connected!");
			con.query('SELECT nid FROM pool WHERE nid NOT IN (SELECT nid FROM state);', function (err, result) {
				console.log("q1");
				console.log(result.length);
				if (err) throw err;
				if(result.length>0){
					nid = JSON.stringify(result[0].nid);
					response.end(nid);
				} else {
					con.query('SELECT * FROM state ORDER BY shortrating ASC LIMIT 1;', function (err, result){
						console.log("q2");
						if (err) throw err;
						console.log("q3");
						nid = JSON.stringify(result[0].nid);
						response.end(nid);
					});
				}		
			});
		});
		var pool_json=(JSON.parse(pool_body).length);
		console.log('Pool length:' + pool_json);
	});
}

function getPool(callback){
	var pool_body = "";

	var options = {
		hostname: 'example.com',
		port    : '443',
		path    : '/cards/rest/cards/pool',
		method  : 'GET'
	};

	var pool_req = https.request(options, function (res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('Response: ', chunk);
			pool_body+=chunk;
		});
		res.on('end',function(){
			callback(pool_body);
		});
	});

	pool_req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	pool_req.end();
}