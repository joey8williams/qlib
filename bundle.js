/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domQuery = __webpack_require__(1);

module.exports = _domQuery.domQuery; //const domQuery = require('./source/domQuery.js').default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
The options:
.querySelector()
.querySelectorAll()
.getElementById() //SINGULAR
.getElementsByClassName()
.getElementsByTagName()
*/
//this is the only 
module.exports.query = query;
module.exports.queryOne = queryOne;

//Testing purposes only
if (process.env.NODE_ENV === "test") {
  module.exports._selectorHandler = _selectorHandler;
  module.exports._selectorHandlerSingular = _selectorHandlerSingular;
  module.exports._selectorParser = _selectorParser;
}

//@reqParam('selectorString')
function query(selectorString) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (selectorString == null) throw new Error('No selectorString specified');
  //check for singular queries
  if (limit == 1) return this.one(selectorString);

  var _selectorHandler2 = this._selectorHandler(selectorString),
      methodCall = _selectorHandler2.methodCall,
      selector = _selectorHandler2.selector;

  switch (methodCall) {
    case 'class':
      return this._getByClass(selector, parent, limit);

    case 'tag':
      return this._getByTagName(selector, parent, limit);

    case 'generic':
      return this._generic(selectorString, parent, null);

    default:
      return null;
  }
}

//one is the same as domQuery.find where limit = 1
//@reqParam('selectorString')
function queryOne(selectorString) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  if (selectorString == null) throw new Error('No selectorString specified');

  var _selectorHandlerSingu = this._selectorHandlerSingular(selectorString),
      methodCall = _selectorHandlerSingu.methodCall,
      selector = _selectorHandlerSingu.selector;

  switch (methodCall) {
    case 'id':
      return this._getById(selector, parent);

    case 'generic':
      return this._genericSingular(selectorString, parent);

    default:
      return null;
  }
}

//Split the selection string handlers into two seperate functions to reduce the noise of the non-singular
function _selectorHandlerSingular(selectorString) {
  //search for id's since there is a more performant option
  var byId = selectorString.match(/^[#]/);
  byId = selectorString.match(/^[[]/) && selectorString.includes('[id=') || byId;
  byId = byId && !selectorString.match(/[ .>:()]/);

  var method = byId ? 'id' : 'generic';
  var selector = _selectorParser(selectorString, method);

  return {
    methodCall: method,
    selector: selector
  };
}

//@reqParam('selectorString')
function _selectorHandler(selectorString) {
  //search for classes and tagnames since there is a more performant option
  var byClass = selectorString.match(/^[.]/);
  byClass = selectorString.includes('[class=') || byClass;
  //make sure the string has words, and nothing but words, hyphens are allowed because they don't violate html
  var byTag = selectorString.match(/\w/) && !selectorString.match(/[.#[\]> :()]/); //TODO: FIND A GOOD REGEX FOR THIS


  var method = byClass ? 'class' : byTag ? 'tag' : 'generic';
  var selector = _selectorParser(selectorString, method);
  return {
    methodCall: method,
    selector: selector
  };
}

function _selectorParser(selectorString, method) {
  var errorMessage = 'Improper formatted selectorString';
  var parseSelector = function parseSelector(item, methodName) {

    var getContents = function getContents(fullContents, boundaryCharacter) {
      var rexexp = boundaryCharacter + '(.*?)' + boundaryCharacter;
      var re = new RegExp(rexexp);
      return fullContents.match(re)[1];
    };

    var shortHandCharacter = methodName == 'class' ? '.' : '#'; //Only get by class and id will call this function

    if (item.includes(shortHandCharacter)) {
      var arr = item.split(shortHandCharacter); //return the className that occurs after the period.

      if (arr[1].trim().length > 1) return arr[1];else throw new Error(errorMessage);
    } else if (item.match(/[[\]]/)) {
      if (item.match(/[']/)) return getContents(item, "'");else if (selectorString.match(/["]/)) return getContents(item, '"');else throw new Error(errorMessage);
    } else throw new Error(errorMessage);
  };

  var endsWithSpecialCharacter = selectorString.match(/$[.#]/);
  if (endsWithSpecialCharacter) throw new Error(errorMessage);

  switch (method) {
    case 'class':
      return parseSelector(selectorString, method);
    case 'id':
      return parseSelector(selectorString, method);
    default:
      return selectorString; //If its by tagname, there is nothing else in the string with the tag name
  }
}

//for singular queries that aren't specified by id
function _genericSingular(selectorString) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return parent.querySelector(selectorString);
}

//for #idName queries
function _getById(selectorString) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return parent.getElementById(selectorString);
}

//this is the route to take when there aren't any qualified selectors e.g. .className or #idName
function _generic(selectorString) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return [].concat(_toConsumableArray(parent.querySelectorAll(selectorString)));
}

//when the user does a .className queries 
function _getByClass(selectorString) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return [].concat(_toConsumableArray(parent.getElementsByClassName(selectorString)));
}

//when the user passes in a string with no special characters
function _getByTagName(selectorString) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return [].concat(_toConsumableArray(parent.getElementsByTagName(selectorString)));
}

function reqParam(value) {
  return function (target, name, descriptor) {
    var original = descriptor.value;
    if (typeof original == "function") {
      descriptor.value = function () {
        try {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return args[value] != null ? original.apply(this, args) : null;
        } catch (e) {
          console.log(e);
          throw e;
        }
      };
    }
    return descriptor;
  };
}

//module.exports = new domQuery();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);