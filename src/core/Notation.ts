/* eslint-disable max-lines */

import type { Collection, UnknownObject } from '../types.js';
import { utils } from '../utils.js';
import type { INotationFilterOptions } from './INotationFilterOptions.js';
import type { INotationInspection } from './INotationInspection.js';
import { DEFAULT_NOTATION_OPTIONS, type INotationOptions } from './INotationOptions.js';
import { NotationError } from './NotationError.js';
import { NotationGlob } from './NotationGlob.js';

const ERR = {
  SOURCE: 'Invalid source. Expected a data object or array.',
  DEST: 'Invalid destination. Expected a data object or array.',
  NOTATION: 'Invalid notation: ',
  NOTA_OBJ: 'Invalid notations object. ',
  NO_INDEX: 'Implied index does not exist: ',
  NO_PROP: 'Implied property does not exist: '
};

// created test @ https://regex101.com/r/vLE16M/2
const reMATCHER = /(\[(\d+|".*"|'.*'|`.*`)\]|[a-z$_][a-z$_\d]*)/gi;
// created test @ https://regex101.com/r/fL3PJt/1/
// /^([a-z$_][a-z$_\d]*|\[(\d+|".*"|'.*'|`.*`)\])(\[(\d+|".*"|'.*'|`.*`)\]|(\.[a-z$_][a-z$_\d]*))*$/i
const reVALIDATOR = new RegExp(
  '^(' +
    '[a-z$_][a-z$_\\d]*' + // JS variable syntax
    '|' + // OR
    '\\[(\\d+|".*"|\'.*\')\\]' + // array index or object bracket notation
    ')' + // exactly once
    '(' +
    '\\[(\\d+|".*"|\'.*\')\\]' + // followed by same
    '|' + // OR
    '\\.[a-z$_][a-z$_\\d]*' + // dot, then JS variable syntax
    ')*' + // (both) may repeat any number of times
    '$',
  'i'
);

export type NotationEachCallback = (
  notation: string,
  key: string,
  value: unknown,
  source: UnknownObject | unknown[]
) => void | false;

export type NotationEachNoteCallback = (
  levelNotation: string,
  note: string,
  index: number,
  noteList: string[]
) => void | false;

export type NotationEachValueCallback = (
  levelValue: unknown,
  levelNotation: string,
  note: string,
  index: number,
  noteList: string[]
) => void | false;

type NotationSource<T> = T extends unknown[] ? unknown[] : UnknownObject;

/**
 * Notation.js for Node and Browser.
 *
 * Like in most programming languages, JavaScript makes use of dot-notation to
 * access the value of a member of an object (or class). `Notation` class
 * provides various methods for modifying / processing the contents of the
 * given object; by parsing object notation strings or globs.
 *
 * Note that this class will only deal with enumerable properties of the source
 * object; so it should be used to manipulate data objects. It will not deal
 * with preserving the prototype-chain of the given object.
 */
export class Notation<
  T extends Collection = UnknownObject,
  S extends NotationSource<T> = NotationSource<T>
> {
  private _source: S;
  private _isArray: boolean;
  private _options: INotationOptions = { ...DEFAULT_NOTATION_OPTIONS };

  /**
   * Initializes a new instance of `Notation`.
   *
   * @param [source={}] - The source object (or array) to be
   * notated. Can either be an array or object. If omitted, defaults to an
   * empty object.
   * @param [options] - Notation options.
   *
   * @example
   * const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
   * const notation = new Notation(obj);
   * notation.get('car.model')   // » "Charger"
   * notation.remove('car.model').set('car.color', 'red').value
   * // » { car: { brand: "Dodge", year: 1970, color: "red" } }
   */
  constructor(source?: T, options?: INotationOptions) {
    if (arguments.length === 0) {
      this._source = {} as S;
    } else if (utils.isCollection(source)) {
      this._source = source as S;
    } else {
      throw new NotationError(ERR.SOURCE);
    }

    this._isArray = Array.isArray(this._source);
    this.options = options;
  }

  // --------------------------------
  // INSTANCE PROPERTIES
  // --------------------------------

  /**
   * Gets or sets notation options.
   */
  get options(): INotationOptions {
    return this._options;
  }
  set options(value: INotationOptions | undefined) {
    this._options = {
      ...DEFAULT_NOTATION_OPTIONS,
      ...this._options,
      ...value
    };
  }

  /**
   * Gets the value of the source object.
   *
   * @example
   * const person = { name: "Onur" };
   * const me = Notation.create(person)
   *     .set("age", 36)
   *     .set("car.brand", "Ford")
   *     .set("car.model", "Mustang")
   *     .value;
   * console.log(me); // { name: "Onur", age: 36, car: { brand: "Ford", model: "Mustang" } }
   * console.log(person === me); // true
   */
  get value(): S {
    return this._source;
  }

  // --------------------------------
  // INSTANCE METHODS
  // --------------------------------

  /**
   * Recursively iterates through each key of the source object and invokes
   * the given callback function with parameters, on each non-object value.
   *
   * @param callback - The callback function to be invoked on each on each
   * non-object value. To break out of the loop, return `false` from within
   * the callback. Callback signature: `callback(notation, key, value,
   * object) { ... }`
   *
   * @returns {Notation} - The current `Notation` instance (self).
   *
   * @example
   * const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
   * Notation.create(obj).each(function (notation, key, value, object) {
   *     console.log(notation, value);
   * });
   * // "car.brand"  "Dodge"
   * // "car.model"  "Charger"
   * // "car.year"  1970
   */
  each(callback: NotationEachCallback): this {
    _each(this._source, callback);
    return this;
  }

  /**
   * Iterates through each note of the given notation string by evaluating it
   * on the source object.
   *
   * @param notation - The notation string to be iterated through.
   * @param callback - The callback function to be invoked on each iteration.
   * To break out of the loop, return `false` from within the callback.
   * Signature: `callback(levelValue, note, index, list)`
   *
   * @returns - The current `Notation` instance (self).
   *
   * @example
   * const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
   * Notation.create(obj)
   *     .eachValue("car.brand", function (levelValue, note, index, list) {
   *         console.log(note, levelValue); // "car.brand" "Dodge"
   *     });
   */
  eachValue(notation: string, callback: NotationEachValueCallback): this {
    let level = this._source;
    Notation.eachNote(notation, (levelNotation, note, index, list): void | false => {
      const nNote = utils.normalizeNote(note);
      level = utils.hasOwn(level, nNote) ? level[nNote] : undefined;
      if (callback(level, levelNotation, note, index, list) === false) return false;
    });
    return this;
  }

  /**
   * Gets the list of notations from the source object (keys).
   *
   * @returns - An array of notation strings.
   *
   * @example
   * const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
   * const notations = Notation.create(obj).getNotations();
   * console.log(notations); // [ "car.brand", "car.model", "car.year" ]
   */
  getNotations(): string[] {
    const list: string[] = [];
    this.each((notation) => {
      list.push(notation);
    });
    return list;
  }

  /**
   * Deeply clones the source object. This is also useful if you want to
   * prevent mutating the original source object.
   *
   * <blockquote>
   * Note that `Notation` expects a data object (or array) with enumerable
   * properties. In addition to plain objects and arrays; supported cloneable
   * property/value types are primitives (such as `String`, `Number`,
   * `Boolean`, `Symbol`, `null` and `undefined`) and built-in types (such as
   * `Date` and `RegExp`).
   *
   * Enumerable properties with types other than these (such as methods,
   * special objects, custom class instances, etc) will be copied by reference.
   * Non-enumerable properties will not be cloned.
   *
   * If you still need full clone support, you can use a library like lodash.
   * e.g. `Notation.create(_.cloneDeep(source))`
   * </blockquote>
   *
   * @returns - The current `Notation` instance (self).
   *
   * @example
   * const mutated = Notation.create(source1).set('newProp', true).value;
   * console.log(source1.newProp); // ——» true
   *
   * const cloned = Notation.create(source2).clone().set('newProp', true).value;
   * console.log('newProp' in source2); // ——» false
   * console.log(cloned.newProp); // ——» true
   */
  clone(): this {
    this._source = utils.cloneDeep(this._source);
    return this;
  }

  /**
   * Flattens the source object to a single-level object with notated keys.
   *
   * @returns - The current `Notation` instance (self).
   *
   * @example
   * const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
   * console.log(Notation.create(obj).flatten().value);
   * // {
   * //     "car.brand": "Dodge",
   * //     "car.model": "Charger",
   * //     "car.year": 1970
   * // }
   */
  flatten(): this {
    const o: UnknownObject = {};
    this.each((notation, key, value) => {
      o[notation] = value;
    });
    this._source = o;
    return this;
  }

  /**
   * Aggregates notated keys of a (single-level) object, and nests them under
   * their corresponding properties. This is the opposite of `Notation#flatten`
   * method. This might be useful when expanding a flat object fetched from
   * a database.
   *
   * @returns - The current `Notation` instance (self).
   *
   * @example
   * const obj = { "car.brand": "Dodge", "car.model": "Charger", "car.year": 1970 }
   * const expanded = Notation.create(obj).expand().value;
   * console.log(expanded); // { car: { brand: "Dodge", model: "Charger", year: 1970 } };
   */
  expand(): this {
    this._source = Notation.create({}).merge(this._source).value;
    return this;
  }

  /**
   * Inspects the given notation on the source object by checking
   * if the source object actually has the notated property;
   * and getting its value if exists.
   *
   * @param notation - The notation string to be inspected.
   *
   * @returns - The inspection result object.
   *
   * @example
   * Notation.create({ car: { year: 1970 } }).inspectGet("car.year");
   * // { has: true, value: 1970, lastNote: 'year', lastNoteNormalized: 'year' }
   * Notation.create({ car: { year: 1970 } }).inspectGet("car.color");
   * // { has: false }
   * Notation.create({ car: { color: undefined } }).inspectGet("car.color");
   * // { has: true, value: undefined, lastNote: 'color', lastNoteNormalized: 'color' }
   * Notation.create({ car: { brands: ['Ford', 'Dodge'] } }).inspectGet("car.brands[1]");
   * // { has: true, value: 'Dodge', lastNote: '[1]', lastNoteNormalized: 1 }
   */
  inspectGet(notation: string): INotationInspection {
    let levelValue = this._source;
    let result: INotationInspection = {
      notation,
      has: false,
      value: undefined,
      type: 'undefined',
      level: -1, // just to comply with type
      lastNote: '',
      lastNoteNormalized: '',
      parentIsArray: false
    };
    let parent: UnknownObject | unknown[] | undefined;

    Notation.eachNote(notation, (levelNotation, note, index): void | false => {
      const lastNoteNormalized = utils.normalizeNote(note);

      if (utils.hasOwn(levelValue, lastNoteNormalized)) {
        const value = levelValue[lastNoteNormalized];
        // e.g. for note"[1]" of notation "b.c[1]", parent is an array (b.c)
        // parent = Array.isArray(levelValue) ? levelValue : value;
        parent = value;
        levelValue = value;
        result = {
          ...result,
          has: true,
          value,
          type: utils.type(value),
          level: index + 1,
          lastNote: note,
          lastNoteNormalized
        };
      } else {
        result = {
          ...result,
          has: false,
          value: undefined,
          type: 'undefined',
          level: index + 1,
          lastNote: note,
          lastNoteNormalized
        };
        return false; // break out
      }
    });

    if (parent === undefined || (result.has && parent === result.value)) {
      parent = this._source;
    }
    result.parentIsArray = utils.type(parent) === 'array';

    return result;
  }

  /**
   * Inspects and removes the given notation from the source object by
   * checking if the source object actually has the notated property; and
   * getting its value if exists, before removing the property.
   *
   * @param {string} notation - The notation string to be inspected.
   *
   * @returns - The inspection result object.
   *
   * @example
   * const obj = { name: "John", car: { year: 1970 } };
   * let result = Notation.create(obj).inspectRemove("car.year");
   * // result » { notation: "car.year", has: true, value: 1970, lastNote: "year", lastNoteNormalized: "year" }
   * // obj » { name: "John", car: {} }
   *
   * result = Notation.create({ car: { year: 1970 } }).inspectRemove("car.color");
   * // result » { notation: "car.color", has: false }
   * Notation.create({ car: { color: undefined } }).inspectRemove("car['color']");
   * // { notation: "car.color", has: true, value: undefined, lastNote: "['color']", lastNoteNormalized: "color" }
   *
   * const obj = { car: { colors: ["black", "white"] } };
   * const result = Notation.create().inspectRemove("car.colors[0]");
   * // result » { notation: "car.colors[0]", has: true, value: "black", lastNote: "[0]", lastNoteNormalized: 0 }
   * // obj » { car: { colors: [(empty), "white"] } }
   */
  inspectRemove(notation: string): INotationInspection {
    if (!notation) throw new Error(ERR.NOTATION + `'${notation}'`);

    const parentNotation = Notation.parent(notation);
    const parent = parentNotation ? (this.get(parentNotation, null) as Collection) : this._source;
    const parentIsArray = utils.type(parent) === 'array';
    const notes = Notation.split(notation);
    const lastNote = notes[notes.length - 1];
    const lastNoteNormalized = utils.normalizeNote(lastNote);

    let result: INotationInspection;
    let value: unknown;

    if (utils.hasOwn(parent, lastNoteNormalized)) {
      value = parent[lastNoteNormalized];
      result = {
        notation,
        has: true,
        value,
        type: utils.type(value),
        level: notes.length,
        lastNote,
        lastNoteNormalized,
        parentIsArray
      };

      // if `preserveIndices` is enabled and this is an array, we'll
      // splice the item out. otherwise, we'll use `delete` syntax to
      // empty the item.
      if (!this.options.preserveIndices && parentIsArray) {
        parent.splice(lastNoteNormalized, 1);
      } else {
        delete parent[lastNoteNormalized];
      }
    } else {
      result = {
        notation,
        has: false,
        value: undefined,
        type: 'undefined',
        level: notes.length,
        lastNote,
        lastNoteNormalized,
        parentIsArray
      };
    }

    return result;
  }

  /**
   * Checks whether the source object has the given notation as a (leveled)
   * enumerable property. If the property exists but has a value of
   * `undefined`, this will still return `true`.
   *
   * @param notation - The notation string to be checked.
   *
   * @example
   * Notation.create({ car: { year: 1970 } }).has("car.year"); // true
   * Notation.create({ car: { year: undefined } }).has("car.year"); // true
   * Notation.create({}).has("car.color"); // false
   */
  has(notation: string): boolean {
    return this.inspectGet(notation).has;
  }

  /**
   * Checks whether the source object has the given notation as a (leveled)
   * defined enumerable property. If the property exists but has a value of
   * `undefined`, this will return `false`.
   *
   * @param notation - The notation string to be checked.
   *
   * @example
   * Notation.create({ car: { year: 1970 } }).hasDefined("car.year"); // true
   * Notation.create({ car: { year: undefined } }).hasDefined("car.year"); // false
   * Notation.create({}).hasDefined("car.color"); // false
   */
  hasDefined(notation: string): boolean {
    return this.inspectGet(notation).value !== undefined;
  }

  /**
   * Gets the value of the corresponding property at the given notation.
   *
   * @param notation - The notation string to be processed.
   * @param [defaultValue] - The default value to be returned if the property
   * is not found or enumerable.
   *
   * @returns - The value of the notated property.
   *
   * @throws {NotationError} - If `strict` option is enabled, `defaultValue`
   * is not set and notation does not exist.
   *
   * @example
   * Notation.create({ car: { brand: "Dodge" } }).get("car.brand"); // "Dodge"
   * Notation.create({ car: {} }).get("car.model", "Challenger"); // "Challenger"
   * Notation.create({ car: { model: undefined } }).get("car.model", "Challenger"); // undefined
   *
   * @example <caption>get value when strict option is enabled</caption> //
   * strict option defaults to false Notation.create({ car: {}
   * }).get("car.model"); // undefined Notation.create({ car: {} }, { strict:
   * false }).get("car.model"); // undefined // below will throw bec. strict
   * = true, car.model does not exist // and no default value is given.
   * Notation.create({ car: {} }, { strict: true }).get("car.model");
   */
  get(notation: string, defaultValue?: unknown): unknown {
    const result = this.inspectGet(notation);

    // if strict and no default value is set, check if implied index or prop
    // exists
    if (this.options.strict && arguments.length < 2 && !result.has) {
      const msg = result.parentIsArray ? ERR.NO_INDEX : ERR.NO_PROP;
      throw new NotationError(msg + `'${notation}'`);
    }

    return result.has ? result.value : defaultValue;
  }

  /**
   * Sets the value of the corresponding property at the given notation. If
   * the property does not exist, it will be created and nested at the
   * calculated level. If it exists; its value will be overwritten by
   * default.
   *
   * @param notation - The notation string to be processed.
   * @param value - The value to be set for the notated property.
   * @param [mode="overwrite"] - Write mode. By default, this is set to
   * `"overwrite"` which sets the value by overwriting the target object
   * property or array item at index. To insert an array item (by shifting
   * the index, instead of overwriting); set to `"insert"`. To prevent
   * overwriting the value if exists, explicitly set to `false`.
   *
   * @returns - The current `Notation` instance (self).
   *
   * @throws {NotationError} - If strict notation is enabled, `overwrite`
   * option is set to `false` and attempted to overwrite an existing value.
   *
   * @example
   * const obj = { car: { brand: "Dodge", year: 1970 } };
   * Notation.create(obj)
   *     .set("car.brand", "Ford")
   *     .set("car.model", "Mustang")
   *     .set("car.year", 1965, false)
   *     .set("car.color", "red")
   *     .set("boat", "none");
   * console.log(obj);
   * // { notebook: "Mac", car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" }, boat: "none" };
   */
  set(
    notation: string,
    value: unknown,
    mode: 'overwrite' | 'insert' | boolean = 'overwrite'
  ): this {
    if (!notation.trim()) {
      throw new NotationError(ERR.NOTATION + `'${notation}'`);
    }

    if (mode === true) mode = 'overwrite';
    let level = this._source;

    let currentIsLast: boolean;
    let nCurrentNote: string | number;
    let nNextNote: string | number | null;
    let nextIsArrayNote: boolean;
    let type: string;
    const insertErrMsg = 'Cannot set value by inserting at index, on an object';

    Notation.eachNote(notation, (levelNotation, note, index, list) => {
      currentIsLast = index === list.length - 1;
      nCurrentNote = nNextNote || utils.normalizeNote(note);
      nNextNote = currentIsLast ? null : utils.normalizeNote(list[index + 1]);

      const parentNotation = Notation.parent(levelNotation);
      // this is necessary when for example we set 'arr[1].x' of a sparse array
      // [empty, empty, { x: 1 }]. it will complain that arr[1] is undefined and
      // cannot set x. so we need to set the parent level to an empty object or
      // array (depending on the current note).
      if (!utils.isCollection(level) && parentNotation) {
        level = (typeof nCurrentNote === 'number' ? [] : {}) as S;
        this.set(parentNotation, level, 'overwrite');
      }

      type = utils.type(level);
      if (type === 'array' && typeof nCurrentNote !== 'number') {
        throw new NotationError(
          `Cannot set string key '${note}' on array ${parentNotation || 'source'}`
        );
      }

      // check if the property is at this level
      if (utils.hasOwn(level, nCurrentNote, type)) {
        // check if we're at the last level
        if (currentIsLast) {
          // if mode is "overwrite", assign the value.
          if (mode === 'overwrite') {
            level[nCurrentNote] = value;
          } else if (mode === 'insert') {
            if (type === 'array') {
              level.splice(nCurrentNote, 0, value);
            } else {
              throw new NotationError(insertErrMsg);
            }
          }
          // otherwise, will not overwrite
        } else {
          // if not last level; just re-reference the current level.
          level = level[nCurrentNote];
        }
      } else {
        if (currentIsLast && type !== 'array' && mode === 'insert') {
          throw new NotationError(insertErrMsg);
        }

        // if next normalized note is a number, it indicates that the
        // current note is actually an array.
        nextIsArrayNote = typeof nNextNote === 'number';

        // we don't have this property at this level so; if this is the
        // last level, we set the value if not, we set an empty
        // collection for the next level
        level[nCurrentNote] = currentIsLast ? value : nextIsArrayNote ? [] : {};
        level = level[nCurrentNote];
      }
    });

    return this;
  }

  /**
   * Just like the `.set()` method but instead of a single notation string,
   * an object of notations and values can be passed. Sets the value of each
   * corresponding property at the given notation. If a property does not
   * exist, it will be created and nested at the calculated level. If it
   * exists; its value will be overwritten by default.
   *
   * @param notationsObject - The notations object to be processed. This can
   * either be a regular object with non-dotted keys (which will be merged to
   * the first/root level of the source object); or a flattened object with
   * notated (dotted) keys.
   * @param [overwrite=true] - Whether to overwrite a property if exists. If
   * set to `false`, the value will be inserted if applicable.
   *
   * @returns - The current `Notation` instance (self).
   *
   * @example
   * const obj = { car: { brand: "Dodge", year: 1970 } };
   * Notation.create(obj).merge({
   *     "car.brand": "Ford",
   *     "car.model": "Mustang",
   *     "car.year": 1965,
   *     "car.color": "red",
   *     "boat": "none"
   * });
   * console.log(obj);
   * // { car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" }, boat: "none" };
   */
  merge(
    notationsObject: S extends UnknownObject ? Collection : unknown[],
    overwrite: boolean = true
  ): this {
    const type = utils.type(notationsObject);
    if (this._isArray && type !== 'array') {
      throw new NotationError(ERR.NOTA_OBJ + 'Expected an array.');
    }

    if (!this._isArray && type !== 'object') {
      throw new NotationError(ERR.NOTA_OBJ + 'Expected an object.');
    }

    let value;
    utils.each(Object.keys(notationsObject), (notation) => {
      value = notationsObject[notation];
      this.set(notation, value, overwrite);
    });

    return this;
  }

  /**
   * Removes the properties by the given list of notations from the source
   * object, and returns the removed. Opposite of `merge()` method.
   *
   * @param notations - The notations array to be processed.
   *
   * @returns - An object with removed properties.
   *
   * @example
   * const obj = { car: { brand: "Dodge", year: 1970 }, notebook: "Mac" };
   * const separated = Notation.create(obj).separate(["car.brand", "boat" ]);
   * console.log(separated);
   * // { notebook: "Mac", car: { brand: "Ford" } };
   * console.log(obj);
   * // { car: { year: 1970 } };
   */
  separate(notations: string[]): UnknownObject {
    // TODO: Should be S (Collection)
    if (utils.type(notations) !== 'array') {
      throw new NotationError(ERR.NOTA_OBJ + 'Expected an array.');
    }

    const o = new Notation({});
    utils.each(notations, (notation) => {
      const result = this.inspectRemove(notation);
      o.set(notation, result.value, 'overwrite');
    });

    return o.value;
  }

  /**
   * Deep clones the source object while filtering its properties by the
   * given <b>glob</b> notations. Includes all matched properties and removes
   * the rest.
   *
   * The difference between regular notations and glob-notations is that;
   * with the latter, you can use wildcard stars (*) and negate the notation
   * by prepending a bang (!). A negated notation will be excluded.
   *
   * Order of the globs does not matter; they will be logically sorted. Loose
   * globs will be processed first and verbose globs or normal notations will
   * be processed last. e.g. `[ "car.model", "*", "!car.*" ]` will be
   * normalized and sorted as `[ "*", "!car" ]`.
   *
   * Passing no parameters or passing a glob of `"!*"` or `["!*"]` will empty
   * the source object. See `NotationGlob` class for more information.
   *
   * @param globList - Glob notation list to be processed.
   * @param [options] - Filter options.
   *
   * @returns - The current `Notation` instance (self). To get the filtered
   * value, call `.value` property on the instance.
   *
   * @example
   * const car = { brand: "Ford", model: { name: "Mustang", year: 1970 } };
   * const n = Notation.create(car);
   *
   * console.log(n.filter([ "*", "!model.year" ]).value);  // { brand: "Ford", model: { name: "Mustang" } }
   * console.log(n.filter("model.name").value);            // { model: { name: "Mustang" } }
   * console.log(car);                                     // { brand: "Ford", model: { name: "Mustang", year: 1970 } }
   * console.log(n.filter().value);                        // {} // —» equivalent to n.filter("") or n.filter("!*")
   */
  filter(globList: string | string[], options: INotationFilterOptions = {}): this {
    const { re } = utils;

    // ensure array, normalize and sort the globs in logical order. this
    // also concats the array first (to prevent mutating the original
    // array).
    const globs = NotationGlob.normalize(globList, Boolean(options?.restrictive));
    const len = globs.length;
    const empty = (this._isArray ? [] : {}) as S;

    // if globs is "" or [""] or ["!*"] or ["![*]"] set source to empty and return.
    if (len === 0 || (len === 1 && (!globs[0] || re.NEGATE_ALL.test(globs[0])))) {
      this._source = empty;
      return this;
    }

    const cloned = utils.cloneDeep(this.value);

    const firstIsWildcard = re.WILDCARD.test(globs[0]);
    // if globs only consist of "*" or "[*]"; set the "clone" as source and
    // return.
    if (len === 1 && firstIsWildcard) {
      this._source = cloned;
      return this;
    }

    let filtered: Notation;
    // if the first item of sorted globs is "*" or "[*]" we set the source
    // to the (full) "copy" and remove the wildcard from globs (not to
    // re-process).
    if (firstIsWildcard) {
      filtered = new Notation(cloned);
      globs.shift();
    } else {
      // otherwise we set an empty object or array source so that
      // we can add notations/properties to it.
      filtered = new Notation(empty);
    }
    // console.info('filtered:', filtered.value);

    // iterate through globs
    utils.each(globs, (globNotation: string): void | false => {
      const g = new NotationGlob(globNotation);
      const { glob, absGlob, isNegated, notes } = g;

      let normalized: string;
      let emptyValue: Collection | null = null;
      let eType: string;

      // check whether the glob ends with `.*` or `[*]` then remove
      // trailing glob note and decide for empty value (if negated). for
      // non-negated, trailing wildcards are already removed by
      // normalization.
      if (absGlob.slice(-2) === '.*') {
        normalized = absGlob.slice(0, -2);
        /* istanbul ignore else -- non-negated trailing wildcards are normalized away before here. */
        if (isNegated) emptyValue = {};
        eType = 'object';
      } else if (absGlob.slice(-3) === '[*]') {
        normalized = absGlob.slice(0, -3);
        /* istanbul ignore else -- non-negated trailing wildcards are normalized away before here. */
        if (isNegated) emptyValue = [];
        eType = 'array';
      } else {
        normalized = absGlob;
      }

      // we'll check glob vs value integrity if emptyValue is set; and throw if needed.
      // eslint-disable-next-line max-len, @typescript-eslint/no-non-null-assertion
      const errGlobIntegrity = `Integrity failed for glob '${glob}'. Cannot set empty ${eType!} for '${normalized}' which has a type of `; // ...

      // check if remaining normalized glob has no wildcard stars e.g.
      // "a.b" or "!a.b.c" etc..
      if (re.WILDCARDS.test(normalized) === false) {
        if (isNegated) {
          // inspect and directly remove the notation if negated.
          // we need the inspection for the detailed error below.
          const insRemove = filtered.inspectRemove(normalized);
          // console.log('insRemove', insRemove);

          // if original glob had `.*` at the end, it means remove
          // contents (not itself). so we'll set an empty object.
          // meaning `some.prop` (prop) is removed completely but
          // `some.prop.*` (prop) results in `{}`. For array notation
          // (`[*]`), we'll set an empty array.
          if (emptyValue) {
            // e.g. for glob `![0].x.*` we expect to set `[0].x = {}`
            // but if `.x` is not an object (or array), we should fail.
            const vType = insRemove.type;
            const errMsg = errGlobIntegrity + `'${vType}'.`;
            // in non-strict mode, only exceptions are `null` and
            // `undefined`, for which we won't throw but we'll not
            // set an empty obj/arr either.

            const isValSet = utils.isset(insRemove.value);
            // on critical type mismatch we throw
            // or if original value is undefined or null in strict mode we throw
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if ((isValSet && vType !== eType!) || (!isValSet && this.options.strict)) {
              throw new NotationError(errMsg);
            }
            // if parent is an array, we'll insert the value at
            // index bec. we've removed the item and indexes are
            // shifted. Otherwise, we'll simply overwrite the
            // object property value.
            const setMode = insRemove.parentIsArray ? 'insert' : 'overwrite';
            filtered.set(normalized, emptyValue, setMode);
          }
        } else {
          // directly set the same notation from the original
          const insGet = this.inspectGet(normalized); // Notation.create(original).inspectGet ...
          if (insGet.has) {
            filtered.set(normalized, insGet.value, 'overwrite');
          }
        }

        // move to the next
        return;
      }

      // if glob has wildcard(s), we'll iterate through keys of the source
      // object and see if (full) notation of each key matches the current
      // glob.

      // important! we will iterate with eachRight to prevent shifted
      // indexes when removing items from arrays.
      const reverseIterateIfArray = true;

      _each(
        this._source,
        (originalNotation, _key, value): void | false => {
          // console.info('» _each originalNotation:', originalNotation, '» key:', _key, '» value:', value);
          const originalIsCovered = NotationGlob.create(normalized).covers(originalNotation);
          // console.log('» normalized:', normalized, 'covers', originalNotation, '»', originalIsCovered);
          if (!originalIsCovered) return; // break

          if (this.options.strict && emptyValue) {
            // since original is covered and we have emptyValue set (due
            // to trailing wildcard), here we'll check value vs glob
            // integrity; (only if we're in strict mode).

            const vType = utils.type(value);
            // types and number of levels are the same?
            if (
              vType !== eType &&
              // we subtract 1 from number of levels bec. the last
              // note is removed since we have emptyValue set.
              Notation.split(originalNotation).length === notes.length - 1
            ) {
              throw new NotationError(errGlobIntegrity + `'${vType}'.`);
            }
          }

          // iterating each note of original notation. i.e.:
          // note1.note2.note3 is iterated from left to right, as:
          // 'note1', 'note1.note2', 'note1.note2.note3' — in order.
          Notation.eachNote(originalNotation, (levelNotation, _note, _index): void | false => {
            if (g.test(levelNotation)) {
              const levelLen = Notation.split(levelNotation).length;
              if (isNegated && notes.length <= levelLen) {
                // console.log('  » removing', levelNotation, 'of', originalNotation);
                filtered.remove(levelNotation);
                // we break and return early if removed bec. e.g. when
                // 'note1.note2' (parent) of 'note1.note2.note3' is also removed,
                // we no more have 'note3'.
                return false;
              }
            }
            if (levelNotation === originalNotation) {
              // console.info('---> setting (c)', levelNotation, value, '\n     filtered:', JSON.stringify(filtered.value));
              filtered.set(levelNotation, value, 'overwrite');
            }
          });
        },
        reverseIterateIfArray
      );
    });

    // finally set the filtered source value of our instance and
    // return.
    this._source = filtered.value;

    return this;
  }

  /**
   * Removes the property from the source object, at the given notation.
   *
   * @param notation - The notation to be inspected.
   *
   * @returns - The current `Notation` instance (self).
   *
   * @throws {NotationError} - If `strict` option is enabled and notation
   * does not exist.
   *
   * @example
   * const obj = { notebook: "Mac", car: { model: "Mustang" } };
   * Notation.create(obj).remove("car.model");
   * console.log(obj); // { notebook: "Mac", car: { } }
   */
  remove(notation: string): this {
    const result = this.inspectRemove(notation);

    // if strict, check if implied index or prop exists
    if (this.options.strict && !result.has) {
      const msg = result.parentIsArray ? ERR.NO_INDEX : ERR.NO_PROP;
      throw new NotationError(msg + `'${notation}'`);
    }

    return this;
  }

  /**
   * Copies the notated property from the source collection and adds it to
   * the destination — only if the source object actually has that property.
   * This is different than a property with a value of `undefined`.
   *
   * @param destination - The destination object that the notated properties
   * will be copied to.
   * @param notation - The notation to get the corresponding property from
   * the source object.
   * @param [newNotation=null] - The notation to set the source property on
   * the destination object. In other words, the copied property will be
   * renamed to this value before set on the destination object. If not set,
   * `notation` argument will be used.
   * @param [overwrite=true] - Whether to overwrite the property on the
   * destination object if it exists.
   *
   * @returns - The current `Notation` instance (self).
   *
   * @throws {NotationError} - If `destination` is not a valid collection.
   * @throws {NotationError} - If `notation` or `newNotation` is invalid.
   *
   * @example
   * const obj = { car: { brand: "Ford", model: "Mustang" } };
   * const models = { dodge: "Charger" };
   * Notation.create(obj).copyTo(models, "car.model", "ford");
   * console.log(models);
   * // { dodge: "Charger", ford: "Mustang" }
   * // source object (obj) is not modified
   */
  copyTo(
    destination: Collection,
    notation: string,
    newNotation?: string | null,
    overwrite: boolean = true
  ): this {
    if (!utils.isCollection(destination)) {
      throw new NotationError(ERR.DEST);
    }

    const result = this.inspectGet(notation);
    if (result.has) {
      const newN = utils.getNewNotation(newNotation, notation);
      Notation.create(destination).set(newN, result.value, overwrite);
    }

    return this;
  }

  /**
   * Copies the notated property from the target collection and adds it to
   * (own) source object — only if the target object actually has that
   * property. This is different than a property with a value of `undefined`.
   *
   * @param target - The target collection that the notated properties will
   * be copied from.
   * @param notation - The notation to get the corresponding property from
   * the target object.
   * @param [newNotation=null] - The notation to set the copied property on
   * our source collection. In other words, the copied property will be
   * renamed to this value before set. If not set, `notation` argument will
   * be used.
   * @param [overwrite=true] - Whether to overwrite the property on our
   * collection if it exists.
   *
   * @returns - The current `Notation` instance (self).
   *
   * @throws {NotationError} - If `target` is not a valid collection.
   * @throws {NotationError} - If `notation` or `newNotation` is invalid.
   *
   * @example
   * const obj = { car: { brand: "Ford", model: "Mustang" } };
   * const models = { dodge: "Charger" };
   * Notation.create(obj).copyFrom(models, "dodge", "car.model", true);
   * console.log(obj);
   * // { car: { brand: "Ford", model: "Charger" } }
   * // models object is not modified
   */
  copyFrom(
    target: Collection,
    notation: string,
    newNotation?: string | null,
    overwrite: boolean = true
  ): this {
    if (!utils.isCollection(target)) {
      throw new NotationError(ERR.DEST);
    }

    const result = Notation.create(target).inspectGet(notation);
    if (result.has) {
      const newN = utils.getNewNotation(newNotation, notation);
      this.set(newN, result.value, overwrite);
    }

    return this;
  }

  /**
   * Removes the notated property from the source (own) collection and adds
   * it to the destination — only if the source collection actually has that
   * property. This is different than a property with a value of `undefined`.
   *
   * @param destination - The destination collection that the notated
   * properties will be moved to.
   * @param notation - The notation to get the corresponding property from
   * the source object.
   * @param [newNotation=null] - The notation to set the source property on
   * the destination object. In other words, the moved property will be
   * renamed to this value before set on the destination object. If not set,
   * `notation` argument will be used.
   * @param [overwrite=true] - Whether to overwrite the property on the
   * destination object if it exists.
   *
   * @returns - The current `Notation` instance (self).
   *
   * @throws {NotationError} - If `destination` is not a valid collection.
   * @throws {NotationError} - If `notation` or `newNotation` is invalid.
   *
   * @example
   * const obj = { car: { brand: "Ford", model: "Mustang" } };
   * const models = { dodge: "Charger" };
   * Notation.create(obj).moveTo(models, "car.model", "ford");
   * console.log(obj);
   * // { car: { brand: "Ford" } }
   * console.log(models);
   * // { dodge: "Charger", ford: "Mustang" }
   */
  moveTo(
    destination: Collection,
    notation: string,
    newNotation?: string | null,
    overwrite: boolean = true
  ): this {
    if (!utils.isCollection(destination)) {
      throw new NotationError(ERR.DEST);
    }

    const result = this.inspectRemove(notation);
    if (result.has) {
      const newN = utils.getNewNotation(newNotation, notation);
      Notation.create(destination).set(newN, result.value, overwrite);
    }

    return this;
  }

  /**
   * Removes the notated property from the target collection and adds it to
   * (own) source collection — only if the target object actually has that
   * property. This is different than a property with a value of `undefined`.
   *
   * @param target - The target collection that the notated properties will
   * be moved from.
   * @param notation - The notation to get the corresponding property from
   * the target object.
   * @param [newNotation=null] - The notation to set the target property on
   * the source object. In other words, the moved property will be renamed to
   * this value before set on the source object. If not set, `notation`
   * argument will be used.
   * @param [overwrite=true] - Whether to overwrite the property on the
   * source object if it exists.
   *
   * @returns - The current `Notation` instance (self).
   *
   * @throws {NotationError} - If `target` is not a valid collection.
   * @throws {NotationError} - If `notation` or `newNotation` is invalid.
   *
   * @example
   * const obj = { car: { brand: "Ford", model: "Mustang" } };
   * const models = { dodge: "Charger" };
   * Notation.create(obj).moveFrom(models, "dodge", "car.model", true);
   * console.log(obj);
   * // { car: { brand: "Ford", model: "Charger" } }
   * console.log(models);
   * // {}
   */
  moveFrom(
    target: Collection,
    notation: string,
    newNotation?: string | null,
    overwrite: boolean = true
  ): this {
    if (!utils.isCollection(target)) {
      throw new NotationError(ERR.DEST);
    }

    const result = Notation.create(target).inspectRemove(notation);
    if (result.has) {
      const newN = utils.getNewNotation(newNotation, notation);
      this.set(newN, result.value, overwrite);
    }

    return this;
  }

  /**
   * Renames the notated property of the source collection by the new
   * notation.
   *
   * @param notation - The notation to get the corresponding property (value)
   * from the source collection.
   * @param newNotation - The new notation for the targeted property value.
   * @param [overwrite=true] - Whether to overwrite the property at the new
   * notation, if it exists.
   *
   * @returns - The current `Notation` instance (self).
   *
   * @throws {NotationError} - If `notation` or `newNotation` is invalid.
   *
   * @example
   * const obj = { car: { brand: "Ford", model: "Mustang" } };
   * Notation.create(obj)
   *     .rename("car.brand", "carBrand")
   *     .rename("car.model", "carModel");
   * console.log(obj);
   * // { carBrand: "Ford", carModel: "Mustang" }
   */
  rename(notation: string, newNotation: string, overwrite: boolean = true): this {
    return this.moveTo(this._source, notation, newNotation, overwrite);
  }

  /**
   * Extracts (copies) the property at the given notation to a new object by
   * copying it from the source collection. This is equivalent to
   * `.copyTo({}, notation, newNotation)`.
   *
   * @param notation - The notation to get the corresponding property (value)
   * from the source object.
   * @param [newNotation] - The new notation to be set on the new object for
   * the targeted property value. If not set, `notation` argument will be
   * used.
   *
   * @returns - A new object with the notated property.
   *
   * @throws {NotationError} - If `notation` or `newNotation` is invalid.
   *
   * @example
   * const obj = { car: { brand: "Ford", model: "Mustang" } };
   * const extracted = Notation.create(obj).extract("car.brand", "carBrand");
   * console.log(extracted); // { carBrand: "Ford" }
   * // obj is not modified
   */
  extract(notation: string, newNotation?: string | null): UnknownObject {
    const o = {};
    this.copyTo(o, notation, newNotation);
    return o;
  }

  /**
   * Extrudes (moves) the property at the given notation to a new collection
   * by moving it from the source collection. This is equivalent to
   * `.moveTo({}, notation, newNotation)`.
   *
   * @param notation - The notation to get the corresponding property (value)
   * from the source object.
   * @param [newNotation] - The new notation to be set on the new object for
   * the targeted property value. If not set, `notation` argument will be
   * used.
   *
   * @returns - A new object with the notated property.
   *
   * @example
   * const obj = { car: { brand: "Ford", model: "Mustang" } };
   * const extruded = Notation.create(obj).extrude("car.brand", "carBrand");
   * console.log(obj);
   * // { car: { model: "Mustang" } }
   * console.log(extruded);
   * // { carBrand: "Ford" }
   */
  extrude(notation: string, newNotation?: string | null): UnknownObject {
    const o = {};
    this.moveTo(o, notation, newNotation);
    return o;
  }

  // --------------------------------
  // STATIC MEMBERS
  // --------------------------------

  /**
   * Basically constructs a new `Notation` instance.
   *
   * @param [source={}] - The source collection to be notated.
   * @param [options] - Notation options.
   *
   * @returns - The created `Notation` instance.
   *
   * @example
   * const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
   * const notation = Notation.create(obj); // equivalent to new Notation(obj)
   * notation.get('car.model')   // » "Charger"
   * notation.remove('car.model').set('car.color', 'red').value
   * // » { car: { brand: "Dodge", year: 1970, color: "red" } }
   */
  static create(source?: UnknownObject, options?: INotationOptions): Notation<UnknownObject>;
  static create(source: unknown[], options?: INotationOptions): Notation<unknown[]>;
  static create(source?: Collection, options?: INotationOptions): Notation {
    if (!source) {
      return new Notation({});
    }

    return new Notation(source, options);
  }

  /**
   * Checks whether the given notation string is valid. Note that the star
   * (`*`) (which is a valid character, even if irregular) is NOT treated as
   * wildcard here. This checks for regular dot-notation, not a glob-notation.
   * For glob notation validation, use `NotationGlob.isValid()` method. Same
   * goes for the negation character/prefix (`!`).
   *
   * @param notation - The notation string to be checked.
   *
   * @example
   * Notation.isValid('prop1.prop2.prop3'); // true
   * Notation.isValid('x'); // true
   * Notation.isValid('x.arr[0].y'); // true
   * Notation.isValid('x["*"]'); // true
   * Notation.isValid('x.*'); // false (this would be valid for Notation#filter() only or NotationGlob class)
   * Notation.isValid('@1'); // false (should be "['@1']")
   * Notation.isValid(null); // false
   */
  static isValid(notation: string): boolean {
    return typeof notation === 'string' && reVALIDATOR.test(notation);
  }

  /**
   * Splits the given notation string into its notes (levels).
   *
   * @param notation - Notation string to be splitted.
   * @returns - A string array of notes (levels).
   *
   * @throws {NotationError} - If given notation is invalid.
   */
  static split(notation: string): string[] {
    if (!Notation.isValid(notation)) {
      throw new NotationError(ERR.NOTATION + `'${notation}'`);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return notation.match(reMATCHER)!;
  }

  /**
   * Joins the given notes into a notation string.
   *
   * @param notes - Notes (levels) to be joined.
   * @returns - Joined notation string.
   */
  static join(notes: string[]): string {
    return utils.joinNotes(notes);
  }

  /**
   * Counts the number of notes/levels in the given notation.
   *
   * @param notation - The notation string to be processed.
   * @returns - Number of notes.
   *
   * @throws {NotationError} - If given notation is invalid.
   */
  static countNotes(notation: string): number {
    return Notation.split(notation).length;
  }

  /**
   * Gets the first (root) note of the notation string.
   *
   * @param notation - The notation string to be processed.
   * @returns - First note.
   *
   * @throws {NotationError} - If given notation is invalid.
   *
   * @example
   * Notation.first('first.prop2.last'); // "first"
   */
  static first(notation: string): string {
    return Notation.split(notation)[0];
  }

  /**
   * Gets the last note of the notation string.
   *
   * @param notation - The notation string to be processed.
   * @returns - Last note.
   *
   * @throws {NotationError} - If given notation is invalid.
   *
   * @example
   * Notation.last('first.prop2.last'); // "last"
   */
  static last(notation: string): string {
    const list = Notation.split(notation);
    return list[list.length - 1];
  }

  /**
   * Gets the parent notation (up to but excluding the last note)
   * from the notation string.
   *
   * @param notation - The notation string to be processed.
   * @returns - Parent note if any. Otherwise, `null`.
   *
   * @throws {NotationError} - If given notation is invalid.
   *
   * @example
   * Notation.parent('first.prop2.last'); // "first.prop2"
   * Notation.parent('single'); // null
   */
  static parent(notation: string): string | null {
    const last = Notation.last(notation);
    return notation.slice(0, -last.length).replace(/\.$/, '') || null;
  }

  /**
   * Iterates through each note/level of the given notation string.
   *
   * @param notation - The notation string to be iterated through.
   * @param callback - The callback function to be invoked on
   * each iteration. To break out of the loop, return `false` from within the
   * callback.
   * Callback signature: `callback(levelNotation, note, index, list) { ... }`
   *
   * @throws {NotationError} - If given notation is invalid.
   *
   * @example
   * const notation = 'first.prop2.last';
   * Notation.eachNote(notation, function (levelNotation, note, index, list) {
   *     console.log(index, note, levelNotation);
   * });
   * // 0  "first"             "first"
   * // 1  "first.prop2"       "prop2"
   * // 2  "first.prop2.last"  "last"
   */
  static eachNote(notation: string, callback: NotationEachNoteCallback): void {
    const notes = Notation.split(notation);
    const levelNotes: string[] = [];
    utils.each(
      notes,
      (note: string, index: number): void | false => {
        levelNotes.push(note);
        if (callback(Notation.join(levelNotes), note, index, notes) === false) return false;
      },
      Notation
    );
  }
}

// --------------------------------
// HELPERS
// --------------------------------

/**
 *  Deep iterates through each note (level) of each item in the given
 *  collection.
 *  @private
 *
 *  @param collection - A data object or an array,he source.
 *  @param callback - A function to be executed on each iteration,
 *  with the following arguments: `(levelNotation, note, value, collection)`
 *  @param [reverseIfArray=false] - Set to `true` to iterate with
 *  `eachRight` to prevent shifted indexes when removing items from arrays.
 *  @param [byLevel=false] - Indicates whether to iterate notations by
 *  each level or by the end value.  For example, if we have a collection of
 *  `{a: { b: true } }`, and `byLevel` is set; the callback will be invoked on
 *  the following notations: `a`, `a.b`. Otherwise, it will be invoked only on
 *  `a.b`.
 *  @param [parentNotation] - Storage for parent (previous) notation.
 *  @param [topSource] - Storage for initial/main collection.
 */
function _each<O extends UnknownObject, A = unknown>(
  collection: O | A[],
  callback: NotationEachCallback,
  reverseIfArray: boolean = false,
  byLevel: boolean = false,
  parentNotation: string | undefined | null = null,
  topSource: O | A[] | undefined | null = null
): void {
  const source = topSource || collection;
  // if (!utils.isCollection(collection)) throw ... // no need
  utils.eachItem(
    collection,
    (value: unknown, keyOrIndex: string | number): void | false => {
      const note = typeof keyOrIndex === 'number' ? `[${keyOrIndex}]` : keyOrIndex;
      const currentNotation = Notation.join([parentNotation as string, note]);
      const isCollection = utils.isCollection(value);
      // if it's not a collection we'll execute the callback. if it's a
      // collection but byLevel is set, we'll also execute the callback.
      if (!isCollection || byLevel) {
        if (callback(currentNotation, note, value, source) === false) return false;
      }
      // deep iterating if collection
      if (isCollection)
        _each(value as O | A[], callback, reverseIfArray, byLevel, currentNotation, source);
    },
    null,
    reverseIfArray
  );
}
