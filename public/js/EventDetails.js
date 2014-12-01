App.controller('details', function (page, eventObject) {
	var selectedEvent = eventObject.event;
	var nameOfEvent = eventObject.eventName;
	var timeOfEvent = moment(selectedEvent.Date + ', ' + selectedEvent.Time);

	var timeOfEvent = timeOfEvent.format('h:mm A');

	$(page).find('.eventName').text(nameOfEvent);
	$(page).find('.eventDate').text(selectedEvent.Date);
	$(page).find('.eventTime').text(timeOfEvent);
	$(page).find('.eventCategory').text(selectedEvent.Category);
	$(page).find('.eventDescription').text(selectedEvent.Description);
	$(page).find('.eventLocation').text(selectedEvent.Location);
	$(page).find('.eventHost').text(selectedEvent.Host);

});

try {
	App.restore();
} catch (err) {
	App.load('home');
}
/*
function rsvp() {
	if (window.username) {
		Query.rsvpToEvent(eventObject, function() {
			App.dialog({
				title: 'Successfully RSVP\'d'
				okButton: 'OK'
			});
		});
	} else {
		App.dialog({
			title: 'Please log in to RSVP'
			okButton: 'OK'
		});
		App.load('login');
	}
}
*/