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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/* eslint consistent-this:0, no-prototype-builtins:0 */
var setProto = Object.setPrototypeOf;
/**
 *  Error class specific to `Notation`.
 *  @name Notation.Error
 *  @memberof! Notation
 *  @class
 *
 */

var NotationError =
/*#__PURE__*/
function (_Error) {
  _inherits(NotationError, _Error);

  /**
   *  Initializes a new `Notation.Error` instance.
   *  @constructs Notation.Error
   *  @param {String} message - The error message.
   */
  function NotationError() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, NotationError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NotationError).call(this, message));
    setProto(_assertThisInitialized(_assertThisInitialized(_this)), NotationError.prototype);
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'name', {
      enumerable: false,
      writable: false,
      value: 'NotationError'
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'message', {
      enumerable: false,
      writable: true,
      value: message
    });
    /* istanbul ignore else */

    if (Error.hasOwnProperty('captureStackTrace')) {
      // V8
      Error.captureStackTrace(_assertThisInitialized(_assertThisInitialized(_this)), NotationError);
    } else {
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'stack', {
        enumerable: false,
        writable: false,
        value: new Error(message).stack
      });
    }

    return _this;
  }

  return NotationError;
}(_wrapNativeSuper(Error));



/***/ }),

/***/ "./src/core/notation.glob.js":
/*!***********************************!*\
  !*** ./src/core/notation.glob.js ***!
  \***********************************/
/*! exports provided: NotationGlob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotationGlob", function() { return NotationGlob; });
/* harmony import */ var _notation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notation */ "./src/core/notation.js");
/* harmony import */ var _notation_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notation.error */ "./src/core/notation.error.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

var NotationGlob =
/*#__PURE__*/
function () {
  /**
   *  Constructs a `Notation.Glob` object with the given glob string.
   *  @constructs Notation.Glob
   *  @param {String} glob - Notation string with globs.
   *
   *  @throws {NotationError} - If given notation glob is invalid.
   */
  function NotationGlob(glob) {
    _classCallCheck(this, NotationGlob);

    var ins = NotationGlob._inspect(glob);

    var notes = NotationGlob.split(ins.absGlob, true);
    var last = notes[notes.length - 1];
    var parent = notes.length > 1 ? ins.absGlob.slice(0, -last.length).replace(/\.$/, '') : null;
    this._ = _objectSpread({}, ins, {
      regexp: NotationGlob.toRegExp(ins.absGlob),
      notes: notes,
      last: last,
      parent: parent
    });
  } // --------------------------------
  // INSTANCE PROPERTIES
  // --------------------------------

  /**
   *  Gets the normalized glob notation string.
   *  @name Notation.Glob#glob
   *  @type {String}
   */


  _createClass(NotationGlob, [{
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


      return NotationGlob._covers(this, notation);
    }
    /**
     *  Specifies whether this glob notation can represent (or cover) the given
     *  glob notation. Note that negation prefix is ignored, if any.
     *  @param {String|Array|NotationGlob} glob  Glob notation string, glob
     *  notes array or a `NotationGlob` instance.
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
      return NotationGlob._covers(this, glob);
    }
    /**
     *  Gets the intersection of this and the given glob notations. When
     *  restrictive, if any one of them is negated, the outcome is negated.
     *  Otherwise, only if both of them are negated, the outcome is negated.
     *  @param {String} glob - Second glob to be used.
     *  @param {Boolean} [restrictive=false] - Whether the intersection should
     *  be negated when one of the globs is negated.
     *  @returns {String} - Intersection notation if any; otherwise `null`.
     *  @example
     *  const glob = Notation.Glob.create;
     *  glob('x.*').intersect('!*.y')         // 'x.y'
     *  glob('x.*').intersect('!*.y', true)   // '!x.y'
     */

  }, {
    key: "intersect",
    value: function intersect(glob) {
      var restrictive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return NotationGlob._intersect(this.glob, glob, restrictive);
    } // --------------------------------
    // STATIC MEMBERS
    // --------------------------------

    /**
     *  Basically constructs a new `NotationGlob` instance
     *  with the given glob string.
     *  @name Notation.Glob.create
     *  @function
     *  @param {String} glob - The source notation glob.
     *  @returns {NotationGlob} -
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
      return this._.regexp;
    }
    /**
     *  List of notes/levels of this glob notation. Note that trailing,
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
      return this._.last;
    }
    /**
     *  Gets the parent notation (up to but excluding the last note) from the
     *  glob notation string. Note that initially, trailing/redundant wildcards
     *  are removed.
     *  @name Notation.Glob#parent
     *  @type {String}
     *
     *  @example
     *  NotationGlob.create('first.second.*').parent; // "first.second"
     *  NotationGlob.create('*.x.*').parent; // "*"
     *  NotationGlob.create('*').parent; // null (no parent)
     */

  }, {
    key: "parent",
    get: function get() {
      return this._.parent;
    }
  }], [{
    key: "create",
    value: function create(glob) {
      return new NotationGlob(glob);
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
     *  or negation bang prefix.
     *  @param {String} glob - Glob notation to be checked.
     *  @returns {Boolean} -
     */

  }, {
    key: "hasMagic",
    value: function hasMagic(glob) {
      return NotationGlob.isValid(glob) && (re.WILDCARDS.test(glob) || glob[0] === '!');
    }
    /**
     *  Gets a regular expressions instance from the given glob notation.
     *  Note that the bang `!` prefix will be ignored if the given glob is negated.
     *  @name Notation.Glob.toRegExp
     *  @function
     *  @param {String} glob - Glob notation to be converted.
     *
     *  @returns {RegExp} - A `RegExp` instance from the glob.
     *
     *  @throws {NotationError} - If given notation glob is invalid.
     */

  }, {
    key: "toRegExp",
    value: function toRegExp(glob) {
      if (!NotationGlob.isValid(glob)) {
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
     *  @private
     *  @param {String|Object|NotationGlob} globA  Source glob notation string or inspection
     *  result object or `NotationGlob` instance.
     *  @param {String|Object|NotationGlob} globB  Glob notation string or inspection result
     *  object or `NotationGlob` instance.
     *  @returns {Boolean} -
     *
     *  @example
     *  const { covers } = NotationGlob;
     *  covers('*.y', 'x.y')      // true
     *  covers('x[*].y', 'x[*]')  // false
     */

  }, {
    key: "_covers",
    value: function _covers(globA, globB) {
      var a = typeof globA === 'string' ? new NotationGlob(globA) : globA; // assume (globA instanceof NotationGlob || utils.type(globA) === 'object')

      var b = typeof globB === 'string' ? new NotationGlob(globB) : globB;
      var notesA = a.notes || NotationGlob.split(a.absGlob);
      var notesB = b.notes || NotationGlob.split(b.absGlob); // !x.*.* does not cover !x.* or x.* bec. !x.*.* !== x.* !== x
      // x.*.* covers x.* bec. x.*.* === x.* === x

      if (a.isNegated && notesA.length > notesB.length) return false;
      var covers = true;

      for (var i = 0; i < notesA.length; i++) {
        if (!_coversNote(notesA[i], notesB[i])) {
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
     *  @private
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
      var notesA = NotationGlob.split(globA, true);
      var notesB = NotationGlob.split(globB, true);
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
     *  @private
     *  @param {String} glob -
     *  @returns {Object} -
     */

  }, {
    key: "_inspect",
    value: function _inspect(glob) {
      var g = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeGlobStr(glob);

      if (!NotationGlob.isValid(g)) {
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"]("".concat(ERR_INVALID, " '").concat(glob, "'"));
      }

      var isNegated = g[0] === '!';
      return {
        glob: g,
        isNegated: isNegated,
        absGlob: isNegated ? g.slice(1) : g
      };
    }
    /**
     *  Splits the given glob notation string into its notes (levels). Note that
     *  this will exclude the `!` negation prefix, if it exists.
     *  @param {String} glob  Glob notation string to be splitted.
     *  @param {String} [normalize=false]  Whether to remove trailing, redundant
     *  wildcards.
     *  @returns {Array} - A string array of glob notes (levels).
     *  @throws {NotationError} - If given glob notation is invalid.
     *  @example
     *  Notation.Glob.split('*.list[2].value')  // ['*', 'list', '[2]', 'value']
     *  // you can get the same result from the .notes property of a Notation.Glob instance.
     */

  }, {
    key: "split",
    value: function split(glob) {
      var normalize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!NotationGlob.isValid(glob)) {
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_1__["NotationError"]("".concat(ERR_INVALID, " '").concat(glob, "'"));
      }

      var g = normalize ? _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeGlobStr(glob) : glob;
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
      var split = NotationGlob.split,
          _inspect = NotationGlob._inspect;

      var a = _inspect(globA);

      var b = _inspect(globB);

      var notesA = split(a.absGlob);
      var notesB = split(b.absGlob); // Check depth (number of levels)

      if (notesA.length === notesB.length) {
        // count wildcards
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

      return notesA.length < notesB.length ? -1 : 1;
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
     *  @param {Array} globList - The notation globs array to be sorted. The
     *  passed array reference is modified.
     *  @returns {Array} -
     *
     *  @example
     *  const { sort } = Notation.Glob;
     *  sort(['!prop.*.name', 'prop.*', 'prop.id'])
     *  // ['prop.*', 'prop.id', '!prop.*.name'];
     */

  }, {
    key: "sort",
    value: function sort(globList) {
      return globList.sort(NotationGlob.compare);
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
     *  normalize(['*', '!id', 'name', '!car.model', 'car.*', 'id', 'name']);
     *  // —» ['*', '!id', '!car.model']
     *  normalize(['!*.id', 'user.*', 'company']);
     *  // —» ['company', 'user', '!company.id', '!user.id']
     *  normalize(['*', 'car.model', '!car.*']);
     *  // —» ["*", "!car.*", "car.model"]
     *  normalize(['*', 'car.model', '!car.*'], true); // restrictive
     *  // —» ["*", "!car.*"]
     */

  }, {
    key: "normalize",
    value: function normalize(globList) {
      var restrictive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _inspect = NotationGlob._inspect,
          _covers = NotationGlob._covers,
          _intersect = NotationGlob._intersect;
      var original = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].ensureArray(globList);
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
          // remove if duplicate

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

        return NotationGlob.normalize(normalized, restrictive);
      }

      return NotationGlob.sort(normalized);
    }
    /**
     *  Undocumented. See `.union()`
     *  @private
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
      var _covers = NotationGlob._covers;
      var _inspect = NotationGlob._inspect,
          _intersect = NotationGlob._intersect;
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
          union = union.concat(intersections); // eslint-disable-line no-param-reassign
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
      var normalize = NotationGlob.normalize,
          _compareUnion = NotationGlob._compareUnion;
      var listA = normalize(globsA, restrictive);
      var listB = normalize(globsB, restrictive);
      if (listA.length === 0) return listB;
      if (listB.length === 0) return listA; // TODO: below should be optimized

      var union = _compareUnion(listA, listB, restrictive);

      union = _compareUnion(listB, listA, restrictive, union);
      return normalize(union, restrictive);
    }
  }]);

  return NotationGlob;
}(); // --------------------------------
// HELPERS
// --------------------------------


function _coversNote(a, b) {
  if (a === b) return true; // if (!a && re.WILDCARD.test(b)) return false;

  var bIsArr = b ? re.ARRAY_GLOB_NOTE.test(b) : null;
  if (a === '*' && (!b || !bIsArr)) return true;
  if (a === '[*]' && (!b || bIsArr)) return true;
  return false;
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
/* harmony import */ var _notation_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notation.error */ "./src/core/notation.error.js");
/* harmony import */ var _notation_glob__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notation.glob */ "./src/core/notation.glob.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint no-use-before-define:0, consistent-return:0 */



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

var Notation =
/*#__PURE__*/
function () {
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
   *      `#set()` method). (Note that `.inspect()` and `.inspectRemove()` methods
   *      are exceptions). It's recommended to set this to `true` and prevent silent
   *      failures if you're working with sensitive data. Regardless of `strict` option,
   *      it will always throw on invalid notation syntax or other crucial failures.
   *      @param {Boolean} [options.preserveIndices=false] - Indicates whether to
   *      preserve the indices of the parent array when an item is to be removed.
   *      By default, the item is removed completely at the implied index instead of
   *      preserving indices by emptying the item (sparse array). So you should mind
   *      the shifted indices when you remove an item via `.remove()`, `.inspectRemove()`
   *      or `.filter()`.
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

    var src = source;

    if (arguments.length === 0) {
      src = {};
    } else if (!_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isCollection(source)) {
      throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](ERR.SOURCE);
    }

    this.options = options;
    this._source = src;
    this._isArray = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(src) === 'array';
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
     *  @returns {Notation} - Returns the current `Notation` instance (self).
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
     *  @returns {Notation} - Returns the current `Notation` instance (self).
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
     *  @returns {Notation} - Returns the current `Notation` instance (self).
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
     *  Notation.create({ car: { year: 1970 } }).inspect("car.year");
     *  // { has: true, value: 1970, lastNote: 'year', lastNoteNormalized: 'year' }
     *  Notation.create({ car: { year: 1970 } }).inspect("car.color");
     *  // { has: false }
     *  Notation.create({ car: { color: undefined } }).inspect("car.color");
     *  // { has: true, value: undefined, lastNote: 'color', lastNoteNormalized: 'color' }
     *  Notation.create({ car: { brands: ['Ford', 'Dodge'] } }).inspect("car.brands[1]");
     *  // { has: true, value: 'Dodge', lastNote: '[1]', lastNoteNormalized: 1 }
     */

  }, {
    key: "inspect",
    value: function inspect(notation) {
      var level = this._source;
      var result = {
        has: false,
        value: undefined
      };
      var parent;
      Notation.eachNote(notation, function (levelNotation, note) {
        var lastNoteNormalized = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeNote(note);

        if (_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].hasOwn(level, lastNoteNormalized)) {
          level = level[lastNoteNormalized];
          parent = level;
          result = {
            notation: notation,
            has: true,
            value: level,
            lastNote: note,
            lastNoteNormalized: lastNoteNormalized
          };
        } else {
          // level = undefined;
          result = {
            notation: notation,
            has: false,
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
     *  let obj = { name: "John", car: { year: 1970 } };
     *  let result = Notation.create(obj).inspectRemove("car.year");
     *  // result » { notation: "car.year", has: true, value: 1970, lastNote: "year", lastNoteNormalized: "year" }
     *  // obj » { name: "John", car: {} }
     *
     *  result = Notation.create({ car: { year: 1970 } }).inspectRemove("car.color");
     *  // result » { notation: "car.color", has: false }
     *  Notation.create({ car: { color: undefined } }).inspectRemove("car['color']");
     *  // { notation: "car.color", has: true, value: undefined, lastNote: "['color']", lastNoteNormalized: "color" }
     *
     *  let obj = { car: { colors: ["black", "white"] } };
     *  let result = Notation.create().inspectRemove("car.colors[0]");
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
      var lastNote = Notation.last(notation);
      var lastNoteNormalized = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeNote(lastNote);
      var result;

      if (_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].hasOwn(parent, lastNoteNormalized)) {
        result = {
          notation: notation,
          has: true,
          value: parent[lastNoteNormalized],
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
      return this.inspect(notation).has;
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
      return this.inspect(notation).value !== undefined;
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
      var result = this.inspect(notation); // if strict and no default value is set, check if implied index or prop
      // exists

      if (this.options.strict && arguments.length < 2 && !result.has) {
        var msg = result.parentIsArray ? ERR.NO_INDEX : ERR.NO_PROP;
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](msg + "'".concat(notation, "'"));
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
     *  @param {Boolean} [overwrite=true] - Whether to overwrite the property if
     *  exists.
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self).
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
      var _this = this;

      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (!notation.trim()) throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](ERR.NOTATION + "'".concat(notation, "'"));
      var level = this._source;
      var currentIsLast, nCurrentNote, nNextNote, nextIsArrayNote;
      Notation.eachNote(notation, function (levelNotation, note, index, list) {
        currentIsLast = index === list.length - 1;
        nCurrentNote = nNextNote || _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeNote(note);
        nNextNote = currentIsLast ? null : _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].normalizeNote(list[index + 1]);

        if (_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(level) === 'array' && typeof nCurrentNote !== 'number') {
          var parent = Notation.parent(levelNotation) || 'source';
          throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"]("Cannot set string key '".concat(note, "' on array ").concat(parent));
        } // check if the property is at this level


        if (_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].hasOwn(level, nCurrentNote)) {
          // check if we're at the last level
          if (currentIsLast) {
            // if overwrite is set, assign the value.
            if (overwrite) {
              level[nCurrentNote] = value;
            } else if (_this.options.strict) {
              throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"]('Cannot overwrite an existing value in strict mode.');
            }
          } else {
            // if not, just re-reference the current level.
            level = level[nCurrentNote];
          }
        } else {
          // if next normalized note is a number, it indicates that the
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
    key: "merge",
    value: function merge(notationsObject) {
      var _this2 = this;

      var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(notationsObject) !== 'object') {
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](ERR.NOTA_OBJ + 'Expected an object.');
      }

      var value;
      _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].each(Object.keys(notationsObject), function (notation) {
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
    key: "separate",
    value: function separate(notations) {
      var _this3 = this;

      if (_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].type(notations) !== 'array') {
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](ERR.NOTA_OBJ + 'Expected an array.');
      }

      var o = new Notation({});
      _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].each(notations, function (notation) {
        var result = _this3.inspectRemove(notation);

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
     *  Passing no parameters or passing an empty string (`""` or `[""]`) will
     *  empty the source object. See `Notation.Glob` class for more information.
     *  @chainable
     *
     *  @param {Array|String} globList - Glob notation list to be processed.
     *  @param {Boolean} [restrictive=false] - Whether negated items strictly
     *  remove every match. Note that, regardless of this option, if any item has an
     *  exact negated version; non-negated is always removed.
     *
     *  @returns {Notation} - Returns the current `Notation` instance (self). To
     *  get the filtered value, call `.value` property on the instance.
     *
     *  @example
     *  const source = { notebook: "Mac", car: { brand: "Ford", model: "Mustang", year: 1970 } };
     *  const n = Notation.create(source);
     *  n.filter([ "*", "!car.year" ])
     *  console.log(source)          // { notebook: "Mac", car: { brand: "Ford", model: "Mustang" } }
     *  n.filter("car.brand").value  // { car: { brand: "Ford" } }
     *  console.log(source)          // { notebook: "Mac", car: { model: "Mustang" } }
     *  n.filter().value             // {} // —» equivalent to n.filter("") or n.filter("!*")
     */

  }, {
    key: "filter",
    value: function filter(globList) {
      var _this4 = this;

      var restrictive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var re = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].re; // ensure array, normalize and sort the globs in logical order. this
      // also concats the array first (to prevent mutating the original
      // array).

      var globs = _notation_glob__WEBPACK_IMPORTED_MODULE_1__["NotationGlob"].normalize(globList, restrictive);
      var len = globs.length;
      var empty = this._isArray ? [] : {}; // if globs is "" or [""] or ["!*"] set source to empty and return.

      if (len === 0 || len === 1 && (!globs[0] || re.NEGATE_ALL.test(globs[0]))) {
        this._source = empty;
        return this;
      }

      var original = this.value;
      var copy = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].deepCopy(original);
      var firstIsWildcard = re.WILDCARD.test(globs[0]); // if globs only consist of "*" or "[*]"; set the "copy" as source and
      // return.

      if (len === 1 && firstIsWildcard) {
        this._source = copy;
        return this;
      }

      var filtered; // if the first item of sorted globs is "*" or "[*]" we set the source
      // to the (full) "copy" and remove the wildcard from globs (not to
      // re-process).

      if (firstIsWildcard) {
        filtered = new Notation(copy);
        globs.shift();
      } else {
        // otherwise we set an empty object or array as the source so that
        // we can add notations/properties to it.
        filtered = new Notation(empty);
      }

      var g, endStar, normalized; // iterate through globs

      _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].each(globs, function (globNotation) {
        g = new _notation_glob__WEBPACK_IMPORTED_MODULE_1__["NotationGlob"](globNotation); // set flag that indicates whether the glob ends with `.*`

        endStar = g.absGlob.slice(-2) === '.*'; // get the remaining part as the (extra) normalized glob

        normalized = endStar ? g.absGlob.slice(0, -2) : g.absGlob; // normalized = endStar ? g.absGlob.replace(/(\.\*)+$/, '') : g.absGlob;
        // check if normalized glob has no wildcard stars e.g. "a.b" or
        // "!a.b.c" etc..

        if (normalized.indexOf('*') < 0) {
          if (g.isNegated) {
            // directly remove the notation if negated
            filtered.remove(normalized); // if original glob had `.*` at the end, it means remove
            // contents (not itself). so we'll set an empty object.
            // meaning `some.prop` (prop) is removed completely but
            // `some.prop.*` (prop) results in `{}`.

            if (endStar) filtered.set(normalized, {}, true);
          } else {
            // directly copy the same notation from the original
            filtered.copyFrom(original, normalized, null, true);
          } // move to the next


          return true;
        } // if glob has wildcard star(s), we'll iterate through keys of the
        // source object and see if (full) notation of each key matches
        // the current glob.
        // TODO: Optimize the loop below. Instead of checking each key's
        // notation, get the non-star left part of the glob and iterate
        // that property of the source object.


        _this4.each(function (originalNotation, key, value) {
          // console.log('>>', originalNotation);
          // iterating each note of original notation. i.e.:
          // note1.note2.note3 is iterated from left to right, as:
          // 'note1', 'note1.note2', 'note1.note2.note3' — in order.
          Notation.eachNote(originalNotation, function (levelNotation) {
            if (g.test(levelNotation)) {
              if (g.isNegated) {
                // console.log('removing', levelNotation, 'of', originalNotation);
                filtered.remove(levelNotation); // we break and return early if removed bec. e.g.
                // when 'note1.note2' of 'note1.note2.note3' is
                // also removed, we no more have 'note3'.

                return false;
              }

              filtered.set(levelNotation, value, true);
            }
          });
        });
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
     *  @returns {Notation} - Returns the current `Notation` instance (self).
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
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](msg + "'".concat(notation, "'"));
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
     *  Clones the `Notation` instance to a new one.
     *  @returns {Notation} - A new copy of the instance.
     */

  }, {
    key: "clone",
    value: function clone() {
      return new Notation(_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].deepCopy(this.value));
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
     *  @returns {Notation} - Returns the current `Notation` instance (self).
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
      if (!_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isCollection(destination)) throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](ERR.DEST);
      var result = this.inspect(notation);

      if (result.has) {
        var newN = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].getNewNotation(newNotation, notation);
        new Notation(destination).set(newN, result.value, overwrite);
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
     *  @returns {Notation} - Returns the current `Notation` instance (self).
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
      if (!_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isCollection(target)) throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](ERR.DEST);
      var result = new Notation(target).inspect(notation);

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
     *  @returns {Notation} - Returns the current `Notation` instance (self).
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
      if (!_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isCollection(destination)) throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](ERR.DEST);
      var result = this.inspectRemove(notation);

      if (result.has) {
        var newN = _utils__WEBPACK_IMPORTED_MODULE_2__["utils"].getNewNotation(newNotation, notation);
        new Notation(destination).set(newN, result.value, overwrite);
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
     *  @returns {Notation} - Returns the current `Notation` instance (self).
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
      if (!_utils__WEBPACK_IMPORTED_MODULE_2__["utils"].isCollection(target)) throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](ERR.DEST);
      var result = new Notation(target).inspectRemove(notation);

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
     *  @returns {Notation} - Returns the current `Notation` instance (self).
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
     *      notation path does not exist on the source. (Note that `.inspect()`
     *      and `.inspectRemove()` methods are exceptions). It's recommended to
     *      set this to `true` and prevent silent failures if you're working
     *      with sensitive data. Regardless of `strict` option, it will always
     *      throw on invalid notation syntax or other crucial failures.
     *      @param {Boolean} [options.preserveIndices=true] - Indicates whether to
     *      preserve the indices of the parent array when an item is to be removed.
     *      By default indices are preserved by emptying the item (sparse array),
     *      instead of removing the item completely at the index. When this is
     *      disabled; you should mind the shifted indices when you remove an
     *      item via `.remove()`, `.inspectRemove()` or `.filter()`.
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
      this._options = _objectSpread({}, DEFAULT_OPTS, this._options || {}, value || {});
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
        throw new _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"](ERR.NOTATION + "'".concat(notation, "'"));
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


Notation.Error = _notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"];
/**
 *  Utility for validating, comparing and sorting dot-notation globs.
 *  This is internally used by `Notation` class.
 *  @private
 *
 *  @class
 *  @see `{@link #Notation.Glob}`
 */

Notation.Glob = _notation_glob__WEBPACK_IMPORTED_MODULE_1__["NotationGlob"];
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
 *  @param {String} parentNotation  Storage for parent (previous) notation.
 *  @param {Collection} topSource  Storage for initial/main collection.
 *  @param {Boolean} [byLevel=false]  Indicates whether to iterate notations by
 *  each level or by the end value.  For example, if we have a collection of
 *  `{a: { b: true } }`, and `byLevel` is set; the callback will be invoked on
 *  the following notations: `a`, `a.b`. Otherwise, it will be invoked only on
 *  `a.b`.
 *  @returns {void}
 */

function _each(collection, callback, parentNotation, topSource) {
  var byLevel = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
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


    if (isCollection) _each(value, callback, currentNotation, source, byLevel);
  });
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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var objProto = Object.prototype;
var symValueOf = Symbol.prototype.valueOf; // never use 'g' (global) flag in regexps below

var VAR = /^[a-z$_][a-z$_\d]*$/i;
var ARRAY_NOTE = /^\[(\d+)\]$/;
var ARRAY_GLOB_NOTE = /^\[(\d+|\*)\]$/;
var OBJECT_BRACKETS = /^\[(?:'(.*)'|"(.*)"|`(.*)`)\]$/;
var WILDCARD = /^(\[\*\]|\*)$/; // matches `*` and `[*]` if outside of quotes.

var WILDCARDS = /(\*|\[\*\])(?=(?:[^"]|"[^"]*")*$)(?=(?:[^']|'[^']*')*$)/; // matches trailing wildcards at the end of a non-negated glob.
// e.g. `x.y.*[*].*` » $1 = `x.y`, $2 = `.*[*].*`

var NON_NEG_WILDCARD_TRAIL = /^(?!!)(.+?)(\.\*|\[\*\])+$/;
var NEGATE_ALL = /^!(\*|\[\*\])$/;
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
  hasOwn: function hasOwn(collection, keyOrIndex) {
    if (!collection) return false;
    var isArr = utils.type(collection) === 'array';

    if (!isArr && typeof keyOrIndex === 'string') {
      return keyOrIndex && objProto.hasOwnProperty.call(collection, keyOrIndex);
    }

    if (typeof keyOrIndex === 'number') {
      return keyOrIndex >= 0 && keyOrIndex < collection.length;
    }

    return false;
  },
  deepCopy: function deepCopy(collection) {
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
        return Object(symValueOf.call(collection));

      case 'array':
        return collection.map(utils.deepCopy);

      case 'object':
        {
          var _copy = {}; // Plain objects are not iterable.
          // `for (const k of collection) {}` will not work here.

          var _arr = Object.entries(collection);

          for (var _i = 0; _i < _arr.length; _i++) {
            var _arr$_i = _slicedToArray(_arr[_i], 2),
                k = _arr$_i[0],
                value = _arr$_i[1];

            var v = utils.deepCopy(value);

            if (k === '__proto__') {
              Object.defineProperty(_copy, k, {
                configurable: true,
                enumerable: true,
                value: v,
                writable: true
              });
            } else {
              _copy[k] = v;
            }
          }

          return _copy;
        }
      // case 'string':
      // case 'number':
      // case 'boolean':
      // case 'null':
      // case 'undefined':

      default:
        // other
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
    if (utils.type(collection) === 'array') {
      return utils.each(collection, callback, thisArg);
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
  normalizeGlobStr: function normalizeGlobStr(glob) {
    return glob.trim().replace(NON_NEG_WILDCARD_TRAIL, '$1');
  },
  normalizeNote: function normalizeNote(note) {
    if (VAR.test(note)) return note; // check array index notation e.g. `[1]`

    var m = note.match(ARRAY_NOTE);
    if (m) return parseInt(m[1], 10); // check object bracket notation e.g. `["a-b"]`

    m = note.match(OBJECT_BRACKETS);
    if (m) return m[1] || m[2] || m[3];
    throw new _core_notation_error__WEBPACK_IMPORTED_MODULE_0__["NotationError"]("Invalid note: \"".concat(note, "\""));
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