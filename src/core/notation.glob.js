/* eslint no-use-before-define:0, consistent-return:0, max-statements:0 */

import Notation from './notation';
import NotationError from './notation.error';
import utils from '../utils';

// http://www.linfo.org/wildcard.html
// http://en.wikipedia.org/wiki/Glob_%28programming%29
// http://en.wikipedia.org/wiki/Wildcard_character#Computing

// created test @ https://regex101.com/r/U08luj/2
const reMATCHER = /(\[(\d+|\*|".*"|'.*')\]|[a-z$_][a-z$_\d]*|\*)/gi; // ! negation should be removed first
// created test @ https://regex101.com/r/mC8unE/3
// /^!?(\*|[a-z$_][a-z$_\d]*|\[(\d+|".*"|'.*'|`.*`|\*)\])(\[(\d+|".*"|'.*'|`.*`|\*)\]|\.[a-z$_][a-z$_\d]*|\.\*)*$/i
const reVALIDATOR = new RegExp(
    '^'
    + '!?('                             // optional negation, only in the front
    + '\\*'                             // wildcard star
    + '|'                               // OR
    + '[a-z$_][a-z$_\\d]*'              // JS variable syntax
    + '|'                               // OR
    + '\\[(\\d+|\\*|".*"|\'.*\')\\]'    // array index or wildcard, or object bracket notation
    + ')'                               // exactly once
    + '('
    + '\\[(\\d+|\\*|".*"|\'.*\')\\]'    // followed by same
    + '|'                               // OR
    + '\\.[a-z$_][a-z$_\\d]*'           // dot, then JS variable syntax
    + '|'                               // OR
    + '\\.\\*'                          // dot, then wildcard star
    + ')*'                              // (both) may repeat any number of times
    + '$'
    , 'i'
);

const { re } = utils;
const ERR_INVALID = 'Invalid glob notation: ';

/**
 *  `Notation.Glob` is a utility for validating, comparing and sorting
 *  dot-notation globs.
 *
 *  You can use {@link http://www.linfo.org/wildcard.html|wildcard} stars `*`
 *  and negate the notation by prepending a bang `!`. A star will include all
 *  the properties at that level and a negated notation will be excluded.
 *  @name Notation.Glob
 *  @memberof! Notation
 *  @class
 *
 *  @example
 *  // for the following object;
 *  { name: 'John', billing: { account: { id: 1, active: true } } };
 *
 *  'billing.account.*'  // represents value `{ id: 1, active: true }`
 *  'billing.account.id' // represents value `1`
 *  '!billing.account.*' // represents value `{ name: 'John' }`
 *  'name' // represents `'John'`
 *  '*' // represents the whole object
 *
 *  @example
 *  var glob = new Notation.Glob('billing.account.*');
 *  glob.test('billing.account.id'); // true
 */
class NotationGlob {

    /**
     *  Constructs a `Notation.Glob` object with the given glob string.
     *  @constructs Notation.Glob
     *  @param {String} glob - Notation string with globs.
     *
     *  @throws {NotationError} - If given notation glob is invalid.
     */
    constructor(glob) {
        if (!NotationGlob.isValid(glob)) {
            throw new NotationError(`${ERR_INVALID} '${glob}'`);
        }

        const ins = NotationGlob._inspect(glob);
        const notes = NotationGlob.split(ins.absGlob, true);
        const last = notes[notes.length - 1];
        const parent = notes.length > 1
            ? ins.absGlob.slice(0, -last.length).replace(/\.$/, '')
            : null;
        this._ = {
            ...ins,
            regexp: NotationGlob.toRegExp(ins.absGlob),
            notes,
            last,
            parent
        };
    }

    // --------------------------------
    // INSTANCE PROPERTIES
    // --------------------------------

    /**
     *  Gets the normalized glob notation string.
     *  @name Notation.Glob#glob
     *  @type {String}
     */
    get glob() {
        return this._.glob;
    }

    /**
     *  Gets the absolute glob notation without the negation prefix `!` and
     *  redundant trailing wildcards.
     *  @name Notation.Glob#absGlob
     *  @type {String}
     */
    get absGlob() {
        return this._.absGlob;
    }

    /**
     *  Specifies whether this glob is negated with a `!` prefix.
     *  @name Notation.Glob#isNegated
     *  @type {Boolean}
     */
    get isNegated() {
        return this._.isNegated;
    }

    /**
     *  Represents this glob in regular expressions.
     *  Note that the negation prefix (`!`) is ignored, if any.
     *  @name Notation.Glob#regexp
     *  @type {RegExp}
     */
    get regexp() {
        return this._.regexp;
    }

    /**
     *  List of notes/levels of this glob notation. Note that trailing,
     *  redundant wildcards are removed from the original glob notation.
     *  @name Notation.Glob#notes
     *  @alias Notation.Glob#levels
     *  @type {Array}
     */
    get notes() {
        return this._.notes;
    }

    /**
     *  Alias of `Notation.Glob#notes`.
     *  @private
     *  @name Notation.Glob#notes
     *  @alias Notation.Glob#levels
     *  @type {Array}
     */
    get levels() {
        return this._.notes;
    }

    /**
     *  Gets the first note of this glob notation.
     *  @name Notation.Glob#first
     *  @type {String}
     */
    get first() {
        return this.notes[0];
    }

    /**
     *  Gets the last note of this glob notation.
     *  @name Notation.Glob#last
     *  @type {String}
     */
    get last() {
        return this._.last;
    }

    /**
     *  Gets the parent notation (up to but excluding the last note) from the
     *  glob notation string. Note that initially, trailing/redundant wildcards
     *  are removed.
     *  @name Notation.Glob#parent
     *  @type {String}
     *
     *  @example
     *  NotationGlob.create('first.second.*').parent; // "first.second"
     *  NotationGlob.create('*.x.*').parent; // "*"
     *  NotationGlob.create('*').parent; // null (no parent)
     */
    get parent() {
        return this._.parent;
    }

    // --------------------------------
    // INSTANCE METHODS
    // --------------------------------

    /**
     *  Checks whether the given notation value matches the source notation
     *  glob.
     *  @name Notation.Glob#test
     *  @function
     *  @param {String} notation - The notation string to be tested. Cannot have
     *  any globs.
     *  @returns {Boolean} -
     *  @throws {NotationError} - If given `notation` is not valid or contains
     *  any globs.
     *
     *  @example
     *  const glob = new Notation.Glob('!prop.*.name');
     *  glob.test("prop.account.name"); // true
     */
    test(notation) {
        if (!Notation.isValid(notation)) {
            throw new NotationError(`Invalid notation: '${notation}'`);
        }
        // return this.regexp.test(notation);
        return this.covers(notation);
    }

    /**
     *  Specifies whether this glob notation can represent (or cover) the given
     *  glob. Note that negation prefix is ignored, if any.
     *  @param {String|Array|NotationGlob} glob  Glob notation string, glob
     *  notes array or a `NotationGlob` instance.
     *  @returns {Boolean} -
     *
     *  @example
     *  const glob = Notation.Glob.create;
     *  glob('*.y').covers('x.y')      // true
     *  glob('x[*].y').covers('x[*]')  // false
     */
    covers(glob) {
        return NotationGlob.covers(this, glob);
    }

    // --------------------------------
    // STATIC MEMBERS
    // --------------------------------

    /**
     *  Basically constructs a new `NotationGlob` instance
     *  with the given glob string.
     *  @name Notation.Glob.create
     *  @function
     *  @param {String} glob - The source notation glob.
     *  @returns {NotationGlob} -
     *
     *  @example
     *  const glob = Notation.Glob.create(strGlob);
     *  // equivalent to:
     *  const glob = new Notation.Glob(strGlob);
     */
    static create(glob) {
        return new NotationGlob(glob);
    }

    // Created test at: https://regex101.com/r/tJ7yI9/4
    /**
     *  Validates the given notation glob.
     *  @name Notation.Glob.isValid
     *  @function
     *
     *  @param {String} glob - Notation glob to be validated.
     *  @returns {Boolean} -
     */
    static isValid(glob) {
        return (typeof glob === 'string') && reVALIDATOR.test(glob);
    }

    /**
     *  Gets a regular expressions instance from the given glob notation.
     *  Note that the bang `!` prefix will be ignored if the given glob is negated.
     *  @name Notation.Glob.toRegExp
     *  @function
     *  @param {String} glob - Glob notation to be converted.
     *
     *  @returns {RegExp} - A `RegExp` instance from the glob.
     *
     *  @throws {NotationError} - If given notation glob is invalid.
     */
    static toRegExp(glob) {
        if (!NotationGlob.isValid(glob)) {
            throw new NotationError(`${ERR_INVALID} '${glob}'`);
        }

        let g = glob.indexOf('!') === 0 ? glob.slice(1) : glob;
        g = utils.pregQuote(g)
            // `[*]` always represents array index e.g. `[1]`. so we'd replace
            // `\[\*\]` with `\[\d+\]` but we should also watch for quotes: e.g.
            // `["x[*]y"]`
            .replace(/\\\[\\\*\\\](?=(?:[^"]|"[^"]*")*$)(?=(?:[^']|'[^']*')*$)/g, '\\[\\d+\\]')
            // `*` within quotes (e.g. ['*']) is non-wildcard, just a regular star char.
            // `*` outside of quotes is always JS variable syntax e.g. `prop.*`
            .replace(/\\\*(?=(?:[^"]|"[^"]*")*$)(?=(?:[^']|'[^']*')*$)/g, '[a-z$_][a-z$_\\d]*')
            .replace(/\\\?/g, '.');
        return new RegExp('^' + g + '(?:[\\[\\.].+|$)', 'i');
        // it should either end ($) or continue with a dot or bracket. So for
        // example, `company.*` will produce `/^company\.[a-z$_][a-z$_\\d]*(?:[\\[|\\.].+|$)/`
        // which will match both `company.name` and `company.address.street` but
        // will not match `some.company.name`. Also `!password` will not match
        // `!password_reset`.
    }

    /**
     *  Specifies whether first glob notation can represent (or cover) the
     *  second.
     *  @param {String|Object|NotationGlob} globA  Source glob notation string or inspection
     *  result object or `NotationGlob` instance.
     *  @param {String|Object|NotationGlob} globB  Glob notation string or inspection result
     *  object or `NotationGlob` instance.
     *  @returns {Boolean} -
     *
     *  @example
     *  const { covers } = NotationGlob;
     *  covers('*.y', 'x.y')      // true
     *  covers('x[*].y', 'x[*]')  // false
     */
    static covers(globA, globB) {
        const a = typeof globA === 'string'
            ? new NotationGlob(globA)
            : globA; // assume (globA instanceof NotationGlob || utils.type(globA) === 'object')

        const b = typeof globB === 'string'
            ? new NotationGlob(globB)
            : globB;

        const notesA = a.notes || NotationGlob.split(a.glob);
        const notesB = b.notes || NotationGlob.split(b.glob);

        // !x.*.* does not cover !x.* or x.* bec. !x.*.* !== x.* !== x
        // x.*.* covers x.* bec. x.*.* === x.* === x
        if (a.isNegated && notesA.length > notesB.length) return false;

        let covers = true;
        for (let i = 0; i < notesA.length; i++) {
            if (!_coversNote(notesA[i], notesB[i])) {
                covers = false;
                break;
            }
        }
        return covers;
    }

    // this should only be used with negated globs when union'ing.
    static _intersect(globA, globB) {
        // if any one of them is negated, intersection is negated.
        const bang = globA[0] === '!' || globB[0] === '!' ? '!' : '';

        const notesA = NotationGlob.split(globA);
        const notesB = NotationGlob.split(globB);
        const len = Math.max(notesA.length, notesB.length);
        let notesI = [];
        let a, b;
        //   x.*  ∩  *.y   »  x.y
        // x.*.*  ∩  *.y   »  x.y.*
        // x.*.z  ∩  *.y   »  x.y.z
        //   x.y  ∩  *.b   »  (n/a)
        //   x.y  ∩  a.*   »  (n/a)
        for (let i = 0; i < len; i++) {
            a = notesA[i];
            b = notesB[i];
            if (a === b) {
                notesI.push(a);
            } else if (a && re.WILDCARD.test(a)) {
                if (!b) {
                    notesI.push(a);
                } else {
                    notesI.push(b);
                }
            } else if (b && re.WILDCARD.test(b)) {
                if (!a) {
                    notesI.push(b);
                } else {
                    notesI.push(a);
                }
            } else if (a && !b) {
                notesI.push(a);
            } else if (!a && b) {
                notesI.push(b);
            } else { // if (a !== b) {
                notesI = [];
                break;
            }
        }

        if (notesI.length > 0) return bang + utils.joinNotes(notesI);
        return null;
    }

    /**
     *  Undocumented.
     *  @private
     *  @param {String} glob -
     *  @returns {Object} -
     */
    static _inspect(glob) {
        const g = utils.normalizeGlobStr(glob);
        const isNegated = g[0] === '!';
        return {
            glob: g,
            isNegated,
            absGlob: isNegated ? g.slice(1) : g
        };
    }

    /**
     *  Splits the given glob notation string into its notes (levels). Note that
     *  this will exclude the `!` negation prefix, if it exists.
     *  @param {String} glob  Glob notation string to be splitted.
     *  @param {String} [normalize=false]  Whether to remove trailing, redundant
     *  wildcards.
     *  @returns {Array} - A string array of glob notes (levels).
     *  @throws {NotationError} - If given glob notation is invalid.
     */
    static split(glob, normalize = false) {
        if (!NotationGlob.isValid(glob)) {
            throw new NotationError(`${ERR_INVALID} '${glob}'`);
        }
        const g = normalize ? utils.normalizeGlobStr(glob) : glob;
        return g.replace(/^!/, '').match(reMATCHER);
    }

    /**
     *  Compares two given notation globs and returns an integer value as a
     *  result. This is generally used to sort glob arrays. Loose globs (with
     *  stars especially closer to beginning of the glob string) and globs
     *  representing the parent/root of the compared property glob come first.
     *  Verbose/detailed/exact globs come last. (`* < *.abc < abc`).
     *
     *  For instance; `store.address` comes before `store.address.street`. So
     *  this works both for `*, store.address.street, !store.address` and `*,
     *  store.address, !store.address.street`. For cases such as `prop.id` vs
     *  `!prop.id` which represent the same property; the negated glob comes
     *  last.
     *  @name Notation.Glob.compare
     *  @function
     *
     *  @param {String} globA - First notation glob to be compared.
     *  @param {String} globB - Second notation glob to be compared.
     *
     *  @returns {Number} - Returns `-1` if `globA` comes first, `1` if `globB`
     *  comes first and `0` if equivalent priority.
     *
     *  @throws {NotationError} - If either `globA` or `globB` is invalid glob
     *  notation.
     *
     *  @example
     *  const { compare } = Notation.Glob;
     *  console.log(compare('prop.*.name', 'prop.*')); // 1
     */
    static compare(globA, globB) {
        // trivial case, both are exactly the same!
        // or both are wildcard e.g. `*` or `[*]`
        if (globA === globB || (re.WILDCARD.test(globA) && re.WILDCARD.test(globB))) return 0;

        const a = NotationGlob._inspect(globA);
        const b = NotationGlob._inspect(globB);
        const notesA = NotationGlob.split(a.absGlob);
        const notesB = NotationGlob.split(b.absGlob);

        // Check depth (number of levels)
        if (notesA.length === notesB.length) {
            // count wildcards
            const wildCountA = (a.absGlob.match(re.WILDCARDS) || []).length;
            const wildCountB = (b.absGlob.match(re.WILDCARDS) || []).length;
            if (wildCountA === wildCountB) {
                // check for negation
                // both are negated or neither are, just return alphabetical
                if (a.isNegated === b.isNegated) return a.absGlob <= b.absGlob ? -1 : 1;
                // compare absoulte globs without the negation
                if (a.absGlob === b.absGlob) return a.isNegated ? 1 : -1;
                return a.absGlob <= b.absGlob ? -1 : 1;
            }
            return wildCountA >= wildCountB ? -1 : 1;
        }

        return notesA.length < notesB.length ? -1 : 1;
    }

    /**
     *  Sorts the notation globs in the given array by their priorities. Loose
     *  globs (with stars especially closer to beginning of the glob string);
     *  globs representing the parent/root of the compared property glob come
     *  first. Verbose/detailed/exact globs come last. (`* < *abc < abc`).
     *
     *  For instance; `store.address` comes before `store.address.street`. For
     *  cases such as `prop.id` vs `!prop.id` which represent the same property;
     *  the negated glob wins (comes last).
     *  @name Notation.Glob.sort
     *  @function
     *  @param {Array} globsArray - The notation globs array to be sorted. The
     *  passed array reference is modified.
     *  @returns {Array} -
     *
     *  @example
     *  const globs = ['!prop.*.name', 'prop.*', 'prop.id'];
     *  const sorted = Notation.Glob.sort(globs);
     *  console.log(sorted);
     *  // ['prop.*', 'prop.id', '!prop.*.name'];
     */
    static sort(globsArray) {
        return globsArray.sort(NotationGlob.compare);
    }

    /**
     *  Normalizes the given notation globs array by removing duplicate or
     *  redundant items and returns a priority-sorted globs array.
     *
     *  <ul>
     *  <li>If any exact duplicates found, all except first is removed.</li>
     *  <li>If both normal and negated versions of a glob are found, negated wins.
     *  <br />example: `['id', '!id']` normalizes to `['!id']`.</li>
     *  <li>If a glob is covered by another, it's removed.
     *  <br />example: `['car.*', 'car.model']` normalizes to `['car.*']`.</li>
     *  <li>If a glob is covered by another negated glob, it's kept.
     *  <br />example: `['*', '!car.*', 'car.model']` normalizes as is.</li>
     *  <li>If a negated glob is covered by another glob, it's also kept.
     *  <br />example: `['car.*', '!car.model']` normalizes as is.</li>
     *  </ul>
     *  @name Notation.Glob.normalize
     *  @function
     *  @param {Array} globsArray - Notation globs array to be normalized.
     *  @returns {Array} -
     *
     *  @example
     *  const globs = ['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'age'];
     *  const { normalize } = Notation.Glob;
     *  console.log(normalize(globs)); // ['*', '!car.*', '!id', 'car.model']
     */
    static normalize(globsArray) {
        const list = utils.ensureArray(globsArray).map(utils.normalizeGlobStr);
        // let list = utils.ensureArray(globsArray).map(item => item.trim());
        const normalized = {};
        const { covers } = NotationGlob;
        function log(...args) {
            console.log(...args);
        }

        utils.eachRight(list, (globA, indexA) => {

            // example #1:
            // ['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name']
            // => ['*', '!id', '!car.*', 'car.model']

            // example #2:
            // ['!id', 'name', 'car.model', '!car.*', 'id', '!email']
            // => ['name', 'car.model']

            const a = NotationGlob._inspect(globA);
            // console.log(' • ', globA, '=>', globsArray);

            let duplicate = false;
            let hasExactNeg = false;
            let negCoversNeg = false;
            let noPosCoversNeg = true;
            let posCoversPos = false;
            let noNegCoversPos = true;

            // inspect/compare the current glob with the rest of the array
            utils.eachRight(list, (globB, indexB) => {
                // don't inspect glob with itself
                if (indexB === indexA) return; // move to next
                log(globA, 'vs', globB);

                // (A) check if duplicate
                duplicate = globA === globB;

                const b = NotationGlob._inspect(globB);

                // (B) remove if positive has an exact negative
                // e.g. ['prop', '!prop'] => ['!prop']
                // negated wins when normalized
                if (_isExactNegated(b, a)) {
                    log(b.glob, 'is exact neg of', a.glob);
                    hasExactNeg = true;
                    return false; // break out
                }

                // (C) remove negated if:
                //    1) any negative covers it
                //       ['!a.b', '!a.*']  => '!a.b' is removed
                //    2) no positive covers it
                //       ['!a.b', 'a.c']   => '!a.b' is removed

                // (D) remove positive if:
                //    1) any positive covers it AND no negative covers it
                //       ['*', 'a.b']            => 'a.b' is removed
                //       ['*', 'a.b', '!a.*']    => 'a.b' is kept

                if (!covers(b, a)) {
                    // e.g. 'x.o' vs '!x.*.*'
                    if (!a.isNegated && b.isNegated && covers(b.absGlob, a)) {
                        normalized[a.glob] = true; // add
                        return false; // break out
                    }
                    return; // next
                }

                if (a.isNegated) {
                    if (b.isNegated) {
                        // don't count negCoversNeg if duplicate
                        negCoversNeg = !duplicate;
                        log('negCoversNeg', b.glob, 'covers', a.glob, negCoversNeg);
                    } else {
                        log('posCoversNeg »»»»', b.glob);
                        // don't count if current is exact negated
                        noPosCoversNeg = _isExactNegated(a, b); // set flag
                    }
                } else { // if (!insA.isNegated)
                    if (!b.isNegated) {
                        // don't count posCoversPos if duplicate
                        posCoversPos = !duplicate;
                        log('posCoversPos', b.glob, 'covers', a.glob, posCoversPos);
                    } else {
                        noNegCoversPos = false; // set flag
                    }
                }

            });

            if (a.isNegated) log('noPosCoversNeg', a.glob, noPosCoversNeg);
            else log('noNegCoversPos', a.glob, noNegCoversPos);

            const redundant = a.isNegated
                ? (negCoversNeg || noPosCoversNeg)
                : (posCoversPos && noNegCoversPos);

            if (!hasExactNeg && !redundant) {
                normalized[a.glob] = true; // add
            }

        });

        const n = Object.keys(normalized);

        // since negated wins in the same array, ['*', '!*'] is already reduced
        // to ['!*'] so we can safely remove !* if found, since it's redundant.
        // e.g. ['!*', 'name'] => ['name']
        let i = n.indexOf('!*');
        if (i >= 0) n.splice(i, 1);
        i = n.indexOf('![*]');
        if (i >= 0) n.splice(i, 1);

        return NotationGlob.sort(n);
    }

    static _compareUnion(globsListA, globsListB, union = []) {
        const { covers } = NotationGlob;
        function log(...args) {
            // console.log(...args);
        }

        utils.eachRight(globsListA, globA => {
            if (union.indexOf(globA) >= 0) return; // next

            const a = NotationGlob._inspect(globA);

            // if wildcard only, add...
            if (utils.re.WILDCARD.test(a.absGlob)) {
                union.push(a.glob); // push normalized glob
                return; // next
            }

            let notCovered = false;
            let hasExact = false;
            let negCoversNeg = false;
            let posCoversNeg = false;
            let posCoversPos = false;
            let negCoversPos = false;
            const negIntersections = [];

            log(globA);

            utils.eachRight(globsListB, globB => {

                // (A) keep if has exact in the other
                if (globA === globB) {
                    hasExact = true;
                    log('hasExact', globB, hasExact);
                    // return false; // break out
                }

                const b = NotationGlob._inspect(globB);

                // (B) keep if positive has an exact negated.
                // non-negated wins when union'ed
                // if (_isExactNegated(b, a)) {
                //     hasExactNeg = true;
                //     log('hasExactNeg', globB, hasExactNeg);
                //     // return false; // break out
                // } else
                // if (_isExactNegated(a, b)) {
                //     hasExactPos = true;
                //     return false; // break out
                // }

                // (C) keep negated if:
                //    1) any negative covers it
                //       '!a.b'  '!a.*']  => '!a.b' is removed
                //    2) no positive covers it
                //       ['!a.b', 'a.c']   => '!a.b' is removed

                // (D) keep positive if:
                //    1) no positive covers it OR any negative covers it
                //       ['*', 'a.b']            => 'a.b' is removed
                //       ['*', 'a.b', '!a.*']    => 'a.b' is kept

                notCovered = !covers(b, a);
                if (notCovered) {
                    log('notCovered', globB, notCovered);
                    if (a.isNegated && b.isNegated) {
                        const intersection = this._intersect(a.glob, b.glob);
                        if (intersection) negIntersections.push(intersection);
                    }
                    return; // next
                }

                if (a.isNegated) {
                    if (b.isNegated) {
                        negCoversNeg = !hasExact;
                        log('negCoversNeg', globB, negCoversNeg, b.glob, a.glob);
                    } else {
                        posCoversNeg = true; // set flag
                        log('posCoversNeg', globB, posCoversNeg);
                    }
                } else {
                    if (!b.isNegated) {
                        posCoversPos = !hasExact;
                        log('posCoversPos', globB, posCoversPos);
                    } else {
                        negCoversPos = true; // set flag
                        log('negCoversPos', globB, negCoversPos);
                    }
                }

            });


            const keep = a.isNegated
                ? (!posCoversNeg || negCoversNeg)
                : (!posCoversPos || negCoversPos);

            log('keep', a.glob, '=', hasExact || keep || (notCovered && !a.isNegated));
            log('--------');
            if (hasExact || keep || (notCovered && !a.isNegated)) {
                union.push(a.glob); // push normalized glob
                return;
            }

            if (a.isNegated && posCoversNeg && !negCoversNeg && negIntersections.length > 0) {
                union = union.concat(negIntersections); // eslint-disable-line no-param-reassign
            }

        });

        return union;
    }

    static union(globsA, globsB) {
        // same in both, remove B                   ['a'] ∪ ['a']           » ['a']
        // reverse of the other, remove negated     ['!a'] ∪ ['a']          » ['a']
        // pos+ A covers pos+ B, remove B           ['x.*'] ∪ ['x.y']       » ['x.*']
        // pos+ A covers neg- B, remove B           ['x.*'] ∪ ['!x.y']      » ['x.*']
        // neg- A covers pos+ B, remove A           ['!x.*'] ∪ ['x.y']      » ['x.y']
        // neg- A covers neg- B, remove A           ['!x.*'] ∪ ['!x.y']     » ['!x.y']

        // iterate right b, push to new, remove from b

        // both are negated,
        //      take intersection if can
        // both are positive,           » no need, normalized at the end
        //      check for covers
        // one negated, one pos,
        //      if negated covers pos
        //      if pos covers negated

        // so, only deal with negated?
        // if negated:
        //      is there any covering negated on other array? keep less restrictive
        //      can we take intersection with any negated on other?
        //      finally is there any covering pos. on other array?
        //      otherwise, keep as is.

        // KEEP negated IF
        //      1. there is a covering neg in the other
        //      2. no intersection with a neg in the other (if there are, add all intersections)
        //      3. no pos in other covers this neg
        // KEEP positive IF
        //      1. there is no covering pos in the other

        // ['*'] ∪ ['*', '!x.*', 'x.y'] » ['*']
        // A covers B2 but !B1 covers B2
        // ['*', '!*.z'] ∪ ['*', '!x.*'] » ['*', '!x.z'] » intersection if both negative and both covered by a pos in the other
        // ['*', '!*.z'] ∪ ['*', '!x.*', '!y.*'] » ['*', '!x.z', '!y.z'] » intersection if both negative and both covered by a pos in the other
        // ['*', '!a.*', '!*.z'] ∪ ['*', '!x.*'] » ['*', '!x.z'] » intersection if both negative
        // ['a.*', '!*.z'] ∪ ['x.*', '!*.y'] » ['a.*', 'x.*', '!a.z', '!x.y'] » intersection in same (normalize)
        // ['*.z'] ∪ ['*', '!x.*'] » ['*', '!x.*']
        // ['*', '!x.*', '!*.z'] ∪ ['!x.*', 'x.y'] » ['*', '!x.*', 'x.y']
        // ['!x.*', '*.z'] ∪ ['!x.*', 'x.y'] » ['!x.*', 'x.y', '*.z']
        // ['a.b', '*.z'] ∪ ['!x.*', 'x.y'] » ['*.z', 'a.b', '!x.*', 'x.y']
        // in the other array,
        //   +B » if no neg. covers B and any + covers remove B
        //   !B » if no neg. covers B

        // when + in the other array
        // if a negated covers it keep

        if (globsA.length === 0) return globsB.concat();
        if (globsB.length === 0) return globsA.concat();

        // const listA = NotationGlob.normalize(globsA);
        // const listB = NotationGlob.normalize(globsB);
        const listA = globsA;
        const listB = globsB;
        let union = NotationGlob._compareUnion(listA, listB);
        union = NotationGlob._compareUnion(listB, listA, union);

        // return NotationGlob.normalize(union);
        return union;
        // concat both arrays, normalize and sort so we get a nice union array.
        // const result = arrA.concat(arrB);
        // return NotationGlob.normalize(result);
    }

    /**
     *  Gets the union from the given couple of glob arrays and returns
     *  a new array of globs.
     *  <ul>
     *  <li>If the exact same element is found in both
     *  arrays, one of them is removed to prevent duplicates.
     *  <br />example: `['!id', 'name'] ∪ ['!id']` unites to `['!id', 'name']`</li>
     *  <li>If any non-negated item is covered by a glob in the same
     *  or other array, the redundant item is removed.
     *  <br />example: `['*', 'name'] ∪ ['email']` unites to `['*']`</li>
     *  <li>If one of the arrays contains a negated equivalent of an
     *  item in the other array, the negated item is removed.
     *  <br />example: `['!id'] ∪ ['id']` unites to `['id']`</li>
     *  <li>If any item covers/matches a negated item in the other array,
     *  the negated item is removed.
     *  <br />example #1: `['!user.id'] ∪ ['user.*']` unites to `['user.*']`
     *  <br />example #2: `['*'] ∪ ['!password']` unites to `['*']`
     *  </li>
     *  <li>So on... For a deeper understanding read the inline code
     *  documentation.</li>
     *  </ul>
     *  @name Notation.Glob.union
     *  @function
     *
     *  @param {Array} globsA - First array of glob strings.
     *  @param {Array} globsB - Second array of glob strings.
     *
     *  @returns {Array} -
     *
     *  @example
     *  const a = ['foo.bar', 'bar.baz', '!*.qux'];
     *  const b = ['!foo.bar', 'bar.qux', 'bar.baz'];
     *  const union = Notation.Glob.union(a, b);
     *  console.log(union);
     *  // ['!*.qux', 'foo.bar', 'bar.baz', 'bar.qux']
     */
    static union2(globsA, globsB) {
        // NOTE: The logic here is quite complex. For making this easier to
        // understand; below code is written a bit verbose. Do not modify this
        // only to make it shorter. This will already get minified.

        // -----------------------

        // if any of the arrays has a single glob item of only a wildcard (e.g.
        // `['*']`); this covers all, so...
        if (utils.hasSingleItemOf(globsA, '*') || utils.hasSingleItemOf(globsB, '*')) {
            return ['*'];
        }

        // clone arrays so we don't mutate the originals.
        const arrA = NotationGlob.normalize(globsA.concat());
        const arrB = NotationGlob.normalize(globsB.concat());

        let insA, insB;
        const { covers } = NotationGlob;

        // storage for tracking (winner) negated globs that are compared with
        // another negated in the other array. For example:
        // ['*', '!user.*'] ∪ ['*', '!user.id']
        // '!user.id' should be kept in the union when compared with '!user.*'.
        // but later, '!user.id' will be unioned with '*' in the other array
        // which will cover and remove '!user.id'. so we'll keep a storage for
        // to prevent this.
        const keepNegated = [];

        // iterate through array A
        utils.eachRight(arrA, (a, aIndex) => {
            if (arrB.length === 0) return false; // break out
            insA = NotationGlob._inspect(a);

            // iterate through array B for each item in A
            utils.eachRight(arrB, (b, bIndex) => {
                insB = NotationGlob._inspect(b);

                console.log('union', a, 'vs', b);

                if (insA.isNegated && !insB.isNegated) {
                    // if we have the non-negated version of the same glob in B,
                    // we'll remove item in A. In union, non-negated (or less
                    // restrictive) wins (unlike normalize — in normalize,
                    // negated wins within the same array).
                    if (insA.absGlob === insB.absGlob) {
                        arrA.splice(aIndex, 1);
                        console.log(`${a} removed: ${a} reverses ${b}`);
                        console.log(arrA, '∪', arrB);
                        return false; // break from B
                    }

                    // remove the negated from A only if the same value is not in B.
                    // e.g. 1)  ['!x.y'] ∪ ['x.*'] => ['x.*']
                    // e.g. 2)  ['!x.y'] ∪ ['x.*', '!x.y'] => ['x.*', '!x.y']
                    if (covers(insB.absGlob, insA.absGlob)
                            && arrB.indexOf(a) === -1
                            && keepNegated.indexOf(a) === -1) {
                        arrA.splice(aIndex, 1);
                        console.log(`${a} removed: ${b} covers ${a}`);
                        console.log(arrA, '∪', arrB);
                        return false; // break from B
                    }
                }

                if (!insA.isNegated && insB.isNegated) {
                    // if we have the non-negated version of the same glob in A,
                    // we'll remove item in B.
                    if (insA.absGlob === insB.absGlob) {
                        arrB.splice(bIndex, 1);
                        console.log(`${b} removed: ${b} reverses ${a}`);
                        console.log(arrA, '∪', arrB);
                        return; // move to next in B
                    }

                    // remove the negated from B only if the same value is not in A.
                    // e.g. 1)  ['!x.y'] ∪ ['x.*'] => ['x.*']
                    // e.g. 2)  ['!x.y'] ∪ ['x.*', '!x.y'] => ['x.*', '!x.y']
                    if (covers(insA, insB)
                            && arrA.indexOf(b) === -1
                            && keepNegated.indexOf(b) === -1) {
                        arrB.splice(bIndex, 1);
                        console.log(`${b} removed: ${a} covers ${b}`);
                        console.log(arrA, '∪', arrB);
                        return; // move to next in B
                    }
                }

                if (insA.isNegated && insB.isNegated) {
                    // if both A and B are negated and NOT equal, we'll check
                    // for coverage over one or the other.
                    if (a !== b) {
                        // if B covers A, we'll remove from A.
                        // e.g. '!user.*' covers '!user.id'
                        if (covers(insB, insA)) {
                            arrA.splice(aIndex, 1);
                            keepNegated.push(b);
                            console.log(`${a} removed: ${b} neg-covers ${a}`);
                            console.log(arrA, '∪', arrB);
                            return; // move to next in B
                        }
                        // if A covers B, we'll remove from B.
                        if (covers(insA, insB)) {
                            arrB.splice(bIndex, 1);
                            keepNegated.push(a);
                            console.log(`${b} removed: ${a} neg-covers ${b}`);
                            console.log(arrA, '∪', arrB);
                            return false; // break from B
                        }
                    }
                    // else, if they are equal, we'll not remove any bec. it
                    // means both arrays disalow that glob.
                }

                if (!insA.isNegated && !insB.isNegated) {
                    // if both A and B are NOT negated and equal, we'll remove
                    // from A.
                    if (a === b) {
                        arrA.splice(aIndex, 1);
                        console.log(`${a} removed: ${a} === ${b}`);
                        console.log(arrA, '∪', arrB);
                        return false;
                    }

                    // else -> (a !== b)

                    // Leave the rest to the normalizing process
                    // (Notation.Glob.normalize) bec. when both A and B are
                    // non-negated, the one which is covered by the other will
                    // be removed incorrectly.

                    // For example:
                    // ['!x.y'] ∪ ['x.*'] => ['x.*']
                    // ['*', '!x.*'] ∪ ['*', '!x.*', 'x.o']
                    // '*' in A will cover and remove 'x.o' in B incorrectly bec.
                    // 'x.o' is a remainder from '!x.*' which is both in A and B.

                    // So when this is left as is; the final union before
                    // normalizing is: ['*', '!x.*', '*', 'x.o']
                    // normalized to:  ['*', '!x.*', 'x.o']

                    // if (reB.test(insA.absGlob)) {
                    //     arrA.splice(aIndex, 1);
                    //     console.log(`${a} removed: ${b} covers ${a}`);
                    //     console.log(arrA, '∪', arrB);
                    //     return false;
                    // }
                    // if (reA.test(insB.absGlob)) {
                    //     arrB.splice(bIndex, 1);
                    //     console.log(`${b} removed: ${a} covers ${b}`);
                    //     console.log(arrA, '∪', arrB);
                    //     return;
                    // }
                }

            });
        });

        // concat both arrays, normalize and sort so we get a nice union array.
        const result = arrA.concat(arrB);
        return NotationGlob.normalize(result);
    }

}

// --------------------------------
// HELPERS
// --------------------------------

function _coversNote(a, b) {
    if (a === b) return true;
    // if (!a && re.WILDCARD.test(b)) return false;
    const bIsArr = b ? re.ARRAY_GLOB_NOTE.test(b) : null;
    if (a === '*' && (!b || !bIsArr)) return true;
    if (a === '[*]' && (!b || bIsArr)) return true;
    return false;
}

// x vs !x.*.* » false
// a vs !a[*] » true
// a[*] vs !a » true
function _isExactNegated(a, b) {
    if (a.isNegated === b.isNegated) return false;
    return (a.isNegated && (a.absGlob === b.glob || a.absGlob === b.glob + '.*' || a.absGlob === b.glob + '[*]'));
}

// --------------------------------
// EXPORT
// --------------------------------

export default NotationGlob;
