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
        return NotationGlob._covers(this, notation);
    }

    /**
     *  Specifies whether this glob notation can represent (or cover) the given
     *  glob notation. Note that negation prefix is ignored, if any.
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
        return NotationGlob._covers(this, glob);
    }

    /**
     *  Gets the intersection of this and the given glob notations. When
     *  restrictive, if any one of them is negated, the outcome is negated.
     *  Otherwise, only if both of them are negated, the outcome is negated.
     *  @param {String} glob - Second glob to be used.
     *  @param {Boolean} [restrictive=false] - Whether the intersection should
     *  be negated when one of the globs is negated.
     *  @returns {String} - Intersection notation if any; otherwise `null`.
     *  @example
     *  const glob = Notation.Glob.create;
     *  glob('x.*').intersect('!*.y')         // 'x.y'
     *  glob('x.*').intersect('!*.y', true)   // '!x.y'
     */
    intersect(glob, restrictive = false) {
        return NotationGlob._intersect(this.glob, glob, restrictive);
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
        return typeof glob === 'string' && reVALIDATOR.test(glob);
    }

    /**
     *  Specifies whether the given glob notation includes any valid wildcards
     *  or negation bang prefix.
     *  @param {String} glob - Glob notation to be checked.
     *  @returns {Boolean} -
     */
    static hasMagic(glob) {
        console.log('NotationGlob.isValid', glob, NotationGlob.isValid(glob));
        console.log('re.WILDCARDS.test', glob, re.WILDCARDS.test(glob));
        console.log('glob[0] === !', glob, glob[0] === '!');
        return NotationGlob.isValid(glob)
            && (re.WILDCARDS.test(glob) || glob[0] === '!');
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
     *  @private
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
    static _covers(globA, globB) {
        const a = typeof globA === 'string'
            ? new NotationGlob(globA)
            : globA; // assume (globA instanceof NotationGlob || utils.type(globA) === 'object')

        const b = typeof globB === 'string'
            ? new NotationGlob(globB)
            : globB;

        const notesA = a.notes || NotationGlob.split(a.absGlob);
        const notesB = b.notes || NotationGlob.split(b.absGlob);

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

    /**
     *  Gets the intersection notation of two glob notations. When restrictive,
     *  if any one of them is negated, the outcome is negated. Otherwise, only
     *  if both of them are negated, the outcome is negated.
     *  @private
     *  @param {String} globA - First glob to be used.
     *  @param {String} globB - Second glob to be used.
     *  @param {Boolean} [restrictive=false] - Whether the intersection should
     *  be negated when one of the globs is negated.
     *  @returns {String} - Intersection notation if any; otherwise `null`.
     *  @example
     *  _intersect('!*.y', 'x.*', false)     // 'x.y'
     *  _intersect('!*.y', 'x.*', true)      // '!x.y'
     */
    static _intersect(globA, globB, restrictive = false) {
        // const bang = restrictive
        //     ? (globA[0] === '!' || globB[0] === '!' ? '!' : '')
        //     : (globA[0] === '!' && globB[0] === '!' ? '!' : '');

        const notesA = NotationGlob.split(globA, true);
        const notesB = NotationGlob.split(globB, true);

        let bang;
        if (restrictive) {
            bang = globA[0] === '!' || globB[0] === '!' ? '!' : '';
        } else {
            if (globA[0] === '!' && globB[0] === '!') {
                bang = '!';
            } else {
                bang = ((notesA.length > notesB.length && globA[0] === '!')
                        || (notesB.length > notesA.length && globB[0] === '!'))
                    ? '!'
                    : '';
            }
        }

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
        if (!NotationGlob.isValid(g)) {
            throw new NotationError(`${ERR_INVALID} '${glob}'`);
        }
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
     *  @example
     *  Notation.Glob.split('*.list[2].value')  // ['*', 'list', '[2]', 'value']
     *  // you can get the same result from the .notes property of a Notation.Glob instance.
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
     *  compare('*', 'info.user')               // -1
     *  compare('*', '[*]')                     // 0
     *  compare('info.*.name', 'info.user')     // 1
     */
    static compare(globA, globB) {
        // trivial case, both are exactly the same!
        // or both are wildcard e.g. `*` or `[*]`
        if (globA === globB || (re.WILDCARD.test(globA) && re.WILDCARD.test(globB))) return 0;

        const { split, _inspect } = NotationGlob;

        const a = _inspect(globA);
        const b = _inspect(globB);
        const notesA = split(a.absGlob);
        const notesB = split(b.absGlob);

        // Check depth (number of levels)
        if (notesA.length === notesB.length) {
            // count wildcards
            const wildCountA = (a.absGlob.match(re.WILDCARDS) || []).length;
            const wildCountB = (b.absGlob.match(re.WILDCARDS) || []).length;
            if (wildCountA === wildCountB) {
                // check for negation
                if (!a.isNegated && b.isNegated) return -1;
                if (a.isNegated && !b.isNegated) return 1;
                // both are negated or neither are, return alphabetical
                return a.absGlob < b.absGlob ? -1 : (a.absGlob > b.absGlob ? 1 : 0);
            }
            return wildCountA > wildCountB ? -1 : 1;
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
     *  @param {Array} globList - The notation globs array to be sorted. The
     *  passed array reference is modified.
     *  @returns {Array} -
     *
     *  @example
     *  const { sort } = Notation.Glob;
     *  sort(['!prop.*.name', 'prop.*', 'prop.id'])
     *  // ['prop.*', 'prop.id', '!prop.*.name'];
     */
    static sort(globList) {
        return globList.sort(NotationGlob.compare);
    }

    /**
     *  Normalizes the given notation globs array by removing duplicate or
     *  redundant items, eliminating extra verbosity (also with intersection
     *  globs) and returns a priority-sorted globs array.
     *
     *  <ul>
     *  <li>If any exact duplicates found, all except first is removed.
     *  <br />example: `['car', 'dog', 'car']` normalizes to `['car', 'dog']`.</li>
     *  <li>If both normal and negated versions of a glob are found, negated wins.
     *  <br />example: `['*', 'id', '!id']` normalizes to `['*', '!id']`.</li>
     *  <li>If a glob is covered by another, it's removed.
     *  <br />example: `['car.*', 'car.model']` normalizes to `['car']`.</li>
     *  <li>If a negated glob is covered by another glob, it's kept.
     *  <br />example: `['*', 'car', '!car.model']` normalizes as is.</li>
     *  <li>If a negated glob is not covered by another or it does not cover any other;
     *  then we check for for intersection glob. If found, adds them to list;
     *  removes the original negated.
     *  <br />example: `['car.*', '!*.model']` normalizes as to `['car', '!car.model']`.</li>
     *  <li>In restrictive mode; if a glob is covered by another negated glob, it's removed.
     *  Otherwise, it's kept.
     *  <br />example: `['*', '!car.*', 'car.model']` normalizes to `['*', '!car']` if restrictive.</li>
     *  </ul>
     *  @name Notation.Glob.normalize
     *  @function
     *  @param {Array} globList - Notation globs array to be normalized.
     *  @param {Boolean} [restrictive=false] - Whether negated items strictly
     *  remove every match. Note that, regardless of this option, if any item has an
     *  exact negated version; non-negated is always removed.
     *  @returns {Array} -
     *
     *  @throws {NotationError} - If any item in globs list is invalid.
     *
     *  @example
     *  const { normalize } = Notation.Glob;
     *  const globs = ['*', '!id', 'name', '!car.model', 'car.*', 'id', 'name'];
     *  normalize(globs)                            // ['*', '!id', '!car.model']
     *  normalize(['!*.id', 'user.*', 'company'])   // ['company', 'user', '!company.id', '!user.id']
     */
    static normalize(globList, restrictive = false) {
        const { _inspect, _covers, _intersect } = NotationGlob;

        const original = utils.ensureArray(globList);

        const list = original
            // prevent mutation
            .concat()
            // move negated globs to top so that we inspect non-negated globs
            // against others first. when complete, we'll sort with our
            // .compare() function.
            .sort(restrictive ? _negFirstSort : _negLastSort)
            // turning string array into inspect-obj array, so that we'll not
            // run _inspect multiple times in the inner loop. this also
            // pre-validates each glob.
            .map(_inspect);

        // early return if we have a single item
        if (list.length === 1) {
            const g = list[0];
            // single negated item is redundant
            if (g.isNegated) return [];
            // return normalized
            return [g.glob];
        }

        // flag to return an empty array (in restrictive mode), if true.
        let negateAll = false;

        // we'll push keepers in this array
        let normalized = [];
        // we'll need to remember excluded globs, so that we can move to next
        // item early.
        const ignored = {};

        // storage to keep intersections.
        // using an object to prevent duplicates.
        let intersections = {};

        const checkAddIntersection = (gA, gB) => {
            const inter = _intersect(gA, gB, restrictive);
            if (!inter) return;
            // if the intersection result has an inverted version in the
            // original list, don't add this.
            const hasInverted = restrictive ? false : original.indexOf(_invert(inter)) >= 0;
            // also if intersection result is in the current list, don't add it.
            if (list.indexOf(inter) >= 0 || hasInverted) return;
            intersections[inter] = inter;
        };

        // iterate each glob by comparing it to remaining globs.
        utils.eachRight(list, (a, indexA) => {

            // if `strict` is enabled, return empty if a negate-all is found
            // (which itself is also redundant if single): '!*' or '![*]'
            if (re.NEGATE_ALL.test(a.glob)) {
                negateAll = true;
                if (restrictive) return false;
            }

            // flags
            let duplicate = false;
            let hasExactNeg = false;
            // flags for negated
            let negCoversPos = false;
            let negCoveredByPos = false;
            let negCoveredByNeg = false;
            // flags for non-negated (positive)
            let posCoversPos = false;
            let posCoveredByNeg = false;
            let posCoveredByPos = false;

            utils.eachRight(list, (b, indexB) => {
                // don't inspect glob with itself
                if (indexA === indexB) return; // move to next
                // console.log(indexA, a.glob, 'vs', b.glob);

                // remove if duplicate
                if (a.glob === b.glob) {
                    list.splice(indexA, 1);
                    duplicate = true;
                    return false; // break out
                }

                // remove if positive has an exact negated (negated wins when
                // normalized) e.g. ['*', 'a', '!a'] => ['*', '!a']
                if (!a.isNegated && _isReverseOf(a, b)) {
                    // list.splice(indexA, 1);
                    ignored[a.glob] = true;
                    hasExactNeg = true;
                    return false; // break out
                }

                // if already excluded b, go on to next
                if (ignored[b.glob]) return; // next

                const coversB = _covers(a, b);
                const coveredByB = coversB ? false : _covers(b, a);
                if (a.isNegated) {
                    if (b.isNegated) {
                        // if negated (a) covered by any other negated (b); remove (a)!
                        if (coveredByB) {
                            negCoveredByNeg = true;
                            // list.splice(indexA, 1);
                            ignored[a.glob] = true;
                            return false; // break out
                        }
                    } else {
                        /* istanbul ignore if */
                        if (coversB) negCoversPos = true;
                        if (coveredByB) negCoveredByPos = true;
                        // try intersection if none covers the other and only
                        // one of them is negated.
                        if (!coversB && !coveredByB) {
                            checkAddIntersection(a.glob, b.glob);
                        }
                    }
                } else {
                    if (b.isNegated) {
                        // if positive (a) covered by any negated (b); remove (a)!
                        if (coveredByB) {
                            posCoveredByNeg = true;
                            if (restrictive) {
                                // list.splice(indexA, 1);
                                ignored[a.glob] = true;
                                return false; // break out
                            }
                            return; // next
                        }
                        // try intersection if none covers the other and only
                        // one of them is negated.
                        if (!coversB && !coveredByB) {
                            checkAddIntersection(a.glob, b.glob);
                        }
                    } else {
                        if (coversB) posCoversPos = coversB;
                        // if positive (a) covered by any other positive (b); remove (a)!
                        if (coveredByB) {
                            posCoveredByPos = true;
                            if (restrictive) {
                                // list.splice(indexA, 1);
                                return false; // break out
                            }
                        }
                    }
                }

            });

            // const keepNeg = (negCoversPos || negCoveredByPos) && !negCoveredByNeg;
            const keepNeg = restrictive
                ? (negCoversPos || negCoveredByPos) && negCoveredByNeg === false
                : negCoveredByPos && negCoveredByNeg === false;
            const keepPos = restrictive
                ? (posCoversPos || posCoveredByPos === false) && posCoveredByNeg === false
                : posCoveredByNeg || posCoveredByPos === false;
            const keep = duplicate === false
                && hasExactNeg === false
                && (a.isNegated ? keepNeg : keepPos);

            if (keep) {
                normalized.push(a.glob);
            } else {
                // this is excluded from final (normalized) list, so mark as
                // ignored (don't remove from "list" for now)
                ignored[a.glob] = true;
            }
        });

        if (restrictive && negateAll) return [];

        intersections = Object.keys(intersections);
        if (intersections.length > 0) {
            // merge normalized list with intersections if any
            normalized = normalized.concat(intersections);
            // we have new (intersection) items, so re-normalize
            return NotationGlob.normalize(normalized, restrictive);
        }

        return NotationGlob.sort(normalized);
    }

    /**
     *  Undocumented. See `.union()`
     *  @private
     *  @param {Array} globsListA -
     *  @param {Array} globsListB -
     *  @param {Array} union -
     *  @returns {Array} -
     */
    static _compareUnion(globsListA, globsListB, restrictive, union = []) {
        const { _covers } = NotationGlob;

        const { _inspect, _intersect } = NotationGlob;

        utils.eachRight(globsListA, globA => {
            if (union.indexOf(globA) >= 0) return; // next

            const a = _inspect(globA);

            // if wildcard only, add...
            if (re.WILDCARD.test(a.absGlob)) {
                union.push(a.glob); // push normalized glob
                return; // next
            }

            let notCovered = false;
            let hasExact = false;
            let negCoversNeg = false;
            let posCoversNeg = false;
            let posCoversPos = false;
            let negCoversPos = false;

            const intersections = [];

            utils.eachRight(globsListB, globB => {

                // keep if has exact in the other
                if (globA === globB) hasExact = true;

                const b = _inspect(globB);

                // keep negated if:
                //    1) any negated covers it
                //    2) no positive covers it
                // keep positive if:
                //    1) no positive covers it OR any negated covers it

                notCovered = !_covers(b, a);
                if (notCovered) {
                    if (a.isNegated && b.isNegated) {
                        const inter = _intersect(a.glob, b.glob, restrictive);
                        if (inter && union.indexOf(inter) === -1) intersections.push(inter);
                    }
                    return; // next
                }

                if (a.isNegated) {
                    if (b.isNegated) {
                        negCoversNeg = !hasExact;
                    } else {
                        posCoversNeg = true; // set flag
                    }
                } else {
                    if (!b.isNegated) {
                        posCoversPos = !hasExact;
                    } else {
                        negCoversPos = true; // set flag
                    }
                }

            });


            const keep = a.isNegated
                ? (!posCoversNeg || negCoversNeg)
                : (!posCoversPos || negCoversPos);

            if (hasExact || keep || (notCovered && !a.isNegated)) {
                union.push(a.glob); // push normalized glob
                return;
            }

            if (a.isNegated && posCoversNeg && !negCoversNeg && intersections.length > 0) {
                union = union.concat(intersections); // eslint-disable-line no-param-reassign
            }

        });

        return union;
    }

    /**
     *  Gets the union from the given couple of glob arrays and returns a new
     *  array of globs.
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
     *  <br />example #1: `['!user.id'] ∪ ['user.*']` unites to `['user']`
     *  <br />example #2: `['*'] ∪ ['!password']` unites to `['*']`
     *  </li>
     *  </ul>
     *  @name Notation.Glob.union
     *  @function
     *
     *  @param {Array} globsA - First array of glob strings.
     *  @param {Array} globsB - Second array of glob strings.
     *  @param {Boolean} [restrictive=false] - Whether negated items in each of
     *  the lists, strictly remove every match in themselves (not the cross
     *  list). This option is used when pre-normalizing each glob list and
     *  normalizing the final union list.
     *
     *  @returns {Array} -
     *
     *  @example
     *  const a = ['user.*', '!user.email', 'car.model', '!*.id'];
     *  const b = ['!*.date', 'user.email', 'car', '*.age'];
     *  const { union } = Notation.Glob;
     *  union(a, b)     // ['car', 'user', '*.age', '!car.date', '!user.id']
     */
    static union(globsA, globsB, restrictive) {
        const { normalize, _compareUnion } = NotationGlob;

        const listA = normalize(globsA, restrictive);
        const listB = normalize(globsB, restrictive);

        if (listA.length === 0) return listB;
        if (listB.length === 0) return listA;

        // TODO: below should be optimized
        let union = _compareUnion(listA, listB, restrictive);
        union = _compareUnion(listB, listA, restrictive, union);
        return normalize(union, restrictive);
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

// x vs !x.*.*      » false
// x vs !x[*]       » true
// x[*] vs !x       » true
// x[*] vs !x[*]    » false
// x.* vs !x.*      » false
function _isReverseOf(a, b) {
    return a.isNegated !== b.isNegated
        && a.absGlob === b.absGlob;
}

function _invert(glob) {
    return glob[0] === '!' ? glob.slice(1) : '!' + glob;
}

const _rx = /^\s*!/;
function _negFirstSort(a, b) {
    return _rx.test(a) ? -1 : (_rx.test(b) ? 1 : 0);
}
function _negLastSort(a, b) {
    return _rx.test(a) ? 1 : (_rx.test(b) ? -1 : 0);
}

// --------------------------------
// EXPORT
// --------------------------------

export default NotationGlob;
