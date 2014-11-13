// This file is responsible for all functions and controllers associated 
// with the event creation page.

App.controller('event-creation', function(page) {

});

function createEvent() {
	var name = $('#inputName').val(),
	    date = $('#inputDate').val(),
	    time = $('#inputTime').val();

	var isGreek = $('#inputGreek').is(':checked'),
		isSports = $('#inputSports').is(':checked'),
		isFreeFood = $('#inputFreeFood').is(':checked'),
		isNonGreekSocial = $('#inputNonGreekSocial').is(':checked'),
		isInfoSession = $('#inputInfoSession').is(':checked'),
		isStudyGroup = $('#inputStudyGroup').is(':checked'),
		isClubs = $('#inputClubs').is(':checked'),
		isCollegeSponsoredEvents = $('#inputCollegeSponsoredEvents').is(':checked');

	
}