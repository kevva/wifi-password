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
	].join('\n')
});

wifiPassword(cli.input[0], function (err, password) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	console.log(password);
});
