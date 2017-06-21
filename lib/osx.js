'use strict';
const execa = require('execa');

module.exports = ssid => {
	const cmd = 'security';
	const args = ['find-generic-password', '-D', 'AirPort network password', '-wa', ssid];

	return execa(cmd, args)
		.then(res => {
			if (res.stderr) {
				throw new Error(res.stderr);
			}

			if (!res.stdout) {
				throw new Error('Could not get password');
			}

			return res.stdout;
		})
		.catch(err => {
			if (/The specified item could not be found in the keychain/.test(err.message)) {
				err.message = 'Your network doesn\'t have a password';
			}

			throw err;
		});
};
