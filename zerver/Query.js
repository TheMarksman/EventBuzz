
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

	connection.query('SELECT * FROM Events ORDER BY Date, Time ASC', function(err, rows, fields) {
	  if (err) throw err;

	  var events = {},
	  	  order = [],
	  	  eventsData = {},
	  	  key;

	  for (i = 0; i < rows.length; i++) {
	  	// Create keys for events data
	  	date = moment(rows[i].Date);
	  	

	  	key = date.format('YYYYMMDD') + ' ' + rows[i].Time + ' ' + rows[i].EventName;
		rows[i].Date = date.format('MMMM Do YYYY');

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