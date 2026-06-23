---
title: FAQ
description: Common questions about Notation.
---

## Does it mutate my object?

Yes — every method except [`filter()`](/notation/concepts/filtering/) mutates the
source. Call [`clone()`](/notation/concepts/mutation/) first to work on a copy.

## Can I use it with CommonJS / `require()`?

No. v3 is **ESM only** — use `import { Notation } from 'notation'`. See
[What's New in v3](/notation/whats-new/) and the
[ESM note](https://gist.github.com/onury/d3f3d765d7db2e8b2d050d14315f2ac7).

## What's the difference between `!x` and `!x.*`?

`!x` **removes** `x`. `!x.*` **empties** `x`'s contents but keeps `x` (as `{}` or
`[]`). They're not interchangeable — see [Object, Bracket & Array Syntax](/notation/concepts/syntax/#wildcard-equivalence).

## Why does my glob throw?

Almost always a [data-integrity](/notation/concepts/integrity/) issue: a list
mixing object and array root notations, or a `!x.*` negation against a value
that isn't a container. Use `!x` to remove a non-object instead.

## `get()` returns `undefined` for a property I set to `undefined` — bug?

No. A property that exists with value `undefined` **has** a value, so the default
isn't applied. Use [`has()` vs `hasDefined()`](/notation/concepts/reading/#test-existence)
to tell the two apart.

## How do I combine two glob lists?

[`NotationGlob.union(a, b)`](/notation/concepts/globs/#union) — it merges and
normalizes, resolving duplicates and contradictions. Don't concatenate arrays by
hand.

## Does `clone()` copy class instances and functions?

No. It deep-copies plain objects, arrays, primitives, `Date`, and `RegExp`.
Everything else is copied by reference. For a full clone, use a library like
lodash first — see [Mutation & Cloning](/notation/concepts/mutation/#what-clone-supports).

## How do I validate a notation from user input?

[`Notation.isValid()`](/notation/concepts/notations/#validating) for regular
notation, or `NotationGlob.isValid()` if wildcards/negation are allowed.

## Does it preserve the prototype chain?

No. `Notation` works on enumerable data properties only — it's for data objects,
not class instances.
