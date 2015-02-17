'use strict';

var childProcess = require('child_process');
var wifiname = require('wifi-name');

function getPassword(name, cb) {
	var cmd;
	var args;
	var ret;

	if (process.platform === 'darwin') {
		cmd = 'security';
		args = ['find-generic-password', '-ga', name];
	} else if (process.platform === 'linux') {
		cmd = 'sudo';
		args = ['cat', '/etc/NetworkManager/system-connections/', name];
	}

	childProcess.execFile(cmd, args, function (err, stdout, stderr) {
		if (err) {
			cb(err);
			return;
		}

		if (stdout && process.platform === 'darwin') {
			ret = /^\s*password: "(.+)"\s*$/gm.exec(stderr);
			ret = ret && ret.length ? ret[1] : null;
		}

		if (stdout && process.platform === 'linux') {
			ret = /^\s*psk=(.+)\s*$/gm.exec(stdout);
			ret = ret && ret.length ? ret[1] : null;
		}

		cb(null, ret);
	});
}

module.exports = function (ssid, cb) {
	if (process.platform !== 'darwin' && process.platform !== 'linux') {
		throw new Error('Only OS X and Linux systems are supported');
	}

	if (typeof ssid !== 'function') {
		getPassword(ssid, cb);
		return;
	} else {
		cb = ssid;
	}

	wifiname(function (err, name) {
		if (err) {
			cb(err);
			return;
		}

		getPassword(name, cb);
	});
};
