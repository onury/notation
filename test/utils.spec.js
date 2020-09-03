/* eslint camelcase:0, consistent-return:0, max-lines-per-function:0 */

import { utils } from '../src/utils';

describe('utils', () => {

    test('.type(), .ensureArray()', () => {
        expect(utils.type({})).toEqual('object');
        expect(utils.type([])).toEqual('array');
        expect(utils.type(null)).toEqual('null');
        expect(utils.type(undefined)).toEqual('undefined');
        expect(utils.type(new Error())).toEqual('error');
        expect(utils.type(new Date())).toEqual('date');

        expect(utils.ensureArray(null)).toEqual([]);
        expect(utils.ensureArray(undefined)).toEqual([]);
        expect(utils.ensureArray(true)).toEqual([true]);
        expect(utils.ensureArray(false)).toEqual([false]);
        expect(utils.ensureArray([null])).toEqual([null]);
        expect(utils.ensureArray(1)).toEqual([1]);
        expect(utils.ensureArray('str')).toEqual(['str']);
    });

    test('.hasOwn(), .cloneDeep()', () => {
        expect(utils.hasOwn({ a: 1 }, 'a')).toEqual(true);
        expect(utils.hasOwn({ a: 1 }, 'b')).toEqual(false);
        expect(utils.hasOwn({}, 'hasOwnProperty')).toEqual(false);
        expect(utils.hasOwn({ hasOwnProperty: () => true }, 'x')).toEqual(false);
        function Obj() {} // eslint-disable-line
        Obj.prototype.hasOwnProperty = () => true;
        expect(utils.hasOwn(new Obj(), 'x')).toEqual(false);
        expect(utils.hasOwn(['0', 'a'], 0)).toEqual(true);
        expect(utils.hasOwn(['0', 'a'], '0')).toEqual(false);
        expect(utils.hasOwn(['2', 'a'], 2)).toEqual(false);

        expect(utils.cloneDeep({})).toEqual({});
        expect(utils.cloneDeep(null)).toEqual(null);
        const o = { a: { b: { c: [1, { o: 2 }, 3] }, x: true, y: { d: 'e', f: 4 } }, z: 5 };
        let copy = utils.cloneDeep(o);
        expect(copy).toEqual(o);
        expect(copy === o).toEqual(false);
        copy = utils.cloneDeep([o]);
        expect(copy).toEqual([o]);
        expect(copy === [o]).toEqual(false);
    });

    test('.each(), .eachRight()', () => {
        const a = [1, 2, 3, 4];

        let out = [];
        utils.each(a, (value, index, list) => {
            expect(value).toEqual(a[index]);
            expect(index).toEqual(a[index] - 1);
            expect(a).toEqual(list);
            out.push(value);
        });
        expect(out).toEqual(a);

        out = [];
        utils.eachRight(a, (value, index, list) => {
            expect(value).toEqual(a[index]);
            expect(index).toEqual(a[index] - 1);
            expect(a).toEqual(list);
            out.push(value);
        });
        expect(out).toEqual(a.reverse());

        // break out / return early test
        out = [];
        utils.each(a, (value, index) => {
            if (index <= 1) {
                out.push(value);
            } else {
                return false;
            }
        });
        expect(out.length).toEqual(2);

        out = [];
        utils.eachRight(a, (value, index) => {
            if (index > 1) {
                out.push(value);
            } else {
                return false;
            }
        });
        expect(out.length).toEqual(2);
    });

    test('.eachItem()', () => {
        const c1 = [1, 'a', true, { x: [2] }, [3]];
        let out = [];
        utils.eachItem(c1, (item, index, collection) => {
            out.push([index, item]);
            expect(collection).toEqual(c1);
        });
        expect(out).toEqual([[0, 1], [1, 'a'], [2, true], [3, { x: [2] }], [4, [3]]]);

        const c2 = { a: 1, b: true, c: [2], d: { e: 3 }, f: 'f' };
        out = [];
        utils.eachItem(c2, (item, key, collection) => {
            out.push([key, item]);
            expect(collection).toEqual(c2);
        });
        expect(out).toEqual([
            ['a', 1],
            ['b', true],
            ['c', [2]],
            ['d', { e: 3 }],
            ['f', 'f']
        ]);
    });

    test('.stringOrArrayOf(), .hasSingleItemOf()', () => {
        expect(utils.stringOrArrayOf('test', 'test')).toEqual(true);
        expect(utils.stringOrArrayOf(['test'], 'test')).toEqual(true);
        expect(utils.stringOrArrayOf(['test'], 'x')).toEqual(false);
        expect(utils.stringOrArrayOf([1], 1)).toEqual(false); // should be string

        expect(utils.hasSingleItemOf(['test'], 'test')).toEqual(true);
        expect(utils.hasSingleItemOf(['t'])).toEqual(true);
        expect(utils.hasSingleItemOf(['t'], 't')).toEqual(true);
        expect(utils.hasSingleItemOf(['t'], 'x')).toEqual(false);
        expect(utils.hasSingleItemOf([1], 1)).toEqual(true);
    });

    test('.pregQuote()', () => {
        expect(utils.pregQuote('*')).toEqual('\\*');
        expect(utils.pregQuote('[.+]')).toEqual('\\[\\.\\+\\]');
        expect(utils.pregQuote('[a-z]')).toEqual('\\[a\\-z\\]');
        expect(utils.pregQuote('(?:1|2)')).toEqual('\\(\\?\\:1\\|2\\)');
        expect(utils.pregQuote('x y z 1 2 3')).toEqual('x y z 1 2 3');
    });

    test('.normalizeNote()', () => {
        expect(utils.normalizeNote('a')).toEqual('a');
        expect(() => utils.normalizeNote('a.b')).toThrow();
        expect(() => utils.normalizeNote('[a.b]')).toThrow();
        expect(() => utils.normalizeNote('["a.b"]')).not.toThrow();

        expect(utils.normalizeNote('[1]')).toEqual(1);
        expect(() => utils.normalizeNote('[1.1]')).toThrow();
        expect(() => utils.normalizeNote('[-1]')).toThrow();

        expect(utils.normalizeNote('["-1"]')).toEqual('-1');
        expect(utils.normalizeNote('["1"]')).toEqual('1');
        expect(utils.normalizeNote('["[x]"]')).toEqual('[x]');
        expect(utils.normalizeNote('["x.y"]')).toEqual('x.y');

        expect(() => utils.normalizeNote('[]')).toThrow();
        // obj[''] = value is allowed in JS
        expect(() => utils.normalizeNote('[""]')).not.toThrow();
        // but cannot be represented without brackets
        expect(() => utils.normalizeNote('')).toThrow();
    });

    test('.removeTrailingWildcards()', () => {
        expect(utils.removeTrailingWildcards('*[*]')).toEqual('*');
        expect(utils.removeTrailingWildcards('[*].*')).toEqual('[*]');
        expect(utils.removeTrailingWildcards('*[*].*[*]')).toEqual('*');
        expect(utils.removeTrailingWildcards('*[*].*[*].*')).toEqual('*');
        expect(utils.removeTrailingWildcards('!*[*].*[*].*')).toEqual('!*[*].*[*].*');
        expect(utils.removeTrailingWildcards('*[*].*[*].*.x')).toEqual('*[*].*[*].*.x');
        expect(utils.removeTrailingWildcards('x.*[*].*[*].*')).toEqual('x');
        expect(utils.removeTrailingWildcards('[*].*[*].*')).toEqual('[*]');
        expect(utils.removeTrailingWildcards('[*].*[*].*[*]')).toEqual('[*]');
        expect(utils.removeTrailingWildcards('![*].*[*].*[*]')).toEqual('![*].*[*].*[*]');
        expect(utils.removeTrailingWildcards('[*].*[*].*[*].x')).toEqual('[*].*[*].*[*].x');
        expect(utils.removeTrailingWildcards('x[*].*[*].*[*]')).toEqual('x');
    });

    test('.cloneDeep()', () => {
        const now = Date.now();
        const original = {
            str: 'string',
            num: 1,
            bool: true,
            date: new Date(now),
            regexp: /abc/i,
            arr: [1, { a: 2, b: 3 }, [4, 5]],
            obj: { x: 1, y: { z: true } },
            nil: null,
            undef: undefined
        };
        let cloned = utils.cloneDeep(original);
        expect(original).toEqual(cloned);

        // symbols are unique, so won't be exact but values should match
        original.symbol = Symbol('test');
        cloned = utils.cloneDeep(original);
        expect(original.symbol.valueOf()).toEqual(cloned.symbol.valueOf());

        original.circular = original;
        expect(() => utils.cloneDeep(original)).toThrow();
    });

});
