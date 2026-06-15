/* Behavior-asserting tests targeting mutation-test survivors in utils. */

import { utils } from '../src/utils.js';

describe('utils (mutation-targeted)', () => {
  test('cloneDeep() clones Date / RegExp / Symbol exactly', () => {
    const d = new Date('2020-01-02T03:04:05.678Z');
    const cd = (utils.cloneDeep({ d }) as { d: Date }).d;
    expect(cd).toBeInstanceOf(Date);
    expect(cd).not.toBe(d);
    expect(cd.getTime()).toEqual(d.getTime());

    const re = /ab+c/gi;
    re.lastIndex = 2;
    const cre = (utils.cloneDeep({ re }) as { re: RegExp }).re;
    expect(cre).toBeInstanceOf(RegExp);
    expect(cre).not.toBe(re);
    expect(cre.source).toEqual('ab+c');
    expect(cre.flags).toEqual('gi');
    expect(cre.lastIndex).toEqual(2);

    const s = Symbol('x');
    const cs = (utils.cloneDeep({ s }) as { s: symbol }).s;
    expect(typeof cs).toEqual('object'); // Object-wrapped symbol, not the raw symbol
    expect((cs as { valueOf(): symbol }).valueOf()).toBe(s);
  });

  test('eachRight() iterates in reverse and stops on `false`', () => {
    const seen: number[] = [];
    utils.eachRight([1, 2, 3, 4], (v) => {
      seen.push(v as number);
      if (v === 3) return false;
    });
    expect(seen).toEqual([4, 3]); // reverse order, stopped after 3
  });

  test('hasOwn() distinguishes objects, arrays and bad keys', () => {
    expect(utils.hasOwn({ a: 1 }, 'a')).toEqual(true);
    expect(utils.hasOwn({ a: 1 }, 'b')).toEqual(false);
    expect(utils.hasOwn({ a: 1 }, '')).toEqual(false); // empty key
    expect(utils.hasOwn(['x', 'y'], 0)).toEqual(true);
    expect(utils.hasOwn(['x', 'y'], 2)).toEqual(false); // out of range
    expect(utils.hasOwn(['x', 'y'], -1)).toEqual(false); // negative
    expect(utils.hasOwn(['x', 'y'], '0')).toEqual(false); // string index on array
  });

  test('stringOrArrayOf()', () => {
    expect(utils.stringOrArrayOf('a', 'a')).toEqual(true);
    expect(utils.stringOrArrayOf(['a'], 'a')).toEqual(true);
    expect(utils.stringOrArrayOf(['a'], 'b')).toEqual(false);
    expect(utils.stringOrArrayOf(['a', 'b'], 'a')).toEqual(false); // length must be 1
    expect(utils.stringOrArrayOf([], 'a')).toEqual(false);
    expect(utils.stringOrArrayOf('a', 'b')).toEqual(false);
  });

  test('hasSingleItemOf()', () => {
    expect(utils.hasSingleItemOf(['a'], 'a')).toEqual(true);
    expect(utils.hasSingleItemOf(['a'], 'b')).toEqual(false);
    expect(utils.hasSingleItemOf(['a', 'b'], 'a')).toEqual(false); // length must be 1
    expect(utils.hasSingleItemOf(['a'])).toEqual(true); // no rest -> only length check
    expect(utils.hasSingleItemOf(['a'], 'a', 'b')).toEqual(true); // rest>1 -> length only
  });

  test('joinNotes() uses dots and brackets correctly', () => {
    expect(utils.joinNotes(['a', 'b', 'c'])).toEqual('a.b.c');
    expect(utils.joinNotes(['x', 'y', '[2]', 'z'])).toEqual('x.y[2].z');
    expect(utils.joinNotes(['a', '[0]'])).toEqual('a[0]');
    expect(utils.joinNotes(['only'])).toEqual('only');
  });

  test('normalizeNote() handles single/double/backtick brackets', () => {
    expect(utils.normalizeNote("['a']")).toEqual('a'); // m[1]
    expect(utils.normalizeNote('["b"]')).toEqual('b'); // m[2]
    expect(utils.normalizeNote('[`c`]')).toEqual('c'); // m[3]
    expect(utils.normalizeNote('[7]')).toEqual(7); // numeric index
    expect(() => utils.normalizeNote('bad note')).toThrow(/Invalid note/);
  });

  test('getNewNotation() trims, falls back, or throws', () => {
    expect(utils.getNewNotation('  new  ', 'old')).toEqual('new'); // trimmed
    expect(utils.getNewNotation(null, 'old')).toEqual('old'); // fallback to notation
    expect(utils.getNewNotation(undefined, 'old')).toEqual('old');
    expect(() => utils.getNewNotation('   ', 'old')).toThrow(/Invalid new notation/);
    expect(() => utils.getNewNotation(null, null)).toThrow(/Invalid new notation/);
  });
});
