---
title: Reading & Inspecting
description: Get values, test existence, and inspect notations for rich detail.
---

## Get a value

`get(notation, defaultValue?)` returns the value at a path, or the default when
it's missing:

```js
Notation.create({ car: { brand: 'Dodge' } }).get('car.brand');      // » "Dodge"
Notation.create({ car: {} }).get('car.model', 'Challenger');        // » "Challenger"
Notation.create({ car: { model: undefined } }).get('car.model', 'X'); // » undefined
```

That last line is deliberate: an existing property whose value is `undefined`
**has** a value — the default only applies when the property is absent.

In [strict mode](/notation/concepts/options/), a missing path with no default
throws instead of returning `undefined`.

## Test existence

```js
const n = Notation.create({ car: { year: undefined } });

n.has('car.year');        // » true  (property exists, even if undefined)
n.hasDefined('car.year'); // » false (exists, but value is undefined)
n.has('car.color');       // » false
```

## Inspect

`inspectGet(notation)` returns the full detail behind `get`/`has` — useful when
you need the type, depth, or the resolved last note:

```js
Notation.create({ car: { year: 1970 } }).inspectGet('car.year');
// » {
//     notation: 'car.year',
//     has: true,
//     value: 1970,
//     type: 'number',
//     level: 2,
//     lastNote: 'year',
//     lastNoteNormalized: 'year',
//     parentIsArray: false
//   }
```

`lastNoteNormalized` resolves bracket notes to their real key or index — an
array note becomes a number:

```js
Notation.create({ car: { brands: ['Ford', 'Dodge'] } }).inspectGet('car.brands[1]');
// » { has: true, value: 'Dodge', lastNote: '[1]', lastNoteNormalized: 1, … }
```

`inspectRemove(notation)` does the same but **removes** the property first,
returning what it found. Unlike `get`/`remove`, the inspect methods never throw
in strict mode — they report `has: false` instead.

## Iterate

`each()` walks every leaf value; return `false` to stop early:

```js
const obj = { car: { brand: 'Dodge', year: 1970 } };
Notation.create(obj).each((notation, key, value) => {
  console.log(notation, value);
});
// "car.brand"  "Dodge"
// "car.year"   1970
```

`eachValue(notation, cb)` walks one path level by level, exposing the value at
each step:

```js
Notation.create({ car: { brand: 'Dodge' } })
  .eachValue('car.brand', (levelValue, levelNotation) => {
    console.log(levelNotation, levelValue);
  });
// "car"        { brand: "Dodge" }
// "car.brand"  "Dodge"
```

To collect every leaf notation as a flat list, use
[`getNotations()`](/notation/concepts/notations/#listing-notations-from-data).
