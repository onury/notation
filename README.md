## Notation.js

for Node and Browser.

> © 2016, Onur Yıldırım (@onury). MIT License.  

Utility for modifying / processing the contents of Javascript objects by parsing object notation strings or globs.

Note that this library will only deal with enumerable properties of the source object; so it should be used to manipulate data objects. It will not deal with preserving the prototype-chain of the given object.


## Usage

Install via **NPM**:

```shell
npm i notation --save
```

```js
var Notation = require('notation');

var obj = { car: { brand: "Dodge", model: "Charger" }, dog: { breed: "Akita" } };
var notation = new Notation(obj);
notation.get('car.model');      // "Charger"
notation
    .set('car.color', 'red')         // { car: { brand: "Dodge", model: "Charger", color: "red" }, dog: { breed: "Akita" } }
    .remove('car.model')             // { car: { brand: "Dodge", color: "red" }, dog: { breed: "Akita" } }
    .filter(['*', '!car'])           // { dog: { breed: "Akita" } }
    .flatten()                       // { "dog.breed": "Akita" }
    .expand()                        // { dog: { breed: "Akita" } }
    .merge({ 'dog.color': 'white' }) // { dog: { breed: "Akita", color: "white" } }
    .copyFrom(other, 'boat.name')    // { dog: { breed: "Akita", color: "white" }, boat: { name: "Mojo" } }
    .rename('boat.name', 'dog.name') // { dog: { breed: "Akita", color: "white", name: "Mojo" } }
    .value;                          // source object
```

## Documentation

You can read the full [**API reference** here][docs].

## Change-Log

**1.1.0** (2015-09-27)  
- Added `Notation#expand()` method (alias `Notation#aggregate()`).
- Refactored `Notation#getFlat()` to `Notation#flatten()`. Returns instance (chainable) instead of source.
- `Notation#separate()` returns instance (chainable) instead of source.
- Minor revisions.

**v1.0.0** (2016-04-10)  
- initial release.

## License

MIT.

[docs]:http://onury.github.io/notation/?api=notation
