---
title: Best Practices
description: Habits that keep Notation code correct and predictable.
---

## Clone Before Mutating Shared Data

Every method except `filter()` mutates the source. If the object is shared (a
cache entry, a request body, app state), [`clone()`](/notation/concepts/mutation/)
first:

```js
const safe = Notation.create(shared).clone().set('seen', true).value;
```

## Enable Strict for Sensitive Data

Silent `undefined` is convenient until it hides a typo in a path that gates
access or billing. Turn on [`strict`](/notation/concepts/options/) so missing
paths and blocked writes throw:

```js
const n = Notation.create(record, { strict: true });
```

## Filter Untrusted Output with Allow-Lists

When shaping data you send to a client, prefer an explicit allow-list over a
deny-list — a new sensitive field added later stays hidden by default:

```js
// safer: only these escape
Notation.create(user).filter(['id', 'name', 'profile.*']).value;

// riskier: everything escapes unless you remember to deny it
Notation.create(user).filter(['*', '!passwordHash']).value;
```

If you must use a deny-list, keep it in [restrictive mode](/notation/concepts/filtering/#restrictive-mode)
so negations can't be re-included.

## Know `!x` vs `!x.*`

`!x` **removes** `x`; `!x.*` **empties** it. Using `!x.*` against a non-object
throws an [integrity error](/notation/concepts/integrity/). Pick the one that
matches the value's type.

## Combine Permission Lists with Union

Don't concatenate glob arrays by hand — let
[`NotationGlob.union()`](/notation/concepts/globs/#union) merge and normalize
them so redundant and contradictory patterns resolve correctly:

```js
const globs = NotationGlob.union(roleA, roleB);
```

## Validate Notations from User Input

If a notation comes from outside, check it before use — and pick the right
validator for the context:

```js
Notation.isValid(input);     // regular notation (no wildcards)
NotationGlob.isValid(input); // glob (allows * and !)
```

## Reuse `Notation.create`

A small alias keeps call sites readable:

```js
const notate = Notation.create;
notate(obj).get('a.b.c');
```
