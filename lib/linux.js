'use strict';
const execFile = require('child_process').execFile;
const pify = require('pify');

module.exports = ssid => {
	const cmd = 'sudo';
	const args = ['cat', `/etc/NetworkManager/system-connections/${ssid}`];

	return pify(execFile)(cmd, args).then(stdout => {
		let ret;

		ret = /^\s*(?:psk|password)=(.+)\s*$/gm.exec(stdout);
		ret = ret && ret.length ? ret[1] : null;

		if (!ret) {
			return Promise.reject(new Error('Could not get password'));
		}

		return ret;
	});
};
