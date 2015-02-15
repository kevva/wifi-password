# wifi-password [![Build Status](http://img.shields.io/travis/kevva/wifi-password.svg?style=flat)](https://travis-ci.org/kevva/wifi-password)

> Get current wifi password

## Install

```sh
$ npm install --save wifi-password
```

## Usage

```js
var wifiPassword = require('wifi-password');

wifiPassword(function (err, password) {
	if (err) {
		throw err;
	}

	console.log(password);
	//=> johndoesecretpassword
});
```

## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
