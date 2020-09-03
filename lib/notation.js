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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/notation.error.js":
/*!************************************!*\
  !*** ./src/core/notation.error.js ***!
  \************************************/
/*! exports provided: NotationError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotationError", function() { return NotationError; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/* eslint consistent-this:0, no-prototype-builtins:0 */
var setProto = Object.setPrototypeOf;
/**
 *  Error class specific to `Notation`.
 *  @class
 *  @name Notation.Error
 */

var NotationError = /*#__PURE__*/function (_Error) {
  _inherits(NotationError, _Error);

  var _super = _createSuper(NotationError);

  /**
   *  Initializes a new `Notation.Error` instance.
   *  @hideconstructor
   *  @constructs Notation.Error
   *  @param {String} message - The error message.
   */
  function NotationError() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, NotationError);

    _this = _super.call(this, message);
    setProto(_assertThisInitialized(_this), NotationError.prototype);
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      enumerable: false,
      writable: false,
      value: 'NotationError'
    });
    Object.defineProperty(_assertThisInitialized(_this), 'message', {
      enumerable: false,
      writable: true,
      value: message
    });
    /* istanbul ignore else */

    if (Error.hasOwnProperty('captureStackTrace')) {
      // V8
      Error.captureStackTrace(_assertThisInitialized(_this), NotationError);
    } else {
      Object.defineProperty(_assertThisInitialized(_this), 'stack', {
        enumerable: false,
        writable: false,
        value: new Error(message).stack
      });
    }

    return _this;
  }

  return NotationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));



/***/ }),

/***/ "./src/core/notation.glob.js":
/*!***********************************!*\
  !*** ./src/core/notation.glob.js ***!
  \***********************************/
/*! exports provided: Glob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Glob", function() { return Glob; });
/* harmony import */ var _notation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notation */ "./src/core/notation.js");
/* harmony import */ var _notation_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notation.error */ "./src/core/notation.error.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint no-use-before-define:0, consistent-return:0, max-statements:0 */


 // http://www.linfo.org/wildcard.html
// http://en.wikipedia.org/wiki/Glob_%28programming%29
// http://en.wikipedia.org/wiki/Wildcard_character#Computing
// created test @ https://regex101.com/r/U08luj/2

var reMATCHER = /(\[(\d+|\*|".*"|'.*')\]|[a-z$_][a-z$_\d]*|\*)/gi; // ! negation should be removed first
// created test @ https://regex101.com/r/mC8unE/3
// /^!?(\*|[a-z$_][a-z$_\d]*|\[(\d+|".*"|'.*'|`.*`|\*)\])(\[(\d+|".*"|'.*'|`.*`|\*)\]|\.[a-z$_][a-z$_\d]*|\.\*)*$/i

var reVALIDATOR = new RegExp('^' + '!?(' // optional negation, only in the front
+ '\\*' // wildcard star
+ '|' // OR
+ '[a-z$_][a-z$_\\d]*' // JS variable syntax
+ '|' // OR
+ '\\[(\\d+|\\*|".*"|\'.*\')\\]' // array index or wildcard, or object bracket notation
+ ')' // exactly once
+ '(' + '\\[(\\d+|\\*|".*"|\'.*\')\\]' // followed by same
+ '|' // OR
+ '\\.[a-z$_][a-z$_\\d]*' // dot, then JS variable syntax
+ '|' // OR
+ '\\.\\*' // dot, then wildcard star
+ ')*' // (both) may repeat any number of times
+ '$', 'i');
var re = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].re;
var ERR_INVALID = 'Invalid glob notation: ';
/**
 *  `Notation.Glob` is a utility for validating, comparing and sorting
 *  dot-notation globs.
 *
 *  You can use {@link http://www.linfo.org/wildcard.html|wildcard} stars `*`
 *  and negate the notation by prepending a bang `!`. A star will include all
 *  the properties at that level and a negated notation will be excluded.
 *  @name Glob
 *  @memberof Notation
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

var Glob = /*#__PURE__*/function () {
  /**
   *  Constructs a `Notation.Glob` object with the given glob string.
   *  @constructs Notation.Glob
   *  @param {String} glob - Notation string with globs.
   *
   *  @throws {NotationError} - If given notation glob is invalid.
   */
  function Glob(glob) {
    _classCallCheck(this, Glob);

    var ins = Glob._inspect(glob);

    var notes = Glob.split(ins.absGlob);
    this._ = _objectSpread(_objectSpread({}, ins), {}, {
      notes: notes,
      // below props will be set at first getter call
      parent: undefined,
      // don't set to null
      regexp: undefined
    });
  } // --------------------------------
  // INSTANCE PROPERTIES
  // --------------------------------

  /**
   *  Gets the normalized glob notation string.
   *  @name Notation.Glob#glob
   *  @type {String}
   */


  _createClass(Glob, [{
    key: "test",
    // --------------------------------
    // INSTANCE METHODS
    // --------------------------------

    /**
     *  Checks whether the given notation value matches the source notation
     *  glob.
     *  @name Notation.Glob#test
     *  @function
     *  @param {String} notation - The notation string to be tested. Cannot have
     *  any globs.
     *  @returns {Boolean} -
     *  @throws {NotationError} - If given `notation` is not valid or contains
     *  any globs.
     *
     *  @example
     *  const glob = new Notation.Glob('!prop.*.name');
     *  glob.test("prop.account.name"); // true
     */
    value: function test(notation) {
      if (!_notation__WEBPACK_IMPORTED_MODULE_0__["Notation"].isValid(notation)) {
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"]("Invalid notation: '".concat(notation, "'"));
      } // return this.regexp.test(notation);


      return Glob._covers(this, notation);
    }
    /**
     *  Specifies whether this glob notation can represent (or cover) the given
     *  glob notation. Note that negation prefix is ignored, if any.
     *  @name Notation.Glob#covers
     *  @function
     *
     *  @param {String|Array|Glob} glob  Glob notation string, glob
     *  notes array or a `Notation.Glob` instance.
     *  @returns {Boolean} -
     *
     *  @example
     *  const glob = Notation.Glob.create;
     *  glob('*.y').covers('x.y')      // true
     *  glob('x[*].y').covers('x[*]')  // false
     */

  }, {
    key: "covers",
    value: function covers(glob) {
      return Glob._covers(this, glob);
    }
    /**
     *  Gets the intersection of this and the given glob notations. When
     *  restrictive, if any one of them is negated, the outcome is negated.
     *  Otherwise, only if both of them are negated, the outcome is negated.
     *  @name Notation.Glob#intersect
     *  @function
     *
     *  @param {String} glob - Second glob to be used.
     *  @param {Boolean} [restrictive=false] - Whether the intersection should
     *  be negated when one of the globs is negated.
     *  @returns {String} - Intersection notation if any; otherwise `null`.
     *
     *  @example
     *  const glob = Notation.Glob.create;
     *  glob('x.*').intersect('!*.y')         // 'x.y'
     *  glob('x.*').intersect('!*.y', true)   // '!x.y'
     */

  }, {
    key: "intersect",
    value: function intersect(glob) {
      var restrictive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return Glob._intersect(this.glob, glob, restrictive);
    } // --------------------------------
    // STATIC MEMBERS
    // --------------------------------

    /**
     *  Basically constructs a new `Notation.Glob` instance
     *  with the given glob string.
     *  @name Notation.Glob.create
     *  @function
     *
     *  @param {String} glob - The source notation glob.
     *  @returns {Glob} -
     *
     *  @example
     *  const glob = Notation.Glob.create(strGlob);
     *  // equivalent to:
     *  const glob = new Notation.Glob(strGlob);
     */

  }, {
    key: "glob",
    get: function get() {
      return this._.glob;
    }
    /**
     *  Gets the absolute glob notation without the negation prefix `!` and
     *  redundant trailing wildcards.
     *  @name Notation.Glob#absGlob
     *  @type {String}
     */

  }, {
    key: "absGlob",
    get: function get() {
      return this._.absGlob;
    }
    /**
     *  Specifies whether this glob is negated with a `!` prefix.
     *  @name Notation.Glob#isNegated
     *  @type {Boolean}
     */

  }, {
    key: "isNegated",
    get: function get() {
      return this._.isNegated;
    }
    /**
     *  Represents this glob in regular expressions.
     *  Note that the negation prefix (`!`) is ignored, if any.
     *  @name Notation.Glob#regexp
     *  @type {RegExp}
     */

  }, {
    key: "regexp",
    get: function get() {
      // setting on first call instead of in constructor, for performance
      // optimization.
      this._.regexp = this._.regexp || Glob.toRegExp(this.absGlob);
      return this._.regexp;
    }
    /**
     *  List of notes (levels) of this glob notation. Note that trailing,
     *  redundant wildcards are removed from the original glob notation.
     *  @name Notation.Glob#notes
     *  @alias Notation.Glob#levels
     *  @type {Array}
     */

  }, {
    key: "notes",
    get: function get() {
      return this._.notes;
    }
    /**
     *  Alias of `Notation.Glob#notes`.
     *  @private
     *  @name Notation.Glob#notes
     *  @alias Notation.Glob#levels
     *  @type {Array}
     */

  }, {
    key: "levels",
    get: function get() {
      return this._.notes;
    }
    /**
     *  Gets the first note of this glob notation.
     *  @name Notation.Glob#first
     *  @type {String}
     */

  }, {
    key: "first",
    get: function get() {
      return this.notes[0];
    }
    /**
     *  Gets the last note of this glob notation.
     *  @name Notation.Glob#last
     *  @type {String}
     */

  }, {
    key: "last",
    get: function get() {
      return this.notes[this.notes.length - 1];
    }
    /**
     *  Gets the parent notation (up to but excluding the last note) from the
     *  glob notation string. Note that initially, trailing/redundant wildcards
     *  are removed.
     *  @name Notation.Glob#parent
     *  @type {String}
     *
     *  @example
     *  const glob = Notation.Glob.create;
     *  glob('first.second.*').parent;   // "first.second"
     *  glob('*.x.*').parent;            // "*" ("*.x.*" normalizes to "*.x")
     *  glob('*').parent;                // null (no parent)
     */

  }, {
    key: "parent",
    get: function get() {
      // setting on first call instead of in constructor, for performance
      // optimization.
      if (this._.parent === undefined) {
        this._.parent = this.notes.length > 1 ? this.absGlob.slice(0, -this.last.length).replace(/\.$/, '') : null;
      }

      return this._.parent;
    }
  }], [{
    key: "create",
    value: function create(glob) {
      return new Glob(glob);
    } // Created test at: https://regex101.com/r/tJ7yI9/4

    /**
     *  Validates the given notation glob.
     *  @name Notation.Glob.isValid
     *  @function
     *
     *  @param {String} glob - Notation glob to be validated.
     *  @returns {Boolean} -
     */

  }, {
    key: "isValid",
    value: function isValid(glob) {
      return typeof glob === 'string' && reVALIDATOR.test(glob);
    }
    /**
     *  Specifies whether the given glob notation includes any valid wildcards
     *  (`*`) or negation bang prefix (`!`).
     *  @name Notation.Glob.hasMagic
     *  @function
     *
     *  @param {String} glob - Glob notation to be checked.
     *  @returns {Boolean} -
     */

  }, {
    key: "hasMagic",
    value: function hasMagic(glob) {
      return Glob.isValid(glob) && (re.WILDCARDS.test(glob) || glob[0] === '!');
    }
    /**
     *  Gets a regular expressions instance from the given glob notation.
     *  Note that the bang `!` prefix will be ignored if the given glob is negated.
     *  @name Notation.Glob.toRegExp
     *  @function
     *
     *  @param {String} glob - Glob notation to be converted.
     *
     *  @returns {RegExp} - A `RegExp` instance from the glob.
     *
     *  @throws {NotationError} - If given notation glob is invalid.
     */

  }, {
    key: "toRegExp",
    value: function toRegExp(glob) {
      if (!Glob.isValid(glob)) {
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"]("".concat(ERR_INVALID, " '").concat(glob, "'"));
      }

      var g = glob.indexOf('!') === 0 ? glob.slice(1) : glob;
      g = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].pregQuote(g) // `[*]` always represents array index e.g. `[1]`. so we'd replace
      // `\[\*\]` with `\[\d+\]` but we should also watch for quotes: e.g.
      // `["x[*]y"]`
      .replace(/\\\[\\\*\\\](?=(?:[^"]|"[^"]*")*$)(?=(?:[^']|'[^']*')*$)/g, '\\[\\d+\\]') // `*` within quotes (e.g. ['*']) is non-wildcard, just a regular star char.
      // `*` outside of quotes is always JS variable syntax e.g. `prop.*`
      .replace(/\\\*(?=(?:[^"]|"[^"]*")*$)(?=(?:[^']|'[^']*')*$)/g, '[a-z$_][a-z$_\\d]*').replace(/\\\?/g, '.');
      return new RegExp('^' + g + '(?:[\\[\\.].+|$)', 'i'); // it should either end ($) or continue with a dot or bracket. So for
      // example, `company.*` will produce `/^company\.[a-z$_][a-z$_\\d]*(?:[\\[|\\.].+|$)/`
      // which will match both `company.name` and `company.address.street` but
      // will not match `some.company.name`. Also `!password` will not match
      // `!password_reset`.
    }
    /**
     *  Specifies whether first glob notation can represent (or cover) the
     *  second.
     *  @name Notation.Glob._covers
     *  @function
     *  @private
     *
     *  @param {String|Object|Glob} globA  Source glob notation string
     *  or inspection result object or `Notation.Glob` instance.
     *  @param {String|Object|Glob} globB  Glob notation string or
     *  inspection result object or `Notation.Glob` instance.
     *  @param {Boolean} [match=false]  Check whether notes match instead of
     *  `globA` covers `globB`.
     *  @returns {Boolean} -
     *
     *  @example
     *  const { covers } = Notation.Glob;
     *  covers('*.y', 'x.y')        // true
     *  covers('x.y', '*.y')        // false
     *  covers('x.y', '*.y', true)  // true
     *  covers('x[*].y', 'x[*]')    // false
     */

  }, {
    key: "_covers",
    value: function _covers(globA, globB) {
      var match = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var a = typeof globA === 'string' ? new Glob(globA) : globA; // assume (globA instanceof Notation.Glob || utils.type(globA) === 'object')

      var b = typeof globB === 'string' ? new Glob(globB) : globB;
      var notesA = a.notes || Glob.split(a.absGlob);
      var notesB = b.notes || Glob.split(b.absGlob);

      if (!match) {
        // !x.*.* does not cover !x.* or x.* bec. !x.*.* ≠ x.* ≠ x
        // x.*.* covers x.* bec. x.*.* = x.* = x
        if (a.isNegated && notesA.length > notesB.length) return false;
      }

      var covers = true;
      var fn = match ? _matchesNote : _coversNote;

      for (var i = 0; i < notesA.length; i++) {
        if (!fn(notesA[i], notesB[i])) {
          covers = false;
          break;
        }
      }

      return covers;
    }
    /**
     *  Gets the intersection notation of two glob notations. When restrictive,
     *  if any one of them is negated, the outcome is negated. Otherwise, only
     *  if both of them are negated, the outcome is negated.
     *  @name Notation.Glob._intersect
     *  @function
     *  @private
     *
     *  @param {String} globA - First glob to be used.
     *  @param {String} globB - Second glob to be used.
     *  @param {Boolean} [restrictive=false] - Whether the intersection should
     *  be negated when one of the globs is negated.
     *  @returns {String} - Intersection notation if any; otherwise `null`.
     *  @example
     *  _intersect('!*.y', 'x.*', false)     // 'x.y'
     *  _intersect('!*.y', 'x.*', true)      // '!x.y'
     */

  }, {
    key: "_intersect",
    value: function _intersect(globA, globB) {
      var restrictive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // const bang = restrictive
      //     ? (globA[0] === '!' || globB[0] === '!' ? '!' : '')
      //     : (globA[0] === '!' && globB[0] === '!' ? '!' : '');
      var notesA = Glob.split(globA, true);
      var notesB = Glob.split(globB, true);
      var bang;

      if (restrictive) {
        bang = globA[0] === '!' || globB[0] === '!' ? '!' : '';
      } else {
        if (globA[0] === '!' && globB[0] === '!') {
          bang = '!';
        } else {
          bang = notesA.length > notesB.length && globA[0] === '!' || notesB.length > notesA.length && globB[0] === '!' ? '!' : '';
        }
      }

      var len = Math.max(notesA.length, notesB.length);
      var notesI = [];
      var a, b; //   x.*  ∩  *.y   »  x.y
      // x.*.*  ∩  *.y   »  x.y.*
      // x.*.z  ∩  *.y   »  x.y.z
      //   x.y  ∩  *.b   »  (n/a)
      //   x.y  ∩  a.*   »  (n/a)

      for (var i = 0; i < len; i++) {
        a = notesA[i];
        b = notesB[i];

        if (a === b) {
          notesI.push(a);
        } else if (a && re.WILDCARD.test(a)) {
          if (!b) {
            notesI.push(a);
          } else {
            notesI.push(b);
          }
        } else if (b && re.WILDCARD.test(b)) {
          if (!a) {
            notesI.push(b);
          } else {
            notesI.push(a);
          }
        } else if (a && !b) {
          notesI.push(a);
        } else if (!a && b) {
          notesI.push(b);
        } else {
          // if (a !== b) {
          notesI = [];
          break;
        }
      }

      if (notesI.length > 0) return bang + _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].joinNotes(notesI);
      return null;
    }
    /**
     *  Undocumented.
     *  @name Notation.Glob._inspect
     *  @function
     *  @private
     *
     *  @param {String} glob -
     *  @returns {Object} -
     */

  }, {
    key: "_inspect",
    value: function _inspect(glob) {
      var g = glob.trim();

      if (!Glob.isValid(g)) {
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"]("".concat(ERR_INVALID, " '").concat(glob, "'"));
      }

      var isNegated = g[0] === '!'; // trailing wildcards are only redundant if not negated

      if (!isNegated) g = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].removeTrailingWildcards(g);
      var absGlob = isNegated ? g.slice(1) : g;
      return {
        glob: g,
        absGlob: absGlob,
        isNegated: isNegated,
        // e.g. [*] or [1] are array globs. ["1"] is not.
        isArrayGlob: /^\[[^'"]/.test(absGlob)
      };
    }
    /**
     *  Splits the given glob notation string into its notes (levels). Note that
     *  this will exclude the `!` negation prefix, if it exists.
     *  @name Notation.Glob.split
     *  @function
     *
     *  @param {String} glob  Glob notation string to be splitted.
     *  @param {String} [normalize=false]  Whether to remove trailing, redundant
     *  wildcards.
     *  @returns {Array} - A string array of glob notes (levels).
     *  @throws {NotationError} - If given glob notation is invalid.
     *
     *  @example
     *  Notation.Glob.split('*.list[2].prop')  // ['*', 'list', '[2]', 'prop']
     *  // you can get the same result from the .notes property of a Notation.Glob instance.
     */

  }, {
    key: "split",
    value: function split(glob) {
      var normalize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!Glob.isValid(glob)) {
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"]("".concat(ERR_INVALID, " '").concat(glob, "'"));
      }

      var neg = glob[0] === '!'; // trailing wildcards are redundant only when not negated

      var g = !neg && normalize ? _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].removeTrailingWildcards(glob) : glob;
      return g.replace(/^!/, '').match(reMATCHER);
    }
    /**
     *  Compares two given notation globs and returns an integer value as a
     *  result. This is generally used to sort glob arrays. Loose globs (with
     *  stars especially closer to beginning of the glob string) and globs
     *  representing the parent/root of the compared property glob come first.
     *  Verbose/detailed/exact globs come last. (`* < *.abc < abc`).
     *
     *  For instance; `store.address` comes before `store.address.street`. So
     *  this works both for `*, store.address.street, !store.address` and `*,
     *  store.address, !store.address.street`. For cases such as `prop.id` vs
     *  `!prop.id` which represent the same property; the negated glob comes
     *  last.
     *  @name Notation.Glob.compare
     *  @function
     *
     *  @param {String} globA - First notation glob to be compared.
     *  @param {String} globB - Second notation glob to be compared.
     *
     *  @returns {Number} - Returns `-1` if `globA` comes first, `1` if `globB`
     *  comes first and `0` if equivalent priority.
     *
     *  @throws {NotationError} - If either `globA` or `globB` is invalid glob
     *  notation.
     *
     *  @example
     *  const { compare } = Notation.Glob;
     *  compare('*', 'info.user')               // -1
     *  compare('*', '[*]')                     // 0
     *  compare('info.*.name', 'info.user')     // 1
     */

  }, {
    key: "compare",
    value: function compare(globA, globB) {
      // trivial case, both are exactly the same!
      // or both are wildcard e.g. `*` or `[*]`
      if (globA === globB || re.WILDCARD.test(globA) && re.WILDCARD.test(globB)) return 0;
      var a = new Glob(globA);
      var b = new Glob(globB); // Check depth (number of levels)

      if (a.notes.length === b.notes.length) {
        // check and compare if these are globs that represent items in the
        // "same" array. if not, this will return 0.
        var aIdxCompare = _compareArrayItemGlobs(a, b); // we'll only continue comparing if 0 is returned


        if (aIdxCompare !== 0) return aIdxCompare; // count wildcards

        var wildCountA = (a.absGlob.match(re.WILDCARDS) || []).length;
        var wildCountB = (b.absGlob.match(re.WILDCARDS) || []).length;

        if (wildCountA === wildCountB) {
          // check for negation
          if (!a.isNegated && b.isNegated) return -1;
          if (a.isNegated && !b.isNegated) return 1; // both are negated or neither are, return alphabetical

          return a.absGlob < b.absGlob ? -1 : a.absGlob > b.absGlob ? 1 : 0;
        }

        return wildCountA > wildCountB ? -1 : 1;
      }

      return a.notes.length < b.notes.length ? -1 : 1;
    }
    /**
     *  Sorts the notation globs in the given array by their priorities. Loose
     *  globs (with stars especially closer to beginning of the glob string);
     *  globs representing the parent/root of the compared property glob come
     *  first. Verbose/detailed/exact globs come last. (`* < *.y < x.y`).
     *
     *  For instance; `store.address` comes before `store.address.street`. For
     *  cases such as `prop.id` vs `!prop.id` which represent the same property;
     *  the negated glob wins (comes last).
     *  @name Notation.Glob.sort
     *  @function
     *
     *  @param {Array} globList - The notation globs array to be sorted. The
     *  passed array reference is modified.
     *  @returns {Array} - Logically sorted globs array.
     *
     *  @example
     *  Notation.Glob.sort(['!prop.*.name', 'prop.*', 'prop.id']) // ['prop.*', 'prop.id', '!prop.*.name'];
     */

  }, {
    key: "sort",
    value: function sort(globList) {
      return globList.sort(Glob.compare);
    }
    /**
     *  Normalizes the given notation globs array by removing duplicate or
     *  redundant items, eliminating extra verbosity (also with intersection
     *  globs) and returns a priority-sorted globs array.
     *
     *  <ul>
     *  <li>If any exact duplicates found, all except first is removed.
     *  <br />example: `['car', 'dog', 'car']` normalizes to `['car', 'dog']`.</li>
     *  <li>If both normal and negated versions of a glob are found, negated wins.
     *  <br />example: `['*', 'id', '!id']` normalizes to `['*', '!id']`.</li>
     *  <li>If a glob is covered by another, it's removed.
     *  <br />example: `['car.*', 'car.model']` normalizes to `['car']`.</li>
     *  <li>If a negated glob is covered by another glob, it's kept.
     *  <br />example: `['*', 'car', '!car.model']` normalizes as is.</li>
     *  <li>If a negated glob is not covered by another or it does not cover any other;
     *  then we check for for intersection glob. If found, adds them to list;
     *  removes the original negated.
     *  <br />example: `['car.*', '!*.model']` normalizes as to `['car', '!car.model']`.</li>
     *  <li>In restrictive mode; if a glob is covered by another negated glob, it's removed.
     *  Otherwise, it's kept.
     *  <br />example: `['*', '!car.*', 'car.model']` normalizes to `['*', '!car']` if restrictive.</li>
     *  </ul>
     *  @name Notation.Glob.normalize
     *  @function
     *
     *  @param {Array} globList - Notation globs array to be normalized.
     *  @param {Boolean} [restrictive=false] - Whether negated items strictly
     *  remove every match. Note that, regardless of this option, if any item has an
     *  exact negated version; non-negated is always removed.
     *  @returns {Array} -
     *
     *  @throws {NotationError} - If any item in globs list is invalid.
     *
     *  @example
     *  const { normalize } = Notation.Glob;
     *  normalize(['*', '!id', 'name', '!car.model', 'car.*', 'id', 'name']); // ['*', '!id', '!car.model']
     *  normalize(['!*.id', 'user.*', 'company']); // ['company', 'user', '!company.id', '!user.id']
     *  normalize(['*', 'car.model', '!car.*']); // ["*", "!car.*", "car.model"]
     *  // restrictive normalize:
     *  normalize(['*', 'car.model', '!car.*'], true); // ["*", "!car.*"]
     */

  }, {
    key: "normalize",
    value: function normalize(globList) {
      var restrictive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _inspect = Glob._inspect,
          _covers = Glob._covers,
          _intersect = Glob._intersect;
      var original = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].ensureArray(globList);
      if (original.length === 0) return [];
      var list = original // prevent mutation
      .concat() // move negated globs to top so that we inspect non-negated globs
      // against others first. when complete, we'll sort with our
      // .compare() function.
      .sort(restrictive ? _negFirstSort : _negLastSort) // turning string array into inspect-obj array, so that we'll not
      // run _inspect multiple times in the inner loop. this also
      // pre-validates each glob.
      .map(_inspect); // early return if we have a single item

      if (list.length === 1) {
        var g = list[0]; // single negated item is redundant

        if (g.isNegated) return []; // return normalized

        return [g.glob];
      } // flag to return an empty array (in restrictive mode), if true.


      var negateAll = false; // we'll push keepers in this array

      var normalized = []; // we'll need to remember excluded globs, so that we can move to next
      // item early.

      var ignored = {}; // storage to keep intersections.
      // using an object to prevent duplicates.

      var intersections = {};

      var checkAddIntersection = function checkAddIntersection(gA, gB) {
        var inter = _intersect(gA, gB, restrictive);

        if (!inter) return; // if the intersection result has an inverted version in the
        // original list, don't add this.

        var hasInverted = restrictive ? false : original.indexOf(_invert(inter)) >= 0; // also if intersection result is in the current list, don't add it.

        if (list.indexOf(inter) >= 0 || hasInverted) return;
        intersections[inter] = inter;
      }; // iterate each glob by comparing it to remaining globs.


      _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].eachRight(list, function (a, indexA) {
        // if `strict` is enabled, return empty if a negate-all is found
        // (which itself is also redundant if single): '!*' or '![*]'
        if (re.NEGATE_ALL.test(a.glob)) {
          negateAll = true;
          if (restrictive) return false;
        } // flags


        var duplicate = false;
        var hasExactNeg = false; // flags for negated

        var negCoversPos = false;
        var negCoveredByPos = false;
        var negCoveredByNeg = false; // flags for non-negated (positive)

        var posCoversPos = false;
        var posCoveredByNeg = false;
        var posCoveredByPos = false;
        _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].eachRight(list, function (b, indexB) {
          // don't inspect glob with itself
          if (indexA === indexB) return; // move to next
          // console.log(indexA, a.glob, 'vs', b.glob);

          if (a.isArrayGlob !== b.isArrayGlob) {
            throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"]("Integrity failed. Cannot have both object and array notations for root level: ".concat(JSON.stringify(original)));
          } // remove if duplicate


          if (a.glob === b.glob) {
            list.splice(indexA, 1);
            duplicate = true;
            return false; // break out
          } // remove if positive has an exact negated (negated wins when
          // normalized) e.g. ['*', 'a', '!a'] => ['*', '!a']


          if (!a.isNegated && _isReverseOf(a, b)) {
            // list.splice(indexA, 1);
            ignored[a.glob] = true;
            hasExactNeg = true;
            return false; // break out
          } // if already excluded b, go on to next


          if (ignored[b.glob]) return; // next

          var coversB = _covers(a, b);

          var coveredByB = coversB ? false : _covers(b, a);

          if (a.isNegated) {
            if (b.isNegated) {
              // if negated (a) covered by any other negated (b); remove (a)!
              if (coveredByB) {
                negCoveredByNeg = true; // list.splice(indexA, 1);

                ignored[a.glob] = true;
                return false; // break out
              }
            } else {
              /* istanbul ignore if */
              if (coversB) negCoversPos = true;
              if (coveredByB) negCoveredByPos = true; // try intersection if none covers the other and only
              // one of them is negated.

              if (!coversB && !coveredByB) {
                checkAddIntersection(a.glob, b.glob);
              }
            }
          } else {
            if (b.isNegated) {
              // if positive (a) covered by any negated (b); remove (a)!
              if (coveredByB) {
                posCoveredByNeg = true;

                if (restrictive) {
                  // list.splice(indexA, 1);
                  ignored[a.glob] = true;
                  return false; // break out
                }

                return; // next
              } // try intersection if none covers the other and only
              // one of them is negated.


              if (!coversB && !coveredByB) {
                checkAddIntersection(a.glob, b.glob);
              }
            } else {
              if (coversB) posCoversPos = coversB; // if positive (a) covered by any other positive (b); remove (a)!

              if (coveredByB) {
                posCoveredByPos = true;

                if (restrictive) {
                  // list.splice(indexA, 1);
                  return false; // break out
                }
              }
            }
          }
        }); // const keepNeg = (negCoversPos || negCoveredByPos) && !negCoveredByNeg;

        var keepNeg = restrictive ? (negCoversPos || negCoveredByPos) && negCoveredByNeg === false : negCoveredByPos && negCoveredByNeg === false;
        var keepPos = restrictive ? (posCoversPos || posCoveredByPos === false) && posCoveredByNeg === false : posCoveredByNeg || posCoveredByPos === false;
        var keep = duplicate === false && hasExactNeg === false && (a.isNegated ? keepNeg : keepPos);

        if (keep) {
          normalized.push(a.glob);
        } else {
          // this is excluded from final (normalized) list, so mark as
          // ignored (don't remove from "list" for now)
          ignored[a.glob] = true;
        }
      });
      if (restrictive && negateAll) return [];
      intersections = Object.keys(intersections);

      if (intersections.length > 0) {
        // merge normalized list with intersections if any
        normalized = normalized.concat(intersections); // we have new (intersection) items, so re-normalize

        return Glob.normalize(normalized, restrictive);
      }

      return Glob.sort(normalized);
    }
    /**
     *  Undocumented. See `.union()`
     *  @name Notation.Glob._compareUnion
     *  @function
     *  @private
     *
     *  @param {Array} globsListA -
     *  @param {Array} globsListB -
     *  @param {Boolean} restrictive -
     *  @param {Array} union -
     *  @returns {Array} -
     */

  }, {
    key: "_compareUnion",
    value: function _compareUnion(globsListA, globsListB, restrictive) {
      var union = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var _covers = Glob._covers;
      var _inspect = Glob._inspect,
          _intersect = Glob._intersect;
      _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].eachRight(globsListA, function (globA) {
        if (union.indexOf(globA) >= 0) return; // next

        var a = _inspect(globA); // if wildcard only, add...


        if (re.WILDCARD.test(a.absGlob)) {
          union.push(a.glob); // push normalized glob

          return; // next
        }

        var notCovered = false;
        var hasExact = false;
        var negCoversNeg = false;
        var posCoversNeg = false;
        var posCoversPos = false;
        var negCoversPos = false;
        var intersections = [];
        _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].eachRight(globsListB, function (globB) {
          // keep if has exact in the other
          if (globA === globB) hasExact = true;

          var b = _inspect(globB); // keep negated if:
          //    1) any negated covers it
          //    2) no positive covers it
          // keep positive if:
          //    1) no positive covers it OR any negated covers it


          notCovered = !_covers(b, a);

          if (notCovered) {
            if (a.isNegated && b.isNegated) {
              var inter = _intersect(a.glob, b.glob, restrictive);

              if (inter && union.indexOf(inter) === -1) intersections.push(inter);
            }

            return; // next
          }

          if (a.isNegated) {
            if (b.isNegated) {
              negCoversNeg = !hasExact;
            } else {
              posCoversNeg = true; // set flag
            }
          } else {
            if (!b.isNegated) {
              posCoversPos = !hasExact;
            } else {
              negCoversPos = true; // set flag
            }
          }
        });
        var keep = a.isNegated ? !posCoversNeg || negCoversNeg : !posCoversPos || negCoversPos;

        if (hasExact || keep || notCovered && !a.isNegated) {
          union.push(a.glob); // push normalized glob

          return;
        }

        if (a.isNegated && posCoversNeg && !negCoversNeg && intersections.length > 0) {
          union = union.concat(intersections);
        }
      });
      return union;
    }
    /**
     *  Gets the union from the given couple of glob arrays and returns a new
     *  array of globs.
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
     *  <br />example #1: `['!user.id'] ∪ ['user.*']` unites to `['user']`
     *  <br />example #2: `['*'] ∪ ['!password']` unites to `['*']`
     *  </li>
     *  </ul>
     *  @name Notation.Glob.union
     *  @function
     *
     *  @param {Array} globsA - First array of glob strings.
     *  @param {Array} globsB - Second array of glob strings.
     *  @param {Boolean} [restrictive=false] - Whether negated items in each of
     *  the lists, strictly remove every match in themselves (not the cross
     *  list). This option is used when pre-normalizing each glob list and
     *  normalizing the final union list.
     *
     *  @returns {Array} -
     *
     *  @example
     *  const a = ['user.*', '!user.email', 'car.model', '!*.id'];
     *  const b = ['!*.date', 'user.email', 'car', '*.age'];
     *  const { union } = Notation.Glob;
     *  union(a, b)     // ['car', 'user', '*.age', '!car.date', '!user.id']
     */

  }, {
    key: "union",
    value: function union(globsA, globsB, restrictive) {
      var normalize = Glob.normalize,
          _compareUnion = Glob._compareUnion;
      var listA = normalize(globsA, restrictive);
      var listB = normalize(globsB, restrictive);
      if (listA.length === 0) return listB;
      if (listB.length === 0) return listA; // TODO: below should be optimized

      var union = _compareUnion(listA, listB, restrictive);

      union = _compareUnion(listB, listA, restrictive, union);
      return normalize(union, restrictive);
    }
  }]);

  return Glob;
}(); // --------------------------------
// HELPERS
// --------------------------------
// used by static _covers


function _coversNote(a, b) {
  if (!a || !b) return false; // glob e.g.: [2] does not cover [2][1]

  var bIsArr = re.ARRAY_GLOB_NOTE.test(b); // obj-wildcard a will cover b if not array

  if (a === '*') return !bIsArr; // arr-wildcard a will cover b if array

  if (a === '[*]') return bIsArr; // seems, a is not wildcard so,
  // if b is wildcard (obj or arr) won't be covered

  if (re.WILDCARD.test(b)) return false; // normalize both and check for equality
  // e.g. x.y and x['y'] are the same

  return _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeNote(a) === _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeNote(b);
} // function _coversNote(a, b) {
//     if (!a || !b) return false; // glob e.g.: [2] does not cover [2][1]
//     a = utils.normalizeNote(a, true);
//     b = utils.normalizeNote(b, true);
//     if (a === b) return true;
//     const bIsArr = re.ARRAY_GLOB_NOTE.test(b);
//     return (a === '*' && !bIsArr) || (a === '[*]' && bIsArr);
// }
// used by static _covers


function _matchesNote(a, b) {
  if (!a || !b) return true; // glob e.g.: [2][1] matches [2] and vice-versa.

  return _coversNote(a, b) || _coversNote(b, a);
} // used by _compareArrayItemGlobs() for getting a numeric index from array note.
// we'll use these indexes to sort higher to lower, as removing order; to
// prevent shifted indexes.


function _idxVal(note) {
  // we return -1 for wildcard bec. we need it to come last
  // below will never execute when called from _compareArrayItemGlobs

  /* istanbul ignore next */
  // if (note === '[*]') return -1;
  // e.g. '[2]' » 2
  return parseInt(note.replace(/[[\]]/, ''), 10);
}

function _compArrIdx(lastA, lastB) {
  var iA = _idxVal(lastA);

  var iB = _idxVal(lastB); // below will never execute when called from _compareArrayItemGlobs

  /* istanbul ignore next */
  // if (iA === iB) return 0;


  return iA > iB ? -1 : 1;
} // when we remove items from an array (via e.g. filtering), we first need to
// remove the item with the greater index so indexes of other items (that are to
// be removed from the same array) do not shift. so below is for comparing 2
// globs if they represent 2 items from the same array.
// example items from same array: ![*][2] ![0][*] ![0][1] ![0][3]
// should be sorted as ![0][3] ![*][2] ![0][1] ![0][*]


function _compareArrayItemGlobs(a, b) {
  var reANote = re.ARRAY_GLOB_NOTE; // both should be negated

  if (!a.isNegated || !b.isNegated // should be same length (since we're comparing for items in same
  // array)
  || a.notes.length !== b.notes.length // last notes should be array brackets
  || !reANote.test(a.last) || !reANote.test(b.last) // last notes should be different to compare
  || a.last === b.last) return 0; // negated !..[*] should come last

  if (a.last === '[*]') return 1; // b is first

  if (b.last === '[*]') return -1; // a is first

  if (a.parent && b.parent) {
    var _covers = Glob._covers;

    if (_covers(a.parent, b.parent, true)) {
      return _compArrIdx(a.last, b.last);
    }

    return 0;
  }

  return _compArrIdx(a.last, b.last);
} // x vs !x.*.*      » false
// x vs !x[*]       » true
// x[*] vs !x       » true
// x[*] vs !x[*]    » false
// x.* vs !x.*      » false


function _isReverseOf(a, b) {
  return a.isNegated !== b.isNegated && a.absGlob === b.absGlob;
}

function _invert(glob) {
  return glob[0] === '!' ? glob.slice(1) : '!' + glob;
}

var _rx = /^\s*!/;

function _negFirstSort(a, b) {
  return _rx.test(a) ? -1 : _rx.test(b) ? 1 : 0;
}

function _negLastSort(a, b) {
  return _rx.test(a) ? 1 : _rx.test(b) ? -1 : 0;
} // --------------------------------
// EXPORT
// --------------------------------




/***/ }),

/***/ "./src/core/notation.js":
/*!******************************!*\
  !*** ./src/core/notation.js ***!
  \******************************/
/*! exports provided: Notation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notation", function() { return Notation; });
/* harmony import */ var _notation_glob__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notation.glob */ "./src/core/notation.glob.js");
/* harmony import */ var _notation_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notation.error */ "./src/core/notation.error.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint no-use-before-define:0, consistent-return:0, max-statements:0 */



var ERR = {
  SOURCE: 'Invalid source. Expected a data object or array.',
  DEST: 'Invalid destination. Expected a data object or array.',
  NOTATION: 'Invalid notation: ',
  NOTA_OBJ: 'Invalid notations object. ',
  NO_INDEX: 'Implied index does not exist: ',
  NO_PROP: 'Implied property does not exist: '
}; // created test @ https://regex101.com/r/vLE16M/2

var reMATCHER = /(\[(\d+|".*"|'.*'|`.*`)\]|[a-z$_][a-z$_\d]*)/gi; // created test @ https://regex101.com/r/fL3PJt/1/
// /^([a-z$_][a-z$_\d]*|\[(\d+|".*"|'.*'|`.*`)\])(\[(\d+|".*"|'.*'|`.*`)\]|(\.[a-z$_][a-z$_\d]*))*$/i

var reVALIDATOR = new RegExp('^(' + '[a-z$_][a-z$_\\d]*' // JS variable syntax
+ '|' // OR
+ '\\[(\\d+|".*"|\'.*\')\\]' // array index or object bracket notation
+ ')' // exactly once
+ '(' + '\\[(\\d+|".*"|\'.*\')\\]' // followed by same
+ '|' // OR
+ '\\.[a-z$_][a-z$_\\d]*' // dot, then JS variable syntax
+ ')*' // (both) may repeat any number of times
+ '$', 'i');
var DEFAULT_OPTS = Object.freeze({
  strict: false,
  preserveIndices: false
});
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

var Notation = /*#__PURE__*/function () {
  /**
   *  Initializes a new instance of `Notation`.
   *
   *  @param {Object|Array} [source={}] - The source object (or array) to be
   *  notated. Can either be an array or object. If omitted, defaults to an
   *  empty object.
   *  @param {Object} [options] - Notation options.
   *      @param {Boolean} [options.strict=false] - Whether to throw either when
   *      a notation path does not exist on the source (i.e. `#get()` and `#remove()`
   *      methods); or notation path exists but overwriting is disabled (i.e.
   *      `#set()` method). (Note that `.inspectGet()` and `.inspectRemove()` methods
   *      are exceptions). It's recommended to set this to `true` and prevent silent
   *      failures if you're working with sensitive data. Regardless of `strict` option,
   *      it will always throw on invalid notation syntax or other crucial failures.
   *
   *  @example
   *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
   *  const notation = new Notation(obj);
   *  notation.get('car.model')   // » "Charger"
   *  notation.remove('car.model').set('car.color', 'red').value
   *  // » { car: { brand: "Dodge", year: 1970, color: "red" } }
   */
  function Notation(source, options) {
    _classCallCheck(this, Notation);

    if (arguments.length === 0) {
      this._source = {};
    } else if (!_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isCollection(source)) {
      throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](ERR.SOURCE);
    } else {
      this._source = source;
    }

    this._isArray = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(this._source) === 'array';
    this.options = options;
  } // --------------------------------
  // INSTANCE PROPERTIES
  // --------------------------------

  /**
   *  Gets or sets notation options.
   *  @type {Object}
   */


  _createClass(Notation, [{
    key: "each",
    // --------------------------------
    // INSTANCE METHODS
    // --------------------------------

    /**
     *  Recursively iterates through each key of the source object and invokes
     *  the given callback function with parameters, on each non-object value.
     *
     *  @param {Function} callback - The callback function to be invoked on
     *  each on each non-object value. To break out of the loop, return `false`
     *  from within the callback.
     *  Callback signature: `callback(notation, key, value, object) { ... }`
     *
     *  @returns {Notation} - The current `Notation` instance (self).
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
      _each(this._source, callback);

      return this;
    }
    /**
     *  Iterates through each note of the given notation string by evaluating
     *  it on the source object.
     *
     *  @param {String} notation - The notation string to be iterated through.
     *  @param {Function} callback - The callback function to be invoked on
     *  each iteration. To break out of the loop, return `false` from within
     *  the callback. Signature: `callback(levelValue, note, index, list)`
     *
     *  @returns {Notation} - The current `Notation` instance (self).
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
     *  Notation.create(obj)
     *      .eachValue("car.brand", function (levelValue, note, index, list) {
     *          console.log(note, levelValue); // "car.brand" "Dodge"
     *      });
     */

  }, {
    key: "eachValue",
    value: function eachValue(notation, callback) {
      var level = this._source;
      Notation.eachNote(notation, function (levelNotation, note, index, list) {
        level = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].hasOwn(level, note) ? level[note] : undefined;
        if (callback(level, levelNotation, note, index, list) === false) return false;
      });
      return this;
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
    key: "getNotations",
    value: function getNotations() {
      var list = [];
      this.each(function (notation) {
        list.push(notation);
      });
      return list;
    }
    /**
     *  Deeply clones the source object. This is also useful if you want to
     *  prevent mutating the original source object.
     *
     *  <blockquote>
     *  Note that `Notation` expects a data object (or array) with enumerable
     *  properties. In addition to plain objects and arrays; supported cloneable
     *  property/value types are primitives (such as `String`, `Number`,
     *  `Boolean`, `Symbol`, `null` and `undefined`) and built-in types (such as
     *  `Date` and `RegExp`).
     *
     *  Enumerable properties with types other than these (such as methods,
     *  special objects, custom class instances, etc) will be copied by reference.
     *  Non-enumerable properties will not be cloned.
     *
     *  If you still need full clone support, you can use a library like lodash.
     *  e.g. `Notation.create(_.cloneDeep(source))`
     *  </blockquote>
     *
     *  @returns {Notation} - The current `Notation` instance (self).
     *
     *  @example
     *  const mutated = Notation.create(source1).set('newProp', true).value;
     *  console.log(source1.newProp); // ——» true
     *
     *  const cloned = Notation.create(source2).clone().set('newProp', true).value;
     *  console.log('newProp' in source2); // ——» false
     *  console.log(cloned.newProp); // ——» true
     */

  }, {
    key: "clone",
    value: function clone() {
      this._source = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].cloneDeep(this._source);
      return this;
    }
    /**
     *  Flattens the source object to a single-level object with notated keys.
     *
     *  @returns {Notation} - The current `Notation` instance (self).
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
     *  console.log(Notation.create(obj).flatten().value);
     *  // {
     *  //     "car.brand": "Dodge",
     *  //     "car.model": "Charger",
     *  //     "car.year": 1970
     *  // }
     */

  }, {
    key: "flatten",
    value: function flatten() {
      var o = {};
      this.each(function (notation, key, value) {
        o[notation] = value;
      });
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
     *  @returns {Notation} - The current `Notation` instance (self).
     *
     *  @example
     *  const obj = { "car.brand": "Dodge", "car.model": "Charger", "car.year": 1970 }
     *  const expanded = Notation.create(obj).expand().value;
     *  console.log(expanded); // { car: { brand: "Dodge", model: "Charger", year: 1970 } };
     */

  }, {
    key: "expand",
    value: function expand() {
      this._source = Notation.create({}).merge(this._source).value;
      return this;
    }
    /**
     *  Alias for `#expand`
     *  @private
     *  @returns {Notation} -
     */

  }, {
    key: "aggregate",
    value: function aggregate() {
      return this.expand();
    }
    /**
     *  Inspects the given notation on the source object by checking
     *  if the source object actually has the notated property;
     *  and getting its value if exists.
     *  @param {String} notation - The notation string to be inspected.
     *  @returns {InspectResult} - The result object.
     *
     *  @example
     *  Notation.create({ car: { year: 1970 } }).inspectGet("car.year");
     *  // { has: true, value: 1970, lastNote: 'year', lastNoteNormalized: 'year' }
     *  Notation.create({ car: { year: 1970 } }).inspectGet("car.color");
     *  // { has: false }
     *  Notation.create({ car: { color: undefined } }).inspectGet("car.color");
     *  // { has: true, value: undefined, lastNote: 'color', lastNoteNormalized: 'color' }
     *  Notation.create({ car: { brands: ['Ford', 'Dodge'] } }).inspectGet("car.brands[1]");
     *  // { has: true, value: 'Dodge', lastNote: '[1]', lastNoteNormalized: 1 }
     */

  }, {
    key: "inspectGet",
    value: function inspectGet(notation) {
      var level = this._source;
      var result = {
        has: false,
        value: undefined
      };
      var parent;
      Notation.eachNote(notation, function (levelNotation, note, index) {
        var lastNoteNormalized = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeNote(note);

        if (_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].hasOwn(level, lastNoteNormalized)) {
          level = level[lastNoteNormalized];
          parent = level;
          result = {
            notation: notation,
            has: true,
            value: level,
            type: _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(level),
            level: index + 1,
            lastNote: note,
            lastNoteNormalized: lastNoteNormalized
          };
        } else {
          // level = undefined;
          result = {
            notation: notation,
            has: false,
            type: 'undefined',
            level: index + 1,
            lastNote: note,
            lastNoteNormalized: lastNoteNormalized
          };
          return false; // break out
        }
      });
      if (parent === undefined || result.has && parent === result.value) parent = this._source;
      result.parentIsArray = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(parent) === 'array';
      return result;
    }
    /**
     *  Notation inspection result object.
     *  @typedef Notation~InspectResult
     *  @type Object
     *  @property {String} notation - Notation that is inspected.
     *  @property {Boolean} has - Indicates whether the source object has the
     *  given notation as a (leveled) enumerable property. If the property
     *  exists but has a value of `undefined`, this will still return `true`.
     *  @property {*} value - The value of the notated property. If the source
     *  object does not have the notation, the value will be `undefined`.
     *  @property {String} type - The type of the notated property. If the source
     *  object does not have the notation, the type will be `"undefined"`.
     *  @property {String} lastNote - Last note of the notation, if actually
     *  exists. For example, last note of `'a.b.c'` is `'c'`.
     *  @property {String|Number} lastNoteNormalized - Normalized representation
     *  of the last note of the notation, if actually exists. For example, last
     *  note of `'a.b[1]` is `'[1]'` and will be normalized to number `1`; which
     *  indicates an array index.
     *  @property {Boolean} parentIsArray - Whether the parent object of the
     *  notation path is an array.
     */

    /**
     *  Inspects and removes the given notation from the source object by
     *  checking if the source object actually has the notated property; and
     *  getting its value if exists, before removing the property.
     *
     *  @param {String} notation - The notation string to be inspected.
     *
     *  @returns {InspectResult} - The result object.
     *
     *  @example
     *  const obj = { name: "John", car: { year: 1970 } };
     *  let result = Notation.create(obj).inspectRemove("car.year");
     *  // result » { notation: "car.year", has: true, value: 1970, lastNote: "year", lastNoteNormalized: "year" }
     *  // obj » { name: "John", car: {} }
     *
     *  result = Notation.create({ car: { year: 1970 } }).inspectRemove("car.color");
     *  // result » { notation: "car.color", has: false }
     *  Notation.create({ car: { color: undefined } }).inspectRemove("car['color']");
     *  // { notation: "car.color", has: true, value: undefined, lastNote: "['color']", lastNoteNormalized: "color" }
     *
     *  const obj = { car: { colors: ["black", "white"] } };
     *  const result = Notation.create().inspectRemove("car.colors[0]");
     *  // result » { notation: "car.colors[0]", has: true, value: "black", lastNote: "[0]", lastNoteNormalized: 0 }
     *  // obj » { car: { colors: [(empty), "white"] } }
     */

  }, {
    key: "inspectRemove",
    value: function inspectRemove(notation) {
      if (!notation) throw new Error(ERR.NOTATION + "'".concat(notation, "'"));
      var parentNotation = Notation.parent(notation);
      var parent = parentNotation ? this.get(parentNotation, null) : this._source;
      var parentIsArray = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(parent) === 'array';
      var notes = Notation.split(notation);
      var lastNote = notes[notes.length - 1];
      var lastNoteNormalized = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeNote(lastNote);
      var result, value;

      if (_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].hasOwn(parent, lastNoteNormalized)) {
        value = parent[lastNoteNormalized];
        result = {
          notation: notation,
          has: true,
          value: value,
          type: _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(value),
          level: notes.length,
          lastNote: lastNote,
          lastNoteNormalized: lastNoteNormalized,
          parentIsArray: parentIsArray
        }; // if `preserveIndices` is enabled and this is an array, we'll
        // splice the item out. otherwise, we'll use `delete` syntax to
        // empty the item.

        if (!this.options.preserveIndices && parentIsArray) {
          parent.splice(lastNoteNormalized, 1);
        } else {
          delete parent[lastNoteNormalized];
        }
      } else {
        result = {
          notation: notation,
          has: false,
          type: 'undefined',
          level: notes.length,
          lastNote: lastNote,
          lastNoteNormalized: lastNoteNormalized,
          parentIsArray: parentIsArray
        };
      }

      return result;
    }
    /**
     *  Checks whether the source object has the given notation
     *  as a (leveled) enumerable property. If the property exists
     *  but has a value of `undefined`, this will still return `true`.
     *  @param {String} notation - The notation string to be checked.
     *  @returns {Boolean} -
     *
     *  @example
     *  Notation.create({ car: { year: 1970 } }).has("car.year"); // true
     *  Notation.create({ car: { year: undefined } }).has("car.year"); // true
     *  Notation.create({}).has("car.color"); // false
     */

  }, {
    key: "has",
    value: function has(notation) {
      return this.inspectGet(notation).has;
    }
    /**
     *  Checks whether the source object has the given notation
     *  as a (leveled) defined enumerable property. If the property
     *  exists but has a value of `undefined`, this will return `false`.
     *  @param {String} notation - The notation string to be checked.
     *  @returns {Boolean} -
     *
     *  @example
     *  Notation.create({ car: { year: 1970 } }).hasDefined("car.year"); // true
     *  Notation.create({ car: { year: undefined } }).hasDefined("car.year"); // false
     *  Notation.create({}).hasDefined("car.color"); // false
     */

  }, {
    key: "hasDefined",
    value: function hasDefined(notation) {
      return this.inspectGet(notation).value !== undefined;
    }
    /**
     *  Gets the value of the corresponding property at the given notation.
     *
     *  @param {String} notation - The notation string to be processed.
     *  @param {String} [defaultValue] - The default value to be returned if the
     *  property is not found or enumerable.
     *
     *  @returns {*} - The value of the notated property.
     *  @throws {NotationError} - If `strict` option is enabled, `defaultValue`
     *  is not set and notation does not exist.
     *
     *  @example
     *  Notation.create({ car: { brand: "Dodge" } }).get("car.brand"); // "Dodge"
     *  Notation.create({ car: {} }).get("car.model", "Challenger"); // "Challenger"
     *  Notation.create({ car: { model: undefined } }).get("car.model", "Challenger"); // undefined
     *
     *  @example <caption>get value when strict option is enabled</caption>
     *  // strict option defaults to false
     *  Notation.create({ car: {} }).get("car.model"); // undefined
     *  Notation.create({ car: {} }, { strict: false }).get("car.model"); // undefined
     *  // below will throw bec. strict = true, car.model does not exist
     *  // and no default value is given.
     *  Notation.create({ car: {} }, { strict: true }).get("car.model");
     */

  }, {
    key: "get",
    value: function get(notation, defaultValue) {
      var result = this.inspectGet(notation); // if strict and no default value is set, check if implied index or prop
      // exists

      if (this.options.strict && arguments.length < 2 && !result.has) {
        var msg = result.parentIsArray ? ERR.NO_INDEX : ERR.NO_PROP;
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](msg + "'".concat(notation, "'"));
      }

      return result.has ? result.value : defaultValue;
    }
    /**
     *  Sets the value of the corresponding property at the given notation. If
     *  the property does not exist, it will be created and nested at the
     *  calculated level. If it exists; its value will be overwritten by
     *  default.
     *  @chainable
     *
     *  @param {String} notation - The notation string to be processed.
     *  @param {*} value - The value to be set for the notated property.
     *  @param {String|Boolean} [mode="overwrite"] - Write mode. By default,
     *  this is set to `"overwrite"` which sets the value by overwriting the
     *  target object property or array item at index. To insert an array item
     *  (by shifting the index, instead of overwriting); set to `"insert"`. To
     *  prevent overwriting the value if exists, explicitly set to `false`.
     *
     *  @returns {Notation} - The current `Notation` instance (self).
     *
     *  @throws {NotationError} - If strict notation is enabled, `overwrite`
     *  option is set to `false` and attempted to overwrite an existing value.
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
    key: "set",
    value: function set(notation, value) {
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'overwrite';
      if (!notation.trim()) throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](ERR.NOTATION + "'".concat(notation, "'"));
      if (mode === true) mode = 'overwrite';
      var level = this._source;
      var currentIsLast, nCurrentNote, nNextNote, nextIsArrayNote, type;
      var insertErrMsg = 'Cannot set value by inserting at index, on an object';
      Notation.eachNote(notation, function (levelNotation, note, index, list) {
        currentIsLast = index === list.length - 1;
        nCurrentNote = nNextNote || _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeNote(note);
        nNextNote = currentIsLast ? null : _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeNote(list[index + 1]);
        type = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(level);

        if (type === 'array' && typeof nCurrentNote !== 'number') {
          var parent = Notation.parent(levelNotation) || 'source';
          throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"]("Cannot set string key '".concat(note, "' on array ").concat(parent));
        } // check if the property is at this level


        if (_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].hasOwn(level, nCurrentNote, type)) {
          // check if we're at the last level
          if (currentIsLast) {
            // if mode is "overwrite", assign the value.
            if (mode === 'overwrite') {
              level[nCurrentNote] = value;
            } else if (mode === 'insert') {
              if (type === 'array') {
                level.splice(nCurrentNote, 0, value);
              } else {
                throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](insertErrMsg);
              }
            } // otherwise, will not overwrite

          } else {
            // if not last level; just re-reference the current level.
            level = level[nCurrentNote];
          }
        } else {
          if (currentIsLast && type !== 'array' && mode === 'insert') {
            throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](insertErrMsg);
          } // if next normalized note is a number, it indicates that the
          // current note is actually an array.


          nextIsArrayNote = typeof nNextNote === 'number'; // we don't have this property at this level so; if this is the
          // last level, we set the value if not, we set an empty
          // collection for the next level

          level[nCurrentNote] = currentIsLast ? value : nextIsArrayNote ? [] : {};
          level = level[nCurrentNote];
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
     *  @returns {Notation} - The current `Notation` instance (self).
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
    key: "merge",
    value: function merge(notationsObject) {
      var _this = this;

      var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(notationsObject) !== 'object') {
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](ERR.NOTA_OBJ + 'Expected an object.');
      }

      var value;
      _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].each(Object.keys(notationsObject), function (notation) {
        value = notationsObject[notation];

        _this.set(notation, value, overwrite);
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
    key: "separate",
    value: function separate(notations) {
      var _this2 = this;

      if (_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(notations) !== 'array') {
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](ERR.NOTA_OBJ + 'Expected an array.');
      }

      var o = new Notation({});
      _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].each(notations, function (notation) {
        var result = _this2.inspectRemove(notation);

        o.set(notation, result.value);
      });
      this._source = o._source;
      return this;
    }
    /**
     *  Deep clones the source object while filtering its properties by the
     *  given <b>glob</b> notations. Includes all matched properties and removes
     *  the rest.
     *
     *  The difference between regular notations and glob-notations is that;
     *  with the latter, you can use wildcard stars (*) and negate the notation
     *  by prepending a bang (!). A negated notation will be excluded.
     *
     *  Order of the globs does not matter; they will be logically sorted. Loose
     *  globs will be processed first and verbose globs or normal notations will
     *  be processed last. e.g. `[ "car.model", "*", "!car.*" ]` will be
     *  normalized and sorted as `[ "*", "!car" ]`.
     *
     *  Passing no parameters or passing a glob of `"!*"` or `["!*"]` will empty
     *  the source object. See `Notation.Glob` class for more information.
     *  @chainable
     *
     *  @param {Array|String} globList - Glob notation list to be processed.
     *  @param {Object} [options] - Filter options.
     *  @param {Boolean} [options.restrictive=false] - Whether negated items
     *  strictly remove every match. Note that, regardless of this option, if
     *  any item has an exact negated version; non-negated is always removed.
     *
     *  @returns {Notation} - The current `Notation` instance (self). To get the
     *  filtered value, call `.value` property on the instance.
     *
     *  @example
     *  const car = { brand: "Ford", model: { name: "Mustang", year: 1970 } };
     *  const n = Notation.create(car);
     *
     *  console.log(n.filter([ "*", "!model.year" ]).value);  // { brand: "Ford", model: { name: "Mustang" } }
     *  console.log(n.filter("model.name").value);            // { model: { name: "Mustang" } }
     *  console.log(car);                                     // { brand: "Ford", model: { name: "Mustang", year: 1970 } }
     *  console.log(n.filter().value);                        // {} // —» equivalent to n.filter("") or n.filter("!*")
     */

  }, {
    key: "filter",
    value: function filter(globList) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var re = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].re; // ensure array, normalize and sort the globs in logical order. this
      // also concats the array first (to prevent mutating the original
      // array).

      var globs = _notation_glob__WEBPACK_IMPORTED_MODULE_0__["Glob"].normalize(globList, options.restrictive);
      var len = globs.length;
      var empty = this._isArray ? [] : {}; // if globs is "" or [""] or ["!*"] or ["![*]"] set source to empty and return.

      if (len === 0 || len === 1 && (!globs[0] || re.NEGATE_ALL.test(globs[0]))) {
        this._source = empty;
        return this;
      }

      var cloned = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].cloneDeep(this.value);
      var firstIsWildcard = re.WILDCARD.test(globs[0]); // if globs only consist of "*" or "[*]"; set the "clone" as source and
      // return.

      if (len === 1 && firstIsWildcard) {
        this._source = cloned;
        return this;
      }

      var filtered; // if the first item of sorted globs is "*" or "[*]" we set the source
      // to the (full) "copy" and remove the wildcard from globs (not to
      // re-process).

      if (firstIsWildcard) {
        filtered = new Notation(cloned);
        globs.shift();
      } else {
        // otherwise we set an empty object or array as the source so that
        // we can add notations/properties to it.
        filtered = new Notation(empty);
      } // iterate through globs


      _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].each(globs, function (globNotation) {
        // console.log('globNotation', globNotation);
        var g = new _notation_glob__WEBPACK_IMPORTED_MODULE_0__["Glob"](globNotation);
        var glob = g.glob,
            absGlob = g.absGlob,
            isNegated = g.isNegated,
            levels = g.levels;
        var normalized, emptyValue, eType; // check whether the glob ends with `.*` or `[*]` then remove
        // trailing glob note and decide for empty value (if negated). for
        // non-negated, trailing wildcards are already removed by
        // normalization.

        if (absGlob.slice(-2) === '.*') {
          normalized = absGlob.slice(0, -2);
          /* istanbul ignore else */

          if (isNegated) emptyValue = {};
          eType = 'object';
        } else if (absGlob.slice(-3) === '[*]') {
          normalized = absGlob.slice(0, -3);
          /* istanbul ignore else */

          if (isNegated) emptyValue = [];
          eType = 'array';
        } else {
          normalized = absGlob;
        } // we'll check glob vs value integrity if emptyValue is set; and throw if needed.


        var errGlobIntegrity = "Integrity failed for glob '".concat(glob, "'. Cannot set empty ").concat(eType, " for '").concat(normalized, "' which has a type of "); // ...
        // check if remaining normalized glob has no wildcard stars e.g.
        // "a.b" or "!a.b.c" etc..

        if (re.WILDCARDS.test(normalized) === false) {
          if (isNegated) {
            // inspect and directly remove the notation if negated.
            // we need the inspection for the detailed error below.
            var insRemove = filtered.inspectRemove(normalized); // console.log('insRemove', insRemove);
            // if original glob had `.*` at the end, it means remove
            // contents (not itself). so we'll set an empty object.
            // meaning `some.prop` (prop) is removed completely but
            // `some.prop.*` (prop) results in `{}`. For array notation
            // (`[*]`), we'll set an empty array.

            if (emptyValue) {
              // e.g. for glob `![0].x.*` we expect to set `[0].x = {}`
              // but if `.x` is not an object (or array), we should fail.
              var vType = insRemove.type;
              var errMsg = errGlobIntegrity + "'".concat(vType, "'."); // in non-strict mode, only exceptions are `null` and
              // `undefined`, for which we won't throw but we'll not
              // set an empty obj/arr either.

              var isValSet = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isset(insRemove.value); // on critical type mismatch we throw
              // or if original value is undefined or null in strict mode we throw

              if (isValSet && vType !== eType || !isValSet && _this3.options.strict) {
                throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](errMsg);
              } // if parent is an array, we'll insert the value at
              // index bec. we've removed the item and indexes are
              // shifted. Otherwise, we'll simply overwrite the
              // object property value.


              var setMode = insRemove.parentIsArray ? 'insert' : 'overwrite'; // console.log('setting', normalized, emptyValue, setMode);

              filtered.set(normalized, emptyValue, setMode);
            }
          } else {
            // directly set the same notation from the original
            var insGet = _this3.inspectGet(normalized); // Notation.create(original).inspectGet ...

            /* istanbul ignore else */


            if (insGet.has) filtered.set(normalized, insGet.value, 'overwrite');
          } // move to the next


          return true;
        } // if glob has wildcard(s), we'll iterate through keys of the source
        // object and see if (full) notation of each key matches the current
        // glob.
        // important! we will iterate with eachRight to prevent shifted
        // indexes when removing items from arrays.


        var reverseIterateIfArray = true;

        _each(_this3._source, function (originalNotation, key, value) {
          var originalIsCovered = _notation_glob__WEBPACK_IMPORTED_MODULE_0__["Glob"].create(normalized).covers(originalNotation); // console.log('» normalized:', normalized, 'covers', originalNotation, '»', originalIsCovered);

          if (!originalIsCovered) return true; // break

          if (_this3.options.strict && emptyValue) {
            // since original is covered and we have emptyValue set (due
            // to trailing wildcard), here we'll check value vs glob
            // integrity; (only if we're in strict mode).
            var _vType = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(value); // types and number of levels are the same?


            if (_vType !== eType // we subtract 1 from number of levels bec. the last
            // note is removed since we have emptyValue set.
            && Notation.split(originalNotation).length === levels.length - 1) {
              throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](errGlobIntegrity + "'".concat(_vType, "'."));
            }
          } // iterating each note of original notation. i.e.:
          // note1.note2.note3 is iterated from left to right, as:
          // 'note1', 'note1.note2', 'note1.note2.note3' — in order.


          Notation.eachNote(originalNotation, function (levelNotation) {
            // console.log('  level »', glob, 'covers', levelNotation, '»', g.test(levelNotation));
            if (g.test(levelNotation)) {
              var levelLen = Notation.split(levelNotation).length;
              /* istanbul ignore else */

              if (isNegated && levels.length <= levelLen) {
                // console.log('  » removing', levelNotation, 'of', originalNotation);
                filtered.remove(levelNotation); // we break and return early if removed bec. e.g.
                // when 'note1.note2' (parent) of
                // 'note1.note2.note3' is also removed, we no more
                // have 'note3'.

                return false;
              } // console.log('  » setting', levelNotation, '=', value);


              filtered.set(levelNotation, value, 'overwrite');
            }
          });
        }, reverseIterateIfArray);
      }); // finally set the filtered's value as the source of our instance and
      // return.

      this._source = filtered.value;
      return this;
    }
    /**
     *  Removes the property from the source object, at the given notation.
     *  @alias Notation#delete
     *  @chainable
     *  @param {String} notation - The notation to be inspected.
     *  @returns {Notation} - The current `Notation` instance (self).
     *  @throws {NotationError} - If `strict` option is enabled and notation
     *  does not exist.
     *
     *  @example
     *  const obj = { notebook: "Mac", car: { model: "Mustang" } };
     *  Notation.create(obj).remove("car.model");
     *  console.log(obj); // { notebook: "Mac", car: { } }
     */

  }, {
    key: "remove",
    value: function remove(notation) {
      var result = this.inspectRemove(notation); // if strict, check if implied index or prop exists

      if (this.options.strict && !result.has) {
        var msg = result.parentIsArray ? ERR.NO_INDEX : ERR.NO_PROP;
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](msg + "'".concat(notation, "'"));
      }

      return this;
    }
    /**
     *  Alias of `Notation#remove`
     *  @private
     *  @param {String} notation -
     *  @returns {Notation} -
     */

  }, {
    key: "delete",
    value: function _delete(notation) {
      this.remove(notation);
      return this;
    }
    /**
     *  Copies the notated property from the source collection and adds it to the
     *  destination — only if the source object actually has that property.
     *  This is different than a property with a value of `undefined`.
     *  @chainable
     *
     *  @param {Object|Array} destination - The destination object that the notated
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
     *  @returns {Notation} - The current `Notation` instance (self).
     *
     *  @throws {NotationError} - If `destination` is not a valid collection.
     *  @throws {NotationError} - If `notation` or `newNotation` is invalid.
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
    key: "copyTo",
    value: function copyTo(destination, notation) {
      var newNotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      if (!_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isCollection(destination)) throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](ERR.DEST);
      var result = this.inspectGet(notation);

      if (result.has) {
        var newN = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].getNewNotation(newNotation, notation);
        Notation.create(destination).set(newN, result.value, overwrite);
      }

      return this;
    }
    /**
     *  Copies the notated property from the target collection and adds it to
     *  (own) source object — only if the target object actually has that
     *  property. This is different than a property with a value of `undefined`.
     *  @chainable
     *
     *  @param {Object|Array} target - The target collection that the notated
     *  properties will be copied from.
     *  @param {String} notation - The notation to get the corresponding
     *  property from the target object.
     *  @param {String} [newNotation=null] - The notation to set the copied
     *  property on our source collection. In other words, the copied property
     *  will be renamed to this value before set. If not set, `notation`
     *  argument will be used.
     *  @param {Boolean} [overwrite=true] - Whether to overwrite the property on
     *  our collection if it exists.
     *
     *  @returns {Notation} - The current `Notation` instance (self).
     *
     *  @throws {NotationError} - If `target` is not a valid collection.
     *  @throws {NotationError} - If `notation` or `newNotation` is invalid.
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
    key: "copyFrom",
    value: function copyFrom(target, notation) {
      var newNotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      if (!_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isCollection(target)) throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](ERR.DEST);
      var result = Notation.create(target).inspectGet(notation);

      if (result.has) {
        var newN = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].getNewNotation(newNotation, notation);
        this.set(newN, result.value, overwrite);
      }

      return this;
    }
    /**
     *  Removes the notated property from the source (own) collection and adds
     *  it to the destination — only if the source collection actually has that
     *  property. This is different than a property with a value of `undefined`.
     *  @chainable
     *
     *  @param {Object|Array} destination - The destination collection that the
     *  notated properties will be moved to.
     *  @param {String} notation - The notation to get the corresponding
     *  property from the source object.
     *  @param {String} [newNotation=null] - The notation to set the source
     *  property on the destination object. In other words, the moved property
     *  will be renamed to this value before set on the destination object. If
     *  not set, `notation` argument will be used.
     *  @param {Boolean} [overwrite=true] - Whether to overwrite the property on
     *  the destination object if it exists.
     *
     *  @returns {Notation} - The current `Notation` instance (self).
     *
     *  @throws {NotationError} - If `destination` is not a valid collection.
     *  @throws {NotationError} - If `notation` or `newNotation` is invalid.
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
    key: "moveTo",
    value: function moveTo(destination, notation) {
      var newNotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      if (!_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isCollection(destination)) throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](ERR.DEST);
      var result = this.inspectRemove(notation);

      if (result.has) {
        var newN = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].getNewNotation(newNotation, notation);
        Notation.create(destination).set(newN, result.value, overwrite);
      }

      return this;
    }
    /**
     *  Removes the notated property from the target collection and adds it to (own)
     *  source collection — only if the target object actually has that property.
     *  This is different than a property with a value of `undefined`.
     *  @chainable
     *
     *  @param {Object|Array} target - The target collection that the notated
     *  properties will be moved from.
     *  @param {String} notation - The notation to get the corresponding property
     *  from the target object.
     *  @param {String} [newNotation=null] - The notation to set the target
     *  property on the source object. In other words, the moved property
     *  will be renamed to this value before set on the source object.
     *  If not set, `notation` argument will be used.
     *  @param {Boolean} [overwrite=true] - Whether to overwrite the property on
     *  the source object if it exists.
     *
     *  @returns {Notation} - The current `Notation` instance (self).
     *
     *  @throws {NotationError} - If `target` is not a valid collection.
     *  @throws {NotationError} - If `notation` or `newNotation` is invalid.
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
    key: "moveFrom",
    value: function moveFrom(target, notation) {
      var newNotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      if (!_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isCollection(target)) throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](ERR.DEST);
      var result = Notation.create(target).inspectRemove(notation);

      if (result.has) {
        var newN = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].getNewNotation(newNotation, notation);
        this.set(newN, result.value, overwrite);
      }

      return this;
    }
    /**
     *  Renames the notated property of the source collection by the new notation.
     *  @alias Notation#renote
     *  @chainable
     *
     *  @param {String} notation - The notation to get the corresponding
     *  property (value) from the source collection.
     *  @param {String} newNotation - The new notation for the targeted
     *  property value. If not set, the source collection will not be modified.
     *  @param {Boolean} [overwrite=true] - Whether to overwrite the property at
     *  the new notation, if it exists.
     *
     *  @returns {Notation} - The current `Notation` instance (self).
     *
     *  @throws {NotationError} - If `notation` or `newNotation` is invalid.
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
    key: "rename",
    value: function rename(notation, newNotation, overwrite) {
      return this.moveTo(this._source, notation, newNotation, overwrite);
    }
    /**
     *  Alias for `#rename`
     *  @private
     *  @param {String} notation -
     *  @param {String} newNotation -
     *  @param {Boolean} [overwrite=true] -
     *  @returns {Notation} -
     */

  }, {
    key: "renote",
    value: function renote(notation, newNotation, overwrite) {
      return this.rename(notation, newNotation, overwrite);
    }
    /**
     *  Extracts the property at the given notation to a new object by copying
     *  it from the source collection. This is equivalent to `.copyTo({},
     *  notation, newNotation)`.
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
     *  @throws {NotationError} - If `notation` or `newNotation` is invalid.
     *
     *  @example
     *  const obj = { car: { brand: "Ford", model: "Mustang" } };
     *  const extracted = Notation.create(obj).extract("car.brand", "carBrand");
     *  console.log(extracted);
     *  // { carBrand: "Ford" }
     *  // obj is not modified
     */

  }, {
    key: "extract",
    value: function extract(notation, newNotation) {
      var o = {};
      this.copyTo(o, notation, newNotation);
      return o;
    }
    /**
     *  Alias for `#extract`
     *  @private
     *  @param {String} notation -
     *  @param {String} newNotation -
     *  @returns {Object} -
     */

  }, {
    key: "copyToNew",
    value: function copyToNew(notation, newNotation) {
      return this.extract(notation, newNotation);
    }
    /**
     *  Extrudes the property at the given notation to a new collection by
     *  moving it from the source collection. This is equivalent to `.moveTo({},
     *  notation, newNotation)`.
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
    key: "extrude",
    value: function extrude(notation, newNotation) {
      var o = {};
      this.moveTo(o, notation, newNotation);
      return o;
    }
    /**
     *  Alias for `#extrude`
     *  @private
     *  @param {String} notation -
     *  @param {String} newNotation -
     *  @returns {Object} -
     */

  }, {
    key: "moveToNew",
    value: function moveToNew(notation, newNotation) {
      return this.extrude(notation, newNotation);
    } // --------------------------------
    // STATIC MEMBERS
    // --------------------------------

    /**
     *  Basically constructs a new `Notation` instance.
     *  @chainable
     *  @param {Object|Array} [source={}] - The source collection to be notated.
     *  @param {Object} [options] - Notation options.
     *      @param {Boolean} [options.strict=false] - Whether to throw when a
     *      notation path does not exist on the source. (Note that `.inspectGet()`
     *      and `.inspectRemove()` methods are exceptions). It's recommended to
     *      set this to `true` and prevent silent failures if you're working
     *      with sensitive data. Regardless of `strict` option, it will always
     *      throw on invalid notation syntax or other crucial failures.
     *
     *  @returns {Notation} - The created instance.
     *
     *  @example
     *  const obj = { car: { brand: "Dodge", model: "Charger", year: 1970 } };
     *  const notation = Notation.create(obj); // equivalent to new Notation(obj)
     *  notation.get('car.model')   // » "Charger"
     *  notation.remove('car.model').set('car.color', 'red').value
     *  // » { car: { brand: "Dodge", year: 1970, color: "red" } }
     */

  }, {
    key: "options",
    get: function get() {
      return this._options;
    },
    set: function set(value) {
      this._options = _objectSpread(_objectSpread(_objectSpread({}, DEFAULT_OPTS), this._options || {}), value || {});
    }
    /**
     *  Gets the value of the source object.
     *  @type {Object|Array}
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

  }, {
    key: "value",
    get: function get() {
      return this._source;
    }
  }], [{
    key: "create",
    value: function create(source, options) {
      if (arguments.length === 0) {
        return new Notation({});
      }

      return new Notation(source, options);
    }
    /**
     *  Checks whether the given notation string is valid. Note that the star
     *  (`*`) (which is a valid character, even if irregular) is NOT treated as
     *  wildcard here. This checks for regular dot-notation, not a glob-notation.
     *  For glob notation validation, use `Notation.Glob.isValid()` method. Same
     *  goes for the negation character/prefix (`!`).
     *
     *  @param {String} notation - The notation string to be checked.
     *  @returns {Boolean} -
     *
     *  @example
     *  Notation.isValid('prop1.prop2.prop3'); // true
     *  Notation.isValid('x'); // true
     *  Notation.isValid('x.arr[0].y'); // true
     *  Notation.isValid('x["*"]'); // true
     *  Notation.isValid('x.*'); // false (this would be valid for Notation#filter() only or Notation.Glob class)
     *  Notation.isValid('@1'); // false (should be "['@1']")
     *  Notation.isValid(null); // false
     */

  }, {
    key: "isValid",
    value: function isValid(notation) {
      return typeof notation === 'string' && reVALIDATOR.test(notation);
    }
    /**
     *  Splits the given notation string into its notes (levels).
     *  @param {String} notation  Notation string to be splitted.
     *  @returns {Array} - A string array of notes (levels).
     *  @throws {NotationError} - If given notation is invalid.
     */

  }, {
    key: "split",
    value: function split(notation) {
      if (!Notation.isValid(notation)) {
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"](ERR.NOTATION + "'".concat(notation, "'"));
      }

      return notation.match(reMATCHER);
    }
    /**
     *  Joins the given notes into a notation string.
     *  @param {String} notes  Notes (levels) to be joined.
     *  @returns {String}  Joined notation string.
     */

  }, {
    key: "join",
    value: function join(notes) {
      return _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].joinNotes(notes);
    }
    /**
     *  Counts the number of notes/levels in the given notation.
     *  @alias Notation.countLevels
     *  @param {String} notation - The notation string to be processed.
     *  @returns {Number} - Number of notes.
     *  @throws {NotationError} - If given notation is invalid.
     */

  }, {
    key: "countNotes",
    value: function countNotes(notation) {
      return Notation.split(notation).length;
    }
    /**
     *  Alias of `Notation.countNotes`.
     *  @private
     *  @param {String} notation -
     *  @returns {Number} -
     */

  }, {
    key: "countLevels",
    value: function countLevels(notation) {
      return Notation.countNotes(notation);
    }
    /**
     *  Gets the first (root) note of the notation string.
     *  @param {String} notation - The notation string to be processed.
     *  @returns {String} - First note.
     *  @throws {NotationError} - If given notation is invalid.
     *
     *  @example
     *  Notation.first('first.prop2.last'); // "first"
     */

  }, {
    key: "first",
    value: function first(notation) {
      return Notation.split(notation)[0];
    }
    /**
     *  Gets the last note of the notation string.
     *  @param {String} notation - The notation string to be processed.
     *  @returns {String} - Last note.
     *  @throws {NotationError} - If given notation is invalid.
     *
     *  @example
     *  Notation.last('first.prop2.last'); // "last"
     */

  }, {
    key: "last",
    value: function last(notation) {
      var list = Notation.split(notation);
      return list[list.length - 1];
    }
    /**
     *  Gets the parent notation (up to but excluding the last note)
     *  from the notation string.
     *  @param {String} notation - The notation string to be processed.
     *  @returns {String} - Parent note if any. Otherwise, `null`.
     *  @throws {NotationError} - If given notation is invalid.
     *
     *  @example
     *  Notation.parent('first.prop2.last'); // "first.prop2"
     *  Notation.parent('single'); // null
     */

  }, {
    key: "parent",
    value: function parent(notation) {
      var last = Notation.last(notation);
      return notation.slice(0, -last.length).replace(/\.$/, '') || null;
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
     *  @throws {NotationError} - If given notation is invalid.
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
    key: "eachNote",
    value: function eachNote(notation, callback) {
      var notes = Notation.split(notation);
      var levelNotes = [];
      _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].each(notes, function (note, index) {
        levelNotes.push(note);
        if (callback(Notation.join(levelNotes), note, index, notes) === false) return false;
      }, Notation);
    }
    /**
     *  Alias of `Notation.eachNote`.
     *  @private
     *  @param {String} notation -
     *  @param {Function} callback -
     *  @returns {void}
     */

  }, {
    key: "eachLevel",
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


Notation.Error = _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"];
/**
 *  Utility for validating, comparing and sorting dot-notation globs.
 *  This is internally used by `Notation` class.
 *  @private
 *
 *  @class
 *  @see `{@link #Notation.Glob}`
 */

Notation.Glob = _notation_glob__WEBPACK_IMPORTED_MODULE_0__["Glob"];
/**
 *  Undocumented
 *  @private
 */

Notation.utils = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"]; // --------------------------------
// HELPERS
// --------------------------------

/**
 *  Deep iterates through each note (level) of each item in the given
 *  collection.
 *  @private
 *  @param {Object|Array} collection  A data object or an array, as the source.
 *  @param {Function} callback  A function to be executed on each iteration,
 *  with the following arguments: `(levelNotation, note, value, collection)`
 *  @param {Boolean} [reverseIfArray=false]  Set to `true` to iterate with
 *  `eachRight` to prevent shifted indexes when removing items from arrays.
 *  @param {Boolean} [byLevel=false]  Indicates whether to iterate notations by
 *  each level or by the end value.  For example, if we have a collection of
 *  `{a: { b: true } }`, and `byLevel` is set; the callback will be invoked on
 *  the following notations: `a`, `a.b`. Otherwise, it will be invoked only on
 *  `a.b`.
 *  @param {String} [parentNotation]  Storage for parent (previous) notation.
 *  @param {Collection} [topSource]  Storage for initial/main collection.
 *  @returns {void}
 */

function _each(collection, callback) {
  var reverseIfArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var byLevel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var parentNotation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var topSource = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  // eslint-disable-line max-params
  var source = topSource || collection; // if (!utils.isCollection(collection)) throw ... // no need

  _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].eachItem(collection, function (value, keyOrIndex) {
    var note = typeof keyOrIndex === 'number' ? "[".concat(keyOrIndex, "]") : keyOrIndex;
    var currentNotation = Notation.join([parentNotation, note]);
    var isCollection = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isCollection(value); // if it's not a collection we'll execute the callback. if it's a
    // collection but byLevel is set, we'll also execute the callback.

    if (!isCollection || byLevel) {
      if (callback(currentNotation, note, value, source) === false) return false;
    } // deep iterating if collection


    if (isCollection) _each(value, callback, reverseIfArray, byLevel, currentNotation, source);
  }, null, reverseIfArray);
} // --------------------------------
// EXPORT
// --------------------------------




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Notation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_notation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/notation */ "./src/core/notation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Notation", function() { return _core_notation__WEBPACK_IMPORTED_MODULE_0__["Notation"]; });

/* istanbul ignore file */


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return utils; });
/* harmony import */ var _core_notation_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/notation.error */ "./src/core/notation.error.js");

var objProto = Object.prototype;
var symValueOf = typeof Symbol === 'function' ? Symbol.prototype.valueOf
/* istanbul ignore next */
: null; // never use 'g' (global) flag in regexps below

var VAR = /^[a-z$_][a-z$_\d]*$/i;
var ARRAY_NOTE = /^\[(\d+)\]$/;
var ARRAY_GLOB_NOTE = /^\[(\d+|\*)\]$/;
var OBJECT_BRACKETS = /^\[(?:'(.*)'|"(.*)"|`(.*)`)\]$/;
var WILDCARD = /^(\[\*\]|\*)$/; // matches `*` and `[*]` if outside of quotes.

var WILDCARDS = /(\*|\[\*\])(?=(?:[^"]|"[^"]*")*$)(?=(?:[^']|'[^']*')*$)/; // matches trailing wildcards at the end of a non-negated glob.
// e.g. `x.y.*[*].*` » $1 = `x.y`, $2 = `.*[*].*`

var NON_NEG_WILDCARD_TRAIL = /^(?!!)(.+?)(\.\*|\[\*\])+$/;
var NEGATE_ALL = /^!(\*|\[\*\])$/; // ending with '.*' or '[*]'

var _reFlags = /\w*$/;
var utils = {
  re: {
    VAR: VAR,
    ARRAY_NOTE: ARRAY_NOTE,
    ARRAY_GLOB_NOTE: ARRAY_GLOB_NOTE,
    OBJECT_BRACKETS: OBJECT_BRACKETS,
    WILDCARD: WILDCARD,
    WILDCARDS: WILDCARDS,
    NON_NEG_WILDCARD_TRAIL: NON_NEG_WILDCARD_TRAIL,
    NEGATE_ALL: NEGATE_ALL
  },
  type: function type(o) {
    return objProto.toString.call(o).match(/\s(\w+)/i)[1].toLowerCase();
  },
  isCollection: function isCollection(o) {
    var t = utils.type(o);
    return t === 'object' || t === 'array';
  },
  isset: function isset(o) {
    return o !== undefined && o !== null;
  },
  ensureArray: function ensureArray(o) {
    if (utils.type(o) === 'array') return o;
    return o === null || o === undefined ? [] : [o];
  },
  // simply returning true will get rid of the "holes" in the array.
  // e.g. [0, , 1, , undefined, , , 2, , , null].filter(() => true);
  // ——» [0, 1, undefined, 2, null]
  // cleanSparseArray(a) {
  //     return a.filter(() => true);
  // },
  // added _collectionType for optimization (in loops)
  hasOwn: function hasOwn(collection, keyOrIndex, _collectionType) {
    if (!collection) return false;
    var isArr = (_collectionType || utils.type(collection)) === 'array';

    if (!isArr && typeof keyOrIndex === 'string') {
      return keyOrIndex && objProto.hasOwnProperty.call(collection, keyOrIndex);
    }

    if (typeof keyOrIndex === 'number') {
      return keyOrIndex >= 0 && keyOrIndex < collection.length;
    }

    return false;
  },
  cloneDeep: function cloneDeep(collection) {
    var t = utils.type(collection);

    switch (t) {
      case 'date':
        return new Date(collection.valueOf());

      case 'regexp':
        {
          var flags = _reFlags.exec(collection).toString();

          var copy = new collection.constructor(collection.source, flags);
          copy.lastIndex = collection.lastIndex;
          return copy;
        }

      case 'symbol':
        return symValueOf ? Object(symValueOf.call(collection))
        /* istanbul ignore next */
        : collection;

      case 'array':
        return collection.map(utils.cloneDeep);

      case 'object':
        {
          var _copy = {}; // only enumerable string keys

          Object.keys(collection).forEach(function (k) {
            _copy[k] = utils.cloneDeep(collection[k]);
          });
          return _copy;
        }
      // primitives copied over by value
      // case 'string':
      // case 'number':
      // case 'boolean':
      // case 'null':
      // case 'undefined':

      default:
        // others will be referenced
        return collection;
    }
  },
  // iterates over elements of an array, executing the callback for each
  // element.
  each: function each(array, callback, thisArg) {
    var len = array.length;
    var index = -1;

    while (++index < len) {
      if (callback.apply(thisArg, [array[index], index, array]) === false) break;
    }
  },
  eachRight: function eachRight(array, callback, thisArg) {
    var index = array.length;

    while (index--) {
      if (callback.apply(thisArg, [array[index], index, array]) === false) break;
    }
  },
  eachProp: function eachProp(object, callback, thisArg) {
    var keys = Object.keys(object);
    var index = -1;

    while (++index < keys.length) {
      var key = keys[index];
      if (callback.apply(thisArg, [object[key], key, object]) === false) break;
    }
  },
  eachItem: function eachItem(collection, callback, thisArg) {
    var reverseIfArray = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (utils.type(collection) === 'array') {
      // important! we should iterate with eachRight to prevent shifted
      // indexes when removing items from arrays.
      return reverseIfArray ? utils.eachRight(collection, callback, thisArg) : utils.each(collection, callback, thisArg);
    }

    return utils.eachProp(collection, callback, thisArg);
  },
  pregQuote: function pregQuote(str) {
    var re = /[.\\+*?[^\]$(){}=!<>|:-]/g;
    return String(str).replace(re, '\\$&');
  },
  stringOrArrayOf: function stringOrArrayOf(o, value) {
    return typeof value === 'string' && (o === value || utils.type(o) === 'array' && o.length === 1 && o[0] === value);
  },
  hasSingleItemOf: function hasSingleItemOf(arr, itemValue) {
    return arr.length === 1 && (arguments.length === 2 ? arr[0] === itemValue : true);
  },
  // remove trailing/redundant wildcards if not negated
  removeTrailingWildcards: function removeTrailingWildcards(glob) {
    // return glob.replace(/(.+?)(\.\*|\[\*\])*$/, '$1');
    return glob.replace(NON_NEG_WILDCARD_TRAIL, '$1');
  },
  normalizeNote: function normalizeNote(note) {
    if (VAR.test(note)) return note; // check array index notation e.g. `[1]`

    var m = note.match(ARRAY_NOTE);
    if (m) return parseInt(m[1], 10); // check object bracket notation e.g. `["a-b"]`

    m = note.match(OBJECT_BRACKETS);
    if (m) return m[1] || m[2] || m[3];
    throw new _core_notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"]("Invalid note: '".concat(note, "'"));
  },
  joinNotes: function joinNotes(notes) {
    var lastIndex = notes.length - 1;
    return notes.map(function (current, i) {
      if (!current) return '';
      var next = lastIndex >= i + 1 ? notes[i + 1] : null;
      var dot = next ? next[0] === '[' ? '' : '.' : '';
      return current + dot;
    }).join('');
  },
  getNewNotation: function getNewNotation(newNotation, notation) {
    var errMsg = "Invalid new notation: '".concat(newNotation, "'"); // note validations (for newNotation and notation) are already made by
    // other methods in the flow.

    var newN;

    if (typeof newNotation === 'string') {
      newN = newNotation.trim();
      if (!newN) throw new _core_notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](errMsg);
      return newN;
    }

    if (notation && !utils.isset(newNotation)) return notation;
    throw new _core_notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](errMsg);
  }
};


/***/ })

/******/ });
});
//# sourceMappingURL=notation.js.map