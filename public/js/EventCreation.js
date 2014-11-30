// This file is responsible for all functions and controllers associated 
// with the event creation page.

App.controller('event-creation', function(page) {

});

function addEventToDatabase() {
	var name = $('#inputName').val(),
	    //date = new Date($('#inputDate').val()),							//this has an off by one error
	    date = new Date( ($('#inputDate').val()) + " 00:00"),				//this is better
	    time = $('#inputTime').val(),
	    host = $('#inputHost').val(),
	    location = $('#inputLocation').val(),
	    description = $('#inputDescription').val();

	var isGreek = $('#inputGreek').is(':checked'),
		isSports = $('#inputSports').is(':checked'),
		isFreeFood = $('#inputFreeFood').is(':checked'),
		isNonGreekSocial = $('#inputNonGreekSocial').is(':checked'),
		isInfoSession = $('#inputInfoSession').is(':checked'),
		isStudyGroup = $('#inputStudyGroup').is(':checked'),
		isClubs = $('#inputClubs').is(':checked'),
		isCollegeSponsoredEvents = $('#inputCollegeSponsoredEvents').is(':checked'),
		isOther = $('#inputOther').is(':checked');

	var categories = "";

	if (isFreeFood) {
		categories = categories + 'Free Food, ';
	}

	if (isSports) {
		categories = categories + 'Sports, ';
	}

	if (isGreek) {
		categories = categories + 'Greek, ';
	}

	if (isStudyGroup) {
		categories = categories + 'Study Groups, ';
	}

	if (isClubs) {
		categories = categories + 'Clubs, ';
	}

	if (isCollegeSponsoredEvents) {
		categories = categories + 'College Sponsored Events, ';
	}

	if (isInfoSession) {
		categories = categories + 'Info Sessions, ';
	}

	if (isNonGreekSocial) {
		categories = categories + 'Nongreek Social, ';
	}

	if (isOther) {
		categories = categories + 'Other';
	}

	//categories.trim();
	//alert(categories);
	if(categories.charAt(categories.length - 2) === ",") { 
		//alert("ending with a comma");
		categories = categories.substr(0,categories.length-2);
	}
	categories.trim();

	var formatDate = moment(date),
		formatTime = moment(time, 'HH:mm');

	var formattedDate = formatDate.format('YYYY-MM-DD'),
		formattedTime = formatTime.format('HH:mm:ss');
	
	////////////////////////////////////////////////
	//Debug Statements
	//alert("formdate: " + $('#inputDate').val());
	//alert("convdate: " + date);
	//alert("formatted: " + formattedDate);
	////////////////////////////////////////////////

	// Until we add users, creator is GT
	var eventData = {
		'name': name,
		'date': formattedDate,
		'time': formattedTime,
		'creator': 'GT',
		'host': host,
		'location': location,
		'description': description,
		'categories': categories.trim()
	};
	
	//////////////////////////////////////////////////////
	//Debug
	//alert(eventData);
	//alert(eventData.name + "\n" + eventData.date + "\n" + 
	//	eventData.time + "\n" + eventData.creator + "\n" + eventData.host + "\n" + 
	//		eventData.location + "\n" + eventData.description + "\n" + eventData.categories + "\n");
	//////////////////////////////////////////////////////
	Query.createTheEvent(eventData);
	//alert("created event!");
	App.dialog({
		  title        : 'Success',
		  text         : 'Successfully created event!',
		  okButton     : 'Ok',
		  //cancelButton : 'Try Again'
	}, function (tryAgain) {
		  if (tryAgain) {
			// try again
		  }
	});
};