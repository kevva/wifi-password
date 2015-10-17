'use strict';
const execFile = require('child_process').execFile;
const pify = require('pify');

module.exports = ssid => {
	const cmd = 'security';
	const args = ['find-generic-password', '-D', 'AirPort network password', '-wa', ssid];

	return pify(execFile)(cmd, args).then((stdout, stderr) => {
		stdout = stdout.trim();

		if (stderr) {
			return Promise.reject(new Error(stderr));
		}

		if (!stdout) {
			return Promise.reject(new Error('Could not get password'));
		}

		return stdout;
	}).catch(err => {
		if (/The specified item could not be found in the keychain/.test(err.message)) {
			err.message = 'Your network doesn\'t have a password';
		}

		throw err;
	});
};
