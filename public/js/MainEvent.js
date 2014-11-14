// This file is responsible for all functions and controllers associated with the main event (home) page.

//HomePage controller
App.controller('home', function (page, eventsObject) {
	//insert welcome message into the page
	$(page).find('.introText').text('Welcome to EventBuzz:).');
	
	//console.log("Do I have an object yet?:");		//console.log(eventsObject);
	$(page).on('appShow', function () {
		if(window.filterFlag==true) {
			//alert("incoming filtered data");
			var list = document.getElementById('eventsList');
			//clear the list, prep for new stuff
			list.innerHTML = "";
			
			//DEBUG: This is where the new data is:
			//console.log(window.eventsObject);
			//console.log(window.orderedArray);
			
			//now create the list with it
			createList(list, null)
			//alert("finishedfilteredloading");
		}
		else {
			//alert("firsttimeloadingHOME");
			//alert("is the flag set?:"+window.filterFlag);
			
			//because the flag is not set, query DB and dump everything in
			Query.getAllData(function(eventsData) {
				window.eventsObject = eventsData.events;
				window.orderedArray = eventsData.order;
				var list = document.getElementById('eventsList');
				
				//this clears the list to fix the bug where navigating back to home duplicates the existing list
				list.innerHTML = "";
				
				//dump all data into the homepage
				createList(list, null);
			});
			//alert("finishedloadingfirsttime");
		}	
			
		//manually change color of #all and #none buttons, like a noob:
		var element1 = document.getElementById('#all');
		var element2 = document.getElementById('#none');
		element1.style.background = '#000000';
		element2.style.background = '#000000';
		
		//end controller
	});
});		

//todo: update this method to reflect changes in the filter page
//called when a category button is clicked
function categoryButtonClick(filterByString) {	
	//refresh the data when a button gets clicked
	Query.getAllData(function(eventsData) {
		window.eventsObject = eventsData.events;
		window.orderedArray = eventsData.order;
		var list = document.getElementById('eventsList');
		
		//this clears the list to fix the bug where navigating back to home duplicates the existing list
		list.innerHTML = "";
		
		//dump all data into the homepage
		createList(list, filterByString);
	});
}

//helper method that creates a <label> element and inserts it into list
function createLabel(data, list) {
	var entry = document.createElement('label');
	entry.appendChild(document.createTextNode(data));
	list.appendChild(entry);
}

//helper method that creates a <li> element and inserts it into list
function createItem(namedata, event, list) {			
	var entry = document.createElement('li');
	entry.setAttribute('class','app-button red');
	//entry.type = "button"
	entry.addEventListener('click', function(){
		transferToEventDetailsPage(namedata, event);
	});
	entry.appendChild(document.createTextNode(namedata));
	list.appendChild(entry);
}

//creates the events list on the home page
function createList(list, filterBy) {
	//this method breaks sometimes because of formating inconsistencies
	try{
		//create the first date label
		var currDate = eventsObject[orderedArray[0]].Date;
		createLabel(currDate, list);
		
		//for every event in the object
		for(key in orderedArray) {
			//current event
			var event = eventsObject[orderedArray[key]];
			var eventDate = event.Date;
			
			//alert("curr: "+currDate);
			//alert("eventDate: "+eventDate);
			
			//create the label only if: 
			if( !(currDate === eventDate) ) {
				createLabel(eventDate, list);	
				
				//adjust currdate
				currDate = eventDate;
			}
			
			//create list item for event
			if(filterBy == null){
				createItem(event.EventName, event, list);
			} else if(event.Category == filterBy) {
				//(event.categories[filterBy]) 					
				createItem(event.EventName, event, list);
			}
			//alert("next event");
		}
	}
	//let us know something is wrong
	catch(err) {
		alert("error while creating list, fix lata, blame joe.");
		alert(err);
	}
}

//this is called to transfer to the details page, pass arguments here
function transferToEventDetailsPage(namedata, event) {
	var ritaObject = {"eventName": namedata, "event": event};
	App.load('details', ritaObject) //pass in here
	console.log("Name: " + namedata);
}