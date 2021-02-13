# VolatileMap

[![NPM](https://img.shields.io/npm/v/volatile-map)](https://www.npmjs.com/package/volatile-map)
[![Build status](https://img.shields.io/github/workflow/status/alvarocastro/volatile-map/build)](https://github.com/alvarocastro/volatile-map/actions?query=workflow%3Abuild)
[![Maintainability status](https://img.shields.io/codeclimate/maintainability/alvarocastro/volatile-map)](https://codeclimate.com/github/alvarocastro/volatile-map/maintainability)
[![Coverage status](https://img.shields.io/coveralls/github/alvarocastro/volatile-map)](https://coveralls.io/github/alvarocastro/volatile-map?branch=master)
[![Bundle size](https://img.shields.io/bundlephobia/min/volatile-map)](https://bundlephobia.com/result?p=volatile-map)
[![Code style: XO](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Release: Semantic](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Minimalist and performant `Map` object that is fully compatible with the [ES6 `Map` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) (it extends from it) whose values are deleted after a TTL of being set, like a cache.

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [Support](#support)

## Install

```bash
npm install volatile-map
```

## Usage

```js
const VolatileMap = require('volatile-map');

const cache = new VolatileMap(3000); // Values expire after 3 seconds

cache.set('foo', 'bar');
cache.set('baz', 'qux', 5000);
console.log(cache.get('foo'));
// => 'bar'
console.log(cache.get('baz'));
// => 'qux'

setTimeout(function () {
	console.log(cache.get('foo'));
	// => undefined
	console.log(cache.get('baz'));
	// => 'qux'
}, 4000);

```

### VolatileMap([ttl = 600000])

Constructor.

#### ttl

Type: `Number`

Time to live of the values and keys of the map, after that time, keys and values are deleted.

#### VolatileMap.set(key, value[, ttl])

This method behaves the same as the [ES6 `Map.set()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set), but adds an extra optional argument `ttl` that allows to set a specific time to live to each key. By default uses the `ttl` supplied when constructing the object.

#### Other methods

See the [ES6 `Map` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) documentation to see all the methods.

## Contributing

Contributions are always welcome! Please run `npm test` beforehand to ensure everything is ok.

## Support

If you use this package please consider starring it :)
