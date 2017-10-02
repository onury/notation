## Notation.js

for Node and Browser.

[![build-status](https://img.shields.io/travis/onury/notation.svg?branch=master)](https://travis-ci.org/onury/notation)
[![npm](http://img.shields.io/npm/v/notation.svg)](https://www.npmjs.com/package/notation)
[![release](https://img.shields.io/github/release/onury/notation.svg)](https://github.com/onury/notation)
[![dependencies](https://david-dm.org/onury/notation.svg)](https://david-dm.org/onury/notation)
[![license](http://img.shields.io/npm/l/notation.svg)](https://github.com/onury/notation/blob/master/LICENSE)
[![maintained](https://img.shields.io/maintenance/yes/2017.svg)](https://github.com/onury/notation/graphs/commit-activity)  

> © 2017, Onur Yıldırım ([@onury](https://github.com/onury)). MIT License.

Utility for modifying / processing the contents of Javascript objects via object notation strings or globs.

Note that this library will only deal with enumerable properties of the source object; so it should be used to manipulate data objects. It will not deal with preserving the prototype-chain of the given object.


## Usage

Install via **NPM**:

```sh
npm i notation --save
```

### Modify the contents of a data object

```js
const Notation = require('notation');

const obj = { car: { brand: "Dodge", model: "Charger" }, dog: { breed: "Akita" } };
const notation = new Notation(obj);
notation.get('car.model');      // "Charger"
notation
    .set('car.color', 'red')         // { car: { brand: "Dodge", model: "Charger", color: "red" }, dog: { breed: "Akita" } }
    .remove('car.model')             // { car: { brand: "Dodge", color: "red" }, dog: { breed: "Akita" } }
    .filter(['*', '!car'])           // { dog: { breed: "Akita" } }
    .flatten()                       // { "dog.breed": "Akita" }
    .expand()                        // { dog: { breed: "Akita" } }
    .merge({ 'dog.color': 'white' }) // { dog: { breed: "Akita", color: "white" } }
    .copyFrom(other, 'boat.name')    // { dog: { breed: "Akita", color: "white" }, boat: { name: "Mojo" } }
    .rename('boat.name', 'dog.name') // { dog: { breed: "Akita", color: "white", name: "Mojo" } }
    .value;                          // source object
```

### Normalize a glob notation list

Removes duplicates, redundant items and logically sorts the array:
```js
const globs = ['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'age'];
console.log(Notation.Glob.normalize(globs));
// => ['*', '!car.*', '!id', 'car.model']
```
_Note that `Notation#filter()` and `Notation.Glob.union()` methods automtically normalizes the give glob list(s)._

### Union two glob notation lists

Unites two glob arrays optimistically and logically sorts the array:
```js
const globsA = ['*', '!car.model', 'car.brand', '!*.age'];
const globsB = ['car.model', 'user.age', 'user.name'];
console.log(Notation.Glob.union(globsA, globsB));
// => ['*', '!*.age', 'user.age']
```

## Documentation

You can read the full [**API reference** here][docs].

## Change-Log

**1.3.5** (2017-10-03)  

- Redundant, negated globs should are also removed when normalized. Fixes [issue #5](https://github.com/onury/notation/issues/5).
- Fixed index shift issue with `Notation.Glob.normalize(array)`.
- Fixed `countNotes()` method.
- Minor revisions.

**1.3.0** (2017-09-30)  

- Completely re-wrote `Notation.Glob.union()` static method.
    - Fixed the array mutation issue. Fixes [issue #2](https://github.com/onury/notation/issues/2).
    - Fixed an issue where a glob with wildcard is not properly union'ed. Fixes [issue #3](https://github.com/onury/notation/issues/3). 
    - `sort` (`boolean`) argument is removed (the output is now always sorted.)
    - Union output is now properly normalized, duplicates and redundant globs are removed, etc...
- Fixed an issue where negated wildcards would be filtered incorrectly in some edge cases (e.g. `!*.*.*`).
- Added `Notation.Glob.normalize(array)` static method.
- Added `Notation.Glob.toRegExp(glob)` static method.
- Added `Notation.countNotes(notation)` convenience method.
- Improved glob validation.
- Fix import typo that prevents Travis builds succeed.
- Minor revisions, clean-up.
- (dev) Removed dev-dependencies (Grunt and plugins) in favor of NPM scripts. Updated other dev-dependencies. Added more, comprehensive tests.

**1.1.0** (2016-09-27)  

- Added `Notation#expand()` method (alias `Notation#aggregate()`).
- Refactored `Notation#getFlat()` to `Notation#flatten()`. Returns instance (chainable) instead of source.
- `Notation#separate()` returns instance (chainable) instead of source.
- Minor revisions.

**v1.0.0** (2016-04-10)  

- initial release.

## License

[**MIT**](https://github.com/onury/notation/blob/master/LICENSE).

[docs]:http://onury.github.io/notation/?api=notation
