mysql = require('mysql');
moment = require('moment');

// This file runs on the server. See https://www.npmjs.org/package/zerver for details.
// This file is responsible for handling all queries to the server from the front end.
// Here is where the server will query the database and return the results in the callback function
// provided by the front end.
exports.getAllData = function (callback) {

	var connection = mysql.createConnection({
	  host     : 'db4free.net',
	  user     : 'eventbuzz',
	  password : 'eventbuzz',
	  database : 'eventbuzz'
	});

	connection.connect();

	connection.query('SELECT * FROM Event ORDER BY Date, Time ASC', function(err, rows, fields) {
	  if (err) throw err;

	  var events = {},
	  	  order = [],
	  	  eventsData = {},
	  	  key;

	  for (i = 0; i < rows.length; i++) {
	  	// Create keys for events data
	  	date = moment(rows[i].Date);
	  	

	  	key = date.format('YYYYMMDD') + ' ' + rows[i].Time + ' ' + rows[i].EventName;
		rows[i].Date = date.format('MMMM D YYYY');

	  	events[key] = rows[i];

	  	// Pass along order of events
	  	order.push(key);
	  };

	  eventsData.events = events;
	  eventsData.order = order;

	  callback(eventsData);
	});

	connection.end();
};

//Disregard for now. Query intended for use with logged-in account RSVP'd event callback.
exports.getProfileData = function (username, callback) {

	var connection = mysql.createConnection({
	  host     : 'db4free.net',
	  user     : 'eventbuzz',
	  password : 'eventbuzz',
	  database : 'eventbuzz'
	});



	connection.connect();

	connection.query('SELECT * FROM Event e INNER JOIN Reservation r ON r.EventID = e.ID AND r.Username = ?', [username], function(err, rows, fields) {
	  if (err) throw err;

	  var events = {},
	  	  order = [],
	  	  eventsData = {},
	  	  key,
	  	  hasEvents = true;

	  if(rows.length == 0)
	  {
	  	hasEvents = false;
	  	callback(hasEvents,eventsData);
	  	return;
	  }

	  for (i = 0; i < rows.length; i++) {
	  	// Create keys for events data
	  	date = moment(rows[i].Date);
	  	

	  	key = date.format('YYYYMMDD') + ' ' + rows[i].Time + ' ' + rows[i].EventName;
		rows[i].Date = date.format('MMMM D YYYY');

	  	events[key] = rows[i];

	  	// Pass along order of events
	  	order.push(key);
	  };

	  eventsData.events = events;
	  eventsData.order = order;

	  callback(hasEvents,eventsData);
	});

	connection.end();
};

exports.createTheEvent = function(eventData) {
	var insertionData = {
		'EventName': eventData.name,
		'Creator': eventData.creator,
		'Host': eventData.host,
		'Date': eventData.date,
		'Time': eventData.time,
		'Location': eventData.location,
		'Category': eventData.categories,
		'Description': eventData.description
	};

	var connection = mysql.createConnection({
	  host     : 'db4free.net',
	  user     : 'eventbuzz',
	  password : 'eventbuzz',
	  database : 'eventbuzz'
	});

	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}

		console.log('connected as id ' + connection.threadId);
	});

	connection.query('INSERT INTO Event SET ?', insertionData, function(err, result) {
		if (err) {
			console.error('error with query: ' + err.stack);
		}
	});

	connection.end();

};

exports.checkLogin = function(credentials, callback) {
	var username = credentials.username;
	var password = credentials.password;

	var connection = mysql.createConnection({
	  host     : 'db4free.net',
	  user     : 'eventbuzz',
	  password : 'eventbuzz',
	  database : 'eventbuzz'
	});

	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}

		console.log('connected as id ' + connection.threadId);
	});

	connection.query('SELECT Password FROM Users WHERE Username = ?', [username], function(err, rows, fields) {
		if (err) {
			console.error('error with query: ' + err.stack);
		}
		if (rows.length == 0) {
			callback(false);
		} else if (password.localeCompare(rows[0].Password) == 0) {
			callback(true);
		} else {
			callback(false);
		}
	});

	connection.end();

};

exports.addAccountToDatabase = function(accountData, callback) {
	var username = accountData.username,
		password = accountData.password,
		email = accountData.email,
		type = 'user',
		validUsername = true;


	var account = {};

	account.Username = username;
	account.Password = password;
	account.Email = email;
	account.Type = type;

	var connection = mysql.createConnection({
	  host     : 'db4free.net',
	  user     : 'eventbuzz',
	  password : 'eventbuzz',
	  database : 'eventbuzz'
	});

	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}

		console.log('connected as id ' + connection.threadId);
	});

	var query = connection.query('INSERT INTO Users SET ?', account, function(err, rows, fields) {
		if (err) {
			validUsername = false;
			console.error('error with query: ' + err.stack);
		} else {
			callback(true);
		}
	});

	query.on('end', function() {
		if (!validUsername) {
			callback(false);
		}
	});

	connection.end();
};
/*
exports.rsvpToEvent = function(eventObject, username, callback) {
	
	var connection = mysql.createConnection({
		  host     : 'db4free.net',
		  user     : 'eventbuzz',
		  password : 'eventbuzz',
		  database : 'eventbuzz'
		});

	//I don't know if this is the correct way to get the number stored in ID (Primary Key) for the Event table of the desired event 
	//to be RSVP'd:
	id = eventObject.id;


	connection.connect();

	connection.query('INSERT INTO Reservation (ID, EventID, Username) VALUES (DEFAULT,(SELECT `ID` FROM `Event` WHERE `ID` = ?), ?)', 
		id, [username], function(err, rows, fields) {

	  if (err) {
			console.error('error with query: ' + err.stack);
		}

	  });

	connection.end();
};
*/