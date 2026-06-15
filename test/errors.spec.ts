/* Asserts thrown error *messages* (not just that something throws), to pin the
   message constants against mutation. */

import { Notation } from '../src/core/Notation.js';
import { NotationGlob } from '../src/core/NotationGlob.js';

const create = Notation.create;

describe('error messages', () => {
  test('invalid source', () => {
    expect(() => new Notation(1 as unknown as object)).toThrow(/Invalid source/);
    expect(() => new Notation('x' as unknown as object)).toThrow(/Invalid source/);
  });

  test('invalid destination (copyTo / moveTo)', () => {
    expect(() => create({ a: 1 }).copyTo(1 as unknown as object, 'a')).toThrow(
      /Invalid destination/
    );
    expect(() => create({ a: 1 }).moveTo(1 as unknown as object, 'a')).toThrow(
      /Invalid destination/
    );
  });

  test('invalid notations object (merge / separate)', () => {
    // source is an array -> notations object must be an array
    expect(() => create([1]).merge({} as unknown as unknown[])).toThrow(
      /Invalid notations object\. Expected an array/
    );
    // source is an object -> notations object must be an object
    expect(() => create({}).merge([] as unknown as object)).toThrow(
      /Invalid notations object\. Expected an object/
    );
    expect(() => create([1]).separate('x' as unknown as string[])).toThrow(
      /Invalid notations object\. Expected an array/
    );
  });

  test('invalid glob notation', () => {
    expect(() => new NotationGlob('a..b')).toThrow(/Invalid glob notation/);
    expect(() => NotationGlob.normalize(['a..b'])).toThrow(/Invalid glob notation/);
    expect(() => NotationGlob.split('a..b')).toThrow(/Invalid glob notation/);
  });
});
