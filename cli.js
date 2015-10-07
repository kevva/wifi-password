#!/usr/bin/env node
/* eslint-disable no-mixed-spaces-and-tabs */
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

wifiPassword(cli.input[0]).then(password => console.log(password));
