'use strict';

var exec = require('child_process').exec;
var wifiname = require('wifi-name');

module.exports = function (cb) {
	var cmd;

	if (process.platform !== 'darwin' && process.platform !== 'linux') {
		throw new Error('Only OS X and Linux systems are supported');
	}

	wifiname(function (err, name) {
		if (err) {
			cb(err);
			return;
		}

		if (process.platform === 'darwin') {
			cmd = [
				'security find-generic-password -ga "' + name + '"',
				'| sed -e "s/^.*\\"\\(.*\)\\".*$/\\1/"'
			].join('');
		} else if (process.platform === 'linux') {
			cmd = [
				'sudo cat /etc/NetworkManager/system-connections/"' + name + '"',
				'| grep \'^psk=\' | cut -d\\= -f2'
			].join(' ');
		}

		exec(cmd, function (err, stdout) {
			if (err) {
				cb(err);
				return;
			}

			cb(null, stdout.trim());
		});
	});
};
