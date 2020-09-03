
import { NotationError } from './core/notation.error';

const objProto = Object.prototype;
const symValueOf = typeof Symbol === 'function'
    ? Symbol.prototype.valueOf
    /* istanbul ignore next */
    : null;

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

const _reFlags = /\w*$/;

const utils = {

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

    type(o) {
        return objProto.toString.call(o).match(/\s(\w+)/i)[1].toLowerCase();
    },

    isCollection(o) {
        const t = utils.type(o);
        return t === 'object' || t === 'array';
    },

    isset(o) {
        return o !== undefined && o !== null;
    },

    ensureArray(o) {
        if (utils.type(o) === 'array') return o;
        return o === null || o === undefined ? [] : [o];
    },

    // simply returning true will get rid of the "holes" in the array.
    // e.g. [0, , 1, , undefined, , , 2, , , null].filter(() => true);
    // ——» [0, 1, undefined, 2, null]

    // cleanSparseArray(a) {
    //     return a.filter(() => true);
    // },

    // added _collectionType for optimization (in loops)
    hasOwn(collection, keyOrIndex, _collectionType) {
        if (!collection) return false;
        const isArr = (_collectionType || utils.type(collection)) === 'array';
        if (!isArr && typeof keyOrIndex === 'string') {
            return keyOrIndex && objProto.hasOwnProperty.call(collection, keyOrIndex);
        }
        if (typeof keyOrIndex === 'number') {
            return keyOrIndex >= 0 && keyOrIndex < collection.length;
        }
        return false;
    },

    cloneDeep(collection) {
        const t = utils.type(collection);
        switch (t) {
            case 'date':
                return new Date(collection.valueOf());
            case 'regexp': {
                const flags = _reFlags.exec(collection).toString();
                const copy = new collection.constructor(collection.source, flags);
                copy.lastIndex = collection.lastIndex;
                return copy;
            }
            case 'symbol':
                return symValueOf
                    ? Object(symValueOf.call(collection))
                    /* istanbul ignore next */
                    : collection;
            case 'array':
                return collection.map(utils.cloneDeep);
            case 'object': {
                const copy = {};
                // only enumerable string keys
                Object.keys(collection).forEach(k => {
                    copy[k] = utils.cloneDeep(collection[k]);
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

    // iterates over elements of an array, executing the callback for each
    // element.
    each(array, callback, thisArg) {
        const len = array.length;
        let index = -1;
        while (++index < len) {
            if (callback.apply(thisArg, [array[index], index, array]) === false) return;
        }
    },

    eachRight(array, callback, thisArg) {
        let index = array.length;
        while (index--) {
            if (callback.apply(thisArg, [array[index], index, array]) === false) return;
        }
    },

    eachProp(object, callback, thisArg) {
        const keys = Object.keys(object);
        let index = -1;
        while (++index < keys.length) {
            const key = keys[index];
            if (callback.apply(thisArg, [object[key], key, object]) === false) return;
        }
    },

    eachItem(collection, callback, thisArg, reverseIfArray = false) {
        if (utils.type(collection) === 'array') {
            // important! we should iterate with eachRight to prevent shifted
            // indexes when removing items from arrays.
            return reverseIfArray
                ? utils.eachRight(collection, callback, thisArg)
                : utils.each(collection, callback, thisArg);
        }
        return utils.eachProp(collection, callback, thisArg);
    },

    pregQuote(str) {
        const re = /[.\\+*?[^\]$(){}=!<>|:-]/g;
        return String(str).replace(re, '\\$&');
    },

    stringOrArrayOf(o, value) {
        return typeof value === 'string'
            && (o === value
                || (utils.type(o) === 'array' && o.length === 1 && o[0] === value)
            );
    },

    hasSingleItemOf(arr, itemValue) {
        return arr.length === 1
            && (arguments.length === 2 ? arr[0] === itemValue : true);
    },

    // remove trailing/redundant wildcards if not negated
    removeTrailingWildcards(glob) {
        // return glob.replace(/(.+?)(\.\*|\[\*\])*$/, '$1');
        return glob.replace(NON_NEG_WILDCARD_TRAIL, '$1');
    },

    normalizeNote(note) {
        if (VAR.test(note)) return note;
        // check array index notation e.g. `[1]`
        let m = note.match(ARRAY_NOTE);
        if (m) return parseInt(m[1], 10);
        // check object bracket notation e.g. `["a-b"]`
        m = note.match(OBJECT_BRACKETS);
        if (m) return (m[1] || m[2] || m[3]);
        throw new NotationError(`Invalid note: '${note}'`);
    },

    joinNotes(notes) {
        const lastIndex = notes.length - 1;
        return notes.map((current, i) => {
            if (!current) return '';
            const next = lastIndex >= i + 1 ? notes[i + 1] : null;
            const dot = next
                ? next[0] === '[' ? '' : '.'
                : '';
            return current + dot;
        }).join('');
    },

    getNewNotation(newNotation, notation) {
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

export { utils };
