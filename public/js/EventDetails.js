App.controller('details', function (page, eventObject) {
			//put stuff here
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

			

			/*
			var catcount = 0;
			if(eventObject.event.Category == "Sports"){
				$(page).find('.eventCategory').text("Category: #Sports");
				catcount++;
			}
			if(eventObject.event.Category = ){
				if(catcount == 1){
					$(page).find('.eventCategory2').text("#Clergy")

				}
				else{
					$(page).find('.eventCategory').text("#Clergy")
				}
			}
			if(eventObject.event.categories["infosession"]){
					if(catcount==1){
						$(page).find('.eventCategory2').text("#Infosession")

					}
					if(catcount==2){
						$(page).find('.eventCategory3').text("#Infosession")
					}
				else{
					$(page).find('.eventCategory').text("#Clergy")
				}
				$(page).find('.eventCategory').text("Info Session")
			}
			if(eventObject.event.categories["atl"]){
				$(page).find('.eventCategory').text("#Atlanta")
			}
			if(eventObject.event.categories["coc"]){
				$(page).find('.eventCategory').text("#College of Computing")
			}
			if(eventObject.event.categories["greek"]){
				$(page).find('.eventCategory').text("#Greek")
			}
			*/
});
try {
	App.restore();
} catch (err) {
	App.load('home');
}