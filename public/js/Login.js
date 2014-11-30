
App.controller('login', function (page) {
	//put stuff here
});

function checkCredentials(username, password) {
	var credentials = {};

  credentials.username = username;
  credentials.password = password;

	
  Query.checkLogin(credentials, function(isValid) {
    if (isValid) {
      console.log("Valid login!");
    } else {
      App.dialog({
        title        : 'Invalid Login',
        text         : 'The Username and Password provided were invalid.',
        cancelButton : 'Try Again'
      });
      App.load('login');
    }
  });
}
function inputFocus(i) {
  if (i.value == i.defaultValue) { 
  	i.value = ""; 
  	i.style.color = "#000"; 
  };
}

function inputBlur(i) {
  if (i.value == "") { 
  	i.value = i.defaultValue; 
  	i.style.color=  "#888"; 
  	i.type = null; 
  };
}
function passwordFocus(i) {
  if (i.value == i.defaultValue) { 
  	i.value = ""; 
  	i.style.color = "#000";
  	i.type="password"; 
  };
}