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
	var allEventsArray =  [];
	
	//pull the information fom the form
    var formkeyword =	document.getElementById('filterkeyword').value;
    var formdate =		document.getElementById('filterdate').value;
    var formtime =		document.getElementById('filtertime').value;
    if(formtime != "") {
    	formtime = formtime.concat(":00");
    }
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
    var dateMatchesCounter = 0
    var dateMatchesHolder = [];
    var timeMatchesCounter = 0
    var timeMatchesHolder = [];
    //////////////////////////////
        
    //edge case
    //user has pressed filter, but has not selected any of the options
    //alert(categoriesCheckedOffByUser.length + formkeyword.length + formdate + formtime);
    if( (categoriesCheckedOffByUser.length==0) & (formkeyword.length==0) & (formdate === "") & (formtime === "") ){
    	//solution: just go back for now
    	//alert("Nothing was selected!");
    	App.dialog({
		  title        : 'Filter Error',
		  text         : 'Nothing was selected! Try again.',
		  okButton     : 'Ok.'
		  //cancelButton : 'Try Again'
		}, function (tryAgain) {
		  if (tryAgain) {
			// try again
		  }
		});
    	//App.back(function () {});
    	//window.scrollTo(-400,-400);
    	return;
    }
    
    
    //begin the main loop
    //here, run through all the objects in the data, add them to the new structure if they match filter criteria
	for(var i = 0; i < orderedArray.length; i++) {
	    var key = orderedArray[i]; 			//console.log("key: "+ key);
	    var event = eventsObject[key];		//console.log("event: " + event);
	    
	    //create allEventsArray
	    allEventsArray.push(event);
	    
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
	    //form date var def above = formdate;
	    var eventDate = event.Date;				
	    //console.log("eventDate: "+eventDate);
	    //console.log("formDate: "+formdate);
	    //alert("eventdate: " + eventDate + "\n" + "formdate: " + formdate);
	    //alert("eventdate: " + eventDate);
	    var stringformdate = conv(formdate);
	    if(stringformdate === eventDate) {
	    	//for all matches found: add current event to the new events object here
	    	//alert("Matched a date: " + key);
	    	dateMatchesCounter++;
	    	dateMatchesHolder.push(event.EventName);
	    	newEventsObject[key] = event;
		    newOrderedArray.push(key);
	    }
	    
	    
//next parse and filter by: Time
	    //pull the entered time from the form
	    var eventTime = event.Time;
	    //alert(eventTime);
		//formtime = formtime.concat(":00");
		//alert(formtime + " " + eventTime);
		if(formtime === eventTime) {
			//for all matches found: add current event to the new events object here
			//alert("Matched a time: " + key + " with " + eventTime);
			timeMatchesCounter++;
			timeMatchesHolder.push(event.EventName);
			newEventsObject[key] = event;
			newOrderedArray.push(key);
		}

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
	
// 	//begin time parsing
// 	//var eventTime = event.Time;
// 	formtime = formtime.concat(":00");
// 	alert(formtime);
// 	var filterobj = crossfilter(allEventsArray);
// 	var lengthoffilterobj = filterobj.groupAll().reduceCount().value();
// 	//var IDsum = filterobj.groupAll().reduceSum(function(event) { return event.ID; }).value();
// 		
// 	var time_Dimension = filterobj.dimension(function(d) { return d.Time; });
// 	time_Dimension.filter(formtime);
// 	//typeDimension.filterRange("15:00:00","15:00:00");
// 	var count_time_Dimension = time_Dimension.group().reduceCount();
// 	var size = count_time_Dimension.size();
// 	var listOfRelevant = time_Dimension.top(size);
// 	var numFinRecs = listOfRelevant.length;
// 	alert("total: " + numFinRecs);
// 	//alert("filterobj: "+filterobj);
// 	//alert("IDsum: "+IDsum);
// 	alert("listOfRelevant: "+listOfRelevant);
// 	alert(listOfRelevant[0].EventName + " " + listOfRelevant[0].Time);
// 	//alert(listOfRelevant[1].EventName);
// 	//alert(listOfRelevant[2].EventName);
// 	//alert(a[3].EventName);
// 	//alert("lengthofobj: "+ size);
// 	
// 	for(var i = 0; i< numFinRecs; i++) {
// 		//for all matches found: add current event to the new events object here
// 		alert("Matched a time: " + listOfRelevant[i].EventName + " with " + listOfRelevant[i].Time);
// 	   	timeMatchesCounter++;
//  		timeMatchesHolder.push(event.EventName);
// 		newEventsObject[key] = event;
// 	  	newOrderedArray.push(key);
// 	}
 	//alert("donefiltering, now start checking for duplicates");	
	var newnewEventsObject = {};
	var newnewOrderedArray = [];
	for(var iii = 0; iii < orderedArray.length; iii++) {
		var newkey = orderedArray[iii];				//console.log("key: "+ key);
	    var newevent = eventsObject[newkey];		//console.log("event: " + event);
		if(newEventsObject[newkey] != null) {
			//alert(newkey);
			newnewEventsObject[newkey] = newevent;
			newnewOrderedArray.push(newkey);
		}
	}
	
	//this fixes a bug where multiple matches throughout filtering creates duplicate event entries
	newEventsObject = newnewEventsObject;
	newOrderedArray = newnewOrderedArray;
	
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
    
    //ending conditions
    if(newOrderedArray.length == 0) {
    	//alert(newOrderedArray.length);
    	//alert("No matching results after filtering!");
    	App.dialog({
		  title        : 'Filter Error',
		  text         : 'No matching results after filtering! Try again.',
		  //okButton     : 'Try Again',
		  cancelButton : 'Try Again'
		}, function (tryAgain) {
		  if (tryAgain) {
			// try again
		  }
		});
    	//App.back(function () {});
    	clearform();
    	//window.scrollTo(-400,-400);
    	//$(page).scrollTop(0);
    	return;
    }
    
    //Now this section incorporates multipleFilters
    //This removes are bug with: AND vs OR filtering
	var temp = multipleFilters(categoryMatchesHolder,keywordMatchesHolder,dateMatchesHolder,timeMatchesHolder);		
    alert(temp);
    //to fix this bug, the mulitpleFeatures method is called which returns a string array under certain conditions
    //the string array contains the intersection of multipleFilters
    //now...
    if(temp != null) {
    	alert("prep");
		var newnewnewEventsObject = {};
		var newnewnewOrderedArray = [];
		for(var iiii = 0; iiii < temp.length; iiii++) {
			var newkey = orderedArray[iiii];				//console.log("key: "+ key);
			var newevent = eventsObject[newkey];		//console.log("event: " + event);
			if(newEventsObject[newkey] != null) {
				//alert(newkey);
				newnewnewEventsObject[newkey] = newevent;
				newnewnewOrderedArray.push(newkey);
			}
		}
		//this fixes a bug where multiple matches throughout filtering creates duplicate event entries
		newEventsObject = newnewnewEventsObject;
		newOrderedArray = newnewnewOrderedArray;	
    }
    
    
    
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

//string format conversion
function conv(formdate) {
	//ex. turn this: 2014-10-27
		//into this: October 27 2014
	var d = new Date(formdate + " 00:00"); 	//the "00:00" fixes a browser dependent bug
	var month = d.toDateString().slice(4,7);
		//alert(month);
	var everythingElse = d.toDateString().slice(7);
		//alert(everythingElse);
		//alert(everythingElse.charAt(1));
		//alert("this is what im comparing:" + month + "Nov" +"??");
		//edge case
		if(everythingElse.charAt(1)==='0') {
			//alert("SPECIAL");
			everythingElse = everythingElse.slice(2);
			//alert(everythingElse);
			var space = " ";
			everythingElse = space.concat(everythingElse);
		}
	var newMonth = "";
	if(month === "Jan") { newMonth = "January"};
	if(month === "Feb") { newMonth = "February"};
	if(month === "Mar") { newMonth = "March"};
	if(month === "Apr") { newMonth = "April"};
	if(month === "May") { newMonth = "May"};
	if(month === "Jun") { newMonth = "June"};
	if(month === "Jul") { newMonth = "July"};
	if(month === "Aug") { newMonth = "August"};
	if(month === "Sep") { newMonth = "September"};
	if(month === "Oct") { newMonth = "October"};
	if(month === "Nov") {newMonth = "November"};
	if(month === "Dec") { newMonth = "December"};
	
	newMonth = newMonth + everythingElse;
	//alert("Done:" + newMonth+"?");
	return newMonth;
}

function clearform() {
	document.getElementById("filterform").reset();
}

function multipleFilters(array1, array2, array3, array4) {
	var size1 = array1.length;
	var size2 = array2.length;
	var size3 = array3.length;
	var size4 = array4.length;
	alert(size1 + " " + size2 + " " + size3 + " " + size4);
	
	//0000	works
	if(size1==0 & size2==0 & size3==0 & size4==0) {
		//var _ans = array1.filter(function(n) {
		//	return ( (array2.indexOf(n) != -1) & (array3.indexOf(n) != -1) & (array4.indexOf(n) != -1) )
		//});
		alert("FinalFilter0000: " + _ans);
		return;
	}
	//0001	works
	else if(size1==0 & size2==0 & size3==0 & size4!=0) {
		//var _ans = array1.filter(function(n) {
		//	return ( (array2.indexOf(n) != -1) & (array3.indexOf(n) != -1) & (array4.indexOf(n) != -1) )
		//});
		alert("FinalFilter0001: " + _ans);
		return;
	}
	//0010	works
	else if(size1==0 & size2==0 & size3==0 & size4!=0) {
		//var _ans = array1.filter(function(n) {
		//	return ( (array2.indexOf(n) != -1) & (array3.indexOf(n) != -1) & (array4.indexOf(n) != -1) )
		//});
		alert("FinalFilter0010: " + _ans);
		return;
	}
	//0011	done
	else if(size1==0 & size2==0 & size3!=0 & size4!=0) {
		var _ans = array3.filter(function(n) {
			return array4.indexOf(n) != -1
		});
		//alert("FinalFilter0011: " + _ans);
		return _ans;
	}
	//0100	works
	else if(size1==0 & size2==0 & size3==0 & size4!=0) {
		//var _ans = array1.filter(function(n) {
		//	return ( (array2.indexOf(n) != -1) & (array3.indexOf(n) != -1) & (array4.indexOf(n) != -1) )
		//});
		alert("FinalFilter0100: " + _ans);
		return;
	}
	//0101	done
	else if(size1==0 & size2!=0 & size3==0 & size4!=0) {
		var _ans = array2.filter(function(n) {
			return array4.indexOf(n) != -1
		});
		//alert("FinalFilter0101: " + _ans);
		return _ans;
	}
	//0110	done
	else if(size1==0 & size2!=0 & size3!=0 & size4==0) {
		var _ans = array2.filter(function(n) {
			return array3.indexOf(n) != -1
		});
		//alert("FinalFilter0110: " + _ans);
		return _ans;
	}
	//0111	done
	else if( size1==0 & size2!=0 & size3!=0 & size4!=0 ) {
		var _ans = array2.filter(function(n) {
			return ( (array3.indexOf(n) != -1) & (array4.indexOf(n) != -1) )
		});
		//alert("FinalFilter0111: " + _ans);
		return _ans;
	}
	//1000	works
	else if(size1==0 & size2==0 & size3==0 & size4!=0) {
		//var _ans = array1.filter(function(n) {
		//	return ( (array2.indexOf(n) != -1) & (array3.indexOf(n) != -1) & (array4.indexOf(n) != -1) )
		//});
		alert("FinalFilter1000: " + _ans);
		return;
	}
	//1001	done
	else if(size1!=0 & size2==0 & size3==0 & size4!=0) {
		var _ans = array1.filter(function(n) {
			return array4.indexOf(n) != -1
		});
		//alert("FinalFilter1001: " + _ans);
		return _ans;
	}
	//1010	done
	else if(size1!=0 & size2==0 & size3!=0 & size4==0) {
		var _ans = array1.filter(function(n) {
			return array3.indexOf(n) != -1
		});
		//alert("FinalFilter1010: " + _ans);
		return _ans;
	}
	//1011	done
	else if(size1!=0 & size2==0 & size3!=0 & size4!=0) {
		var _ans = array1.filter(function(n) {
			return ( (array3.indexOf(n) != -1) & (array4.indexOf(n) != -1) )
		});
		//alert("FinalFilter1011: " + _ans);
		return _ans;
	}
	//1100	done
	else if(size1!=0 & size2!=0 & size3==0 & size4==0) {
		var _ans = array1.filter(function(n) {
			return array2.indexOf(n) != -1
		});
		//alert("FinalFilter1100: " + _ans);
		return _ans;
	}
	//1101	done
	else if(size1!=0 & size2!=0 & size3==0 & size4!=0) {
		var _ans = array1.filter(function(n) {
			return ( (array2.indexOf(n) != -1) & (array4.indexOf(n) != -1) )
		});
		//alert("FinalFilter1101: " + _ans);
		return _ans;
	}
	//1110 done
	else if(size1!=0 & size2!=0 & size3!=0 & size4==0) {
		var _ans = array1.filter(function(n) {
			return ( (array2.indexOf(n) != -1) & (array3.indexOf(n) != -1) )
		});
		//alert("FinalFilter1110: " + _ans);
		return _ans;
	}
	//1111	done
	else if(size1!=0 & size2!=0 & size3!=0 & size4!=0) {
		var _ans = array1.filter(function(n) {
			return ( (array2.indexOf(n) != -1) & (array3.indexOf(n) != -1) & (array4.indexOf(n) != -1) )
		});
		//alert("FinalFilter1111: " + _ans);
		return _ans;
	}
}