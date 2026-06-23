---
title: Options, Strict Mode & Errors
description: Configure strict failures and array-index behavior, and handle NotationError.
---

Options are passed to the constructor (or `create`), or set later via the
`.options` property:

```js
const n = Notation.create(obj, { strict: true });
n.options = { preserveIndices: true };   // merged onto existing options
```

| Option | Default | Effect |
| --- | --- | --- |
| `strict` | `false` | throw on missing paths / blocked overwrites instead of failing quietly |
| `preserveIndices` | `false` | keep array indices when removing items (produces sparse arrays) |

## strict

With `strict` off (the default), missing paths resolve to `undefined` and blocked
writes are skipped silently. With `strict` on, they throw — recommended when
working with sensitive data, so failures surface instead of slipping through.

```js
Notation.create({ car: {} }).get('car.model');               // » undefined
Notation.create({ car: {} }, { strict: true }).get('car.model');
// » throws NotationError — "car.model" does not exist
```

A default value bypasses the throw — it's an explicit fallback:

```js
Notation.create({ car: {} }, { strict: true }).get('car.model', null);  // » null
```

`strict` affects `get()`, `set()` (when overwrite is disabled), and `remove()`.
The inspect methods —
[`inspectGet()` / `inspectRemove()`](/notation/concepts/reading/#inspect) — are
exempt; they report `has: false` rather than throwing.

> _Regardless of `strict`, invalid notation syntax and other critical failures
> always throw._

## preserveIndices

Removing an array item splices by default, so later indices shift down. Enable
`preserveIndices` to leave a sparse hole instead:

```js
Notation.create([0, 1, 2]).remove('[1]').value;
// » [0, 2]

Notation.create([0, 1, 2], { preserveIndices: true }).remove('[1]').value;
// » [0, <empty>, 2]
```

## NotationError

All thrown errors are instances of `NotationError` (a subclass of `Error`), so
you can target them specifically:

```js
import { Notation, NotationError } from 'notation';

try {
  Notation.create({ x: 1 }).filter(['*', '!x.*']);  // integrity failure
} catch (err) {
  if (err instanceof NotationError) {
    console.error('notation problem:', err.message);
  } else {
    throw err;
  }
}
```

The `restrictive` option for `filter()` is covered in
[Filtering Data](/notation/concepts/filtering/#restrictive-mode).
