App.controller('profile', function (page, profileObject) 
{
	//This controller works very similarly to the controller implemented by MainEvent.js. The only difference
	//is that this version queries the database for profile-specific events. Currently, the query involved under
	//Query.getProfileData() uses a hard-coded user (doglover) to prove successful test queries. Once an actively 
	//logged in username is stored within the application, the hard-coded user will be replaced with the variable
	//representing user storage.
	
	//console.log("Object: " + profileObject + " is present");		

	$(page).on('appShow', function () 
	{
		if(window.filterFlag==true) 
		{
			var list = document.getElementById('profileList');
			list.innerHTML = "";
			createList(list, null)
		}

		else 
			
		{
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