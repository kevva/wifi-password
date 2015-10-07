'use strict';
var test = require('ava');
var wifiPassword = require('./');

test(function (t) {
	t.plan(1);

	wifiPassword().then(function (password) {
		t.assert(password, password);
	});
});
