'use strict';
const execa = require('execa');

module.exports = ssid => {
	const cmd = 'cmd';
	const args = [
		'/c',
		[
			'chcp 65001 > NUL',
			`netsh wlan show profile name=${ssid} key=clear`
		].join(' && ')
	];

	return execa.stdout(cmd, args).then(stdout => {
		let ret;

		ret = /^\s*Key Content\s*: (.+)\s*$/gm.exec(stdout);
		ret = ret && ret.length ? ret[1] : null;

		if (!ret) {
			throw new Error('Could not get password');
		}

		return ret;
	});
};
