/* eslint camelcase:0, max-lines-per-function:0, consistent-return:0, max-statements:0 */

// const Notation = require('../src/core/notation');
import Notation from '../src/core/notation';
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

describe('Test Suite: Notation', () => {

    // beforeEach(() => { });

    test('NotationError', () => {
        const errorMessage = 'TEST_ERROR';
        try {
            throw new Notation.Error(errorMessage);
        } catch (error) {
            // console.log(error);
            // console.log(Object.prototype.toString.call(error));
            // console.log(error.stack);
            expect(error.name).toEqual('NotationError');
            // expect(error instanceof Notation.Error).toEqual(true); // TODO: FAILS
            expect(error.message).toEqual(errorMessage);
        }
    });

    test('.first(), .last(), .parent()', () => {
        let notation = 'first.mid.last';
        expect(Notation.first(notation)).toEqual('first');
        expect(Notation.last(notation)).toEqual('last');
        expect(Notation.parent(notation)).toEqual('first.mid');

        notation = 'single';
        expect(Notation.first(notation)).toEqual('single');
        expect(Notation.last(notation)).toEqual('single');
        expect(Notation.parent(notation)).toEqual(null);
    });

    test('.countNotes()', () => {
        expect(Notation.countNotes('a')).toEqual(1);
        expect(Notation.countNotes('a.b')).toEqual(2);
        expect(Notation.countNotes('a.b.c')).toEqual(3);
        expect(function () { Notation.countNotes(''); }).toThrow(); // eslint-disable-line
    });

    test('.isValid()', () => {
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
        expect(Notation.isValid('prop.*')).toEqual(false);
        expect(Notation.isValid('prop["*"]')).toEqual(true);
    });

    test('.split(), .join()', () => {
        expect(Notation.split('a')).toEqual(['a']);
        expect(Notation.split('[3]')).toEqual(['[3]']);
        expect(Notation.split('[10].x.y[1].a')).toEqual(['[10]', 'x', 'y', '[1]', 'a']);
        expect(Notation.split('a.b[0].x.y["5"].z')).toEqual(['a', 'b', '[0]', 'x', 'y', '["5"]', 'z']);
        expect(Notation.split('a.b[0][1][0]')).toEqual(['a', 'b', '[0]', '[1]', '[0]']);
        expect(() => Notation.split('')).toThrow();
        expect(() => Notation.split('[]')).toThrow();
        expect(() => Notation.split('.b')).toThrow();
        expect(() => Notation.split('a-b')).toThrow();
        expect(() => Notation.split('["a-b"]')).not.toThrow();
        expect(() => Notation.split(1)).toThrow();
        expect(() => Notation.split({})).toThrow();
        expect(() => Notation.split([])).toThrow();
        expect(() => Notation.split(null)).toThrow();
        expect(() => Notation.split(undefined)).toThrow();

        expect(Notation.join(['[10]', 'x', 'y', '[1]', 'a'])).toEqual('[10].x.y[1].a');
        expect(Notation.join(['a', 'b', '[0]', 'x', 'y', '["5"]', 'z'])).toEqual('a.b[0].x.y["5"].z');
        expect(Notation.join(['a', 'b', '[0]', '[1]', '[0]'])).toEqual('a.b[0][1][0]');
    });

    test('.eachNote()', () => {
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
        Notation.eachNote(pattern, (levelNota, note, index) => {
            const expected = result[index];
            expect(levelNota).toEqual(expected.levelNota);
            expect(note).toEqual(expected.note);
            c++;
        });
        expect(c).toEqual(Notation.countNotes(pattern));
    });

    test('constructor(), .create()', () => {
        expect((new Notation()).set('x', 'value').value.x).toEqual('value');
        expect((new Notation({})).set('x', 'value').value.x).toEqual('value');
        expect((new Notation([])).set('[0]', 'value').value[0]).toEqual('value');

        expect(Notation.create().set('x', 'value').value.x).toEqual('value');
        expect(Notation.create({}).set('x', 'value').value.x).toEqual('value');
        expect(Notation.create([]).set('[0]', 'value').value[0]).toEqual('value');
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

        const expanded = Notation.create(flat).expand().value;
        expect(expanded.name).toEqual(o.name);
        expect(expanded.account.id).toEqual(o.account.id);
        expect(expanded.account.likes).toEqual(expect.any(Array));
        expect(expanded.company.name).toEqual(o.company.name);
        expect(expanded.company.address.location.lat).toEqual(o.company.address.location.lat);

        // alias of expand
        const aggregated = Notation.create(flat).aggregate().value;
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
        let nota = Notation.create(assets);
        const result = [];
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
        const notations = Notation.create(obj).getNotations();
        expect(notations).toEqual(['a.b.c[0].x', 'a.b.d', 'a.e', 'a.f', 'g[0]', 'g[1][0]']);
    });

    test('#inspect(), #inspectRemove()', () => {
        const obj = { a: { b: [{ c: 1 }] }, d: undefined, e: null, f: [1, false, 2] };
        const nota = Notation.create(obj);

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
        expect(obj.f[1]).toBeUndefined();
        expect(obj.f.length).toEqual(3);
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

        nota = Notation.create();
        nota.set('a.b.c[2].xyz[0]', 'value');
        obj = nota.value;
        expect(obj.a.b.c[2].xyz[0]).toEqual('value');
        expect(obj.a.b.c[1]).toBeUndefined();
        expect(obj.a.b.c).toEqual(expect.any(Array));
        expect(obj.a.b.c[2].xyz).toEqual(expect.any(Array));

        expect(() => Notation.create({}).set('', 1)).toThrow();
        expect(() => Notation.create({}).set(' ', 1)).toThrow();
        expect(() => Notation.create({}).set(null, 1)).toThrow();
        expect(() => Notation.create({}).set([], 1)).toThrow();
        // should throw if attempted to set anything other than an index on an
        // array.
        expect(() => Notation.create([]).set('x', true)).toThrow();
        expect(() => Notation.create({ x: { y: [] } }).set('x.y.z', true)).toThrow();
    });

    test('#remove()', () => {
        const nota = new Notation(_.cloneDeep(o));
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
        Notation.create(assets).delete('car.model'); // alias
        expect(assets.car).toEqual({});
        // console.log(assets);
    });

    test('#clone()', () => {
        expect(Notation.create(o).clone().value).toEqual(o);

        const obj = { a: { b: { c: [1, 2, {}] } } };
        const clone = Notation.create(obj).clone().value;
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

        expect(() => Notation.create().merge(1)).toThrow();
        expect(() => Notation.create().merge([])).toThrow();
        expect(() => Notation.create().merge(null)).toThrow();

        const separated = nota.separate(['newkey.p1', 'newkey.p2', 'newkey.p3.val']).value;
        expect(separated.key).toBeUndefined();
        expect(separated.newkey.p1).toEqual(13);
        expect(separated.newkey.p2).toEqual(false);
        expect(separated.newkey.p3.val).toEqual(jasmine.any(Array));

        expect(merged.key).toEqual(null);
        expect(merged.newkey.p1).toBeUndefined();
        expect(merged.newkey.p2).toBeUndefined();
        expect(merged.newkey.p3.val).toBeUndefined();

        expect(() => Notation.create().separate(1)).toThrow();
        expect(() => Notation.create().separate({})).toThrow();
        expect(() => Notation.create().separate(null)).toThrow();
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
        const nota = new Notation(_.cloneDeep(o));
        const b = null; // undefined will NOT throw

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

    });

    test('onur', () => {
        const data = {
            obj: { a: { b: true } },
            arr: [
                { x: { y: 8 }, z: true },
                { x: { y: 4 }, z: true },
                { x: { y: 6 }, z: true }
            ]
        };
        const nota = new Notation(data);
        // expect(nota.get('arr[0].x')).toEqual({ y: 2 });
        // expect(nota.get('arr[0].x.y')).toEqual(2);
        // expect(nota.get('arr[1].x')).toEqual({ y: 4 });
        // expect(nota.get('arr[1].x.y')).toEqual(4);
        // expect(nota.get('arr[2].x')).toEqual({ y: 6 });
        // expect(nota.get('arr[2].x.y')).toEqual(6);

        // console.log(nota.filter(['*', '!obj']).value);

        // console.log(nota.filter(['*', '!arr[1]']).value);

        // console.log(nota.filter('arr[*].x').value);
        // expect(nota.filter('arr[*].x.y')).toEqual(6);
    });

});
