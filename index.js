'use strict';

var exec = require('child_process').exec;
var wifiname = require('wifi-name');

function filter(stdout, str) {
	var regex = new RegExp(str);

	stdout = stdout.split('\n').filter(function (el) {
		return regex.test(el);
	});

	return stdout.length ? stdout[0].replace(regex, '') : null;
}

module.exports = function (cb) {
	var cmd;
	var ret;

	if (process.platform !== 'darwin' && process.platform !== 'linux') {
		throw new Error('Only OS X and Linux systems are supported');
	}

	wifiname(function (err, name) {
		if (err) {
			cb(err);
			return;
		}

		if (process.platform === 'darwin') {
			cmd = 'security find-generic-password -ga "' + name + '"';
		} else if (process.platform === 'linux') {
			cmd = 'sudo cat /etc/NetworkManager/system-connections/"' + name + '"';
		}

		exec(cmd, function (err, stdout) {
			if (err) {
				cb(err);
				return;
			}

			if (stdout && process.platform === 'darwin') {
				ret = filter(stdout, '^password: ');
			}

			if (stdout && process.platform === 'linux') {
				ret = filter(stdout, '^psk=');
			}

			cb(null, ret);
		});
	});
};
