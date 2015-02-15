'use strict';

var test = require('ava');
var wifiPassword = require('./');

test(function (t) {
	t.plan(2);

	wifiPassword(function (err, password) {
		t.assert(!err, err);

		if (process.env.CI) {
			t.assert(true);
			return;
		}

		t.assert(password);
	});
});
