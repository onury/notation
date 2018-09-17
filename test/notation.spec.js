/* eslint camelcase:0 */

'use strict';

const Notation = require('../lib/notation');
const _ = require('lodash');

let o = {
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
    hobbies: {
        fishing: {
            days: 'sundays',
            location: 'river'
        },
        rockClimbing: {
            days: 'saturdays',
            location: 'mountain'
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
        employees: [
            {
                name: 'jon',
                age: 24,
                email: 'jon@mail.com'
            },
            {
                name: 'joe',
                age: 32,
                email: 'joe@mail.com'
            },
            {
                name: 'james',
                age: 27,
                email: 'james@mail.com'
            }
        ],
        limited: true,
        notDefined: undefined,
        nuller: null,
        zero: 0
    }
};

// shuffle array
function shuffle(o) { // v1.0
    for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

/**
 *  Test Suite: Notation
 *  @module   notation.spec
 */
describe('Test Suite: Notation.Glob', () => {
    'use strict';

    const valid = Notation.Glob.isValid;
    const normalize = Notation.Glob.normalize;

    it('should validate notation glob', () => {
        expect(valid('prop.arr[*]')).toEqual(true);
        expect(valid('prop.arr[*].last')).toEqual(true);
        expect(valid('prop.arr[23].last')).toEqual(true);
        expect(valid('prop[23].last')).toEqual(true);
        expect(valid('[23].last')).toEqual(false);
        expect(valid('[]')).toEqual(false);
        expect(valid('[0]')).toEqual(false);
        expect(valid('[23]')).toEqual(false);
        expect(valid('[*]')).toEqual(false);
        expect(valid('prop[2].')).toEqual(false);
        expect(valid('prop[2].*')).toEqual(true);
        expect(valid('prop[20].*')).toEqual(true);
        expect(valid('prop[x].*')).toEqual(false);
        expect(valid('prop[*].mid.*')).toEqual(true);
        expect(valid('prop.mid.last')).toEqual(true);
        expect(valid('prop.*.')).toEqual(false);
        expect(valid('prop.*')).toEqual(true);
        expect(valid('prop.')).toEqual(false);
        expect(valid('prop')).toEqual(true);
        expect(valid('pro*')).toEqual(false);
        expect(valid('.prop')).toEqual(false);
        expect(valid('.')).toEqual(false);
        expect(valid()).toEqual(false);
        expect(valid(null)).toEqual(false);
        expect(valid(true)).toEqual(false);
        expect(valid('')).toEqual(false);
        expect(valid('*.')).toEqual(false);
        expect(valid('*')).toEqual(true);
        expect(valid('.*')).toEqual(false);
        expect(valid('***')).toEqual(false);
        expect(valid('!*')).toEqual(true);
        expect(valid('!**')).toEqual(false);
        expect(valid('!*.*')).toEqual(true);
        expect(valid('!*.**')).toEqual(false);
        expect(valid('!*.*.xxx')).toEqual(true);
    });

    it('should `sort` globs', () => {
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
            'foo.qux.*',
            '*.employees[*]',
            '*.employees[1]',
            '*.employees[*].*',
            '!company.employees[*].age',
            '!company.employees[2].name',
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

            expect(indexOf('*.employees[*]')).toBeLessThan(indexOf('*.employees[1]'));
            expect(indexOf('*.employees[1]')).toBeLessThan(indexOf('*.employees[*].*'));
            expect(indexOf('*.employees[*].*')).toBeLessThan(indexOf('!company.employees[*].age'));
            expect(indexOf('!company.employees[*].age')).toBeLessThan(indexOf('!company.employees[2].name'));
        }
        // console.log(shuffled);
    });

    it('should `sort` glob array (negated comes last)', () => {
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

    it('should `test` notation-glob', () => {
        const glob = Notation.Glob.create;
        const strNota = 'account.id';
        expect(glob('account.id').test(strNota)).toEqual(true);
        expect(glob('account.*').test(strNota)).toEqual(true);
        expect(glob('*.*').test(strNota)).toEqual(true);
        expect(glob('*').test(strNota)).toEqual(true);
        expect(glob('billing.account.id').test(strNota)).toEqual(false);
        expect(glob(strNota).test('billing.account.id')).toEqual(false);
    });

    it('should `filter` notation-glob', () => {
        // var glob = Notation.Glob.create;
        const nota = new Notation(_.cloneDeep(o));
        // console.log('value ---:', nota.value);

        const globs = [
                '!company.limited',
                'billing.account.credit',
                'company.*',
                'account.id',
                'hobbies.*.days',
                '!company.employees[*].age',
                '!company.employees[1].name'
            ],
            filtered = nota.filter(globs).value;
        // console.log('filtered ---:', filtered);

        expect(filtered.company.name).toBeDefined();
        expect(filtered.company.address).toBeDefined();
        expect(filtered.company.limited).toBeUndefined();
        expect(filtered.account.id).toBeDefined();
        expect(filtered.account.likes).toBeUndefined();
        expect(filtered.billing.account.credit).toBeDefined();
        expect(filtered.hobbies.fishing.days).toBeDefined();
        expect(filtered.hobbies.fishing.location).toBeUndefined();
        expect(filtered.company.employees[0].name).toBeDefined();
        expect(filtered.company.employees[0].email).toBeDefined();
        expect(filtered.company.employees[0].age).toBeUndefined();
        expect(filtered.company.employees[1].name).toBeUndefined();

        // original object should not be modied
        expect(o.company.name).toBeDefined();
        expect(o.company.limited).toBeDefined();
        expect(o.account.id).toBeDefined();

        const assets = { model: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        const N = Notation.create(assets),
            m1 = N.filter('*').value,
            m2 = N.filter('*.*').value,
            m3 = N.filter('*.*.*').value;
        expect(m1.model).toBeDefined();
        expect(m1.phone.model).toBeDefined();
        expect(m2.model).toBeUndefined();
        expect(m2.phone.model).toBeDefined();
        expect(Object.keys(m3).length).toEqual(0);

        // globs.push('*');
        // nota.filter(globs);
    });

    it('should `filter` notation-glob (2nd level wildcard)', () => {
        const data = { model: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        const nota = Notation.create(data);
        nota.filter('phone.*');
        expect(nota.value).toEqual({ phone: data.phone });
        // console.log(nota.value);
    });

    it('should `filter` notation-glob (negated object)', () => {

        var data = { name: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } },
            globs = ['*', '!phone'],
            filtered = new Notation(data).filter(globs).value;
        expect(filtered.name).toEqual(data.name);
        expect(filtered.phone).toBeUndefined();
        expect(filtered.car).toBeDefined();
        // console.log(filtered);
        // console.log(data);
    });

    it('should `filter` normal and negated of the same (negated should win)', () => {
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

    it('should `filter` with/out wildcard', () => {
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

    it('should `normalize` notation-globs array', () => {
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

    it('`normalize` (issue #7)', () => {
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

    it('should `union` notation-globs arrays', () => {
        const union = Notation.Glob.union;
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
        const e = ['*', '!id', '!pwd'];

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
        expect(Notation.Glob.normalize(['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'user.*', '!user.pwd']))
            .toEqual(['*', '!id', '!car.*', 'car.model', '!user.pwd']);

        u = union(['*', '!id', '!x.*'], ['*', 'id', '!pwd', '!x.*.*', 'x.o']);
        expect(u).toEqual(['*', '!x.*.*']);
    });

    it('should notate/filter wildcards', () => {
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

    it('special test', () => {
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

        const notation = Notation.create(data),
            filtered = notation.filter(globs).value;
        expect(filtered.box.model).toBeDefined();
        expect(filtered.box.router).toBeUndefined(); // "!box"
        expect(filtered.bValid).toEqual({}); // "!validation.*"
        // console.log('filtered\n', filtered);
    });

});

describe('Test Suite: Notation', () => {

    // beforeEach(() => { });

    it('should throw/catch NotationError', () => {
        const errorMessage = 'TEST_ERROR';
        try {
            throw new Notation.Error(errorMessage);
        } catch (error) {
            // console.log(error);
            // console.log(Object.prototype.toString.call(error));
            // console.log(error.stack);
            expect(error.name).toEqual('NotationError');
            // expect(error instanceof Notation.Error).toEqual(true); // FAILS
            expect(error.message).toEqual(errorMessage);
        }
    });

    it('should get parts of notation', () => {
        let notation = 'first.mid.last';
        expect(Notation.first(notation)).toEqual('first');
        expect(Notation.last(notation)).toEqual('last');
        expect(Notation.parent(notation)).toEqual('first.mid');

        notation = 'single';
        expect(Notation.first(notation)).toEqual('single');
        expect(Notation.last(notation)).toEqual('single');
        expect(Notation.parent(notation)).toEqual(null);
    });

    it('should count notes', () => {
        expect(Notation.countNotes('a')).toEqual(1);
        expect(Notation.countNotes('a.b')).toEqual(2);
        expect(Notation.countNotes('a.b.c')).toEqual(3);
        expect(Notation.countNotes('a[0].b.c')).toEqual(4);
        expect(Notation.countNotes('a[0].b[1].c')).toEqual(5);
        expect(Notation.countNotes('a[0].b[1].c[2]')).toEqual(6);
        expect(function () { Notation.countNotes(''); }).toThrow(); // eslint-disable-line
        expect(function () { Notation.countNotes('a[]'); }).toThrow(); // eslint-disable-line
        expect(function () { Notation.countNotes('[0]a'); }).toThrow(); // eslint-disable-line
        expect(function () { Notation.countNotes('a[*]'); }).toThrow(); // eslint-disable-line
    });

    it('should validate notation', () => {
        expect(Notation.isValid('first.mid.last')).toEqual(true);
        expect(Notation.isValid('first.mid.')).toEqual(false);
        expect(Notation.isValid('first.')).toEqual(false);
        expect(Notation.isValid('first')).toEqual(true);
        expect(Notation.isValid('.first')).toEqual(false);
        expect(Notation.isValid('.')).toEqual(false);
        expect(Notation.isValid(null)).toEqual(false);
        expect(Notation.isValid(true)).toEqual(false);
        // star is NOT treated as wildcard here. this is normal dot-notation,
        // not a glob.
        expect(Notation.isValid('prop.*')).toEqual(true);
        // same as above
        expect(Notation.isValid('prop["*"]')).toEqual(true);
        // indicates wildcard which is not allowed in Notation but allowed in
        // NotationGlob
        expect(Notation.isValid('prop[*]')).toEqual(false);
        expect(Notation.isValid('prop[]')).toEqual(false); // error
        expect(Notation.isValid('prop[""]')).toEqual(true); // possible in JS
        expect(Notation.isValid('prop[0]')).toEqual(true); // indicates index
        expect(Notation.isValid('prop[1]')).toEqual(true); // indicates index
        expect(Notation.isValid('prop[11]')).toEqual(true); // indicates index
        expect(Notation.isValid('[0]prop')).toEqual(false);
        expect(Notation.isValid('prop[0]x')).toEqual(false);
        expect(Notation.isValid('prop[0].a')).toEqual(true);
        expect(Notation.isValid('prop[0].a[1]')).toEqual(true);
        expect(Notation.isValid('prop[0].a[1].b')).toEqual(true);
        expect(Notation.isValid('prop[0].a[1].b[2]')).toEqual(true);
        expect(Notation.isValid('prop[0].a[*].b[2]')).toEqual(false);
        expect(Notation.isValid('prop[0].a["*"].b[2]')).toEqual(true);
    });

    it('should flatten / expand object', () => {
        const nota = new Notation(_.cloneDeep(o));
        const flat = nota.flatten().value;

        // console.log(flat);
        expect(flat.name).toEqual(o.name);
        expect(flat['account.id']).toEqual(o.account.id);
        expect(flat['account.likes[0]']).toEqual(o.account.likes[0]);
        expect(flat['company.name']).toEqual(o.company.name);
        expect(flat['company.address.location.lat']).toEqual(o.company.address.location.lat);
        expect(flat['company.employees[0].age']).toEqual(o.company.employees[0].age);
        expect(flat['company.employees[1].name']).toEqual(o.company.employees[1].name);
        expect(flat['company.employees[2].email']).toEqual(o.company.employees[2].email);

        const expanded = Notation.create(flat).expand().value;
        // console.log('expanded:\n', JSON.stringify(expanded, null, '  '));
        expect(expanded.name).toEqual(o.name);
        expect(expanded.account.id).toEqual(o.account.id);
        expect(expanded.account.likes[0]).toEqual(o.account.likes[0]);
        expect(expanded.company.name).toEqual(o.company.name);
        expect(expanded.company.address.location.lat).toEqual(o.company.address.location.lat);
        expect(expanded.company.employees[0].age).toEqual(o.company.employees[0].age);
        expect(expanded.company.employees[1].name).toEqual(o.company.employees[1].name);
        expect(expanded.company.employees[2].email).toEqual(o.company.employees[2].email);
    });

    it('should iterate `each` and `eachValue`', () => {
        const assets = {
            boat: 'none',
            car: {
                brand: 'Ford',
                model: 'Mustang',
                year: 1970,
                colors: [
                    'red',
                    { color: 'black' }
                ]
            }
        };
        const nota = Notation.create(assets);
        const result = [];
        nota.each((notation, key, value, object) => {
            result.push(notation);
        });
        expect(result.length).toEqual(6);
        expect(result).toContain('boat');
        expect(result).toContain('car.brand');
        expect(result).toContain('car.model');
        expect(result).toContain('car.year');
        expect(result).toContain('car.colors[0]');
        expect(result).toContain('car.colors[1].color');

        nota.eachValue('car.brand', (levelValue, levelNotation, note, index, list) => { // eslint-disable-line max-params
            if (index === 0) expect(levelValue.model).toEqual('Mustang');
            if (index === 1) expect(levelValue).toEqual('Ford');
        });
    });

    it('should merge / separate notations object', () => {
        const nota = new Notation(_.cloneDeep(o));
        nota.merge({
            'key': null,
            'newkey.p1': 13,
            'newkey.p2': false,
            'newkey.p3.val': [],
        });
        const merged = nota.value;
        expect(merged.key).toEqual(null);
        expect(merged.newkey.p1).toEqual(13);
        expect(merged.newkey.p2).toEqual(false);
        expect(merged.newkey.p3.val).toEqual(jasmine.any(Array));

        const separated = nota.separate(['newkey.p1', 'newkey.p2', 'newkey.p3.val']).value;
        expect(separated.key).toBeUndefined();
        expect(separated.newkey.p1).toEqual(13);
        expect(separated.newkey.p2).toEqual(false);
        expect(separated.newkey.p3.val).toEqual(jasmine.any(Array));

        expect(merged.key).toEqual(null);
        expect(merged.newkey.p1).toBeUndefined();
        expect(merged.newkey.p2).toBeUndefined();
        expect(merged.newkey.p3.val).toBeUndefined();
    });

    it('should check if object has / hasDefined notation', () => {
        const nota = new Notation(_.cloneDeep(o));
        expect(nota.has('name')).toEqual(true);
        expect(nota.has('company.address.location.lat')).toEqual(true);
        expect(nota.has('company.notDefined')).toEqual(true);
        expect(nota.has('notProp1')).toEqual(false);
        expect(nota.has('company.notProp2')).toEqual(false);

        expect(nota.hasDefined('name')).toEqual(true);
        expect(nota.hasDefined('account.id')).toEqual(true);
        expect(nota.hasDefined('company.address.location.lat')).toEqual(true);
        expect(nota.hasDefined('company.notDefined')).toEqual(false);
        expect(nota.hasDefined('company.none')).toEqual(false);
        expect(nota.hasDefined('company.nuller')).toEqual(true);
        expect(nota.hasDefined('company.zero')).toEqual(true);
        expect(nota.hasDefined('notProp1')).toEqual(false);
        expect(nota.hasDefined('company.notProp2')).toEqual(false);

        expect(nota.hasDefined('company.employees[0]')).toEqual(true);
        expect(nota.hasDefined('company.employees[0].age')).toEqual(true);
        expect(nota.hasDefined('company.employees[0].noProp')).toEqual(false);
        expect(nota.hasDefined('company.employees[5]')).toEqual(false);
        expect(nota.hasDefined('company.employees[5].name')).toEqual(false);
    });

    it('should `get` value', () => {
        const nota = new Notation(_.cloneDeep(o));
        expect(nota.get('name')).toEqual(o.name);
        expect(nota.get('account.id')).toEqual(o.account.id);
        expect(nota.get('company.address.location.lat')).toEqual(o.company.address.location.lat);
        expect(nota.get('account.noProp')).toBeUndefined();

        expect(nota.get('company.employees[0]')).toBeDefined();
        expect(nota.get('company.employees[0].age')).toEqual(o.company.employees[0].age);
        expect(nota.get('company.employees[2].name')).toEqual(o.company.employees[2].name);
        expect(nota.get('company.employees[5]')).toBeUndefined();
    });

    it('should `set` value', () => {
        const nota = new Notation(_.cloneDeep(o)),
            obj = nota.value;
        expect(obj.name).toEqual('onur');
        nota.set('name', 'cute');
        expect(obj.name).toEqual('cute');

        // should not overwrite
        nota.set('account.id', 120, false);
        expect(obj.account.id).toEqual(15);

        // should overwrite
        nota.set('account.id', 120, true);
        expect(obj.account.id).toEqual(120);

        // should overwrite
        nota.set('company.address.location.lat', 40.111111);
        expect(obj.company.address.location.lat).toEqual(40.111111);
        expect(obj.company.address.location.lon).toEqual(30.123123);

        nota.set('newProp.val', true);
        expect(obj.newProp.val).toEqual(true);

        nota.set('account.newProp.val', 'YES');
        expect(obj.account.newProp.val).toEqual('YES');

        nota.set('company.employees[0]', { name: 'o', age: 10, email: 'o@mail.com' }, true);
        expect(obj.company.employees[0].name).toEqual('o');
        nota.set('company.employees[1].age', 50, true);
        expect(obj.company.employees[1].age).toEqual(50);
        nota.set('company.employees[1].name', 'should not overwrite', false);
        expect(obj.company.employees[1].name).toEqual('joe');
    });

    it('should `remove` property', () => {
        const nota = new Notation(_.cloneDeep(o)),
            obj = nota.value;
        // console.log('before', o);
        expect(obj.age).toBeDefined();
        nota.remove('age');
        expect(obj.age).toBeUndefined();

        nota.remove('company.employees[1].age');
        expect(obj.company.employees[1]).toBeDefined();
        expect(obj.company.employees[1].age).toBeUndefined();

        // should remove the item at index 0, in array
        nota.remove('company.employees[0]');
        expect(obj.company.employees).toBeDefined();
        expect(obj.company.employees.length).toEqual(2);

        expect(obj.company.address.city).toEqual('istanbul');
        nota.remove('company.address.city');
        expect(obj.company.address.city).toBeUndefined();
        // console.log('after', o);

        // deleting non-existing property..
        // this should have no effect.
        const k = Object.keys(obj.company).length;
        nota.remove('company.noProp');
        expect(Object.keys(obj.company).length).toEqual(k);

        const assets = { boat: 'none', car: { model: 'Mustang' } };
        Notation.create(assets).remove('car.model');
        expect(assets.car).toEqual({});
        // console.log(assets);
    });

    it('should `rename` notation', () => {
        const nota = new Notation(_.cloneDeep(o)),
            obj = nota.value;
        expect(obj.company.address.location).toBeDefined();
        nota.rename('company.address.location', 'company.loc.geo');
        expect(obj.company.address.location).toBeUndefined();
        expect(obj.company.loc.geo.lat).toEqual(jasmine.any(Number));

        nota.rename('company.employees[1].name', 'company.employees[1].name.first');
        expect(obj.company.employees[1].name).toEqual(jasmine.any(Object));
        expect(obj.company.employees[1].name.first).toEqual('joe');
        expect(obj.company.employees[0].name).toEqual(jasmine.any(String)); // should not change

        expect(obj.name).toBeDefined();
        nota.rename('name', 'person');
        expect(obj.name).toBeUndefined();
        expect(obj.person).toBeDefined();
        nota.rename('person', 'me.name');
        expect(obj.person).toBeUndefined();
        expect(obj.me.name).toBeDefined();
    });

    it('should `copyTo` or `extract` notation', () => {
        const nota = new Notation(_.cloneDeep(o)),
            obj = nota.value;
        // `extract(notation)` is same as `copyTo({}, notation)`
        let ex;
        ex = nota.extract('company');
        expect(obj.company.name).toEqual('pilot co');
        expect(ex.company.name).toEqual('pilot co');
        ex = nota.extract('company.address.country');
        expect(obj.company.address.country).toEqual('TR');
        expect(ex.company.address.country).toEqual('TR');

        ex = nota.extract('company.employees');
        expect(obj.company.employees).toEqual(jasmine.any(Array));
        expect(ex.company.employees.length).toEqual(o.company.employees.length);

        ex = nota.extract('company.employees[2]');
        expect(obj.company.employees.length).toEqual(o.company.employees.length);
        expect(ex.company.employees.length).toEqual(1);
        expect(ex.company.employees[0].name).toEqual(o.company.employees[2].name);

        ex = nota.extract('company.employees[1].name');
        expect(obj.company.employees.length).toEqual(o.company.employees.length);
        expect(ex.company.employees.length).toEqual(1);
        expect(ex.company.employees[0].name).toEqual(o.company.employees[1].name);
        expect(ex.company.employees[0].age).toBeUndefined();
        expect(ex.company.employees[0].email).toBeUndefined();
    });

    it('should `moveTo` or `extrude` notation', () => {
        let nota = new Notation(_.cloneDeep(o)),
            obj = nota.value;
        // `extrude(notation)` is same as `moveTo({}, notation)`
        let ex;

        ex = nota.extrude('company.address.country');
        expect(obj.company.address.country).toBeUndefined();
        expect(ex.company.address.country).toEqual('TR');

        nota = new Notation(_.cloneDeep(o));
        obj = nota.value;
        ex = nota.extrude('company', 'comp.my');
        expect(obj.company).toBeUndefined();
        expect(ex.company).toBeUndefined();
        expect(ex.comp.my.name).toEqual('pilot co');

        nota = new Notation(_.cloneDeep(o));
        obj = nota.value;
        ex = nota.extrude('company.employees');
        expect(obj.company.employees).toBeUndefined();
        expect(ex.company.employees.length).toEqual(o.company.employees.length);
        expect(ex.company.employees[2].name).toEqual(o.company.employees[2].name);

        nota = new Notation(_.cloneDeep(o));
        obj = nota.value;
        ex = nota.extrude('company.employees[2]');
        expect(obj.company.employees.length).toEqual(o.company.employees.length - 1);
        expect(ex.company.employees.length).toEqual(1);
        expect(ex.company.employees[0].name).toEqual(o.company.employees[2].name);

        nota = new Notation(_.cloneDeep(o));
        obj = nota.value;
        ex = nota.extrude('company.employees[1].name');
        expect(obj.company.employees.length).toEqual(o.company.employees.length);
        expect(obj.company.employees[1].name).toBeUndefined();
        expect(obj.company.employees[1].age).toEqual(o.company.employees[1].age);
        expect(ex.company.employees.length).toEqual(1);
        expect(ex.company.employees[0].name).toEqual(o.company.employees[1].name);
        expect(ex.company.employees[0].age).toBeUndefined();
        expect(ex.company.employees[0].email).toBeUndefined();
    });

    it('should return `undefined` for invalid notations', () => {
        const nota = new Notation(_.cloneDeep(o));
        const level1 = 'noProp',
            level2 = 'noProp.level2';
        expect(nota.get(level1)).toBeUndefined();
        expect(nota.hasDefined(level1)).toEqual(false);
        expect(nota.get(level2)).toBeUndefined();
        expect(nota.hasDefined(level2)).toEqual(false);
        const brackets1 = 'none[0]',
            brackets2 = 'none[1].prop';
        expect(nota.get(brackets1)).toBeUndefined();
        expect(nota.hasDefined(brackets1)).toEqual(false);
        expect(nota.get(brackets2)).toBeUndefined();
        expect(nota.hasDefined(brackets2)).toEqual(false);
    });

    it('should ignore invalid notations', () => {
        let nota = new Notation(_.cloneDeep(o)),
            obj = nota.value,
            ex,
            level1 = 'noProp',
            level2 = 'noProp.level2',
            brackets = 'none[0].prop';

        ex = nota.extract(level1);
        expect(nota.get(level1)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        ex = nota.extract(level2);
        expect(nota.get(level2)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        ex = nota.extract(brackets);
        expect(nota.get(brackets)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        ex = nota.extrude(level1);
        expect(nota.get(level1)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        ex = nota.extrude(level2);
        expect(nota.get(level2)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        ex = nota.extrude(brackets);
        expect(nota.get(brackets)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        expect(obj.account.noProp).toBeUndefined();
        nota.rename('account.noProp', 'renamedProp');
        expect(obj.renamedProp).toBeUndefined();

        nota = new Notation({ prop: [] });
        obj = nota.value;
        expect(obj.prop[0]).toBeUndefined();
        nota.rename('prop[0].name', 'renamedProp');
        expect(obj.renamedProp).toBeUndefined();
    });

    it('should throw if invalid object or notation', () => {
        let nota = new Notation(_.cloneDeep(o)),
            b = null; // undefined will NOT throw

        function invalidSrc() {
            return new Notation(b);
        }
        expect(invalidSrc).toThrow();

        function copy_invalidDest() {
            return nota.copyTo(b, 'account');
        }
        expect(copy_invalidDest).toThrow();

        function has_invalidNota() {
            return nota.has({}, 4);
        }
        expect(has_invalidNota).toThrow();

        function delete_invalidNota() {
            return nota.remove({});
        }
        expect(delete_invalidNota).toThrow();

        function rename_invalidNota() {
            return nota.rename('account', {});
        }
        expect(rename_invalidNota).toThrow();

        function validNonExistingNota() {
            return nota.get('prop2');
        }
        expect(validNonExistingNota).not.toThrow();

        function validNonExistingNota2() {
            return nota.get('prop[0]');
        }
        expect(validNonExistingNota2).not.toThrow();

        function copy_validArrayDest() {
            return nota.copyTo({}, 'company.employees[3]');
        }
        expect(copy_validArrayDest).not.toThrow();

    });

});
