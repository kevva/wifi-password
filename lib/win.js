'use strict';
const execa = require('execa');

module.exports = ssid => {
	// Assumes only one connected WLAN interface, which is likely
	const cmd = 'netsh';
	const args = ['wlan', 'show', 'profile', 'name=*'];

	return execa.stdout(cmd, args).then(stdout => {
		let profile;

		// Get profile for our SSID
		let re = new RegExp('(?:Name\\s+: "?)(.+?$)(?:[\\s\\S][^=]*?(?=\\n.*?"' + ssid + '"))', "gm");
		profile = re.exec(stdout)[1];
		profile = profile && profile.length ? profile : null;

		if (!profile) {
			throw new Error('Could not get profile name');
		}

		return profile;
	})
	.then(function(profile) {
		const args = ['wlan', 'show', 'profile', `name=${profile}`, 'key=clear'];
		return execa.stdout(cmd, args).then(stdout => {
			let ret;

			ret = /^\s*Key Content\s*: (.+)\s*$/gm.exec(stdout);
			ret = ret && ret.length ? ret[1] : null;

			if (!ret) {
				throw new Error('Could not get password');
			}

			return ret;
		});
	});
};
