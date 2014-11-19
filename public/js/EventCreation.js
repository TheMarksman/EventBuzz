// This file is responsible for all functions and controllers associated 
// with the event creation page.

App.controller('event-creation', function(page) {

});

function addEventToDatabase() {
	var name = $('#inputName').val(),
	    date = new Date($('#inputDate').val()),
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
		isCollegeSponsoredEvents = $('#inputCollegeSponsoredEvents').is(':checked');

	var categories = [];

	if (isGreek) {
		categories.push('Greek');
	}

	if (isSports) {
		categories.push('Sports');
	}

	if (isFreeFood) {
		categories.push('Free Food');
	}

	if (isNonGreekSocial) {
		categories.push('Nongreek Social');
	}

	if (isInfoSession) {
		categories.push('Info Session');
	}

	if (isStudyGroup) {
		categories.push('Study Group');
	}

	if (isClubs) {
		categories.push('Clubs');
	}

	if (isCollegeSponsoredEvents) {
		categories.push('College Sponsored Events');
	}

	// Until we add users, creator is GT
	var eventData = {
		'name': name,
		'date': date,
		'time': time,
		'creator': 'GT',
		'host': host,
		'location': location,
		'description': description,
		'categories': categories
	};

	Query.createTheEvent(eventData);
};