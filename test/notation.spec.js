/* eslint camelcase:0 */

/**
 *  Test Suite: Notation
 *  @module   notation.spec
 *  @version  2016-05-05
 */

var _ = require('lodash');

var Notation = require('../dist/notation');

var o = {
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

// shuffle array
function shuffle(o) { // v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

describe('Test Suite: Notation.Glob', function () {
    'use strict';

    it('should throw/catch NotationError', function () {
        var errorMessage = 'TEST_ERROR';
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

    it('should `sortGlobs`', function () {
        var globs = [
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
            'foo.qux.*'
        ];

        //  '!foo.*.boo'    vs 'foo.qux.*'  => '!foo.*.boo', 'foo.qux.*'
        //  'foo.*.boo'     vs '!foo.qux.*' => 'foo.*.boo', '!foo.qux.*'

        var i, shuffled;
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
        }
        // console.log(shuffled);
    });

    it('should `sort` glob array (negated comes last)', function () {
        var original = [
            'foo.bar.baz',
            'bar.name',
            '!foo.*.baz',
            '!bar.*',
            '!foo.qux.boo',
            'foo.qux.*',
            'bar.id',
            '!bar.id'
        ];

        var i, shuffled, sorted, indexN, indexNeg;
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

        // var a = [
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

    it('should `test` notation-glob', function () {
        var glob = Notation.Glob.create;
        var testCase = 'account.id';
        expect(glob('account.id').test(testCase)).toEqual(true);
        expect(glob('account.*').test(testCase)).toEqual(true);
        expect(glob('*.*').test(testCase)).toEqual(true);
        expect(glob('*').test(testCase)).toEqual(true);
        expect(glob('billing.account.id').test(testCase)).toEqual(false);
        expect(glob(testCase).test('billing.account.id')).toEqual(false);
    });

    it('should `filter` notation-glob', function () {
        // var glob = Notation.Glob.create;
        var NOTA = new Notation(_.cloneDeep(o));
        // console.log('value ---:', NOTA.value);
        var globs = ['!company.limited', 'billing.account.credit', 'company.*', 'account.id'],
            filtered = NOTA.filter(globs).value;
        // console.log('filtered ---:', filtered);

        expect(filtered.company.name).toBeDefined();
        expect(filtered.company.address).toBeDefined();
        expect(filtered.company.limited).toBeUndefined();
        expect(filtered.account.id).toBeDefined();
        expect(filtered.account.likes).toBeUndefined();
        expect(filtered.billing.account.credit).toBeDefined();

        // original object should not be modied
        expect(o.company.name).toBeDefined();
        expect(o.company.limited).toBeDefined();
        expect(o.account.id).toBeDefined();
        // return;
        var assets = { model: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        var N = Notation.create(assets),
            m1 = N.filter('*').value,
            m2 = N.filter('*.*').value,
            m3 = N.filter('*.*.*').value;
        expect(m1.model).toBeDefined();
        expect(m1.phone.model).toBeDefined();
        expect(m2.model).toBeUndefined();
        expect(m2.phone.model).toBeDefined();
        expect(Object.keys(m3).length).toEqual(0);

        // globs.push('*');
        // NOTA.filter(globs);
    });

    it('should `filter` notation-glob', function () {
        var a = { model: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } };
        var glob = 'phone.*';
        var n = Notation.create(a);
        n.filter(glob);
        expect(n.value).toEqual({ phone: a.phone });
        // console.log(n.value);
    });

    it('should `filter` notation-glob (negated object)', function () {
        var data = { name: 'Onur', phone: { brand: 'Apple', model: 'iPhone' }, car: { brand: 'Ford', model: 'Mustang' } },
            globs = ['*', '!phone'],
            filtered = new Notation(data).filter(globs).value;
        expect(filtered.name).toEqual(data.name);
        expect(filtered.car).toBeDefined();
        // console.log(filtered);
        // console.log(data);
    });

    it('should `union` notation-glob', function () {
        var globA = ['foo.bar.baz', '!bar.id', 'bar.name', '!foo.qux.boo'], // '!foo.*.boo'
            globB = ['!foo.*.baz', 'bar.id', 'bar.name', '!bar.*', 'foo.qux.*'];
        // expected union
        // [
        //     '!bar.*',
        //     'bar.id',
        //     'bar.name',
        //     '!foo.*.baz',
        //     'foo.qux.*',
        //     'foo.bar.baz',
        // ]

        var union = Notation.Glob.union(globA, globB);
        // console.log('union:\n', union);

        function indexOf(v) {
            return union.indexOf(v);
        }

        expect(union.length).toEqual(6);
        expect(union).toContain('bar.id');
        expect(union).not.toContain('!bar.id');
        expect(union).toContain('bar.name'); // only once
        expect(union).toContain('foo.qux.*');
        expect(union).not.toContain('!foo.qux.boo');
        expect(indexOf('!bar.*')).toBeLessThan(indexOf('bar.id'));

    });

    it('should filter station globs', function () {
        var globs = ['*', '!device', 'device.model.*', '!validation.*', '!store.p2mNo', '!store.contact.*', '!store.partners.*', '!store.powerOperator.*'];
        var data = {
            code: 'TR-IST-004',
            device: {
                model: { code: 'N22', description: 'Normal Charger 22 kVA' },
                supplier: 'EFACEC',
                router: { brandModel: 'TELTONIKA/RUT 104' },
                connection: { operator: 'VODAFONE', method: '3G' }
            },
            validation: {
                method: 'OPERATOR',
                comment: '',
                date: 'Mon Nov 18 2013 15:41:43 GMT+0200 (EET)'
            }
        };

        var notation = Notation.create(data),
            filtered = notation.filter(globs).value;
        expect(filtered.device.model).toBeDefined();
        expect(filtered.device.router).toBeUndefined(); // "!device"
        expect(filtered.validation).toEqual({}); // "!validation.*"
        // console.log('filtered\n', filtered);
    });

});

describe('Test Suite: Notation', function () {
    'use strict';

    // beforeEach(function () { });

    it('should get parts of notation', function () {
        var notation = 'first.mid.last';
        expect(Notation.first(notation)).toEqual('first');
        expect(Notation.last(notation)).toEqual('last');
        expect(Notation.parent(notation)).toEqual('first.mid');

        notation = 'single';
        expect(Notation.first(notation)).toEqual('single');
        expect(Notation.last(notation)).toEqual('single');
        expect(Notation.parent(notation)).toEqual(null);
    });

    it('should validate notation', function () {
        expect(Notation.isValid('first.mid.last')).toEqual(true);
        expect(Notation.isValid('first.mid.')).toEqual(false);
        expect(Notation.isValid('first.')).toEqual(false);
        expect(Notation.isValid('first')).toEqual(true);
        expect(Notation.isValid('.first')).toEqual(false);
        expect(Notation.isValid('.')).toEqual(false);
        expect(Notation.isValid(null)).toEqual(false);
        expect(Notation.isValid(true)).toEqual(false);
    });

    it('should get flat object', function () {
        var NOTA = new Notation(_.cloneDeep(o));
        var flat = NOTA.getFlat();

        // console.log(flat);
        expect(flat.name).toEqual(o.name);
        expect(flat['account.id']).toEqual(o.account.id);
        expect(flat['account.likes'].length).toEqual(o.account.likes.length);
        expect(flat['company.name']).toEqual(o.company.name);
        expect(flat['company.address.location.lat']).toEqual(o.company.address.location.lat);
    });

    it('should iterate `eachKey` and `eachNoteValue`', function () {
        var assets = { boat: "none", car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" } },
            nota = Notation.create(assets),
            result = [];
        nota.eachKey(function (notation, key, value, object) {
            result.push(notation);
        });
        expect(result.length).toEqual(5);
        expect(result).toContain('boat');
        expect(result).toContain('car.brand');
        expect(result).toContain('car.model');
        expect(result).toContain('car.year');
        expect(result).toContain('car.color');

        nota.eachNoteValue('car.brand', function (levelValue, levelNotation, note, index, list) {
            if (index === 0) expect(levelValue.model).toEqual('Mustang');
            if (index === 1) expect(levelValue).toEqual('Ford');
        });
    });

    it('should merge and separate notations object', function () {
        var NOTA = new Notation(_.cloneDeep(o));
        NOTA.merge({
            'key': null,
            'newkey.p1': 13,
            'newkey.p2': false,
            'newkey.p3.val': []
        });
        var merged = NOTA.value;
        // console.log(o);
        expect(merged.key).toEqual(null);
        expect(merged.newkey.p1).toEqual(13);
        expect(merged.newkey.p2).toEqual(false);
        expect(merged.newkey.p3.val).toEqual(jasmine.any(Array));

        var separated = NOTA.separate(['newkey.p1', 'newkey.p2', 'newkey.p3.val']);
        expect(separated.key).toBeUndefined();
        expect(separated.newkey.p1).toEqual(13);
        expect(separated.newkey.p2).toEqual(false);
        expect(separated.newkey.p3.val).toEqual(jasmine.any(Array));

        expect(merged.key).toEqual(null);
        expect(merged.newkey.p1).toBeUndefined();
        expect(merged.newkey.p2).toBeUndefined();
        expect(merged.newkey.p3.val).toBeUndefined();
    });

    it('should check if object has / hasDefined notation', function () {
        var NOTA = new Notation(_.cloneDeep(o));
        expect(NOTA.has('name')).toEqual(true);
        expect(NOTA.has('company.address.location.lat')).toEqual(true);
        expect(NOTA.has('company.notDefined')).toEqual(true);
        expect(NOTA.has('notProp1')).toEqual(false);
        expect(NOTA.has('company.notProp2')).toEqual(false);

        expect(NOTA.hasDefined('name')).toEqual(true);
        expect(NOTA.hasDefined('account.id')).toEqual(true);
        expect(NOTA.hasDefined('company.address.location.lat')).toEqual(true);
        expect(NOTA.hasDefined('company.notDefined')).toEqual(false);
        expect(NOTA.hasDefined('company.none')).toEqual(false);
        expect(NOTA.hasDefined('company.nuller')).toEqual(true);
        expect(NOTA.hasDefined('company.zero')).toEqual(true);
        expect(NOTA.hasDefined('notProp1')).toEqual(false);
        expect(NOTA.hasDefined('company.notProp2')).toEqual(false);
    });

    it('should `get` value', function () {
        var NOTA = new Notation(_.cloneDeep(o));
        expect(NOTA.get('name')).toEqual(o.name);
        expect(NOTA.get('account.id')).toEqual(o.account.id);
        expect(NOTA.get('company.address.location.lat')).toEqual(o.company.address.location.lat);
        expect(NOTA.get('account.noProp')).toBeUndefined();
    });

    it('should `set` value', function () {
        var NOTA = new Notation(_.cloneDeep(o)),
            obj = NOTA.value;
        expect(obj.name).toEqual('onur');
        NOTA.set('name', 'cute');
        expect(obj.name).toEqual('cute');

        // should not overwrite
        NOTA.set('account.id', 120, false);
        expect(obj.account.id).toEqual(15);

        // should overwrite
        NOTA.set('account.id', 120, true);
        expect(obj.account.id).toEqual(120);

        // should overwrite
        NOTA.set('company.address.location.lat', 40.111111);
        expect(obj.company.address.location.lat).toEqual(40.111111);
        expect(obj.company.address.location.lon).toEqual(30.123123);

        NOTA.set('newProp.val', true);
        expect(obj.newProp.val).toEqual(true);

        NOTA.set('account.newProp.val', 'YES');
        expect(obj.account.newProp.val).toEqual('YES');
    });

    it('should `remove` property', function () {
        var NOTA = new Notation(_.cloneDeep(o)),
            obj = NOTA.value;
        // console.log('before', o);
        expect(obj.age).toBeDefined();
        NOTA.remove('age');
        expect(obj.age).toBeUndefined();

        expect(obj.company.address.city).toEqual('istanbul');
        NOTA.remove('company.address.city');
        expect(obj.company.address.city).toBeUndefined();
        // console.log('after', o);

        // deleting non-existing property..
        // this should have no effect.
        var k = Object.keys(obj.company).length;
        NOTA.remove('company.noProp');
        expect(Object.keys(obj.company).length).toEqual(k);

        var assets = { boat: 'none', car: { model: 'Mustang' } };
        Notation.create(assets).remove('car.model');
        expect(assets.car).toEqual({});
        // console.log(assets);
    });

    it('should `rename` notation', function () {
        var NOTA = new Notation(_.cloneDeep(o)),
            obj = NOTA.value;
        expect(obj.company.address.location).toBeDefined();
        NOTA.rename('company.address.location', 'company.loc.geo');
        expect(obj.company.address.location).toBeUndefined();
        expect(obj.company.loc.geo.lat).toEqual(jasmine.any(Number));

        expect(obj.name).toBeDefined();
        NOTA.rename('name', 'person');
        expect(obj.name).toBeUndefined();
        expect(obj.person).toBeDefined();
        NOTA.rename('person', 'me.name');
        expect(obj.person).toBeUndefined();
        expect(obj.me.name).toBeDefined();
    });

    it('should `copyTo` or `extract` notation', function () {
        var NOTA = new Notation(_.cloneDeep(o)),
            obj = NOTA.value;
        // `extract(notation)` is same as `copyTo({}, notation)`
        var ex;
        ex = NOTA.extract('company');
        expect(obj.company.name).toEqual('pilot co');
        expect(ex.company.name).toEqual('pilot co');
        ex = NOTA.extract('company.address.country');
        expect(obj.company.address.country).toEqual('TR');
        expect(ex.company.address.country).toEqual('TR');
    });

    it('should `moveTo` or `extrude` notation', function () {
        var NOTA = new Notation(_.cloneDeep(o)),
            obj = NOTA.value;
        // `extrude(notation)` is same as `moveTo({}, notation)`
        var ex;
        ex = NOTA.extrude('company.address.country');
        expect(obj.company.address.country).toBeUndefined();
        expect(ex.company.address.country).toEqual('TR');
        ex = NOTA.extrude('company', 'comp.my');
        expect(obj.company).toBeUndefined();
        expect(ex.company).toBeUndefined();
        expect(ex.comp.my.name).toEqual('pilot co');
    });

    it('should return `undefined` for invalid notations', function () {
        var NOTA = new Notation(_.cloneDeep(o));
        var level1 = 'noProp',
            level2 = 'noProp.level2';
        expect(NOTA.get(level1)).toBeUndefined();
        expect(NOTA.hasDefined(level1)).toEqual(false);
        expect(NOTA.get(level2)).toBeUndefined();
        expect(NOTA.hasDefined(level2)).toEqual(false);
    });

    it('should ignore invalid notations', function () {
        var NOTA = new Notation(_.cloneDeep(o)),
            obj = NOTA.value,
            ex,
            level1 = 'noProp',
            level2 = 'noProp.level2';

        ex = NOTA.extract(level1);
        expect(NOTA.get(level1)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        ex = NOTA.extract(level2);
        expect(NOTA.get(level2)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        ex = NOTA.extrude(level1);
        expect(NOTA.get(level1)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        ex = NOTA.extrude(level2);
        expect(NOTA.get(level2)).toBeUndefined();
        expect(Object.keys(ex).length).toEqual(0);

        expect(obj.account.noProp).toBeUndefined();
        NOTA.rename('account.noProp', 'renamedProp');
        expect(obj.renamedProp).toBeUndefined();
    });

    it('should throw if invalid object or notation', function () {
        var NOTA = new Notation(_.cloneDeep(o)),
            b = null; // undefined will NOT throw

        function invalidSrc() {
            return new Notation(b);
        }
        expect(invalidSrc).toThrow();

        function copy_invalidDest() {
            return NOTA.copyTo(b, 'account');
        }
        expect(copy_invalidDest).toThrow();

        function has_invalidNota() {
            return NOTA.has({}, 4);
        }
        expect(has_invalidNota).toThrow();

        function delete_invalidNota() {
            return NOTA.remove({});
        }
        expect(delete_invalidNota).toThrow();

        function rename_invalidNota() {
            return NOTA.rename('account', {});
        }
        expect(rename_invalidNota).toThrow();

        function validNonExistingNota() {
            return NOTA.get('prop2');
        }
        expect(validNonExistingNota).not.toThrow();

    });

});
