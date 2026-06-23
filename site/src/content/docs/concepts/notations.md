---
title: Notations & Notes
description: What a notation string is, how it splits into notes, and the static helpers for working with them.
---

A **notation** is a string that addresses a property inside a data object or
array — `car.model`, `users[0].name`, `account.billing.card.last4`. Each
segment is a **note** (a level):

```js
Notation.split('account.billing.card');   // » ["account", "billing", "card"]
```

`Notation` operates on the **enumerable** properties of plain objects and
arrays. It does not preserve prototype chains and does not handle circular
references — it's for data, not class instances. See
[Mutation & Cloning](/notation/concepts/mutation/) for the supported value types.

## Creating an Instance

`new Notation(source)` and the static `Notation.create(source)` are equivalent.
With no argument, the source is a new empty object.

```js
import { Notation } from 'notation';

const notate = Notation.create;
notate({ x: 1 });    // wraps the object
notate();            // » starts from {}
```

The wrapped source is always available as `.value`:

```js
Notation.create({ a: 1 }).set('b', 2).value;   // » { a: 1, b: 2 }
```

## Validating

`Notation.isValid()` checks **regular** notation — the star `*` and bang `!` are
*not* treated as wildcards here (those belong to [globs](/notation/concepts/globs/)):

```js
Notation.isValid('prop1.prop2.prop3');   // » true
Notation.isValid('x.arr[0].y');          // » true
Notation.isValid('x["*"]');              // » true  (a literal "*" key)
Notation.isValid('x.*');                 // » false (glob-only)
Notation.isValid('@1');                  // » false (use "['@1']")
```

## Static Helpers

These work on notation strings directly — no instance needed. All throw a
[`NotationError`](/notation/concepts/options/) on invalid input.

```js
Notation.split('first.prop2.last');   // » ["first", "prop2", "last"]
Notation.join(['first', 'last']);     // » "first.last"
Notation.first('first.prop2.last');   // » "first"
Notation.last('first.prop2.last');    // » "last"
Notation.parent('first.prop2.last');  // » "first.prop2"
Notation.parent('single');            // » null
Notation.countNotes('a.b.c');         // » 3
```

`Notation.eachNote()` walks a notation level by level, building up the notation
at each step:

```js
Notation.eachNote('first.prop2.last', (levelNotation, note, index, list) => {
  console.log(index, note, levelNotation);
});
// 0  "first"             "first"
// 1  "first.prop2"       "prop2"
// 2  "first.prop2.last"  "last"
```

## Listing Notations from Data

`getNotations()` returns the leaf notation of every value in the source:

```js
const obj = { car: { brand: 'Dodge', year: 1970 } };
Notation.create(obj).getNotations();   // » ["car.brand", "car.year"]
```

Next: the exact syntax rules in
[Object, Bracket & Array Syntax](/notation/concepts/syntax/).
