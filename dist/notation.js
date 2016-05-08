(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("notation", [], factory);
	else if(typeof exports === 'object')
		exports["notation"] = factory();
	else
		root["notation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Notation = __webpack_require__(1);
	
	var _Notation2 = _interopRequireDefault(_Notation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// export default Notation;
	// http://stackoverflow.com/a/33683495/112731
	module.exports = _Notation2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _notation = __webpack_require__(3);
	
	var _notation2 = _interopRequireDefault(_notation);
	
	var _notation3 = __webpack_require__(4);
	
	var _notation4 = _interopRequireDefault(_notation3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// TODO:
	// templates? ${some.property}
	// Error if source object has flattened (dotted) keys.
	// expand if dotted keyed object is passed to constructor?
	
	var ERR = {
	    SOURCE: 'Invalid source object.',
	    DEST: 'Invalid destination object.',
	    NOTATION: 'Invalid notation: ',
	    NOTA_OBJ: 'Invalid notations object: '
	};
	
	/**
	 *  Notation.js for Node and Browser.
	 *
	 *  Provides various methods for modifying / processing the contents
	 *  of the given object; by parsing object notation strings or globs.
	 *  Note that this class will only deal with enumerable properties of the
	 *  source object; so it should be used to manipulate data objects. It will
	 *  not deal with preserving the prototype-chain of the given object.
	 *
	 *  @version  0.7.0 (2015-05-05)
	 *  @author   Onur Yıldırım (onur@cutepilot.com)
	 *  @license  MIT
	 */
	
	var Notation = function () {
	
	    /**
	     *  Initializes a new instance of `Notation`.
	     *
	     *  @param {Object} object - The source object to be notated.
	     *
	     *  @return {Notation}
	     *
	     *  @example
	     *  var assets = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
	     *  var notaAssets = new Notation(assets);
	     *  notaAssets.get('car.model'); // "Charger"
	     */
	
	    function Notation(object) {
	        _classCallCheck(this, Notation);
	
	        // if not defined, default to `{}`
	        object = object === undefined ? {} : object;
	        // if defined, it should be an object.
	        if (!_utils2.default.isObject(object)) {
	            throw new _notation4.default(ERR.SOURCE);
	        }
	        this._source = object;
	    }
	
	    // --------------------------------
	    // Notation Instance Properties
	    // --------------------------------
	
	    /**
	     *  Gets the value of the source object.
	     *
	     *  @return {Object} - The source object.
	     *
	     *  @example
	     *  var o = { name: "Onur" };
	     *  var me = Notation.create(o)
	     *      .set("age", 36)
	     *      .set("car.brand", "Ford")
	     *      .set("car.model", "Mustang")
	     *      .value;
	     *  console.log(me);
	     *  // { name: "Onur", age: 36, car: { brand: "Ford", model: "Mustang" } }
	     *  console.log(o === me);
	     *  // true
	     */
	
	
	    _createClass(Notation, [{
	        key: 'eachKey',
	
	
	        // --------------------------------
	        // Notation Instance Methods
	        // --------------------------------
	
	        /**
	         *  Recursively iterates through each key of the source object and invokes
	         *  the given callback function with parameters, on each non-object value.
	         *
	         *  @param {Function} callback - The callback function to be invoked on
	         *      each on each non-object value. To break out of the loop, return
	         *      `false` from within the callback.
	         *      Callback signature: `callback(notation, key, value, object) { ... }`
	         *
	         *  @return {void}
	         *
	         *  @example
	         *  var assets = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
	         *  Notation.create(assets).eachKey(function (notation, key, value, object) {
	         *      console.log(notation, value);
	         *  });
	         *  // "car.brand"  "Dodge"
	         *  // "car.model"  "Charger"
	         *  // "car.year"  1970
	         */
	        value: function eachKey(callback) {
	            var _this = this;
	
	            var o = this._source,
	                keys = Object.keys(o);
	            _utils2.default.each(keys, function (key, index, list) {
	                // this is preserved in arrow functions
	                var prop = o[key],
	                    N = void 0;
	                if (_utils2.default.isObject(prop)) {
	                    N = new Notation(prop);
	                    N.eachKey(function (notation, nKey, value, prop) {
	                        var subKey = key + '.' + notation;
	                        callback.call(N, subKey, nKey, value, o);
	                    });
	                } else {
	                    callback.call(_this, key, key, prop, o);
	                }
	            });
	        }
	
	        /**
	         *  Iterates through each note of the given notation string by evaluating
	         *  it on the source object.
	         *
	         *  @param {String} notation - The notation string to be iterated through.
	         *  @param {Function} callback - The callback function to be invoked on
	         *      each iteration. To break out of the loop, return `false` from
	         *      within the callback.
	         *      Callback signature: `callback(levelValue, note, index, list) { ... }`
	         *
	         *  @return {void}
	         *
	         *  @example
	         *  var assets = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
	         *  Notation.create(assets)
	         *      .eachNoteValue("car.brand", function (levelValue, note, index, list) {
	         *          console.log(note, levelValue); // "car.brand" "Dodge"
	         *      });
	         */
	
	    }, {
	        key: 'eachNoteValue',
	        value: function eachNoteValue(notation, callback) {
	            if (!Notation.isValid(notation)) {
	                throw new _notation4.default(ERR.NOTATION + '`' + notation + '`');
	            }
	            var level = this._source;
	            Notation.eachNote(notation, function (levelNotation, note, index, list) {
	                level = _utils2.default.hasOwn(level, note) ? level[note] : undefined;
	                if (callback(level, levelNotation, note, index, list) === false) return false;
	            });
	        }
	
	        /**
	         *  Gets the list of notations from the source object (keys).
	         *
	         *  @return {Array} - An array of notation strings.
	         *
	         *  @example
	         *  var assets = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
	         *  var notationsList = Notation.create(assets).getNotations();
	         *  // [ "car.brand", "car.model", "car.year" ]
	         */
	
	    }, {
	        key: 'getNotations',
	        value: function getNotations() {
	            var list = [];
	            this.eachKey(function (notation, key, value, obj) {
	                list.push(notation);
	            });
	            return list;
	        }
	
	        /**
	         *  Gets a flat (single-level) object with notated keys, from the source object.
	         *  @alias Notation#getMap
	         *
	         *  @return {Object} - A new object with flat, notated keys.
	         *
	         *  @example
	         *  var assets = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
	         *  var flat = Notation.create(assets).getFlat();
	         *  // { "car.brand": "Dodge", "car.model": "Charger", "car.year": 1970 }
	         */
	
	    }, {
	        key: 'getFlat',
	        value: function getFlat() {
	            var o = {};
	            this.eachKey(function (notation, key, value, obj) {
	                o[notation] = value;
	            });
	            return o;
	        }
	        /**
	         *  Alias for `#getFlat`
	         *  @private
	         */
	
	    }, {
	        key: 'getMap',
	        value: function getMap() {
	            return this.getFlat();
	        }
	
	        /**
	         *  Inspects the given notation on the source object by checking
	         *  if the source object actually has the notated property;
	         *  and getting its value if exists.
	         *
	         *  @param {String} notation - The notation string to be inspected.
	         *
	         *  @return {Object} - The result object has the following properties:
	         *      `result.has` {Boolean}  Indicates whether the source object
	         *          has the given notation as a (leveled) enumerable property.
	         *          If the property exists but has a value of `undefined`,
	         *          this will still return `true`.
	         *      `result.value` {*}  The value of the notated property.
	         *          if the source object does not have the notation,
	         *          the value will be `undefined`.
	         *
	         *  @example
	         *  Notation.create({ car: { year: 1970 } }).inspect("car.year");
	         *  // { has: true, value: 1970 }
	         *  Notation.create({ car: { year: 1970 } }).inspect("car.color");
	         *  // { has: false, value: undefined }
	         *  Notation.create({ car: { color: undefined } }).inspect("car.color");
	         *  // { has: true, value: undefined }
	         */
	
	    }, {
	        key: 'inspect',
	        value: function inspect(notation) {
	            if (!Notation.isValid(notation)) {
	                throw new _notation4.default(ERR.NOTATION + '`' + notation + '`');
	            }
	            var level = this._source,
	                result = { has: false, value: undefined };
	            Notation.eachNote(notation, function (levelNotation, note, index, list) {
	                if (_utils2.default.hasOwn(level, note)) {
	                    level = level[note];
	                    result = { has: true, value: level };
	                } else {
	                    // level = undefined;
	                    result = { has: false, value: undefined };
	                    return false; // break out
	                }
	            });
	            return result;
	        }
	
	        /**
	         *  Inspects and removes the given notation from the source object
	         *  by checking if the source object actually has the notated property;
	         *  and getting its value if exists, before removing the property.
	         *
	         *  @param {String} notation - The notation string to be inspected.
	         *
	         *  @return {Object} - The result object has the following properties:
	         *      `result.has` {Boolean}  Indicates whether the source object
	         *          has the given notation as a (leveled) enumerable property.
	         *          If the property exists but has a value of `undefined`,
	         *          this will still return `true`.
	         *      `result.value` {*}  The value of the removed property.
	         *          if the source object does not have the notation,
	         *          the value will be `undefined`.
	         *
	         *  @example
	         *  var obj = { name: "John", car: { year: 1970 } };
	         *  Notation.create(obj).inspectRemove("car.year"); // { has: true, value: 1970 }
	         *  // obj » { name: "John", car: {} }
	         *  Notation.create(obj).inspectRemove("car.year", true); // { has: true, value: 1970 }
	         *  // obj » { name: "John" }
	         *  Notation.create({ car: { year: 1970 } }).inspectRemove("car.color");
	         *  // { has: false, value: undefined }
	         *  Notation.create({ car: { color: undefined } }).inspectRemove("car.color");
	         *  // { has: true, value: undefined }
	         */
	
	    }, {
	        key: 'inspectRemove',
	        value: function inspectRemove(notation) {
	            if (!Notation.isValid(notation)) {
	                throw new _notation4.default(ERR.NOTATION + '`' + notation + '`');
	            }
	            var o = void 0,
	                lastNote = void 0;
	            if (notation.indexOf('.') < 0) {
	                lastNote = notation;
	                o = this._source;
	            } else {
	                var upToLast = Notation.parent(notation);
	                lastNote = Notation.last(notation);
	                o = this.inspect(upToLast).value;
	            }
	            var result = void 0;
	            if (_utils2.default.hasOwn(o, lastNote)) {
	                result = { has: true, value: o[lastNote] };
	                delete o[lastNote];
	            } else {
	                result = { has: false, value: undefined };
	            }
	
	            return result;
	        }
	
	        /**
	         *  Checks whether the source object has the given notation
	         *  as a (leveled) enumerable property. If the property exists
	         *  but has a value of `undefined`, this will still return `true`.
	         *
	         *  @param {String} notation - The notation string to be checked.
	         *
	         *  @return {Boolean}
	         *
	         *  @example
	         *  Notation.create({ car: { year: 1970 } }).has("car.year"); // true
	         *  Notation.create({ car: { year: undefined } }).has("car.year"); // true
	         *  Notation.create({}).has("car.color"); // false
	         */
	
	    }, {
	        key: 'has',
	        value: function has(notation) {
	            return this.inspect(notation).has;
	        }
	
	        /**
	         *  Checks whether the source object has the given notation
	         *  as a (leveled) defined enumerable property. If the property
	         *  exists but has a value of `undefined`, this will return `false`.
	         *
	         *  @param {String} notation - The notation string to be checked.
	         *
	         *  @return {Boolean}
	         *
	         *  @example
	         *  Notation.create({ car: { year: 1970 } }).hasDefined("car.year"); // true
	         *  Notation.create({ car: { year: undefined } }).hasDefined("car.year"); // false
	         *  Notation.create({}).hasDefined("car.color"); // false
	         */
	
	    }, {
	        key: 'hasDefined',
	        value: function hasDefined(notation) {
	            return this.inspect(notation).value !== undefined;
	        }
	
	        /**
	         *  Gets the value of the corresponding property at the given
	         *  notation.
	         *
	         *  @param {String} notation - The notation string to be processed.
	         *  @param {String} defaultValue - Optional. Default: `undefined`
	         *      The default value to be returned if the property is not
	         *      found or enumerable.
	         *
	         *  @return {*} - The value of the notated property.
	         *
	         *  @example
	         *  Notation.create({ car: { brand: "Dodge" } }).get("car.brand"); // "Dodge"
	         *  Notation.create({ car: {} }).get("car.model"); // undefined
	         *  Notation.create({ car: {} }).get("car.model", "Challenger"); // "Challenger"
	         *  Notation.create({ car: { model: undefined } }).get("car.model", "Challenger"); // undefined
	         */
	
	    }, {
	        key: 'get',
	        value: function get(notation, defaultValue) {
	            var result = this.inspect(notation);
	            return !result.has ? defaultValue : result.value;
	        }
	
	        /**
	         *  Sets the value of the corresponding property at the given
	         *  notation. If the property does not exist, it will be created
	         *  and nested at the calculated level. If it exists; its value
	         *  will be overwritten by default.
	         *
	         *  @param {String} notation - The notation string to be processed.
	         *  @param {*} value - The value to be set for the notated property.
	         *  @param {Boolean} overwrite - Optional. Default: `true`
	         *      Whether to overwrite the property if exists.
	         *
	         *  @return {Notation} - Returns the current `Notation` instance (self).
	         *
	         *  @example
	         *  var assets = { car: { brand: "Dodge", year: 1970 } };
	         *  Notation.create(assets)
	         *      .set("car.brand", "Ford")
	         *      .set("car.model", "Mustang")
	         *      .set("car.year", 1965, false)
	         *      .set("car.color", "red")
	         *      .set("boat", "none");
	         *  console.log(assets);
	         *  // { notebook: "Mac", car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" } };
	         */
	
	    }, {
	        key: 'set',
	        value: function set(notation, value, overwrite) {
	            if (!Notation.isValid(notation)) {
	                throw new _notation4.default(ERR.NOTATION + '`' + notation + '`');
	            }
	            overwrite = typeof overwrite === 'boolean' ? overwrite : true;
	            var level = this._source,
	                last = void 0;
	            Notation.eachNote(notation, function (levelNotation, note, index, list) {
	                last = index === list.length - 1;
	                // check if the property is at this level
	                if (_utils2.default.hasOwn(level, note)) {
	                    // check if we're at the last level
	                    if (last) {
	                        // if overwrite is set, assign the value.
	                        if (overwrite) level[note] = value;
	                    } else {
	                        // if not, just re-reference the current level.
	                        level = level[note];
	                    }
	                } else {
	                    // we don't have this property at this level
	                    // so; if this is the last level, we set the value
	                    // if not, we set an empty object for the next level
	                    level = level[note] = last ? value : {};
	                }
	            });
	            return this;
	        }
	
	        /**
	         *  Just like the `.set()` method but instead of a single notation
	         *  string, an object of notations and values can be passed.
	         *  Sets the value of each corresponding property at the given
	         *  notation. If a property does not exist, it will be created
	         *  and nested at the calculated level. If it exists; its value
	         *  will be overwritten by default.
	         *
	         *  @param {Object} notationsObject - The notations object to be processed.
	         *      This can either be a regular object with non-dotted keys
	         *      (which will be merged to the first/root level of the source object);
	         *      or a flattened object with notated (dotted) keys.
	         *
	         *  @param {Boolean} overwrite - Optional. Default: `true`
	         *      Whether to overwrite a property if exists.
	         *
	         *  @return {Notation} - Returns the current `Notation` instance (self).
	         *
	         *  @example
	         *  var assets = { car: { brand: "Dodge", year: 1970 } };
	         *  Notation.create(assets)
	         *      .merge({
	         *          "car.brand": "Ford",
	         *          "car.model": "Mustang",
	         *          "car.year": 1965, false,
	         *          "car.color": "red",
	         *          "boat": "none"
	         *      });
	         *  console.log(assets);
	         *  // { notebook: "Mac", car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" } };
	         */
	
	    }, {
	        key: 'merge',
	        value: function merge(notationsObject, overwrite) {
	            var _this2 = this;
	
	            if (!_utils2.default.isObject(notationsObject)) {
	                throw new _notation4.default(ERR.NOTA_OBJ + '`' + notationsObject + '`');
	            }
	            var value = void 0;
	            _utils2.default.each(Object.keys(notationsObject), function (notation, index, obj) {
	                // this is preserved in arrow functions
	                value = notationsObject[notation];
	                _this2.set(notation, value, overwrite);
	            });
	            return this;
	        }
	
	        /**
	         *  Removes the properties by the given list of notations from the source
	         *  object and returns a new object with the removed properties.
	         *  Opposite of `merge()` method.
	         *
	         *  @param {Array} notationsArray - The notations array to be processed.
	         *
	         *  @return {Object} - An object with the removed properties.
	         *
	         *  @example
	         *  var assets = { car: { brand: "Dodge", year: 1970 }, notebook: "Mac" };
	         *  var separated = Notation.create(assets).separate(["car.brand", "boat" ]);
	         *  console.log(separated);
	         *  // { notebook: "Mac", car: { brand: "Ford" } };
	         *  console.log(assets);
	         *  // { car: { year: 1970 } };
	         */
	
	    }, {
	        key: 'separate',
	        value: function separate(notationsArray) {
	            var _this3 = this;
	
	            if (!_utils2.default.isArray(notationsArray)) {
	                throw new _notation4.default(ERR.NOTA_OBJ + '`' + notationsArray + '`');
	            }
	            var o = new Notation({});
	            _utils2.default.each(notationsArray, function (notation, index, obj) {
	                // this is preserved in arrow functions
	                var result = _this3.inspectRemove(notation);
	                o.set(notation, result.value);
	            });
	            return o._source;
	        }
	
	        // iterate globs
	        // remove non-star negated globs directly
	        // get non-star part iterate thru obj keys
	
	        /**
	         *  Deep clones the source object while filtering its properties
	         *  by the given glob notations. Includes all matched properties
	         *  and removes the rest.
	         *
	         *  @param {Array|String} globNotations - The glob notation(s) to
	         *      be processed. The difference between normal notations and
	         *      glob-notations is that you can use wildcard stars (*) and
	         *      negate the notation by prepending a bang (!). A negated
	         *      notation will be excluded. Order of the globs do not matter,
	         *      they will be logically sorted. Loose globs will be processed
	         *      first and verbose globs or normal notations will be processed
	         *      last. e.g. `[ "car.model", "*", "!car.*" ]` will be sorted as
	         *      `[ "*", "!car.*", "car.model" ]`.
	         *      Passing no parameters or passing an empty string (`""` or `[""]`)
	         *      will empty the source object.
	         *
	         *  @return {Notation} - Returns the current `Notation` instance (self).
	         *
	         *  @example
	         *  var assets = { notebook: "Mac", car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" } };
	         *  var nota = Notation.create(assets);
	         *  nota.filter([ "*", "!car.*", "car.model" ]);
	         *  console.log(assets); // { notebook: "Mac", car: { model: "Mustang" } }
	         *  nota.filter("*");
	         *  console.log(assets); // { notebook: "Mac", car: { model: "Mustang" } }
	         *  nota.filter(); // or nota.filter("");
	         *  console.log(assets); // {}
	         */
	
	    }, {
	        key: 'filter',
	        value: function filter(globNotations) {
	            var _this4 = this;
	
	            var original = this.value,
	                copy = _utils2.default.deepCopy(original);
	            // if globNotations is "*" or ["*"] set the "copy" as source and
	            // return.
	            if (_utils2.default.stringOrArrayOf(globNotations, '*')) {
	                this._source = copy;
	                return this;
	            }
	            // if globNotations is "" or [""] set source to `{}` and return.
	            if (arguments.length === 0 || _utils2.default.stringOrArrayOf(globNotations, '')) {
	                this._source = {};
	                return this;
	            }
	            var globs = _utils2.default.isArray(globNotations)
	            // sort the globs in logical order. we also concat the array first
	            // bec. we'll change it's content via `.shift()`
	            ? _notation2.default.sort(globNotations.concat()) : [globNotations];
	            var filtered = void 0;
	            // if the first item of sorted globs is "*" we set the source to the
	            // (full) "copy" and remove the "*" from globs (not to re-process).
	            if (globs[0] === '*') {
	                filtered = new Notation(copy);
	                globs.shift();
	            } else {
	                // otherwise we set an empty object as the source so that we can
	                // add notations/properties to it.
	                filtered = new Notation({});
	            }
	            var g = void 0,
	                endStar = void 0,
	                normalized = void 0;
	            // iterate through globs
	            _utils2.default.each(globs, function (globNotation, index, array) {
	                g = new _notation2.default(globNotation);
	                // set flag that indicates whether the glob ends with `.*`
	                endStar = g.normalized.slice(-2) === '.*';
	                // get the remaining part as the (extra) normalized glob
	                normalized = endStar ? g.normalized.slice(0, -2) : g.normalized;
	                // check if normalized glob has no wildcard stars e.g. "a.b" or
	                // "!a.b.c" etc..
	                if (normalized.indexOf('*') < 0) {
	                    if (g.isNegated) {
	                        // directly remove the notation if negated
	                        filtered.remove(normalized);
	                        // if original glob had `.*` at the end, it means remove
	                        // contents (not itself). so we'll set an empty object.
	                        // meaning `some.prop` (prop) is removed completely but
	                        // `some.prop.*` (prop) results in `{}`.
	                        if (endStar) filtered.set(normalized, {}, true);
	                    } else {
	                        // directly copy the same notation from the original
	                        filtered.copyFrom(original, normalized, null, true);
	                    }
	                    // move to the next
	                    return true;
	                }
	                // if glob has wildcard star(s), we'll iterate through keys of the
	                // source object and see if (full) notation of each key matches
	                // the current glob.
	
	                // TODO: Optimize the loop below. Instead of checking each key's
	                // notation, get the non-star left part of the glob and iterate
	                // that property of the source object.
	                _this4.eachKey(function (originalNotation, key, value, obj) {
	                    // console.log(originalNotation, key);
	                    if (g.test(originalNotation)) {
	                        if (g.isNegated) {
	                            filtered.remove(originalNotation);
	                        } else {
	                            filtered.set(originalNotation, value, true);
	                        }
	                    }
	                });
	            }, this);
	            // finally set the filtered's value as the source of our instance and
	            // return.
	            this._source = filtered.value;
	            return this;
	        }
	
	        // store.partners.*
	        // *.host » iterate original obj
	        // store.*.host » iterate store obj
	
	        // TODO: remove support for char-star. e.g. `prop1.prop*2`
	
	        /**
	         *  Removes the property at the given notation, from the source object.
	         *
	         *  @param {String} notation - The notation to be inspected.
	         *
	         *  @return {Notation} - Returns the current `Notation` instance (self).
	         *
	         *  @example
	         *  var assets = { notebook: "Mac", car: { model: "Mustang" } };
	         *  Notation.create(assets).remove("car.model");
	         *  console.log(assets); // { notebook: "Mac", car: { } }
	         */
	
	    }, {
	        key: 'remove',
	        value: function remove(notation) {
	            this.inspectRemove(notation);
	            return this;
	        }
	        // Notation.prototype.delete = Notation.prototype.remove;
	
	    }, {
	        key: 'clone',
	        value: function clone() {
	            var o = _utils2.default.deepCopy(this.value);
	            return new Notation(o);
	        }
	
	        /**
	         *  Copies the notated property from the source object and adds it to the
	         *  destination — only if the source object actually has that property.
	         *  This is different than a property with a value of `undefined`.
	         *
	         *  @param {Object} destination - The destination object that the notated
	         *      properties will be copied to.
	         *  @param {String} notation - The notation to get the corresponding property
	         *      from the source object.
	         *  @param {String} newNotation - Optional. The notation to set the source
	         *      property on the destination object. In other words, the copied property
	         *      will be renamed to this value before set on the destination object.
	         *      If not set, `notation` argument will be used.
	         *  @param {Boolean} overwrite - Optional. Default: `true`
	         *      Whether to overwrite the property on the destination object if it exists.
	         *
	         *  @return {Notation} - Returns the current `Notation` instance (self).
	         *
	         *  @example
	         *  var assets = { car: { brand: "Ford", model: "Mustang" } };
	         *  var models = { dodge: "Charger" };
	         *  Notation.create(assets).copyTo(models, "car.model", "ford");
	         *  console.log(models);
	         *  // { dodge: "Charger", ford: "Mustang" }
	         *  // assets object is not modified
	         */
	
	    }, {
	        key: 'copyTo',
	        value: function copyTo(destination, notation, newNotation, overwrite) {
	            if (!_utils2.default.isObject(destination)) throw new _notation4.default(ERR.DEST);
	            var result = this.inspect(notation);
	            if (result.has) {
	                new Notation(destination).set(newNotation || notation, result.value, overwrite);
	            }
	            return this;
	        }
	
	        /**
	         *  Copies the notated property from the destination object and adds it to the
	         *  source object — only if the destination object actually has that property.
	         *  This is different than a property with a value of `undefined`.
	         *
	         *  @param {Object} destination - The destination object that the notated
	         *      properties will be copied from.
	         *  @param {String} notation - The notation to get the corresponding property
	         *      from the destination object.
	         *  @param {String} newNotation - Optional. The notation to set the destination
	         *      property on the source object. In other words, the copied property
	         *      will be renamed to this value before set on the source object.
	         *      If not set, `notation` argument will be used.
	         *  @param {Boolean} overwrite - Optional. Default: `true`
	         *      Whether to overwrite the property on the source object if it exists.
	         *
	         *  @return {Notation} - Returns the current `Notation` instance (self).
	         *
	         *  @example
	         *  var assets = { car: { brand: "Ford", model: "Mustang" } };
	         *  var models = { dodge: "Charger" };
	         *  Notation.create(assets).copyFrom(models, "dodge", "car.model", true);
	         *  console.log(assets);
	         *  // { car: { brand: "Ford", model: "Charger" } }
	         *  // models object is not modified
	         */
	
	    }, {
	        key: 'copyFrom',
	        value: function copyFrom(destination, notation, newNotation, overwrite) {
	            if (!_utils2.default.isObject(destination)) throw new _notation4.default(ERR.DEST);
	            var result = new Notation(destination).inspect(notation);
	            if (result.has) {
	                this.set(newNotation || notation, result.value, overwrite);
	            }
	            return this;
	        }
	
	        /**
	         *  Removes the notated property from the source object and adds it to the
	         *  destination — only if the source object actually has that property.
	         *  This is different than a property with a value of `undefined`.
	         *
	         *  @param {Object} destination - The destination object that the notated
	         *      properties will be moved to.
	         *  @param {String} notation - The notation to get the corresponding property
	         *      from the source object.
	         *  @param {String} newNotation - Optional. The notation to set the source
	         *      property on the destination object. In other words, the moved property
	         *      will be renamed to this value before set on the destination object.
	         *      If not set, `notation` argument will be used.
	         *  @param {Boolean} overwrite - Optional. Default: `true`
	         *      Whether to overwrite the property on the destination object if it exists.
	         *
	         *  @return {Notation} - Returns the current `Notation` instance (self).
	         *
	         *  @example
	         *  var assets = { car: { brand: "Ford", model: "Mustang" } };
	         *  var models = { dodge: "Charger" };
	         *  Notation.create(assets).moveTo(models, "car.model", "ford");
	         *  console.log(assets);
	         *  // { car: { brand: "Ford" } }
	         *  console.log(models);
	         *  // { dodge: "Charger", ford: "Mustang" }
	         */
	
	    }, {
	        key: 'moveTo',
	        value: function moveTo(destination, notation, newNotation, overwrite) {
	            if (!_utils2.default.isObject(destination)) throw new _notation4.default(ERR.DEST);
	            var result = this.inspectRemove(notation);
	            if (result.has) {
	                new Notation(destination).set(newNotation || notation, result.value, overwrite);
	            }
	            return this;
	        }
	
	        /**
	         *  Removes the notated property from the destination object and adds it to the
	         *  source object — only if the destination object actually has that property.
	         *  This is different than a property with a value of `undefined`.
	         *
	         *  @param {Object} destination - The destination object that the notated
	         *      properties will be moved from.
	         *  @param {String} notation - The notation to get the corresponding property
	         *      from the destination object.
	         *  @param {String} newNotation - Optional. The notation to set the destination
	         *      property on the source object. In other words, the moved property
	         *      will be renamed to this value before set on the source object.
	         *      If not set, `notation` argument will be used.
	         *  @param {Boolean} overwrite - Optional. Default: `true`
	         *      Whether to overwrite the property on the source object if it exists.
	         *
	         *  @return {Notation} - Returns the current `Notation` instance (self).
	         *
	         *  @example
	         *  var assets = { car: { brand: "Ford", model: "Mustang" } };
	         *  var models = { dodge: "Charger" };
	         *  Notation.create(assets).moveFrom(models, "dodge", "car.model", true);
	         *  console.log(assets);
	         *  // { car: { brand: "Ford", model: "Charger" } }
	         *  console.log(models);
	         *  // {}
	         */
	
	    }, {
	        key: 'moveFrom',
	        value: function moveFrom(destination, notation, newNotation, overwrite) {
	            if (!_utils2.default.isObject(destination)) throw new _notation4.default(ERR.DEST);
	            var result = new Notation(destination).inspectRemove(notation);
	            if (result.has) {
	                this.set(newNotation || notation, result.value, overwrite);
	            }
	            return this;
	        }
	
	        /**
	         *  Renames the notated property of the source object by the new notation.
	         *  @alias Notation#renote
	         *
	         *  @param {String} notation - The notation to get the corresponding property
	         *      (value) from the source object.
	         *  @param {String} newNotation - The new notation for the targeted property.
	         *      value. If not set, the source object will not be modified.
	         *  @param {Boolean} overwrite - Optional. Default: `true`
	         *      Whether to overwrite the property at the new notation, if it exists.
	         *
	         *  @return {Notation} - Returns the current `Notation` instance (self).
	         *
	         *  @example
	         *  var assets = { car: { brand: "Ford", model: "Mustang" } };
	         *  Notation.create(assets)
	         *      .rename("car.brand", "carBrand")
	         *      .rename("car.model", "carModel");
	         *  console.log(assets);
	         *  // { carBrand: "Ford", carModel: "Mustang" }
	         */
	
	    }, {
	        key: 'rename',
	        value: function rename(notation, newNotation, overwrite) {
	            if (!newNotation) return this;
	            return this.moveTo(this._source, notation, newNotation, overwrite);
	        }
	        /**
	         *  Alias for `#rename`
	         *  @private
	         */
	
	    }, {
	        key: 'renote',
	        value: function renote(notation, newNotation, overwrite) {
	            return this.rename(notation, newNotation, overwrite);
	        }
	
	        /**
	         *  Extracts the property at the given notation to a new object by copying
	         *  it from the source object. This is equivalent to `.copyTo({}, notation, newNotation)`.
	         *  @alias Notation#copyToNew
	         *
	         *  @param {String} notation - The notation to get the corresponding property
	         *      (value) from the source object.
	         *  @param {String} newNotation - The new notation to be set on the new object
	         *      for the targeted property value. If not set, `notation` argument will
	         *      be used.
	         *
	         *  @return {Object} - Returns a new object with the notated property.
	         *
	         *  @example
	         *  var assets = { car: { brand: "Ford", model: "Mustang" } };
	         *  var extracted = Notation.create(assets).extract("car.brand", "carBrand");
	         *  console.log(extracted);
	         *  // { carBrand: "Ford" }
	         *  // assets object is not modified
	         */
	
	    }, {
	        key: 'extract',
	        value: function extract(notation, newNotation) {
	            var o = {};
	            this.copyTo(o, notation, newNotation);
	            return o;
	        }
	        /**
	         *  Alias for `#extract`
	         *  @private
	         */
	
	    }, {
	        key: 'copyToNew',
	        value: function copyToNew(notation, newNotation) {
	            return this.extract(notation, newNotation);
	        }
	
	        /**
	         *  Extrudes the property at the given notation to a new object by moving
	         *  it from the source object. This is equivalent to `.moveTo({}, notation, newNotation)`.
	         *  @alias Notation#moveToNew
	         *
	         *  @param {String} notation - The notation to get the corresponding property
	         *      (value) from the source object.
	         *  @param {String} newNotation - The new notation to be set on the new object
	         *      for the targeted property value. If not set, `notation` argument will
	         *      be used.
	         *
	         *  @return {Object} - Returns a new object with the notated property.
	         *
	         *  @example
	         *  var assets = { car: { brand: "Ford", model: "Mustang" } };
	         *  var extruded = Notation.create(assets).extrude("car.brand", "carBrand");
	         *  console.log(assets);
	         *  // { car: { model: "Mustang" } }
	         *  console.log(extruded);
	         *  // { carBrand: "Ford" }
	         */
	
	    }, {
	        key: 'extrude',
	        value: function extrude(notation, newNotation) {
	            var o = {};
	            this.moveTo(o, notation, newNotation);
	            return o;
	        }
	        /**
	         *  Alias for `#extrude`
	         *  @private
	         */
	
	    }, {
	        key: 'moveToNew',
	        value: function moveToNew(notation, newNotation) {
	            return this.extrude(notation, newNotation);
	        }
	
	        // --------------------------------
	        // Notation Static Methods
	        // --------------------------------
	
	        /**
	         *  Basically constructs a new `Notation` instance
	         *  with the given object.
	         *
	         *  @param {Object} object - The object to be notated.
	         *
	         *  @return {Notation}
	         *
	         *  @example
	         *  var notaObj = Notation.create(obj);
	         *  // equivalent to:
	         *  var notaObj = new Notation(obj);
	         */
	
	    }, {
	        key: 'value',
	        get: function get() {
	            return this._source;
	        }
	    }], [{
	        key: 'create',
	        value: function create(object) {
	            return new Notation(object);
	        }
	
	        /**
	         *  Checks whether the given notation string is valid.
	         *
	         *  @param {String} notation - The notation string to be checked.
	         *
	         *  @return {Boolean}
	         *
	         *  @example
	         *  Notation.isValid('prop1.prop2.prop3'); // true
	         *  Notation.isValid('prop1'); // true
	         *  Notation.isValid(null); // false
	         */
	
	    }, {
	        key: 'isValid',
	        value: function isValid(notation) {
	            return typeof notation === 'string' && /^[^\s\.!]+(\.[^\s\.!]+)*$/.test(notation);
	        }
	
	        /**
	         *  Gets the first (root) note of the notation string.
	         *
	         *  @param {String} notation - The notation string to be processed.
	         *
	         *  @return {String}
	         *
	         *  @example
	         *  Notation.first('first.prop2.last'); // "first"
	         */
	
	    }, {
	        key: 'first',
	        value: function first(notation) {
	            if (!Notation.isValid(notation)) {
	                throw new _notation4.default(ERR.NOTATION + '`' + notation + '`');
	            }
	            // return notation.replace(/.*\.([^\.]*$)/, '$1');
	            return notation.split('.')[0];
	        }
	
	        /**
	         *  Gets the last note of the notation string.
	         *
	         *  @param {String} notation - The notation string to be processed.
	         *
	         *  @return {String}
	         *
	         *  @example
	         *  Notation.last('first.prop2.last'); // "last"
	         */
	
	    }, {
	        key: 'last',
	        value: function last(notation) {
	            if (!Notation.isValid(notation)) {
	                throw new _notation4.default(ERR.NOTATION + '`' + notation + '`');
	            }
	            // return notation.replace(/.*\.([^\.]*$)/, '$1');
	            return notation.split('.').reverse()[0];
	        }
	
	        /**
	         *  Gets the parent notation (up to but excluding the last note)
	         *  from the notation string.
	         *
	         *  @param {String} notation - The notation string to be processed.
	         *
	         *  @return {String}
	         *
	         *  @example
	         *  Notation.parent('first.prop2.last'); // "first.prop2"
	         *  Notation.parent('single'); // null
	         */
	
	    }, {
	        key: 'parent',
	        value: function parent(notation) {
	            if (!Notation.isValid(notation)) {
	                throw new _notation4.default(ERR.NOTATION + '`' + notation + '`');
	            }
	            return notation.indexOf('.') >= 0 ? notation.replace(/\.[^\.]*$/, '') : null;
	        }
	
	        /**
	         *  Iterates through each note of the given notation string.
	         *
	         *  @param {String} notation - The notation string to be iterated through.
	         *  @param {Function} callback - The callback function to be invoked on
	         *      each iteration. To break out of the loop, return `false` from
	         *      within the callback.
	         *      Callback signature: `callback(levelNotation, note, index, list) { ... }`
	         *
	         *  @return {void}
	         *
	         *  @example
	         *  Notation.eachNote("first.prop2.last", function (levelNotation, note, index, list) {
	         *      console.log(index, note, levelNotation);
	         *  });
	         *  // 0 "first" "first"
	         *  // 1 "first.prop2" "prop2"
	         *  // 2 "first.prop2.last" "last"
	         */
	
	    }, {
	        key: 'eachNote',
	        value: function eachNote(notation, callback) {
	            if (!Notation.isValid(notation)) {
	                throw new _notation4.default(ERR.NOTATION + '`' + notation + '`');
	            }
	            var notes = notation.split('.'),
	                levelNotes = [],
	                levelNotation = void 0;
	            _utils2.default.each(notes, function (note, index, list) {
	                levelNotes.push(note);
	                levelNotation = levelNotes.join('.');
	                if (callback(levelNotation, note, index, notes) === false) return false;
	            }, Notation);
	        }
	    }]);
	
	    return Notation;
	}();
	
	Notation.Error = _notation4.default;
	Notation.Glob = _notation2.default;
	
	exports.default = Notation;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var toString = Object.prototype.toString;
	
	var utils = {
	    isObject: function isObject(o) {
	        return toString.call(o) === '[object Object]';
	    },
	    isArray: function isArray(o) {
	        return toString.call(o) === '[object Array]';
	    },
	    hasOwn: function hasOwn(o, prop) {
	        return o && typeof o.hasOwnProperty === 'function' && o.hasOwnProperty(prop);
	    },
	    deepCopy: function deepCopy(object) {
	        if (!utils.isObject(object)) return object;
	        var k,
	            o,
	            copy = {};
	        for (k in object) {
	            if (utils.hasOwn(object, k)) {
	                o = object[k];
	                copy[k] = utils.isObject(o) ? utils.deepCopy(o) : o;
	            }
	        }
	        return copy;
	    },
	
	
	    // iterates over elements of an array, executing the callback for each
	    // element.
	    each: function each(array, callback, thisArg) {
	        var length = array.length,
	            index = -1;
	        while (++index < length) {
	            if (callback.call(thisArg, array[index], index, array) === false) break;
	        }
	    },
	    eachRight: function eachRight(array, callback) {
	        var index = array.length;
	        while (index--) {
	            if (callback(array[index], index, array) === false) break;
	        }
	    },
	
	
	    // Borrowed from http://phpjs.org/functions/preg_quote
	    pregQuote: function pregQuote(str, delimiter) {
	        return String(str).replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
	    },
	    stringOrArrayOf: function stringOrArrayOf(o, value) {
	        return typeof o === 'string' && o === value || utils.isArray(o) && o.length === 1 && o[0] === value;
	    }
	};
	
	exports.default = utils;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _notation = __webpack_require__(4);
	
	var _notation2 = _interopRequireDefault(_notation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// --------------------------------
	// CLASS: NotationGlob
	// --------------------------------
	
	// http://www.linfo.org/wildcard.html
	// http://en.wikipedia.org/wiki/Glob_%28programming%29
	// http://en.wikipedia.org/wiki/Wildcard_character#Computing
	
	var NotationGlob = function () {
	
	    /**
	     *  Constructs a `Notation.Glob` object with the given glob string.
	     *  @constructor
	     *
	     *  @param {String} glob - The glob string.
	     *
	     *  @return {Notation.Glob}
	     *
	     *  @example
	     *  var glob = new Notation.Glob("billing.account.*");
	     *  glob.test("billing.account.id"); // true
	     */
	
	    function NotationGlob(glob) {
	        _classCallCheck(this, NotationGlob);
	
	        if (!NotationGlob.isValid(glob)) {
	            throw new _notation2.default('Invalid notation glob: "' + glob + '"');
	        }
	        this.glob = glob;
	        var ng = NotationGlob.normalize(glob);
	        this.normalized = ng.glob;
	        this.isNegated = ng.isNegated;
	        this.regexp = NotationGlob.toRegExp(this.normalized);
	        this.levels = this.normalized.split('.');
	    }
	
	    // --------------------------------
	    // NotationGlob Instance Members
	    // --------------------------------
	
	    /**
	     *  Checks whether the given notation value matches the source notation glob.
	     *
	     *  @param {String} notation - The notation string to be tested.
	     *
	     *  @return {Boolean}
	     *
	     *  @example
	     *  var glob = new Notation.Glob("!prop.*.name");
	     *  glob.test("prop.account.name"); // true
	     */
	
	
	    _createClass(NotationGlob, [{
	        key: 'test',
	        value: function test(notation) {
	            // we allow "*" to match everything. We check for this here
	            // instead of the regexp bec. we care for dots (.) within the glob.
	            return this.normalized === '*' || this.normalized !== '' && notation !== '' && this.regexp.test(notation);
	        }
	
	        // --------------------------------
	        // NotationGlob Static Members
	        // --------------------------------
	
	        /**
	         *  Basically constructs a new `NotationGlob` instance
	         *  with the given glob string.
	         *
	         *  @param {String} glob - The source notation glob.
	         *
	         *  @return {NotationGlob}
	         *
	         *  @example
	         *  var glob = Notation.Glob.create(strGlob);
	         *  // equivalent to:
	         *  var glob = new Notation.Glob(strGlob);
	         */
	
	    }], [{
	        key: 'create',
	        value: function create(glob) {
	            return new NotationGlob(glob);
	        }
	
	        // Modified from http://stackoverflow.com/a/13818704/112731
	
	    }, {
	        key: 'toRegExp',
	        value: function toRegExp(glob, opts) {
	            glob = _utils2.default.pregQuote(glob).replace(/\\\*/g, '[^\\s\\.]*').replace(/\\\?/g, '.');
	            return new RegExp('^' + glob, opts || '');
	            // we don't end it with a $ so the ending is open
	            // `company.*` will produce `/^company\.[^\s\.]*/`
	            // which will match both `company.name` and `company.address.street`
	            // but will not match `some.company.name`
	        }
	    }, {
	        key: 'normalize',
	        value: function normalize(glob) {
	            // replace multiple stars with single
	            glob = glob.replace(/\*+/g, '*');
	            // empty glob if invalid e.g. '!' | '.abc' | '!*'
	            glob = !NotationGlob.isValid(glob) ? '' : glob;
	            var bang = glob.slice(0, 1) === '!';
	            glob = bang ? glob.slice(1) : glob;
	            return {
	                glob: glob,
	                isNegated: bang
	            };
	        }
	
	        // Created test at: https://regex101.com/r/tJ7yI9/
	
	    }, {
	        key: 'isValid',
	        value: function isValid(glob) {
	            return typeof glob === 'string' && /^!?[^\s\.!]+(\.[^\s\.!]+)*$/.test(glob);
	        }
	
	        // TODO: if both "prop.id" and "!prop.id" exists normalize them.
	        // since negated will win, remove the other.
	
	        /**
	         *  Compares two given notation globs and returns an integer value as a
	         *  result. This is generally used to sort glob arrays. Loose globs (with
	         *  stars especially closer to beginning of the glob string); globs
	         *  representing the parent/root of the compared property glob come first.
	         *  Verbose/detailed/exact globs come last. (`* < *abc < abc`). For
	         *  instance; `store.address` comes before `store.address.street`. So this
	         *  works both for `*, store.address.street, !store.address` and `*,
	         *  store.address, !store.address.street`. For cases such as `prop.id` vs
	         *  `!prop.id` which represent the same property; the negated glob wins
	         *  (comes last).
	         *
	         *  @param {String} a - First notation glob to be compared.
	         *  @param {String} b - Second notation glob to be compared.
	         *
	         *  @return {Number}  Returns `-1` if `a` comes first, `1` if `b` comes
	         *      first and `0` if equivalent priority.
	         *
	         *  @example
	         *  var result = Notation.Glob.compare("prop.*.name", "prop.*");
	         *  console.log(result); // 1
	         */
	
	    }, {
	        key: 'compare',
	        value: function compare(a, b) {
	            // trivial case, both are exactly the same!
	            if (a === b) return 0;
	            var levelsA = a.split('.'),
	                levelsB = b.split('.');
	            // Check depth (number of levels)
	            if (levelsA.length === levelsB.length) {
	                // count wildcards (assuming more wildcards comes first)
	                var wild = /(?:^|\.)\*(?:$|\.)/g,
	                    mA = a.match(wild),
	                    mB = b.match(wild),
	                    wildA = mA ? mA.length : 0,
	                    wildB = mB ? mB.length : 0;
	                if (wildA === wildB) {
	                    // check for negation
	                    var negA = a.indexOf('!') === 0,
	                        negB = b.indexOf('!') === 0;
	                    if (negA === negB) {
	                        // both are negated or neither are, just return alphabetical
	                        return a < b ? -1 : 1;
	                    }
	                    // compare without the negatation
	                    var nonNegA = negA ? a.slice(1) : a,
	                        nonNegB = negB ? b.slice(1) : b;
	                    if (nonNegA === nonNegB) {
	                        return negA ? 1 : -1;
	                    }
	                    return nonNegA < nonNegB ? -1 : 1;
	                }
	                return wildA > wildB ? -1 : 1;
	            }
	
	            return levelsA.length < levelsB.length ? -1 : 1;
	        }
	
	        /**
	         *  Sorts the notation globs in the given array by their priorities.
	         *  Loose globs (with stars especially closer to beginning of the glob string);
	         *  globs representing the parent/root of the compared property glob come first.
	         *  Verbose/detailed/exact globs come last. (`* < *abc < abc`). For
	         *  instance; `store.address` comes before `store.address.street`. For cases
	         *  such as `prop.id` vs `!prop.id` which represent the same property; the
	         *  negated glob wins (comes last).
	         *
	         *  @param {Array} globsArray - The notation globs array to be sorted. The passed
	         *      array reference is modified.
	         *
	         *  @return {Array}
	         *
	         *  @example
	         *  var globs = [ "!prop.*.name", "prop.*", "prop.id" ];
	         *  Notation.Glob.sort(globs);
	         *  console.log(globs);
	         *  // [ "prop.*", "prop.id", "!prop.*.name" ];
	         */
	
	    }, {
	        key: 'sort',
	        value: function sort(globsArray) {
	            return globsArray.sort(NotationGlob.compare);
	            // return _mergeSortArray(globsArray, NotationGlob.compare);
	        }
	
	        /**
	         *  Gets the union from the given couple of glob arrays and returns
	         *  a new array of globs. If the exact same element is found in both
	         *  arrays, one of them is removed to prevent duplicates. If one of the
	         *  arrays contains a negated equivalent of an item in the other array,
	         *  the negated item is removed. If any item covers/matches a negated
	         *  item in the other array, the negated item is removed.
	         *
	         *  @param {Array} arrA - First array of glob strings.
	         *  @param {Array} arrB - Second array of glob strings.
	         *  @param {Boolean} sort - Whether to sort the globs in the final array.
	         *      Default: `true`
	         *
	         *  @return {Array}
	         *
	         *  @example
	         *  var a = [ 'foo.bar', 'bar.baz', '!*.qux' ],
	         *      b = [ '!foo.bar', 'bar.qux', 'bar.baz' ],
	         *  console.log(Notation.Glob.union(a, b));
	         *  // [ '!*.qux', 'foo.bar', 'bar.baz', 'bar.qux' ]
	         */
	
	    }, {
	        key: 'union',
	        value: function union(arrA, arrB, sort) {
	            var nonegA = void 0,
	                re = void 0,
	                bIndex = void 0;
	            // iterate through first array
	            _utils2.default.eachRight(arrA, function (a, ia) {
	                // check if the exact item exists in the second array and remove
	                // if exists (to prevent duplicates).
	                bIndex = arrB.indexOf(a);
	                if (bIndex >= 0) arrB.splice(bIndex, 1);
	                // look for negateds and when one found; check if non-negated
	                // equivalent exists in the second array. if it exists, remove
	                // "this negated" from first array.
	                // e.g. [ '!foo.bar' ] + [ 'foo.bar' ] => [ 'foo.bar' ]
	                if (a.indexOf('!') === 0) {
	                    nonegA = a.slice(1);
	                    if (arrB.indexOf(nonegA) >= 0) {
	                        arrA.splice(ia, 1);
	                        return true;
	                    }
	                    // non-negated is not found in the second. so, iterate through
	                    // the second array; look for non-negateds and when found,
	                    // check if it covers/matches the negated from the first
	                    // array. if so, remove the negated from the first array.
	                    // [ '!foo.bar' ] + [ 'foo.*' ]  => [ 'foo.*' ]              // wild covers !v, remove !v
	                    // [ 'foo.bar' ]  + [ '!foo.*' ] => [ '!foo.*', 'foo.bar' ]  // !wild covers v, both kept
	                    // [ 'baz.que' ]  + [ '!foo.*' ] => [ '!foo.*', 'baz.que' ]  // !wild doesn't cover, both kept
	                    _utils2.default.eachRight(arrB, function (b, ib) {
	                        if (b.indexOf('!') < 0) {
	                            re = NotationGlob.toRegExp(b);
	                            if (re.test(nonegA)) arrA.splice(ia, 1);
	                        }
	                    });
	                } else {
	                    // item in the first array is not negated; so check if a
	                    // negated equivalent exists in the second and remove if
	                    // exists.
	                    // e.g. [ 'foo.bar' ] + [ '!foo.bar' ] => [ 'foo.bar' ]
	                    bIndex = arrB.indexOf('!' + a);
	                    if (bIndex >= 0) arrB.splice(bIndex, 1);
	                }
	            });
	
	            // concat both arrays and sort (if enabled) so we get a nice union
	            // array.
	            var result = arrA.concat(arrB);
	            return sort === undefined || sort === true ? NotationGlob.sort(result) : result;
	        }
	    }]);
	
	    return NotationGlob;
	}();
	
	exports.default = NotationGlob;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// TODO: instanceof return false.
	
	/**
	 *  Error class specific to `Notation`.
	 */
	
	var NotationError = function (_Error) {
	    _inherits(NotationError, _Error);
	
	    /**
	     *  Initializes a new `NotationError` instance.
	     *  @constructor
	     *
	     *  @param {String} message - The error message.
	     */
	
	    function NotationError() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	        _classCallCheck(this, NotationError);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NotationError).call(this, message));
	
	        _this.name = _this.constructor.name;
	
	        Object.defineProperty(_this, 'name', {
	            enumerable: false,
	            writable: false,
	            value: 'NotationError'
	        });
	
	        Object.defineProperty(_this, 'message', {
	            enumerable: false,
	            writable: true,
	            value: message
	        });
	
	        if (Error.hasOwnProperty('captureStackTrace')) {
	            // V8
	            Error.captureStackTrace(_this, _this.constructor);
	        } else {
	            Object.defineProperty(_this, 'stack', {
	                enumerable: false,
	                writable: false,
	                value: new Error(message).stack
	            });
	        }
	        return _this;
	    }
	
	    return NotationError;
	}(Error);
	
	exports.default = NotationError;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=notation.js.map