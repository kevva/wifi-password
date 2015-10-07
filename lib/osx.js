'use strict';
var execFile = require('child_process').execFile;
var pify = require('pify');
var Promise = require('pinkie-promise');

module.exports = function (ssid) {
	var cmd = 'security';
	var args = ['find-generic-password', '-D', 'AirPort network password', '-wa', ssid];

	return pify(execFile, Promise)(cmd, args).then(function (stdout, stderr) {
		stdout = stdout.trim();

		if (stderr) {
			return Promise.reject(new Error(stderr));
		}

		if (!stdout) {
			return Promise.reject(new Error('Could not get password'));
		}

		return stdout;
	}).catch(function (err) {
		if (/The specified item could not be found in the keychain/.test(err.message)) {
			err.message = 'Your network doesn\'t have a password';
		}

		throw err;
	});
};
