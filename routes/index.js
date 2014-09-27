// This file contains all routing code
// Routes are requested and the appropriate data is provided along with the view.

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('main', {title: 'Event Page!'});
});

router.get('/filter', function(req, res) {
	res.render('filter', {title: 'Filter Page!'})
});

router.get('/accountcreation', function(req, res) {
	res.render('account-creation', {title: 'Account Creation Page!'})
});

router.get('/login', function(req, res) {
	res.render('login', {title: 'Login Page!'})
});

router.get('/profile', function(req, res) {
	res.render('profile', {title: 'Profile Page!'})
});

router.get('/eventcreation', function(req, res) {
	res.render('create', {title: 'Event Creation Page!'})
});

module.exports = router;
