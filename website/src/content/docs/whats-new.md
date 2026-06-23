---
title: What's New in v3
description: What changed in Notation v3, and how to upgrade from v2.
---

v3 is a TypeScript rewrite. The behavior of the API is unchanged from v2 — the
breaking changes are about **packaging** (ESM) and a set of **renames** that
started as v2 deprecations.

## Breaking changes

- **ESM only.** Notation is now an ES module. Import it with
  `import { Notation } from 'notation'` — CommonJS `require()` is no longer
  supported. ([Why ESM?](https://gist.github.com/onury/d3f3d765d7db2e8b2d050d14315f2ac7))
- **Node ≥ 20** required.
- **`exports` map.** Only the package root (`notation`) and `package.json` are
  importable — no deep imports into `lib/`.
- **Nested classes removed.** `Notation.Error` and `Notation.Glob` are gone; the
  classes are top-level named exports now.

## Renames

Every removed member has a direct replacement with identical behavior:

| Removed (v2) | Use instead (v3) |
| --- | --- |
| `Notation.Error` | [`NotationError`](/notation/api/classes/notationerror/) |
| `Notation.Glob` | [`NotationGlob`](/notation/api/classes/notationglob/) |
| `NotationGlob#levels` | `NotationGlob#notes` |
| `Notation#eachLevel()` | `Notation#eachNote()` |
| `Notation#aggregate()` | `Notation#expand()` |
| `Notation#delete()` | `Notation#remove()` |
| `Notation#renote()` | `Notation#rename()` |
| `Notation#copyToNew()` | `Notation#extract()` |
| `Notation#moveToNew()` | `Notation#extrude()` |
| `Notation.countLevels()` | `Notation.countNotes()` |

## Upgrading

```js
// v2
const { Notation } = require('notation');
const glob = new Notation.Glob('x.*');
Notation.create(obj).aggregate();

// v3
import { Notation, NotationGlob } from 'notation';
const glob = new NotationGlob('x.*');
Notation.create(obj).expand();
```

Switch your imports to ESM, swap the renamed members per the table, and your v2
code runs unchanged. The full history is in the [Changelog](/notation/changelog/).
