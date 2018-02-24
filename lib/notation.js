(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Notation", [], factory);
	else if(typeof exports === 'object')
		exports["Notation"] = factory();
	else
		root["Notation"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    ensureArray: function ensureArray(o) {
        if (utils.isArray(o)) return o;
        return o === null || o === undefined ? [] : [o];
    },
    hasOwn: function hasOwn(o, prop) {
        return o && typeof o.hasOwnProperty === 'function' && o.hasOwnProperty(prop);
    },
    deepCopy: function deepCopy(object) {
        if (!utils.isObject(object)) return object;
        var k = void 0,
            o = void 0,
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
    },
    hasSingleItemOf: function hasSingleItemOf(arr, itemValue) {
        return arr.length === 1 && (arguments.length === 2 ? arr[0] === itemValue : true);
    }
};

exports.default = utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: instanceof return false.

/**
 *  Error class specific to `Notation`.
 *  @name Notation.Error
 *  @memberof! Notation
 *  @class
 *
 */
var NotationError = function (_Error) {
    _inherits(NotationError, _Error);

    /**
     *  Initializes a new `Notation.Error` instance.
     *  @constructs Notation.Error
     *  @param {String} message - The error message.
     */
    function NotationError() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _classCallCheck(this, NotationError);

        var _this = _possibleConstructorReturn(this, (NotationError.__proto__ || Object.getPrototypeOf(NotationError)).call(this, message));

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _notation = __webpack_require__(3);

var _notation2 = _interopRequireDefault(_notation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export default Notation;
// http://stackoverflow.com/a/33683495/112731
module.exports = _notation2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _notation = __webpack_require__(4);

var _notation2 = _interopRequireDefault(_notation);

var _notation3 = __webpack_require__(1);

var _notation4 = _interopRequireDefault(_notation3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERR = {
    SOURCE: 'Invalid source object.',
    DEST: 'Invalid destination object.',
    NOTATION: 'Invalid notation: ',
    NOTA_OBJ: 'Invalid notations object: '
};

/**
 *  Notation.js for Node and Browser.
 *
 *  Like in most programming languages, JavaScript makes use of dot-notation to
 *  access the value of a member of an object (or class). `Notation` class
 *  provides various methods for modifying / processing the contents of the
 *  given object; by parsing object notation strings or globs.
 *
 *  Note that this class will only deal with enumerable properties of the source
 *  object; so it should be used to manipulate data objects. It will not deal
 *  with preserving the prototype-chain of the given object.
 *
 *  @author   Onur Yıldırım <onur@cutepilot.com>
 *  @license  MIT
 */

var Notation = function () {

    /**
     *  Initializes a new instance of `Notation`.
     *
     *  @param {Object} [object={}] - The source object to be notated.
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
     *  const notation = new Notation(obj);
     *  notation.get('car.model'); // "Charger"
     */
    function Notation() {
        var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Notation);

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
     *  @type {Object}
     *
     *  @example
     *  const person = { name: "Onur" };
     *  const me = Notation.create(person)
     *      .set("age", 36)
     *      .set("car.brand", "Ford")
     *      .set("car.model", "Mustang")
     *      .value;
     *  console.log(me); // { name: "Onur", age: 36, car: { brand: "Ford", model: "Mustang" } }
     *  console.log(person === me); // true
     */


    _createClass(Notation, [{
        key: 'each',


        // --------------------------------
        // Notation Instance Methods
        // --------------------------------

        /**
         *  Recursively iterates through each key of the source object and invokes
         *  the given callback function with parameters, on each non-object value.
         *  @alias Notation#eachKey
         *
         *  @param {Function} callback - The callback function to be invoked on
         *  each on each non-object value. To break out of the loop, return `false`
         *  from within the callback.
         *  Callback signature: `callback(notation, key, value, object) { ... }`
         *
         *  @returns {void}
         *
         *  @example
         *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
         *  Notation.create(obj).each(function (notation, key, value, object) {
         *      console.log(notation, value);
         *  });
         *  // "car.brand"  "Dodge"
         *  // "car.model"  "Charger"
         *  // "car.year"  1970
         */
        value: function each(callback) {
            var _this = this;

            var o = this._source,
                keys = Object.keys(o);
            _utils2.default.each(keys, function (key, index, list) {
                // this is preserved in arrow functions
                var prop = o[key],
                    N = void 0;
                if (_utils2.default.isObject(prop)) {
                    N = new Notation(prop);
                    N.each(function (notation, nKey, value, prop) {
                        var subKey = key + '.' + notation;
                        callback.call(N, subKey, nKey, value, o);
                    });
                } else {
                    callback.call(_this, key, key, prop, o);
                }
            });
        }
        /**
         *  Alias for `#each`
         *  @private
         */

    }, {
        key: 'eachKey',
        value: function eachKey(callback) {
            return this.each(callback);
        }

        /**
         *  Iterates through each note of the given notation string by evaluating
         *  it on the source object.
         *
         *  @param {String} notation - The notation string to be iterated through.
         *  @param {Function} callback - The callback function to be invoked on
         *  each iteration. To break out of the loop, return `false` from within
         *  the callback.
         *  Callback signature: `callback(levelValue, note, index, list) { ... }`
         *
         *  @returns {void}
         *
         *  @example
         *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
         *  Notation.create(obj)
         *      .eachValue("car.brand", function (levelValue, note, index, list) {
         *          console.log(note, levelValue); // "car.brand" "Dodge"
         *      });
         */

    }, {
        key: 'eachValue',
        value: function eachValue(notation, callback) {
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
         *  @returns {Array} - An array of notation strings.
         *
         *  @example
         *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
         *  const notations = Notation.create(obj).getNotations();
         *  console.log(notations); // [ "car.brand", "car.model", "car.year" ]
         */

    }, {
        key: 'getNotations',
        value: function getNotations() {
            var list = [];
            this.each(function (notation, key, value, obj) {
                list.push(notation);
            });
            return list;
        }

        /**
         *  Flattens the source object to a single-level object with notated keys.
         *
         *  @returns {Notation} - Returns the current `Notation` instance (self).
         *
         *  @example
         *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
         *  const flat = Notation.create(obj).flatten().value;
         *  console.log(flat);
         *  // { "car.brand": "Dodge", "car.model": "Charger", "car.year": 1970 }
         */

    }, {
        key: 'flatten',
        value: function flatten() {
            var o = {};
            this.each(function (notation, key, value, obj) {
                o[notation] = value;
            });
            // return o;
            this._source = o;
            return this;
        }

        /**
         *  Aggregates notated keys of a (single-level) object, and nests them under
         *  their corresponding properties. This is the opposite of `Notation#flatten`
         *  method. This might be useful when expanding a flat object fetched from
         *  a database.
         *  @alias Notation#aggregate
         *  @chainable
         *
         *  @returns {Notation} - Returns the current `Notation` instance (self).
         *
         *  @example
         *  const obj = { "car.brand": "Dodge", "car.model": "Charger", "car.year": 1970 }
         *  const expanded = Notation.create(obj).expand().value;
         *  console.log(expanded); // { car: { brand: "Dodge", model: "Charger", year: 1970 } };
         */

    }, {
        key: 'expand',
        value: function expand() {
            this._source = Notation.create({}).merge(this._source).value;
            return this;
        }
        /**
         *  Alias for `#expand`
         *  @private
         */

    }, {
        key: 'aggregate',
        value: function aggregate() {
            return this.expand();
        }

        /**
         *  Inspects the given notation on the source object by checking
         *  if the source object actually has the notated property;
         *  and getting its value if exists.
         *
         *  @param {String} notation - The notation string to be inspected.
         *
         *  @returns {InspectResult} - The result object.
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
         *  Notation inspection result object.
         *  @typedef Notation~InspectResult
         *  @type Object
         *  @property {Boolean} has - Indicates whether the source object has the given
         *  notation as a (leveled) enumerable property. If the property exists but has
         *  a value of `undefined`, this will still return `true`.
         *  @property {*} value - The value of the notated property. If the source object
         *  does not have the notation, the value will be `undefined`.
         */

        /**
         *  Inspects and removes the given notation from the source object
         *  by checking if the source object actually has the notated property;
         *  and getting its value if exists, before removing the property.
         *
         *  @param {String} notation - The notation string to be inspected.
         *
         *  @returns {InspectResult} - The result object.
         *
         *  @example
         *  const obj = { name: "John", car: { year: 1970 } };
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
         *  @returns {Boolean}
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
         *  @returns {Boolean}
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
         *  @param {String} [defaultValue] - The default value to be returned if
         *  the property is not found or enumerable.
         *
         *  @returns {*} - The value of the notated property.
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
         *  @chainable
         *
         *  @param {String} notation - The notation string to be processed.
         *  @param {*} value - The value to be set for the notated property.
         *  @param {Boolean} [overwrite=true] - Whether to overwrite the property
         *  if exists.
         *
         *  @returns {Notation} - Returns the current `Notation` instance (self).
         *
         *  @example
         *  const obj = { car: { brand: "Dodge", year: 1970 } };
         *  Notation.create(obj)
         *      .set("car.brand", "Ford")
         *      .set("car.model", "Mustang")
         *      .set("car.year", 1965, false)
         *      .set("car.color", "red")
         *      .set("boat", "none");
         *  console.log(obj);
         *  // { notebook: "Mac", car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" }, boat: "none" };
         */

    }, {
        key: 'set',
        value: function set(notation, value) {
            var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            if (!Notation.isValid(notation)) {
                throw new _notation4.default(ERR.NOTATION + '`' + notation + '`');
            }
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
         *  @chainable
         *
         *  @param {Object} notationsObject - The notations object to be processed.
         *  This can either be a regular object with non-dotted keys
         *  (which will be merged to the first/root level of the source object);
         *  or a flattened object with notated (dotted) keys.
         *  @param {Boolean} [overwrite=true] - Whether to overwrite a property if
         *  exists.
         *
         *  @returns {Notation} - Returns the current `Notation` instance (self).
         *
         *  @example
         *  const obj = { car: { brand: "Dodge", year: 1970 } };
         *  Notation.create(obj).merge({
         *      "car.brand": "Ford",
         *      "car.model": "Mustang",
         *      "car.year": 1965,
         *      "car.color": "red",
         *      "boat": "none"
         *  });
         *  console.log(obj);
         *  // { car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" }, boat: "none" };
         */

    }, {
        key: 'merge',
        value: function merge(notationsObject) {
            var _this2 = this;

            var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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
         *  @param {Array} notations - The notations array to be processed.
         *
         *  @returns {Object} - An object with the removed properties.
         *
         *  @example
         *  const obj = { car: { brand: "Dodge", year: 1970 }, notebook: "Mac" };
         *  const separated = Notation.create(obj).separate(["car.brand", "boat" ]);
         *  console.log(separated);
         *  // { notebook: "Mac", car: { brand: "Ford" } };
         *  console.log(obj);
         *  // { car: { year: 1970 } };
         */

    }, {
        key: 'separate',
        value: function separate(notations) {
            var _this3 = this;

            if (!_utils2.default.isArray(notations)) {
                throw new _notation4.default(ERR.NOTA_OBJ + '`' + notations + '`');
            }
            var o = new Notation({});
            _utils2.default.each(notations, function (notation, index, obj) {
                var result = _this3.inspectRemove(notation);
                o.set(notation, result.value);
            });
            this._source = o._source;
            return this;
        }

        /**
         *  Deep clones the source object while filtering its properties
         *  by the given glob notations. Includes all matched properties
         *  and removes the rest.
         *
         *  @param {Array|String} globNotations - The glob notation(s) to
         *  be processed. The difference between normal notations and
         *  glob-notations is that you can use wildcard stars (*) and
         *  negate the notation by prepending a bang (!). A negated
         *  notation will be excluded. Order of the globs do not matter,
         *  they will be logically sorted. Loose globs will be processed
         *  first and verbose globs or normal notations will be processed
         *  last. e.g. `[ "car.model", "*", "!car.*" ]` will be sorted as
         *  `[ "*", "!car.*", "car.model" ]`.
         *  Passing no parameters or passing an empty string (`""` or `[""]`)
         *  will empty the source object.
         *  @chainable
         *
         *  @returns {Notation} - Returns the current `Notation` instance (self).
         *
         *  @example
         *  const obj = { notebook: "Mac", car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" } };
         *  const notation = Notation.create(obj);
         *  notation.filter([ "*", "!car.*", "car.model" ]);
         *  console.log(obj);       // { notebook: "Mac", car: { model: "Mustang" } }
         *  notation.filter("*");   // re-filtering the current contents
         *  console.log(obj);       // { notebook: "Mac", car: { model: "Mustang" } }
         *  notation.filter();      // or notation.filter("");
         *  console.log(obj);       // {}
         */

    }, {
        key: 'filter',
        value: function filter(globNotations) {
            var _this4 = this;

            var original = this.value;
            var copy = _utils2.default.deepCopy(original);

            // ensure array, normalize and sort the globs in logical order. we also
            // concat the array first (to prevent mutating the original) bec. we'll
            // change it's content via `.shift()`
            var globs = _notation2.default.normalize(globNotations).concat();

            // if globs only consist of "*"; set the "copy" as source and return.
            if (_utils2.default.stringOrArrayOf(globs, '*')) {
                this._source = copy;
                return this;
            }
            // if globs is "" or [""] set source to `{}` and return.
            if (arguments.length === 0 || _utils2.default.stringOrArrayOf(globs, '') || _utils2.default.stringOrArrayOf(globs, '!*')) {
                this._source = {};
                return this;
            }

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
                // console.log('--->', globNotation);
                g = new _notation2.default(globNotation);
                // set flag that indicates whether the glob ends with `.*`
                endStar = g.absGlob.slice(-2) === '.*';
                // get the remaining part as the (extra) normalized glob
                normalized = endStar ? g.absGlob.slice(0, -2) : g.absGlob;
                // normalized = endStar ? g.absGlob.replace(/(\.\*)+$/, '') : g.absGlob;
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
                _this4.each(function (originalNotation, key, value, obj) {
                    // console.log('>>', originalNotation);

                    // iterating each note of original notation. i.e.:
                    // note1.note2.note3 is iterated from left to right, as:
                    // 'note1', 'note1.note2', 'note1.note2.note3' — in order.
                    Notation.eachNote(originalNotation, function (levelNotation, note, index, list) {
                        if (g.test(levelNotation)) {
                            if (g.isNegated) {
                                // console.log('removing', levelNotation, 'of', originalNotation);
                                filtered.remove(levelNotation);
                                // we break and return early if removed bec. deeper
                                // level props are also removed with this parent.
                                // e.g. when 'note1.note2' of 'note1.note2.note3' is
                                // removed, we no more have 'note3'.
                                return false;
                            }
                            filtered.set(levelNotation, value, true);
                        }
                    });
                });
            });
            // finally set the filtered's value as the source of our instance and
            // return.
            this._source = filtered.value;
            return this;
        }

        /**
         *  Removes the property from the source object, at the given notation.
         *  @alias Notation#delete
         *  @chainable
         *
         *  @param {String} notation - The notation to be inspected.
         *
         *  @returns {Notation} - Returns the current `Notation` instance (self).
         *
         *  @example
         *  const obj = { notebook: "Mac", car: { model: "Mustang" } };
         *  Notation.create(obj).remove("car.model");
         *  console.log(obj); // { notebook: "Mac", car: { } }
         */

    }, {
        key: 'remove',
        value: function remove(notation) {
            this.inspectRemove(notation);
            return this;
        }
        /**
         *  Alias of `Notation#remove`
         *  @private
         */

    }, {
        key: 'delete',
        value: function _delete(notation) {
            this.remove(notation);
            return this;
        }

        /**
         *  Clones the `Notation` instance to a new one.
         *
         *  @returns {Notation} - A new copy of the instance.
         */

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
         *  @chainable
         *
         *  @param {Object} destination - The destination object that the notated
         *  properties will be copied to.
         *  @param {String} notation - The notation to get the corresponding property
         *  from the source object.
         *  @param {String} [newNotation=null] - The notation to set the source property
         *  on the destination object. In other words, the copied property will be
         *  renamed to this value before set on the destination object. If not set,
         *  `notation` argument will be used.
         *  @param {Boolean} [overwrite=true] - Whether to overwrite the property on
         *  the destination object if it exists.
         *
         *  @returns {Notation} - Returns the current `Notation` instance (self).
         *
         *  @example
         *  const obj = { car: { brand: "Ford", model: "Mustang" } };
         *  const models = { dodge: "Charger" };
         *  Notation.create(obj).copyTo(models, "car.model", "ford");
         *  console.log(models);
         *  // { dodge: "Charger", ford: "Mustang" }
         *  // source object (obj) is not modified
         */

    }, {
        key: 'copyTo',
        value: function copyTo(destination, notation) {
            var newNotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

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
         *  @chainable
         *
         *  @param {Object} destination - The destination object that the notated
         *  properties will be copied from.
         *  @param {String} notation - The notation to get the corresponding property
         *  from the destination object.
         *  @param {String} [newNotation=null] - The notation to set the destination
         *  property on the source object. In other words, the copied property
         *  will be renamed to this value before set on the source object.
         *  If not set, `notation` argument will be used.
         *  @param {Boolean} [overwrite=true] - Whether to overwrite the property
         *  on the source object if it exists.
         *
         *  @returns {Notation} - Returns the current `Notation` instance (self).
         *
         *  @example
         *  const obj = { car: { brand: "Ford", model: "Mustang" } };
         *  const models = { dodge: "Charger" };
         *  Notation.create(obj).copyFrom(models, "dodge", "car.model", true);
         *  console.log(obj);
         *  // { car: { brand: "Ford", model: "Charger" } }
         *  // models object is not modified
         */

    }, {
        key: 'copyFrom',
        value: function copyFrom(destination, notation) {
            var newNotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

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
         *  @chainable
         *
         *  @param {Object} destination - The destination object that the notated
         *  properties will be moved to.
         *  @param {String} notation - The notation to get the corresponding
         *  property from the source object.
         *  @param {String} [newNotation=null] - The notation to set the source property
         *  on the destination object. In other words, the moved property will be
         *  renamed to this value before set on the destination object. If not set,
         *  `notation` argument will be used.
         *  @param {Boolean} [overwrite=true] - Whether to overwrite the property on
         *  the destination object if it exists.
         *
         *  @returns {Notation} - Returns the current `Notation` instance (self).
         *
         *  @example
         *  const obj = { car: { brand: "Ford", model: "Mustang" } };
         *  const models = { dodge: "Charger" };
         *  Notation.create(obj).moveTo(models, "car.model", "ford");
         *  console.log(obj);
         *  // { car: { brand: "Ford" } }
         *  console.log(models);
         *  // { dodge: "Charger", ford: "Mustang" }
         */

    }, {
        key: 'moveTo',
        value: function moveTo(destination, notation) {
            var newNotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

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
         *  @chainable
         *
         *  @param {Object} destination - The destination object that the notated
         *  properties will be moved from.
         *  @param {String} notation - The notation to get the corresponding property
         *  from the destination object.
         *  @param {String} [newNotation=null] - The notation to set the destination
         *  property on the source object. In other words, the moved property
         *  will be renamed to this value before set on the source object.
         *  If not set, `notation` argument will be used.
         *  @param {Boolean} [overwrite=true] - Whether to overwrite the property on
         *  the source object if it exists.
         *
         *  @returns {Notation} - Returns the current `Notation` instance (self).
         *
         *  @example
         *  const obj = { car: { brand: "Ford", model: "Mustang" } };
         *  const models = { dodge: "Charger" };
         *  Notation.create(obj).moveFrom(models, "dodge", "car.model", true);
         *  console.log(obj);
         *  // { car: { brand: "Ford", model: "Charger" } }
         *  console.log(models);
         *  // {}
         */

    }, {
        key: 'moveFrom',
        value: function moveFrom(destination, notation) {
            var newNotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

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
         *  @chainable
         *
         *  @param {String} notation - The notation to get the corresponding
         *  property (value) from the source object.
         *  @param {String} newNotation - The new notation for the targeted
         *  property value. If not set, the source object will not be modified.
         *  @param {Boolean} [overwrite=true] - Whether to overwrite the property at
         *  the new notation, if it exists.
         *
         *  @returns {Notation} - Returns the current `Notation` instance (self).
         *
         *  @example
         *  const obj = { car: { brand: "Ford", model: "Mustang" } };
         *  Notation.create(obj)
         *      .rename("car.brand", "carBrand")
         *      .rename("car.model", "carModel");
         *  console.log(obj);
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
         *  @param {String} notation - The notation to get the corresponding
         *  property (value) from the source object.
         *  @param {String} newNotation - The new notation to be set on the new
         *  object for the targeted property value. If not set, `notation` argument
         *  will be used.
         *
         *  @returns {Object} - Returns a new object with the notated property.
         *
         *  @example
         *  const obj = { car: { brand: "Ford", model: "Mustang" } };
         *  const extracted = Notation.create(obj).extract("car.brand", "carBrand");
         *  console.log(extracted);
         *  // { carBrand: "Ford" }
         *  // obj is not modified
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
         *  @param {String} notation - The notation to get the corresponding
         *  property (value) from the source object.
         *  @param {String} newNotation - The new notation to be set on the new
         *  object for the targeted property value. If not set, `notation` argument
         *  will be used.
         *
         *  @returns {Object} - Returns a new object with the notated property.
         *
         *  @example
         *  const obj = { car: { brand: "Ford", model: "Mustang" } };
         *  const extruded = Notation.create(obj).extrude("car.brand", "carBrand");
         *  console.log(obj);
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
         *  Basically constructs a new `Notation` instance with the given object.
         *  @chainable
         *
         *  @param {Object} [object={}] - The object to be notated.
         *
         *  @returns {Notation} - The created instance.
         *
         *  @example
         *  const notation = Notation.create(obj);
         *  // equivalent to:
         *  const notation = new Notation(obj);
         */

    }, {
        key: 'value',
        get: function get() {
            return this._source;
        }
    }], [{
        key: 'create',
        value: function create() {
            var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return new Notation(object);
        }

        /**
         *  Checks whether the given notation string is valid. Note that the star
         *  (`*`) (which is a valid character, even if irregular) is NOT treated as
         *  wildcard here. This checks for normal dot-notation, not a glob-notation.
         *  For glob notation validation, use `Notation.Glob.isValid()` method. Same
         *  goes for the negation character/prefix (`!`).
         *
         *  Note that, even though `obj['some.name']` is possible in JS, dot (`.`) is
         *  always treated as a level (property) separator in Notation strings.
         *
         *  @param {String} notation - The notation string to be checked.
         *
         *  @returns {Boolean}
         *
         *  @example
         *  Notation.isValid('prop1.prop2.prop3'); // true
         *  Notation.isValid('prop1'); // true
         *  Notation.isValid('prop.*'); // true (but star is not treated as wildcard)
         *  Notation.isValid('@1'); // true (bec. obj['@1'] is possible in JS.)
         *  Notation.isValid(null); // false
         */

    }, {
        key: 'isValid',
        value: function isValid(notation) {
            return typeof notation === 'string' && /^[^\s.!]+(\.[^\s.!]+)*$/.test(notation);
        }

        /**
         *  Counts the number of notes/levels in the given notation.
         *  @alias Notation.countLevels
         *
         *  @param {*} notation - The notation string to be processed.
         *
         *  @returns {Number}
         */

    }, {
        key: 'countNotes',
        value: function countNotes(notation) {
            if (!Notation.isValid(notation)) {
                throw new _notation4.default(ERR.NOTATION + '`' + notation + '`');
            }
            return notation.split('.').length;
        }
        /**
         *  Alias of `Notation.countNotes`.
         *  @private
         */

    }, {
        key: 'countLevels',
        value: function countLevels(notation) {
            return Notation.countNotes(notation);
        }

        /**
         *  Gets the first (root) note of the notation string.
         *
         *  @param {String} notation - The notation string to be processed.
         *
         *  @returns {String}
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
         *  @returns {String}
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
         *  @returns {String}
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
            return notation.indexOf('.') >= 0 ? notation.replace(/\.[^.]*$/, '') : null;
        }

        /**
         *  Iterates through each note/level of the given notation string.
         *  @alias Notation.eachLevel
         *
         *  @param {String} notation - The notation string to be iterated through.
         *  @param {Function} callback - The callback function to be invoked on
         *  each iteration. To break out of the loop, return `false` from within the
         *  callback.
         *  Callback signature: `callback(levelNotation, note, index, list) { ... }`
         *
         *  @returns {void}
         *
         *  @example
         *  const notation = 'first.prop2.last';
         *  Notation.eachNote(notation, function (levelNotation, note, index, list) {
         *      console.log(index, note, levelNotation);
         *  });
         *  // 0  "first"             "first"
         *  // 1  "first.prop2"       "prop2"
         *  // 2  "first.prop2.last"  "last"
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
        /**
         *  Alias of `Notation.eachNote`.
         *  @private
         */

    }, {
        key: 'eachLevel',
        value: function eachLevel(notation, callback) {
            Notation.eachNote(notation, callback);
        }
    }]);

    return Notation;
}();

/**
 *  Error class specific to `Notation`.
 *  @private
 *
 *  @class
 *  @see `{@link #Notation.Error}`
 */


Notation.Error = _notation4.default;

/**
 *  Utility for validating, comparing and sorting dot-notation globs.
 *  This is internally used by `Notation` class.
 *  @private
 *
 *  @class
 *  @see `{@link #Notation.Glob}`
 */
Notation.Glob = _notation2.default;

// --------------------------------
// EXPORT
// --------------------------------

exports.default = Notation;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _notation = __webpack_require__(1);

var _notation2 = _interopRequireDefault(_notation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// http://www.linfo.org/wildcard.html
// http://en.wikipedia.org/wiki/Glob_%28programming%29
// http://en.wikipedia.org/wiki/Wildcard_character#Computing

/**
 *  `Notation.Glob` is a utility for validating, comparing and sorting
 *  dot-notation globs.
 *
 *  You can use {@link http://www.linfo.org/wildcard.html|wildcard} stars `*`
 *  and negate the notation by prepending a bang `!`. A star will include all
 *  the properties at that level and a negated notation will be excluded.
 *  @name Notation.Glob
 *  @memberof! Notation
 *  @class
 *
 *  @example
 *  // for the following object;
 *  { name: 'John', billing: { account: { id: 1, active: true } } };
 *
 *  'billing.account.*'  // represents value `{ id: 1, active: true }`
 *  'billing.account.id' // represents value `1`
 *  '!billing.account.*' // represents value `{ name: 'John' }`
 *  'name' // represents `'John'`
 *  '*' // represents the whole object
 *
 *  @example
 *  var glob = new Notation.Glob('billing.account.*');
 *  glob.test('billing.account.id'); // true
 */
var NotationGlob = function () {

    /**
     *  Constructs a `Notation.Glob` object with the given glob string.
     *  @constructs Notation.Glob
     *
     *  @param {String} glob - The glob string.
     */
    function NotationGlob(glob) {
        _classCallCheck(this, NotationGlob);

        if (!NotationGlob.isValid(glob)) {
            throw new _notation2.default('Invalid notation glob: "' + glob + '"');
        }

        var ng = NotationGlob.inspect(glob);
        this._ = {
            glob: glob,
            absGlob: ng.absGlob,
            isNegated: ng.isNegated,
            regexp: NotationGlob.toRegExp(ng.absGlob),
            levels: ng.absGlob.split('.')
        };
    }

    // --------------------------------
    // NotationGlob Instance Properties
    // --------------------------------

    /**
     *  Gets the original glob notation string.
     *  @name Notation.Glob#glob
     *  @type {String}
     */


    _createClass(NotationGlob, [{
        key: 'test',


        // --------------------------------
        // NotationGlob Instance Methods
        // --------------------------------

        /**
         *  Checks whether the given notation value matches the source notation glob.
         *  @name Notation.Glob#test
         *  @function
         *
         *  @param {String} notation - The notation string to be tested.
         *
         *  @returns {Boolean}
         *
         *  @example
         *  const glob = new Notation.Glob('!prop.*.name');
         *  glob.test("prop.account.name"); // true
         */
        value: function test(notation) {
            // we allow '*' to match everything. We check for this here
            // instead of the regexp bec. we care for dots (.) within the glob.
            return this.absGlob === '*' || this.absGlob !== '' && notation !== '' && this.regexp.test(notation);
        }

        // --------------------------------
        // NotationGlob Static Members
        // --------------------------------

        /**
         *  Basically constructs a new `NotationGlob` instance
         *  with the given glob string.
         *  @name Notation.Glob.create
         *  @function
         *
         *  @param {String} glob - The source notation glob.
         *
         *  @returns {NotationGlob}
         *
         *  @example
         *  const glob = Notation.Glob.create(strGlob);
         *  // equivalent to:
         *  const glob = new Notation.Glob(strGlob);
         */

    }, {
        key: 'glob',
        get: function get() {
            return this._.glob;
        }

        /**
         *  Gets the absolute glob notation (without the preceeding bang `!`).
         *  @name Notation.Glob#absGlob
         *  @type {String}
         */

    }, {
        key: 'absGlob',
        get: function get() {
            return this._.absGlob;
        }

        /**
         *  Specifies whether this glob is negated with a `!` prefix.
         *  @name Notation.Glob#isNegated
         *  @type {Boolean}
         */

    }, {
        key: 'isNegated',
        get: function get() {
            return this._.isNegated;
        }

        /**
         *  Represents this glob in regular expressions.
         *  Note that the negation (`!`) is ignored, if any.
         *  @name Notation.Glob#regexp
         *  @type {RegExp}
         */

    }, {
        key: 'regexp',
        get: function get() {
            return this._.regexp;
        }

        /**
         *  List of notes/levels of this glob notation.
         *  @name Notation.Glob#notes
         *  @alias Notation.Glob#levels
         *  @type {Array}
         */

    }, {
        key: 'notes',
        get: function get() {
            return this._.levels;
        }
        /**
         *  Alias of `Notation.Glob#notes`.
         *  @private
         */

    }, {
        key: 'levels',
        get: function get() {
            return this._.levels;
        }
    }], [{
        key: 'create',
        value: function create(glob) {
            return new NotationGlob(glob);
        }

        /**
         *  Gets a regular expressions instance from the given glob notation.
         *  Note that the bang `!` prefix will be ignored if the given glob is negated.
         *  @name Notation.Glob.toRegExp
         *  @function
         *
         *  @param {String} glob - Glob notation to be converted.
         *
         *  @returns {RegExp}
         */

    }, {
        key: 'toRegExp',
        value: function toRegExp(glob) {
            if (glob.indexOf('!') === 0) glob = glob.slice(1);
            // Modified from http://stackoverflow.com/a/13818704/112731
            glob = _utils2.default.pregQuote(glob).replace(/\\\*/g, '[^\\s\\.]*').replace(/\\\?/g, '.');
            return new RegExp('^' + glob + '(\\..+|$)');
            // it should either end ($) or continue with a dot. So for example,
            // `company.*` will produce `/^company\.[^\s\.]*/` which will match both
            // `company.name` and `company.address.street` but will not match
            // `some.company.name`. Also `!password` will not match `!password_reset`.
        }

        /**
         *  @private
         */

    }, {
        key: 'inspect',
        value: function inspect(glob) {
            var bang = glob.slice(0, 1) === '!';
            glob = bang ? glob.slice(1) : glob;
            return {
                absGlob: glob,
                isNegated: bang
            };
        }

        // Created test at: https://regex101.com/r/tJ7yI9/4
        /**
         *  Validates the given notation glob.
         *  @name Notation.Glob.isValid
         *  @function
         *
         *  @param {String} glob - Notation glob to be validated.
         *  @returns {Boolean}
         */

    }, {
        key: 'isValid',
        value: function isValid(glob) {
            return typeof glob === 'string' && /^(!?([^\s.!*]+|\*)(\.([^\s.!*]+|\*))*)$/.test(glob);
        }

        /**
         *  Compares two given notation globs and returns an integer value as a
         *  result. This is generally used to sort glob arrays. Loose globs (with
         *  stars especially closer to beginning of the glob string) and globs
         *  representing the parent/root of the compared property glob come first.
         *  Verbose/detailed/exact globs come last. (`* < *abc < abc`).
         *
         *  For instance; `store.address` comes before `store.address.street`. So
         *  this works both for `*, store.address.street, !store.address` and `*,
         *  store.address, !store.address.street`. For cases such as `prop.id` vs
         *  `!prop.id` which represent the same property; the negated glob wins
         *  (comes last).
         *  @name Notation.Glob.compare
         *  @function
         *
         *  @param {String} a - First notation glob to be compared.
         *  @param {String} b - Second notation glob to be compared.
         *
         *  @returns {Number} - Returns `-1` if `a` comes first, `1` if `b` comes
         *  first and `0` if equivalent priority.
         *
         *  @example
         *  let result = Notation.Glob.compare('prop.*.name', 'prop.*');
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
         *  Sorts the notation globs in the given array by their priorities. Loose
         *  globs (with stars especially closer to beginning of the glob string);
         *  globs representing the parent/root of the compared property glob come
         *  first. Verbose/detailed/exact globs come last. (`* < *abc < abc`).
         *
         *  For instance; `store.address` comes before `store.address.street`. For
         *  cases such as `prop.id` vs `!prop.id` which represent the same property;
         *  the negated glob wins (comes last).
         *  @name Notation.Glob.sort
         *  @function
         *
         *  @param {Array} globsArray - The notation globs array to be sorted. The
         *  passed array reference is modified.
         *
         *  @returns {Array}
         *
         *  @example
         *  const globs = ['!prop.*.name', 'prop.*', 'prop.id'];
         *  const sorted = Notation.Glob.sort(globs);
         *  console.log(sorted);
         *  // ['prop.*', 'prop.id', '!prop.*.name'];
         */

    }, {
        key: 'sort',
        value: function sort(globsArray) {
            return globsArray.sort(NotationGlob.compare);
            // return _mergeSortArray(globsArray, NotationGlob.compare);
        }

        /**
         *  Normalizes the given notation globs array by removing duplicate or
         *  redundant items and returns a priority-sorted globs array.
         *
         *  <ul>
         *  <li>If any exact duplicates found, all except first is removed.</li>
         *  <li>If both normal and negated versions of a glob are found, negated wins.
         *  <br />example: `['id', '!id']` normalizes to `['!id']`.</li>
         *  <li>If a glob is covered by another, it's removed.
         *  <br />example: `['car.*', 'car.model']` normalizes to `['car.*']`.</li>
         *  <li>If a glob is covered by another negated glob, it's kept.
         *  <br />example: `['*', '!car.*', 'car.model']` normalizes as is.</li>
         *  <li>If a negated glob is covered by another glob, it's also kept.
         *  <br />example: `['car.*', '!car.model']` normalizes as is.</li>
         *  </ul>
         *  @name Notation.Glob.normalize
         *  @function
         *
         *  @param {Array} globsArray - Notation globs array to be normalized.
         *
         *  @returns {Array}
         *
         *  @example
         *  const globs = ['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name', 'age'];
         *  const normalized = Notation.Glob.normalize(globs);
         *  console.log(normalized);
         *  // ['*', '!car.*', '!id', 'car.model']
         */

    }, {
        key: 'normalize',
        value: function normalize(globsArray) {
            globsArray = _utils2.default.ensureArray(globsArray).map(function (item) {
                return item.trim();
            });
            globsArray = NotationGlob.sort(globsArray);

            _utils2.default.eachRight(globsArray, function (globA, indexA) {

                // example #1:
                // ['*', '!id', 'name', 'car.model', '!car.*', 'id', 'name']
                // => ['*', '!id', '!car.*', 'car.model']

                // example #2:
                // ['!id', 'name', 'car.model', '!car.*', 'id', '!email']
                // => ['!car.*', 'car.model', 'name']

                var insA = NotationGlob.inspect(globA);
                // console.log(' • ', globA, '=>', globsArray);

                var duplicate = false;
                var hasExactNegative = false;
                var negCoversNeg = false;
                var noPosCoversNeg = true;
                var posCoversPos = false;
                var noNegCoversPos = true;

                // inspect/compare the current glob with the rest of the array
                _utils2.default.eachRight(globsArray, function (globB, indexB) {
                    // don't inspect glob with itself
                    if (indexB === indexA) return; // no break, move to next

                    var insB = NotationGlob.inspect(globB);
                    var reB = NotationGlob.toRegExp(insB.absGlob);

                    // console.log(globA, 'vs', globB);

                    // (A) remove if duplicate
                    if (globA === globB) {
                        duplicate = true;
                        return false; // break
                    }

                    // (B) remove if positive has an exact negative
                    // e.g. ['prop', '!prop'] => ['!prop']
                    // negated wins when normalized
                    if (insB.isNegated && globA === insB.absGlob) {
                        hasExactNegative = true;
                        return false; // break
                    }

                    // (C) remove negated if:
                    //    1) any negative covers it
                    //       ['!a.b', '!a.*']  => '!a.b' is removed
                    //    2) no positive covers it
                    //       ['!a.b', 'a.c']   => '!a.b' is removed

                    // (D) remove positive if:
                    //    1) any positive covers it AND no negative covers it
                    //       ['*', 'a.b']            => 'a.b' is removed
                    //       ['*', 'a.b', '!a.*']    => 'a.b' is kept

                    if (insA.isNegated) {
                        if (insB.isNegated && reB.test(insA.absGlob)) {
                            negCoversNeg = true;
                            return false; // break
                        } else if (noPosCoversNeg && reB.test(insA.absGlob)) {
                            noPosCoversNeg = false;
                        }
                    } else {
                        // if (!insA.isNegated)
                        if (!insB.isNegated && reB.test(insA.absGlob)) {
                            posCoversPos = true;
                        } else if (noNegCoversPos && reB.test(insA.absGlob)) {
                            noNegCoversPos = false;
                        }
                    }
                });

                var redundant = insA.isNegated ? negCoversNeg || noPosCoversNeg : posCoversPos && noNegCoversPos;

                if (duplicate || hasExactNegative || redundant) {
                    // remove the current (at the end)
                    globsArray.splice(indexA, 1);
                }
            });

            // since negated wins in the same array, ['*', '!*'] is already reduced
            // to ['!*'] so we can safely remove !* if found, since it's redundant.
            // e.g. ['!*', 'name'] => ['name']
            var i = globsArray.indexOf('!*');
            if (i >= 0) globsArray.splice(i, 1);

            return globsArray;
        }

        /**
         *  Gets the union from the given couple of glob arrays and returns
         *  a new array of globs.
         *  <ul>
         *  <li>If the exact same element is found in both
         *  arrays, one of them is removed to prevent duplicates.
         *  <br />example: `['!id', 'name'] ∪ ['!id']` unites to `['!id', 'name']`</li>
         *  <li>If any non-negated item is covered by a glob in the same
         *  or other array, the redundant item is removed.
         *  <br />example: `['*', 'name'] ∪ ['email']` unites to `['*']`</li>
         *  <li>If one of the arrays contains a negated equivalent of an
         *  item in the other array, the negated item is removed.
         *  <br />example: `['!id'] ∪ ['id']` unites to `['id']`</li>
         *  <li>If any item covers/matches a negated item in the other array,
         *  the negated item is removed.
         *  <br />example #1: `['!user.id'] ∪ ['user.*']` unites to `['user.*']`
         *  <br />example #2: `['*'] ∪ ['!password']` unites to `['*']`
         *  </li>
         *  <li>So on... For a better understanding read the inline code
         *  documentation.</li>
         *  </ul>
         *  @name Notation.Glob.union
         *  @function
         *
         *  @param {Array} globsA - First array of glob strings.
         *  @param {Array} globsB - Second array of glob strings.
         *
         *  @returns {Array}
         *
         *  @example
         *  const a = ['foo.bar', 'bar.baz', '!*.qux'];
         *  const b = ['!foo.bar', 'bar.qux', 'bar.baz'];
         *  const union = Notation.Glob.union(a, b);
         *  console.log(union);
         *  // ['!*.qux', 'foo.bar', 'bar.baz', 'bar.qux']
         */

    }, {
        key: 'union',
        value: function union(globsA, globsB) {
            // NOTE: The logic here is quite complex. For making this easier to
            // understand; below code is written a bit verbose. Do not modify this
            // only to make it shorter. This will already get minified.

            // -----------------------

            // if any of the arrays has a single glob item of only a wildcard (e.g.
            // `['*']`); this covers all, so...
            if (_utils2.default.hasSingleItemOf(globsA, '*') || _utils2.default.hasSingleItemOf(globsB, '*')) {
                return ['*'];
            }

            // clone arrays so we don't mutate the originals.
            var arrA = globsA.concat();
            var arrB = globsB.concat();
            // no need to normalize. we'll do it at the end.

            var reA = void 0,
                reB = void 0,
                insA = void 0,
                insB = void 0;

            // storage for tracking (winner) negated globs that are compared with
            // another negated in the other array. For example:
            // ['*', '!user.*'] ∪ ['*', '!user.id']
            // '!user.id' should be kept in the union when compared with '!user.*'.
            // but later, '!user.id' will be unioned with '*' in the other array
            // which will cover and remove '!user.id'. so we'll keep a storage for
            // to prevent this.
            var keepNegated = [];

            // iterate through array A
            _utils2.default.eachRight(arrA, function (a, aIndex) {
                insA = NotationGlob.inspect(a);
                reA = NotationGlob.toRegExp(insA.absGlob);

                // iterate through array B for each item in A
                _utils2.default.eachRight(arrB, function (b, bIndex) {
                    insB = NotationGlob.inspect(b);
                    reB = NotationGlob.toRegExp(insB.absGlob);

                    // console.log(a, 'vs', b);

                    if (insA.isNegated && !insB.isNegated) {
                        // if we have the non-negated version of the same glob in B,
                        // we'll remove item in A. In union, non-negated wins
                        // (unlike normalize — in normalize, negated wins within the
                        // same array).
                        if (insA.absGlob === insB.absGlob) {
                            arrA.splice(aIndex, 1);
                            // console.log(`${a} removed: ${a} reverses ${b}`);
                            // console.log(arrA, '∪', arrB);
                            return false; // break from B
                        }

                        // remove the negated from A only if the same value is not in B.
                        // e.g. 1)  ['!x.y'] ∪ ['x.*'] => ['x.*']
                        // e.g. 2)  ['!x.y'] ∪ ['x.*', '!x.y'] => ['x.*', '!x.y']
                        if (reB.test(insA.absGlob) && arrB.indexOf(a) === -1 && keepNegated.indexOf(a) === -1) {
                            arrA.splice(aIndex, 1);
                            // console.log(`${a} removed: ${b} covers ${a}`);
                            // console.log(arrA, '∪', arrB);
                            return false; // break from B
                        }
                    }

                    if (!insA.isNegated && insB.isNegated) {
                        // if we have the non-negated version of the same glob in A,
                        // we'll remove item in B.
                        if (insA.absGlob === insB.absGlob) {
                            arrB.splice(bIndex, 1);
                            // console.log(`${b} removed: ${b} reverses ${a}`);
                            // console.log(arrA, '∪', arrB);
                            return; // move to next in B
                        }

                        // remove the negated from B only if the same value is not in A.
                        // e.g. 1)  ['!x.y'] ∪ ['x.*'] => ['x.*']
                        // e.g. 2)  ['!x.y'] ∪ ['x.*', '!x.y'] => ['x.*', '!x.y']
                        if (reA.test(insB.absGlob) && arrA.indexOf(b) === -1 && keepNegated.indexOf(b) === -1) {
                            arrB.splice(bIndex, 1);
                            // console.log(`${b} removed: ${a} covers ${b}`);
                            // console.log(arrA, '∪', arrB);
                            return; // move to next in B
                        }
                    }

                    if (insA.isNegated && insB.isNegated) {
                        // if both A and B are negated and NOT equal, we'll check
                        // for coverage over one or the other.
                        if (a !== b) {
                            // if B covers A, we'll remove from B.
                            // e.g. '!user.*' covers '!user.id'
                            if (reB.test(insA.absGlob)) {
                                arrB.splice(bIndex, 1);
                                keepNegated.push(a);
                                // console.log(`${b} removed: ${a} neg-covers ${b}`);
                                // console.log(arrA, '∪', arrB);
                                return; // move to next in B
                            }
                            // if A covers B, we'll remove from A.
                            if (reA.test(insB.absGlob)) {
                                arrA.splice(aIndex, 1);
                                keepNegated.push(b);
                                // console.log(`${a} removed: ${b} neg-covers ${a}`);
                                // console.log(arrA, '∪', arrB);
                                return false; // break from B
                            }
                        }
                        // else, if they are equal, we'll not remove any bec. it
                        // means both arrays disalow that glob.
                    }

                    if (!insA.isNegated && !insB.isNegated) {
                        // if both A and B are NOT negated and equal, we'll remove
                        // from A.
                        if (a === b) {
                            arrA.splice(aIndex, 1);
                            // console.log(`${a} removed: ${a} === ${b}`);
                            // console.log(arrA, '∪', arrB);
                            return false;
                        }

                        // else -> (a !== b)

                        // Leave the rest to the normalizing process
                        // (Notation.Glob.normalize) bec. when both A and B are
                        // non-negated, the one which is covered by the other will
                        // be removed incorrectly.

                        // For example:
                        // ['!x.y'] ∪ ['x.*'] => ['x.*']
                        // ['*', '!x.*'] ∪ ['*', '!x.*', 'x.o']
                        // '*' in A will cover and remove 'x.o' in B incorrectly bec.
                        // 'x.o' is a remainder from '!x.*' which is both in A and B.

                        // So when this is left as is; the final union before
                        // normalizing is: ['*', '!x.*', '*', 'x.o']
                        // normalized to:  ['*', '!x.*', 'x.o']

                        // if (reB.test(insA.absGlob)) {
                        //     arrA.splice(aIndex, 1);
                        //     console.log(`${a} removed: ${b} covers ${a}`);
                        //     console.log(arrA, '∪', arrB);
                        //     return false;
                        // }
                        // if (reA.test(insB.absGlob)) {
                        //     arrB.splice(bIndex, 1);
                        //     console.log(`${b} removed: ${a} covers ${b}`);
                        //     console.log(arrA, '∪', arrB);
                        //     return;
                        // }
                    }
                });
            });

            // concat both arrays, normalize and sort so we get a nice union array.
            var result = arrA.concat(arrB);
            return NotationGlob.normalize(result);
        }
    }]);

    return NotationGlob;
}();

exports.default = NotationGlob;

/***/ })
/******/ ]);
});
//# sourceMappingURL=notation.js.map