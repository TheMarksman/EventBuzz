App.controller('account-creation', function (page) {
	
});

function addAccountToDatabase() {
	var username = $('#inputUsnm').val(),
		email = $('#inputEmail').val(),
		password = $('#inputPass').val(),
		confirmPassword = $('#inputPass2').val();

	if (password.localeCompare(confirmPassword) != 0) {
		App.dialog({
			title        : 'Password Invalid',
        	text         : 'Passwords do not match.',
        	cancelButton : 'Try Again'
		});
		return;
	}

	var accountData = {};
	accountData.username = username;
	accountData.email = email;
	accountData.password = password;

	Query.addAccountToDatabase(accountData, function(isAccepted) {
		if (isAccepted) {
			App.dialog({
				title: 'Account Created',
				text: 'Please login to use additional features.',
				okButton: 'OK'
			});
			App.load('login');

		} else {
			App.dialog({
				title: 'Invalid Username',
				text: 'That username has already been taken. Please choose another.',
				cancelButton: 'Try Again'
			});
		}
	});
}
