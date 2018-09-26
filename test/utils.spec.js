/* eslint camelcase:0, consistent-return:0, max-lines-per-function:0 */

import utils from '../src/utils';

describe('utils', () => {

    test('.isObject(), .isArray(), .ensureArray()', () => {
        expect(utils.isObject({})).toEqual(true);
        expect(utils.isObject([])).toEqual(false);
        expect(utils.isObject(null)).toEqual(false);
        expect(utils.isObject(undefined)).toEqual(false);
        expect(utils.isObject(new Error())).toEqual(false);
        expect(utils.isObject(new Date())).toEqual(false);

        expect(utils.isArray([])).toEqual(true);
        expect(utils.isArray({})).toEqual(false);
        expect(utils.isArray(null)).toEqual(false);
        expect(utils.isArray(undefined)).toEqual(false);

        expect(utils.ensureArray(null)).toEqual([]);
        expect(utils.ensureArray(undefined)).toEqual([]);
        expect(utils.ensureArray(true)).toEqual([true]);
        expect(utils.ensureArray(false)).toEqual([false]);
        expect(utils.ensureArray([null])).toEqual([null]);
        expect(utils.ensureArray(1)).toEqual([1]);
        expect(utils.ensureArray('str')).toEqual(['str']);
    });

    test('.hasOwn(), .deepCopy()', () => {
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

        expect(utils.deepCopy({})).toEqual({});
        expect(utils.deepCopy(null)).toEqual(null);
        const o = { a: { b: { c: [1, { o: 2 }, 3] }, x: true, y: { d: 'e', f: 4 } }, z: 5 };
        let copy = utils.deepCopy(o);
        expect(copy).toEqual(o);
        expect(copy === o).toEqual(false);
        copy = utils.deepCopy([o]);
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

    test('.normalizeGlobStr()', () => {
        expect(utils.normalizeGlobStr(' * ')).toEqual('*');
        expect(utils.normalizeGlobStr(' *.x ')).toEqual('*.x');
        expect(utils.normalizeGlobStr(' [*] ')).toEqual('[*]');
        expect(utils.normalizeGlobStr(' [*].x ')).toEqual('[*].x');
        expect(utils.normalizeGlobStr('[*].x')).toEqual('[*].x');
        expect(utils.normalizeGlobStr(' *[*] ')).toEqual('*');
        expect(utils.normalizeGlobStr('*[*] ')).toEqual('*');
        expect(utils.normalizeGlobStr(' [*].*')).toEqual('[*]');
        expect(utils.normalizeGlobStr('[*].*')).toEqual('[*]');
        expect(utils.normalizeGlobStr('*[*].*[*]')).toEqual('*');
        expect(utils.normalizeGlobStr('*[*].*[*].*')).toEqual('*');
        expect(utils.normalizeGlobStr('!*[*].*[*].*')).toEqual('!*[*].*[*].*');
        expect(utils.normalizeGlobStr('*[*].*[*].*.x')).toEqual('*[*].*[*].*.x');
        expect(utils.normalizeGlobStr('x.*[*].*[*].*')).toEqual('x');
        expect(utils.normalizeGlobStr('[*].*[*].*')).toEqual('[*]');
        expect(utils.normalizeGlobStr('[*].*[*].*[*]')).toEqual('[*]');
        expect(utils.normalizeGlobStr('![*].*[*].*[*]')).toEqual('![*].*[*].*[*]');
        expect(utils.normalizeGlobStr('[*].*[*].*[*].x')).toEqual('[*].*[*].*[*].x');
        expect(utils.normalizeGlobStr('x[*].*[*].*[*]')).toEqual('x');
    });

});
