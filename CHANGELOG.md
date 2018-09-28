# Notation Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org).

## 2.0.0 [Unreleased]

This is a big major release with lots of improvements and some breaking changes.

### Added
- Array index notation and object bracket notation support. This brings ability to manipulate arrays with indexes and objects with non-standard property names (keys). See documentation for more info.
- New option: `strict: boolean` Whether to throw when a notation path does not exist on the source. (Note that `.inspect()` and `.inspectRemove()` methods are exceptions). It's recommended to set this to `true` and prevent silent failures if you're working with sensitive data. Regardless of `strict` option, it will always throw on invalid notation syntax or other crucial failures.
- New option: `preserveIndices: boolean`  Indicates whether to preserve the indices of the parent array when an item is to be removed. By default indices are preserved by emptying the item (sparse array), instead of removing the item completely at the index. When this is disabled; you should mind the shifted indices when you remove an item via `.remove()`, `.inspectRemove()` or `.filter()`.
- `Notation.join()` static method for joining given notes into a notation string.
- `Notation.split()` static method for splitting given regular notation into a notes array.
- `Notation.Glob.split()` static method for splitting given glob notation into a notes array.
- `Notation.Glob#intersect()` instance method for checking whether current glob has any intersection  with the given glob/notation.
- `Notation.Glob#covers()` instance method for checking whether current glob covers the given glob.
- 100% full test coverage.

### Changed
- **Breaking**: (For browser) dropped support for IE 10 and below.
- **Breaking**: Improved notation and glob validation. Now we strictly validate each note of a notation against EcmaScript variable syntax, array index notation and object bracket notation. For example:
    - `'x[y]'`, `'x.1'`, `'x.y-z'`, `'x.@` are incorrect and will never match. 
    - `'x["y"]'`, `'x['1']`, `'x["y-z"]'`, `'x["@"]'` are correct. 
    - `x.*` is valid (object property) wildcard for glob notation but invalid as regular notation. 
    - `x[*]` is valid (array index) wildcard for glob notation but invalid as regular notation.
    - `x['*']` just indicates a property/key (star), not a wildcard. Valid regular notation.
- **Breaking**: Now that bracket-notation support is added, there will be some changed behaviour. Notation that has an array value is now also notated with a bracket-index for each item, instead of only the key (array name) itself.
- Note that if you remove an element from an array; that item will be emptied and indices will be preserved (and will NOT shift). e.g. `Notation.create([0, 1, 2]).remove('[1]').value` will return `[0, (empty), 2]`. The empty item can be treated as `undefined`. Set `preserveIndices` option to `false` to change this behavior.
- **Breaking**: Changed/improved normalization and union logic. Also now, introducing (linear) intersections within normalization and (cross) intersections within union. An intersection glob is only produced when needed. For example; previously, `['!*.y', 'x']` would normalize as is but this had side-effects when union'ed with another glob list. Now it normalizes to `['x', '!x.y']`. Notice that intersection glob `'!x.y'` is added and `'!*.y'` is removed. See documentation for more.
- Passing `undefined` as the source object will now throw. This prevents accidental empty initialization. To initialize a `Notation` instance with a new empty object, just omit the argument. e.g. `new Notation()` or `Notation.create()`.
- Updated globs comparison/sort logic.

### Removed
- **Breaking**: Instance method `Notation#eachKey()` (alias of `#each()`) is removed. Now that bracket (and array) notation support is added, this name is misleading. (Now, "each" indicates each key and/or index.)

### Fixed
- When normalizing globs with more then one level, it would incorrectly keep the non-negated redundant glob. Such as `car.model` in `['*', '!car.*', 'car.model']`. Now it will normalize properly to `['*', '!car']`. Matching negated glob always wins (removes the other) in the same list.
- In some cases, when an empty string or invalid notation is passed, it would silently fail.
- An issue with `Notatin.Glob.union()` where less restrictive globA would be removed incorrectly when globB had multiple trailing wildcards and both globs were negated.
- An issue with `Notation.Glob.normalize()` where some redundant non-negated globs were not removed.
- When Notation throws an error, `error instanceof Notation.Error` would return `false`. Fixed.

Thanks to [@marcinkumorek](https://github.com/marcinkumorek) and [@BenoitRanque](https://github.com/BenoitRanque) for their help.

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