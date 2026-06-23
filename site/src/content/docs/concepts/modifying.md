---
title: Modifying Data
description: Set, remove, merge, and separate properties by notation.
---

Every method here **mutates** the source and returns the instance for chaining.
Read the result from `.value`. To avoid mutation, [`clone()`](/notation/concepts/mutation/) first.

## set

`set(notation, value, mode?)` writes a value, creating the nested path if needed:

```js
const obj = { car: { brand: 'Dodge' } };
Notation.create(obj)
  .set('car.model', 'Charger')   // create
  .set('car.brand', 'Ford')      // overwrite
  .set('boat', 'none');          // new root prop
// » { car: { brand: "Ford", model: "Charger" }, boat: "none" }
```

The third argument controls **write mode**:

| `mode` | Behavior |
| --- | --- |
| `'overwrite'` *(default)* | replace the existing value |
| `false` | keep the existing value if the property already exists |
| `'insert'` | splice into an array at the index (shift, don't replace) |

```js
Notation.create({ car: { year: 1970 } }).set('car.year', 1965, false).value;
// » { car: { year: 1970 } }  (kept — not overwritten)

Notation.create({ tags: ['a', 'c'] }).set('tags[1]', 'b', 'insert').value;
// » { tags: ["a", "b", "c"] }
```

`'insert'` only applies to arrays — using it on an object throws a
[`NotationError`](/notation/concepts/options/).

## remove

```js
const obj = { notebook: 'Mac', car: { model: 'Mustang' } };
Notation.create(obj).remove('car.model').value;
// » { notebook: "Mac", car: {} }
```

Removing from an array splices by default (indices shift). Set
[`preserveIndices`](/notation/concepts/options/) to leave a sparse hole instead.

## merge

`merge()` is `set()` for many notations at once. Keys may be plain (merged at the
root) or dotted (written at depth):

```js
Notation.create({ car: { brand: 'Dodge' } }).merge({
  'car.model': 'Mustang',
  'car.year': 1965,
  boat: 'none'
}).value;
// » { car: { brand: "Dodge", model: "Mustang", year: 1965 }, boat: "none" }
```

## separate

The inverse of `merge()`: removes the listed notations from the source and
returns them as a new object.

```js
const obj = { car: { brand: 'Dodge', year: 1970 }, notebook: 'Mac' };
const taken = Notation.create(obj).separate(['car.brand', 'notebook']);

taken;  // » { car: { brand: "Dodge" }, notebook: "Mac" }
obj;    // » { car: { year: 1970 } }
```

To pull values into *another* object instead of a fresh one, see
[Moving & Copying](/notation/concepts/moving/). To reshape between nested and
flat forms, see [Flatten & Expand](/notation/concepts/restructuring/).
