#!/usr/bin/env node
'use strict';
const meow = require('meow');
const wifiPassword = require('./');

const cli = meow(`
	Usage
	  $ wifi-password
	  johndoesecretpassword

	  $ wifi-password foo-network
	  foosecretpassword
`);

wifiPassword(cli.input[0])
	.then(password => console.log(password))
	.catch(err => {
		if (err.message.indexOf(`Your network doesn't have a password`)) {
			console.error(err.message);
			process.exit(1);
		}

		throw err;
	});
