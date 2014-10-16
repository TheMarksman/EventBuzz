
App.controller('login', function (page) {
	//put stuff here
});

function generateCredentials(username,password) {
	var credentials = [username, password];
	return credentials;
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