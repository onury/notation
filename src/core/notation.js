import utils from '../utils';
import NotationGlob from './notation.glob';
import NotationError from './notation.error';

const ERR = {
    SOURCE: 'Invalid source object.',
    DEST: 'Invalid destination object.',
    NOTATION: 'Invalid notation: ',
    NOTA_OBJ: 'Invalid notations object: '
};

/**
 *  Notation.js for Node and Browser.
 *
 *  Like in most programming languages, JavaScript makes use of dot-notation to
 *  access the value of a member of an object (or class). `Notation` class
 *  provides various methods for modifying / processing the contents of the
 *  given object; by parsing object notation strings or globs.
 *
 *  Note that this class will only deal with enumerable properties of the source
 *  object; so it should be used to manipulate data objects. It will not deal
 *  with preserving the prototype-chain of the given object.
 *
 *  @author   Onur Yıldırım <onur@cutepilot.com>
 *  @license  MIT
 */
class Notation {

    /**
     *  Initializes a new instance of `Notation`.
     *
     *  @param {Object} [object={}] - The source object to be notated.
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
     *  const notation = new Notation(obj);
     *  notation.get('car.model'); // "Charger"
     */
    constructor(object = {}) {
        // if defined, it should be an object.
        if (!utils.isObject(object)) {
            throw new NotationError(ERR.SOURCE);
        }
        this._source = object;
    }

    // --------------------------------
    // Notation Instance Properties
    // --------------------------------

    /**
     *  Gets the value of the source object.
     *  @type {Object}
     *
     *  @example
     *  const person = { name: "Onur" };
     *  const me = Notation.create(person)
     *      .set("age", 36)
     *      .set("car.brand", "Ford")
     *      .set("car.model", "Mustang")
     *      .value;
     *  console.log(me); // { name: "Onur", age: 36, car: { brand: "Ford", model: "Mustang" } }
     *  console.log(person === me); // true
     */
    get value() {
        return this._source;
    }

    // --------------------------------
    // Notation Instance Methods
    // --------------------------------

    /**
     *  Recursively iterates through each key of the source object and invokes
     *  the given callback function with parameters, on each non-object value.
     *  @alias Notation#eachKey
     *
     *  @param {Function} callback - The callback function to be invoked on
     *  each on each non-object value. To break out of the loop, return `false`
     *  from within the callback.
     *  Callback signature: `callback(notation, key, value, object) { ... }`
     *
     *  @returns {void}
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
     *  Notation.create(obj).each(function (notation, key, value, object) {
     *      console.log(notation, value);
     *  });
     *  // "car.brand"  "Dodge"
     *  // "car.model"  "Charger"
     *  // "car.year"  1970
     */
    each(callback) {
        const o = this._source;
        const keys = Object.keys(o);
        const isArray = utils.isArray(o);

        utils.each(keys, (key, index, list) => {
            // this is preserved in arrow functions
            const prop = o[key];
            const keyName = isArray ? `[${key}]` : key;
            let N;
            if (utils.isObject(prop)) {
                N = new Notation(prop);
                N.each((notation, nKey, value, prop) => {
                    let subKey = keyName + '.' + notation;
                    callback.call(N, subKey, nKey, value, o);
                });
            } else if (utils.isArray(prop) && prop.length) {
                handleArrayEach(this, callback, prop, keyName);
            } else {
                callback.call(this, keyName, keyName, prop, o);
            }
        });

        function handleArrayEach(self, cb, arr, key) {
            const len = arr.length;
            for (let i = 0; i < len; i++) {
                const subkey = `${key}[${i}]`;
                if (utils.isObject(arr[i])) {
                    const N = new Notation(arr[i]);
                    N.each((notation, nKey, value, prop) => {
                        const _subKey = subkey + '.' + notation;
                        cb.call(N, _subKey, nKey, value, o);
                    });
                } else if (utils.isArray(arr[i])) {
                    handleArrayEach(self, cb, arr[i], subkey);
                } else {
                    cb.call(self, subkey, `[${i}]`, arr[i]);
                }
            }
        }
    }
    /**
     *  Alias for `#each`
     *  @private
     */
    eachKey(callback) {
        return this.each(callback);
    }

    /**
     *  Iterates through each note of the given notation string by evaluating
     *  it on the source object.
     *
     *  @param {String} notation - The notation string to be iterated through.
     *  @param {Function} callback - The callback function to be invoked on
     *  each iteration. To break out of the loop, return `false` from within
     *  the callback.
     *  Callback signature: `callback(levelValue, note, index, list) { ... }`
     *
     *  @returns {void}
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
     *  Notation.create(obj)
     *      .eachValue("car.brand", function (levelValue, note, index, list) {
     *          console.log(note, levelValue); // "car.brand" "Dodge"
     *      });
     */
    eachValue(notation, callback) {
        if (!Notation.isValid(notation)) {
            throw new NotationError(ERR.NOTATION + '`' + notation + '`');
        }
        var level = this._source;
        Notation.eachNote(notation, (levelNotation, note, index, list) => {
            const noteKey = utils.isArrIndex(note) ? utils.getIndexNumber(note) : note;
            level = utils.hasOwn(level, noteKey) ? level[noteKey] : undefined;
            if (callback(level, levelNotation, note, index, list) === false) return false;
        });
    }

    /**
     *  Gets the list of notations from the source object (keys).
     *
     *  @returns {Array} - An array of notation strings.
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
     *  const notations = Notation.create(obj).getNotations();
     *  console.log(notations); // [ "car.brand", "car.model", "car.year" ]
     */
    getNotations() {
        let list = [];
        this.each((notation, key, value, obj) => {
            list.push(notation);
        });
        return list;
    }

    /**
     *  Flattens the source object to a single-level object with notated keys.
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
     *  const flat = Notation.create(obj).flatten().value;
     *  console.log(flat);
     *  // { "car.brand": "Dodge", "car.model": "Charger", "car.year": 1970 }
     */
    flatten() {
        let o = {};
        this.each((notation, key, value, obj) => {
            o[notation] = value;
        });
        // return o;
        this._source = o;
        return this;
    }

    /**
     *  Aggregates notated keys of a (single-level) object, and nests them under
     *  their corresponding properties. This is the opposite of `Notation#flatten`
     *  method. This might be useful when expanding a flat object fetched from
     *  a database.
     *  @alias Notation#aggregate
     *  @chainable
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
     *
     *  @example
     *  const obj = { "car.brand": "Dodge", "car.model": "Charger", "car.year": 1970 }
     *  const expanded = Notation.create(obj).expand().value;
     *  console.log(expanded); // { car: { brand: "Dodge", model: "Charger", year: 1970 } };
     */
    expand() {
        this._source = Notation.create({}).merge(this._source).value;
        return this;
    }
    /**
     *  Alias for `#expand`
     *  @private
     */
    aggregate() {
        return this.expand();
    }

    /**
     *  Inspects the given notation on the source object by checking
     *  if the source object actually has the notated property;
     *  and getting its value if exists.
     *
     *  @param {String} notation - The notation string to be inspected.
     *
     *  @returns {InspectResult} - The result object.
     *
     *  @example
     *  Notation.create({ car: { year: 1970 } }).inspect("car.year");
     *  // { has: true, value: 1970 }
     *  Notation.create({ car: { year: 1970 } }).inspect("car.color");
     *  // { has: false, value: undefined }
     *  Notation.create({ car: { color: undefined } }).inspect("car.color");
     *  // { has: true, value: undefined }
     */
    inspect(notation) {
        if (!Notation.isValid(notation)) {
            throw new NotationError(ERR.NOTATION + '`' + notation + '`');
        }
        let level = this._source,
            result = { has: false, value: undefined };
        Notation.eachNote(notation, (levelNotation, note, index, list, isArray) => {
            note = utils.isArrIndex(note)
                ? utils.getIndexNumber(note)
                : note;

            if (utils.hasOwn(level, note)) {
                level = level[note];
                result = { has: true, value: level };
            } else {
                result = { has: false, value: undefined };
                return false; // break out
            }
        });
        return result;
    }
    /**
     *  Notation inspection result object.
     *  @typedef Notation~InspectResult
     *  @type Object
     *  @property {Boolean} has - Indicates whether the source object has the given
     *  notation as a (leveled) enumerable property. If the property exists but has
     *  a value of `undefined`, this will still return `true`.
     *  @property {*} value - The value of the notated property. If the source object
     *  does not have the notation, the value will be `undefined`.
     */

    /**
     *  Inspects and removes the given notation from the source object
     *  by checking if the source object actually has the notated property;
     *  and getting its value if exists, before removing the property.
     *
     *  @param {String} notation - The notation string to be inspected.
     *
     *  @returns {InspectResult} - The result object.
     *
     *  @example
     *  const obj = { name: "John", car: { year: 1970 } };
     *  Notation.create(obj).inspectRemove("car.year"); // { has: true, value: 1970 }
     *  // obj » { name: "John", car: {} }
     *  Notation.create(obj).inspectRemove("car.year", true); // { has: true, value: 1970 }
     *  // obj » { name: "John" }
     *  Notation.create({ car: { year: 1970 } }).inspectRemove("car.color");
     *  // { has: false, value: undefined }
     *  Notation.create({ car: { color: undefined } }).inspectRemove("car.color");
     *  // { has: true, value: undefined }
     */
    inspectRemove(notation) {
        if (!Notation.isValid(notation)) {
            throw new NotationError(ERR.NOTATION + '`' + notation + '`');
        }
        let o, lastNote;
        const notes = utils.splitNotation(notation);
        if (notes.length === 1) {
            lastNote = notation;
            o = this._source;
        } else {
            let upToLast = Notation.parent(notation);
            lastNote = Notation.last(notation);
            o = this.inspect(upToLast).value;
        }
        let result;
        lastNote = utils.isArrIndex(lastNote) ? utils.getIndexNumber(lastNote) : lastNote;

        if (utils.hasOwn(o, lastNote)) {
            if (utils.isArray(o)) {
                result = { has: true, value: o.splice(lastNote, 1)[0] };
            } else {
                result = { has: true, value: o[lastNote] };
                delete o[lastNote];
            }
        } else {
            result = { has: false, value: undefined };
        }

        return result;
    }

    /**
     *  Checks whether the source object has the given notation
     *  as a (leveled) enumerable property. If the property exists
     *  but has a value of `undefined`, this will still return `true`.
     *
     *  @param {String} notation - The notation string to be checked.
     *
     *  @returns {Boolean}
     *
     *  @example
     *  Notation.create({ car: { year: 1970 } }).has("car.year"); // true
     *  Notation.create({ car: { year: undefined } }).has("car.year"); // true
     *  Notation.create({}).has("car.color"); // false
     */
    has(notation) {
        return this.inspect(notation).has;
    }

    /**
     *  Checks whether the source object has the given notation
     *  as a (leveled) defined enumerable property. If the property
     *  exists but has a value of `undefined`, this will return `false`.
     *
     *  @param {String} notation - The notation string to be checked.
     *
     *  @returns {Boolean}
     *
     *  @example
     *  Notation.create({ car: { year: 1970 } }).hasDefined("car.year"); // true
     *  Notation.create({ car: { year: undefined } }).hasDefined("car.year"); // false
     *  Notation.create({}).hasDefined("car.color"); // false
     */
    hasDefined(notation) {
        return this.inspect(notation).value !== undefined;
    }

    /**
     *  Gets the value of the corresponding property at the given
     *  notation.
     *
     *  @param {String} notation - The notation string to be processed.
     *  @param {String} [defaultValue] - The default value to be returned if
     *  the property is not found or enumerable.
     *
     *  @returns {*} - The value of the notated property.
     *
     *  @example
     *  Notation.create({ car: { brand: "Dodge" } }).get("car.brand"); // "Dodge"
     *  Notation.create({ car: {} }).get("car.model"); // undefined
     *  Notation.create({ car: {} }).get("car.model", "Challenger"); // "Challenger"
     *  Notation.create({ car: { model: undefined } }).get("car.model", "Challenger"); // undefined
     */
    get(notation, defaultValue) {
        let result = this.inspect(notation);
        return !result.has ? defaultValue : result.value;
    }

    /**
     *  Sets the value of the corresponding property at the given
     *  notation. If the property does not exist, it will be created
     *  and nested at the calculated level. If it exists; its value
     *  will be overwritten by default.
     *  @chainable
     *
     *  @param {String} notation - The notation string to be processed.
     *  @param {*} value - The value to be set for the notated property.
     *  @param {Boolean} [overwrite=true] - Whether to overwrite the property
     *  if exists.
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", year: 1970 } };
     *  Notation.create(obj)
     *      .set("car.brand", "Ford")
     *      .set("car.model", "Mustang")
     *      .set("car.year", 1965, false)
     *      .set("car.color", "red")
     *      .set("boat", "none");
     *  console.log(obj);
     *  // { notebook: "Mac", car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" }, boat: "none" };
     */
    set(notation, value, overwrite = true, concatArrays = false) {
        if (!Notation.isValid(notation)) {
            throw new NotationError(ERR.NOTATION + '`' + notation + '`');
        }
        let level = this._source,
            last;
        Notation.eachNote(notation, (levelNotation, note, index, list, isArray) => {
            note = utils.isArrIndex(note) ? +note.replace(/[\[\]]/g, '') : note;
            last = index === list.length - 1;

            // check if the property is at this level
            if (utils.hasOwn(level, note)) {
                // check if we're at the last level
                if (last) {
                    // if overwrite is set, assign the value.
                    if (overwrite) {
                        if (concatArrays) {
                            level.push(value);
                        } else {
                            level[note] = value;
                        }
                    }
                } else {
                    // if not, just re-reference the current level.
                    level = level[note];
                }
            } else {
                // we don't have this property at this level
                // so; if this is the last level, we set the value
                // if not, we set an empty object for the next level
                level = level[note] = last ? value : isArray ? [] : {};
            }
        });
        return this;
    }

    /**
     *  Just like the `.set()` method but instead of a single notation
     *  string, an object of notations and values can be passed.
     *  Sets the value of each corresponding property at the given
     *  notation. If a property does not exist, it will be created
     *  and nested at the calculated level. If it exists; its value
     *  will be overwritten by default.
     *  @chainable
     *
     *  @param {Object} notationsObject - The notations object to be processed.
     *  This can either be a regular object with non-dotted keys
     *  (which will be merged to the first/root level of the source object);
     *  or a flattened object with notated (dotted) keys.
     *  @param {Boolean} [overwrite=true] - Whether to overwrite a property if
     *  exists.
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", year: 1970 } };
     *  Notation.create(obj).merge({
     *      "car.brand": "Ford",
     *      "car.model": "Mustang",
     *      "car.year": 1965,
     *      "car.color": "red",
     *      "boat": "none"
     *  });
     *  console.log(obj);
     *  // { car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" }, boat: "none" };
     */
    merge(notationsObject, overwrite = true) {
        if (!utils.isObject(notationsObject)) {
            throw new NotationError(ERR.NOTA_OBJ + '`' + notationsObject + '`');
        }
        let value;
        const N = new Notation(notationsObject).flatten();
        utils.each(Object.keys(N._source), (notation, index, obj) => {
            // console.log(notation, index, obj);
            // this is preserved in arrow functions
            value = N._source[notation];
            this.set(notation, value, overwrite, true);
        });
        return this;
    }

    /**
     *  Removes the properties by the given list of notations from the source
     *  object and returns a new object with the removed properties.
     *  Opposite of `merge()` method.
     *
     *  @param {Array} notations - The notations array to be processed.
     *
     *  @returns {Object} - An object with the removed properties.
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", year: 1970 }, notebook: "Mac" };
     *  const separated = Notation.create(obj).separate(["car.brand", "boat" ]);
     *  console.log(separated);
     *  // { notebook: "Mac", car: { brand: "Ford" } };
     *  console.log(obj);
     *  // { car: { year: 1970 } };
     */
    separate(notations) {
        if (!utils.isArray(notations)) {
            throw new NotationError(ERR.NOTA_OBJ + '`' + notations + '`');
        }
        let o = new Notation({});
        utils.each(notations, (notation, index, obj) => {
            let result = this.inspectRemove(notation);
            o.set(notation, result.value);
        });
        return o;
    }

    /**
     *  Deep clones the source object while filtering its properties
     *  by the given glob notations. Includes all matched properties
     *  and removes the rest.
     *
     *  @param {Array|String} globNotations - The glob notation(s) to
     *  be processed. The difference between normal notations and
     *  glob-notations is that you can use wildcard stars (*) and
     *  negate the notation by prepending a bang (!). A negated
     *  notation will be excluded. Order of the globs do not matter,
     *  they will be logically sorted. Loose globs will be processed
     *  first and verbose globs or normal notations will be processed
     *  last. e.g. `[ "car.model", "*", "!car.*" ]` will be sorted as
     *  `[ "*", "!car.*", "car.model" ]`.
     *  Passing no parameters or passing an empty string (`""` or `[""]`)
     *  will empty the source object.
     *  @chainable
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
     *
     *  @example
     *  const obj = { notebook: "Mac", car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" } };
     *  const notation = Notation.create(obj);
     *  notation.filter([ "*", "!car.*", "car.model" ]);
     *  console.log(obj);       // { notebook: "Mac", car: { model: "Mustang" } }
     *  notation.filter("*");   // re-filtering the current contents
     *  console.log(obj);       // { notebook: "Mac", car: { model: "Mustang" } }
     *  notation.filter();      // or notation.filter("");
     *  console.log(obj);       // {}
     */
    filter(globNotations) {
        let original = this.value;
        let copy = utils.deepCopy(original);

        // ensure array, normalize and sort the globs in logical order. we also
        // concat the array first (to prevent mutating the original) bec. we'll
        // change it's content via `.shift()`
        let globs = NotationGlob.normalize(globNotations).concat();

        // if globs only consist of "*"; set the "copy" as source and return.
        if (utils.stringOrArrayOf(globs, '*')) {
            this._source = copy;
            return this;
        }
        // if globs is "" or [""] set source to `{}` and return.
        if (arguments.length === 0
            || utils.stringOrArrayOf(globs, '')
            || utils.stringOrArrayOf(globs, '!*')) {
            this._source = {};
            return this;
        }

        let filtered;
        // if the first item of sorted globs is "*" we set the source to the
        // (full) "copy" and remove the "*" from globs (not to re-process).
        if (globs[0] === '*') {
            filtered = new Notation(copy);
            globs.shift();
        } else {
            // otherwise we set an empty object as the source so that we can
            // add notations/properties to it.
            filtered = new Notation({});
        }

        let g, endStar, normalized;
        // iterate through globs
        utils.each(globs, (globNotation, index, array) => {
            // console.log('--->', globNotation);
            g = new NotationGlob(globNotation);
            // set flag that indicates whether the glob ends with `.*`
            endStar = g.absGlob.slice(-2) === '.*' || g.absGlob.slice(-3) === '[*]';
            // set flag that indicates whether the glob ends with `[*]`
            // endArrStar = g.absGlob.slice(-3) === '[*]';
            // get the remaining part as the (extra) normalized glob
            normalized = g.absGlob.replace(/(\.\*$)|(\[\*\]$)/, '');
            // normalized = endStar ? g.absGlob.replace(/(\.\*)+$/, '') : g.absGlob;
            // check if normalized glob has no wildcard stars e.g. "a.b" or
            // "!a.b.c" etc..

            if (normalized.indexOf('*') < 0) {
                if (g.isNegated) {
                    // directly remove the notation if negated
                    filtered.remove(normalized);
                    // if original glob had `.*` at the end, it means remove
                    // contents (not itself). so we'll set an empty object.
                    // meaning `some.prop` (prop) is removed completely but
                    // `some.prop.*` (prop) results in `{}`.
                    if (endStar) filtered.set(normalized, {}, true);
                } else {
                    // directly copy the same notation from the original
                    filtered.copyFrom(original, normalized, null, true);
                }
                // move to the next
                return true;
            }
            // if glob has wildcard star(s), we'll iterate through keys of the
            // source object and see if (full) notation of each key matches
            // the current glob.

            // TODO: Optimize the loop below. Instead of checking each key's
            // notation, get the non-star left part of the glob and iterate
            // that property of the source object.
            this.each((originalNotation, key, value, obj) => {
                // console.log('>>', originalNotation);

                // iterating each note of original notation. i.e.:
                // note1.note2.note3 is iterated from left to right, as:
                // 'note1', 'note1.note2', 'note1.note2.note3' — in order.
                Notation.eachNote(originalNotation, (levelNotation, note, index, list) => {
                    if (g.test(levelNotation)) {
                        if (g.isNegated) {
                            // console.log('removing', levelNotation, 'of', originalNotation);
                            filtered.remove(levelNotation);
                            // we break and return early if removed bec. deeper
                            // level props are also removed with this parent.
                            // e.g. when 'note1.note2' of 'note1.note2.note3' is
                            // removed, we no more have 'note3'.
                            return false;
                        }
                        if (list.length - 1 > index) {
                            let nextLevelNotation = utils.concatNotes([levelNotation, list[index + 1]]);
                            if (g.test(nextLevelNotation)) return;
                        }
                        filtered.set(levelNotation, value, true);
                    }
                });
            });
        });
        // finally set the filtered's value as the source of our instance and
        // return.
        this._source = filtered.value;
        return this;
    }

    /**
     *  Removes the property from the source object, at the given notation.
     *  @alias Notation#delete
     *  @chainable
     *
     *  @param {String} notation - The notation to be inspected.
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
     *
     *  @example
     *  const obj = { notebook: "Mac", car: { model: "Mustang" } };
     *  Notation.create(obj).remove("car.model");
     *  console.log(obj); // { notebook: "Mac", car: { } }
     */
    remove(notation) {
        this.inspectRemove(notation);
        return this;
    }
    /**
     *  Alias of `Notation#remove`
     *  @private
     */
    delete(notation) {
        this.remove(notation);
        return this;
    }

    /**
     *  Clones the `Notation` instance to a new one.
     *
     *  @returns {Notation} - A new copy of the instance.
     */
    clone() {
        let o = utils.deepCopy(this.value);
        return new Notation(o);
    }

    /**
     *  Copies the notated property from the source object and adds it to the
     *  destination — only if the source object actually has that property.
     *  This is different than a property with a value of `undefined`.
     *  @chainable
     *
     *  @param {Object} destination - The destination object that the notated
     *  properties will be copied to.
     *  @param {String} notation - The notation to get the corresponding property
     *  from the source object.
     *  @param {String} [newNotation=null] - The notation to set the source property
     *  on the destination object. In other words, the copied property will be
     *  renamed to this value before set on the destination object. If not set,
     *  `notation` argument will be used.
     *  @param {Boolean} [overwrite=true] - Whether to overwrite the property on
     *  the destination object if it exists.
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
     *
     *  @example
     *  const obj = { car: { brand: "Ford", model: "Mustang" } };
     *  const models = { dodge: "Charger" };
     *  Notation.create(obj).copyTo(models, "car.model", "ford");
     *  console.log(models);
     *  // { dodge: "Charger", ford: "Mustang" }
     *  // source object (obj) is not modified
     */
    copyTo(destination, notation, newNotation = null, overwrite = true) {
        if (!(utils.isObject(destination) || utils.isArray(destination)))
        {throw new NotationError(ERR.DEST);}

        let result = this.inspect(notation);
        if (result.has) {
            new Notation(destination).set(newNotation || notation, result.value, overwrite);
        }
        return this;
    }

    /**
     *  Copies the notated property from the destination object and adds it to the
     *  source object — only if the destination object actually has that property.
     *  This is different than a property with a value of `undefined`.
     *  @chainable
     *
     *  @param {Object} destination - The destination object that the notated
     *  properties will be copied from.
     *  @param {String} notation - The notation to get the corresponding property
     *  from the destination object.
     *  @param {String} [newNotation=null] - The notation to set the destination
     *  property on the source object. In other words, the copied property
     *  will be renamed to this value before set on the source object.
     *  If not set, `notation` argument will be used.
     *  @param {Boolean} [overwrite=true] - Whether to overwrite the property
     *  on the source object if it exists.
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
     *
     *  @example
     *  const obj = { car: { brand: "Ford", model: "Mustang" } };
     *  const models = { dodge: "Charger" };
     *  Notation.create(obj).copyFrom(models, "dodge", "car.model", true);
     *  console.log(obj);
     *  // { car: { brand: "Ford", model: "Charger" } }
     *  // models object is not modified
     */
    copyFrom(destination, notation, newNotation = null, overwrite = true) {
        if (!utils.isObject(destination)) throw new NotationError(ERR.DEST);
        let result = new Notation(destination).inspect(notation);
        if (result.has) {
            this.set(newNotation || notation, result.value, overwrite);
        }
        return this;
    }

    /**
     *  Removes the notated property from the source object and adds it to the
     *  destination — only if the source object actually has that property.
     *  This is different than a property with a value of `undefined`.
     *  @chainable
     *
     *  @param {Object} destination - The destination object that the notated
     *  properties will be moved to.
     *  @param {String} notation - The notation to get the corresponding
     *  property from the source object.
     *  @param {String} [newNotation=null] - The notation to set the source property
     *  on the destination object. In other words, the moved property will be
     *  renamed to this value before set on the destination object. If not set,
     *  `notation` argument will be used.
     *  @param {Boolean} [overwrite=true] - Whether to overwrite the property on
     *  the destination object if it exists.
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
     *
     *  @example
     *  const obj = { car: { brand: "Ford", model: "Mustang" } };
     *  const models = { dodge: "Charger" };
     *  Notation.create(obj).moveTo(models, "car.model", "ford");
     *  console.log(obj);
     *  // { car: { brand: "Ford" } }
     *  console.log(models);
     *  // { dodge: "Charger", ford: "Mustang" }
     */
    moveTo(destination, notation, newNotation = null, overwrite = true) {
        if (!(utils.isObject(destination) || utils.isArray(destination)))
        {throw new NotationError(ERR.DEST);}
        let result = this.inspectRemove(notation);

        if (result.has) {
            new Notation(destination).set(newNotation || notation, result.value, overwrite);
        }
        return this;
    }

    /**
     *  Removes the notated property from the destination object and adds it to the
     *  source object — only if the destination object actually has that property.
     *  This is different than a property with a value of `undefined`.
     *  @chainable
     *
     *  @param {Object} destination - The destination object that the notated
     *  properties will be moved from.
     *  @param {String} notation - The notation to get the corresponding property
     *  from the destination object.
     *  @param {String} [newNotation=null] - The notation to set the destination
     *  property on the source object. In other words, the moved property
     *  will be renamed to this value before set on the source object.
     *  If not set, `notation` argument will be used.
     *  @param {Boolean} [overwrite=true] - Whether to overwrite the property on
     *  the source object if it exists.
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
     *
     *  @example
     *  const obj = { car: { brand: "Ford", model: "Mustang" } };
     *  const models = { dodge: "Charger" };
     *  Notation.create(obj).moveFrom(models, "dodge", "car.model", true);
     *  console.log(obj);
     *  // { car: { brand: "Ford", model: "Charger" } }
     *  console.log(models);
     *  // {}
     */
    moveFrom(destination, notation, newNotation = null, overwrite = true) {
        if (!utils.isObject(destination)) throw new NotationError(ERR.DEST);
        let result = new Notation(destination).inspectRemove(notation);
        if (result.has) {
            this.set(newNotation || notation, result.value, overwrite);
        }
        return this;
    }

    /**
     *  Renames the notated property of the source object by the new notation.
     *  @alias Notation#renote
     *  @chainable
     *
     *  @param {String} notation - The notation to get the corresponding
     *  property (value) from the source object.
     *  @param {String} newNotation - The new notation for the targeted
     *  property value. If not set, the source object will not be modified.
     *  @param {Boolean} [overwrite=true] - Whether to overwrite the property at
     *  the new notation, if it exists.
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
     *
     *  @example
     *  const obj = { car: { brand: "Ford", model: "Mustang" } };
     *  Notation.create(obj)
     *      .rename("car.brand", "carBrand")
     *      .rename("car.model", "carModel");
     *  console.log(obj);
     *  // { carBrand: "Ford", carModel: "Mustang" }
     */
    rename(notation, newNotation, overwrite) {
        if (!newNotation) return this;
        return this.moveTo(this._source, notation, newNotation, overwrite);
    }
    /**
     *  Alias for `#rename`
     *  @private
     */
    renote(notation, newNotation, overwrite) {
        return this.rename(notation, newNotation, overwrite);
    }

    /**
     *  Extracts the property at the given notation to a new object by copying
     *  it from the source object. This is equivalent to `.copyTo({}, notation, newNotation)`.
     *  @alias Notation#copyToNew
     *
     *  @param {String} notation - The notation to get the corresponding
     *  property (value) from the source object.
     *  @param {String} newNotation - The new notation to be set on the new
     *  object for the targeted property value. If not set, `notation` argument
     *  will be used.
     *
     *  @returns {Object} - Returns a new object with the notated property.
     *
     *  @example
     *  const obj = { car: { brand: "Ford", model: "Mustang" } };
     *  const extracted = Notation.create(obj).extract("car.brand", "carBrand");
     *  console.log(extracted);
     *  // { carBrand: "Ford" }
     *  // obj is not modified
     */
    extract(notation, newNotation) {
        let o = {};
        this.copyTo(o, notation, newNotation);
        // remove all empty array fields
        o = utils.removeEmptyArraySpots(o);
        return o;
    }
    /**
     *  Alias for `#extract`
     *  @private
     */
    copyToNew(notation, newNotation) {
        return this.extract(notation, newNotation);
    }

    /**
     *  Extrudes the property at the given notation to a new object by moving
     *  it from the source object. This is equivalent to `.moveTo({}, notation, newNotation)`.
     *  @alias Notation#moveToNew
     *
     *  @param {String} notation - The notation to get the corresponding
     *  property (value) from the source object.
     *  @param {String} newNotation - The new notation to be set on the new
     *  object for the targeted property value. If not set, `notation` argument
     *  will be used.
     *
     *  @returns {Object} - Returns a new object with the notated property.
     *
     *  @example
     *  const obj = { car: { brand: "Ford", model: "Mustang" } };
     *  const extruded = Notation.create(obj).extrude("car.brand", "carBrand");
     *  console.log(obj);
     *  // { car: { model: "Mustang" } }
     *  console.log(extruded);
     *  // { carBrand: "Ford" }
     */
    extrude(notation, newNotation) {
        let o = {};
        this.moveTo(o, notation, newNotation);
        o = utils.removeEmptyArraySpots(o);
        return o;
    }
    /**
     *  Alias for `#extrude`
     *  @private
     */
    moveToNew(notation, newNotation) {
        return this.extrude(notation, newNotation);
    }

    // --------------------------------
    // Notation Static Methods
    // --------------------------------

    /**
     *  Basically constructs a new `Notation` instance with the given object.
     *  @chainable
     *
     *  @param {Object} [object={}] - The object to be notated.
     *
     *  @returns {Notation} - The created instance.
     *
     *  @example
     *  const notation = Notation.create(obj);
     *  // equivalent to:
     *  const notation = new Notation(obj);
     */
    static create(object = {}) {
        return new Notation(object);
    }

    /**
     *  Checks whether the given notation string is valid. Note that the star
     *  (`*`) (which is a valid character, even if irregular) is NOT treated as
     *  wildcard here. This checks for normal dot-notation, not a glob-notation.
     *  For glob notation validation, use `Notation.Glob.isValid()` method. Same
     *  goes for the negation character/prefix (`!`).
     *
     *  Note that, even though `obj['some.name']` is possible in JS, dot (`.`) is
     *  always treated as a level (property) separator in Notation strings.
     *
     *  @param {String} notation - The notation string to be checked.
     *
     *  @returns {Boolean}
     *
     *  @example
     *  Notation.isValid('prop1.prop2.prop3'); // true
     *  Notation.isValid('prop1'); // true
     *  Notation.isValid('prop.*'); // true (but star is not treated as wildcard)
     *  Notation.isValid('@1'); // true (bec. obj['@1'] is possible in JS.)
     *  Notation.isValid(null); // false
     */

    static isValid(notation) {
        return (typeof notation === 'string') &&
            // https://regex101.com/r/fSUY00/2
            (/^[^\s.!\[\]]+((\.[^\s.!\[\]]+)|(\[(\d+|(['"`]){1}\*?\5{1})\]))*$/).test(notation);
    }

    /**
     *  Counts the number of notes/levels in the given notation.
     *  @alias Notation.countLevels
     *
     *  @param {*} notation - The notation string to be processed.
     *
     *  @returns {Number}
     */
    static countNotes(notation) {
        if (!Notation.isValid(notation)) {
            throw new NotationError(ERR.NOTATION + '`' + notation + '`');
        }
        return utils.splitNotation(notation).length;
    }
    /**
     *  Alias of `Notation.countNotes`.
     *  @private
     */
    static countLevels(notation) {
        return Notation.countNotes(notation);
    }

    /**
     *  Gets the first (root) note of the notation string.
     *
     *  @param {String} notation - The notation string to be processed.
     *
     *  @returns {String}
     *
     *  @example
     *  Notation.first('first.prop2.last'); // "first"
     */
    static first(notation) {
        if (!Notation.isValid(notation)) {
            throw new NotationError(ERR.NOTATION + '`' + notation + '`');
        }
        // return notation.replace(/.*\.([^\.]*$)/, '$1');
        return utils.splitNotation(notation)[0];
    }

    /**
     *  Gets the last note of the notation string.
     *
     *  @param {String} notation - The notation string to be processed.
     *
     *  @returns {String}
     *
     *  @example
     *  Notation.last('first.prop2.last'); // "last"
     */
    static last(notation) {
        if (!Notation.isValid(notation)) {
            throw new NotationError(ERR.NOTATION + '`' + notation + '`');
        }
        // return notation.replace(/.*\.([^\.]*$)/, '$1');
        return utils.splitNotation(notation).pop();
    }

    /**
     *  Gets the parent notation (up to but excluding the last note)
     *  from the notation string.
     *
     *  @param {String} notation - The notation string to be processed.
     *
     *  @returns {String}
     *
     *  @example
     *  Notation.parent('first.prop2.last'); // "first.prop2"
     *  Notation.parent('single'); // null
     */
    static parent(notation) {
        if (!Notation.isValid(notation)) {
            throw new NotationError(ERR.NOTATION + '`' + notation + '`');
        }
        const notes = utils.splitNotation(notation);
        return notes.length > 1
            ? utils.concatNotes(notes.slice(0, -1))
            : null;
    }

    /**
     *  Iterates through each note/level of the given notation string.
     *  @alias Notation.eachLevel
     *
     *  @param {String} notation - The notation string to be iterated through.
     *  @param {Function} callback - The callback function to be invoked on
     *  each iteration. To break out of the loop, return `false` from within the
     *  callback.
     *  Callback signature: `callback(levelNotation, note, index, list) { ... }`
     *
     *  @returns {void}
     *
     *  @example
     *  const notation = 'first.prop2.last';
     *  Notation.eachNote(notation, function (levelNotation, note, index, list) {
     *      console.log(index, note, levelNotation);
     *  });
     *  // 0  "first"             "first"
     *  // 1  "first.prop2"       "prop2"
     *  // 2  "first.prop2.last"  "last"
     */
    static eachNote(notation, callback) {
        if (!Notation.isValid(notation)) {
            throw new NotationError(ERR.NOTATION + '`' + notation + '`');
        }
        let notes = utils.splitNotation(notation),
            levelNotes = [],
            levelNotation;
        utils.each(notes, (note, index, list) => {
            levelNotes.push(note);
            levelNotation = utils.concatNotes(levelNotes);
            const isArray = !!(notes[index + 1] && utils.isArrIndex(notes[index + 1]));
            if (callback(levelNotation, note, index, notes, isArray) === false) return false;
        }, Notation);
    }
    /**
     *  Alias of `Notation.eachNote`.
     *  @private
     */
    static eachLevel(notation, callback) {
        Notation.eachNote(notation, callback);
    }

}

/**
 *  Error class specific to `Notation`.
 *  @private
 *
 *  @class
 *  @see `{@link #Notation.Error}`
 */
Notation.Error = NotationError;

/**
 *  Utility for validating, comparing and sorting dot-notation globs.
 *  This is internally used by `Notation` class.
 *  @private
 *
 *  @class
 *  @see `{@link #Notation.Glob}`
 */
Notation.Glob = NotationGlob;

// --------------------------------
// EXPORT
// --------------------------------

export default Notation;
