/* Targeted edge-case coverage for branches/functions not hit by the main suites. */

import { Notation } from '../src/core/Notation.js';
import { NotationError } from '../src/core/NotationError.js';
import { NotationGlob } from '../src/core/NotationGlob.js';
import { utils } from '../src/utils.js';

describe('edge cases', () => {
  test('utils.cleanSparseArray() removes holes (and undefined)', () => {
    const out = utils.cleanSparseArray([0, , 1, , undefined, , null]);
    expect(out).toEqual([0, 1, null]);
  });

  test('NotationGlob.join() builds glob and validates notes', () => {
    expect(NotationGlob.join(['x', 'y', 'z'])).toBe('x.y.z');
    expect(NotationGlob.join(['x', '*'])).toBe('x.*');
    // bracket note is appended without a separating dot
    expect(NotationGlob.join(['x', '[0]'])).toBe('x[0]');
    // normalize removes trailing wildcards
    expect(NotationGlob.join(['x', '*'], true)).toBe('x');
    // an empty/invalid note throws
    expect(() => NotationGlob.join(['x', ''])).toThrow(NotationError);
  });

  test('NotationGlob.isValidNote()', () => {
    expect(NotationGlob.isValidNote('x')).toBe(true);
    expect(NotationGlob.isValidNote('*')).toBe(true);
    expect(NotationGlob.isValidNote('[0]')).toBe(true);
    expect(NotationGlob.isValidNote('')).toBe(false);
    expect(NotationGlob.isValidNote(123 as unknown as string)).toBe(false);
  });

  test('NotationGlob#covers() accepts an array of notes', () => {
    const g = NotationGlob.create('x.*');
    expect(g.covers(['x', 'y'])).toBe(true);
  });

  test('Notation#set() resets a non-collection parent when going deeper', () => {
    const n = Notation.create<Record<string, unknown>>({}).set('a.b', 1);
    // a.b is currently a primitive (1); setting a.b.c must reset it to an object
    n.set('a.b.c', 2);
    expect(n.get('a.b.c')).toBe(2);
  });

  test('Notation#set() resets a non-collection parent to an array for a numeric note', () => {
    const n = Notation.create<Record<string, unknown>>({}).set('a.b', 1);
    // a.b is a primitive (1); setting a.b[0] must reset it to an array
    n.set('a.b[0]', 2);
    expect(n.get('a.b[0]')).toBe(2);
    expect(Array.isArray(n.get('a.b'))).toBe(true);
  });

  test('Notation#filter() with negated object- and array-wildcard globs', () => {
    const obj = Notation.create({ a: { b: 1, c: 2 }, d: 3 }).filter(['*', '!a.*']).value;
    expect(obj).toEqual({ a: {}, d: 3 });

    const arr = Notation.create({ a: [1, 2, 3], d: 3 }).filter(['*', '!a[*]']).value;
    expect(arr).toEqual({ a: [], d: 3 });
  });
});
