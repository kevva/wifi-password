#!/usr/bin/env node
'use strict';
var meow = require('meow');
var wifiPassword = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ wifi-password',
		'  johndoesecretpassword',
		'',
		'  $ wifi-password foo-network',
		'  foosecretpassword'
	]
});

wifiPassword(cli.input[0]).then(function (password) {
	console.log(password);
});
