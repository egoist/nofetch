# nofetch

[![NPM version](https://img.shields.io/npm/v/nofetch.svg?style=flat)](https://npmjs.com/package/nofetch) [![NPM downloads](https://img.shields.io/npm/dm/nofetch.svg?style=flat)](https://npmjs.com/package/nofetch) [![Build Status](https://img.shields.io/circleci/project/egoist/nofetch/master.svg?style=flat)](https://circleci.com/gh/egoist/nofetch) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Install

```bash
yarn add nofetch
```

## Usage

```js
const nofetch = require('nofetch')

// GET
nofetch('/url')
  .then(res => res.json())

// POST
nofetch('/url', {method: 'post', body: {a: 1}})
  .then(res => res.json())

// Form data
const form = new FormData()
form.append('a', 1)
nofetch('/url', {method: 'post', body: form})
  .then(res => res.json())
```

## API

### nofetch(url, [options])

#### options

##### method:

Type: `string`<br>
Default: `GET`

Request method.

##### headers

Type: `object`

Request headers.

##### body

Request body. can be a string, object, buffer, readable stream

##### timeout

Type: `number` `object`

Request timeout.

##### agent

`agent` option for `http.request`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**nofetch** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/nofetch/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
