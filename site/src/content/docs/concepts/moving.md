---
title: Moving & Copying
description: Copy, move, rename, and extract properties within or across objects.
---

These methods relocate a property by notation — within the source object, or
between the source and another object. **Copy** leaves the origin intact;
**move** removes it. Each acts only when the origin actually has the property
(a property whose value is `undefined` still counts).

All take an optional `newNotation` (rename on arrival; defaults to the original
notation) and `overwrite` (default `true`).

## Across Objects

`copyTo` / `moveTo` write to a **destination**; `copyFrom` / `moveFrom` read
from a **target** into the source.

```js
const obj = { car: { brand: 'Ford', model: 'Mustang' } };
const models = { dodge: 'Charger' };

// copy: obj unchanged, models gains a key
Notation.create(obj).copyTo(models, 'car.model', 'ford');
// models » { dodge: "Charger", ford: "Mustang" }

// move: removed from obj, added to models
Notation.create(obj).moveTo(models, 'car.model', 'ford');
// obj    » { car: { brand: "Ford" } }
// models » { dodge: "Charger", ford: "Mustang" }
```

`copyFrom` / `moveFrom` are the mirror image — they pull from the given object
into your source:

```js
const obj = { car: { brand: 'Ford' } };
Notation.create(obj).copyFrom({ dodge: 'Charger' }, 'dodge', 'car.model');
// obj » { car: { brand: "Ford", model: "Charger" } }
```

## Within the Source

`rename(notation, newNotation)` moves a property to a new notation on the same
object:

```js
const obj = { car: { brand: 'Ford', model: 'Mustang' } };
Notation.create(obj)
  .rename('car.brand', 'carBrand')
  .rename('car.model', 'carModel');
// » { carBrand: "Ford", carModel: "Mustang" }
```

## Into a New Object

`extract` copies, `extrude` moves — both return a brand-new object. They're
shorthands for `copyTo({}, …)` and `moveTo({}, …)`.

```js
const obj = { car: { brand: 'Ford', model: 'Mustang' } };

Notation.create(obj).extract('car.brand', 'carBrand');
// » { carBrand: "Ford" }   (obj unchanged)

Notation.create(obj).extrude('car.brand', 'carBrand');
// returns » { carBrand: "Ford" }
// obj     » { car: { model: "Mustang" } }
```

:::note
The destination/target must be a valid object or array, and both notations must
be valid — otherwise these throw a [`NotationError`](/notation/concepts/options/).
:::
