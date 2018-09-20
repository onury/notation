/* eslint camelcase:0, max-lines-per-function:0, consistent-return:0, max-statements:0, max-lines:0, max-len:0 */

import Notation from '../src/core/notation';
import NotationGlob from '../src/core/notation.glob';
const _ = require('lodash');

// shuffle array
function shuffle(o) { // v1.0
    for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

const o = {
    name: 'onur',
    age: 36,
    account: {
        id: 15,
        tags: 20,
        likes: ['movies', '3d', 'programming', 'music']
    },
    billing: {
        account: {
            id: 121,
            credit: 300,
            balance: -293
        }
    },
    company: {
        name: 'pilot co',
        address: {
            city: 'istanbul',
            country: 'TR',
            location: {
                lat: 34.123123,
                lon: 30.123123
            }
        },
        account: {
            id: 33,
            taxNo: 12345
        },
        limited: true,
        notDefined: undefined,
        nuller: null,
        zero: 0
    }
};


describe('Notation.Glob', () => {

    const {
        isValid, toRegExp, inspect, split, compare, sort, normalize, union, create
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

    test('.inspect()', () => {
        let ins = inspect('![*].x.y[1].*[*]');
        expect(ins.glob).toEqual('![*].x.y[1].*[*]');
        expect(ins.absGlob).toEqual('[*].x.y[1]');
        expect(ins.isNegated).toEqual(true);

        ins = inspect('*.x[*].y');
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
        expect(split('!x.y[*]', true)).toEqual(['x', 'y']);
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
        expect(compare('*.*', '*')).toEqual(1);
        expect(compare('*.*', '*.a')).toEqual(-1);
        expect(compare('*', '!*.*')).toEqual(-1);
        expect(compare('*.x', 'y.*')).toEqual(-1);
        expect(compare('[*].x', 'a.*')).toEqual(-1);
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
            'prop.*',
            'account.id',
            '!account.id',
            'account.tags',
            'prop.id',
            '!prop.name',
            '*.*.credit',
            '!*.account.*',
            'bill.*.*',
            '*.account.id',
            'account.likes[*]',
            'bill.account.*',
            '!foo.*.boo',
            'foo.qux.*',
            '!prop.*.name',
            'x[*].foo',
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
            shuffled = Notation.Glob.sort(shuffled);
            // console.log(shuffled);
            expect(shuffled).toEqual(expectedSorted);
            expect(indexOf('*')).toEqual(0);
            expect(indexOf('!foo.*.boo')).toBeLessThan(indexOf('foo.qux.*'));
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
            sorted = Notation.Glob.sort(shuffled);
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
        expect(g1.absGlob).toEqual('*.x[1]');
        expect(g1.isNegated).toEqual(true);
        expect(g1.regexp.source).toEqual('^' + reVAR + '\\.x\\[1\\]' + reREST);
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

    test('#covers(), .covers()', () => {
        function cov(globA, globB) {
            return create(globA).covers(globB);
        }
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
        expect(cov('*', '*.b')).toEqual(true);
        expect(cov('a', '*')).toEqual(false);
        expect(cov('a', 'b.*')).toEqual(false);
        expect(cov('a', 'a')).toEqual(true);
        expect(cov('a.*', 'a.b')).toEqual(true);
        expect(cov('a.*', ['a', 'b', 'c'])).toEqual(true);
        expect(cov('a.*', 'a.b[1]')).toEqual(true);
        expect(cov('a.*', 'a.b[*].c')).toEqual(true);
        expect(cov('a.b[*].c', 'a.b[*]')).toEqual(false);
        expect(cov('a.b[*]', new NotationGlob('a.b[2].c'))).toEqual(true);
        expect(cov('[1].*.b[*].*.d', '[1].a.b[3].c.d')).toEqual(true);
        expect(cov('[1].*.b[*].*.d', '[2].a.b')).toEqual(false);
        expect(NotationGlob.covers(['a', '*'], 'a.b[1]')).toEqual(true);

    });

    test.skip('Notation#filter()', () => {
        // var glob = Notation.Glob.create;
        const nota = new Notation(_.cloneDeep(o));
        // console.log('value ---:', nota.value);
        const globs = ['!company.limited', 'billing.account.credit', 'company.*', 'account.id'];
        const filtered = nota.filter(globs).value;
        // console.log('filtered ---:', filtered);

        expect(filtered.company.name).toBeDefined();
        expect(filtered.company.address).toBeDefined();
        expect(filtered.company.limited).toBeUndefined();
        expect(filtered.account.id).toBeDefined();
        expect(filtered.account.likes).toBeUndefined();
        expect(filtered.billing.account.credit).toBeDefined();

        // original object should not be modied
        expect(o.company.name).toBeDefined();
        expect(o.company.limited).toBeDefined();
        expect(o.account.id).toBeDefined();

        const assets = { model: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        const N = Notation.create(assets);
        const m1 = N.filter('*').value;
        const m2 = N.filter('*.*').value;
        const m3 = N.filter('*.*.*').value;
        expect(m1.model).toBeDefined();
        expect(m1.phone.model).toBeDefined();
        expect(m2.model).toBeUndefined();
        expect(m2.phone.model).toBeDefined();
        expect(Object.keys(m3).length).toEqual(0);

        // globs.push('*');
        // nota.filter(globs);
    });

    test.skip('Notation#filter() » 2nd level wildcard', () => {
        const data = { model: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        const nota = Notation.create(data);
        nota.filter('phone.*');
        expect(nota.value).toEqual({ phone: data.phone });
        // console.log(nota.value);
    });

    test.skip('Notation#filter() » negated object', () => {
        const data = { name: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        const globs = ['*', '!phone'];
        const filtered = new Notation(data).filter(globs).value;
        expect(filtered.name).toEqual(data.name);
        expect(filtered.phone).toBeUndefined();
        expect(filtered.car).toBeDefined();
        // console.log(filtered);
        // console.log(data);
    });

    test.skip('Notation#filter() » normal and negated of the same (negated should win)', () => {
        const data = { prop: { id: 1, x: true }, y: true };
        // we have the same glob both as negated and normal. negated should win.
        let globs = ['prop.id', '!prop.id'];
        let filtered = new Notation(data).filter(globs).value;
        expect(filtered.prop).toBeUndefined();
        expect(filtered.y).toBeUndefined();
        // add wildcard
        globs = ['!prop.id', 'prop.id', '*'];
        filtered = new Notation(data).filter(globs).value;
        expect(filtered.prop).toEqual(jasmine.any(Object));
        expect(filtered.prop.id).toBeUndefined();
        expect(filtered.prop.x).toEqual(true);
        expect(filtered.y).toEqual(data.y);
    });

    test.skip('Notation#filter() » with/out wildcard', () => {
        const data = { name: 'Onur', id: 1 };
        // we have no wildcard '*' here.
        let globs = ['!id'];
        // should filter as `{}`
        let filtered = Notation.create(data).filter(globs).value;
        expect(filtered).toEqual(jasmine.any(Object));
        expect(Object.keys(filtered).length).toEqual(0);
        // add wildcard
        globs = ['*', '!id'];
        filtered = Notation.create(data).filter(globs).value;
        expect(filtered.name).toEqual(data.name);
        expect(filtered.id).toBeUndefined();
        // no negated (id is duplicate in this case)
        globs = ['*', 'id'];
        filtered = Notation.create(data).filter(globs).value;
        expect(filtered.name).toEqual(data.name);
        expect(filtered.id).toEqual(data.id);
    });

    test('.normalize()', () => {
        expect(normalize(['*'])).toEqual(['*']);
        expect(normalize(['[*]'])).toEqual(['[*]']);
        expect(normalize(['!*'])).toEqual([]);
        expect(normalize(['![*]'])).toEqual([]);
        expect(normalize(['*', '!*'])).toEqual([]);
        expect(normalize(['*', 'name', 'pwd', 'id'])).toEqual(['*']);
        expect(normalize(['name', 'pwd', 'id'])).toEqual(['id', 'name', 'pwd']);
        expect(normalize(['*', 'name', 'pwd', '!id'])).toEqual(['*', '!id']);
        expect(normalize(['user.*', '!user.pwd'])).toEqual(['user.*', '!user.pwd']);
        expect(normalize(['*', '!*.id'])).toEqual(['*', '!*.id']);
        expect(normalize(['name', '!*.id', 'x.id'])).toEqual(['name', 'x.id']);
        expect(normalize(['*', '!user.pwd'])).toEqual(['*', '!user.pwd']);
        expect(normalize(['*', 'user.*', '!user.pwd'])).toEqual(['*', '!user.pwd']);
        // console.log(normalize(['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'user.*', '!user.pwd']));
        expect(normalize(['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'user.*', '!user.pwd']))
            .toEqual(['*', '!id', '!car.*', 'car.model', '!user.pwd']);
        // console.log(normalize(['*', '!id', 'car.model', '!car.*', '!user.pwd']));
        expect(normalize(['*', '!id', 'car.model', '!car.*', '!user.pwd']))
            .toEqual(['*', '!id', '!car.*', 'car.model', '!user.pwd']);

        // console.log(normalize(['name', 'pwd', '!id']));
        expect(normalize(['name', 'pwd', '!id'])).toEqual(['name', 'pwd']);
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

    test.only('.union()', () => {
        let u;

        const globA = ['foo.bar.baz', 'bar.*', '!bar.id', 'bar.name', '!foo.qux.boo'];
        const globB = ['!foo.*.baz', 'bar.id', 'bar.name', '!bar.*', 'foo.qux.*'];

        // for checking mutation
        const cloneGlobA = globA.concat();
        const cloneGlobB = globB.concat();

        // expected union
        // [ 'bar.*', 'foo.qux.*', 'foo.bar.baz' ]

        u = union(globA, globB);
        // // should not mutate given globs arrays
        // expect(globA).toEqual(cloneGlobA);
        // expect(globB).toEqual(cloneGlobB);

        // // console.log(u);

        // expect(u.length).toEqual(3);
        // expect(u).toContain('bar.*');
        // expect(u).toContain('foo.qux.*');
        // expect(u).toContain('foo.bar.baz');
        // // globs with wildcard come first
        // expect(u.indexOf('foo.qux.*')).toBeLessThan(u.indexOf('foo.bar.baz'));

        // // order of parameters should not matter
        // expect(union(['*'], ['!id'])).toEqual(['*']);
        // expect(union(['!id'], ['*'])).toEqual(['*']);
        // expect(union(['id'], ['*'])).toEqual(['*']);
        // expect(union(['*', '!id'], ['*'])).toEqual(['*']);
        // expect(union(['*'], ['*', '!id'])).toEqual(['*']);

        // const a = ['*', '!id'];
        // const b = ['*', '!pwd'];
        // const c = ['email'];
        // const d = ['*'];
        // // const e = ['*', '!id', '!pwd'];

        // expect(union(b, c)).toEqual(['*', '!pwd']);
        // expect(union(c, d)).toEqual(['*']);
        // expect(union(a, d)).toEqual(['*']);
        // expect(union(c, d)).toEqual(['*']);

        // const x = ['*', 'email', '!id', '!x.*', 'o'];
        // const y = ['*', 'id', '!pwd', 'x.name', 'o'];
        // expect(union(x, y)).toEqual(['*']);

        // u = union(['*', 'a', 'b', '!id', '!x.*'], ['*', '!b', 'id', '!pwd', 'x.o']);
        // expect(u).toEqual(['*']);

        // u = union(['*', '!id', '!x.*'], ['*', 'id', '!pwd', '!x.*', 'x.o']);
        // // console.log(u);
        // expect(u).toEqual(['*', '!x.*', 'x.o']);

        u = union(['*', '!id', '!x.*'], ['*', 'id', '!pwd', '!x.*.*', 'x.o']);
        expect(u).toEqual(['*', '!x.*.*']);
    });

    test.skip('Notation#filter() » wildcards', () => {
        const data = {
            x: {
                y: { z: 1 },
                a: { b: 2 }
            },
            c: 3,
            d: {
                e: { f: 4, g: { i: 5 } }
            }
        };

        function filter(globs) {
            return Notation.create(_.cloneDeep(data)).filter(globs);
        }
        let result;

        function check1() {
            expect(result.x.y.z).toEqual(1);
            expect(result.x.a.b).toEqual(2);
            expect(result.c).toBeUndefined();
            expect(result.d).toBeUndefined();
        }

        // these should be treated the same:
        // 'x.*.*' === 'x.*' === 'x'

        result = filter(['x.*.*']).value;
        check1();
        result = filter(['x.*']).value;
        check1();
        result = filter(['x']).value;
        check1();

        // these should NOT be treated the same:
        // '!x.*.*' !== '!x.*' !== '!x'

        result = filter(['*', '!x.*.*']).value;
        expect(result.x).toEqual(jasmine.any(Object));
        expect(result.x.y).toEqual(jasmine.any(Object));
        expect(result.x.a).toEqual(jasmine.any(Object));
        expect(Object.keys(result.x.y).length).toEqual(0);
        expect(Object.keys(result.x.a).length).toEqual(0);
        expect(result.c).toEqual(3);
        expect(result.d).toEqual(jasmine.any(Object));

        result = filter(['*', '!x.*']).value;
        expect(result.x).toEqual(jasmine.any(Object));
        expect(Object.keys(result.x).length).toEqual(0);
        expect(result.c).toEqual(3);
        expect(result.d).toEqual(jasmine.any(Object));

        result = filter(['*', '!x']).value;
        // console.log('!x\t', result);
        expect(result.x).toBeUndefined();
        expect(result.c).toEqual(3);
        expect(result.d).toEqual(jasmine.any(Object));

        result = filter(['*']).value;
        // expect(JSON.stringify(result)).toEqual(JSON.stringify(data));
        expect(result).toEqual(data);
        // console.log('*\t', result);

        result = filter(['*', '!*']).value;
        expect(result).toEqual({});

        // console.log(JSON.stringify(data, null, '  '));

        result = filter(['*', '!*.*.*']).value;
        // console.log('!*.*.*\n', JSON.stringify(result, null, '  '));
        expect(result.x).toEqual(jasmine.any(Object));
        expect(result.x.y).toEqual(jasmine.any(Object));
        expect(Object.keys(result.x.y).length).toEqual(0);
        expect(result.x.a).toEqual(jasmine.any(Object));
        expect(Object.keys(result.x.a).length).toEqual(0);
        expect(result.d.e).toEqual(jasmine.any(Object));
        expect(Object.keys(result.d.e).length).toEqual(0);
        expect(result.c).toEqual(3);

        result = filter(['*', '!*.*']).value;
        // console.log('!*.*\n', JSON.stringify(result, null, '  '));
        expect(result.x).toEqual(jasmine.any(Object));
        expect(Object.keys(result.x).length).toEqual(0);
        expect(result.d).toEqual(jasmine.any(Object));
        expect(Object.keys(result.d).length).toEqual(0);
        expect(result.c).toEqual(3);
    });

    test.skip('Notation#filter() » special test', () => {
        const globs = ['*', '!box', 'box.model.*', '!bValid.*', '!sto.p2m', '!sto.contact.*', '!sto.partners.*', '!sto.powOp.*'];
        const data = {
            id: 'TR001',
            box: {
                model: { code: 'N22', description: 'Normal 22 kVA' },
                supplier: 'EFA',
                router: { brandModel: 'TELT 104' },
                connection: { operator: 'VODA', method: '3G' }
            },
            bValid: {
                method: 'OP',
                comment: '',
                date: 'Mon Nov 18 2013 15:41:43 GMT+0200 (EET)'
            }
        };

        const notation = Notation.create(data);
        const filtered = notation.filter(globs).value;
        expect(filtered.box.model).toBeDefined();
        expect(filtered.box.router).toBeUndefined(); // "!box"
        expect(filtered.bValid).toEqual({}); // "!validation.*"
        // console.log('filtered\n', filtered);
    });

});
