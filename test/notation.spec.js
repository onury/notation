/* eslint camelcase:0, max-lines-per-function:0, consistent-return:0, max-statements:0, max-lines:0 */

import Notation from '../src/core/notation';
import NotationError from '../src/core/notation.error';
const _ = require('lodash');

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

describe('Notation', () => {

    const {
        create, first, last, parent, countNotes, countLevels,
        isValid, split, join, eachNote, eachLevel
    } = Notation;

    // beforeEach(() => { });

    test('NotationError', () => {
        const errorMessage = 'TEST_ERROR';
        try {
            throw new Notation.Error(errorMessage);
        } catch (error) {
            // console.log(error);
            expect(error.name).toEqual('NotationError');
            expect(error.message).toEqual(errorMessage);
            expect(error instanceof Error).toEqual(true);
            expect(error instanceof Notation.Error).toEqual(true);
            expect(error instanceof NotationError).toEqual(true);
            expect(Object.prototype.toString.call(error)).toEqual('[object Error]');
            expect(Object.getPrototypeOf(error)).toEqual(NotationError.prototype);
        }
        expect(new NotationError() instanceof Notation.Error).toEqual(true);
    });

    test('.first(), .last(), .parent()', () => {
        let notation = 'first.mid.last';
        expect(first(notation)).toEqual('first');
        expect(last(notation)).toEqual('last');
        expect(parent(notation)).toEqual('first.mid');

        notation = 'single';
        expect(first(notation)).toEqual('single');
        expect(last(notation)).toEqual('single');
        expect(parent(notation)).toEqual(null);
    });

    test('.countNotes()', () => {
        expect(countNotes('a')).toEqual(1);
        expect(countNotes('a.b')).toEqual(2);
        expect(countLevels('a.b.c')).toEqual(3); // alias
        expect(() => countNotes('')).toThrow(); // eslint-disable-line
    });

    test('.isValid()', () => {
        expect(isValid('first.mid.last')).toEqual(true);
        expect(isValid('first.mid.')).toEqual(false);
        expect(isValid('first.')).toEqual(false);
        expect(isValid('first')).toEqual(true);
        expect(isValid('.first')).toEqual(false);
        expect(isValid('.')).toEqual(false);
        expect(isValid(null)).toEqual(false);
        expect(isValid(true)).toEqual(false);
        // star is NOT treated as wildcard here. this is normal dot-notation,
        // not a glob.
        expect(isValid('prop.*')).toEqual(false);
        expect(isValid('prop["*"]')).toEqual(true);
    });

    test('.split(), .join()', () => {
        expect(split('a')).toEqual(['a']);
        expect(split('[3]')).toEqual(['[3]']);
        expect(split('[10].x.y[1].a')).toEqual(['[10]', 'x', 'y', '[1]', 'a']);
        expect(split('a.b[0].x.y["5"].z')).toEqual(['a', 'b', '[0]', 'x', 'y', '["5"]', 'z']);
        expect(split('a.b[0][1][0]')).toEqual(['a', 'b', '[0]', '[1]', '[0]']);
        expect(() => split('')).toThrow();
        expect(() => split('.')).toThrow();
        expect(() => split(' . ')).toThrow();
        expect(() => split('[]')).toThrow();
        expect(() => split('.b')).toThrow();
        expect(() => split('a-b')).toThrow();
        expect(() => split('["a-b"]')).not.toThrow();
        expect(() => split(1)).toThrow();
        expect(() => split({})).toThrow();
        expect(() => split([])).toThrow();
        expect(() => split(null)).toThrow();
        expect(() => split(undefined)).toThrow();

        expect(join(['[10]', 'x', 'y', '[1]', 'a'])).toEqual('[10].x.y[1].a');
        expect(join(['a', 'b', '[0]', 'x', 'y', '["5"]', 'z'])).toEqual('a.b[0].x.y["5"].z');
        expect(join(['a', 'b', '[0]', '[1]', '[0]'])).toEqual('a.b[0][1][0]');
    });

    test('.eachNote(), alias: .eachLevel()', () => {
        const pattern = 'arr[0].x[1][0].y[5]';
        const result = {
            0: { levelNota: 'arr', note: 'arr' },
            1: { levelNota: 'arr[0]', note: '[0]' },
            2: { levelNota: 'arr[0].x', note: 'x' },
            3: { levelNota: 'arr[0].x[1]', note: '[1]' },
            4: { levelNota: 'arr[0].x[1][0]', note: '[0]' },
            5: { levelNota: 'arr[0].x[1][0].y', note: 'y' },
            6: { levelNota: 'arr[0].x[1][0].y[5]', note: '[5]' }
        };
        let c = 0;
        eachNote(pattern, (levelNota, note, index) => {
            const expected = result[index];
            expect(levelNota).toEqual(expected.levelNota);
            expect(note).toEqual(expected.note);
            c++;
        });
        expect(c).toEqual(countNotes(pattern));

        // alias test
        c = 0;
        eachLevel(pattern, (levelNota, note, index) => {
            const expected = result[index];
            expect(levelNota).toEqual(expected.levelNota);
            expect(note).toEqual(expected.note);
            c++;
        });
        expect(c).toEqual(countLevels(pattern));
    });

    test('constructor(), .create()', () => {
        expect((new Notation()).set('x', 'value').value.x).toEqual('value');
        expect((new Notation({})).set('x', 'value').value.x).toEqual('value');
        expect((new Notation([])).set('[0]', 'value').value[0]).toEqual('value');

        expect(() => new Notation(undefined)).toThrow();
        expect(() => new Notation(null)).toThrow();
        expect(() => new Notation(1)).toThrow();
        expect(() => new Notation('test')).toThrow();

        expect(create().set('x', 'value').value.x).toEqual('value');
        expect(create({}).set('x', 'value').value.x).toEqual('value');
        expect(create([]).set('[0]', 'value').value[0]).toEqual('value');

        let nota = create();
        expect(nota.options.strict).toEqual(false);
        expect(nota.options.preserveIndices).toEqual(false);
        nota = create([], { strict: true, preserveIndices: true });
        expect(nota.options.strict).toEqual(true);
        expect(nota.options.preserveIndices).toEqual(true);

        expect(() => create(undefined)).toThrow();
        expect(() => create(null)).toThrow();
        expect(() => create(1)).toThrow();
        expect(() => create('test')).toThrow();
    });

    test('#flatten(), #exapand()', () => {
        const nota = new Notation(_.cloneDeep(o));
        const flat = nota.flatten().value;

        // console.log(flat);
        expect(flat.name).toEqual(o.name);
        expect(flat['account.id']).toEqual(o.account.id);
        expect(flat['account.likes']).toBeUndefined();
        expect(flat['account.likes[0]']).toEqual(o.account.likes[0]);
        expect(flat['account.likes[1]']).toEqual(o.account.likes[1]);
        expect(flat['account.likes[2]']).toEqual(o.account.likes[2]);
        expect(flat['account.likes[3]']).toEqual(o.account.likes[3]);
        expect(flat['company.name']).toEqual(o.company.name);
        expect(flat['company.address.location.lat']).toEqual(o.company.address.location.lat);

        const expanded = create(flat).expand().value;
        expect(expanded.name).toEqual(o.name);
        expect(expanded.account.id).toEqual(o.account.id);
        expect(expanded.account.likes).toEqual(expect.any(Array));
        expect(expanded.company.name).toEqual(o.company.name);
        expect(expanded.company.address.location.lat).toEqual(o.company.address.location.lat);

        // alias of expand
        const aggregated = create(flat).aggregate().value;
        expect(aggregated.name).toEqual(o.name);
        expect(aggregated.account.id).toEqual(o.account.id);
        expect(aggregated.account.likes.length).toEqual(4);
    });

    test('#each(), #eachValue()', () => {
        const assets = {
            boat: 'none',
            car: {
                brand: 'Ford',
                model: 'Mustang',
                year: 1970,
                color: 'red',
                other: {
                    model: null,
                    colors: ['blue', 'white'],
                    years: [1965, 1967]
                },
                alternate: {
                    cars: [
                        { brand: 'Dodge', model: 'Charger', year: 1970 }
                    ]
                }
            }
        };
        let nota = create(assets);
        let result = [];
        nota.each(notation => {
            result.push(notation);
        });
        const expected = [
            'boat',
            'car.brand',
            'car.model',
            'car.year',
            'car.color',
            'car.other.model',
            'car.other.colors[0]',
            'car.other.colors[1]',
            'car.other.years[0]',
            'car.other.years[1]',
            'car.alternate.cars[0].brand',
            'car.alternate.cars[0].model',
            'car.alternate.cars[0].year'
        ];
        expect(result).toEqual(expected);

        result = [];
        nota.each(notation => {
            result.push(notation);
            return result.length < 4; // should break out on 4
        });
        expect(result.length).toEqual(4);

        let c = 0;
        nota.eachValue('car.alternate.cars[0]', (levelValue, levelNotation, note, index) => {
            c++;
            if (index === 0) expect(levelValue.model).toEqual('Mustang');
            if (index === 1) return false;
        });
        expect(c).toEqual(2);

        function A() {} // eslint-disable-line
        A.prototype.x = 1;
        nota = new Notation(new A());
        c = 0;
        nota.eachValue('x', (levelValue, levelNotation, note, index) => {
            c++;
            if (index === 0) expect(levelValue).toBeUndefined();
        });
        expect(c).toEqual(1);
    });

    test('#getNotations()', () => {
        const obj = { a: { b: { c: [{ x: 1 }], d: 2 }, e: 3, f: 4 }, g: [4, [5]] };
        const notations = create(obj).getNotations();
        expect(notations).toEqual(['a.b.c[0].x', 'a.b.d', 'a.e', 'a.f', 'g[0]', 'g[1][0]']);
    });

    test('#inspect(), #inspectRemove()', () => {
        const obj = { a: { b: [{ c: 1 }] }, d: undefined, e: null, f: [1, false, 2] };
        let nota = create(obj);

        let ins = nota.inspect('a.b[0]');
        expect(ins.notation).toEqual('a.b[0]');
        expect(ins.has).toEqual(true);
        expect(ins.value).toEqual({ c: 1 });
        expect(ins.lastNote).toEqual('[0]');
        expect(ins.lastNoteNormalized).toEqual(0);

        ins = nota.inspect('d');
        expect(ins.notation).toEqual('d');
        expect(ins.has).toEqual(true);
        expect(ins.value).toEqual(undefined);
        expect(ins.lastNote).toEqual('d');
        expect(ins.lastNoteNormalized).toEqual('d');

        ins = nota.inspectRemove('e');
        expect(ins.notation).toEqual('e');
        expect(ins.has).toEqual(true);
        expect(ins.value).toEqual(null);
        expect(ins.lastNote).toEqual('e');
        expect(ins.lastNoteNormalized).toEqual('e');
        expect(obj.e).toBeUndefined();

        ins = nota.inspectRemove('f[1]');
        expect(ins.notation).toEqual('f[1]');
        expect(ins.has).toEqual(true);
        expect(ins.value).toEqual(false);
        expect(ins.lastNote).toEqual('[1]');
        expect(ins.lastNoteNormalized).toEqual(1);
        expect(obj.f[1]).toEqual(2);
        expect(obj.f.length).toEqual(2);

        let arr = ['a', 'b', 'c'];
        nota = create(arr, { preserveIndices: false });
        expect(nota.options.preserveIndices).toEqual(false);
        ins = nota.inspectRemove('[1]');
        expect(ins.value).toEqual('b');
        expect(arr[1]).toEqual('c');
        expect(arr.length).toEqual(2);

        arr = ['a', 'b', 'c'];
        nota = create(arr, { preserveIndices: true });
        expect(nota.options.preserveIndices).toEqual(true);
        ins = nota.inspectRemove('[1]');
        expect(ins.value).toEqual('b');
        expect(arr[1]).toEqual(undefined);
        expect(arr.length).toEqual(3);
    });

    test('#has(), #hasDefined()', () => {
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
    });

    test('#get()', () => {
        let nota = new Notation(_.cloneDeep(o));
        expect(nota.get('name')).toEqual(o.name);
        expect(nota.get('account.id')).toEqual(o.account.id);
        expect(nota.get('company.address.location.lat')).toEqual(o.company.address.location.lat);
        expect(nota.get('account.noProp')).toBeUndefined();

        nota = new Notation({ a: { b: { c: [null, { d: { e: ['value'] } }, true] } } });
        expect(nota.get('a.b.c')).toEqual(expect.any(Array));
        expect(nota.get('a.b.c[1].d.e')).toEqual(['value']);
        expect(nota.get('a.b.c[2]')).toEqual(true);

        const data = {
            obj: { a: { b: true } },
            arr: [
                { x: { y: 8 }, z: true },
                { x: { y: 4 }, z: true },
                { x: { y: 6 }, z: true }
            ]
        };
        nota = new Notation(data);
        expect(nota.get('arr[0].x')).toEqual({ y: 8 });
        expect(nota.get('arr[0].x.y')).toEqual(8);
        expect(nota.get('arr[1].x')).toEqual({ y: 4 });
        expect(nota.get('arr[1].x.y')).toEqual(4);
        expect(nota.get('arr[2].x')).toEqual({ y: 6 });
        expect(nota.get('arr[2].x.y')).toEqual(6);

        nota = new Notation({ x: { y: [1] } }, { strict: true });
        expect(nota.get('x.y')).toEqual([1]);
        expect(nota.get('x.z', 'default')).toEqual('default');
        expect(() => nota.get('x.y[1]')).toThrow('Implied index');
        expect(() => nota.get('x.z')).toThrow('Implied property');
    });

    test('#set()', () => {
        let nota = new Notation(_.cloneDeep(o));
        let obj = nota.value;
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

        nota.set('account.likes[1]', 'VFX');
        expect(obj.account.likes[1]).toEqual('VFX');
        expect(obj.account.likes).toEqual(expect.any(Array));

        nota = create();
        nota.set('a.b.c[2].xyz[0]', 'value');
        obj = nota.value;
        expect(obj.a.b.c[2].xyz[0]).toEqual('value');
        expect(obj.a.b.c[1]).toBeUndefined();
        expect(obj.a.b.c).toEqual(expect.any(Array));
        expect(obj.a.b.c[2].xyz).toEqual(expect.any(Array));

        expect(() => create({}).set('', 1)).toThrow();
        expect(() => create({}).set(' ', 1)).toThrow();
        expect(() => create({}).set(null, 1)).toThrow();
        expect(() => create({}).set([], 1)).toThrow();
        // should throw if attempted to set anything other than an index on an
        // array.
        expect(() => create([]).set('x', true)).toThrow();
        expect(() => create({ x: { y: [] } }).set('x.y.z', true)).toThrow();

        nota = new Notation({ x: { y: [1] } }, { strict: false });
        expect(nota.set('x.y', 'value').value.x.y).toEqual('value');
        expect(nota.set('x.y', 'overwrite', false).value.x.y).toEqual('value');
        nota = new Notation({ x: { y: [1] } }, { strict: true });
        expect(() => nota.set('x.y', 'value', false)).toThrow('existing value');
    });

    test('#remove()', () => {
        let nota = new Notation(_.cloneDeep(o));
        const obj = nota.value;
        // console.log('before', o);
        expect(obj.age).toBeDefined();
        nota.remove('age');
        expect(obj.age).toBeUndefined();

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
        create(assets).delete('car.model'); // alias
        expect(assets.car).toEqual({});

        // expect(() => create([{ x: 1 }]).remove('x')).toThrow(); // TODO: strict option
        expect(create({ x: { y: 1 } }).remove('x').value).toEqual({});
        expect(create({ x: { y: 1 } }).remove('x.y').value).toEqual({ x: {} });
        expect(() => create({ x: { y: 1 } }).remove('x.*').value).toThrow();
        expect(create([{ x: 1 }]).remove('[0]').value).toEqual([]);

        nota = new Notation({ x: { y: [1], z: 5 } }, { strict: true });
        expect(nota.remove('x.z').value.z).toBeUndefined();
        expect(() => nota.remove('x.y[2]')).toThrow('Implied index');
        expect(() => nota.remove('x.z')).toThrow('Implied property');
    });

    test('#clone()', () => {
        expect(create(o).clone().value).toEqual(o);

        const obj = { a: { b: { c: [1, 2, {}] } } };
        const clone = create(obj).clone().value;
        expect(obj).toEqual(clone);
        obj.x = true;
        expect(clone.x).toBeUndefined();
        obj.a.b.c.push(3);
        expect(clone.a.b.c.length).toEqual(3);
    });

    test('#merge(), #separate()', () => {
        const nota = new Notation(_.cloneDeep(o));
        nota.merge({
            'key': null,
            'newkey.p1': 13,
            'newkey.p2': false,
            'newkey.p3.val': []
        });
        const merged = nota.value;
        // console.log(JSON.stringify(merged, null, '  '));
        expect(merged.key).toEqual(null);
        expect(merged.newkey.p1).toEqual(13);
        expect(merged.newkey.p2).toEqual(false);
        expect(merged.newkey.p3.val).toEqual(jasmine.any(Array));

        expect(() => create().merge(1)).toThrow();
        expect(() => create().merge([])).toThrow();
        expect(() => create().merge(null)).toThrow();

        const separated = nota.separate(['newkey.p1', 'newkey.p2', 'newkey.p3.val']).value;
        expect(separated.key).toBeUndefined();
        expect(separated.newkey.p1).toEqual(13);
        expect(separated.newkey.p2).toEqual(false);
        expect(separated.newkey.p3.val).toEqual(jasmine.any(Array));

        expect(merged.key).toEqual(null);
        expect(merged.newkey.p1).toBeUndefined();
        expect(merged.newkey.p2).toBeUndefined();
        expect(merged.newkey.p3.val).toBeUndefined();

        expect(() => create().separate(1)).toThrow();
        expect(() => create().separate({})).toThrow();
        expect(() => create().separate(null)).toThrow();
    });

    test('#rename()', () => {
        const nota = new Notation(_.cloneDeep(o));
        const obj = nota.value;
        expect(obj.company.address.location).toBeDefined();
        nota.rename('company.address.location', 'company.loc.geo');
        expect(obj.company.address.location).toBeUndefined();
        expect(obj.company.loc.geo.lat).toEqual(jasmine.any(Number));

        expect(obj.name).toBeDefined();
        nota.rename('name', 'person');
        expect(obj.name).toBeUndefined();
        expect(obj.person).toBeDefined();
        nota.renote('person', 'me.name'); // alias
        expect(obj.person).toBeUndefined();
        expect(obj.me.name).toBeDefined();

        expect(() => nota.rename('', 'test')).toThrow();
        expect(() => nota.rename('company', '')).toThrow();
    });

    test('#copyToNew(), alias: #extract()', () => {
        const nota = new Notation(_.cloneDeep(o));
        const obj = nota.value;
        // `extract(notation)` is same as `copyTo({}, notation)`
        let ex;
        ex = nota.extract('company');
        expect(obj.company.name).toEqual('pilot co');
        expect(ex.company.name).toEqual('pilot co');
        ex = nota.copyToNew('company.address.country'); // alias
        expect(obj.company.address.country).toEqual('TR');
        expect(ex.company.address.country).toEqual('TR');
    });

    test('#copyFrom()', () => {
        const nota = new Notation();
        const src = { a: [{ x: 1 }], b: 2 };
        nota.copyFrom(src, 'a[0].x');
        expect(nota.value.a[0].x).toEqual(1);
        nota.copyFrom(src, 'b', 'a[1]');
        expect(nota.value.a[1]).toEqual(2);
        expect(nota.value.b).toBeUndefined();
        nota.copyFrom(src, 'none', null, true);
        expect('none' in nota.value).toEqual(false);

        expect(src).toEqual({ a: [{ x: 1 }], b: 2 });

        expect(() => nota.copyFrom(5, 'toString')).toThrow();
    });

    test('#moveToNew(), alias: #extrude()', () => {
        const nota = new Notation(_.cloneDeep(o));
        const obj = nota.value;
        // `extrude(notation)` is same as `moveTo({}, notation)`
        let ex;
        ex = nota.extrude('company.address.country');
        expect(obj.company.address.country).toBeUndefined();
        expect(ex.company.address.country).toEqual('TR');
        ex = nota.moveToNew('company', 'comp.my'); // alias
        expect(obj.company).toBeUndefined();
        expect(ex.company).toBeUndefined();
        expect(ex.comp.my.name).toEqual('pilot co');

        expect(() => nota.moveTo(5, 'company')).toThrow();
    });

    test('#moveFrom()', () => {
        const nota = new Notation();
        const src = { a: [{ x: 1 }], b: 2 };
        nota.moveFrom(src, 'a[0].x');
        expect(nota.value.a[0].x).toEqual(1);
        nota.moveFrom(src, 'b', 'a[1]');
        expect(nota.value.a[1]).toEqual(2);
        expect(nota.value.b).toBeUndefined();
        nota.moveFrom(src, 'none', null, true);
        expect('none' in nota.value).toEqual(false);

        expect(src).toEqual({ a: [{}] });

        expect(() => nota.moveFrom(5, 'toString')).toThrow();
    });

    test('return `undefined` for invalid notations', () => {
        const nota = new Notation(_.cloneDeep(o));
        const level1 = 'noProp';
        const level2 = 'noProp.level2';
        expect(nota.get(level1)).toBeUndefined();
        expect(nota.hasDefined(level1)).toEqual(false);
        expect(nota.get(level2)).toBeUndefined();
        expect(nota.hasDefined(level2)).toEqual(false);
    });

    test('ignore invalid notations', () => {
        const nota = new Notation(_.cloneDeep(o));
        const obj = nota.value;
        let ex;
        const level1 = 'noProp';
        const level2 = 'noProp.level2';

        ex = nota.extract(level1);
        expect(nota.get(level1)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        ex = nota.extract(level2);
        expect(nota.get(level2)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        ex = nota.extrude(level1);
        expect(nota.get(level1)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        ex = nota.extrude(level2);
        expect(nota.get(level2)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        expect(obj.account.noProp).toBeUndefined();
        nota.rename('account.noProp', 'renamedProp');
        expect(obj.renamedProp).toBeUndefined();
    });

    test('throw if invalid object or notation', () => {
        expect(() => new Notation(null)).toThrow();
        expect(() => new Notation(undefined)).toThrow();
        expect(() => new Notation(new Date())).toThrow();
        expect(() => new Notation(Number)).toThrow();
        expect(() => create(1)).toThrow();
        expect(() => create(true)).toThrow();
        expect(() => create('no')).toThrow();

        const nota = new Notation(_.cloneDeep(o));
        expect(() => nota.copyTo(null, 'account')).toThrow();
        expect(() => nota.has({}, 4)).toThrow();
        expect(() => nota.remove({})).toThrow();
        expect(() => nota.rename('account', {})).toThrow();
        expect(() => nota.get('prop2')).not.toThrow();

    });

});
