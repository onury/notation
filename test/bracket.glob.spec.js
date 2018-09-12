/* eslint camelcase:0, no-sparse-arrays:0 */

'use strict';

const Notation = require('../lib/notation');
const _ = require('lodash');

describe('Test Suite: Array/Bracket glob notation', () => {

    it('Notation.Glob .isValid()', () => {
        const isValid = Notation.Glob.isValid;
        expect(isValid('a[0][1][2].*')).toEqual(true);
        expect(isValid('a.b[*].x')).toEqual(true);
        expect(isValid('a.b[3]')).toEqual(true);
        expect(isValid('a.*[*]')).toEqual(true);
        expect(isValid('a.*[*].*')).toEqual(true);
        expect(isValid('a.*[1]')).toEqual(true);
        expect(isValid('a.*.c[1]')).toEqual(true);
        expect(isValid('a.*.c[1]')).toEqual(true);
        expect(isValid('a.*[*][0].c')).toEqual(true);
    });

    it('Notation.Glob .normalize()', () => {
        const normalize = Notation.Glob.normalize;
        expect(normalize(['a[*]', '!a[*]'])).toEqual(['!a[*]']);
        expect(normalize(['a[*]', '!a[0][1][2]'])).toEqual(['a[*]', '!a[0][1][2]']);
        expect(normalize(['a[4]', 'a[*]'])).toEqual(['a[*]']);
        expect(normalize(['a.*', 'a.*[*]'])).toEqual(['a.*']);
        expect(normalize(['a.*', 'a.*[2]'])).toEqual(['a.*']);
        expect(normalize(['a.b', 'a.*[*]', 'a.c[2].*'])).toEqual(['a.*[*]', 'a.b']);

        expect(normalize(['!a.*', 'a'])).toEqual(['a', '!a.*']);
        expect(normalize(['!a[*]', 'a'])).toEqual(['a', '!a[*]']);

        expect(normalize(['!x', 'c[1]', '!c[*]', '*', '!d.e']))
            .toEqual(['*', '!c[*]', 'c[1]', '!x', '!d.e']);

        expect(normalize(['!y[*]', 'x.x[1][0][*]', '*.x[*]', '!x.x[2][*]', 'a.b', 'c[*][1]']))
            .toEqual(['c[*][1]', '*.x[*]', 'a.b', '!x.x[2][*]']);
    });

    it('Notation.Glob .compare()', () => {
        const compare = Notation.Glob.compare;
        expect(compare('a.*', 'a.b[1]')).toEqual(-1);
        expect(compare('a.b', 'a[*]')).toEqual(1);
        expect(compare('a.b[3]', 'a.b[2]')).toEqual(1);
        expect(compare('a.*[*]', 'a.*')).toEqual(1);
        expect(compare('a.*[1]', 'a.*[*]')).toEqual(1);
        expect(compare('a.*.c[1]', 'a.*.c[*]')).toEqual(1);
        expect(compare('a.*.c[1]', 'a.*.c')).toEqual(1);
        expect(compare('a.*.c', 'a.*.c[*]')).toEqual(-1);
    });

    it('Notation.Glob .union()', () => {
        const union = Notation.Glob.union;
        // order of args should not matter
        expect(union(['*'], ['!a[*]'])).toEqual(['*']);
        expect(union(['!a[*]'], ['*'])).toEqual(['*']);
        expect(union(['a[1]'], ['*'])).toEqual(['*']);
        expect(union(['*'], ['a[1]'])).toEqual(['*']);
        expect(union(['a[*]', '!a[0]'], ['a[0][*]'])).toEqual(['a[*]', '!a[0]']);
        expect(union(['a[0][*]'], ['a[*]', '!a[0]'])).toEqual(['a[*]', '!a[0]']);
        expect(union(['!a[0][*]'], ['a[*]', '!a[0]'])).toEqual(['a[*]', '!a[0]']);

        const x = ['*', 'a[*]', '!b[2]', '!x[*]', 'o'];
        const y = ['*', 'b[2]', '!pwd', 'x[5]', 'o'];
        expect(union(x, y)).toEqual(['*']);

        let u = union(['*', 'a', 'b[2]', '!id', '!x[*]'], ['*', '!b[*]', 'id', '!x[4]', 'x[1]']);
        expect(u).toEqual(['*', '!x[4]']);

        u = union(['*[*]', '!a[1]', '!x[*]'], ['*', 'a[1]', '!b[*]', '!x[*]', 'x[0]']);
        expect(u).toEqual(['*', '!x[*]', 'x[0]']);

        u = union(['*', '!a[*]', '!x[*]'], ['*', 'a[*]', '!b', '!x[*].*', 'x[1]']);
        expect(u).toEqual(['*', '!x[*].*']);
    });

});
