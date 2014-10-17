// This file is responsible for all functions and controllers associated 
// with the main event (home) page.

App.controller('home', function (page, eventsData) {
	$(page).find('.introText').text('Welcome to EventBuzz:). Browse through any of these by category or date. @#yolo');
	
	$(page).on('appShow', function () {
		Query.getAllData(function (eventsData) {
			// TODO: FIX required GLOBALS (ew...)
			eventsObject = eventsData.events;
			orderedArray = eventsData.order;
			
			var list = document.getElementById('eventsList');

			createList(list, null);
    	});
	});
});

//creates the events list on the home page
function createList(list, filterBy) {
	//first date = first event .getDate()
	var currDate = eventsObject[orderedArray[0]].date;
	//create label with first date
	
	//first, trim the time of the dates, we dont want it displayed in the label
	var semiColonIndex = currDate.lastIndexOf(":");
	var newIndex = semiColonIndex - 3;
	var finalDateString = currDate.substring(0,newIndex);
	
	createLabel(finalDateString, list);

	for(var key in orderedArray) {
		var currentEvent = eventsObject[orderedArray[key]],
			eventDate = currentEvent.date;

		
		if( !(currDate === eventDate) ) {
			//create new label for new date, but first...
			//first, trim the time of the dates, we dont want it displayed in the label
			var semiColonIndex = eventDate.lastIndexOf(":");
			var newIndex = semiColonIndex - 3;
			var finalDateString = eventDate.substring(0,newIndex);
			createLabel(finalDateString, list);	
			currDate = eventDate;
		}
		//create list item for event
		if(filterBy == null){
			createItem(currentEvent.name, list);
		}
			if(currentEvent.categories[filterBy]) {				
				createItem(currentEvent.name,list);
			}
	}
};

//called when a category button is clicked
function categoryButtonClick(filterByString) {
	//alert('Sort list by category now...');
	//console.log('recreating list');
	var list = document.getElementById('eventsList');
	list.innerHTML = '';
	//alert('done');
	//console.log("@CASH: "+list);
	//delete the list here.
	//document.getElementById("myForm").reset();
	//then recreate it here
	createList(list, filterByString);			
};

//helper method that creates a <label> element and inserts it into list
function createLabel(data, list) {
	console.log('createLabel')
	//create label
	var entry = document.createElement('label');
	entry.appendChild(document.createTextNode(data));
	list.appendChild(entry);
	//<label >10.11.14</label>
};

//helper method that creates a <li> element and inserts it into list
function createItem(data, list) { 
	//<li class="app-button" data-target="page2"></li>
    //<li class="app-button" data-target="page2"></li>
	var entry = document.createElement('li');
	entry.setAttribute('class','app-button red');
	entry.setAttribute('data-target','page2');
	//console.log(entry.data-target);
	entry.appendChild(document.createTextNode(data));
	list.appendChild(entry);
	console.log(entry)
};