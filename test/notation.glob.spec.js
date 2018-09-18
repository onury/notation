/* eslint camelcase:0, max-lines-per-function:0, consistent-return:0, max-statements:0, max-lines:0, max-len:0 */

import Notation from '../src/core/notation';
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

    const { isValid, toRegExp, inspect, compare, sort, normalize, union } = Notation.Glob;

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
        const reVAR = '[a-z$_][a-z$_\\d]*';
        const reARRINDEX = '[\\d+]';
        const reREST = '(?:[\\[\\.].+|$)';
        expect(toRegExp('*').source).toEqual('^' + reVAR + reREST);
        expect(toRegExp('[*]').source).toEqual('^' + reARRINDEX + reREST);
        expect(toRegExp('["*"]').source).toEqual('^\\["\\*"\\]' + reREST);
        expect(toRegExp('x.*').source).toEqual('^x\\.' + reVAR + reREST);
        expect(toRegExp('!x.*["x.*"][1]').source).toEqual('^x\\.' + reVAR + '\\["x\\.\\*"\\]\\[1\\]' + reREST);
    });

    test('.compare()', () => {

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
            '*.account.id',
            '*',
            '!*.account.*',
            '*.*.credit',
            'account.*',
            'account.id',
            'prop.*',
            '!prop.*.name',
            '!foo.*.boo',
            'foo.qux.*'
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

            expect(indexOf('!foo.*.boo')).toBeLessThan(indexOf('foo.qux.*'));

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
        }
        // console.log(shuffled);
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

        // let a = [
        //     'foo.bar.baz',
        //     '!bar.norf',
        //     'bar.x',
        //     'bar.norf',
        //     '!*.bar.*',
        //     '*.bar.baz',
        //     '!foo.*.baz',
        //     '!bar.*',
        //     '!foo.qux.boo',
        //     'foo.qux.*'
        // ];
        // console.log(Notation.Glob.sort(a));
    });

    test('.test()', () => {
        const glob = Notation.Glob.create;
        const strNota = 'account.id';
        expect(glob('account.id').test(strNota)).toEqual(true);
        expect(glob('account.*').test(strNota)).toEqual(true);
        expect(glob('*.*').test(strNota)).toEqual(true);
        expect(glob('*').test(strNota)).toEqual(true);
        expect(glob('billing.account.id').test(strNota)).toEqual(false);
        expect(glob(strNota).test('billing.account.id')).toEqual(false);
    });

    test('Notation#filter()', () => {
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

    test('Notation#filter() » 2nd level wildcard', () => {
        const data = { model: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        const nota = Notation.create(data);
        nota.filter('phone.*');
        expect(nota.value).toEqual({ phone: data.phone });
        // console.log(nota.value);
    });

    test('Notation#filter() » negated object', () => {
        const data = { name: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        const globs = ['*', '!phone'];
        const filtered = new Notation(data).filter(globs).value;
        expect(filtered.name).toEqual(data.name);
        expect(filtered.phone).toBeUndefined();
        expect(filtered.car).toBeDefined();
        // console.log(filtered);
        // console.log(data);
    });

    test('Notation#filter() » normal and negated of the same (negated should win)', () => {
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

    test('Notation#filter() » with/out wildcard', () => {
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
        expect(normalize(['!*'])).toEqual([]);
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

    test('.union()', () => {
        let u;

        const globA = ['foo.bar.baz', 'bar.*', '!bar.id', 'bar.name', '!foo.qux.boo'];
        const globB = ['!foo.*.baz', 'bar.id', 'bar.name', '!bar.*', 'foo.qux.*'];

        // for checking mutation
        const cloneGlobA = globA.concat();
        const cloneGlobB = globB.concat();

        // expected union
        // [ 'bar.*', 'foo.qux.*', 'foo.bar.baz' ]

        u = union(globA, globB);
        // should not mutate given globs arrays
        expect(globA).toEqual(cloneGlobA);
        expect(globB).toEqual(cloneGlobB);

        // console.log(u);

        expect(u.length).toEqual(3);
        expect(u).toContain('bar.*');
        expect(u).toContain('foo.qux.*');
        expect(u).toContain('foo.bar.baz');
        // globs with wildcard come first
        expect(u.indexOf('foo.qux.*')).toBeLessThan(u.indexOf('foo.bar.baz'));

        // order of parameters should not matter
        expect(union(['*'], ['!id'])).toEqual(['*']);
        expect(union(['!id'], ['*'])).toEqual(['*']);
        expect(union(['id'], ['*'])).toEqual(['*']);
        expect(union(['*', '!id'], ['*'])).toEqual(['*']);
        expect(union(['*'], ['*', '!id'])).toEqual(['*']);

        const a = ['*', '!id'];
        const b = ['*', '!pwd'];
        const c = ['email'];
        const d = ['*'];
        // const e = ['*', '!id', '!pwd'];

        expect(union(b, c)).toEqual(['*', '!pwd']);
        expect(union(c, d)).toEqual(['*']);
        expect(union(a, d)).toEqual(['*']);
        expect(union(c, d)).toEqual(['*']);

        const x = ['*', 'email', '!id', '!x.*', 'o'];
        const y = ['*', 'id', '!pwd', 'x.name', 'o'];
        expect(union(x, y)).toEqual(['*']);

        u = union(['*', 'a', 'b', '!id', '!x.*'], ['*', '!b', 'id', '!pwd', 'x.o']);
        expect(u).toEqual(['*']);

        u = union(['*', '!id', '!x.*'], ['*', 'id', '!pwd', '!x.*', 'x.o']);
        // console.log(u);
        expect(u).toEqual(['*', '!x.*', 'x.o']);

        // console.log(Notation.Glob.normalize(['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'user.*', '!user.pwd']));
        expect(normalize(['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'user.*', '!user.pwd']))
            .toEqual(['*', '!id', '!car.*', 'car.model', '!user.pwd']);

        u = union(['*', '!id', '!x.*'], ['*', 'id', '!pwd', '!x.*.*', 'x.o']);
        expect(u).toEqual(['*', '!x.*.*']);
    });

    test('Notation#filter() » wildcards', () => {
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

    test('Notation#filter() » special test', () => {
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
