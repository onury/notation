---
title: Object, Bracket & Array Syntax
description: The exact rules for property keys, array indices, bracket notation, and wildcards.
---

Each note of a notation is validated against **ECMAScript variable syntax**,
array-index notation, and object-bracket notation. Invalid notes never match —
and most methods throw a [`NotationError`](/notation/concepts/options/) rather
than fail silently.

## Property keys

Standard identifiers use dot notation. Non-standard keys (digits, dashes,
symbols, reserved characters) must use **bracket** notation with quotes:

| Incorrect | Correct |
| --- | --- |
| `x[y]` | `x["y"]` |
| `x.1` | `x['1']` |
| `x.y-z` | `x["y-z"]` |
| `x.@` | `x['@']` |

```js
Notation.isValid('x.y-z');     // » false
Notation.isValid('x["y-z"]');  // » true
```

## Array indices

Brackets with a number address array items:

- `[0].x` — the `x` property of the first item of a **root array**.
- `x[1]` — the second item of the `x` property of a **root object**.

```js
const data = { tags: ['a', 'b', 'c'] };
Notation.create(data).get('tags[1]');   // » "b"
```

## Wildcards

Wildcards are **glob-only** — valid in [`filter()`](/notation/concepts/filtering/)
and the [`NotationGlob`](/notation/concepts/globs/) class, but not in regular
notation.

| Pattern | Meaning |
| --- | --- |
| `*` | all properties of an object |
| `[*]` | all items of an array |
| `x[*]` | all items of `x` (an array) |
| `x.*` | all properties of `x` (an object) |
| `x['*']` | a **literal** `*` key — *not* a wildcard (valid regular notation) |

```js
Notation.isValid('x.*');    // » false (glob only)
NotationGlob.isValid('x.*'); // » true
```

## Wildcard equivalence

For **non-negated** globs, trailing wildcards are redundant — they all normalize
to the bare notation:

```
x  =  x.*  =  x.*.*
[0]  =  [0][*]
```

**Negated** versions are *not* equivalent — the trailing wildcard changes what's
removed:

- `!x` — remove `x` entirely.
- `!x.*` — empty `x`'s first-level properties, but keep `x` (as `{}`).
- `!x.*.*` — empty only the second-level properties of `x`.

```
!x  ≠  !x[*]
![*]  ≠  ![*].*
```

This distinction drives [filtering](/notation/concepts/filtering/) and
[data integrity](/notation/concepts/integrity/) — worth internalizing before you
write negated globs.
