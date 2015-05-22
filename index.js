'use strict';

if (process.platform === 'darwin') {
	module.exports = require('osx-wifi-passwrd');
} else if (process.platform === 'win32') {
	module.exports = require('win-wifi-password');
} else {
	module.exports = require('linux-wifi-password');
}
