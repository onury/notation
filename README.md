# Notation.js

[![build-status](https://img.shields.io/travis/onury/notation.svg?branch=master&style=flat-square)](https://travis-ci.org/onury/notation)
[![coverage-status](https://img.shields.io/coveralls/github/onury/notation/master.svg?&style=flat-square)](https://coveralls.io/github/onury/notation?branch=master)
[![npm](http://img.shields.io/npm/v/notation.svg?style=flat-square)](https://www.npmjs.com/package/notation)
[![release](https://img.shields.io/github/release/onury/notation.svg?style=flat-square)](https://github.com/onury/notation)
[![dependencies](https://david-dm.org/onury/notation.svg?style=flat-square)](https://david-dm.org/onury/notation)
[![vulnerabilities](https://snyk.io/test/github/onury/notation/badge.svg?style=flat-square)](https://snyk.io/test/github/onury/notation)
[![license](http://img.shields.io/npm/l/notation.svg?style=flat-square)](https://github.com/onury/notation/blob/master/LICENSE)
[![maintained](https://img.shields.io/maintenance/yes/2019.svg?style=flat-square)](https://github.com/onury/notation/graphs/commit-activity)
[![documentation](https://img.shields.io/badge/docs-click_to_read-c27cf4.svg?docs=click_to_read&style=flat-square)](https://onury.io/notation/api)

> © 2019, Onur Yıldırım ([@onury](https://github.com/onury)). MIT License.

Utility for modifying / processing the contents of JavaScript objects and arrays, via object or bracket notation strings or globs. (Node and Browser)

```js
Notation.create({ x: 1 }).set('some.prop', true).filter(['*.prop']).value // { some: { prop: true } }
```

> _Note that this library should be used to manipulate **data objects** with enumerable properties. It will NOT deal with preserving the prototype-chain of the given object or objects with circular references._

## Table of Contents
- [Usage](#usage)
- [Notation](#notation)
- [Glob Notation](#glob-notation)
- [Filtering Data with Glob patterns](#filtering-data-with-glob-patterns)
- [Object and Bracket Notation Syntax](#object-and-bracket-notation-syntax)
- [Globs and Data Integrity](#globs-and-data-integrity)
- [Source Object Mutation](#source-object-mutation)
- [API Reference][docs]

## Usage

Install via **NPM**:

```sh
npm i notation
```
In Node/CommonJS environments:
```js
const { Notation } = require('notation');
```
With transpilers (TypeScript, Babel):
```js
import { Notation } from 'notation';
```
In (Modern) Browsers:
```html
<script src="js/notation.min.js"></script>
<script>
    const { Notation } = notation;
</script>
```

## Notation
`Notation` is a class for modifying or inspecting the contents (property keys and values) of a data object or array.

When **reading or inspecting** an **enumerable** property value such as `obj.very.deep.prop`; with pure JS, you would have to do several checks:
```js
if (obj 
        && obj.hasOwnProperty('very') 
        && obj.very.hasOwnProperty('deep')  
        && obj.very.deep.hasOwnProperty('prop')
    ) {
    return obj.very.deep.prop === undefined ? defaultValue : obj.very.deep.prop;
}
```
With `Notation`, you could do this:
```js
const notate = Notation.create;
return notate(obj).get('very.deep.prop', defaultValue);
```
You can also **inspect & get** the value:
```js
console.log(notate(obj).inspectGet('very.deep.prop'));
// {
//     notation: 'very.deep.prop',
//     has: true,
//     value: 'some value',
//     type: 'string',
//     level: 3,
//     lastNote: 'prop'
// }
```

To **modify** or **build** a data object:

```js
const notate = Notation.create;
const obj = { car: { brand: "Dodge", model: "Charger" }, dog: { breed: "Akita" } };
notate(obj)                          // initialize. equivalent to `new Notation(obj)`
    .set('car.color', 'red')         // { car: { brand: "Dodge", model: "Charger", color: "red" }, dog: { breed: "Akita" } }
    .remove('car.model')             // { car: { brand: "Dodge", color: "red" }, dog: { breed: "Akita" } }
    .filter(['*', '!car'])           // { dog: { breed: "Akita" } } // equivalent to .filter(['dog'])
    .flatten()                       // { "dog.breed": "Akita" }
    .expand()                        // { dog: { breed: "Akita" } }
    .merge({ 'dog.color': 'white' }) // { dog: { breed: "Akita", color: "white" } }
    .copyFrom(other, 'boat.name')    // { dog: { breed: "Akita", color: "white" }, boat: { name: "Mojo" } }
    .rename('boat.name', 'dog.name') // { dog: { breed: "Akita", color: "white", name: "Mojo" } }
    .value;                          // result object ^
```
See [API Reference][docs] for more...

## Glob Notation

With a glob-notation, you can use wildcard stars `*` and bang `!` prefix. A wildcard star will include all the properties at that level and a bang prefix negates that notation for exclusion.

- Only **`Notation#filter()`** method accepts glob notations. Regular notations (without any wildcard `*` or `!` prefix) should be used with all other members of the **`Notation`** class.
- For raw Glob operations, you can use the **`Notation.Glob`** class.

### Normalizing a glob notation list

Removes duplicates, redundant items and logically sorts the array:
```js
const { Notation } = require('notation');

const globs = ['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'age'];
console.log(Notation.Glob.normalize(globs));
// ——» ['*', '!car.*', '!id', 'car.model']
```

In the normalized result `['*', '!car.*', '!id', 'car.model']`:
- `id` is removed and `!id` (negated version) is kept. (In normalization, negated always wins over the positive, if both are same).
- Duplicate glob, `name` is removed. The remaining `name` is also removed bec. `*` renders it redundant; which covers all possible notations.
- (In non-restrictive mode) `car.model` is kept (although `*` matches it) bec. it's explicitly defined while we have a negated glob that also matches it: `!car.*`.

```js
console.log(Notation.Glob.normalize(globs, { restrictive: true }));
// ——» ['*', '!car.*', '!id']
```
- In restrictive mode, negated removes every match.

> _**Note**: `Notation#filter()` and `Notation.Glob.union()` methods automtically pre-normalize the given glob list(s)._

### Union of two glob notation lists

Unites two glob arrays optimistically and sorts the result array logically:
```js
const globsA = ['*', '!car.model', 'car.brand', '!*.age'];
const globsB = ['car.model', 'user.age', 'user.name'];
const union = Notation.Glob.union(globsA, globsB); 
console.log(union);
// ——» ['*', '!*.age', 'user.age']
```
In the united result `['*', '!*.age', 'user.age']`:
- (negated) `!car.model` of `globsA` is removed because `globsB` has the exact positive version of it. (In union, positive wins over the negated, if both are same.) 
- But then, `car.model` is redundant and removed bec. we have `*` wildcard, which covers all possible non-negated notations. 
- Same applies to other redundant globs except `user.age` bec. we have a `!*.age` in `globsA`, which matches `user.age`. So both are kept in the final array.

## Filtering Data with Glob patterns

When filtering a data object with a globs array; properties that are explicitly defined with globs or implied with wildcards, will be included. Any matching negated-pattern will be excluded. The resulting object is created from scratch without mutating the original.
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
const globs = ['*', '!*.age', 'user.age'];
const filtered = Notation.create(data).filter(globs).value;
console.log(filtered);
// ——»
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

In **non**-restrictive mode; even though we have the `!*.age` negated glob; `user.age` is still included in the result because it's explicitly defined. 

But you can also do **restrictive** filtering. Let's take the same example:
```js
const globs = ['*', '!*.age', 'user.age'];
const filtered = Notation.create(data).filter(globs, { restrictive: true }).value;
console.log(filtered);
// ——»
// {
//     car: {
//         brand: 'Ford',
//         model: 'Mustang'
//     },
//     user: {
//         name: 'John'
//     }
// }
```
Note that in restrictive mode, `user.age` is removed this time; due to `!*.age` pattern.

## Object and Bracket Notation Syntax

Each note (level) of a notation is validated against **EcmaScript variable syntax**, array index notation and object bracket notation.

### Property Keys
- `x[y]`, `x.1`, `x.y-z`, `x.@` are **incorrect** and will never match. 
- `x["y"]`, `x['1']`, `x["y-z"]`, `x['@']` are **correct** object bracket notations. 

### Array Indexes
- `[0].x` indicates `x` property of the first item of the **root array**.
- `x[1]` indicates second item of `x` property of the **root object**.

### Wildcards
- `*` is valid **wildcard** for **glob** notation. Indicates all properties of an object.
- `[*]` is valid **wildcard** for **glob** notation. Indicates all items of an array.
- `x[*]` is valid **wildcard** for **glob** notation. Indicates all items of `x` property which should be an array.
- `x['*']` just indicates a property/key (star), not a wildcard. Valid **regular** notation.
- `x.*` is valid **wildcard** for **glob** notation.
- `x`, `x.*` and `x.*.*` (and so on) are all **equivalent globs**. All normalize to `x`.
- **Negated** versions are **NOT** equivalent. 
  - `!x` indicates removal of `x`.
  - `!x.*` only indicates removal of all first-level properties of `x` but not itself (empty object).
  - `!x.*.*` only indicates removal of all second-level properties of `x`; but not itself and its first-level properties (`x.*`).
  - Same rule applies for bracket notation or mixed notations. 
    - `[0]` = `[0][*]` but `![0]` ≠ `![0][*]`
    - `x` = `x[*]` but `!x` ≠ `!x[*]`
    - `[*]` = `[*].*` but `![*]` ≠ `![*].*`

### Example
Below, we filter to; 
- keep all properties of the source object,
- remove the second item of `colors` property (which is an array),
- and empty `my-colors` property (which is an object).
```js
const source = {
    name: 'Jack',
    colors: ['blue', 'green', 'red'],
    'my-colors': { '1': 'yellow' }     // non-standard name "my-colors"
};
const globs = ['*', '!colors[1]', '!["my-colors"].*'];
console.log(Notation.create(source).filter(globs).value);
// —» 
// {
//     name: 'Jack',
//     colors: ['blue', 'red'],
//     'my-colors': {}
// }
```
In the example above, `colors` item at index 1 is emptied.

## Globs and Data Integrity

### Glob List Integrity
In a glob list, you cannot have both object and array notations for **root level**. The root level implies the source type which is either an object or array; never both.

For example, `['[*]', '!x.y']` will throw because when you filter a source array with this glob list; `!x.y` will never match since the root `x` indicates an object property (e.g. `source.x`).

### Glob vs Data (Value) Integrity
Each glob you use should conform with the given source object.

For example:
```js
const obj = { x: { y: 1 } };
const globs = ['*', '!x.*'];
console.log(Notation.create(obj).filter(globs).value);
// ——» { x: {} }
```
Here, we used `!x.*` negated glob to remove all the properties of `x` but not itself. So the result object has an `x` property with an empty object as its value. All good.

But in the source object; if the actual value of `x` is not an object, using the same glob list would throw:
```js
const obj = { x: 1 }; // x is number
const globs = ['*', '!x.*'];
console.log(Notation.create(obj).filter(globs).value);
// ——» ERROR
```
This kind of type mismatch is critical so it will throw. The value `1` is a `Number` not an object, so it cannot be emptied with `!x.*`. (But we could have removed it instead, with glob `!x`.)

## Source Object Mutation

The source object or array will be mutated by default (except the `#filter()` method). To prevent mutation; you can call `#clone()` method before calling any method that modifies the object. The source object will be cloned deeply.

```js
const notate = Notation.create;

const mutated = notate(source1).set('newProp', true).value;
console.log(source1.newProp); // ——» true

const cloned = notate(source2).clone().set('newProp', true).value;
console.log('newProp' in source2); // ——» false
console.log(cloned.newProp); // ——» true
```

> _Note that `Notation` expects a data object (or array) with enumerable properties. In addition to plain objects and arrays; supported cloneable property/value types are primitives (such as `String`, `Number`, `Boolean`, `Symbol`, `null` and `undefined`) and built-in types (such as `Date` and `RegExp`)._ 
> 
> _Enumerable properties with types other than these (such as methods, special objects, custom class instances, etc) will be copied by reference. Non-enumerable properties will not be cloned._
> 
> _If you still need full clone support, you can use a library like lodash. e.g. `Notation.create(_.cloneDeep(source))`_

## Documentation

You can read the full [**API reference** here][docs].

## Change-Log

Read the [CHANGELOG][changelog] especially if you're migrating from version `1.x.x` to version `2.0.0` and above.

## License

[**MIT**](https://github.com/onury/notation/blob/master/LICENSE).

[docs]:https://onury.io/notation/api
[changelog]:https://github.com/onury/notation/blob/master/CHANGELOG.md
