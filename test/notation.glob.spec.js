/* eslint camelcase:0, max-lines-per-function:0, consistent-return:0, max-statements:0, max-lines:0, max-len:0 */

import Notation from '../src/core/notation';
import NotationGlob from '../src/core/notation.glob';
const _ = require('lodash');

// shuffle array
function shuffle(o) { // v1.0
    for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

describe('Notation.Glob', () => {

    const {
        isValid, hasMagic, toRegExp, _inspect, _covers, _intersect, split, compare, sort, normalize, union, create
    } = Notation.Glob;

    const reVAR = '[a-z$_][a-z$_\\d]*';
    const reARRINDEX = '\\[\\d+\\]';
    const reREST = '(?:[\\[\\.].+|$)';

    test('.isValid()', () => {
        expect(isValid('prop.mid.last')).toEqual(true);
        expect(isValid('prop.*.')).toEqual(false);
        expect(isValid('prop.*')).toEqual(true);
        expect(isValid('prop.')).toEqual(false);
        expect(isValid('prop')).toEqual(true);
        expect(isValid('pro*')).toEqual(false);
        expect(isValid('.prop')).toEqual(false);
        expect(isValid('.')).toEqual(false);
        expect(isValid()).toEqual(false);
        expect(isValid(1)).toEqual(false);
        expect(isValid(null)).toEqual(false);
        expect(isValid(true)).toEqual(false);
        expect(isValid('')).toEqual(false);
        expect(isValid('*.')).toEqual(false);
        expect(isValid('*')).toEqual(true);
        expect(isValid('.*')).toEqual(false);
        expect(isValid('***')).toEqual(false);
        expect(isValid('!*')).toEqual(true);
        expect(isValid('!**')).toEqual(false);
        expect(isValid('!*.*')).toEqual(true);
        expect(isValid('!*.**')).toEqual(false);
        expect(isValid('!*.*.xxx')).toEqual(true);

        expect(isValid('')).toEqual(false);
        expect(isValid('!')).toEqual(false);
        expect(isValid('*')).toEqual(true);
        expect(isValid('[*]')).toEqual(true);
        expect(isValid('["*"]')).toEqual(true); // not wildcard but valid
        expect(isValid('["[*]"]')).toEqual(true); // not wildcard but valid
        expect(isValid('[]')).toEqual(false);
        expect(isValid('[!]')).toEqual(false);
        expect(isValid('a[0][1][2].*')).toEqual(true);
        expect(isValid('a.b[*].x')).toEqual(true);
        expect(isValid('a.b[3]')).toEqual(true);
        expect(isValid('a.*[*]')).toEqual(true);
        expect(isValid('a.*[*].*')).toEqual(true);
        expect(isValid('a.*[1]')).toEqual(true);
        expect(isValid('a.*.c[1]')).toEqual(true);
        expect(isValid('!a.*.c[1]')).toEqual(true);
        expect(isValid('a.*[*][0].c')).toEqual(true);
        expect(isValid('!*.*[*][*].*')).toEqual(true);
        expect(isValid('x.*["*"][*][1].*["*.x"]')).toEqual(true);
        expect(isValid('*.[*]')).toEqual(false);
        expect(isValid('*[*]*[*]')).toEqual(false);
        expect(isValid('*[*]*.[*]')).toEqual(false);
    });

    test('.hasMagic()', () => {
        // expect(hasMagic('x.y.z')).toEqual(false);
        // expect(hasMagic('!x.y.z')).toEqual(true);
        // expect(hasMagic('x.y.!z')).toEqual(false); // invalid
        expect(hasMagic('[*]')).toEqual(true);
        expect(hasMagic('x.*')).toEqual(true);
        expect(hasMagic('[*].x.y.*')).toEqual(true);
        expect(hasMagic('')).toEqual(false);
        expect(hasMagic(null)).toEqual(false); // invalid
        expect(hasMagic(true)).toEqual(false); // invalid
        expect(hasMagic('*.')).toEqual(false); // invalid
    });

    test('.toRegExp()', () => {
        expect(() => toRegExp().source).toThrow();
        expect(() => toRegExp('').source).toThrow();
        expect(() => toRegExp('*.').source).toThrow();
        expect(toRegExp('*').source).toEqual('^' + reVAR + reREST);
        expect(toRegExp('[*]').source).toEqual('^' + reARRINDEX + reREST);
        expect(toRegExp('["*"]').source).toEqual('^\\["\\*"\\]' + reREST);
        expect(toRegExp('x.*').source).toEqual('^x\\.' + reVAR + reREST);
        expect(toRegExp('!x.*["x.*"][1]').source).toEqual('^x\\.' + reVAR + '\\["x\\.\\*"\\]\\[1\\]' + reREST);
    });

    test('._inspect()', () => {
        let ins = _inspect('![*].x.y[1].*[*]');
        expect(ins.glob).toEqual('![*].x.y[1].*[*]');
        expect(ins.absGlob).toEqual('[*].x.y[1].*[*]'); // 'cause original is negated
        expect(ins.isNegated).toEqual(true);

        ins = _inspect('*.x[*].y');
        expect(ins.glob).toEqual('*.x[*].y');
        expect(ins.absGlob).toEqual('*.x[*].y');
        expect(ins.isNegated).toEqual(false);
    });

    test('.split()', () => {
        expect(() => split()).toThrow();
        expect(() => split('')).toThrow();
        expect(() => split('.x')).toThrow();
        expect(() => split('[x]')).toThrow();
        expect(split('x')).toEqual(['x']);
        expect(split('*')).toEqual(['*']);
        expect(split('[*]')).toEqual(['[*]']);
        expect(split('["[*]"]')).toEqual(['["[*]"]']);
        expect(split('!["ab.c"]')).toEqual(['["ab.c"]']);
        expect(split('*.x.y[*][1].z["*.x"].a')).toEqual(['*', 'x', 'y', '[*]', '[1]', 'z', '["*.x"]', 'a']);
        expect(split('*.*[*]')).toEqual(['*', '*', '[*]']);
        // normalized/cleaned
        expect(split('*.*[*]', true)).toEqual(['*']);
        expect(split('[*].*[*].*', true)).toEqual(['[*]']);
        expect(split('x.y[*]', true)).toEqual(['x', 'y']);
        expect(split('!x.y[*]', true)).toEqual(['x', 'y', '[*]']);
        expect(split('x.y.*.z', true)).toEqual(['x', 'y', '*', 'z']);
        expect(split('x.y[*].z.*', true)).toEqual(['x', 'y', '[*]', 'z']);
    });

    test('.compare()', () => {
        expect(compare('*', 'a')).toEqual(-1);
        expect(compare('a', '*')).toEqual(1);
        expect(compare('!*', 'a')).toEqual(-1);
        expect(compare('*', '*')).toEqual(0);
        expect(compare('*', '[*]')).toEqual(0);
        expect(compare('[*]', '*')).toEqual(0);
        expect(compare('[*]', '[*]')).toEqual(0);
        expect(compare('[*]', 'a')).toEqual(-1);
        expect(compare('a', '[*]')).toEqual(1);
        expect(compare('*.*', '*')).toEqual(0);
        expect(compare('*.*.*', '*')).toEqual(0);
        expect(compare('*', '*[*].*')).toEqual(0);
        expect(compare('*.*', '*.a')).toEqual(-1);
        expect(compare('*', '!*.*')).toEqual(-1);
        expect(compare('*.x', 'y.*')).toEqual(1);
        expect(compare('[*].x', 'a.*')).toEqual(1);
        expect(compare('*.x.*', 'x.*')).toEqual(1);
        expect(compare('*.x.y', 'x.y')).toEqual(1);

        expect(compare('a.*', 'a.b[1]')).toEqual(-1);
        expect(compare('a.b', 'a[*]')).toEqual(1);
        expect(compare('a.b[3]', 'a.b[2]')).toEqual(1);
        expect(compare('a.*[*]', 'a.*')).toEqual(0);
        expect(compare('a', 'a[*]')).toEqual(0);
        expect(compare('a.*[1]', 'a.*[*]')).toEqual(1);
        expect(compare('a.*.c[1]', 'a.*.c[*]')).toEqual(1);
        expect(compare('a.*.c[1]', 'a.*.c')).toEqual(1);
        expect(compare('a.*.c', 'a.*.c[*]')).toEqual(0);
    });

    test('.sort()', () => {
        const globs = [
            '!prop.name',
            'bill.account.credit',
            'bill.account.*',
            '!*.account.*.name',
            'account.tags',
            '!account.id',
            'bill.*.*',
            'prop.id',
            'account.likes[*]',
            '*.account.id',
            '*',
            '!*.account.*',
            '*.*.credit',
            'account.*',
            'account.id',
            'prop.x[2].y',
            '!x[1].foo',
            'prop.*',
            '!prop.*.name',
            'x[*].foo',
            '!foo.*.boo',
            'foo.qux.*'
        ];

        const expectedSorted = [
            '*',
            'account.*',
            'bill.*.*',
            'prop.*',
            'account.id',
            'account.likes[*]',
            'account.tags',
            'bill.account.*',
            'foo.qux.*',
            'prop.id',
            '!account.id',
            '!prop.name',
            '*.*.credit',
            '!*.account.*',
            '*.account.id',
            'x[*].foo',
            '!foo.*.boo',
            '!prop.*.name',
            'bill.account.credit',
            '!x[1].foo',
            '!*.account.*.name',
            'prop.x[2].y'
        ];

        //  '!foo.*.boo'    vs 'foo.qux.*'  => '!foo.*.boo', 'foo.qux.*'
        //  'foo.*.boo'     vs '!foo.qux.*' => 'foo.*.boo', '!foo.qux.*'

        let i, shuffled;
        function indexOf(v) {
            return shuffled.indexOf(v);
        }
        for (i = 0; i <= 10; i++) {
            shuffled = shuffle(globs.concat());
            shuffled = sort(shuffled);
            // console.log(shuffled);
            expect(shuffled).toEqual(expectedSorted);
            expect(indexOf('*')).toEqual(0);
            expect(indexOf('account.*')).toBeLessThan(indexOf('account.tags'));
            expect(indexOf('account.*')).toBeLessThan(indexOf('account.id'));
            expect(indexOf('account.*')).toBeLessThan(indexOf('!account.id'));
            expect(indexOf('account.id')).toBeLessThan(indexOf('!account.id'));
            expect(indexOf('bill.*.*')).toBeLessThan(indexOf('bill.account.credit'));
            expect(indexOf('bill.account.*')).toBeLessThan(indexOf('bill.account.credit'));
            expect(indexOf('bill.*.*')).toBeLessThan(indexOf('bill.account.*'));
            expect(indexOf('*.account.*')).toBeLessThan(indexOf('*.account.id'));
            expect(indexOf('!*.account.*')).toBeLessThan(indexOf('*.account.id'));
            expect(indexOf('*.account.id')).toBeLessThan(indexOf('!*.account.*.name'));
            expect(indexOf('*.*.credit')).toBeLessThan(indexOf('!*.account.*.name'));
            expect(indexOf('*.*.credit')).toBeLessThan(indexOf('bill.account.credit'));
            expect(indexOf('prop.*')).toBeLessThan(indexOf('prop.id'));
            expect(indexOf('prop.*')).toBeLessThan(indexOf('!prop.*.name'));
            expect(indexOf('x[*].foo')).toBeLessThan(indexOf('!x[1].foo'));
            expect(indexOf('prop.*')).toBeLessThan(indexOf('prop.x[2].y'));
        }
    });

    test('.sort() » negated comes last', () => {
        const original = [
            'foo.bar.baz',
            'bar.name',
            '!foo.*.baz',
            '!bar.*',
            '!foo.qux.boo',
            'foo.qux.*',
            'bar.id',
            '!bar.id'
        ];

        let i, shuffled, sorted, indexN, indexNeg;
        for (i = 0; i <= 10; i++) {
            shuffled = shuffle(original.concat());
            // console.log(shuffled);
            sorted = sort(shuffled);
            indexN = sorted.indexOf('bar.id');
            indexNeg = sorted.indexOf('!bar.id');

            expect(indexNeg).toBeGreaterThan(-1);
            expect(indexN).toBeGreaterThan(-1);
            expect(indexNeg).toBeGreaterThan(indexN);
        }
    });

    test('constructor, .create()', () => {
        const g1 = new NotationGlob('!*.x[1].*');
        expect(g1 instanceof NotationGlob).toEqual(true);
        expect(g1.glob).toEqual('!*.x[1].*');
        expect(g1.absGlob).toEqual('*.x[1].*');
        expect(g1.isNegated).toEqual(true);
        expect(g1.regexp.source).toEqual('^' + reVAR + '\\.x\\[1\\]\\.' + reVAR + reREST);
        expect(g1.regexp.flags).toEqual('i');
        expect(g1.notes).toEqual(['*', 'x', '[1]']);
        expect(g1.levels).toEqual(['*', 'x', '[1]']); // alias
        expect(g1.test('y')).toEqual(false);
        expect(g1.test('y.x[1]')).toEqual(true);
        expect(g1.test('y.x[1].z')).toEqual(true);
        expect(g1.test('y.z')).toEqual(false);

        const g2 = create('[*].x');
        expect(g2 instanceof NotationGlob).toEqual(true);
        expect(g2.glob).toEqual('[*].x');
        expect(g2.absGlob).toEqual('[*].x');
        expect(g2.isNegated).toEqual(false);
        expect(g2.regexp.source).toEqual('^' + reARRINDEX + '\\.x' + reREST);
        expect(g2.regexp.flags).toEqual('i');
        expect(g2.notes).toEqual(['[*]', 'x']);
        expect(g2.levels).toEqual(['[*]', 'x']); // alias
        expect(g2.test('[0]')).toEqual(false);
        expect(g2.test('[1].x')).toEqual(true);
        expect(g2.test('[1].y')).toEqual(false);

        expect(() => g2.test('*')).toThrow();
        expect(() => g2.test('[1].*')).toThrow();

        expect(() => new NotationGlob()).toThrow();
        expect(() => new NotationGlob('')).toThrow();
        expect(() => new NotationGlob('%.s')).toThrow();
        expect(() => create()).toThrow();
        expect(() => create('')).toThrow();
        expect(() => create('s .')).toThrow();
    });

    test('#parent, #last, #first', () => {
        expect(create('*').parent).toEqual(null);
        expect(create('*.x').parent).toEqual('*');
        expect(create('*.x.*').parent).toEqual('*');
        expect(create('*.x[*]').parent).toEqual('*');
        expect(create('[*].x').parent).toEqual('[*]');
        expect(create('x.y.z').parent).toEqual('x.y');

        expect(create('*').last).toEqual('*');
        expect(create('*.x').last).toEqual('x');
        expect(create('*.x.*').last).toEqual('x');
        expect(create('*.x[*]').last).toEqual('x');
        expect(create('[*].x').last).toEqual('x');
        expect(create('x.y.z').last).toEqual('z');

        expect(create('*').first).toEqual('*');
        expect(create('*.x').first).toEqual('*');
        expect(create('*.x.*').first).toEqual('*');
        expect(create('*.x[*]').first).toEqual('*');
        expect(create('[*].x').first).toEqual('[*]');
        expect(create('x.y.z').first).toEqual('x');
    });

    test('#test()', () => {
        let strNota = 'account.id';
        expect(create('account.id').test(strNota)).toEqual(true);
        expect(create('account.*').test(strNota)).toEqual(true);
        expect(create('*.*').test(strNota)).toEqual(true);
        expect(create('*').test(strNota)).toEqual(true);
        expect(create('billing.account.id').test(strNota)).toEqual(false);
        expect(create(strNota).test('billing.account.id')).toEqual(false);

        strNota = 'list[1].id';
        expect(create('list[1].id').test(strNota)).toEqual(true);
        expect(create('list[2].id').test(strNota)).toEqual(false);
        expect(create('list[*]').test(strNota)).toEqual(true);
        expect(create('list[*].*').test(strNota)).toEqual(true);
        expect(create('*').test(strNota)).toEqual(true);
        expect(create('[*]').test(strNota)).toEqual(false);
        expect(create('x.list[1].id').test(strNota)).toEqual(false);
        expect(create(strNota).test('x.list[2].id')).toEqual(false);

        strNota = '[1].id';
        expect(create('[1].id').test(strNota)).toEqual(true);
        expect(create('[2].id').test(strNota)).toEqual(false);
        expect(create('[*]').test(strNota)).toEqual(true);
        expect(create('[*].*').test(strNota)).toEqual(true);
        expect(create('*').test(strNota)).toEqual(false);
        expect(create('[*]').test(strNota)).toEqual(true);
        expect(create('x[1].id').test(strNota)).toEqual(false);
        expect(create(strNota).test('x[1].id')).toEqual(false);
    });

    test('#covers(), ._covers()', () => {
        const cov = (globA, globB) => create(globA).covers(globB);

        expect(cov('*.*', 'b')).toEqual(true);
        expect(cov('*.b', 'b')).toEqual(false);
        expect(cov('a.*', 'b')).toEqual(false);
        expect(cov('a.*', 'a')).toEqual(true);
        expect(cov('*', 'b')).toEqual(true);
        expect(cov('a', 'b')).toEqual(false);
        expect(cov('a.b.c', 'a.b.c')).toEqual(true);
        expect(cov('a.b', 'a.b.c')).toEqual(true);
        expect(cov('a.b.c', 'a.b')).toEqual(false);
        expect(cov('*', 'b.*')).toEqual(true);
        expect(cov('*', 'b.*')).toEqual(true);
        expect(cov('b.*', '*')).toEqual(false);
        expect(cov('a', '*')).toEqual(false);
        expect(cov('a', 'b.*')).toEqual(false);
        expect(cov('a', 'a')).toEqual(true);
        expect(cov('a', '!a')).toEqual(true);
        expect(cov('!a', 'a')).toEqual(true);
        expect(cov('a.*', 'a.b')).toEqual(true);
        expect(cov('a.*', 'a.b[1]')).toEqual(true);
        expect(cov('a.*', 'a.b[*].c')).toEqual(true);
        expect(cov('a.b[*].c', 'a.b[*]')).toEqual(false);
        expect(cov('a.b[*]', new NotationGlob('a.b[2].c'))).toEqual(true);
        expect(cov('[1].*.b[*].*.d', '[1].a.b[3].c.d')).toEqual(true);
        expect(cov('[1].*.b[*].*.d', '[2].a.b')).toEqual(false);

        // static private method: _covers()
        expect(_covers('*', 'b')).toEqual(true);
        expect(_covers('a', 'b')).toEqual(false);
        expect(_covers('a.b.c', 'a.b.c')).toEqual(true);
        expect(_covers('*', '*.b')).toEqual(true);
        expect(_covers('a.b[*].c', 'a.b[*]')).toEqual(false);
        expect(_covers('a.b[*]', new NotationGlob('a.b[2].c'))).toEqual(true);
        expect(_covers('!*', 'b')).toEqual(true);
        expect(_covers('b', '!*')).toEqual(false);
        expect(_covers('!*.b', 'a.b')).toEqual(true);
        expect(_covers('a.b', '!*.b')).toEqual(false);
        expect(_covers('!*.b', 'y.b.c')).toEqual(true);
        expect(_covers('![*].b', '[2].b.c')).toEqual(true);
        expect(_covers('!*.b', '["2"].b.c')).toEqual(true);
    });

    test('#intersect(), ._intersect()', () => {
        const intersect = (globA, globB, restrictive = false) => create(globA).intersect(globB, restrictive);
        // x.* ∩ *.y    » x.y
        // x.*.* ∩ *.y  » x.y.*
        // x.*.z ∩ *.y  » x.y.z
        // x.y ∩ *.b    » (n/a)
        // x.y ∩ a.*    » (n/a)
        expect(_intersect('x.*', '*.z')).toEqual('x.z');
        expect(_intersect('x.*', '*.z', true)).toEqual('x.z');
        expect(_intersect('x.*.*', '*.y')).toEqual('x.y');
        expect(_intersect('x.*.z', '!*.y')).toEqual('x.y.z'); // asuming y is object
        expect(_intersect('!x.*.z', '*.y')).toEqual('!x.y.z'); // asuming y is object
        expect(_intersect('x.*.z', '!*.y', true)).toEqual('!x.y.z'); // asuming y is object
        expect(_intersect('x.y', '*.b')).toEqual(null);
        expect(_intersect('x.y', 'a.*')).toEqual(null);
        expect(_intersect('x.*.*.z.*', 'x.a.*.z.b')).toEqual('x.a.*.z.b');
        expect(_intersect('!x.*.*.z.x', 'x.*.*.z.*')).toEqual('!x.*.*.z.x');
        expect(_intersect('!x.*.*.z.x', 'x.*.*.z.*', true)).toEqual('!x.*.*.z.x');
        expect(_intersect('x.*.*.z.x', 'x.*.*.z.y')).toEqual(null);
        expect(_intersect('x.a.*.z.x', 'x.b.*.z.y')).toEqual(null);
        expect(_intersect('x.*.*.z.*', 'x.*')).toEqual('x.*.*.z');
        expect(_intersect('x.*.*', 'x.o')).toEqual('x.o');
        expect(_intersect('x.*[*]', 'x.o')).toEqual('x.o');
        expect(_intersect('!x.*.*', '!x.o')).toEqual('!x.o.*');
        expect(_intersect('a.*', '!*.z')).toEqual('!a.z');
        expect(_intersect('*.z', '!a.*')).toEqual('a.z');
        expect(_intersect('*.z', '!a.*', true)).toEqual('!a.z');
        expect(_intersect('*.z', 'a.*')).toEqual('a.z');

        // instance method #intersect() also normalizes the glob
        expect(intersect('x.*.*', '*.y')).toEqual('x.y');
        expect(intersect('x.*.z', '!*.y')).toEqual('x.y.z');
        expect(intersect('x.*.z', '!*.y', true)).toEqual('!x.y.z');
        expect(intersect('x.y', '*.b')).toEqual(null);
        expect(intersect('x.*[*]', 'x.o')).toEqual('x.o');
        expect(intersect('!x.*.*', '!x.o')).toEqual('!x.o.*');
        expect(intersect('a.*', '!*.z')).toEqual('!a.z');
        expect(intersect('*.z', '!a.*')).toEqual('a.z');
        expect(intersect('*.z', '!a.*', true)).toEqual('!a.z');
        expect(intersect('*.z', 'a.*')).toEqual('a.z');

        // check default value for restrictive argument
        expect(create('*.z').intersect('!a.*')).toEqual('a.z');
        expect(create('*.z').intersect('!a.*', true)).toEqual('!a.z');
    });

    test('.normalize() restrictive = false', () => {
        const norm = globs => normalize(globs, false);

        expect(() => norm(['*.[*]'])).toThrow();
        expect(() => norm(['*.[*]', 'x'])).toThrow();
        expect(() => norm(['*[*]*[*]'])).toThrow();
        expect(() => norm(['*[*'])).toThrow();
        expect(() => norm(['*', 'x-1'])).toThrow();

        expect(norm(['*'])).toEqual(['*']);
        expect(norm(['*.*'])).toEqual(['*']);
        expect(norm(['*.*.*'])).toEqual(['*']);
        expect(norm(['*[*].*'])).toEqual(['*']);
        expect(norm(['*[*].*[*]'])).toEqual(['*']);
        expect(norm(['*', '*'])).toEqual(['*']);
        expect(norm(['x', 'x'])).toEqual(['x']);
        expect(norm(['[*]'])).toEqual(['[*]']);
        expect(norm(['!*'])).toEqual([]);
        expect(norm(['![*]'])).toEqual([]);
        expect(norm(['*', '!*'])).toEqual([]);
        expect(norm(['!*', '*'])).toEqual([]);

        expect(norm(['*', 'user', 'video'])).toEqual(['*']);
        expect(norm(['!*', 'user', 'video'])).toEqual(['user', 'video']);
        expect(norm(['user', 'video', '!*'])).toEqual(['user', 'video']); // order shouldn't matter
        expect(norm(['!*', '!user', 'video'])).toEqual(['video']);

        expect(norm(['user.*', '!user.id'])).toEqual(['user', '!user.id']);
        expect(norm(['!user.*', 'user.id'])).toEqual(['user.id']); // more explicit wins
        expect(norm(['!*.id', 'user.id'])).toEqual(['user.id']); // more explicit wins

        expect(norm(['*', '!*.id', 'user.id'])).toEqual(['*', '!*.id', 'user.id']); // explicit remains
        expect(norm(['user', '!*.id', 'user.id'])).toEqual(['user']); // explicit remains

        expect(norm(['!user.id', 'user.id'])).toEqual([]); // exact negated wins
        expect(norm(['*', '!user.*', 'user.id'])).toEqual(['*', '!user.*', 'user.id']);
        expect(norm(['user', '!*.id'])).toEqual(['user', '!user.id']);
        expect(norm(['*', 'user', '!*.id'])).toEqual(['*', '!*.id']);

        expect(norm(['user', '!*.id', 'car.id'])).toEqual(['user', 'car.id', '!user.id']); // explicit remains
        expect(norm(['user', '!*.id', 'car.id', 'user.id'])).toEqual(['user', 'car.id']); // explicit remains

        expect(norm(['!user.*.*', 'user.profile'])).toEqual(['user.profile', '!user.profile.*']);

        expect(norm(['user', 'user.id', '!*.id', 'video.id'])).toEqual(['user', 'video.id']);
        expect(norm(['*', 'user', 'user.id', '!*.id', 'video.id'])).toEqual(['*', '!*.id', 'user.id', 'video.id']);
        expect(norm(['video.id', '!*.id', 'user', 'user.id', '*'])).toEqual(['*', '!*.id', 'user.id', 'video.id']); // re-ordered version of above
        expect(norm(['*', 'user', '!*.id', 'video.id'])).toEqual(['*', '!*.id', 'video.id']);

        expect(norm(['*', 'user.id', '!*.id', 'video.id'])).toEqual(['*', '!*.id', 'user.id', 'video.id']);

        expect(norm(['*', '!user.pwd'])).toEqual(['*', '!user.pwd']);
        expect(norm(['*', 'user.*', '!user.pwd'])).toEqual(['*', '!user.pwd']);

        expect(norm(['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'user', '!user.pwd']))
            .toEqual(['*', '!id', '!car.*', 'car.model', '!user.pwd']);

        expect(norm(['*', '!id', 'car.model', '!car.*', '!user.pwd']))
            .toEqual(['*', '!id', '!car.*', 'car.model', '!user.pwd']);

        expect(norm(['*', 'car.model', '!car'])).toEqual(['*', '!car', 'car.model']);

        expect(norm(['name', 'pwd', '!id'])).toEqual(['name', 'pwd']);

        expect(norm(['!x.o.y', 'x.o'])).toEqual(['x.o', '!x.o.y']);
        expect(norm(['!x.o.*', 'x.o'])).toEqual(['x.o', '!x.o.*']);
        expect(norm(['!x.*.*', 'x.o'])).toEqual(['x.o', '!x.o.*']);
        expect(norm(['!x.*.*', '*', 'x.o', 'id'])).toEqual(['*', '!x.*.*']);

        expect(norm(['!a.*', 'a'])).toEqual(['a', '!a.*']); // Notation#filter() would return {}
        // should be treated same as above
        expect(norm(['!a[*]', 'a'])).toEqual(['a', '!a[*]']); // Notation#filter() would return []
        expect(norm(['*', 'a[*]', '!a[*]'])).toEqual(['*', '!a[*]']);
        expect(norm(['a[*]', '!a[*]'])).toEqual(['a', '!a[*]']);
        expect(norm(['a[*]', '!a'])).toEqual([]);
        expect(norm(['!a', 'a[*]'])).toEqual([]);
        expect(norm(['!a[*]', 'a[*]'])).toEqual(['a', '!a[*]']); // results in empty array
        expect(norm(['!a[*]', 'a[1]'])).toEqual(['a[1]']);
        expect(norm(['*', '!a[*]', 'a[1]'])).toEqual(['*', '!a[*]', 'a[1]']);
        expect(norm(['a[*]', '!a[0][1][2]'])).toEqual(['a', '!a[0][1][2]']);
        expect(norm(['a[4]', 'a[*]'])).toEqual(['a']);
        expect(norm(['a.*', 'a.*[*]'])).toEqual(['a']);
        expect(norm(['a.*', 'a.*[2]'])).toEqual(['a']);
        expect(norm(['a.b', 'a.*[*]', 'a.c[2].*'])).toEqual(['a']);

        expect(norm(['!x', 'c[1]', '!c[*]', '*', '!d.e']))
            .toEqual(['*', '!x', '!c[*]', 'c[1]', '!d.e']);

        expect(norm(['!id', 'name', 'car.model', '!car.*', 'id', '!email']))
            .toEqual(['name', 'car.model']);

        expect(norm(['!y.*', 'x.x[1][0][*]', '*.x[*]', '!x.x[2][*]', 'a.b', 'c[*][1]']))
            .toEqual(['*.x', 'a.b', 'c[*][1]', '!x.x[2][*]']);

        expect(norm(['bar.name', '!bar.id', 'bar', 'foo.bar.baz', 'foo.qux', '!bar.id', 'bar.id', '!foo.*.baz']))
            .toEqual(['bar', 'foo.qux', '!bar.id', 'foo.bar.baz', '!foo.qux.baz']);

        expect(norm(['!*', 'a'])).toEqual(['a']);
        expect(norm(['!*.b', 'a.b'])).toEqual(['a.b']);
        expect(norm(['!a', 'a.b', 'x[*].*'])).toEqual(['x', 'a.b']);
        expect(norm(['a.*', '!*.z'])).toEqual(['a', '!a.z']);
        expect(norm(['a', '!a.z'])).toEqual(['a', '!a.z']);
        expect(norm(['x.*', '!*.y'])).toEqual(['x', '!x.y']);

        expect(norm(['!a.x', 'a.x', '!a.*', '!*'])).toEqual([]);

        expect(norm(['!a.*', '*.x'])).toEqual(['*.x']);
        expect(norm(['!a.*', '*.x', '*.y'])).toEqual(['*.x', '*.y']);
        expect(norm(['a', 'b.c', '!x', '*.y'])).toEqual(['a', '*.y', 'b.c']);
        expect(norm(['a', 'b.c', '!x', '!*.y'])).toEqual(['a', 'b.c', '!a.y']);
        expect(norm(['*', 'a', '!x', '!*.y'])).toEqual(['*', '!x', '!*.y']);
        expect(norm(['!a.b.*', 'a.b.c'])).toEqual(['a.b.c']);
        expect(norm(['!a.*', '!a.b.*', 'a.b.c'])).toEqual(['a.b.c']);

        expect(norm(['!x.*', 'x.y'])).toEqual(['x.y']);
        expect(norm(['x.*', '!*.y'])).toEqual(['x', '!x.y']);
        expect(norm(['a', 'x', '!a.z', '!x.y'])).toEqual(['a', 'x', '!a.z', '!x.y']);
        expect(norm(['*', '!*.b', 'x.b', 'a'])).toEqual(['*', '!*.b', 'x.b']);
        expect(norm(['*.x', '!*.*.b', 'x.a.b'])).toEqual(['*.x', '!*.x.b', 'x.a.b']);
        expect(norm(['*', '*.x', '!*.*.b', 'x.a.b'])).toEqual(['*', '!*.*.b', 'x.a.b']);

        expect(norm(['!*.b', 'a.b', 'x.b', 'y.b', 'z.b'])).toEqual(['a.b', 'x.b', 'y.b', 'z.b']);
        expect(norm(['!x', 'x.b', 'x.b.c', '!*.b.c'])).toEqual(['x.b']);
        expect(norm(['!x', 'x.y', 'x.y.z', 'o.y.z', '!*.y.z', '!a', 'a.b', 'q.b.c', '!*.b.c']))
            .toEqual(['a.b', 'x.y', 'o.y.z', 'q.b.c', '!a.b.c']);
        expect(norm(['!x', 'x.b', 'x.b.c', '!*.b.c', '!*.*.c', '!f', '!d'])).toEqual(['x.b']);
        expect(norm(['!x', '!x.b', '!x.b.c', '*.b'])).toEqual(['*.b', '!x.b']);
        expect(norm(['!x', '!x.b', '!x.b.c', '*.b', '!*.b'])).toEqual([]);
        expect(norm(['!*.b', 'x.b', 'x.b.c', 'x'])).toEqual(['x']);
        expect(norm(['!*.b', 'x.b', 'x.b.c', 'x', 'y.b.c'])).toEqual(['x', 'y.b.c']);

        expect(norm(['*.b', '!a.b', '!x.b', '!y.b', '!z.b'])).toEqual(['*.b', '!a.b', '!x.b', '!y.b', '!z.b']);
        expect(norm(['*.b', 'x', '!*.b', 'y'])).toEqual(['x', 'y', '!x.b', '!y.b']);

    });

    test('.normalize() restrictive = true', () => {
        const norm = globs => normalize(globs, true);

        expect(() => norm(['*.[*]'])).toThrow();
        expect(() => norm(['*.[*]', 'x'])).toThrow();
        expect(() => norm(['*[*]*[*]'])).toThrow();
        expect(() => norm(['*[*'])).toThrow();
        expect(() => norm(['*', 'x-1'])).toThrow();

        expect(norm(['*'])).toEqual(['*']);
        expect(norm(['*.*'])).toEqual(['*']);
        expect(norm(['*.*.*'])).toEqual(['*']);
        expect(norm(['*[*].*'])).toEqual(['*']);
        expect(norm(['*[*].*[*]'])).toEqual(['*']);
        expect(norm(['*', '*'])).toEqual(['*']);
        expect(norm(['x', 'x'])).toEqual(['x']);
        expect(norm(['[*]'])).toEqual(['[*]']);
        expect(norm(['!*'])).toEqual([]);
        expect(norm(['![*]'])).toEqual([]);
        expect(norm(['*', '!*'])).toEqual([]);
        expect(norm(['!*', '*'])).toEqual([]);

        expect(norm(['*', 'user', 'video'])).toEqual(['*']);
        expect(norm(['!*', 'user', 'video'])).toEqual([]);
        expect(norm(['user', 'video', '!*'])).toEqual([]); // order shouldn't matter
        expect(norm(['!*', '!user', 'video'])).toEqual([]);

        expect(norm(['*', 'name', 'pwd', 'id'])).toEqual(['*']);
        expect(norm(['name', 'pwd', 'id'])).toEqual(['id', 'name', 'pwd']);
        expect(norm(['*', 'name', 'pwd', '!id'])).toEqual(['*', '!id']);
        expect(norm(['user.*', '!user.pwd'])).toEqual(['user', '!user.pwd']);
        expect(norm(['*', '!*.id'])).toEqual(['*', '!*.id']);

        expect(norm(['!*.id', 'x.id'])).toEqual([]);
        expect(norm(['user', '!*.id', 'x.id'])).toEqual(['user', '!user.id']);

        expect(norm(['*', '!user.pwd'])).toEqual(['*', '!user.pwd']);
        expect(norm(['*', 'user.*', '!user.pwd'])).toEqual(['*', '!user.pwd']);

        expect(norm(['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'user', '!user.pwd']))
            .toEqual(['*', '!id', '!car.*', '!user.pwd']);

        expect(norm(['*', '!id', 'car.model', '!car.*', '!user.pwd']))
            .toEqual(['*', '!id', '!car.*', '!user.pwd']);

        expect(norm(['name', 'pwd', '!id'])).toEqual(['name', 'pwd']);

        expect(norm(['!x.*.*', '*', 'x.o', 'id'])).toEqual(['*', '!x.*.*']);

        expect(norm(['!a.*', 'a'])).toEqual(['a', '!a.*']); // Notation#filter() would return {}
        // should be treated same as above
        expect(norm(['!a[*]', 'a'])).toEqual(['a', '!a[*]']); // Notation#filter() would return []
        expect(norm(['*', 'a[*]', '!a[*]'])).toEqual(['*', '!a[*]']);
        expect(norm(['a[*]', '!a[*]'])).toEqual(['a', '!a[*]']);
        expect(norm(['a[*]', '!a'])).toEqual([]);
        expect(norm(['!a', 'a[*]'])).toEqual([]);
        expect(norm(['a[*]', '!a[0][1][2]'])).toEqual(['a', '!a[0][1][2]']);
        expect(norm(['a[4]', 'a[*]'])).toEqual(['a']);
        expect(norm(['a.*', 'a.*[*]'])).toEqual(['a']);
        expect(norm(['a.*', 'a.*[2]'])).toEqual(['a']);

        expect(norm(['a.b', 'a.*[*]', 'a.c[2].*'])).toEqual(['a']);

        expect(norm(['!x', 'c[1]', '!c[*]', '*', '!d.e']))
            .toEqual(['*', '!x', '!c[*]', '!d.e']);

        expect(norm(['!id', 'name', 'car.model', '!car.*', 'id', '!email']))
            .toEqual(['name']);

        expect(norm(['!y.*', 'x.x[1][0][*]', '*.x[*]', '!x.x[2][*]', 'a.b', 'c[*][1]']))
            .toEqual(['*.x', 'a.b', '!y.x', 'c[*][1]', '!x.x[2][*]']);

        expect(norm(['bar.name', '!bar.id', 'bar', 'foo.bar.baz', 'foo.qux', '!bar.id', 'bar.id', '!foo.*.baz']))
            .toEqual(['bar', 'foo.qux', '!bar.id', '!foo.qux.baz']);

        expect(norm(['!*', 'a'])).toEqual([]);
        expect(norm(['!*.b', 'a.b'])).toEqual([]);
        expect(norm(['!a', 'a.b', 'x[*].*'])).toEqual(['x']);
        expect(norm(['a.*', '!*.z'])).toEqual(['a', '!a.z']);
        expect(norm(['x.*', '!*.y'])).toEqual(['x', '!x.y']);
        expect(norm(['!a.x', 'a.x', '!a.*', '!*'])).toEqual([]);
        expect(norm(['!a.*', '*.x'])).toEqual(['*.x', '!a.x']);
        expect(norm(['!a.*', '*.x', '*.y'])).toEqual(['*.x', '*.y', '!a.x', '!a.y']);
        expect(norm(['a', 'b.c', '!x', '*.y'])).toEqual(['a', '*.y', 'b.c', '!x.y']);
        expect(norm(['a', 'b.c', '!x', '!*.y'])).toEqual(['a', 'b.c', '!a.y']);
        expect(norm(['*', 'a', '!x', '!*.y'])).toEqual(['*', '!x', '!*.y']);
        expect(norm(['!a.b.*', 'a.b.c'])).toEqual([]);
        expect(norm(['!a.*', '!a.b.*', 'a.b.c'])).toEqual([]);

        expect(norm(['!x.*', 'x.y'])).toEqual([]);
        expect(norm(['x.*', '!*.y'])).toEqual(['x', '!x.y']);
        expect(norm(['a', 'x', '!a.z', '!x.y'])).toEqual(['a', 'x', '!a.z', '!x.y']);
        expect(norm(['*', '!*.b', 'x.b', 'a'])).toEqual(['*', '!*.b']);
        expect(norm(['*.x', '!*.*.b', 'x.a.b'])).toEqual(['*.x', '!*.x.b']);
        expect(norm(['*', '*.x', '!*.*.b', 'x.a.b'])).toEqual(['*', '!*.*.b']);

        expect(norm(['!*.b', 'a.b', 'x.b', 'y.b', 'z.b'])).toEqual([]);
        expect(norm(['!x', 'x.b', 'x.b.c', '!*.b.c'])).toEqual([]);
        expect(norm(['!x', 'x.y', 'x.y.z', 'o.y.z', '!*.y.z', '!a', 'a.b', 'q.b.c', '!*.b.c'])).toEqual([]);
        expect(norm(['!x', 'x.b', 'x.b.c', '!*.b.c', '!*.*.c', '!f', '!d'])).toEqual([]);
        expect(norm(['!x', '!x.b', '!x.b.c', '*.b'])).toEqual(['*.b', '!x.b']);
        expect(norm(['!x', '!x.b', '!x.b.c', '*.b', '!*.b'])).toEqual([]);
        expect(norm(['!*.b', 'x.b', 'x.b.c', 'x'])).toEqual(['x', '!x.b']);
        expect(norm(['!*.b', 'x.b', 'x.b.c', 'x', 'y.b.c'])).toEqual(['x', '!x.b']);

        expect(norm(['*.b', '!a.b', '!x.b', '!y.b', '!z.b'])).toEqual(['*.b', '!a.b', '!x.b', '!y.b', '!z.b']);
        expect(norm(['*.b', 'x', '!*.b', 'y'])).toEqual(['x', 'y', '!x.b', '!y.b']);
    });

    test('.normalize() » issue #7', () => {
        const globs = [
            '!pass',
            '!password.prop',
            '*',
            '!password',
            '!password_reset_code'
        ];
        // console.log(normalize(globs));
        expect(normalize(globs)).toEqual([
            '*',
            '!pass',
            '!password',
            '!password_reset_code'
        ]);
    });

    test('.union() restrictive = false', () => {
        const uni = (a, b) => union(a, b, false);

        expect(uni([], ['*', 'x.y'])).toEqual(['*']);
        expect(uni(['*', 'x.y'], [])).toEqual(['*']);
        expect(uni([], ['!x.*', 'x.y'])).toEqual(['x.y']);
        expect(uni(['!x.*', 'x.y'], [])).toEqual(['x.y']);
        expect(uni(['a.b', '*.z'], ['!x.*', 'x.y'])).toEqual(['*.z', 'a.b', 'x.y']);

        expect(uni(
            ['*', 'a', 'b', '!id', '!x.*'],
            ['*', '!b', 'id', '!pwd', 'x.o']
        )).toEqual(['*']);

        expect(uni(
            ['*', '!id', '!x.*'],
            ['*', 'id', '!pwd', '!x.*', 'x.o']
        )).toEqual(['*', '!x.*', 'x.o']);

        expect(uni(['*', '!x.*'], ['!x.*.*'])).toEqual(['*', '!x.*']);
        expect(uni(['*', '!x.*'], ['*', '!x.*.*'])).toEqual(['*', '!x.*.*']);
        expect(uni(['*', '!x.y'], ['!x.y.z'])).toEqual(['*', '!x.y']);
        expect(uni(['*', '!x.y'], ['*', '!x.y.z'])).toEqual(['*', '!x.y.z']);

        expect(uni(['*', '!x.*'], ['*', '!x.*.*'])).toEqual(['*', '!x.*.*']);

        expect(uni(
            ['*', '!id', '!x.*'],
            ['*', 'id', '!pwd', '!x.*.*', 'x.o']
        )).toEqual(['*', '!x.*.*']);

        expect(uni(['*', '!x[*]'], ['*', '!x[4]', 'x[1]'])).toEqual(['*', '!x[4]']);

        expect(uni(
            ['*', 'a', 'b[2]', '!id', '!x[*]'],
            ['*', '!b[*]', 'id', '!x[4]', 'x[1]']
        )).toEqual(['*', '!x[4]']);

        expect(uni(
            ['*[*]', '!a[1]', '!x[*]'],
            ['*', 'a[1]', '!b[*]', '!x[*]', 'x[0]']
        )).toEqual(['*', '!x[*]', 'x[0]']);

        expect(uni(
            ['*', '!a[*]', '!x[*]'],
            ['*', 'a[*]', '!b', '!x[*].*', 'x[1]']
        )).toEqual(['*', '!x[*].*']);

        expect(uni(
            ['*', 'a', 'b[2]', '!id', '!x[*]'],
            ['*', '!b[*]', 'id', '!x[4]', 'x[1]']
        )).toEqual(['*', '!x[4]']);

        expect(uni(
            ['*', '!a[*]', '!x[*]'],
            ['*', 'a[*]', '!b', '!x[*].*', 'x[1]']
        )).toEqual(['*', '!x[*].*']);

        expect(uni(['a.*', '!*.z'], ['x.*', '!*.y'])).toEqual(['a', 'x', '!a.z', '!x.y']);
        expect(uni(['*', 'a.*', '!*.z'], ['x.*', '!*.y'])).toEqual(['*', '!*.z']);
        expect(uni(['*', 'a.*', '!*.z'], ['*', 'x.*', '!*.y'])).toEqual(['*']);
    });

    test('.union() restrictive = true', () => {
        const uni = (a, b) => union(a, b, true);

        expect(uni([], ['*', 'x.y'])).toEqual(['*']);
        expect(uni(['*', 'x.y'], [])).toEqual(['*']);
        expect(uni([], ['!x.*', 'x.y'])).toEqual([]);
        expect(uni(['!x.*', 'x.y'], [])).toEqual([]);
        expect(uni(['a.b', '*.z'], ['!x.*', 'x.y'])).toEqual(['*.z', 'a.b']);

        expect(uni(
            ['*', 'a', 'b', '!id', '!x.*'],
            ['*', '!b', 'id', '!pwd', 'x.o']
        )).toEqual(['*']);

        expect(uni(
            ['*', '!id', '!x.*'],
            ['*', 'id', '!pwd', '!x.*', 'x.o']
        )).toEqual(['*', '!x.*']);

        expect(uni(['*', '!x.*'], ['!x.*.*'])).toEqual(['*', '!x.*']);

        expect(uni(['*', '!x.*'], ['*', '!x.*.*'])).toEqual(['*', '!x.*.*']);

        expect(uni(
            ['*', '!id', '!x.*'],
            ['*', 'id', '!pwd', '!x.*.*', 'x.o']
        )).toEqual(['*', '!x.*.*']);

        expect(uni(['*', '!x[*]'], ['*', '!x[4]', 'x[1]'])).toEqual(['*', '!x[4]']);

        expect(uni(
            ['*', 'a', 'b[2]', '!id', '!x[*]'],
            ['*', '!b[*]', 'id', '!x[4]', 'x[1]']
        )).toEqual(['*', '!x[4]']);

        expect(uni(
            ['*[*]', '!a[1]', '!x[*]'],
            ['*', 'a[1]', '!b[*]', '!x[*]', 'x[0]']
        )).toEqual(['*', '!x[*]']);

        expect(uni(
            ['*', '!a[*]', '!x[*]'],
            ['*', 'a[*]', '!b', '!x[*].*', 'x[1]']
        )).toEqual(['*', '!x[*].*']);

        expect(uni(
            ['*', 'a', 'b[2]', '!id', '!x[*]'],
            ['*', '!b[*]', 'id', '!x[4]', 'x[1]']
        )).toEqual(['*', '!x[4]']);

        expect(uni(
            ['*[*]', '!a[1]', '!x[*]'],
            ['*', 'a[1]', '!b[*]', '!x[*]', 'x[0]']
        )).toEqual(['*', '!x[*]']);

        expect(uni(
            ['*', '!a[*]', '!x[*]'],
            ['*', 'a[*]', '!b', '!x[*].*', 'x[1]']
        )).toEqual(['*', '!x[*].*']);

        expect(uni(['a.*', '!*.z'], ['x.*', '!*.y'])).toEqual(['a', 'x', '!a.z', '!x.y']);
    });

    test('.union() check mutation, order', () => {
        const globA = ['foo.bar.baz', 'bar.*', '!bar.id', 'bar.name', '!foo.qux.boo'];
        const globB = ['!foo.*.baz', 'bar.id', 'bar.name', '!bar.*', 'foo.qux.*'];
        // normalized to:
        // globA = [ 'bar', '!bar.id', 'foo.bar.baz' ]
        // globB = [ 'foo.qux', '!foo.qux.baz' ]

        // for checking mutation
        const cloneGlobA = globA.concat();
        const cloneGlobB = globB.concat();

        expect(union(globA, globB, true)).toEqual(['bar', 'foo.qux', '!bar.id', 'foo.bar.baz', '!foo.qux.baz']);

        // should not mutate given globs arrays
        expect(globA).toEqual(cloneGlobA);
        expect(globB).toEqual(cloneGlobB);

        // order of parameters should not matter
        expect(union(['*'], ['!id'])).toEqual(['*']);
        expect(union(['!id'], ['*'])).toEqual(['*']);
        expect(union(['id'], ['*'])).toEqual(['*']);
        expect(union(['*', '!id'], ['*'])).toEqual(['*']);
        expect(union(['*'], ['*', '!id'])).toEqual(['*']);
        expect(union(['*'], ['!a[*]'])).toEqual(['*']);
        expect(union(['!a[*]'], ['*'])).toEqual(['*']);
        expect(union(['a[1]'], ['*'])).toEqual(['*']);
        expect(union(['*'], ['a[1]'])).toEqual(['*']);
        expect(union(['a[*]', '!a[0]'], ['a[0][*]'])).toEqual(['a']);
        expect(union(['a[0][*]'], ['a[*]', '!a[0]'])).toEqual(['a']);

        const a = ['*', '!id'];
        const b = ['*', '!pwd'];
        const c = ['email'];
        const d = ['*'];
        // const e = ['*', '!id', '!pwd'];

        expect(union(b, c)).toEqual(['*', '!pwd']);
        expect(union(c, d)).toEqual(['*']);
        expect(union(a, d)).toEqual(['*']);
        expect(union(c, d)).toEqual(['*']);

        expect(union(
            ['*', 'a[*]', '!b[2]', '!x[*]', 'o'],
            ['*', 'b[2]', '!pwd', 'x[5]', 'o']
        )).toEqual(['*']);

        expect(union(
            ['*', 'email', '!id', '!x.*', 'o'],
            ['*', 'id', '!pwd', 'x.name', 'o']
        )).toEqual(['*']);

        expect(union(
            ['user.*', '!user.email', 'car.model', '!*.id'],
            ['!*.date', 'user.email', 'car', '*.age']
        )).toEqual(['car', 'user', '*.age', '!car.date', '!user.id']);
    });

    test('.union() (by intersection)', () => {
        let u;
        u = union(['*', '!*.z'], ['*', '!x.*']);
        expect(u).toEqual(['*', '!x.z']);
        u = union(['*', '!*[2]'], ['*', '!x[*]']);
        expect(u).toEqual(['*', '!x[2]']);

        // intersection in same (normalize)
        expect(union(['a.*', '!*.z'], ['x.*', '!*.y'])).toEqual(['a', 'x', '!a.z', '!x.y']);
        expect(union(['a', '!*.z'], ['x', '!*.y'])).toEqual(['a', 'x', '!a.z', '!x.y']);
        expect(union(['a.b.*', '!*.*.z'], ['x.*', '!*.y'])).toEqual(['x', 'a.b', '!x.y', '!a.b.z']);
        expect(union(['a.b.*', '!*.*.z'], ['x', 'a.b.z', '!*.y'])).toEqual(['x', 'a.b', '!x.y']);
    });

});
