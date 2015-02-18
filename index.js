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
		args = ['cat', '/etc/NetworkManager/system-connections/' + name];
	} else if (process.platform === 'win32') {
		cmd = 'netsh';
		args = ['wlan', 'show', 'profile', 'name=' + name, 'key=clear'];
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

		if (stdout && process.platform === 'win32') {
			ret = /^\s*Key Content\s*: (.+)\s*$/gm.exec(stdout);
			ret = ret && ret.length ? ret[1] : null;
		}

		cb(null, ret);
	});
}

module.exports = function (ssid, cb) {
	if (process.platform !== 'darwin' && process.platform !== 'linux' && process.platform !== 'win32') {
		throw new Error('Only OS X, Linux and Windows systems are supported');
	}

	if (ssid && typeof ssid !== 'function') {
		getPassword(ssid, cb);
		return;
	} else if (ssid && !cb) {
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
