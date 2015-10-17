'use strict';
const execFile = require('child_process').execFile;
const pify = require('pify');

module.exports = ssid => {
	const cmd = 'netsh';
	const args = ['wlan', 'show', 'profile', `name=${ssid}`, 'key=clear'];

	return pify(execFile)(cmd, args).then(stdout => {
		let ret;

		ret = /^\s*Key Content\s*: (.+)\s*$/gm.exec(stdout);
		ret = ret && ret.length ? ret[1] : null;

		if (!ret) {
			return Promise.reject('Could not get password');
		}

		return ret;
	});
};
