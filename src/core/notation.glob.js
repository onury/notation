import utils from '../utils';
import NotationError from './notation.error';

// http://www.linfo.org/wildcard.html
// http://en.wikipedia.org/wiki/Glob_%28programming%29
// http://en.wikipedia.org/wiki/Wildcard_character#Computing

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
     *
     *  @param {String} glob - The glob string.
     */
    constructor(glob) {
        if (!NotationGlob.isValid(glob)) {
            throw new NotationError('Invalid notation glob: "' + glob + '"');
        }

        let ng = NotationGlob.inspect(glob);
        this._ = {
            glob,
            absGlob: ng.absGlob,
            isNegated: ng.isNegated,
            regexp: NotationGlob.toRegExp(ng.absGlob),
            levels: ng.absGlob.split('.')
        };
    }

    // --------------------------------
    // NotationGlob Instance Properties
    // --------------------------------

    /**
     *  Gets the original glob notation string.
     *  @name Notation.Glob#glob
     *  @type {String}
     */
    get glob() {
        return this._.glob;
    }

    /**
     *  Gets the absolute glob notation (without the preceeding bang `!`).
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
     *  Note that the negation (`!`) is ignored, if any.
     *  @name Notation.Glob#regexp
     *  @type {RegExp}
     */
    get regexp() {
        return this._.regexp;
    }

    /**
     *  List of notes/levels of this glob notation.
     *  @name Notation.Glob#notes
     *  @alias Notation.Glob#levels
     *  @type {Array}
     */
    get notes() {
        return this._.levels;
    }
    /**
     *  Alias of `Notation.Glob#notes`.
     *  @private
     */
    get levels() {
        return this._.levels;
    }

    // --------------------------------
    // NotationGlob Instance Methods
    // --------------------------------

    /**
     *  Checks whether the given notation value matches the source notation glob.
     *  @name Notation.Glob#test
     *  @function
     *
     *  @param {String} notation - The notation string to be tested.
     *
     *  @returns {Boolean}
     *
     *  @example
     *  const glob = new Notation.Glob('!prop.*.name');
     *  glob.test("prop.account.name"); // true
     */
    test(notation) {
        // we allow '*' to match everything. We check for this here
        // instead of the regexp bec. we care for dots (.) within the glob.
        return this.absGlob === '*'
            || (this.absGlob !== '' && notation !== '' && this.regexp.test(notation));
    }

    // --------------------------------
    // NotationGlob Static Members
    // --------------------------------

    /**
     *  Basically constructs a new `NotationGlob` instance
     *  with the given glob string.
     *  @name Notation.Glob.create
     *  @function
     *
     *  @param {String} glob - The source notation glob.
     *
     *  @returns {NotationGlob}
     *
     *  @example
     *  const glob = Notation.Glob.create(strGlob);
     *  // equivalent to:
     *  const glob = new Notation.Glob(strGlob);
     */
    static create(glob) {
        return new NotationGlob(glob);
    }

    /**
     *  Gets a regular expressions instance from the given glob notation.
     *  Note that the bang `!` prefix will be ignored if the given glob is negated.
     *  @name Notation.Glob.toRegExp
     *  @function
     *
     *  @param {String} glob - Glob notation to be converted.
     *
     *  @returns {RegExp}
     */
    static toRegExp(glob) {
        if (glob.indexOf('!') === 0) glob = glob.slice(1);
        // Modified from http://stackoverflow.com/a/13818704/112731
        glob = utils.pregQuote(glob)
            .replace(/\\\*/g, '[^\\s\\.]*')
            .replace(/\\\?/g, '.');
        return new RegExp('^' + glob + '(\\.|\\[.+|$)');
        // it should either end ($) or continue with a dot. So for example,
        // `company.*` will produce `/^company\.[^\s\.]*/` which will match both
        // `company.name` and `company.address.street` but will not match
        // `some.company.name`. Also `!password` will not match `!password_reset`.
    }

    /**
     *  @private
     */
    static inspect(glob) {
        let bang = glob.slice(0, 1) === '!';
        glob = bang ? glob.slice(1) : glob;
        return {
            absGlob: glob,
            isNegated: bang
        };
    }

    // Created test at: https://regex101.com/r/tJ7yI9/4
    // regex from https://github.com/BenoitRanque/notation
    /**
     *  Validates the given notation glob.
     *  @name Notation.Glob.isValid
     *  @function
     *
     *  @param {String} glob - Notation glob to be validated.
     *  @returns {Boolean}
     */
    static isValid(glob) {
        return (typeof glob === 'string')
            && (/^(!?([^\s.!*\[\]]+|\*)((\.([^\s.!*\[\]]+|\*))|(\[([0-9]+|\*)\]))*)$/).test(glob);
    }

    /**
     *  Compares two given notation globs and returns an integer value as a
     *  result. This is generally used to sort glob arrays. Loose globs (with
     *  stars especially closer to beginning of the glob string) and globs
     *  representing the parent/root of the compared property glob come first.
     *  Verbose/detailed/exact globs come last. (`* < *abc < abc`).
     *
     *  For instance; `store.address` comes before `store.address.street`. So
     *  this works both for `*, store.address.street, !store.address` and `*,
     *  store.address, !store.address.street`. For cases such as `prop.id` vs
     *  `!prop.id` which represent the same property; the negated glob wins
     *  (comes last).
     *  @name Notation.Glob.compare
     *  @function
     *
     *  @param {String} a - First notation glob to be compared.
     *  @param {String} b - Second notation glob to be compared.
     *
     *  @returns {Number} - Returns `-1` if `a` comes first, `1` if `b` comes
     *  first and `0` if equivalent priority.
     *
     *  @example
     *  let result = Notation.Glob.compare('prop.*.name', 'prop.*');
     *  console.log(result); // 1
     */
    static compare(a, b) {
        // trivial case, both are exactly the same!
        if (a === b) return 0;
        let levelsA = a.split('.'),
            levelsB = b.split('.');
        // Check depth (number of levels)
        if (levelsA.length === levelsB.length) {
            // count wildcards (assuming more wildcards comes first)
            let wild = /(?:^|\.)\*(?:$|\.)/g,
                mA = a.match(wild),
                mB = b.match(wild),
                wildA = mA ? mA.length : 0,
                wildB = mB ? mB.length : 0;
            if (wildA === wildB) {
                // check for negation
                let negA = a.indexOf('!') === 0,
                    negB = b.indexOf('!') === 0;
                if (negA === negB) {
                    // both are negated or neither are, just return alphabetical
                    return a < b ? -1 : 1;
                }
                // compare without the negatation
                let nonNegA = negA ? a.slice(1) : a,
                    nonNegB = negB ? b.slice(1) : b;
                if (nonNegA === nonNegB) {
                    return negA ? 1 : -1;
                }
                return nonNegA < nonNegB ? -1 : 1;
            }
            return wildA > wildB ? -1 : 1;
        }

        return levelsA.length < levelsB.length ? -1 : 1;
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
     *
     *  @param {Array} globsArray - The notation globs array to be sorted. The
     *  passed array reference is modified.
     *
     *  @returns {Array}
     *
     *  @example
     *  const globs = ['!prop.*.name', 'prop.*', 'prop.id'];
     *  const sorted = Notation.Glob.sort(globs);
     *  console.log(sorted);
     *  // ['prop.*', 'prop.id', '!prop.*.name'];
     */
    static sort(globsArray) {
        return globsArray.sort(NotationGlob.compare);
        // return _mergeSortArray(globsArray, NotationGlob.compare);
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
     *
     *  @param {Array} globsArray - Notation globs array to be normalized.
     *
     *  @returns {Array}
     *
     *  @example
     *  const globs = ['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'age'];
     *  const normalized = Notation.Glob.normalize(globs);
     *  console.log(normalized);
     *  // ['*', '!car.*', '!id', 'car.model']
     */
    static normalize(globsArray) {
        globsArray = utils.ensureArray(globsArray).map(item => item.trim());
        globsArray = NotationGlob.sort(globsArray);

        utils.eachRight(globsArray, (globA, indexA) => {

            // example #1:
            // ['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name']
            // => ['*', '!id', '!car.*', 'car.model']

            // example #2:
            // ['!id', 'name', 'car.model', '!car.*', 'id', '!email']
            // => ['!car.*', 'car.model', 'name']

            let insA = NotationGlob.inspect(globA);
            // console.log(' • ', globA, '=>', globsArray);

            let duplicate = false;
            let hasExactNegative = false;
            let negCoversNeg = false;
            let noPosCoversNeg = true;
            let posCoversPos = false;
            let noNegCoversPos = true;

            // inspect/compare the current glob with the rest of the array
            utils.eachRight(globsArray, (globB, indexB) => {
                // don't inspect glob with itself
                if (indexB === indexA) return; // no break, move to next

                let insB = NotationGlob.inspect(globB);
                let reB = NotationGlob.toRegExp(insB.absGlob);

                // console.log(globA, 'vs', globB);

                // (A) remove if duplicate
                if (globA === globB) {
                    duplicate = true;
                    return false; // break
                }

                // (B) remove if positive has an exact negative
                // e.g. ['prop', '!prop'] => ['!prop']
                // negated wins when normalized
                if (insB.isNegated && globA === insB.absGlob) {
                    hasExactNegative = true;
                    return false; // break
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

                if (insA.isNegated) {
                    if (insB.isNegated && reB.test(insA.absGlob)) {
                        negCoversNeg = true;
                        return false; // break
                    } else if (noPosCoversNeg && reB.test(insA.absGlob)) {
                        noPosCoversNeg = false;
                    }
                } else { // if (!insA.isNegated)
                    if (!insB.isNegated && reB.test(insA.absGlob)) {
                        posCoversPos = true;
                    } else if (noNegCoversPos && reB.test(insA.absGlob)) {
                        noNegCoversPos = false;
                    }
                }

            });

            let redundant = insA.isNegated
                ? (negCoversNeg || noPosCoversNeg)
                : (posCoversPos && noNegCoversPos);

            if (duplicate || hasExactNegative || redundant) {
                // remove the current (at the end)
                globsArray.splice(indexA, 1);
            }

        });

        // since negated wins in the same array, ['*', '!*'] is already reduced
        // to ['!*'] so we can safely remove !* if found, since it's redundant.
        // e.g. ['!*', 'name'] => ['name']
        let i = globsArray.indexOf('!*');
        if (i >= 0) globsArray.splice(i, 1);

        return globsArray;
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
     *  <li>So on... For a better understanding read the inline code
     *  documentation.</li>
     *  </ul>
     *  @name Notation.Glob.union
     *  @function
     *
     *  @param {Array} globsA - First array of glob strings.
     *  @param {Array} globsB - Second array of glob strings.
     *
     *  @returns {Array}
     *
     *  @example
     *  const a = ['foo.bar', 'bar.baz', '!*.qux'];
     *  const b = ['!foo.bar', 'bar.qux', 'bar.baz'];
     *  const union = Notation.Glob.union(a, b);
     *  console.log(union);
     *  // ['!*.qux', 'foo.bar', 'bar.baz', 'bar.qux']
     */
    static union(globsA, globsB) {
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
        const arrA = globsA.concat();
        const arrB = globsB.concat();
        // no need to normalize. we'll do it at the end.

        let reA, reB, insA, insB;

        // storage for tracking (winner) negated globs that are compared with
        // another negated in the other array. For example:
        // ['*', '!user.*'] ∪ ['*', '!user.id']
        // '!user.id' should be kept in the union when compared with '!user.*'.
        // but later, '!user.id' will be unioned with '*' in the other array
        // which will cover and remove '!user.id'. so we'll keep a storage for
        // to prevent this.
        let keepNegated = [];

        // iterate through array A
        utils.eachRight(arrA, (a, aIndex) => {
            insA = NotationGlob.inspect(a);
            reA = NotationGlob.toRegExp(insA.absGlob);

            // iterate through array B for each item in A
            utils.eachRight(arrB, (b, bIndex) => {
                insB = NotationGlob.inspect(b);
                reB = NotationGlob.toRegExp(insB.absGlob);

                // console.log(a, 'vs', b);

                if (insA.isNegated && !insB.isNegated) {
                    // if we have the non-negated version of the same glob in B,
                    // we'll remove item in A. In union, non-negated wins
                    // (unlike normalize — in normalize, negated wins within the
                    // same array).
                    if (insA.absGlob === insB.absGlob) {
                        arrA.splice(aIndex, 1);
                        // console.log(`${a} removed: ${a} reverses ${b}`);
                        // console.log(arrA, '∪', arrB);
                        return false; // break from B
                    }

                    // remove the negated from A only if the same value is not in B.
                    // e.g. 1)  ['!x.y'] ∪ ['x.*'] => ['x.*']
                    // e.g. 2)  ['!x.y'] ∪ ['x.*', '!x.y'] => ['x.*', '!x.y']
                    if (reB.test(insA.absGlob) && arrB.indexOf(a) === -1 && keepNegated.indexOf(a) === -1) {
                        arrA.splice(aIndex, 1);
                        // console.log(`${a} removed: ${b} covers ${a}`);
                        // console.log(arrA, '∪', arrB);
                        return false; // break from B
                    }
                }

                if (!insA.isNegated && insB.isNegated) {
                    // if we have the non-negated version of the same glob in A,
                    // we'll remove item in B.
                    if (insA.absGlob === insB.absGlob) {
                        arrB.splice(bIndex, 1);
                        // console.log(`${b} removed: ${b} reverses ${a}`);
                        // console.log(arrA, '∪', arrB);
                        return; // move to next in B
                    }

                    // remove the negated from B only if the same value is not in A.
                    // e.g. 1)  ['!x.y'] ∪ ['x.*'] => ['x.*']
                    // e.g. 2)  ['!x.y'] ∪ ['x.*', '!x.y'] => ['x.*', '!x.y']
                    if (reA.test(insB.absGlob) && arrA.indexOf(b) === -1 && keepNegated.indexOf(b) === -1) {
                        arrB.splice(bIndex, 1);
                        // console.log(`${b} removed: ${a} covers ${b}`);
                        // console.log(arrA, '∪', arrB);
                        return; // move to next in B
                    }
                }

                if (insA.isNegated && insB.isNegated) {
                    // if both A and B are negated and NOT equal, we'll check
                    // for coverage over one or the other.
                    if (a !== b) {
                        // if B covers A, we'll remove from B.
                        // e.g. '!user.*' covers '!user.id'
                        if (reB.test(insA.absGlob)) {
                            arrB.splice(bIndex, 1);
                            keepNegated.push(a);
                            // console.log(`${b} removed: ${a} neg-covers ${b}`);
                            // console.log(arrA, '∪', arrB);
                            return; // move to next in B
                        }
                        // if A covers B, we'll remove from A.
                        if (reA.test(insB.absGlob)) {
                            arrA.splice(aIndex, 1);
                            keepNegated.push(b);
                            // console.log(`${a} removed: ${b} neg-covers ${a}`);
                            // console.log(arrA, '∪', arrB);
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
                        // console.log(`${a} removed: ${a} === ${b}`);
                        // console.log(arrA, '∪', arrB);
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

export default NotationGlob;
