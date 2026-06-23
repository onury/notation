---
title: Glob Notation
description: Wildcards, negation, and the NotationGlob utility for normalizing, uniting, and comparing glob lists.
---

A **glob** is a notation with two extra powers: the wildcard star `*` (match all
properties at a level) and the bang `!` prefix (negate — exclude the match).

```
*            // the whole object
billing.*    // everything under billing
!billing.*   // everything except billing's contents
name         // just name
```

Globs are accepted by [`Notation#filter()`](/notation/concepts/filtering/) for
filtering data. For working with the patterns themselves — validating,
comparing, combining — use the **`NotationGlob`** class.

```js
import { NotationGlob } from 'notation';

const g = new NotationGlob('billing.account.*');
g.test('billing.account.id');   // » true
```

## Instance Shape

A `NotationGlob` exposes its parsed form. Trailing redundant wildcards are
stripped on construction:

```js
const g = NotationGlob.create('!store.address.*');
g.glob;       // » "!store.address.*"
g.absGlob;    // » "store.address.*"  (negation removed)
g.isNegated;  // » true
g.notes;      // » ["store", "address", "*"]
g.parent;     // » "store.address"
```

`test(notation)` checks a concrete notation against the glob; `covers(glob)`
checks whether this glob can represent another (negation ignored):

```js
NotationGlob.create('*.y').covers('x.y');     // » true
NotationGlob.create('x[*].y').covers('x[*]'); // » false
```

## Normalize

`NotationGlob.normalize(list)` removes duplicates and redundant items, resolves
negations, and returns a logically sorted array. This is the heart of how globs
combine.

```js
const globs = ['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'age'];
NotationGlob.normalize(globs);
// » ['*', '!car.*', '!id', 'car.model']
```

What happened:

- `id` is dropped; its negated twin `!id` wins (negation always beats the
  positive when both are present).
- The duplicate `name` is removed, then `name` and `age` go too — `*` already
  covers every non-negated notation.
- `car.model` survives: it's explicitly listed *and* a negated glob (`!car.*`)
  also matches it, so it's not redundant.

### Restrictive Mode

By default a negated glob doesn't remove an explicitly-listed positive. In
**restrictive** mode, negation wins every match:

```js
NotationGlob.normalize(globs, true);
// » ['*', '!car.*', '!id']   (car.model removed)
```

The same `restrictive` flag is available on
[`filter()`](/notation/concepts/filtering/) and `union()`.

:::note
`Notation#filter()` and `NotationGlob.union()` normalize their inputs for you —
you rarely need to call `normalize()` by hand.
:::

## Union

`union(a, b)` merges two glob lists optimistically (positive wins over negated
when both are present), then normalizes:

```js
const a = ['*', '!car.model', 'car.brand', '!*.age'];
const b = ['car.model', 'user.age', 'user.name'];
NotationGlob.union(a, b);
// » ['*', '!*.age', 'user.age']
```

`!car.model` drops because `b` has the exact positive; `car.model` is then
redundant under `*`; `user.age` stays because `!*.age` still matches it.

## Compare, Sort, Intersect

`compare`/`sort` order globs from loose to specific (`* < *.y < x.y`), with a
negated glob sorting after its positive twin:

```js
NotationGlob.sort(['!prop.*.name', 'prop.*', 'prop.id']);
// » ['prop.*', 'prop.id', '!prop.*.name']
```

`intersect` finds the overlap of two globs — the basis for how negations
propagate during normalization:

```js
NotationGlob.create('x.*').intersect('!*.y');        // » "x.y"
NotationGlob.create('x.*').intersect('!*.y', true);  // » "!x.y"  (restrictive)
```

## Detection Helpers

```js
NotationGlob.isValid('!a.*');   // » true
NotationGlob.hasMagic('a.b');   // » false (no wildcard or negation)
NotationGlob.hasMagic('!a.b');  // » true
NotationGlob.toRegExp('a.*');   // » /^a\.[a-z$_][a-z$_\d]*(?:[[.].+|$)/i
```

Putting globs to work on data is covered in
[Filtering Data](/notation/concepts/filtering/), and the rules that keep glob
lists valid are in [Data Integrity](/notation/concepts/integrity/).
