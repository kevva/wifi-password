'use strict';
const pify = require('pify');
const Promise = require('pinkie-promise');
const wifiName = require('wifi-name');

module.exports = ssid => {
	let fn = require('./lib/linux');

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
