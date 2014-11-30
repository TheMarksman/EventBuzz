App.controller('profile', function (page, profileObject) 
{
	//This controller works very similarly to the controller implemented by MainEvent.js. The only difference
	//is that this version queries the database for profile-specific events. Currently, the query involved under
	//Query.getProfileData() uses a hard-coded user (doglover) to prove successful test queries. Once an actively 
	//logged in username is stored within the application, the hard-coded user will be replaced with the variable
	//representing user storage.
	$(page).on('appShow', function () 
	{
		//Query the database for the current user's objects
		
		var verify = 5;
		
		//testing statements:
		console.log("After loading profile, we have: ");
		console.log(verify);

		//See if the arguments of the current user's objects are null.
		if(verify == null) {

			// var list = document.getElementById('profileList');
			// list.innerHTML = "";
			// createList(list, null)
			
			//In the case that they are, create hard-coded event that says "No events have been RSVP'd"

			alert("You don't have any RSVP'd events!");
			
		} 
		//otherwise, populate the list with that user's RSVP'd events
		else {
			Query.getProfileData(function(eventsData) {
				window.profileObject = eventsData.events;
				window.orderedArray = eventsData.order;
				var list = document.getElementById('profileList');
				list.innerHTML = "";
				createList(list, null);
			});
		}	
	});
});		