
import NotationError from './core/notation.error';

const oPROTO = Object.prototype;

const utils = {

    re: {
        VAR: /^[a-z$_][a-z$_\d]*$/i,
        ARRAY_NOTE: /^\[(\d+)\]$/,
        ARRAY_GLOB_NOTE: /^\[(\d+|\*)\]$/,
        OBJECT_BRACKETS: /^\[(?:'(.*)'|"(.*)"|`(.*)`)\]$/,
        ESCAPE: /[.\\+*?[^\]$(){}=!<>|:-]/g,
        WILDCARD: /^(\[\*\]|\*)$/,
        // matches `*` and `[*]` if outside of quotes.
        WILDCARDS: /(\*|\[\*\])(?=(?:[^"]|"[^"]*")*$)(?=(?:[^']|'[^']*')*$)/g,
        // matches trailing wildcards at the end of a non-negated glob.
        // e.g. `x.y.*[*].*` » $1 = `x.y`, $2 = `.*[*].*`
        NON_NEG_WILDCARD_TRAIL: /^(?!!)(.+?)(\.\*|\[\*\])+$/,
        NEGATE_ALL: /^!(\*|\[\*\])$/
    },

    isObject(o) {
        return oPROTO.toString.call(o) === '[object Object]';
    },

    isArray(o) {
        return oPROTO.toString.call(o) === '[object Array]';
    },

    isCollection(o) {
        return utils.isObject(o) || utils.isArray(o);
    },

    isset(o) {
        return o !== undefined && o !== null;
    },

    ensureArray(o) {
        if (utils.isArray(o)) return o;
        return o === null || o === undefined ? [] : [o];
    },

    hasOwn(collection, keyOrIndex) {
        if (!collection) return false;
        const isArr = utils.isArray(collection);
        if (!isArr && typeof keyOrIndex === 'string') {
            return keyOrIndex && oPROTO.hasOwnProperty.call(collection, keyOrIndex);
        }
        if (typeof keyOrIndex === 'number') {
            return keyOrIndex >= 0 && keyOrIndex < collection.length;
        }
        return false;
    },

    deepCopy(collection) {
        if (utils.isObject(collection)) {
            const copy = {};
            Object.keys(collection).forEach(k => {
                copy[k] = utils.deepCopy(collection[k]);
            });
            return copy;
        }
        if (utils.isArray(collection)) return collection.map(utils.deepCopy);
        // not object or array
        return collection;
    },

    // iterates over elements of an array, executing the callback for each
    // element.
    each(array, callback, thisArg) {
        const len = array.length;
        let index = -1;
        while (++index < len) {
            if (callback.apply(thisArg, [array[index], index, array]) === false) break;
        }
    },

    eachRight(array, callback, thisArg) {
        let index = array.length;
        while (index--) {
            if (callback.apply(thisArg, [array[index], index, array]) === false) break;
        }
    },

    eachProp(object, callback, thisArg) {
        const keys = Object.keys(object);
        let index = -1;
        while (++index < keys.length) {
            const key = keys[index];
            if (callback.apply(thisArg, [object[key], key, object]) === false) break;
        }
    },

    eachItem(collection, callback, thisArg) {
        if (utils.isArray(collection)) {
            return utils.each(collection, callback, thisArg);
        }
        return utils.eachProp(collection, callback, thisArg);
    },

    pregQuote(str) {
        return String(str).replace(utils.re.ESCAPE, '\\$&');
    },

    stringOrArrayOf(o, value) {
        return typeof value === 'string'
            && (o === value
                || (utils.isArray(o) && o.length === 1 && o[0] === value)
            );
    },

    hasSingleItemOf(arr, itemValue) {
        return arr.length === 1
            && (arguments.length === 2 ? arr[0] === itemValue : true);
    },

    // remove trailing/redundant wildcards if not negated
    normalizeGlobStr(glob) {
        return glob.trim().replace(utils.re.NON_NEG_WILDCARD_TRAIL, '$1');
    },

    normalizeNote(note) {
        if (utils.re.VAR.test(note)) return note;
        // check array index notation e.g. `[1]`
        let m = note.match(utils.re.ARRAY_NOTE);
        if (m) return parseInt(m[1], 10);
        // check object bracket notation e.g. `["a-b"]`
        m = note.match(utils.re.OBJECT_BRACKETS);
        if (m) return m[1] || m[2] || m[3];
        throw new NotationError(`Invalid note: "${note}"`);
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

export default utils;
