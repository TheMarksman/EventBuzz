var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
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
				};

  res.render('index.html', eventsObject);
});

module.exports = router;
