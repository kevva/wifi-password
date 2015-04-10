'use strict';

var test = require('ava');
var wifiPassword = require('./');

test(function (t) {
	t.plan(2);

	if (process.env.CI) {
		t.assert(true);
		t.assert(true);
		return;
	}

	wifiPassword(function (err, password) {
		t.assert(!err, err);
		t.assert(password, password);
	});
});
