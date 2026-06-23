---
title: Data Integrity
description: The two integrity rules that make filtering throw instead of producing wrong data.
---

Notation prefers a loud failure over a silently wrong result. Two integrity
checks guard [filtering](/notation/concepts/filtering/) and
[glob normalization](/notation/concepts/globs/).

## Glob list integrity

A single glob list can't mix **object** and **array** notations at the root —
the root implies one source type, never both.

```js
NotationGlob.normalize(['[*]', '!x.y']);
// » throws NotationError — root is both array ([*]) and object (x.y)
```

`[*]` says the source is an array, while `!x.y` says `x` is an object property
of the root — only one can be true.

## Glob vs. value integrity

A negated glob with a trailing wildcard (`!x.*`) means *empty `x`'s contents but
keep `x`*. That only makes sense if `x` is actually a container. When the value's
type contradicts the glob, `filter()` throws.

```js
Notation.create({ x: { y: 1 } }).filter(['*', '!x.*']).value;
// » { x: {} }   ✓  x is an object, emptied as expected
```

But if `x` isn't an object:

```js
Notation.create({ x: 1 }).filter(['*', '!x.*']).value;
// » throws NotationError — can't empty a Number with "!x.*"
```

The value `1` is a `Number`, so it can't be reduced to `{}`. To remove it
outright, drop the trailing wildcard:

```js
Notation.create({ x: 1 }).filter(['*', '!x']).value;
// » {}
```

:::tip
Reach for `!x` to **remove** a property, and `!x.*` to **empty** it. Mixing them
up against the wrong value type is the usual cause of an integrity error.
:::

[Strict mode](/notation/concepts/options/) tightens this further: emptying a
`null`/`undefined` value with a trailing-wildcard negation also throws, rather
than being skipped.
