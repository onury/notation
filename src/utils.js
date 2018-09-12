
let toString = Object.prototype.toString;

const utils = {
    isObject(o) {
        return toString.call(o) === '[object Object]';
    },

    isArray(o) {
        return toString.call(o) === '[object Array]';
    },

    ensureArray(o) {
        if (utils.isArray(o)) return o;
        return o === null || o === undefined ? [] : [o];
    },

    hasOwn(o, prop) {
        return o && typeof o.hasOwnProperty === 'function' && o.hasOwnProperty(prop);
    },

    deepCopy(object) {
        if (!utils.isObject(object)) return object;
        let k, o,
            copy = {};
        for (k in object) {
            if (utils.hasOwn(object, k)) {
                o = object[k];
                copy[k] = utils.isObject(o) ? utils.deepCopy(o) : o;
            }
        }
        return copy;
    },

    // iterates over elements of an array, executing the callback for each
    // element.
    each(array, callback, thisArg) {
        let length = array.length,
            index = -1;
        while (++index < length) {
            if (callback.call(thisArg, array[index], index, array) === false) break;
        }
    },

    eachRight(array, callback) {
        let index = array.length;
        while (index--) {
            if (callback(array[index], index, array) === false) break;
        }
    },

    // Borrowed from http://phpjs.org/functions/preg_quote
    pregQuote(str, delimiter) {
        return String(str)
            .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
    },

    stringOrArrayOf(o, value) {
        return (typeof o === 'string' && o === value)
            || (utils.isArray(o) && o.length === 1 && o[0] === value);
    },

    hasSingleItemOf(arr, itemValue) {
        return arr.length === 1
            && (arguments.length === 2 ? arr[0] === itemValue : true);
    },

    isArrIndex(note) {
        return /^\[\d+\]$/.test(note);
    },

    splitNotation(notation) {
        const notes = [];
        const chars = notation.split('');
        let start = 0;
        let bracketCount = 0;
        for (let i = 0; i < chars.length; i++) {
            let note;
            switch (true) {
                case chars[i] === '.':
                    note = chars.slice(start, i).join('');
                    start = i + 1;
                    break;
                case chars[i] === '[':
                    if (!bracketCount && start !== i) {
                        note = chars.slice(start, i).join('');
                        start = i;
                    }
                    bracketCount += 1;
                    break;
                case chars[i] === ']':
                    bracketCount -= 1;
                    if (!bracketCount) {
                        note = chars.slice(start, i + 1).join('');
                        start = i + 1;
                    }
                    break;
                case i === chars.length - 1:
                    note = chars.slice(start, i + 1).join('');
                    break;
            }
            if (typeof note === 'string' && note.length) {
                notes.push(note);
            }
        }
        return notes;
    },

    concatNotes(notes) {
        return notes.reduce((acc, note) => acc + (this.isArrIndex(note) ? note : `.${note}`));
    },

    getIndexNumber(notation) {
        return +notation.replace(/[\[\]]/g, '');
    },

    removeEmptyArraySpots(obj) {
        if (this.isObject(obj)) {
            for (const key of Object.keys(obj)) {
                obj[key] = this.removeEmptyArraySpots(obj[key]);
            }
            return obj;
        } else if (this.isArray(obj)) {
            return obj
                .filter((e) => e !== undefined)
                .map((e) => this.removeEmptyArraySpots(e));
        } else {
            return obj;
        }
    },
};

export default utils;
