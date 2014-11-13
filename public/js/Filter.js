App.controller('filter', function (page) {
	//turn off flag when arriving at filter page
		//this not only initiates flag, it also debugs going into this page, and then pressing back without filtering
	window.filterFlag=false;
	$(page).on('appShow', function () {
		//update the data upon entering filter
		Query.getAllData(function(eventsData) {
			window.eventsObject = eventsData.events;
			window.orderedArray = eventsData.order;
		});
		console.log("On filter boot, I find this: ");
		console.log(window.eventsObject);
		console.log(window.orderedArray);
	});
});

function transferHomeFromFilter() {
	//grab this for the main loop
	var orderedArray = window.orderedArray;
	
	//holder structures
	var newEventsObject = {};
	var newOrderedArray = [];
	
	//pull the information fom the form
    var formkeyword =	document.getElementById('filterkeyword').value;
    var formdate =		document.getElementById('filterdate').value;
    var categGreek =	document.getElementById("filterGreek").checked;
    var categSports =	document.getElementById("filterSports").checked;
    var categFood =		document.getElementById("filterFood").checked;
    var categNonG =		document.getElementById("filterNonG").checked;
    var categInfoS =	document.getElementById("filterInfoS").checked;
    var categStudy =	document.getElementById("filterStudy").checked;
    var categClub =		document.getElementById("filterClub").checked;		
    var categColl =		document.getElementById("filterColl").checked;			    			    
    
    //create a list for all the categories checked off by the user
    var categoriesCheckedOffByUser = []
    if(categGreek == true) {
    	categoriesCheckedOffByUser.push("greek");
    }
    if(categSports == true) {
    	categoriesCheckedOffByUser.push("sports");
    }			
    if(categFood == true) {
    	categoriesCheckedOffByUser.push("food");
    }			    
    if(categNonG == true) {
    	categoriesCheckedOffByUser.push("nong");			//figure out the codeword for this category
    }
    if(categInfoS == true) {
    	categoriesCheckedOffByUser.push("info");
    }
    if(categStudy == true) {
    	categoriesCheckedOffByUser.push("study");
    }
    if(categClub == true) {
    	categoriesCheckedOffByUser.push("clubs");
    }
    if(categColl == true) {
    	categoriesCheckedOffByUser.push("college");
    }
    //alert("this is what got checked off: " + categoriesCheckedOffByUser);   
    
    //filter stats, info summary, used for debugging
    var categoryMatchesCounter = 0;
    var categoryMatchesHolder = [];
    var keywordMatchesCounter = 0
    var keywordMatchesHolder = [];
    //////////////////////////////
    
    
    //edge case
    //user has pressed filter, but has not selected any of the options
    if( (categoriesCheckedOffByUser.length==0) & (formkeyword.length==0) ){
    	//solution: just go back for now
    	//alert("nothing selected");
    	App.back(function () {});
    	return;
    }
    
    
    //begin the main loop
    //here, run through all the objects in the data, add them to the new structure if they match filter criteria
	for (var i = 0; i < orderedArray.length; i++) {
	    var key = orderedArray[i]; 			//console.log("key: "+ key);
	    var event = eventsObject[key];		//console.log("event: " + event);
	    
	    //now you have individual keys and events, begin parsing filters
	    
	    //parsing for the keyword filter, create a bank of contents
	    var eventStringContent = 	event.Category + " " +
	    							event.Creator +  " " +
	    							event.Date +  " " +
	    							event.Description + " " + 
	    							event.EventName +  " " +
	    							event.Host +  " " +
	    							event.Location;
	    //standardize search string here
	    eventStringContent = eventStringContent.toLowerCase();		//console.log("search string: "+eventStringContent)
	    //formkeyword is what gets typed into the form by users
	    formkeyword = formkeyword.toLowerCase();					//console.log("user typed: " + formkeyword);
	    
	    //now you have the keyword and the event strings, search here, protip: make sure that there is actually a keyword present
	    if( (formkeyword.length>0) & (eventStringContent.indexOf(formkeyword)!=-1)) {
	    	//alert("Matched a Keyword!: " + key);
	    	keywordMatchesCounter++;
	    	keywordMatchesHolder.push(event.EventName);
	    	
	    	//insert this event into the new object here
	    	newEventsObject[key] = event;
	    	//insert key into ordered array
	    	newOrderedArray.push(key);
	    }

		//next parse and filter by: Date
	    //pull the entered date from the form
	    var eventDate = event.Date;				console.log(eventDate);
	    											//console.log(formdate);
	    //next parse and filter by: Time
	    //pull the entered time from the form
	    var eventTime = event.Time;

	    //next parse and filter by: Categories
	    											//alert("categories checked: "+categGreek + categSports + categFood + categNonG + categInfoS + categStudy + categClub + categColl)  
	    //grab the categories stored in the current event object
	    var thiseventscategories = event.Category.toLowerCase().trim();
//manual conversions here, fix lata
	    //really really really bad
	    	//unit test
	    	//case: the event being tested here is a nongreek social event
	    		//the test is looking for greek events
	    		//the agent here confuses nongreek with greek
	    	//solution: 
	    		//change the parser here
	    		//change to coding scheme: make nongreek social something like non_g social
	    		//change the form of that string here
	    //im gonna change to form for now, but this should be looked at asap
	    //todo: fix this bug ^^^^
	    //changing the form below:
	    if(thiseventscategories.indexOf("nongreek")!=-1) {
	    	thiseventscategories = "nong"
	    }
	    //bad^^^^^, this will break once we data with multiple categories included in the test data
//END: manual conversions above, fix lata
	    
	    //alert("current event object has: " + thiseventscategories);
	    //alert("selected categories from the form: "+ categoriesCheckedOffByUser);
	    //alert("entering final forloop, size: " + categoriesCheckedOffByUser.length);
	    
	    //now see if the current event has any of the categories selected by user
	    //loop through the categories checked off by the user
	    for(var w=0; w<categoriesCheckedOffByUser.length; w++) {
	    	//grab one of these categories (strings)
	    	var oneUserSelectedCategory = categoriesCheckedOffByUser[w];						//this is a userSelectedCategory
	    	//alert("counting: " + w + " of this: " + categoriesCheckedOffByUser.length);
	    	//alert("looking for this chosen keyword: "+ oneUserSelectedCategory);
	    	
	    	//search the current object for the category string
	    	if(thiseventscategories.indexOf(oneUserSelectedCategory)!=-1) {
	    		//for all matches found: add current event to the new events object here
	    		//alert("Matched a Category: " + key);
	    		categoryMatchesCounter++;
	    		categoryMatchesHolder.push(event.EventName);
	    		newEventsObject[key] = event;
		    	newOrderedArray.push(key);
    		}
	    }
	}
	
	
	//////////////////////////////////////////////////////////////////////		
	//Debug statements for the filter feature:
		//console.log("Total keyword matches: " + keywordMatchesCounter);
		//console.log("Total keyword matches: " + keywordMatchesHolder);	
		//console.log("Total category matches: " + categoryMatchesCounter);
		//console.log("Total category matches: " + categoryMatchesHolder);	
	//////////////////////////////////////////////////////////////////////
	
	
	//////////////////////////////////////////////////////////////////////
	//Debug statements for the transfer of this data to the main page
	//console.log("\the stuff in this window");
	//console.log(window.eventsObject);
	//console.log(window.orderedArray);
	//console.log("\the stuff i just created");
	//console.log(newEventsObject);
	//console.log(newOrderedArray);
	//////////////////////////////////////////////////////////////////////

    
	//NOW: update the eventsObject stored in the page to reflect the filter changes
	window.eventsObject = newEventsObject;
	window.orderedArray = newOrderedArray;
	
	//////////////////////////////////////////////////////////////////////
	//old transfer methods
	//method 1: almost there, create custom obj
	//var passer = {"newobjs":newEventsObject,"neword":newOrderedArray,"flag": true}
	//App.load('home', passer) //pass in here
	//////////////////////////////////////////////////////////////////////
	
	//Navigate back to the main page, first set the flag to notify homepage of incoming filtered data
	//alert("ending filer function");
	window.filterFlag = true;
	App.back(function () {});
	//alert("transferToHomeFromFilter");
}