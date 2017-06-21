'use strict';
const execa = require('execa');

module.exports = ssid => {
	const cmd = 'sudo';
	const args = ['cat', `/etc/NetworkManager/system-connections/${ssid}`];

	return execa.stdout(cmd, args).then(stdout => {
		let ret;

		ret = /^\s*(?:psk|password)=(.+)\s*$/gm.exec(stdout);
		ret = ret && ret.length ? ret[1] : null;

		if (!ret) {
			throw new Error('Could not get password');
		}

		return ret;
	});
};
