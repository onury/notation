/* eslint camelcase:0, max-lines-per-function:0, consistent-return:0, max-statements:0, max-lines:0, max-len:0 */

import * as _ from 'lodash';
import { Notation } from '../src/core/notation';
import { utils } from '../src/utils';

const notate = Notation.create;

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


describe('Notation#filter()', () => {

    test('#filter()', () => {
        // var glob = create;
        const nota = notate(o).clone();
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

        // original object should not be modified
        // console.log(JSON.stringify(o, null, '  '));
        expect(o.company.name).toBeDefined();
        expect(o.company.limited).toBeDefined();
        expect(o.account.id).toBeDefined();

        const assets = { model: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        const n = notate(assets);
        const m1 = n.filter('*').value;
        const m2 = n.filter('*.*').value;
        const m3 = n.filter('*.*.*').value;
        expect(m1.model).toBeDefined();
        expect(m1.phone.model).toBeDefined();
        expect(m2.model).toBeDefined();
        expect(m2.phone.model).toBeDefined();
        expect(m3.model).toBeDefined();
        expect(m3.phone.model).toBeDefined();
        expect(Object.keys(m3).length).toEqual(3);

        // globs.push('*');
        // nota.filter(globs);
    });

    test('#filter() » 2nd level wildcard', () => {
        const data = { model: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        expect(notate(data).filter('phone.*').value).toEqual({ phone: data.phone });
    });

    test('#filter() » negated object', () => {
        const data = { name: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        const globs = ['*', '!phone'];
        const filtered = notate(data).filter(globs).value;
        expect(filtered.name).toEqual(data.name);
        expect(filtered.phone).toBeUndefined();
        expect(filtered.car).toBeDefined();
        // console.log(filtered);
        // console.log(data);
    });

    test('#filter() » normal and negated of the same (negated should win)', () => {
        const data = { prop: { id: 1, x: true }, y: true };
        // we have the same glob both as negated and normal. negated should win.
        let globs = ['prop.id', '!prop.id'];
        let filtered = notate(data).filter(globs).value;
        expect(filtered.prop).toBeUndefined();
        expect(filtered.y).toBeUndefined();
        // add wildcard
        globs = ['!prop.id', 'prop.id', '*'];
        filtered = notate(data).filter(globs).value;
        expect(filtered.prop).toEqual(jasmine.any(Object));
        expect(filtered.prop.id).toBeUndefined();
        expect(filtered.prop.x).toEqual(true);
        expect(filtered.y).toEqual(data.y);
    });

    test('#filter() » with/out wildcard', () => {
        const data = { name: 'Onur', id: 1 };
        // we have no wildcard '*' here.
        let globs = ['!id'];
        // should filter as `{}`
        let filtered = notate(data).filter(globs).value;
        expect(filtered).toEqual(jasmine.any(Object));
        expect(Object.keys(filtered).length).toEqual(0);
        // add wildcard
        globs = ['*', '!id'];
        filtered = notate(data).filter(globs).value;
        expect(filtered.name).toEqual(data.name);
        expect(filtered.id).toBeUndefined();
        // no negated (id is duplicate in this case)
        globs = ['*', 'id'];
        filtered = notate(data).filter(globs).value;
        expect(filtered.name).toEqual(data.name);
        expect(filtered.id).toEqual(data.id);
    });

    test('#filter() » wildcards', () => {
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
            return notate(_.cloneDeep(data)).filter(globs);
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
        // console.log(result);
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

    test('#filter() » other', () => {
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
        const originalClone = utils.cloneDeep(data);

        const filtered = notate(data).filter(globs).value;
        expect(filtered.box.model).toBeDefined();
        expect(filtered.box.router).toBeUndefined(); // "!box"
        expect(filtered.bValid).toEqual({}); // "!validation.*"
        expect(data).toEqual(originalClone);
    });

    test('#filter() » bracket', () => {
        expect(notate([{ x: 1 }]).filter(['*']).value).toEqual([{ x: 1 }]);
        expect(notate([{ x: 1 }]).filter(['[*]']).value).toEqual([{ x: 1 }]);

        const obj = [
            { x: 1, y: [2, 3, { z: 4 }] },
            [1, 2, 3],
            { 'my-prop': [4, 5] }
        ];

        // [0].x.* is invalid since x is not an object but a number
        expect(() => notate(obj).filter(['[*]', '![0].x.*'])).toThrow();

        const globs = ['[*]', '![0].x', '![0].y[1]', '![0].y[2].z', '![2]["my-prop"][0]'];
        const filtered = notate(obj).filter(globs).value;

        expect(filtered[0].y[1]).toEqual({ z: 4 });
        expect(filtered[0].x).toBeUndefined();
        expect(filtered[1]).toEqual([1, 2, 3]);
        expect(filtered[2]['my-prop']).toEqual([5]);
    });

    test('#filter() » bracket 2', () => {
        let filtered = null;

        let obj = [
            [1, 2, 3],
            [4, 5, [[6]]],
            [7, 8]
        ];

        let globs = ['[*]', '![*][1]', '![0][1]', '![0][2]', '![1][2][0]'];
        filtered = notate(obj).filter(globs).value;
        expect(filtered[0].length).toEqual(1);

        filtered = notate([0, 1, 2]).filter(['[*]', '![2]', '![0]']).value;
        expect(filtered).toEqual([1]);

        filtered = notate([0, 1, [2, 3], 4, 5]).filter(['[*]', '![2][*]']).value;
        expect(filtered).toEqual([0, 1, [], 4, 5]);

        filtered = notate([0, 1, [2, 3, 4], 5, 6]).filter(['[*]', '![2][1]']).value;
        expect(filtered).toEqual([0, 1, [2, 4], 5, 6]);

        filtered = notate(filtered).filter(['[*]', '![1]', '![4]']).value;
        expect(filtered).toEqual([0, [2, 4], 5]);

        filtered = notate([0, 1, [2, 3, 4], 5, [6, 7, 8], 9]).filter(['[*]', '![*][1]']).value;
        expect(filtered).toEqual([0, 1, [2, 4], 5, [6, 8], 9]);

        filtered = notate([0, 1, [2, 3, 4, 1], 5, [3, 6, 7, 8], 9]).filter(['[*]', '![*][*]']).value;
        expect(filtered).toEqual([0, 1, [], 5, [], 9]);

        filtered = notate([0, 1, [2, 3, 4], 5, [{ x: 1 }], [6, 7], [8, [9, 10]]]).filter(['[*]', '![*][*]']).value;
        expect(filtered).toEqual([0, 1, [], 5, [], [], []]);

        filtered = notate([0, 1, [2, [3]], 4]).filter(['[*]', '![2][1][*]']).value;
        expect(filtered).toEqual([0, 1, [2, []], 4]);

        filtered = notate([0, 1, [2, [3, [5], 6]], 4]).filter(['[*]', '![2][*][1][*]']).value;
        expect(filtered).toEqual([0, 1, [2, [3, [], 6]], 4]);

        filtered = notate([0, 1, [2, [[null], [5], 6]], [4]]).filter(['[*]', '![2][*][*][*]']).value;
        expect(filtered).toEqual([0, 1, [2, [[], [], 6]], [4]]);

        filtered = notate([0, 1, [2], [null], null, [undefined], undefined]).filter(['[*]', '![*][*]']).value;
        expect(filtered).toEqual([0, 1, [], [], null, [], undefined]);

        filtered = notate([{ x: [3] }]).filter(['[*]', '![0].x[*]']).value;
        expect(filtered).toEqual([{ x: [] }]);

        filtered = notate([{ x: [{ y: 1 }, { z: 2, y: 3 }] }]).filter(['[*]', '![0].x[*].y']).value;
        expect(filtered).toEqual([{ x: [{}, { z: 2 }] }]);

        obj = [{ x: [{ y: 1 }, { z: 2, y: 3 }] }];
        globs = ['[*]', '![0].x[*].y.*'];
        // expect no change bec. no y is object
        expect(notate(obj).filter(globs).value).toEqual(obj);
        // same should throw in strict mode
        filtered = () => notate(obj, { strict: true }).filter(globs).value;
        expect(filtered).toThrow();

        obj = [{ x: [{ y: { a: 1 } }, { z: 2, y: { b: 3, c: 4 } }] }];
        filtered = notate(obj, { strict: true }).filter(globs).value;
        expect(filtered).toEqual([{ x: [{ y: {} }, { z: 2, y: {} }] }]);

        obj = [{ x: [{ y: [1] }, { z: 2, y: [3, 4] }] }];
        filtered = notate(obj).filter(globs).value;
        // expect no change bec. no y is object
        expect(filtered).toEqual(obj);

        obj = [{ x: [{ y: [1] }, { z: 2, y: [3, 4] }] }];
        filtered = notate(obj).clone().filter(globs).value;
        // expect no change bec. no y is object
        expect(filtered).toEqual(obj);

        globs = ['[*]', '![0].x[*].y[*]'];
        filtered = notate(obj).clone().filter(globs).value;
        expect(filtered).toEqual([{ x: [{ y: [] }, { z: 2, y: [] }] }]);

        filtered = notate({ x: null }).filter(['*', '!x[*]']).value;
        expect(filtered).toEqual({ x: [] });
        filtered = notate({ x: undefined }).filter(['*', '!x[*]']).value;
        expect(filtered).toEqual({ x: [] });

        // the glob wildcard determines the empty value ({} or []) in non-strict
        // mode
        filtered = notate({ x: null }).filter(['*', '!x.*']).value;
        expect(filtered).toEqual({ x: {} });
        filtered = notate({ x: undefined }).filter(['*', '!x.*']).value;
        expect(filtered).toEqual({ x: {} });

        // should throw for null & undefined in strict mode
        filtered = () => notate({ x: null }, { strict: true }).filter(['*', '!x[*]']).value;
        expect(filtered).toThrow();
        filtered = () => notate({ x: undefined }, { strict: true }).filter(['*', '!x[*]']).value;
        expect(filtered).toThrow();
        filtered = () => notate({ x: null }, { strict: true }).filter(['*', '!x.*']).value;
        expect(filtered).toThrow();
        filtered = () => notate({ x: undefined }, { strict: true }).filter(['*', '!x.*']).value;
        expect(filtered).toThrow();

        // should always throw on critical type-mismatch (regardless of strict mode)
        filtered = () => notate({ x: 'string' }).filter(['*', '!x.*']).value;
        expect(filtered).toThrow();
        filtered = () => notate({ x: true }).filter(['*', '!x[*]']).value;
        expect(filtered).toThrow();
    });

    test('#filter() » bracket 3', () => {
        let obj = {
            a: { x: 1, y: 2 },
            b: { x: 3, y: 4 }
        };
        let filtered;

        const expected = { a: { x: 1 }, b: { x: 3 } };
        filtered = notate(obj).filter('*.x').value;
        expect(filtered).toEqual(expected);
        filtered = notate(obj).filter('*["x"]').value;
        expect(filtered).toEqual(expected);
        filtered = notate(obj).filter("*['x']").value;
        expect(filtered).toEqual(expected);

        obj = { 'x.y': { z: 1 }, 'x': { y: { z: 2 } } };
        filtered = notate(obj).filter('["x.y"].z').value;
        expect(filtered).toEqual({ 'x.y': { z: 1 } });
        const nota = notate(obj);
        expect(nota.filter('x.y.z').value).toEqual({ x: { y: { z: 2 } } });
        expect(nota.filter('x.y.z').value).toEqual(nota.filter('x').value);

        obj = { 'a': [1], 'b': 2, 'c': [3, 4], 'd.e': 5 };
        filtered = notate(obj).filter(['c[1]', '["d.e"]', 'a[*]']).value;
        // c[1] will create sparse array which is normal
        expect(filtered).toEqual({ 'a': [1], 'c': [undefined, 4], 'd.e': 5 });
    });

});
