# wifi-password [![Build Status](http://img.shields.io/travis/kevva/wifi-password.svg?style=flat)](https://travis-ci.org/kevva/wifi-password)

> Get current wifi password


## Install

```
$ npm install --save wifi-password
```


## Usage

```js
var wifiPassword = require('wifi-password');

wifiPassword(function (err, password) {
	console.log(password);
	//=> johndoesecretpassword
});
```


## CLI

```
$ npm install --global wifi-password
```

```
$ wifi-password --help

Usage
  $ wifi-password
  johndoesecretpassword
```


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
