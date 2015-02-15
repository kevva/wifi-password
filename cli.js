#!/usr/bin/env node
'use strict';

var meow = require('meow');
var wifiPassword = require('./');

meow({
	help: [
		'Usage',
		'  $ wifi-password',
		'  johndoesecretpassword'
	].join('\n')
});

wifiPassword(function (err, password) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	console.log(password);
});
