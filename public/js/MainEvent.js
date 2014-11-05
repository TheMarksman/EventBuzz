// This file is responsible for all functions and controllers associated 
// with the main event (home) page.

		App.controller('home', function (page, eventsObject) {
			//alert("opening home page");
			$(page).find('.introText').text('Welcome to EventBuzz');
			$(page).on('appShow', function () {
				Query.getAllData(function(eventsData) {

					window.eventsObject = eventsData.events;
					window.orderedArray = eventsData.order;

					var list = document.getElementById('eventsList');
					//this clears the list to fix the bug where navigating back to home duplicates the existing list
					list.innerHTML = "";
					createList(list, null);
				});
				
				//manually change color of #all and #none buttons, like a noob:
				var element1 = document.getElementById('#all');
				var element2 = document.getElementById('#none');
				element1.style.background = '#000000';
				element2.style.background = '#000000';
			});
		});



    	//called when a category button is clicked
		function categoryButtonClick(filterByString) {
			var list = document.getElementById('eventsList');
			list.innerHTML = '';
			createList(list, filterByString);			
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
			var currDate = eventsObject[orderedArray[0]].Date;

			createLabel(currDate, list);

			for(key in orderedArray) {
				//current event
				var event = eventsObject[orderedArray[key]];
				var eventDate = event.Date;
							
				if( !(currDate === eventDate) ) {
					createLabel(currDate, list);	

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
			}
		}
				//this is called to transfer to the details page, pass arguments here
		function transferToEventDetailsPage(namedata, event) {
			var ritaObject = {"eventName": namedata, "event": event};
			App.load('details', ritaObject) //pass in here
			console.log("Name: " + namedata);
		}
		
		function transferHomeFromFilter() {
			//alert("insert sql stuff here");
			//create a new eventsObject containing filtered data
			//var newEventObjectContainer = {"allEvents": "temp"};
			//App.load('home', newEventObjectContainer) //pass in here
			//App.load('home'); //pass in here
			App.back('home');
			alert("fake back?");
			//console.log("Done filtering");
		}