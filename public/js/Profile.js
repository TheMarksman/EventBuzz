App.controller('profile', function (page, profileObject) 
{
	
	console.log("Do I have an object yet?:");		
	console.log(profileObject);

	$(page).on('appShow', function () 
	{
		if(window.filterFlag==true) 
		{
			//alert("incoming filtered data");
			var list = document.getElementById('profileList');
			//clear the list, prep for new stuff
			list.innerHTML = "";
			
			//DEBUG: This is where the new data is:
			//console.log(window.eventsObject);
			//console.log(window.orderedArray);
			
			//now create the list with it
			createList(list, null)
			//alert("finishedfilteredloading");
		}

		else 
			
		{
			//alert("firsttimeloadingHOME");
			//alert("is the flag set?:"+window.filterFlag);
			
			//because the flag is not set, query DB and dump everything in
			Query.getProfileData(function(eventsData) {
				window.profileObject = eventsData.events;
				window.orderedArray = eventsData.order;
				var list = document.getElementById('profileList');
				
				//this clears the list to fix the bug where navigating back to home duplicates the existing list
				list.innerHTML = "";
				
				//dump all data into the homepage
				createList(list, null);
			});
			//alert("finishedloadingfirsttime");
		}	
	
		//end controller
	});
});		