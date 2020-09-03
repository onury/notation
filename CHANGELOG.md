# Notation Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org).

## 2.0.0 [Unreleased]

This is a big major release with lots of **improvements** and some **breaking changes**. Please read the changes below and re-run your application tests after you upgrade to v2.

### Added
- **Array index notation** and **object bracket notation** support. This brings ability to manipulate arrays with indexes and objects with non-standard property names (keys). See documentation for more info.
- **`strict: boolean`** class option that specifies whether to throw when a notation path does not exist on the source. (Note that `#inspectGet()` and `#inspectRemove()` methods are exceptions). It's recommended to set this to `true` and prevent silent failures if you're working with sensitive data. Regardless of `strict` option, it will always throw on invalid notation syntax or other crucial failures.
- **`restrictive: boolean`** option for `Notation`**`#filter()`** instance method that specifies whether negated items strictly remove *every match*. Note that, regardless of this option; if any item has an exact negated version; non-negated is always removed. Default is `false`. This option is also available for **`.normalize()`** and **`.union()`** static methods of `Notation.Glob` class. For example; `['*', 'name', 'car.model', '!car.*']` will normalize to `['*', '!car.*', 'car.model']`. In `restrictive` mode, it will normalize to `['*', '!car']`.
- `Notation`**`.join()`** static method for joining given notes into a notation string.
- `Notation`**`.split()`** static method for splitting given regular notation into a notes array.
- `Notation.Glob`**`.split()`** static method for splitting given glob notation into a notes array.
- `Notation.Glob`**`#intersect()`** instance method for checking whether current glob has any intersection  with the given glob/notation.
- `Notation.Glob`**`#covers()`** instance method for checking whether given glob covers another specific glob.
- Ability to "insert" array item at given index via `Notation#set()` method; instead of overwriting only.
- 100% full test **coverage**.

### Changed
- **Breaking** » (For browser) dropped support for IE 10 and below. 
- **Breaking** » (For Node) dropped support for Node v4 (might still work). 
- **Breaking** » `Notation` is a **named export** now. (Meaning require or import within curly brackets. e.g. `const { Notation } = require('notation')`) 
- **Breaking** » Now that **bracket-notation** support is added, there will be some changed behaviour. Notation that has an array value is now also notated with a bracket-index for each item, instead of only the key (array name) itself. e.g. `prop1.prop2[3]`
- **Breaking** » Improved notation and glob validation. Now we strictly validate each note of a notation against **EcmaScript variable syntax**, array index notation and object bracket notation. For example:
    - `x[y]`, `x.1`, `x.y-z`, `x.@` are incorrect and will never match. 
    - `x["y"]`, `x['1']`, `x["y-z"]`, `x["@"]` are correct. 
    - `x.*` is valid (wildcard) for glob notation but invalid (object property) as regular notation.
    - `x[*]` is valid (wildcard) for glob notation but invalid (array index) as regular notation.
    - `x['*']` just indicates a property/key (star), not a wildcard. Valid regular notation.
- When an element is removed from an array; that item will be **emptied** and indices will be **preserved** (and will NOT shift). e.g.
    ```js
    Notation.create([0, 1, 2]).remove('[1]').value
    // will return [0, (empty), 2]
    ```
    The empty item can be treated as `undefined` in the sparse array result above. Set `preserveIndices` option to `false` to change this behavior.
    ```js
    const options = { preserveIndices: false };
    Notation.create([0, 1, 2], options).remove('[1]').value
    // will return [0, 2]
    ```
- **Breaking** » Changed/improved **normalization** and **union** logic. Also now, introducing (linear) intersections within normalization and (cross) intersections within union. An **intersection** glob is only produced when needed. For example; previously, `['!*.y', 'x']` would normalize as is but this had side-effects when union'ed with another glob list. Now it normalizes to `['x', '!x.y']`. Notice that in this example, intersection glob `'!x.y'` is added and `'!*.y'` is removed. See documentation for more.
- **Breaking** » All levels of **negated globs** are now respected. For example; when an object is filtered with `['*', '!x.*']`, the `x` property would be completely removed. Now, `x` will be emptied instead (i.e. `{}`) due to explicit trailing wildcard star. To completely remove the `x` property; filtering globs should be `['*', '!x']`.
- Passing `undefined` as the source object will now throw. This prevents accidental empty initialization. To initialize a `Notation` instance with a new empty object, just omit the argument or explicitly define it. e.g. `new Notation()` or `new Notation({})`.
- **Breaking** » `#inspectGet()` method of `Notation` class is renamed to `#inspectGet()` for compatibility with Node.js version 10+. See [DEP0079](https://nodejs.org/api/deprecations.html#deprecations_dep0079_custom_inspection_function_on_objects_via_inspect).
- Improved collection deep cloning.
- Updated globs comparison/sort logic.

### Removed
- **Breaking** » Instance method `Notation#eachKey()` (alias of `#each()`) is removed. Now that bracket (and array) notation support is added, this name is misleading. (Now, "each" indicates each key and/or index.)

### Fixed
- In some cases, when an empty string or invalid notation is passed, it would silently fail.
- An issue with `Notation.Glob.normalize()` where it would throw `RangeError: Maximum call stack size exceeded` when a glob list had both object and array notations for root level.
- An issue with `Notatin.Glob.union()` where less restrictive `globA` would be removed incorrectly when `globB` had multiple trailing wildcards and both globs were negated.
- An issue with `Notation.Glob.normalize()` where some redundant non-negated globs were not removed.
- When `Notation` throws an error, `error instanceof Notation.Error` would return `false`. Fixed.

*Thanks to [@marcinkumorek](https://github.com/marcinkumorek) and [@BenoitRanque](https://github.com/BenoitRanque) for their help.*

## 1.3.6 (2018-02-24)  

### Fixed
- An issue with `Notation.Glob.toRegExp()` method that would cause some globs to be cleared out incorrectly when `.normalize()`d. e.g. `"!password"` would match `"!password_reset"` and get removed the later. Fixes [#7](https://github.com/onury/notation/issues/7).

## 1.3.5 (2017-10-04)  

### Changed
- Redundant, negated globs are also removed when normalized. Fixes [#5](https://github.com/onury/notation/issues/5).
- Minor revisions.

### Fixed
- Shifted index issue with `Notation.Glob.normalize(array)`.
- `countNotes()` method.

## 1.3.0 (2017-09-30)  

### Added
- `Notation.Glob.normalize(array)` static method.
- `Notation.Glob.toRegExp(glob)` static method.
- `Notation.countNotes(notation)` convenience method.

### Changed
- Completely re-wrote `Notation.Glob.union()` static method. `sort` (`boolean`) argument is removed (the output is now always sorted.)
- Union output is now properly normalized, duplicates and redundant globs are removed, etc...
- Improved glob validation.

### Fixed
- Array mutation issue. Fixes [#2](https://github.com/onury/notation/issues/2).
- An issue where a glob with wildcard is not properly union'ed. Fixes [#3(https://github.com/onury/notation/issues/3). 
- An issue where negated wildcards would be filtered incorrectly in some edge cases (e.g. `!*.*.*`).
- Import typo that prevents Travis builds succeed.

### Removed
- (dev) Removed dev-dependencies (Grunt and plugins) in favor of NPM scripts. Updated other dev-dependencies. Added more, comprehensive tests.

## 1.1.0 (2016-09-27)  

### Added
- `Notation#expand()` method (alias `Notation#aggregate()`).

### Changed
- Refactored `Notation#getFlat()` to `Notation#flatten()`. Returns instance (chainable) instead of source.
- `Notation#separate()` returns instance (chainable) instead of source.
- Minor revisions.

## 1.0.0 (2016-04-10)  

### Added
- initial release.