/* eslint-disable no-sparse-arrays */
/* eslint-disable no-console */
/* eslint-disable prefer-arrow/prefer-arrow-functions */

import type { INotationOptions } from '../src/core/INotationOptions.js';

import { Notation } from '../src/core/Notation.js';
import type { Collection, UnknownObject } from '../src/types.js';

/**
 *  Test Suite: Notation
 *  @module   notation.spec
 */
describe('Test Suite: Array/Bracket notation', () => {
  const objSource = {
    arr: [
      { x: { y: 0 }, z: 3 },
      { x: { y: 1 }, z: 4 },
      { x: { y: 2 }, z: 5 }
    ],
    de: {
      e: {
        p: [{ x: { y: [0, null] } }, { x: { y: [1, 3] } }, { x: { y: [2, 4] } }]
      }
    }
  };

  const arrInArr = {
    x: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ],
    y: {
      z: [
        [0, 1, 2],
        [[3], [4], [5]]
      ]
    }
  };

  function create(data: Collection, opts?: INotationOptions): Notation {
    return Notation.create(structuredClone(data), opts);
  }

  function fnFilter(data: Collection) {
    return (globs: string | string[]): Notation<typeof data> => create(data).filter(globs);
  }

  test('Notation .isvalid()', () => {
    expect(Notation.isValid('a.[0]')).toEqual(false);
    expect(Notation.isValid('a[0]b')).toEqual(false);
    expect(Notation.isValid('a[0].b')).toEqual(true);
    expect(Notation.isValid('a[0].b[0]')).toEqual(true);
    expect(Notation.isValid('a[0].b[0].c')).toEqual(true);
    expect(Notation.isValid('a[0].b[0].c.d')).toEqual(true);
    expect(Notation.isValid('a[0].b[0].c.d[2]')).toEqual(true);
    expect(Notation.isValid('a[0].b[0].c.d[2].x[2][1]')).toEqual(true);
    expect(Notation.isValid('x[0][10][2][5][3][4][200][0].y')).toEqual(true);
  });

  test('Notation .countNotes(), .parent(), .first(), .last()', () => {
    const pattern = 'arr[0].x[1][0].y[5]';
    expect(Notation.countNotes(pattern)).toEqual(7);
    expect(Notation.parent(pattern)).toEqual('arr[0].x[1][0].y');
    expect(Notation.parent('arr[0]')).toEqual('arr');
    expect(Notation.first(pattern)).toEqual('arr');
    expect(Notation.last(pattern)).toEqual('[5]');
  });

  // test('Notation .eachNote()', () => {
  //     const pattern = 'arr[0].x[1][0].y[5]';
  //     const result = {
  //         0: { levelNota: 'arr', note: 'arr' },
  //         1: { levelNota: 'arr[0]', note: '[0]' },
  //         2: { levelNota: 'arr[0].x', note: 'x' },
  //         3: { levelNota: 'arr[0].x[1]', note: '[1]' },
  //         4: { levelNota: 'arr[0].x[1][0]', note: '[0]' },
  //         5: { levelNota: 'arr[0].x[1][0].y', note: 'y' },
  //         6: { levelNota: 'arr[0].x[1][0].y[5]', note: '[5]' }
  //     };
  //     let c = 0;
  //     Notation.eachNote(pattern, (levelNota, note, index) => {
  //         const expected = result[index];
  //         expect(levelNota).toEqual(expected.levelNota);
  //         expect(note).toEqual(expected.note);
  //         c++;
  //     });
  //     expect(c).toEqual(Notation.countNotes(pattern));
  // });

  test('Notation #each()', () => {
    const nota = Notation.create({ a: [{ x: 1, y: 2 }], b: { c: [3, [4], [, { z: 5 }]] } });
    const result = [
      { notation: 'a[0].x', key: 'x', value: 1 },
      { notation: 'a[0].y', key: 'y', value: 2 },
      { notation: 'b.c[0]', key: '[0]', value: 3 },
      { notation: 'b.c[1][0]', key: '[0]', value: 4 },
      { notation: 'b.c[2][0]', key: '[0]', value: undefined },
      { notation: 'b.c[2][1].z', key: 'z', value: 5 }
    ];
    let i = 0;
    nota.each((notation, key, value, _object) => {
      const expected = result[i];
      expect(notation).toEqual(expected.notation);
      expect(key).toEqual(expected.key);
      expect(value).toEqual(expected.value);
      i++;
      // console.log(notation, ',', key, ',', value);
    });
    expect(i).toEqual(6);
  });

  test('Notation #eachValue()', () => {
    const dArr = [, { z: 5 }];
    const cArr = [3, [4], dArr];
    const bObj = { c: cArr };
    const nota = create({ a: 9, b: bObj });
    // results for b.c[2] iteration
    const result = {
      0: {
        levelValue: bObj,
        notation: 'b',
        key: 'b'
      },
      1: {
        levelValue: cArr,
        notation: 'b.c',
        key: 'c'
      },
      2: {
        levelValue: dArr,
        notation: 'b.c[2]',
        key: '[2]'
      }
    };
    let i = 0;
    nota.eachValue('b.c[2]', (levelValue, notation, key) => {
      const expected = result[i];
      // console.log('>>> eachValue:', i, notation, key);
      // console.log('>>> levelValue:', levelValue, expected.levelValue);
      expect(levelValue).toEqual(expected.levelValue);
      expect(notation).toEqual(expected.notation);
      expect(key).toEqual(expected.key);
      i++;
    });
    expect(i).toEqual(3);
  });

  test('Notation #getNotations()', () => {
    const nota = create({ a: [{ x: 1, y: 2 }], b: { c: [3, [4], [, { z: 5 }]] } });
    expect(nota.getNotations()).toEqual([
      'a[0].x',
      'a[0].y',
      'b.c[0]',
      'b.c[1][0]',
      'b.c[2][0]',
      'b.c[2][1].z'
    ]);
  });

  test('Notation #get()', () => {
    let nota = create(objSource);
    expect(nota.get('arr[0].x')).toEqual({ y: 0 });
    expect(nota.get('arr[1].x.y')).toEqual(1);
    expect(nota.get('arr[2]')).toEqual({ x: { y: 2 }, z: 5 });

    expect(nota.get('de.e.p[0].x')).toEqual({ y: [0, null] });
    expect(nota.get('de.e.p[1].x.y')).toEqual([1, 3]);
    expect(nota.get('de.e.p[2].x.y[1]')).toEqual(4);

    // star not allowed in Notation class (except #filter method)
    expect(() => nota.get('de.e.p[*].x')).toThrow();

    nota = create(arrInArr);
    expect(nota.get('x[1][1]')).toEqual(4);
    expect(nota.get('x[2][0]')).toEqual(6);
    expect(nota.get('y.z[0]')).toEqual([0, 1, 2]);
    expect(nota.get('y.z[0][2]')).toEqual(2);
    expect(nota.get('y.z[1][1][0]')).toEqual(4);

    // TODO: we should support notation starting with brackets (i.e. array
    // as source). but this is not crucial for this PR.

    // nota = create([{ x: 1 }, { x: 2 }, { x: 3 }]);
    // expect(nota.get('[1].x')).toEqual(2); // currently fails
  });

  test('Notation #set(), #has(), #hasDefined()', () => {
    let nota = create({});

    nota.set('x.y[1]', { z: 1 });
    expect(nota.get('x.y[0]')).toEqual(undefined);
    expect(nota.value.x.y[0]).toEqual(undefined);
    expect(nota.has('x.y[0]')).toEqual(true);
    expect(nota.hasDefined('x.y[0]')).toEqual(false);
    expect(nota.get('x.y[1].z')).toEqual(1);
    expect(nota.value.x.y[1].z).toEqual(1);
    nota.set('x.y[0]', { z: 5 });
    expect(nota.get('x.y[0].z')).toEqual(5);
    nota.set('x.y[2].a.b.c[2]', [1, 2, 3]);
    expect(nota.get('x.y[2].a')).toEqual({ b: { c: [, , [1, 2, 3]] } });

    nota = create({}).set('x.y[1]', undefined);
    expect(nota.has('x.y[1]')).toEqual(true);
    expect(nota.hasDefined('x.y[1]')).toEqual(false);
    expect(nota.has('x.y[0]')).toEqual(true);
    expect(nota.hasDefined('x.y[0]')).toEqual(false);
    expect(nota.has('x.y[2]')).toEqual(false);
    expect(nota.hasDefined('x.y[2]')).toEqual(false);

    // TODO: source as an array. we'll add support later...
    // nota = create([]);
    // nota.set('[1].x', 'test');
    // expect(nota.get('[0]')).toEqual(undefined);
    // expect(nota.get('[1]')).toEqual({ x: 'test' });
  });

  test('Notation #merge()', () => {
    const nota = create({ a: [{ x: 1 }], b: { c: [3] } });
    let merged = nota.merge({ a: [{ y: 2 }] }, false);
    expect(merged.value.a[0]).toEqual({ x: 1 });
    merged = nota.merge({ a: [{ y: 2 }] }, true);
    expect(merged.value.a[0]).toEqual({ y: 2 });
    merged = nota.merge({ b: { c: [4, 5] } }, true);
    expect(merged.value.b.c).toEqual([4, 5]);
  });

  test('Notation #separate()', () => {
    const obj = { a: [{ x: 1 }], b: { c: [1, 2] } };
    const nota = create(obj);
    const separated = nota.separate(['b.c[1]', 'a[0].x']);
    expect(separated.b.c[1]).toEqual(2);
    expect(separated.a[0].x).toEqual(1);
    expect(nota.value.b.c).toEqual([1]);
    expect(nota.value.a[0]).toEqual({});
  });

  test('Notation #remove()', () => {
    const nota = create({ a: [{ x: 1, y: 2 }], b: { c: [3, 4, 5] } });
    expect(nota.remove('a[0].y').value.a[0]).toEqual({ x: 1 });
    expect(nota.remove('b.c[1]').value.b.c).toEqual([3, 5]);
    // console.log(nota.value);
  });

  test('Notation #copyTo()', () => {
    const nota = create({ a: [{ x: 1, y: 2 }], b: { c: [3, 4, 5] } });
    let dest = {};
    nota.copyTo(dest, 'a[0].y');
    expect(dest).toEqual({ a: [{ y: 2 }] });
    dest = { x: [] };
    nota.copyTo(dest, 'a[0].y', 'x[1].z');
    expect(dest).toEqual({ x: [, { z: 2 }] });
  });

  test('Notation #copyFrom()', () => {
    const nota = create({ a: [{ x: 1, y: 2 }], b: { c: [3, 4, 5] } });
    const dest = { e: [1, { f: [6] }] };
    nota.copyFrom(dest, 'e[1].f[0]', 'a[0].z');
    expect(nota.value.a[0].z).toEqual(6);
  });

  test('Notation #moveTo()', () => {
    const nota = create({ a: [{ x: 1, y: 2 }], b: { c: [3, 4, 5] } });
    let dest = {};
    nota.moveTo(dest, 'a[0].y');
    expect(nota.value.a).toEqual([{ x: 1 }]);
    expect(dest).toEqual({ a: [{ y: 2 }] });
    dest = { x: [] };
    nota.moveTo(dest, 'b.c[2]', 'x[1].z');
    expect(dest).toEqual({ x: [, { z: 5 }] });
    expect(nota.value.b.c).toEqual([3, 4]);
  });

  test('Notation #moveFrom()', () => {
    const nota = create({ a: [{ x: 1, y: 2 }], b: { c: [3, 4, 5] } });
    const dest: UnknownObject = { e: [1, { f: [6] }] };
    nota.moveFrom(dest, 'e[1].f[0]', 'a[0].z');
    expect(nota.value.a[0].z).toEqual(6);
    expect(dest.e[1].f).toEqual([]);
  });

  test('Notation #extract() xxx', () => {
    const nota = create({ a: [{ x: 1, y: 2 }], b: { c: [3, 4, 5] } });
    let extracted = nota.extract('a[0].y');
    expect(extracted.a).toEqual([{ y: 2 }]);
    expect(nota.value.a).toEqual([{ x: 1, y: 2 }]);
    extracted = nota.extract('b.c[1]');
    expect(extracted.b.c).toEqual([, 4]);
    expect(nota.value.b.c).toEqual([3, 4, 5]);

    const nota2 = create({ a: [{ x: 1, y: 2 }], b: { c: [3, 4, 5] } });
    extracted = nota2.extract('b.c[1]');
    expect(extracted.b.c).toEqual([undefined, 4]);
    extracted = nota2.extract('b.c[1]', 'b.c[0]');
    expect(extracted.b.c).toEqual([4]);
  });

  test('Notation #extrude()', () => {
    const opts = { preserveIndices: false };
    const nota = create({ a: [{ x: 1, y: 2 }], b: { c: [3, 4, 5] } }, opts);
    let extruded = nota.extrude('a[0].y');
    expect(extruded.a).toEqual([{ y: 2 }]);
    expect(nota.value.a).toEqual([{ x: 1 }]);

    extruded = nota.extrude('b.c[1]');
    expect(extruded.b.c).toEqual([undefined, 4]);
    expect(nota.value.b.c).toEqual([3, 5]);
    // console.log(JSON.stringify(nota.value.b.c));
  });

  test('Notation #flatten()', () => {
    const nota = create({ a: [{ x: 1, y: 2 }], b: { c: [3, [4], [, { z: 5 }]] } });
    const expected = {
      'a[0].x': 1,
      'a[0].y': 2,
      'b.c[0]': 3,
      'b.c[1][0]': 4,
      'b.c[2][0]': undefined,
      'b.c[2][1].z': 5
    };
    expect(nota.flatten().value).toEqual(expected);
  });

  test('Notation #filter()', () => {
    const o = { ...objSource };
    o.arr[2].x.y = 8;
    const filter = fnFilter(o);

    // expect(filter('arr[1].x').value).toEqual({ arr: [undefined, { x: { y: 1 } }] });
    // // console.log(JSON.stringify(filter('arr[1].x').value));
    // expect(filter('arr[*].z').value).toEqual({ arr: [{ z: 3 }, { z: 4 }, { z: 5 }] });
    // expect((filter('arr[*].x').value as UnknownObject).arr.length).toEqual(3);
    expect(filter('arr[*].x').value).toEqual({
      arr: [{ x: { y: 0 } }, { x: { y: 1 } }, { x: { y: 8 } }]
    });

    const o1 = { a: [1, 2, 3], b: [] };
    expect(create(o1).filter('a[2]').value).toEqual({ a: [, , 3] });
    expect(create(o1).filter('a[1]').value).toEqual({ a: [, 2] });
    expect(create(o1).filter('b[*]').value).toEqual({ b: [] });
    expect(create(o1).filter('b[1]').value).toEqual({});

    const o2 = { a: [[1], { x: [{}, { y: 2 }, 3] }], b: [{ c: [4, 5, 6] }] };
    expect(create(o2).filter('a[2]').value).toEqual({});
    expect(create(o2).filter('a[1]').value).toEqual({ a: [, { x: [{}, { y: 2 }, 3] }] });
    expect(create(o2).filter('a[1].x[1]').value).toEqual({ a: [, { x: [, { y: 2 }] }] });
    expect(create(o2).filter('a[1].x[1].y').value).toEqual({ a: [, { x: [, { y: 2 }] }] });
    expect(create(o2).filter('a[1].x[2]').value).toEqual({ a: [, { x: [, , 3] }] });
    expect(create(o2).filter('a[1].x[0]').value).toEqual({ a: [, { x: [{}] }] });
    expect(create(o2).filter('a[1].x[*]').value).toEqual({ a: [, { x: [{}, { y: 2 }, 3] }] });

    // TODO: below returns { a: [, { x: [{ y: 2 }, 3] }] } » no empty first item in x array.
    // this is ok for now but should be consistent with others (empty the item to preserve the index)
    // expect(create(o2).filter(['a[1].x[*]', '!a[1].x[0]']).value).toEqual({ a: [, { x: [, { y: 2 }, 3] }] });
    // console.log(JSON.stringify(create(o2).filter(['a[1].x[*]', '!a[1].x[0]']).value));
  });
});
