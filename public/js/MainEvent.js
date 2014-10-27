// This file is responsible for all functions and controllers associated 
// with the main event (home) page.

		App.controller('home', function (page, eventsObject) {
			$(page).find('.introText').text('Welcome to EventBuzz');
			$(page).on('appShow', function () {
				Query.getAllData(function(eventsData) {

					window.eventsObject = eventsData.events;
					window.orderedArray = eventsData.order;

					console.log('page finished rendering now, start modifing...');
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
		function createItem(data, list) { 
			var entry = document.createElement('li');
			entry.setAttribute('class','app-button red');
			entry.setAttribute('data-target','page2');
			entry.setAttribute("onClick","transferToEventDetailsPage()");
			entry.appendChild(document.createTextNode(data));
			list.appendChild(entry);
		}
		//creates the events list on the home page
		function createList(list, filterBy) {
			//first date = first event .getDate()
			var currDate = eventsObject[orderedArray[0]].date;
			//create label with first date
				//1. first, trim the time of the dates, we dont want it displayed in the label
			var semiColonIndex = currDate.lastIndexOf(":");
			var newIndex = semiColonIndex - 3;
			var finalDateString = currDate.substring(0,newIndex);
			createLabel(finalDateString, list);

			for(var key in orderedArray) {
				//current event
				var event = eventsObject[orderedArray[key]];
				
				//current date = first date
				var eventDate = event.date;
				
				//if(current date != event .getDate() )				
				if( !(currDate === eventDate) ) {
					//create new label for new date, but first...
						//1. first, trim the time of the dates, we dont want it displayed in the label
					var semiColonIndex = eventDate.lastIndexOf(":");
					var newIndex = semiColonIndex - 3;
					var finalDateString = eventDate.substring(0,newIndex);
					createLabel(finalDateString, list);	

					//adjust currdate
					currDate = eventDate;
				}
				//create list item for event
				if(filterBy==null){
					createItem(event.name,list);
				}
 				if(event.categories[filterBy]) {
					//(event.categories[filterBy]) 					
					createItem(event.name,list);
 				}
			}
		}
		//this is called to transfer to the details page, pass arguments here
		function transferToEventDetailsPage() {
			App.load('page2', {})
		}