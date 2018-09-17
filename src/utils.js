
import NotationError from './core/notation.error';

const reVAR = /^[a-z$_][a-z$_\d]*$/i;
const reBRACKETS = /^\[(.*)\]$/;
const reQUOTES = /^(?:'(.*)'|"(.*)"|`(.*)`)$/;
const reESCAPE = /[.\\+*?[^\]$(){}=!<>|:-]/g;
const oPROTO = Object.prototype;

const utils = {

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
        if (typeof keyOrIndex === 'string') {
            return keyOrIndex && oPROTO.hasOwnProperty.call(collection, keyOrIndex);
        }
        if (utils.isArray(collection) && typeof keyOrIndex === 'number') {
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
        return String(str).replace(reESCAPE, '\\$&');
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

    isArrayNote(note) {
        return reBRACKETS.test(note);
    },

    // all validations might not be necessary here, since the full notation is
    // always validated via `Notation.isValid()`.
    normalizeNote(note) {
        if (reVAR.test(note)) return note;
        if (utils.isArrayNote(note)) {
            // remove surrounding brackets
            const n = note.replace(reBRACKETS, '$1');
            // if integer only, this is an array index
            if ((/^\d+$/).test(n)) return parseInt(n, 10);
            // otherwise, it has to have surrounding quotes
            if (reQUOTES.test(n)) return n.replace(reQUOTES, '$1$2$3');
        }
        throw new NotationError(`Invalid note: "${note}"`);
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
