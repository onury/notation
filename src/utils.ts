import { NotationError } from './core/NotationError.js';
import type {
  ArrayEachCallbackEE,
  Collection,
  ObjectEachCallbackEE,
  UnknownObject
} from './types.js';

const objProto = Object.prototype;
// Stryker disable next-line all: Symbol is always available in supported envs (defensive).
const symValueOf =
  typeof Symbol === 'function' ? Symbol.prototype.valueOf : /* istanbul ignore next */ null;

// never use 'g' (global) flag in regexps below
const VAR = /^[a-z$_][a-z$_\d]*$/i;
const ARRAY_NOTE = /^\[(\d+)\]$/;
const ARRAY_GLOB_NOTE = /^\[(\d+|\*)\]$/;
const OBJECT_BRACKETS = /^\[(?:'(.*)'|"(.*)"|`(.*)`)\]$/;
const WILDCARD = /^(\[\*\]|\*)$/;
// matches `*` and `[*]` if outside of quotes.
const WILDCARDS = /(\*|\[\*\])(?=(?:[^"]|"[^"]*")*$)(?=(?:[^']|'[^']*')*$)/;
// matches trailing wildcards at the end of a non-negated glob.
// e.g. `x.y.*[*].*` » $1 = `x.y`, $2 = `.*[*].*`
const NON_NEG_WILDCARD_TRAIL = /^(?!!)(.+?)(\.\*|\[\*\])+$/;
const NEGATE_ALL = /^!(\*|\[\*\])$/;
// ending with '.*' or '[*]'

// const _reFlags = /\w*$/;

export const utils = {
  re: {
    VAR,
    ARRAY_NOTE,
    ARRAY_GLOB_NOTE,
    OBJECT_BRACKETS,
    WILDCARD,
    WILDCARDS,
    NON_NEG_WILDCARD_TRAIL,
    NEGATE_ALL
  },

  type: (o: unknown): string => {
    const t = objProto.toString.call(o).match(/\s(\w+)/i) as [string, string];
    return t[1].toLowerCase();
  },

  isCollection: (o: unknown): o is Collection => {
    const t = utils.type(o);
    return t === 'object' || t === 'array';
  },

  isset: (o: unknown): boolean => o !== undefined && o !== null,

  ensureArray: <T = unknown>(o: T | T[]): T[] => {
    if (Array.isArray(o)) return o;
    return o === null || o === undefined ? [] : [o];
  },

  // simply returning true will get rid of the "holes" in the array.
  // e.g. [0, , 1, , undefined, , , 2, , , null].filter(() => true);
  // ——» [0, 1, undefined, 2, null]

  cleanSparseArray: (a: unknown[]): unknown[] => {
    return a.filter((e) => e !== undefined); // or Object.values(a);
  },

  // added _collectionType for optimization (in loops)
  hasOwn: (
    collection: Collection,
    keyOrIndex: string | number,
    _collectionType?: string
  ): boolean => {
    if (!collection) return false;

    const isArr = (_collectionType || utils.type(collection)) === 'array';

    // check for objects
    if (!isArr && typeof keyOrIndex === 'string') {
      return Boolean(keyOrIndex) && objProto.hasOwnProperty.call(collection, keyOrIndex);
    }

    // check for arrays
    if (typeof keyOrIndex === 'number') {
      return keyOrIndex >= 0 && keyOrIndex < collection.length;
    }

    return false;
  },

  _cloneDeep: (collection: unknown): unknown => {
    const t = utils.type(collection);

    switch (t) {
      case 'date':
        return new Date((collection as Date).valueOf());

      case 'regexp': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const re = collection as RegExp;
        const copy = new RegExp(re.source, re.flags);
        copy.lastIndex = re.lastIndex;
        return copy;
      }
      case 'symbol': {
        // symValueOf is always defined in supported envs; the fallback is defensive.
        /* istanbul ignore next */
        // Stryker disable next-line all: defensive non-Symbol fallback, unreachable here.
        if (!symValueOf) return collection;
        return Object(symValueOf.call(collection));
      }

      case 'array':
        return (collection as unknown[]).map(utils._cloneDeep);

      case 'object': {
        const copy = {};
        // only enumerable string keys
        Object.keys(collection as UnknownObject).forEach((k) => {
          copy[k] = utils._cloneDeep((collection as UnknownObject)[k]);
        });
        return copy;
      }

      // primitives copied over by value
      // case 'string':
      // case 'number':
      // case 'boolean':
      // case 'null':
      // case 'undefined':
      default: // others will be referenced
        return collection;
    }
  },
  cloneDeep: <T extends Collection>(collection: T): T => utils._cloneDeep(collection) as T,

  // iterates over elements of an array, executing the callback for each
  // element.
  each: <T = unknown>(array: T[], callback: ArrayEachCallbackEE<T>, context?: unknown): void => {
    const len = array.length;
    let index = -1;
    while (++index < len) {
      if (callback.apply(context, [array[index], index, array]) === false) return;
    }
  },

  eachRight: <T = unknown>(
    array: T[],
    callback: ArrayEachCallbackEE<T>,
    context?: unknown
  ): void => {
    let index = array.length;
    while (index--) {
      if (callback.apply(context, [array[index], index, array]) === false) return;
    }
  },

  eachProp: <T extends UnknownObject>(
    object: T,
    callback: ObjectEachCallbackEE<T>,
    context?: unknown
  ): void => {
    const keys = Object.keys(object);
    let index = -1;
    while (++index < keys.length) {
      const key = keys[index];
      if (callback.apply(context, [object[key], key, object]) === false) return;
    }
  },

  eachItem: <O extends UnknownObject, A = unknown>(
    collection: O | A[],
    callback: ObjectEachCallbackEE<O> | ArrayEachCallbackEE<A>,
    context?: unknown,
    reverseIfArray: boolean = false
  ): void => {
    if (Array.isArray(collection)) {
      // important! we should iterate with eachRight to prevent shifted
      // indexes when removing items from arrays.
      return reverseIfArray
        ? utils.eachRight(collection as A[], callback as ArrayEachCallbackEE<A>, context)
        : utils.each(collection as A[], callback as ArrayEachCallbackEE<A>, context);
    }

    return utils.eachProp(collection, callback as ObjectEachCallbackEE<O>, context);
  },

  pregQuote: (str: string): string => {
    const re = /[.\\+*?[^\]$(){}=!<>|:-]/g;
    return String(str).replace(re, '\\$&');
  },

  stringOrArrayOf: (o: unknown, value: string): boolean =>
    typeof value === 'string' &&
    (o === value || (Array.isArray(o) && o.length === 1 && o[0] === value)),

  hasSingleItemOf: (arr: string[], ...rest: unknown[]): boolean =>
    arr.length === 1 && (rest.length === 1 ? arr[0] === rest[0] : true),

  // remove trailing/redundant wildcards if not negated
  removeTrailingWildcards: (glob: string): string =>
    // glob.replace(/(.+?)(\.\*|\[\*\])*$/, '$1')
    glob.replace(NON_NEG_WILDCARD_TRAIL, '$1'),

  normalizeNote: (note: string): string | number => {
    if (VAR.test(note)) return note;

    // check array index notation e.g. `[1]`
    let m = note.match(ARRAY_NOTE);
    if (m) return parseInt(m[1], 10);

    // check object bracket notation e.g. `["a-b"]`
    m = note.match(OBJECT_BRACKETS);
    if (m) return m[1] || m[2] || m[3];

    throw new NotationError(`Invalid note: '${note}'`);
  },

  // we have NotationGlob.join() but it checks each note item for validity.
  // this is used internally to re-join previously splitted without any checks
  // so it's faster.
  joinNotes: (notes: (string | null | undefined)[]): string => {
    const lastIndex = notes.length - 1;

    return notes
      .map((current, i) => {
        if (!current) return '';
        const next = lastIndex >= i + 1 ? notes[i + 1] : null;
        const dot = next ? (next[0] === '[' ? '' : '.') : '';
        return current + dot;
      })
      .join('');
  },

  getNewNotation: (newNotation?: string | null, notation?: string | null): string | never => {
    const errMsg = `Invalid new notation: '${newNotation}'`;

    // note validations (for newNotation and notation) are already made by
    // other methods in the flow.
    let newN;
    if (typeof newNotation === 'string') {
      newN = newNotation.trim();
      if (!newN) throw new NotationError(errMsg);
      return newN;
    }
    if (notation && !utils.isset(newNotation)) return notation;

    throw new NotationError(errMsg);
  }
};
