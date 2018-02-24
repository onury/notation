## Notation.js

for Node and Browser.

[![build-status](https://img.shields.io/travis/onury/notation.svg?branch=master)](https://travis-ci.org/onury/notation)
[![npm](http://img.shields.io/npm/v/notation.svg)](https://www.npmjs.com/package/notation)
[![release](https://img.shields.io/github/release/onury/notation.svg)](https://github.com/onury/notation)
[![dependencies](https://david-dm.org/onury/notation.svg)](https://david-dm.org/onury/notation)
[![license](http://img.shields.io/npm/l/notation.svg)](https://github.com/onury/notation/blob/master/LICENSE)
[![maintained](https://img.shields.io/maintenance/yes/2018.svg)](https://github.com/onury/notation/graphs/commit-activity)
[![documentation](https://img.shields.io/badge/documentation-click_to_read-c27cf4.svg?documentation=click_to_read)](http://onury.io/notation/?api=notation)

> © 2018, Onur Yıldırım ([@onury](https://github.com/onury)). MIT License.

Utility for modifying / processing the contents of Javascript objects via object notation strings or globs.

Note that this library will only deal with enumerable properties of the source object; so it should be used to manipulate data objects. It will not deal with preserving the prototype-chain of the given object.


## Usage

Install via **NPM**:

```sh
npm i notation --save
```

### Notation
Modify the contents of a data object:

```js
const Notation = require('notation');

const obj = { car: { brand: "Dodge", model: "Charger" }, dog: { breed: "Akita" } };
const notation = new Notation(obj);
notation.get('car.model');           // "Charger"
notation
    .set('car.color', 'red')         // { car: { brand: "Dodge", model: "Charger", color: "red" }, dog: { breed: "Akita" } }
    .remove('car.model')             // { car: { brand: "Dodge", color: "red" }, dog: { breed: "Akita" } }
    .filter(['*', '!car'])           // { dog: { breed: "Akita" } }
    .flatten()                       // { "dog.breed": "Akita" }
    .expand()                        // { dog: { breed: "Akita" } }
    .merge({ 'dog.color': 'white' }) // { dog: { breed: "Akita", color: "white" } }
    .copyFrom(other, 'boat.name')    // { dog: { breed: "Akita", color: "white" }, boat: { name: "Mojo" } }
    .rename('boat.name', 'dog.name') // { dog: { breed: "Akita", color: "white", name: "Mojo" } }
    .value;                          // modified source object ^
```

### Glob Notation

With a glob-notation, you can use wildcard stars `*` and bang `!` prefixes. A wildcard star will include all the properties at that level and a bang negates that notation for exclusion.

- Only **`Notation#filter()`** method accepts glob notations. Regular notations (without any wildcard or `!`) should be used with all other members of the **`Notation`** class.
- For raw Glob operations, you can use the **`Notation.Glob`** class.

#### Normalize a glob notation list

Removes duplicates, redundant items and logically sorts the array:
```js
const globs = ['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'age'];
console.log(Notation.Glob.normalize(globs));
// => ['*', '!car.*', '!id', 'car.model']
```

In the normalized result `['*', '!car.*', '!id', 'car.model']`:
- `id` is removed and `!id` (negated version) is kept. (In normalization, negated wins over the positive, if both are same).
- Duplicate glob, `name` is removed. The remaining `name` is also removed bec. `*` renders it redundant; which covers all possible notations.
- `car.model` is kept (although `*` matches it) bec. we have a negated glob that also matches it: `!car.*`.

#### Union two glob notation lists

Unites two glob arrays optimistically and sorts the result array logically:
```js
const globsA = ['*', '!car.model', 'car.brand', '!*.age'];
const globsB = ['car.model', 'user.age', 'user.name'];
const union = Notation.Glob.union(globsA, globsB); 
console.log(union);
// => ['*', '!*.age', 'user.age']
```
In the united result `['*', '!*.age', 'user.age']`:
- (negated) `!car.model` of `globsA` is removed because `globsB` has the exact positive version of it. (In union, positive wins over the negated, if both are same.) 
- But then, `car.model` is redundant and removed bec. we have `*` wildcard, which covers all possible notations. 
- Same applies to other redundant globs except `user.age` bec. we have a `!*.age` in `globsA`, which matches `user.age`. So both are kept in the final array.

Now, filter a data object with this united globs array:
```js
const data = {
    car: {
        brand: 'Ford',
        model: 'Mustang',
        age: 52
    },
    user: {
        name: 'John',
        age: 40
    }
};
const globs = ['*', '!*.age', 'user.age']; // our union'ed globs
const filtered = Notation.create(data).filter(globs).value;
console.log(filtered);
// =>
// {
//     car: {
//         brand: 'Ford',
//         model: 'Mustang'
//     },
//     user: {
//         name: 'John',
//         age: 40
//     }
// }
```

> _**Note**: `Notation#filter()` and `Notation.Glob.union()` methods automtically normalizes the given glob list(s)._

## Documentation

You can read the full [**API reference** here][docs].

## Change-Log

**1.3.6** (2018-02-24)  

- Fixed an issue with `Notation.Glob.toRegExp()` method that would cause some globs to be cleared out incorrectly when `.normalize()`d. e.g. `"!password"` would match `"!password_reset"` and remove the later. Fixes [issue #7](https://github.com/onury/notation/issues/7).

**1.3.5** (2017-10-04)  

- Redundant, negated globs are also removed when normalized. Fixes [issue #5](https://github.com/onury/notation/issues/5).
- Fixed shifted index issue with `Notation.Glob.normalize(array)`.
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
