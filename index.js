'use strict';
var pify = require('pify');
var Promise = require('pinkie-promise');
var wifiName = require('wifi-name');

module.exports = function (ssid) {
	var fn = require('./lib/linux');

	if (process.platform === 'darwin') {
		fn = require('./lib/osx');
	}

	if (process.platform === 'win32') {
		fn = require('./lib/win');
	}

	if (ssid) {
		return fn(ssid);
	}

	return pify(wifiName, Promise)().then(fn);
};
