---
title: Getting Started
description: Install Notation and read, build, and filter your first object.
---

## Install

```sh
npm i notation
```

Notation v3 is **ESM** and ships TypeScript types.

```js
import { Notation } from 'notation';
```

`Notation.create(source)` is shorthand for `new Notation(source)`. With no
argument it starts from an empty object.

### Other runtimes

v3 is pure ESM with no Node-only dependencies, so it runs beyond Node.js (≥ 20):

- **Bun** — `bun add notation`, then import exactly as above.
- **Deno** — import via the `npm:` specifier: `import { Notation } from 'npm:notation'`.
- **Browser** — bundle it like any ESM dependency.

The API is identical across runtimes — only the install/import line differs.

## Read a value

Reach into a nested property without manual guard chains. A default value is
returned when the path doesn't exist:

```js
const obj = { car: { brand: 'Dodge', model: 'Charger' } };

Notation.create(obj).get('car.model');              // » "Charger"
Notation.create(obj).get('car.color', 'red');       // » "red" (not present)
```

## Build & modify

Methods that change the source are chainable; read the result from `.value`:

```js
const obj = { car: { brand: 'Dodge' } };

Notation.create(obj)
  .set('car.model', 'Charger')   // create nested path
  .set('car.year', 1970)
  .remove('car.brand')
  .value;
// » { car: { model: "Charger", year: 1970 } }
```

## Filter with globs

`filter()` is the one method that takes **glob** patterns — `*` to include,
`!` to exclude — and returns a new object without mutating the source:

```js
const car = { brand: 'Ford', model: { name: 'Mustang', year: 1970 } };

Notation.create(car).filter(['*', '!model.year']).value;
// » { brand: "Ford", model: { name: "Mustang" } }
```

:::note
The source is **mutated** by every method except `filter()`. Call
[`clone()`](/notation/concepts/mutation/) first to work on a copy — see
[Mutation & Cloning](/notation/concepts/mutation/).
:::

## Where next

- [Notations & Notes](/notation/concepts/notations/) — what a notation string is.
- [Glob Notation](/notation/concepts/globs/) and [Filtering Data](/notation/concepts/filtering/) — wildcards, negation, normalization.
- [Object, Bracket & Array Syntax](/notation/concepts/syntax/) — the exact rules.
- [What's New in v3](/notation/whats-new/) — upgrading from v2.
