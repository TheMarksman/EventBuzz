// This file is responsible for all functions and controllers associated 
// with the main event (home) page.

App.controller('home', function (page, eventsObject) {
	$(page).find('.introText').text(intro);
	$(page).on('appShow', function () {
		//console.log('page finished rendering now...');
		var list = document.getElementById('eventsList');
		//console.log(list); 
		createList(list, null);
	});
});


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
}

//helper method that creates a <label> element and inserts it into list
function createLabel(data, list) {
	console.log('createLabel')
	//create label
	var entry = document.createElement('label');
	entry.appendChild(document.createTextNode(data));
	list.appendChild(entry);
	//<label >10.11.14</label>
}

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
}

//creates the events list on the home page
function createList(list, filterBy) {
	//first date = first event .getDate()
	var currDate = eventObjects[orderedArray[0]].date;
	//create label with first date
	
	//first, trim the time of the dates, we dont want it displayed in the label
	var semiColonIndex = currDate.lastIndexOf(":");
	var newIndex = semiColonIndex - 3;
	var finalDateString = currDate.substring(0,newIndex);
	//alert(finalDateString);
	createLabel(finalDateString, list);

	for(var key in orderedArray) {
		//console.log('key: '+orderedArray[key]);
		//console.log('currDate: '+currDate);
		//current event
		var event = eventObjects[orderedArray[key]];
		//current date = first date
		var eventDate = event.date;
		//if(current date != event .getDate() )

		//console.log("curr:"+currDate);
		//console.log("even:"+eventDate);
		
		if( !(currDate === eventDate) ) {
			//console.log('IF');
			//create new label for new date, but first...
			//first, trim the time of the dates, we dont want it displayed in the label
			var semiColonIndex = eventDate.lastIndexOf(":");
			var newIndex = semiColonIndex - 3;
			var finalDateString = eventDate.substring(0,newIndex);
			//alert(finalDateString);
			createLabel(finalDateString, list);	
			//createLabel(eventDate,list);
			//adjust currdate
			currDate = eventDate;
		}
		//create list item for event
		if(filterBy == null){
			createItem(event.name,list);
		}
			if(event.categories[filterBy]) {
			//(event.categories[filterBy]) 					
			createItem(event.name,list);
			}
	}
}

//DONOT remove this constant:).
//Wecome Message Constant
var intro = 'Welcome to EventBuzz:). Browse through any of these by category or date. @#yolo'

var event1 = {name: "ACoC", date: "October 14, 1975 11:13", categories: {'sports': true, 'clergy': true}}
var event2 = {name: "ACoB", date: "October 14, 1975 11:13", categories: {'sports': true, 'clergy': true}}
var event3 = {name: "ACoE", date: "October 14, 1975 11:13", categories: {'sports': true, 'clergy': true}}
var event4 = {name: "BCoC", date: "October 15, 1975 11:13", categories: {'infosession': true, 'atl': true}}
var event5 = {name: "BCoB", date: "October 15, 1975 11:13", categories: {'greek': true}}
var event6 = {name: "BCoE", date: "October 15, 1975 11:13", categories: {'infosession': true, 'atl': true}}
var event7 = {name: "CCoC", date: "October 16, 1975 11:13", categories: {'coc': true, 'merp': true}}
var event8 = {name: "CCoB", date: "October 16, 1975 11:13", categories: {'sports': true, 'clergy': true}}
var event9 = {name: "CCoE", date: "October 16, 1975 11:13", categories: {'coc': true, 'merp': true}}		
var eventObjects = {
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

