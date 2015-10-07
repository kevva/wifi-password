'use strict';
var execFile = require('child_process').execFile;
var pify = require('pify');
var Promise = require('pinkie-promise');

module.exports = function (ssid) {
	var cmd = 'sudo';
	var args = ['cat', '/etc/NetworkManager/system-connections/' + ssid];
	var ret;

	return pify(execFile, Promise)(cmd, args).then(function (stdout) {
		ret = /^\s*(?:psk|password)=(.+)\s*$/gm.exec(stdout);
		ret = ret && ret.length ? ret[1] : null;

		if (!ret) {
			return Promise.reject(new Error('Could not get password'));
		}

		return ret;
	});
};
