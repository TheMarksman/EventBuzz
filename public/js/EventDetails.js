//Rita Controller
App.controller('page2', function (page) {
	//put stuff here
});
try {
	App.restore();
} catch (err) {
	App.load('home');
}