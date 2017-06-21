# wifi-password

> Get current wifi password


## Install

```
$ npm install wifi-password
```


## Usage

```js
const wifiPassword = require('wifi-password');

wifiPassword().then(password => {
	console.log(password);
	//=> 'johndoesecretpassword'
});
```


## API

### wifiPassword([name])

Returns a promise that resolves to a string containing the password.

#### name

Type: `string`

Get the wifi password for a specified *known* network.


## Related

* [wifi-password-cli](https://github.com/kevva/wifi-password-cli) - CLI for this module.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
