const http = require('http');
const https = require('https');
const events = require('events');
const superMethod = require('./serverMethods.js');
const mysql = require('mysql');
var sql_options = {
	host: "localhost",
	user: "123",
	password: "123",
	database: "123"
};
var restSyncEvent = new events.EventEmitter();

// Globals
var NUMBER_OF_FIELDS=2;

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

exports.pool_sync = function(request, response){
	getPool(function(pool_body){
		var con = mysql.createConnection(sql_options);
		con.connect(function(err) {
			if (err) throw err;
			console.log("Connected!");
			con.query('Delete FROM pool;', function (err, result) {
				if (err) throw err;
				console.log("Result: " + JSON.stringify(result));
				var poolJSON = (JSON.parse(pool_body));

				// Prepare insert query
				var insertQuery="INSERT INTO pool (nid) VALUES";
				for(var i = 0; i < poolJSON.length;i++){
				 	if(i!=0){
				 		insertQuery+=",";
				 	}
					insertQuery+="("+poolJSON[i].id+")";
				}
				insertQuery+=";";

				// Call the insert
				con.query(insertQuery, function (err, result){
					console.log(insertQuery);
				});
			});
		});
	});

	response.end('Affirmative');
}

exports.main = function(request, response){
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	switch (request.method){
		case'POST':
			doPost(request, response);
			break;
		default: 
			response.end('<html><body><form method="post" action="/master" enctype="multipart/form-data">Name: <input type="file" name="file" /><input type="submit" value="Submit" /></form></body>');
	}
}

// Operations to perform when recieving post request on master
function doPost(request, response){
	// Hold POST data
	var rcv_postData = '';

	// Get the data from body
	request.on('data', function (data) {
		rcv_postData += data;
	});

	// When the transmission ended
	request.on('end', function () {
		// Will watch over inconsistencies in processing of tsv
		var tsvException = "example.tsv";
		try {
			// Fn vars
			var toSend = []; // Data to send to REST
			var toSendPointer = 0;

			// Remove "trash" from body
			var boundary = rcv_postData.split(('\r\n'))[0];
			var boundarySplitStart = rcv_postData.split('\r\n'+boundary)[0];
			var boundarySplitEnd = boundarySplitStart.split(boundary)[1];
			var rcv_postData_clean = boundarySplitEnd.split(('\r\n\r\n'))[1];

			// Declare array, that will hold all the lines in TSV; TSV chosen since source is TSV
			var tsv_arr = rcv_postData_clean.split('\r\n');
			var num=0;
			// Per entity processing		
			tsv_arr.forEach(function(tsv_line) {
				// Fields array within single tsv line
				var tsv_fields = tsv_line.split('\t');
				response.write(num.toString()+"|"+tsv_arr.length.toString());
				num=num+1;
				// Validate what we can on the orignal TSV
				if(tsv_fields.length != NUMBER_OF_FIELDS){
					response.write("checking len");
					throw(tsvException);
				} else {
					tsv_fields.forEach(function(field){
						response.write("field"+field);
						if(!field){
							throw (tsvException);
						}
					})
				}

				// Push the array to send
				toSend.push('{"type":[{"target_id":"plain_card"}],"title":[{"value":"'+tsv_fields[0]+'"}],"field_answer_text":[{"value":"'+tsv_fields[1]+'"}]}');				
			}) // End of tsv_arr per entity processing

			// Attempt to write to REST
			restSyncEvent.on('restSequence', function(){
				doAddEntity(toSend[toSendPointer], function(){
					toSendPointer++;
					if(toSendPointer>=toSend.length){
						restSyncEvent.removeAllListeners("restSequence");
						response.end("TSV Completed");
					} else {
						restSyncEvent.emit('restSequence');
					}
				});
			});
			response.write("Starting TSV...");
			restSyncEvent.emit('restSequence');
		} catch(exception){ // TSV corruption
			if(exception !== tsvException) throw exception;
			response.end("TSV Corrupt");
		}
	})
}

function doAddEntity(post_data, sequence){
	var post_req  = null;

	var post_options = {
		hostname: 'example.com',
		port    : '443',
		path    : '/cards/entity/cards?_format=json',
		method  : 'POST',
		headers : {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(post_data, 'utf8')
		}
	};
	console.log(post_data);
	var post_req = https.request(post_options, function (res) {
		if(res.statusCode!=201){
			console.log('ERROR: STATUS - ' + res.statusCode);
		}
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			// Seems this bit required to run
			console.log('Response: ', chunk);
		});
		res.on('end', function(what){
			sequence();
		});
	});

	post_req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	post_req.write(post_data);
	post_req.end();
}