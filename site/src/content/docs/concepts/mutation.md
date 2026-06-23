---
title: Mutation & Cloning
description: Notation mutates the source by default — how to opt out, and what clone() supports.
---

By default, every method that changes data **mutates the source object** — the
single exception is [`filter()`](/notation/concepts/filtering/), which always
returns a fresh object.

```js
const source = { a: 1 };
const result = Notation.create(source).set('b', 2).value;

source;          // » { a: 1, b: 2 }   (mutated)
result === source; // » true
```

## Opt Out with clone()

Call `clone()` before any mutating method to work on a deep copy and leave the
original untouched:

```js
const source = { a: 1 };
const result = Notation.create(source).clone().set('b', 2).value;

source;            // » { a: 1 }         (untouched)
result;            // » { a: 1, b: 2 }
'b' in source;     // » false
```

## What clone() Supports

`Notation` is for **data** objects with enumerable properties. `clone()` deeply
copies:

- plain objects and arrays,
- primitives — `String`, `Number`, `Boolean`, `Symbol`, `null`, `undefined`,
- built-ins `Date` and `RegExp`.

:::caution
Other enumerable values — functions, class instances, special objects — are
copied **by reference**, not cloned. Non-enumerable properties and prototype
chains are not preserved, and circular references aren't supported.
:::

For a full structural clone, clone first with a dedicated library and wrap the
result:

```js
import _ from 'lodash';
Notation.create(_.cloneDeep(source)).set('b', 2);
```
