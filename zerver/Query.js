
// This file runs on the server. See https://www.npmjs.org/package/zerver for details.
// This file is responsible for handling all queries to the server from the front end.
// Here is where the server will query the database and return the results in the callback function
// provided by the front end.
exports.getAllData = function (callback) {
	// TODO: REPLACE WITH DB CALL
	var event1 = {name: "ACoC", date: "October 14, 1975 11:13", categories: {'sports': true, 'clergy': true}},
		event2 = {name: "ACoB", date: "October 14, 1975 11:14", categories: {'sports': true, 'clergy': true}},
		event3 = {name: "ACoE", date: "October 14, 1975 11:15", categories: {'sports': true, 'clergy': true}},
		event4 = {name: "BCoC", date: "October 15, 1975 11:16", categories: {'infosession': true, 'atl': true}},
		event5 = {name: "BCoB", date: "October 15, 1975 11:17", categories: {'greek': true}},
		event6 = {name: "BCoE", date: "October 15, 1975 11:18", categories: {'infosession': true, 'atl': true}},
		event7 = {name: "CCoC", date: "October 16, 1975 11:19", categories: {'coc': true, 'merp': true}},
		event8 = {name: "CCoB", date: "October 16, 1975 11:20", categories: {'sports': true, 'clergy': true}},
		event9 = {name: "CCoE", date: "October 16, 1975 11:21", categories: {'coc': true, 'merp': true}},		
		eventsObject = {
				"event1key": event1, 
				"event2key": event2, 
				"event3key": event3, 
				"event4key": event4, 
				"event5key": event5, 
				"event6key": event6, 
				"event7key": event7, 
				"event8key": event8,
				"event9key": event9
			},
		eventsOrder = ["event1key",
					   "event2key",
					   "event3key",
					   "event4key",
					   "event5key",
					   "event6key",
					   "event7key",
					   "event8key",
					   "event9key"
					  ];

	var eventsData = {
		"events": eventsObject,
		"order": eventsOrder
	};
    callback(eventsData);
};