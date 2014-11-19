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
		isCollegeSponsoredEvents = $('#inputCollegeSponsoredEvents').is(':checked'),
		isOther = $('#inputOther').is(':checked');

	var categories = "";

	if (isFreeFood) {
		categories = categories + 'Free Food ';
	}

	if (isSports) {
		categories = categories + 'Sports ';
	}

	if (isGreek) {
		categories = categories + 'Greek ';
	}

	if (isStudyGroup) {
		categories = categories + 'Study Groups ';
	}

	if (isClubs) {
		categories = categories + 'Clubs ';
	}

	if (isCollegeSponsoredEvents) {
		categories = categories + 'College Sponsored Events ';
	}

	if (isInfoSession) {
		categories = categories + 'Info Sessions ';
	}

	if (isNonGreekSocial) {
		categories = categories + 'Nongreek Social ';
	}

	if (isOther) {
		categories = categories + 'Other ';
	}

	categories.trim();

	var formatDate = moment(date),
		formatTime = moment(time, 'HH:mm');

	var formattedDate = formatDate.format('YYYY-MM-DD'),
		formattedTime = formatTime.format('HH:mm:ss');


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

	Query.createTheEvent(eventData);
};