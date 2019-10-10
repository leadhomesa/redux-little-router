(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReduxLittleRouter"] = factory(require("react"));
	else
		root["ReduxLittleRouter"] = factory(root["React"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_query_string__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_query_string__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





/* harmony default export */ __webpack_exports__["a"] = (function (href) {
  if (typeof href === 'string') {
    var _parsePath = Object(__WEBPACK_IMPORTED_MODULE_0_history__["a" /* parsePath */])(href),
        _parsePath$search = _parsePath.search,
        _search = _parsePath$search === undefined ? '' : _parsePath$search,
        other = _objectWithoutProperties(_parsePath, ['search']);

    var _query = _search && __WEBPACK_IMPORTED_MODULE_1_query_string___default.a.parse(_search);

    return _query ? _extends({}, other, { query: _query, search: _search }) : _extends({}, other);
  }

  var search = href.search,
      query = href.query;


  var resolvedSearch = search || query && Object.keys(query).length && '?' + __WEBPACK_IMPORTED_MODULE_1_query_string___default.a.stringify(query) || '';
  var resolvedQuery = query || __WEBPACK_IMPORTED_MODULE_1_query_string___default.a.parse(search || '');

  return _extends({}, href, {
    search: resolvedSearch,
    query: resolvedQuery
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return LOCATION_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return PUSH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return REPLACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return GO_BACK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return GO_FORWARD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return POP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BLOCK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return UNBLOCK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return REPLACE_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DID_REPLACE_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return isNavigationAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return isNavigationActionWithPayload; });


var LOCATION_CHANGED = 'ROUTER_LOCATION_CHANGED';

var PUSH = 'ROUTER_PUSH';
var REPLACE = 'ROUTER_REPLACE';
var GO = 'ROUTER_GO';
var GO_BACK = 'ROUTER_GO_BACK';
var GO_FORWARD = 'ROUTER_GO_FORWARD';
var POP = 'ROUTER_POP';
var BLOCK = 'ROUTER_BLOCK';
var UNBLOCK = 'ROUTER_UNBLOCK';
var REPLACE_ROUTES = 'ROUTER_REPLACE_ROUTES';
var DID_REPLACE_ROUTES = 'ROUTER_DID_REPLACE_ROUTES';

var actionsWithPayload = [PUSH, REPLACE, GO, POP];
var actions = [].concat(actionsWithPayload, [GO_FORWARD, GO_BACK, POP, BLOCK, UNBLOCK]);

var isNavigationAction = function isNavigationAction(action) {
  return actions.indexOf(action.type) !== -1;
};

var isNavigationActionWithPayload = function isNavigationActionWithPayload(action) {
  return actionsWithPayload.indexOf(action.type) !== -1;
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _extends;
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reducer__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__middleware__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enhancer__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_create_installer__ = __webpack_require__(52);






/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3__util_create_installer__["a" /* default */])({ reducer: __WEBPACK_IMPORTED_MODULE_0__reducer__["a" /* default */], middleware: __WEBPACK_IMPORTED_MODULE_1__middleware__["a" /* default */], enhancer: __WEBPACK_IMPORTED_MODULE_2__enhancer__["a" /* default */] }));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = __webpack_require__(7);

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(64)(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(66)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(62);
} else {
  module.exports = __webpack_require__(63);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return push; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return replace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return go; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return goBack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return goForward; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return unblock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return locationDidChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return initializeCurrentLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return replaceRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return didReplaceRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_normalize_href__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_flatten_routes__ = __webpack_require__(21);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






var push = function push(href) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__types__["h" /* PUSH */],
    payload: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1__util_normalize_href__["a" /* default */])(href), { options: options })
  };
};

var replace = function replace(href) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__types__["i" /* REPLACE */],
    payload: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1__util_normalize_href__["a" /* default */])(href), { options: options })
  };
};

var go = function go(index) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__types__["c" /* GO */],
    payload: index
  };
};

var goBack = function goBack() {
  return { type: __WEBPACK_IMPORTED_MODULE_0__types__["d" /* GO_BACK */] };
};
var goForward = function goForward() {
  return { type: __WEBPACK_IMPORTED_MODULE_0__types__["e" /* GO_FORWARD */] };
};

var block = function block(historyShouldBlock) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__types__["a" /* BLOCK */],
    payload: historyShouldBlock
  };
};

var unblock = function unblock() {
  return { type: __WEBPACK_IMPORTED_MODULE_0__types__["k" /* UNBLOCK */] };
};

var locationDidChange = function locationDidChange(location) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__types__["f" /* LOCATION_CHANGED */],
    payload: location
  };
};

var initializeCurrentLocation = function initializeCurrentLocation(location) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__types__["f" /* LOCATION_CHANGED */],
    payload: location
  };
};

var replaceRoutes = function replaceRoutes(routes) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__types__["j" /* REPLACE_ROUTES */],
    payload: {
      routes: Object(__WEBPACK_IMPORTED_MODULE_2__util_flatten_routes__["a" /* default */])(routes),
      options: {
        updateRoutes: true
      }
    }
  };
};

var didReplaceRoutes = function didReplaceRoutes() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__types__["b" /* DID_REPLACE_ROUTES */]
  };
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';

  var toParts = (to && to.split('/')) || [];
  var fromParts = (from && from.split('/')) || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ __webpack_exports__["default"] = (resolvePathname);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function valueOf(obj) {
  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);
}

function valueEqual(a, b) {
  // Test for strict equality first.
  if (a === b) return true;

  // Otherwise, if either of them == null they are not equal.
  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return (
      Array.isArray(b) &&
      a.length === b.length &&
      a.every(function(item, index) {
        return valueEqual(item, b[index]);
      })
    );
  }

  if (typeof a === 'object' || typeof b === 'object') {
    var aValue = valueOf(a);
    var bValue = valueOf(b);

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    return Object.keys(Object.assign({}, a, b)).every(function(key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ __webpack_exports__["default"] = (valueEqual);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {var isProduction = process.env.NODE_ENV === 'production';
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }

    var text = "Warning: " + message;

    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {}
  }
}

/* harmony default export */ __webpack_exports__["default"] = (warning);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {var isProduction = process.env.NODE_ENV === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  } else {
    throw new Error(prefix + ": " + (message || ''));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (invariant);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(42);
var objectAssign = __webpack_require__(20);
var decodeComponent = __webpack_require__(43);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

function extract(str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
}

function parse(str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^[?#&]/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	if (opts.sort === false) {
		opts.sort = function () {};
	}

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort(opts.sort).map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

exports.parseUrl = function (str, opts) {
	return {
		url: str.split('?')[0] || '',
		query: parse(extract(str), opts)
	};
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(format, subs) {
    var index = 0;
    var message =
      'Warning: ' +
      (subs.length > 0
        ? format.replace(/%s/g, function() {
            return subs[index++];
          })
        : format);

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging history ---
      // This error was thrown as a convenience so that you can use the
      // stack trace to find the callsite that triggered this warning.
      throw new Error(message);
    } catch (e) {}
  };
}

module.exports = function(member) {
  printWarning(
    'Please use `require("history").%s` instead of `require("history/%s")`. ' +
      'Support for the latter will be removed in the next major release.',
    [member, member]
  );
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(47);
} else {
  module.exports = __webpack_require__(48);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_query_string__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/* harmony default export */ __webpack_exports__["a"] = (function (oldQuery, newQuery) {
  var mergedQuery = _extends({}, oldQuery, newQuery);
  var search = '?' + __WEBPACK_IMPORTED_MODULE_0_query_string___default.a.stringify(mergedQuery);

  return {
    query: mergedQuery,
    search: search
  };
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */

}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _objectWithoutPropertiesLoose;
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_assign__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_assign__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var filterObject = function filterObject(target, predicate) {
  return Object.keys(target).reduce(function (acc, key) {
    return predicate(key) ? _extends({}, acc, _defineProperty({}, key, target[key])) : acc;
  }, {});
};

var mapObject = function mapObject(target, transformKey, transformValue) {
  return Object.keys(target).reduce(function (acc, key) {
    var newKey = transformKey ? transformKey(key) : key;
    var newValue = transformValue ? transformValue(target[key]) : target[key];
    return _extends({}, acc, _defineProperty({}, newKey, newValue));
  }, {});
};

var onlyRoutes = function onlyRoutes(routes) {
  return filterObject(routes, function (key) {
    return key.indexOf('/') === 0;
  });
};

var withoutRoutes = function withoutRoutes(routes) {
  return filterObject(routes, function (key) {
    return key.indexOf('/') !== 0;
  });
};

var flattenRoutes = function flattenRoutes(routes) {
  var acc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  Object.keys(routes).forEach(function (key) {
    var baseRoute = key === '/' ? '' : key;
    flattenRoutes(mapObject(onlyRoutes(routes[key]), function (routeKey) {
      return '' + baseRoute + routeKey;
    }, function (routeValue) {
      return _extends({}, routeValue, {
        parent: _extends({}, withoutRoutes(routes[key]), {
          route: key
        })
      });
    }), acc);
  });

  __WEBPACK_IMPORTED_MODULE_0_lodash_assign___default()(acc, mapObject(routes, null, withoutRoutes));

  return acc;
};

/* harmony default export */ __webpack_exports__["a"] = (flattenRoutes);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MatchCache */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ROUTE_FALLBACK = '@ROUTE_FALLBACK';

var MatchCache = function () {
  function MatchCache() {
    _classCallCheck(this, MatchCache);

    this._data = {};
  }

  _createClass(MatchCache, [{
    key: 'add',
    value: function add(parentId, route) {
      this._data[parentId] = route || ROUTE_FALLBACK;
    }
  }, {
    key: 'get',
    value: function get(parentId) {
      return this._data[parentId] || null;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this._data = {};
    }
  }]);

  return MatchCache;
}();

/* harmony default export */ __webpack_exports__["a"] = (new MatchCache());

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.10.0
var slice = [].slice;

(function(root, factory) {
  if (('function' === "function") && (__webpack_require__(54) != null)) {
    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined" && exports !== null) {
    return module.exports = factory();
  } else {
    return root.UrlPattern = factory();
  }
})(this, function() {
  var P, UrlPattern, astNodeContainsSegmentsForProvidedParams, astNodeToNames, astNodeToRegexString, baseAstNodeToRegexString, concatMap, defaultOptions, escapeForRegex, getParam, keysAndValuesToObject, newParser, regexGroupCount, stringConcatMap, stringify;
  escapeForRegex = function(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  concatMap = function(array, f) {
    var i, length, results;
    results = [];
    i = -1;
    length = array.length;
    while (++i < length) {
      results = results.concat(f(array[i]));
    }
    return results;
  };
  stringConcatMap = function(array, f) {
    var i, length, result;
    result = '';
    i = -1;
    length = array.length;
    while (++i < length) {
      result += f(array[i]);
    }
    return result;
  };
  regexGroupCount = function(regex) {
    return (new RegExp(regex.toString() + '|')).exec('').length - 1;
  };
  keysAndValuesToObject = function(keys, values) {
    var i, key, length, object, value;
    object = {};
    i = -1;
    length = keys.length;
    while (++i < length) {
      key = keys[i];
      value = values[i];
      if (value == null) {
        continue;
      }
      if (object[key] != null) {
        if (!Array.isArray(object[key])) {
          object[key] = [object[key]];
        }
        object[key].push(value);
      } else {
        object[key] = value;
      }
    }
    return object;
  };
  P = {};
  P.Result = function(value, rest) {
    this.value = value;
    this.rest = rest;
  };
  P.Tagged = function(tag, value) {
    this.tag = tag;
    this.value = value;
  };
  P.tag = function(tag, parser) {
    return function(input) {
      var result, tagged;
      result = parser(input);
      if (result == null) {
        return;
      }
      tagged = new P.Tagged(tag, result.value);
      return new P.Result(tagged, result.rest);
    };
  };
  P.regex = function(regex) {
    return function(input) {
      var matches, result;
      matches = regex.exec(input);
      if (matches == null) {
        return;
      }
      result = matches[0];
      return new P.Result(result, input.slice(result.length));
    };
  };
  P.sequence = function() {
    var parsers;
    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return function(input) {
      var i, length, parser, rest, result, values;
      i = -1;
      length = parsers.length;
      values = [];
      rest = input;
      while (++i < length) {
        parser = parsers[i];
        result = parser(rest);
        if (result == null) {
          return;
        }
        values.push(result.value);
        rest = result.rest;
      }
      return new P.Result(values, rest);
    };
  };
  P.pick = function() {
    var indexes, parsers;
    indexes = arguments[0], parsers = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return function(input) {
      var array, result;
      result = P.sequence.apply(P, parsers)(input);
      if (result == null) {
        return;
      }
      array = result.value;
      result.value = array[indexes];
      return result;
    };
  };
  P.string = function(string) {
    var length;
    length = string.length;
    return function(input) {
      if (input.slice(0, length) === string) {
        return new P.Result(string, input.slice(length));
      }
    };
  };
  P.lazy = function(fn) {
    var cached;
    cached = null;
    return function(input) {
      if (cached == null) {
        cached = fn();
      }
      return cached(input);
    };
  };
  P.baseMany = function(parser, end, stringResult, atLeastOneResultRequired, input) {
    var endResult, parserResult, rest, results;
    rest = input;
    results = stringResult ? '' : [];
    while (true) {
      if (end != null) {
        endResult = end(rest);
        if (endResult != null) {
          break;
        }
      }
      parserResult = parser(rest);
      if (parserResult == null) {
        break;
      }
      if (stringResult) {
        results += parserResult.value;
      } else {
        results.push(parserResult.value);
      }
      rest = parserResult.rest;
    }
    if (atLeastOneResultRequired && results.length === 0) {
      return;
    }
    return new P.Result(results, rest);
  };
  P.many1 = function(parser) {
    return function(input) {
      return P.baseMany(parser, null, false, true, input);
    };
  };
  P.concatMany1Till = function(parser, end) {
    return function(input) {
      return P.baseMany(parser, end, true, true, input);
    };
  };
  P.firstChoice = function() {
    var parsers;
    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return function(input) {
      var i, length, parser, result;
      i = -1;
      length = parsers.length;
      while (++i < length) {
        parser = parsers[i];
        result = parser(input);
        if (result != null) {
          return result;
        }
      }
    };
  };
  newParser = function(options) {
    var U;
    U = {};
    U.wildcard = P.tag('wildcard', P.string(options.wildcardChar));
    U.optional = P.tag('optional', P.pick(1, P.string(options.optionalSegmentStartChar), P.lazy(function() {
      return U.pattern;
    }), P.string(options.optionalSegmentEndChar)));
    U.name = P.regex(new RegExp("^[" + options.segmentNameCharset + "]+"));
    U.named = P.tag('named', P.pick(1, P.string(options.segmentNameStartChar), P.lazy(function() {
      return U.name;
    })));
    U.escapedChar = P.pick(1, P.string(options.escapeChar), P.regex(/^./));
    U["static"] = P.tag('static', P.concatMany1Till(P.firstChoice(P.lazy(function() {
      return U.escapedChar;
    }), P.regex(/^./)), P.firstChoice(P.string(options.segmentNameStartChar), P.string(options.optionalSegmentStartChar), P.string(options.optionalSegmentEndChar), U.wildcard)));
    U.token = P.lazy(function() {
      return P.firstChoice(U.wildcard, U.optional, U.named, U["static"]);
    });
    U.pattern = P.many1(P.lazy(function() {
      return U.token;
    }));
    return U;
  };
  defaultOptions = {
    escapeChar: '\\',
    segmentNameStartChar: ':',
    segmentValueCharset: 'a-zA-Z0-9-_~ %',
    segmentNameCharset: 'a-zA-Z0-9',
    optionalSegmentStartChar: '(',
    optionalSegmentEndChar: ')',
    wildcardChar: '*'
  };
  baseAstNodeToRegexString = function(astNode, segmentValueCharset) {
    if (Array.isArray(astNode)) {
      return stringConcatMap(astNode, function(node) {
        return baseAstNodeToRegexString(node, segmentValueCharset);
      });
    }
    switch (astNode.tag) {
      case 'wildcard':
        return '(.*?)';
      case 'named':
        return "([" + segmentValueCharset + "]+)";
      case 'static':
        return escapeForRegex(astNode.value);
      case 'optional':
        return '(?:' + baseAstNodeToRegexString(astNode.value, segmentValueCharset) + ')?';
    }
  };
  astNodeToRegexString = function(astNode, segmentValueCharset) {
    if (segmentValueCharset == null) {
      segmentValueCharset = defaultOptions.segmentValueCharset;
    }
    return '^' + baseAstNodeToRegexString(astNode, segmentValueCharset) + '$';
  };
  astNodeToNames = function(astNode) {
    if (Array.isArray(astNode)) {
      return concatMap(astNode, astNodeToNames);
    }
    switch (astNode.tag) {
      case 'wildcard':
        return ['_'];
      case 'named':
        return [astNode.value];
      case 'static':
        return [];
      case 'optional':
        return astNodeToNames(astNode.value);
    }
  };
  getParam = function(params, key, nextIndexes, sideEffects) {
    var index, maxIndex, result, value;
    if (sideEffects == null) {
      sideEffects = false;
    }
    value = params[key];
    if (value == null) {
      if (sideEffects) {
        throw new Error("no values provided for key `" + key + "`");
      } else {
        return;
      }
    }
    index = nextIndexes[key] || 0;
    maxIndex = Array.isArray(value) ? value.length - 1 : 0;
    if (index > maxIndex) {
      if (sideEffects) {
        throw new Error("too few values provided for key `" + key + "`");
      } else {
        return;
      }
    }
    result = Array.isArray(value) ? value[index] : value;
    if (sideEffects) {
      nextIndexes[key] = index + 1;
    }
    return result;
  };
  astNodeContainsSegmentsForProvidedParams = function(astNode, params, nextIndexes) {
    var i, length;
    if (Array.isArray(astNode)) {
      i = -1;
      length = astNode.length;
      while (++i < length) {
        if (astNodeContainsSegmentsForProvidedParams(astNode[i], params, nextIndexes)) {
          return true;
        }
      }
      return false;
    }
    switch (astNode.tag) {
      case 'wildcard':
        return getParam(params, '_', nextIndexes, false) != null;
      case 'named':
        return getParam(params, astNode.value, nextIndexes, false) != null;
      case 'static':
        return false;
      case 'optional':
        return astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes);
    }
  };
  stringify = function(astNode, params, nextIndexes) {
    if (Array.isArray(astNode)) {
      return stringConcatMap(astNode, function(node) {
        return stringify(node, params, nextIndexes);
      });
    }
    switch (astNode.tag) {
      case 'wildcard':
        return getParam(params, '_', nextIndexes, true);
      case 'named':
        return getParam(params, astNode.value, nextIndexes, true);
      case 'static':
        return astNode.value;
      case 'optional':
        if (astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes)) {
          return stringify(astNode.value, params, nextIndexes);
        } else {
          return '';
        }
    }
  };
  UrlPattern = function(arg1, arg2) {
    var groupCount, options, parsed, parser, withoutWhitespace;
    if (arg1 instanceof UrlPattern) {
      this.isRegex = arg1.isRegex;
      this.regex = arg1.regex;
      this.ast = arg1.ast;
      this.names = arg1.names;
      return;
    }
    this.isRegex = arg1 instanceof RegExp;
    if (!(('string' === typeof arg1) || this.isRegex)) {
      throw new TypeError('argument must be a regex or a string');
    }
    if (this.isRegex) {
      this.regex = arg1;
      if (arg2 != null) {
        if (!Array.isArray(arg2)) {
          throw new Error('if first argument is a regex the second argument may be an array of group names but you provided something else');
        }
        groupCount = regexGroupCount(this.regex);
        if (arg2.length !== groupCount) {
          throw new Error("regex contains " + groupCount + " groups but array of group names contains " + arg2.length);
        }
        this.names = arg2;
      }
      return;
    }
    if (arg1 === '') {
      throw new Error('argument must not be the empty string');
    }
    withoutWhitespace = arg1.replace(/\s+/g, '');
    if (withoutWhitespace !== arg1) {
      throw new Error('argument must not contain whitespace');
    }
    options = {
      escapeChar: (arg2 != null ? arg2.escapeChar : void 0) || defaultOptions.escapeChar,
      segmentNameStartChar: (arg2 != null ? arg2.segmentNameStartChar : void 0) || defaultOptions.segmentNameStartChar,
      segmentNameCharset: (arg2 != null ? arg2.segmentNameCharset : void 0) || defaultOptions.segmentNameCharset,
      segmentValueCharset: (arg2 != null ? arg2.segmentValueCharset : void 0) || defaultOptions.segmentValueCharset,
      optionalSegmentStartChar: (arg2 != null ? arg2.optionalSegmentStartChar : void 0) || defaultOptions.optionalSegmentStartChar,
      optionalSegmentEndChar: (arg2 != null ? arg2.optionalSegmentEndChar : void 0) || defaultOptions.optionalSegmentEndChar,
      wildcardChar: (arg2 != null ? arg2.wildcardChar : void 0) || defaultOptions.wildcardChar
    };
    parser = newParser(options);
    parsed = parser.pattern(arg1);
    if (parsed == null) {
      throw new Error("couldn't parse pattern");
    }
    if (parsed.rest !== '') {
      throw new Error("could only partially parse pattern");
    }
    this.ast = parsed.value;
    this.regex = new RegExp(astNodeToRegexString(this.ast, options.segmentValueCharset));
    this.names = astNodeToNames(this.ast);
  };
  UrlPattern.prototype.match = function(url) {
    var groups, match;
    match = this.regex.exec(url);
    if (match == null) {
      return null;
    }
    groups = match.slice(1);
    if (this.names) {
      return keysAndValuesToObject(this.names, groups);
    } else {
      return groups;
    }
  };
  UrlPattern.prototype.stringify = function(params) {
    if (params == null) {
      params = {};
    }
    if (this.isRegex) {
      throw new Error("can't stringify patterns generated from a regex");
    }
    if (params !== Object(params)) {
      throw new Error("argument must be an object or undefined");
    }
    return stringify(this.ast, params, {});
  };
  UrlPattern.escapeForRegex = escapeForRegex;
  UrlPattern.concatMap = concatMap;
  UrlPattern.stringConcatMap = stringConcatMap;
  UrlPattern.regexGroupCount = regexGroupCount;
  UrlPattern.keysAndValuesToObject = keysAndValuesToObject;
  UrlPattern.P = P;
  UrlPattern.newParser = newParser;
  UrlPattern.defaultOptions = defaultOptions;
  UrlPattern.astNodeToRegexString = astNodeToRegexString;
  UrlPattern.astNodeToNames = astNodeToNames;
  UrlPattern.getParam = getParam;
  UrlPattern.astNodeContainsSegmentsForProvidedParams = astNodeContainsSegmentsForProvidedParams;
  UrlPattern.stringify = stringify;
  return UrlPattern;
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (errorMsg) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var argsString = args.reduce(function (str, arg) {
      return '' + (str && str + ', ') + arg;
    }, '');
    throw new Error((errorMsg && errorMsg + ' ') + ' ' + (argsString && 'Was called with arguments ' + argsString + '.'));
  };
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(14)('createMemoryHistory');
module.exports = __webpack_require__(15).createMemoryHistory;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Provider__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_connectAdvanced__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connect_connect__ = __webpack_require__(71);
/* unused harmony reexport Provider */
/* unused harmony reexport createProvider */
/* unused harmony reexport connectAdvanced */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__connect_connect__["a"]; });





/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _inheritsLoose;
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return subscriptionShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return storeShape; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);

var subscriptionShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  trySubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  tryUnsubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  notifyNestedSubs: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  isSubscribed: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});
var storeShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  subscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  dispatch: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  getState: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = connectAdvanced;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_inheritsLoose__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_esm_assertThisInitialized__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_esm_extends__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_esm_objectWithoutPropertiesLoose__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hoist_non_react_statics__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_invariant__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_is__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_is___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_is__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_Subscription__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_PropTypes__ = __webpack_require__(28);










var prefixUnsafeLifecycleMethods = typeof __WEBPACK_IMPORTED_MODULE_6_react___default.a.forwardRef !== "undefined";
var hotReloadingVersion = 0;
var dummyState = {};

function noop() {}

function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);

        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };
  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory, // options object:
_ref) {
  var _contextTypes, _childContextTypes;

  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      _ref2$getDisplayName = _ref2.getDisplayName,
      getDisplayName = _ref2$getDisplayName === void 0 ? function (name) {
    return "ConnectAdvanced(" + name + ")";
  } : _ref2$getDisplayName,
      _ref2$methodName = _ref2.methodName,
      methodName = _ref2$methodName === void 0 ? 'connectAdvanced' : _ref2$methodName,
      _ref2$renderCountProp = _ref2.renderCountProp,
      renderCountProp = _ref2$renderCountProp === void 0 ? undefined : _ref2$renderCountProp,
      _ref2$shouldHandleSta = _ref2.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref2$shouldHandleSta === void 0 ? true : _ref2$shouldHandleSta,
      _ref2$storeKey = _ref2.storeKey,
      storeKey = _ref2$storeKey === void 0 ? 'store' : _ref2$storeKey,
      _ref2$withRef = _ref2.withRef,
      withRef = _ref2$withRef === void 0 ? false : _ref2$withRef,
      connectOptions = Object(__WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_esm_objectWithoutPropertiesLoose__["a" /* default */])(_ref2, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef"]);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;
  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = __WEBPACK_IMPORTED_MODULE_9__utils_PropTypes__["a" /* storeShape */], _contextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_9__utils_PropTypes__["b" /* subscriptionShape */], _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_9__utils_PropTypes__["b" /* subscriptionShape */], _childContextTypes);
  return function wrapWithConnect(WrappedComponent) {
    __WEBPACK_IMPORTED_MODULE_5_invariant___default()(Object(__WEBPACK_IMPORTED_MODULE_7_react_is__["isValidElementType"])(WrappedComponent), "You must pass a component to the function returned by " + (methodName + ". Instead received " + JSON.stringify(WrappedComponent)));
    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = Object(__WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_esm_extends__["a" /* default */])({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent // TODO Actually fix our use of componentWillReceiveProps

      /* eslint-disable react/no-deprecated */

    });

    var Connect =
    /*#__PURE__*/
    function (_Component) {
      Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_inheritsLoose__["a" /* default */])(Connect, _Component);

      function Connect(props, context) {
        var _this;

        _this = _Component.call(this, props, context) || this;
        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_esm_assertThisInitialized__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_esm_assertThisInitialized__["a" /* default */])(_this)));
        __WEBPACK_IMPORTED_MODULE_5_invariant___default()(_this.store, "Could not find \"" + storeKey + "\" in either the context or props of " + ("\"" + displayName + "\". Either wrap the root component in a <Provider>, ") + ("or explicitly pass \"" + storeKey + "\" as a prop to \"" + displayName + "\"."));

        _this.initSelector();

        _this.initSubscription();

        return _this;
      }

      var _proto = Connect.prototype;

      _proto.getChildContext = function getChildContext() {
        var _ref3;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref3 = {}, _ref3[subscriptionKey] = subscription || this.context[subscriptionKey], _ref3;
      };

      _proto.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return; // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.

        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      }; // Note: this is renamed below to the UNSAFE_ version in React >=16.3.0


      _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      _proto.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      _proto.getWrappedInstance = function getWrappedInstance() {
        __WEBPACK_IMPORTED_MODULE_5_invariant___default()(withRef, "To access the wrapped instance, you need to specify " + ("{ withRef: true } in the options argument of the " + methodName + "() call."));
        return this.wrappedInstance;
      };

      _proto.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      _proto.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      _proto.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return; // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.

        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new __WEBPACK_IMPORTED_MODULE_8__utils_Subscription__["a" /* default */](this.store, parentSub, this.onStateChange.bind(this)); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.

        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      _proto.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      _proto.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      _proto.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      _proto.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props; // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad

        var withExtras = Object(__WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_esm_extends__["a" /* default */])({}, props);

        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      _proto.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return Object(__WEBPACK_IMPORTED_MODULE_6_react__["createElement"])(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);

    if (prefixUnsafeLifecycleMethods) {
      // Use UNSAFE_ event name where supported
      Connect.prototype.UNSAFE_componentWillReceiveProps = Connect.prototype.componentWillReceiveProps;
      delete Connect.prototype.componentWillReceiveProps;
    }
    /* eslint-enable react/no-deprecated */


    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    if (process.env.NODE_ENV !== 'production') {
      // Use UNSAFE_ event name where supported
      var eventName = prefixUnsafeLifecycleMethods ? 'UNSAFE_componentWillUpdate' : 'componentWillUpdate';

      Connect.prototype[eventName] = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector(); // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.

          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }

          this.initSubscription();

          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return __WEBPACK_IMPORTED_MODULE_4_hoist_non_react_statics___default()(Connect, WrappedComponent);
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(83);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable__["a" /* default */]] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable__["a" /* default */]] = observable, _ref2;
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(82);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(76);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 33 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = wrapMapToPropsConstant;
/* unused harmony export getDependsOnOwnProps */
/* harmony export (immutable) */ __webpack_exports__["b"] = wrapMapToPropsFunc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__ = __webpack_require__(37);

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }

    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..

function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    

function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    }; // allow detectFactoryAndVerify to get ownProps


    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (process.env.NODE_ENV !== 'production') Object(__WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__["a" /* default */])(props, displayName, methodName);
      return props;
    };

    return proxy;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifyPlainObject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isPlainObject__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__warning__ = __webpack_require__(18);


function verifyPlainObject(value, displayName, methodName) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_0__isPlainObject__["a" /* default */])(value)) {
    Object(__WEBPACK_IMPORTED_MODULE_1__warning__["a" /* default */])(methodName + "() in " + displayName + " must return a plain object. Instead received " + value + ".");
  }
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setStatic = __webpack_require__(97);

var _setStatic2 = _interopRequireDefault(_setStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setDisplayName = function setDisplayName(displayName) {
  return (0, _setStatic2.default)('displayName', displayName);
};

exports.default = setDisplayName;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getDisplayName = __webpack_require__(98);

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + '(' + (0, _getDisplayName2.default)(BaseComponent) + ')';
};

exports.default = wrapDisplayName;

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment_browser_router__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environment_hash_router__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environment_express_router__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment_hapi_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_link__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_fragment__ = __webpack_require__(95);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "routerForBrowser", function() { return __WEBPACK_IMPORTED_MODULE_2__environment_browser_router__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "routerForExpress", function() { return __WEBPACK_IMPORTED_MODULE_4__environment_express_router__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "routerForHapi", function() { return __WEBPACK_IMPORTED_MODULE_5__environment_hapi_router__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "routerForHash", function() { return __WEBPACK_IMPORTED_MODULE_3__environment_hash_router__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "initializeCurrentLocation", function() { return __WEBPACK_IMPORTED_MODULE_1__actions__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return __WEBPACK_IMPORTED_MODULE_6__components_link__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PersistentQueryLink", function() { return __WEBPACK_IMPORTED_MODULE_6__components_link__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return __WEBPACK_IMPORTED_MODULE_7__components_fragment__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "push", function() { return __WEBPACK_IMPORTED_MODULE_1__actions__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return __WEBPACK_IMPORTED_MODULE_1__actions__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "go", function() { return __WEBPACK_IMPORTED_MODULE_1__actions__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "goBack", function() { return __WEBPACK_IMPORTED_MODULE_1__actions__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "goForward", function() { return __WEBPACK_IMPORTED_MODULE_1__actions__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "block", function() { return __WEBPACK_IMPORTED_MODULE_1__actions__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unblock", function() { return __WEBPACK_IMPORTED_MODULE_1__actions__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "replaceRoutes", function() { return __WEBPACK_IMPORTED_MODULE_1__actions__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LOCATION_CHANGED", function() { return __WEBPACK_IMPORTED_MODULE_0__types__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PUSH", function() { return __WEBPACK_IMPORTED_MODULE_0__types__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "REPLACE", function() { return __WEBPACK_IMPORTED_MODULE_0__types__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GO", function() { return __WEBPACK_IMPORTED_MODULE_0__types__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GO_FORWARD", function() { return __WEBPACK_IMPORTED_MODULE_0__types__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GO_BACK", function() { return __WEBPACK_IMPORTED_MODULE_0__types__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "POP", function() { return __WEBPACK_IMPORTED_MODULE_0__types__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BLOCK", function() { return __WEBPACK_IMPORTED_MODULE_0__types__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "UNBLOCK", function() { return __WEBPACK_IMPORTED_MODULE_0__types__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "REPLACE_ROUTES", function() { return __WEBPACK_IMPORTED_MODULE_0__types__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DID_REPLACE_ROUTES", function() { return __WEBPACK_IMPORTED_MODULE_0__types__["b"]; });














/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export createBrowserHistory */
/* unused harmony export createHashHistory */
/* unused harmony export createMemoryHistory */
/* unused harmony export createLocation */
/* unused harmony export locationsAreEqual */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parsePath; });
/* unused harmony export createPath */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_extends__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_resolve_pathname__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_value_equal__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tiny_warning__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_tiny_invariant__ = __webpack_require__(12);






function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_extends__["a" /* default */])({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = Object(__WEBPACK_IMPORTED_MODULE_1_resolve_pathname__["default"])(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}
function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && Object(__WEBPACK_IMPORTED_MODULE_2_value_equal__["default"])(a.state, b.state);
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
    process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(prompt == null, 'A history supports only one prompt at a time') : void 0;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : void 0;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ? process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["default"])(false, 'Browser history needs a DOM') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["default"])(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
    process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_extends__["a" /* default */])(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
    process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history') : void 0;
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
    process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history') : void 0;
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

function stripHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}

function pushHashPath(path) {
  window.location.hash = path;
}

function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + '#' + path);
}

function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ? process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["default"])(false, 'Hash history needs a DOM') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["default"])(false) : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$hashType = _props.hashType,
      hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  function getDOMLocation() {
    var path = decodePath(getHashPath());
    process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_extends__["a" /* default */])(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  var forceNextPop = false;
  var ignorePath = null;

  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }

  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  }

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  } // Ensure the hash is encoded properly before doing anything else.


  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)]; // Public interface

  function createHref(location) {
    var baseTag = document.querySelector('base');
    var href = '';

    if (baseTag && baseTag.getAttribute('href')) {
      href = stripHash(window.location.href);
    }

    return href + '#' + encodePath(basename + createPath(location));
  }

  function push(path, state) {
    process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(state === undefined, 'Hash history cannot push state; it is ignored') : void 0;
    var action = 'PUSH';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
        process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack') : void 0;
        setState();
      }
    });
  }

  function replace(path, state) {
    process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(state === undefined, 'Hash history cannot replace state; it is ignored') : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */


function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      getUserConfirmation = _props.getUserConfirmation,
      _props$initialEntries = _props.initialEntries,
      initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
      _props$initialIndex = _props.initialIndex,
      initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_extends__["a" /* default */])(history, nextState);

    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
  }); // Public interface

  var createHref = createPath;

  function push(path, state) {
    process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);

      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }

  function replace(path, state) {
    process.env.NODE_ENV !== "production" ? Object(__WEBPACK_IMPORTED_MODULE_3_tiny_warning__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = 'POP';
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    return transitionManager.setPrompt(prompt);
  }

  function listen(listener) {
    return transitionManager.appendListener(listener);
  }

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };
  return history;
}



/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = assign;


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createBrowserRouter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_normalize_href__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__install__ = __webpack_require__(5);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







var createBrowserRouter = function createBrowserRouter(installer) {
  return function (_ref) {
    var routes = _ref.routes,
        basename = _ref.basename,
        _ref$historyOptions = _ref.historyOptions,
        historyOptions = _ref$historyOptions === undefined ? {} : _ref$historyOptions,
        _ref$history = _ref.history,
        history = _ref$history === undefined ? __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default()(_extends({ basename: basename }, historyOptions)) : _ref$history;
    var _history$location = history.location,
        fullPathname = _history$location.pathname,
        search = _history$location.search,
        hash = _history$location.hash,
        _history$location$sta = _history$location.state;
    _history$location$sta = _history$location$sta === undefined ? {} : _history$location$sta;
    var key = _history$location$sta.key,
        state = _history$location$sta.state;

    // Strip the basename from the initial pathname

    var pathname = basename && fullPathname.indexOf(basename) === 0 ? fullPathname.slice(basename.length) : fullPathname;

    var descriptor = basename ? { pathname: pathname, basename: basename, search: search, hash: hash, key: key, state: state } : { pathname: pathname, search: search, hash: hash, key: key, state: state };

    var location = Object(__WEBPACK_IMPORTED_MODULE_1__util_normalize_href__["a" /* default */])(descriptor);

    return installer({ routes: routes, history: history, location: location });
  };
};

/* harmony default export */ __webpack_exports__["a"] = (createBrowserRouter(__WEBPACK_IMPORTED_MODULE_2__install__["a" /* default */]));

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(14)('createBrowserHistory');
module.exports = __webpack_require__(15).createBrowserHistory;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _interopDefault(t){return t&&"object"==typeof t&&"default"in t?t.default:t}Object.defineProperty(exports,"__esModule",{value:!0});var resolvePathname=_interopDefault(__webpack_require__(9)),valueEqual=_interopDefault(__webpack_require__(10));__webpack_require__(11);var invariant=_interopDefault(__webpack_require__(12));function _extends(){return(_extends=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t}).apply(this,arguments)}function addLeadingSlash(t){return"/"===t.charAt(0)?t:"/"+t}function stripLeadingSlash(t){return"/"===t.charAt(0)?t.substr(1):t}function hasBasename(t,n){return 0===t.toLowerCase().indexOf(n.toLowerCase())&&-1!=="/?#".indexOf(t.charAt(n.length))}function stripBasename(t,n){return hasBasename(t,n)?t.substr(n.length):t}function stripTrailingSlash(t){return"/"===t.charAt(t.length-1)?t.slice(0,-1):t}function parsePath(t){var n=t||"/",e="",a="",r=n.indexOf("#");-1!==r&&(a=n.substr(r),n=n.substr(0,r));var o=n.indexOf("?");return-1!==o&&(e=n.substr(o),n=n.substr(0,o)),{pathname:n,search:"?"===e?"":e,hash:"#"===a?"":a}}function createPath(t){var n=t.pathname,e=t.search,a=t.hash,r=n||"/";return e&&"?"!==e&&(r+="?"===e.charAt(0)?e:"?"+e),a&&"#"!==a&&(r+="#"===a.charAt(0)?a:"#"+a),r}function createLocation(t,n,e,a){var r;"string"==typeof t?(r=parsePath(t)).state=n:(void 0===(r=_extends({},t)).pathname&&(r.pathname=""),r.search?"?"!==r.search.charAt(0)&&(r.search="?"+r.search):r.search="",r.hash?"#"!==r.hash.charAt(0)&&(r.hash="#"+r.hash):r.hash="",void 0!==n&&void 0===r.state&&(r.state=n));try{r.pathname=decodeURI(r.pathname)}catch(t){throw t instanceof URIError?new URIError('Pathname "'+r.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):t}return e&&(r.key=e),a?r.pathname?"/"!==r.pathname.charAt(0)&&(r.pathname=resolvePathname(r.pathname,a.pathname)):r.pathname=a.pathname:r.pathname||(r.pathname="/"),r}function locationsAreEqual(t,n){return t.pathname===n.pathname&&t.search===n.search&&t.hash===n.hash&&t.key===n.key&&valueEqual(t.state,n.state)}function createTransitionManager(){var o=null;var a=[];return{setPrompt:function(t){return o=t,function(){o===t&&(o=null)}},confirmTransitionTo:function(t,n,e,a){if(null!=o){var r="function"==typeof o?o(t,n):o;"string"==typeof r?"function"==typeof e?e(r,a):a(!0):a(!1!==r)}else a(!0)},appendListener:function(t){var n=!0;function e(){n&&t.apply(void 0,arguments)}return a.push(e),function(){n=!1,a=a.filter(function(t){return t!==e})}},notifyListeners:function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];a.forEach(function(t){return t.apply(void 0,n)})}}}var canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement);function getConfirmation(t,n){n(window.confirm(t))}function supportsHistory(){var t=window.navigator.userAgent;return(-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&(window.history&&"pushState"in window.history)}function supportsPopStateOnHashChange(){return-1===window.navigator.userAgent.indexOf("Trident")}function supportsGoWithoutReloadUsingHash(){return-1===window.navigator.userAgent.indexOf("Firefox")}function isExtraneousPopstateEvent(t){return void 0===t.state&&-1===navigator.userAgent.indexOf("CriOS")}var PopStateEvent="popstate",HashChangeEvent="hashchange";function getHistoryState(){try{return window.history.state||{}}catch(t){return{}}}function createBrowserHistory(t){void 0===t&&(t={}),canUseDOM||invariant(!1);var s=window.history,c=supportsHistory(),n=!supportsPopStateOnHashChange(),e=t,a=e.forceRefresh,h=void 0!==a&&a,r=e.getUserConfirmation,u=void 0===r?getConfirmation:r,o=e.keyLength,i=void 0===o?6:o,f=t.basename?stripTrailingSlash(addLeadingSlash(t.basename)):"";function l(t){var n=t||{},e=n.key,a=n.state,r=window.location,o=r.pathname+r.search+r.hash;return f&&(o=stripBasename(o,f)),createLocation(o,a,e)}function d(){return Math.random().toString(36).substr(2,i)}var v=createTransitionManager();function p(t){_extends(T,t),T.length=s.length,v.notifyListeners(T.location,T.action)}function g(t){isExtraneousPopstateEvent(t)||w(l(t.state))}function P(){w(l(getHistoryState()))}var m=!1;function w(n){if(m)m=!1,p();else{v.confirmTransitionTo(n,"POP",u,function(t){t?p({action:"POP",location:n}):function(t){var n=T.location,e=H.indexOf(n.key);-1===e&&(e=0);var a=H.indexOf(t.key);-1===a&&(a=0);var r=e-a;r&&(m=!0,L(r))}(n)})}}var y=l(getHistoryState()),H=[y.key];function x(t){return f+createPath(t)}function L(t){s.go(t)}var O=0;function E(t){1===(O+=t)&&1===t?(window.addEventListener(PopStateEvent,g),n&&window.addEventListener(HashChangeEvent,P)):0===O&&(window.removeEventListener(PopStateEvent,g),n&&window.removeEventListener(HashChangeEvent,P))}var S=!1;var T={length:s.length,action:"POP",location:y,createHref:x,push:function(t,n){var i=createLocation(t,n,d(),T.location);v.confirmTransitionTo(i,"PUSH",u,function(t){if(t){var n=x(i),e=i.key,a=i.state;if(c)if(s.pushState({key:e,state:a},null,n),h)window.location.href=n;else{var r=H.indexOf(T.location.key),o=H.slice(0,r+1);o.push(i.key),H=o,p({action:"PUSH",location:i})}else window.location.href=n}})},replace:function(t,n){var o="REPLACE",i=createLocation(t,n,d(),T.location);v.confirmTransitionTo(i,o,u,function(t){if(t){var n=x(i),e=i.key,a=i.state;if(c)if(s.replaceState({key:e,state:a},null,n),h)window.location.replace(n);else{var r=H.indexOf(T.location.key);-1!==r&&(H[r]=i.key),p({action:o,location:i})}else window.location.replace(n)}})},go:L,goBack:function(){L(-1)},goForward:function(){L(1)},block:function(t){void 0===t&&(t=!1);var n=v.setPrompt(t);return S||(E(1),S=!0),function(){return S&&(S=!1,E(-1)),n()}},listen:function(t){var n=v.appendListener(t);return E(1),function(){E(-1),n()}}};return T}var HashChangeEvent$1="hashchange",HashPathCoders={hashbang:{encodePath:function(t){return"!"===t.charAt(0)?t:"!/"+stripLeadingSlash(t)},decodePath:function(t){return"!"===t.charAt(0)?t.substr(1):t}},noslash:{encodePath:stripLeadingSlash,decodePath:addLeadingSlash},slash:{encodePath:addLeadingSlash,decodePath:addLeadingSlash}};function stripHash(t){var n=t.indexOf("#");return-1===n?t:t.slice(0,n)}function getHashPath(){var t=window.location.href,n=t.indexOf("#");return-1===n?"":t.substring(n+1)}function pushHashPath(t){window.location.hash=t}function replaceHashPath(t){window.location.replace(stripHash(window.location.href)+"#"+t)}function createHashHistory(t){void 0===t&&(t={}),canUseDOM||invariant(!1);var n=window.history,e=(supportsGoWithoutReloadUsingHash(),t),a=e.getUserConfirmation,i=void 0===a?getConfirmation:a,r=e.hashType,o=void 0===r?"slash":r,s=t.basename?stripTrailingSlash(addLeadingSlash(t.basename)):"",c=HashPathCoders[o],h=c.encodePath,u=c.decodePath;function f(){var t=u(getHashPath());return s&&(t=stripBasename(t,s)),createLocation(t)}var l=createTransitionManager();function d(t){_extends(E,t),E.length=n.length,l.notifyListeners(E.location,E.action)}var v=!1,p=null;function g(){var t=getHashPath(),n=h(t);if(t!==n)replaceHashPath(n);else{var e=f(),a=E.location;if(!v&&function(t,n){return t.pathname===n.pathname&&t.search===n.search&&t.hash===n.hash}(a,e))return;if(p===createPath(e))return;p=null,function(n){if(v)v=!1,d();else{l.confirmTransitionTo(n,"POP",i,function(t){t?d({action:"POP",location:n}):function(t){var n=E.location,e=y.lastIndexOf(createPath(n));-1===e&&(e=0);var a=y.lastIndexOf(createPath(t));-1===a&&(a=0);var r=e-a;r&&(v=!0,H(r))}(n)})}}(e)}}var P=getHashPath(),m=h(P);P!==m&&replaceHashPath(m);var w=f(),y=[createPath(w)];function H(t){n.go(t)}var x=0;function L(t){1===(x+=t)&&1===t?window.addEventListener(HashChangeEvent$1,g):0===x&&window.removeEventListener(HashChangeEvent$1,g)}var O=!1;var E={length:n.length,action:"POP",location:w,createHref:function(t){var n=document.querySelector("base"),e="";return n&&n.getAttribute("href")&&(e=stripHash(window.location.href)),e+"#"+h(s+createPath(t))},push:function(t,n){var o=createLocation(t,void 0,void 0,E.location);l.confirmTransitionTo(o,"PUSH",i,function(t){if(t){var n=createPath(o),e=h(s+n);if(getHashPath()!==e){p=n,pushHashPath(e);var a=y.lastIndexOf(createPath(E.location)),r=y.slice(0,a+1);r.push(n),y=r,d({action:"PUSH",location:o})}else d()}})},replace:function(t,n){var r="REPLACE",o=createLocation(t,void 0,void 0,E.location);l.confirmTransitionTo(o,r,i,function(t){if(t){var n=createPath(o),e=h(s+n);getHashPath()!==e&&(p=n,replaceHashPath(e));var a=y.indexOf(createPath(E.location));-1!==a&&(y[a]=n),d({action:r,location:o})}})},go:H,goBack:function(){H(-1)},goForward:function(){H(1)},block:function(t){void 0===t&&(t=!1);var n=l.setPrompt(t);return O||(L(1),O=!0),function(){return O&&(O=!1,L(-1)),n()}},listen:function(t){var n=l.appendListener(t);return L(1),function(){L(-1),n()}}};return E}function clamp(t,n,e){return Math.min(Math.max(t,n),e)}function createMemoryHistory(t){void 0===t&&(t={});var n=t,r=n.getUserConfirmation,e=n.initialEntries,a=void 0===e?["/"]:e,o=n.initialIndex,i=void 0===o?0:o,s=n.keyLength,c=void 0===s?6:s,h=createTransitionManager();function u(t){_extends(g,t),g.length=g.entries.length,h.notifyListeners(g.location,g.action)}function f(){return Math.random().toString(36).substr(2,c)}var l=clamp(i,0,a.length-1),d=a.map(function(t){return createLocation(t,void 0,"string"==typeof t?f():t.key||f())}),v=createPath;function p(t){var n=clamp(g.index+t,0,g.entries.length-1),e=g.entries[n];h.confirmTransitionTo(e,"POP",r,function(t){t?u({action:"POP",location:e,index:n}):u()})}var g={length:d.length,action:"POP",location:d[l],index:l,entries:d,createHref:v,push:function(t,n){var a=createLocation(t,n,f(),g.location);h.confirmTransitionTo(a,"PUSH",r,function(t){if(t){var n=g.index+1,e=g.entries.slice(0);e.length>n?e.splice(n,e.length-n,a):e.push(a),u({action:"PUSH",location:a,index:n,entries:e})}})},replace:function(t,n){var e="REPLACE",a=createLocation(t,n,f(),g.location);h.confirmTransitionTo(a,e,r,function(t){t&&(g.entries[g.index]=a,u({action:e,location:a}))})},go:p,goBack:function(){p(-1)},goForward:function(){p(1)},canGo:function(t){var n=g.index+t;return 0<=n&&n<g.entries.length},block:function(t){return void 0===t&&(t=!1),h.setPrompt(t)},listen:function(t){return h.appendListener(t)}};return g}exports.createBrowserHistory=createBrowserHistory,exports.createHashHistory=createHashHistory,exports.createMemoryHistory=createMemoryHistory,exports.createLocation=createLocation,exports.locationsAreEqual=locationsAreEqual,exports.parsePath=parsePath,exports.createPath=createPath;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var resolvePathname = _interopDefault(__webpack_require__(9));
var valueEqual = _interopDefault(__webpack_require__(10));
var warning = _interopDefault(__webpack_require__(11));
var invariant = _interopDefault(__webpack_require__(12));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}
function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && valueEqual(a.state, b.state);
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
    warning(prompt == null, 'A history supports only one prompt at a time');
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          warning(false, 'A history needs a getUserConfirmation function in order to use a prompt message');
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ? invariant(false, 'Browser history needs a DOM') : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
    warning(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
    warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        warning(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
    warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        warning(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

function stripHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}

function pushHashPath(path) {
  window.location.hash = path;
}

function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + '#' + path);
}

function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ? invariant(false, 'Hash history needs a DOM') : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$hashType = _props.hashType,
      hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  function getDOMLocation() {
    var path = decodePath(getHashPath());
    warning(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
    if (basename) path = stripBasename(path, basename);
    return createLocation(path);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  var forceNextPop = false;
  var ignorePath = null;

  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }

  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  }

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  } // Ensure the hash is encoded properly before doing anything else.


  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)]; // Public interface

  function createHref(location) {
    var baseTag = document.querySelector('base');
    var href = '';

    if (baseTag && baseTag.getAttribute('href')) {
      href = stripHash(window.location.href);
    }

    return href + '#' + encodePath(basename + createPath(location));
  }

  function push(path, state) {
    warning(state === undefined, 'Hash history cannot push state; it is ignored');
    var action = 'PUSH';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
        warning(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');
        setState();
      }
    });
  }

  function replace(path, state) {
    warning(state === undefined, 'Hash history cannot replace state; it is ignored');
    var action = 'REPLACE';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    warning(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */


function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      getUserConfirmation = _props.getUserConfirmation,
      _props$initialEntries = _props.initialEntries,
      initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
      _props$initialIndex = _props.initialIndex,
      initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
  }); // Public interface

  var createHref = createPath;

  function push(path, state) {
    warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);

      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }

  function replace(path, state) {
    warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = 'POP';
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    return transitionManager.setPrompt(prompt);
  }

  function listen(listener) {
    return transitionManager.appendListener(listener);
  }

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };
  return history;
}

exports.createBrowserHistory = createBrowserHistory;
exports.createHashHistory = createHashHistory;
exports.createMemoryHistory = createMemoryHistory;
exports.createLocation = createLocation;
exports.locationsAreEqual = locationsAreEqual;
exports.parsePath = parsePath;
exports.createPath = createPath;


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export resolveLocation */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_merge_queries__ = __webpack_require__(16);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






var flow = function flow() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.reduce(function (prev, curr) {
    return function () {
      return curr(prev.apply(undefined, arguments));
    };
  });
};

var resolveQuery = function resolveQuery(_ref) {
  var oldLocation = _ref.oldLocation,
      newLocation = _ref.newLocation,
      options = _ref.options;

  // Merge the old and new queries if asked to persist
  if (options.persistQuery) {
    var mergedQuery = Object(__WEBPACK_IMPORTED_MODULE_1__util_merge_queries__["a" /* default */])(oldLocation.query, newLocation.query);
    return {
      oldLocation: oldLocation,
      newLocation: _extends({}, newLocation, mergedQuery),
      options: options
    };
  }

  return {
    oldLocation: oldLocation,
    newLocation: _extends({}, newLocation, {
      query: newLocation.query
    }),
    options: options
  };
};

var resolveBasename = function resolveBasename(_ref2) {
  var oldLocation = _ref2.oldLocation,
      newLocation = _ref2.newLocation,
      options = _ref2.options;
  var basename = oldLocation.basename;

  if (basename) {
    return {
      oldLocation: oldLocation,
      newLocation: _extends({ basename: basename }, newLocation),
      options: options
    };
  }
  return { oldLocation: oldLocation, newLocation: newLocation, options: options };
};

var resolvePrevious = function resolvePrevious(_ref3) {
  var oldLocation = _ref3.oldLocation,
      newLocation = _ref3.newLocation,
      options = _ref3.options;
  return {
    oldLocation: oldLocation,
    newLocation: _extends({}, newLocation, {
      previous: oldLocation
    }),
    options: options
  };
};

var resolveLocation = flow(resolveQuery, resolveBasename, resolvePrevious);

var locationChangeReducer = function locationChangeReducer(state, action) {
  // No-op the initial route action
  var _state$queue = state.queue,
      queue = _state$queue === undefined ? [] : _state$queue;

  if (state.pathname === action.payload.pathname && state.search === action.payload.search && state.hash === action.payload.hash && !queue.length) {
    return state;
  }

  var queuedLocation = queue[0] || {};
  var newQueue = queue.slice(1);

  // Extract the previous state, but dump the
  // previous state's previous state so that the
  // state tree doesn't keep growing indefinitely
  // eslint-disable-next-line no-unused-vars

  var previous = state.previous,
      _state$routes = state.routes,
      currentRoutes = _state$routes === undefined ? {} : _state$routes,
      oldLocation = _objectWithoutProperties(state, ['previous', 'routes']);

  var _queuedLocation$optio = queuedLocation.options,
      options = _queuedLocation$optio === undefined ? {} : _queuedLocation$optio,
      _queuedLocation$query = queuedLocation.query,
      query = _queuedLocation$query === undefined ? {} : _queuedLocation$query;

  var newLocation = _extends({}, action.payload, { query: query });

  var _resolveLocation = resolveLocation({
    oldLocation: oldLocation,
    newLocation: newLocation,
    options: options
  }),
      resolvedNewLocation = _resolveLocation.newLocation;

  return _extends({}, resolvedNewLocation, { routes: currentRoutes, queue: newQueue });
};

/* harmony default export */ __webpack_exports__["a"] = (function () {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref4$routes = _ref4.routes,
      routes = _ref4$routes === undefined ? {} : _ref4$routes,
      initialLocation = _ref4.initialLocation;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _extends({}, initialLocation, { routes: routes, queue: [] });
    var action = arguments[1];

    if (Object(__WEBPACK_IMPORTED_MODULE_0__types__["m" /* isNavigationActionWithPayload */])(action)) {
      return _extends({}, state, {
        queue: state.queue && state.queue.concat([action.payload])
      });
    }

    if (action.type === __WEBPACK_IMPORTED_MODULE_0__types__["j" /* REPLACE_ROUTES */]) {
      return _extends({}, state, {
        routes: action.payload.routes,
        options: action.payload.options
      });
    }

    if (action.type === __WEBPACK_IMPORTED_MODULE_0__types__["b" /* DID_REPLACE_ROUTES */]) {
      return _extends({}, state, { options: {} });
    }

    if (action.type === __WEBPACK_IMPORTED_MODULE_0__types__["f" /* LOCATION_CHANGED */]) {
      return locationChangeReducer(state, action);
    }

    return state;
  };
});

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export handleNavigationAction */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_merge_queries__ = __webpack_require__(16);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


/* eslint-disable consistent-return */




var unblock = null;

var navigate = function navigate(history, action) {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__types__["h" /* PUSH */]:
      history.push(action.payload);
      break;
    case __WEBPACK_IMPORTED_MODULE_0__types__["i" /* REPLACE */]:
      history.replace(action.payload);
      break;
    case __WEBPACK_IMPORTED_MODULE_0__types__["c" /* GO */]:
      history.go(action.payload);
      break;
    case __WEBPACK_IMPORTED_MODULE_0__types__["d" /* GO_BACK */]:
      history.goBack();
      break;
    case __WEBPACK_IMPORTED_MODULE_0__types__["e" /* GO_FORWARD */]:
      history.goForward();
      break;
    case __WEBPACK_IMPORTED_MODULE_0__types__["a" /* BLOCK */]:
      unblock = history.block(action.payload);
      break;
    case __WEBPACK_IMPORTED_MODULE_0__types__["k" /* UNBLOCK */]:
      if (unblock) {
        unblock();
      }
      break;
    default:
      break;
  }
};

var handleNavigationAction = function handleNavigationAction(_ref) {
  var next = _ref.next,
      action = _ref.action,
      history = _ref.history,
      query = _ref.query;

  // Synchronously dispatch the original action so that the
  // reducer can add it to its location queue
  var originalDispatch = next(action);

  if ((action.type === __WEBPACK_IMPORTED_MODULE_0__types__["h" /* PUSH */] || action.type === __WEBPACK_IMPORTED_MODULE_0__types__["i" /* REPLACE */]) && action.payload.options && action.payload.options.persistQuery) {
    navigate(history, {
      type: action.type,
      payload: _extends({}, action.payload, Object(__WEBPACK_IMPORTED_MODULE_1__util_merge_queries__["a" /* default */])(query, action.payload.query))
    });
  } else {
    navigate(history, action);
  }

  return originalDispatch;
};

/* harmony default export */ __webpack_exports__["a"] = (function (_ref2) {
  var history = _ref2.history;
  return function (_ref3) {
    var getState = _ref3.getState;
    return function (next) {
      return function (action) {
        var query = getState().router.query;

        return Object(__WEBPACK_IMPORTED_MODULE_0__types__["l" /* isNavigationAction */])(action) ? handleNavigationAction({ next: next, action: action, history: history, query: query }) : next(action);
      };
    };
  };
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createStoreSubscriber */
/* unused harmony export createHistoryListener */
/* unused harmony export subscribeToStoreAndHistory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_query_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_match_cache__ = __webpack_require__(22);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









var createStoreSubscriber = function createStoreSubscriber(getState, dispatch, createMatcher) {
  return function (currentMatcher) {
    var _getState = getState(),
        routes = _getState.routes,
        pathname = _getState.pathname,
        search = _getState.search,
        hash = _getState.hash,
        updateRoutes = _getState.updateRoutes;

    if (updateRoutes) {
      currentMatcher = createMatcher(routes);
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["b" /* didReplaceRoutes */])());
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["i" /* replace */])({ pathname: pathname, search: search, hash: hash }));
    }

    return currentMatcher;
  };
};

var createHistoryListener = function createHistoryListener(dispatch) {
  return function (currentMatcher, location, action) {
    __WEBPACK_IMPORTED_MODULE_3__util_match_cache__["a" /* default */].clear();

    var match = currentMatcher(location.pathname);
    var payload = _extends({}, location, match, {
      query: __WEBPACK_IMPORTED_MODULE_0_query_string___default.a.parse(location.search || '')
    });

    // Other actions come from the user, so they already have a
    // corresponding queued navigation action.
    if (action === 'POP') {
      dispatch({
        type: __WEBPACK_IMPORTED_MODULE_1__types__["g" /* POP */],
        payload: payload
      });
    }

    dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["g" /* locationDidChange */])(payload));
  };
};

var subscribeToStoreAndHistory = function subscribeToStoreAndHistory(_ref) {
  var getState = _ref.getState,
      dispatch = _ref.dispatch,
      createMatcher = _ref.createMatcher,
      matchRoute = _ref.matchRoute,
      subscribeToStore = _ref.subscribeToStore,
      subscribeToHistory = _ref.subscribeToHistory;

  var storeSubscriber = createStoreSubscriber(getState, dispatch, createMatcher);
  var historyListener = createHistoryListener(dispatch);

  var currentMatcher = matchRoute;

  // Replace the matcher when replacing routes
  subscribeToStore(function () {
    currentMatcher = storeSubscriber(currentMatcher);
  });

  subscribeToHistory(function (location, action) {
    return historyListener(currentMatcher, location, action);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (function (_ref2) {
  var history = _ref2.history,
      matchRoute = _ref2.matchRoute,
      createMatcher = _ref2.createMatcher;
  return function (createStore) {
    return function (userReducer, initialState, enhancer) {
      var store = createStore(userReducer, initialState, enhancer);
      var dispatch = store.dispatch,
          subscribeToStore = store.subscribe;
      var subscribeToHistory = history.listen;


      var getState = function getState() {
        var routerState = store.getState().router;
        var _routerState$options = routerState.options;
        _routerState$options = _routerState$options === undefined ? {} : _routerState$options;
        var updateRoutes = _routerState$options.updateRoutes;

        return _extends({}, routerState, { updateRoutes: updateRoutes });
      };

      subscribeToStoreAndHistory({
        getState: getState,
        dispatch: dispatch,
        createMatcher: createMatcher,
        matchRoute: matchRoute,
        subscribeToStore: subscribeToStore,
        subscribeToHistory: subscribeToHistory
      });

      return _extends({}, store, {
        matchRoute: matchRoute
      });
    };
  };
});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_create_matcher__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_validate_routes__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_flatten_routes__ = __webpack_require__(21);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/* harmony default export */ __webpack_exports__["a"] = (function (_ref) {
  var reducer = _ref.reducer,
      middleware = _ref.middleware,
      enhancer = _ref.enhancer;
  return function (_ref2) {
    var nestedRoutes = _ref2.routes,
        history = _ref2.history,
        location = _ref2.location,
        _ref2$createMatcher = _ref2.createMatcher,
        createMatcher = _ref2$createMatcher === undefined ? __WEBPACK_IMPORTED_MODULE_0__util_create_matcher__["a" /* default */] : _ref2$createMatcher;

    Object(__WEBPACK_IMPORTED_MODULE_1__util_validate_routes__["a" /* default */])(nestedRoutes);
    var routes = Object(__WEBPACK_IMPORTED_MODULE_2__util_flatten_routes__["a" /* default */])(nestedRoutes);
    var matchRoute = createMatcher(routes);

    return {
      reducer: reducer({
        routes: routes,
        initialLocation: _extends({}, location, matchRoute(location.pathname))
      }),
      middleware: middleware({ history: history }),
      enhancer: enhancer({
        history: history,
        matchRoute: matchRoute,
        createMatcher: createMatcher
      })
    };
  };
});

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url_pattern__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url_pattern___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url_pattern__);


var hasTrailingSlash = /\w+\/$/;

var eagerMatcher = function eagerMatcher(routeList) {
  return function (incomingUrl) {
    // Discard query strings
    var pathname = incomingUrl.split('?')[0].replace(hasTrailingSlash, function (path) {
      return path.slice(0, path.length - 1);
    });

    // Find the route that matches the URL
    for (var i = 0; i < routeList.length; i++) {
      var storedRoute = routeList[i];
      var match = storedRoute.pattern.match(pathname);

      if (match) {
        // Return the matched params and user-defined result object
        return {
          route: storedRoute.route,
          params: match,
          result: storedRoute.result
        };
      }
    }

    return null;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (function (routes) {
  var routeList = Object.keys(routes).sort().reverse().map(function (route) {
    return {
      route: route,
      pattern: new __WEBPACK_IMPORTED_MODULE_0_url_pattern___default.a(route),
      result: routes[route]
    };
  });

  return eagerMatcher(routeList);
});

/***/ }),
/* 54 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export README_MESSAGE */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__throw_error__ = __webpack_require__(24);


var README_MESSAGE = '\n  See the README for more information:\n  https://github.com/FormidableLabs/redux-little-router#wiring-up-the-boilerplate\n';

/* harmony default export */ __webpack_exports__["a"] = (function (routes) {
  if (!routes) {
    Object(__WEBPACK_IMPORTED_MODULE_0__throw_error__["a" /* default */])('\n      Missing route configuration. You must define your routes as\n      an object where the keys are routes and the values are any\n      route-specific data.\n\n      ' + README_MESSAGE + '\n    ')();
  }

  // eslint-disable-next-line no-magic-numbers
  if (!Object.keys(routes).every(function (route) {
    return route.indexOf('/') === 0;
  })) {
    Object(__WEBPACK_IMPORTED_MODULE_0__throw_error__["a" /* default */])('\n      The route configuration you provided is malformed. Make sure\n      that all of your routes start with a slash.\n\n      ' + README_MESSAGE + '\n    ')();
  }
});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createHashRouter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createHashHistory__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createHashHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_createHashHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_normalize_href__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__install__ = __webpack_require__(5);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







var createHashRouter = function createHashRouter(installer) {
  return function (_ref) {
    var routes = _ref.routes,
        basename = _ref.basename,
        _ref$hashType = _ref.hashType,
        hashType = _ref$hashType === undefined ? 'slash' : _ref$hashType,
        historyOptions = _ref.historyOptions,
        _ref$history = _ref.history,
        history = _ref$history === undefined ? __WEBPACK_IMPORTED_MODULE_0_history_createHashHistory___default()(_extends({ basename: basename, hashType: hashType }, historyOptions)) : _ref$history;

    var descriptor = basename ? _extends({ basename: basename }, history.location) : history.location;

    var location = Object(__WEBPACK_IMPORTED_MODULE_1__util_normalize_href__["a" /* default */])(descriptor);

    return installer({ routes: routes, history: history, location: location });
  };
};

/* harmony default export */ __webpack_exports__["a"] = (createHashRouter(__WEBPACK_IMPORTED_MODULE_2__install__["a" /* default */]));

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(14)('createHashHistory');
module.exports = __webpack_require__(15).createHashHistory;


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createExpressRouter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createMemoryHistory__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createMemoryHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_createMemoryHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_normalize_href__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__install__ = __webpack_require__(5);








var locationForRequest = function locationForRequest(request) {
  var pathname = request.path,
      basename = request.baseUrl,
      query = request.query;

  var descriptor = basename ? { pathname: pathname, basename: basename, query: query } : { pathname: pathname, query: query };
  return Object(__WEBPACK_IMPORTED_MODULE_1__util_normalize_href__["a" /* default */])(descriptor);
};

var createExpressRouter = function createExpressRouter(installer) {
  return function (_ref) {
    var routes = _ref.routes,
        request = _ref.request,
        _ref$historyOptions = _ref.historyOptions,
        historyOptions = _ref$historyOptions === undefined ? {} : _ref$historyOptions;

    var history = __WEBPACK_IMPORTED_MODULE_0_history_createMemoryHistory___default()(historyOptions);
    var location = locationForRequest(request);

    return installer({ routes: routes, history: history, location: location });
  };
};

/* harmony default export */ __webpack_exports__["a"] = (createExpressRouter(__WEBPACK_IMPORTED_MODULE_2__install__["a" /* default */]));

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createHapiRouter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createMemoryHistory__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createMemoryHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_createMemoryHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_normalize_href__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__install__ = __webpack_require__(5);








var createHapiRouter = function createHapiRouter(installer) {
  return function (_ref) {
    var routes = _ref.routes,
        request = _ref.request,
        _ref$historyOptions = _ref.historyOptions,
        historyOptions = _ref$historyOptions === undefined ? {} : _ref$historyOptions;

    var history = __WEBPACK_IMPORTED_MODULE_0_history_createMemoryHistory___default()(historyOptions);

    var location = Object(__WEBPACK_IMPORTED_MODULE_1__util_normalize_href__["a" /* default */])({
      pathname: request.path,
      query: request.query
    });

    return installer({ routes: routes, history: history, location: location });
  };
};

/* harmony default export */ __webpack_exports__["a"] = (createHapiRouter(__WEBPACK_IMPORTED_MODULE_2__install__["a" /* default */]));

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkWithLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PersistentQueryLinkWithLocation; });
/* unused harmony export LinkComponent */
/* unused harmony export PersistentQueryLinkComponent */
/* unused harmony export mapDispatchToProps */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_merge_queries__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_normalize_href__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_stringify_href__ = __webpack_require__(94);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var LEFT_MOUSE_BUTTON = 0;

var isNotLeftClick = function isNotLeftClick(e) {
  return e.button && e.button !== LEFT_MOUSE_BUTTON;
};

var hasModifier = function hasModifier(e) {
  return Boolean(e.shiftKey || e.altKey || e.metaKey || e.ctrlKey);
};

var shouldIgnoreClick = function shouldIgnoreClick(_ref) {
  var e = _ref.e,
      target = _ref.target;
  return hasModifier(e) || isNotLeftClick(e) || e.defaultPrevented || target;
};

var handleClick = function handleClick(_ref2) {
  var e = _ref2.e,
      target = _ref2.target,
      href = _ref2.href,
      onClick = _ref2.onClick,
      replaceState = _ref2.replaceState,
      persistQuery = _ref2.persistQuery,
      push = _ref2.push,
      replace = _ref2.replace;

  if (onClick) {
    onClick(e);
  }

  if (shouldIgnoreClick({ e: e, target: target })) {
    return;
  }

  e.preventDefault();

  var navigate = replaceState ? replace : push;
  navigate(href, { persistQuery: persistQuery });
};

// When persisting queries, we need to merge the persisted
// query with the link's new query.
var contextifyHref = function contextifyHref(href, location, persistQuery) {
  if (!persistQuery) {
    return href;
  }

  var mergedQuery = Object(__WEBPACK_IMPORTED_MODULE_4__util_merge_queries__["a" /* default */])(location.query, href.query);

  return _extends({}, href, mergedQuery);
};

var LinkComponent = function (_Component) {
  _inherits(LinkComponent, _Component);

  function LinkComponent(props) {
    _classCallCheck(this, LinkComponent);

    return _possibleConstructorReturn(this, (LinkComponent.__proto__ || Object.getPrototypeOf(LinkComponent)).call(this, props));
  }

  _createClass(LinkComponent, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rawHref = _props.href,
          location = _props.location,
          children = _props.children,
          onClick = _props.onClick,
          target = _props.target,
          activeProps = _props.activeProps,
          replaceState = _props.replaceState,
          persistQuery = _props.persistQuery,
          push = _props.push,
          replace = _props.replace,
          rest = _objectWithoutProperties(_props, ['href', 'location', 'children', 'onClick', 'target', 'activeProps', 'replaceState', 'persistQuery', 'push', 'replace']);

      // Ensure the href has both a search and a query when needed


      var normalizedHref = Object(__WEBPACK_IMPORTED_MODULE_5__util_normalize_href__["a" /* default */])(rawHref);
      var href = contextifyHref(normalizedHref, location, persistQuery);
      var isActive = href.pathname === location.pathname;
      var activeRest = isActive && activeProps || {};

      var clickHandler = function clickHandler(e) {
        return handleClick({
          e: e,
          target: target,
          href: href,
          onClick: onClick,
          replaceState: replaceState,
          persistQuery: persistQuery,
          push: push,
          replace: replace
        });
      };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'a',
        _extends({
          href: Object(__WEBPACK_IMPORTED_MODULE_6__util_stringify_href__["a" /* default */])(href, location.basename),
          onClick: clickHandler,
          target: target
        }, rest, activeRest),
        children
      );
    }
  }]);

  return LinkComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

var PersistentQueryLinkComponent = function (_Component2) {
  _inherits(PersistentQueryLinkComponent, _Component2);

  function PersistentQueryLinkComponent() {
    _classCallCheck(this, PersistentQueryLinkComponent);

    return _possibleConstructorReturn(this, (PersistentQueryLinkComponent.__proto__ || Object.getPrototypeOf(PersistentQueryLinkComponent)).apply(this, arguments));
  }

  _createClass(PersistentQueryLinkComponent, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          rest = _objectWithoutProperties(_props2, ['children']);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        LinkComponent,
        _extends({}, rest, { persistQuery: true }),
        children
      );
    }
  }]);

  return PersistentQueryLinkComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

PersistentQueryLinkComponent.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node
};

var mapStateToProps = function mapStateToProps(state) {
  return { location: state.router };
};
var mapDispatchToProps = {
  push: __WEBPACK_IMPORTED_MODULE_3__actions__["h" /* push */],
  replace: __WEBPACK_IMPORTED_MODULE_3__actions__["i" /* replace */]
};
var withLocation = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["a" /* connect */])(mapStateToProps, mapDispatchToProps);

var LinkWithLocation = withLocation(LinkComponent);
var PersistentQueryLinkWithLocation = withLocation(PersistentQueryLinkComponent);



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export createProvider */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_inheritsLoose__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_PropTypes__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_warning__ = __webpack_require__(18);





var prefixUnsafeLifecycleMethods = typeof __WEBPACK_IMPORTED_MODULE_1_react___default.a.forwardRef !== "undefined";
var didWarnAboutReceivingStore = false;

function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }

  didWarnAboutReceivingStore = true;
  Object(__WEBPACK_IMPORTED_MODULE_4__utils_warning__["a" /* default */])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reduxjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider(storeKey) {
  var _Provider$childContex;

  if (storeKey === void 0) {
    storeKey = 'store';
  }

  var subscriptionKey = storeKey + "Subscription";

  var Provider =
  /*#__PURE__*/
  function (_Component) {
    Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_inheritsLoose__["a" /* default */])(Provider, _Component);

    var _proto = Provider.prototype;

    _proto.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      var _this;

      _this = _Component.call(this, props, context) || this;
      _this[storeKey] = props.store;
      return _this;
    }

    _proto.render = function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react__["Children"].only(this.props.children);
    };

    return Provider;
  }(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);

  if (process.env.NODE_ENV !== 'production') {
    // Use UNSAFE_ event name where supported
    var eventName = prefixUnsafeLifecycleMethods ? 'UNSAFE_componentWillReceiveProps' : 'componentWillReceiveProps';

    Provider.prototype[eventName] = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_3__utils_PropTypes__["a" /* storeShape */].isRequired,
    children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.element.isRequired
  };
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = __WEBPACK_IMPORTED_MODULE_3__utils_PropTypes__["a" /* storeShape */].isRequired, _Provider$childContex[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_3__utils_PropTypes__["b" /* subscriptionShape */], _Provider$childContex);
  return Provider;
}
/* unused harmony default export */ var _unused_webpack_default_export = (createProvider());
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.10.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports,"__esModule",{value:!0});
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.suspense_list"):
60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.fundamental"):60117,w=b?Symbol.for("react.responder"):60118,x=b?Symbol.for("react.scope"):60119;function y(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case t:case r:case d:return u}}}function z(a){return y(a)===m}
exports.typeOf=y;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===v||a.$$typeof===w||a.$$typeof===x)};exports.isAsyncMode=function(a){return z(a)||y(a)===l};exports.isConcurrentMode=z;exports.isContextConsumer=function(a){return y(a)===k};exports.isContextProvider=function(a){return y(a)===h};
exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return y(a)===n};exports.isFragment=function(a){return y(a)===e};exports.isLazy=function(a){return y(a)===t};exports.isMemo=function(a){return y(a)===r};exports.isPortal=function(a){return y(a)===d};exports.isProfiler=function(a){return y(a)===g};exports.isStrictMode=function(a){return y(a)===f};exports.isSuspense=function(a){return y(a)===p};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.10.2
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */
var lowPriorityWarningWithoutStack = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.warn(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarningWithoutStack = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(void 0, [format].concat(args));
    }
  };
}

var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(7);
var assign = __webpack_require__(20);

var ReactPropTypesSecret = __webpack_require__(17);
var checkPropTypes = __webpack_require__(65);

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = __webpack_require__(17);
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(17);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _assertThisInitialized;
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = __webpack_require__(7);
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
};

var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
};

var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

function getStatics(component) {
    if (ReactIs.isMemo(component)) {
        return MEMO_STATICS;
    }
    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants
var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];
  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;

      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);
      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;
        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription =
/*#__PURE__*/
function () {
  function Subscription(store, parentSub, onStateChange) {
    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  var _proto = Subscription.prototype;

  _proto.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  _proto.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  _proto.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  _proto.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);
      this.listeners = createListenerCollection();
    }
  };

  _proto.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createConnect */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_extends__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_esm_objectWithoutPropertiesLoose__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_connectAdvanced__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_shallowEqual__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mapDispatchToProps__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mapStateToProps__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mergeProps__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__selectorFactory__ = __webpack_require__(92);








/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error("Invalid value of type " + typeof arg + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
  };
}

function strictEqual(a, b) {
  return a === b;
} // createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios


function createConnect(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === void 0 ? __WEBPACK_IMPORTED_MODULE_2__components_connectAdvanced__["a" /* default */] : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? __WEBPACK_IMPORTED_MODULE_5__mapStateToProps__["a" /* default */] : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? __WEBPACK_IMPORTED_MODULE_4__mapDispatchToProps__["a" /* default */] : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === void 0 ? __WEBPACK_IMPORTED_MODULE_6__mergeProps__["a" /* default */] : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === void 0 ? __WEBPACK_IMPORTED_MODULE_7__selectorFactory__["a" /* default */] : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {
    if (_ref2 === void 0) {
      _ref2 = {};
    }

    var _ref3 = _ref2,
        _ref3$pure = _ref3.pure,
        pure = _ref3$pure === void 0 ? true : _ref3$pure,
        _ref3$areStatesEqual = _ref3.areStatesEqual,
        areStatesEqual = _ref3$areStatesEqual === void 0 ? strictEqual : _ref3$areStatesEqual,
        _ref3$areOwnPropsEqua = _ref3.areOwnPropsEqual,
        areOwnPropsEqual = _ref3$areOwnPropsEqua === void 0 ? __WEBPACK_IMPORTED_MODULE_3__utils_shallowEqual__["a" /* default */] : _ref3$areOwnPropsEqua,
        _ref3$areStatePropsEq = _ref3.areStatePropsEqual,
        areStatePropsEqual = _ref3$areStatePropsEq === void 0 ? __WEBPACK_IMPORTED_MODULE_3__utils_shallowEqual__["a" /* default */] : _ref3$areStatePropsEq,
        _ref3$areMergedPropsE = _ref3.areMergedPropsEqual,
        areMergedPropsEqual = _ref3$areMergedPropsE === void 0 ? __WEBPACK_IMPORTED_MODULE_3__utils_shallowEqual__["a" /* default */] : _ref3$areMergedPropsE,
        extraOptions = Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_esm_objectWithoutPropertiesLoose__["a" /* default */])(_ref3, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
    return connectHOC(selectorFactory, Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_extends__["a" /* default */])({
      // used in error messages
      methodName: 'connect',
      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return "Connect(" + name + ")";
      },
      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),
      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual
    }, extraOptions));
  };
}
/* harmony default export */ __webpack_exports__["a"] = (createConnect());

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = shallowEqual;
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapDispatchToPropsIsFunction */
/* unused harmony export whenMapDispatchToPropsIsMissing */
/* unused harmony export whenMapDispatchToPropsIsObject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__ = __webpack_require__(36);


function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["b" /* wrapMapToPropsFunc */])(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}
function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function (dispatch) {
    return {
      dispatch: dispatch
    };
  }) : undefined;
}
function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function (dispatch) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_redux__["a" /* bindActionCreators */])(mapDispatchToProps, dispatch);
  }) : undefined;
}
/* harmony default export */ __webpack_exports__["a"] = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(34);
/* unused harmony reexport createStore */
/* unused harmony reexport combineReducers */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* unused harmony reexport applyMiddleware */
/* unused harmony reexport compose */







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(79);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(77);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(33)))

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(32);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(81);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ponyfill_js__ = __webpack_require__(85);
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = Object(__WEBPACK_IMPORTED_MODULE_0__ponyfill_js__["a" /* default */])(root);
/* harmony default export */ __webpack_exports__["a"] = (result);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(33), __webpack_require__(84)(module)))

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(34);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(35);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isPlainObject;
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = Object.getPrototypeOf(obj);
  if (proto === null) return true;
  var baseProto = proto;

  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }

  return proto === baseProto;
}

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapStateToPropsIsFunction */
/* unused harmony export whenMapStateToPropsIsMissing */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__ = __webpack_require__(36);

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["b" /* wrapMapToPropsFunc */])(mapStateToProps, 'mapStateToProps') : undefined;
}
function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? Object(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function () {
    return {};
  }) : undefined;
}
/* harmony default export */ __webpack_exports__["a"] = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export defaultMergeProps */
/* unused harmony export wrapMergePropsFunc */
/* unused harmony export whenMergePropsIsFunction */
/* unused harmony export whenMergePropsIsOmitted */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_extends__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_verifyPlainObject__ = __webpack_require__(37);


function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_extends__["a" /* default */])({}, ownProps, stateProps, dispatchProps);
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;
    var hasRunOnce = false;
    var mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if (process.env.NODE_ENV !== 'production') Object(__WEBPACK_IMPORTED_MODULE_1__utils_verifyPlainObject__["a" /* default */])(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}
function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}
function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}
/* harmony default export */ __webpack_exports__["a"] = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export impureFinalPropsSelectorFactory */
/* unused harmony export pureFinalPropsSelectorFactory */
/* harmony export (immutable) */ __webpack_exports__["a"] = finalPropsSelectorFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_objectWithoutPropertiesLoose__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__verifySubselectors__ = __webpack_require__(93);


function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;
  var hasRunAtLeastOnce = false;
  var state;
  var ownProps;
  var stateProps;
  var dispatchProps;
  var mergedProps;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;
    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;
    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
} // TODO: Add more comments
// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_esm_objectWithoutPropertiesLoose__["a" /* default */])(_ref2, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (process.env.NODE_ENV !== 'production') {
    Object(__WEBPACK_IMPORTED_MODULE_1__verifySubselectors__["a" /* default */])(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifySubselectors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_warning__ = __webpack_require__(18);


function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error("Unexpected value for " + methodName + " in " + displayName + ".");
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils_warning__["a" /* default */])("The selector for " + methodName + " of " + displayName + " did not specify a value for dependsOnOwnProps.");
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = (function (href, basename) {
  if (typeof href === 'string') {
    return '' + (basename || '') + href;
  }

  var pathname = href.pathname,
      search = href.search;

  return '' + (basename || '') + pathname + (search || '');
});

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export FragmentComponent */
/* unused harmony export withIdAndContext */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_recompose_getContext__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_recompose_getContext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_recompose_getContext__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose_withContext__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose_withContext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_recompose_withContext__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recompose_compose__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recompose_compose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_recompose_compose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_url_pattern__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_url_pattern___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_url_pattern__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_redux__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_match_cache__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_generate_id__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util_throw_error__ = __webpack_require__(24);



/* eslint-disable react/sort-comp */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var withId = function withId(ComposedComponent) {
  return function (_Component) {
    _inherits(WithId, _Component);

    function WithId() {
      _classCallCheck(this, WithId);

      var _this = _possibleConstructorReturn(this, (WithId.__proto__ || Object.getPrototypeOf(WithId)).call(this));

      _this.id = Object(__WEBPACK_IMPORTED_MODULE_8__util_generate_id__["a" /* default */])();
      return _this;
    }

    _createClass(WithId, [{
      key: 'render',
      value: function render() {
        return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(ComposedComponent, _extends({}, this.props, { id: this.id }));
      }
    }]);

    return WithId;
  }(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);
};

var resolveChildRoute = function resolveChildRoute(parentRoute, currentRoute) {
  var parentIsRootRoute = parentRoute && parentRoute !== '/' && parentRoute !== currentRoute;

  return parentIsRootRoute ? '' + parentRoute + (currentRoute || '') : currentRoute;
};

var resolveCurrentRoute = function resolveCurrentRoute(parentRoute, currentRoute) {
  if (!currentRoute) {
    return null;
  }

  // First route will always be a wildcard
  if (!parentRoute) {
    return currentRoute + '*';
  }

  var currentIsRootRoute = currentRoute === '/';
  var parentIsRootRoute = parentRoute === '/';

  // Only prefix non-root parent routes
  var routePrefix = !parentIsRootRoute && parentRoute || '';

  // Support "index" routes:
  // <Fragment forRoute='/home'>
  //   <Fragment forRoute='/'>
  //   </Fragment>
  // </Fragment>
  var routeSuffix = currentIsRootRoute && !parentIsRootRoute ? '' : currentRoute;

  var wildcard = currentIsRootRoute && parentIsRootRoute ? '' : '*';

  return '' + routePrefix + routeSuffix + wildcard;
};

var shouldShowFragment = function shouldShowFragment(_ref) {
  var forRoute = _ref.forRoute,
      withConditions = _ref.withConditions,
      matcher = _ref.matcher,
      location = _ref.location;

  if (!forRoute) {
    return withConditions && withConditions(location);
  }

  var matchesRoute = matcher && matcher.match(location.pathname);

  return withConditions ? matchesRoute && withConditions(location) : matchesRoute;
};

var FragmentComponent = function (_Component2) {
  _inherits(FragmentComponent, _Component2);

  function FragmentComponent(props) {
    _classCallCheck(this, FragmentComponent);

    var _this2 = _possibleConstructorReturn(this, (FragmentComponent.__proto__ || Object.getPrototypeOf(FragmentComponent)).call(this, props));

    var currentRoute = resolveCurrentRoute(props.parentRoute, props.forRoute);

    _this2.matcher = currentRoute && new __WEBPACK_IMPORTED_MODULE_3_url_pattern___default.a(currentRoute) || null;
    return _this2;
  }

  _createClass(FragmentComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.forRoute !== nextProps.forRoute) {
        Object(__WEBPACK_IMPORTED_MODULE_9__util_throw_error__["a" /* default */])('Updating route props is not yet supported')();
      }

      // When Fragment rerenders, matchCache can get out of sync.
      // Blow it away at the root Fragment on every render.
      if (!this.props.parentId) {
        __WEBPACK_IMPORTED_MODULE_7__util_match_cache__["a" /* default */].clear();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var matcher = this.matcher;
      var _props = this.props,
          children = _props.children,
          forRoute = _props.forRoute,
          withConditions = _props.withConditions,
          forNoMatch = _props.forNoMatch,
          location = _props.location,
          parentRoute = _props.parentRoute,
          parentId = _props.parentId;


      var shouldShow = shouldShowFragment({
        forRoute: forRoute,
        withConditions: withConditions,
        matcher: matcher,
        location: location
      });

      if (!shouldShow && !forNoMatch) {
        return null;
      }

      var currentRoute = resolveCurrentRoute(parentRoute, forRoute);

      if (parentId) {
        var previousMatch = __WEBPACK_IMPORTED_MODULE_7__util_match_cache__["a" /* default */].get(parentId);
        if (previousMatch && previousMatch !== currentRoute) {
          return null;
        } else {
          __WEBPACK_IMPORTED_MODULE_7__util_match_cache__["a" /* default */].add(parentId, currentRoute);
        }
      }

      return __WEBPACK_IMPORTED_MODULE_4_react__["Children"].only(children);
    }
  }]);

  return FragmentComponent;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

var withIdAndContext = __WEBPACK_IMPORTED_MODULE_2_recompose_compose___default()(__WEBPACK_IMPORTED_MODULE_0_recompose_getContext___default()({
  parentRoute: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  parentId: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string
}), withId, __WEBPACK_IMPORTED_MODULE_1_recompose_withContext___default()({
  parentRoute: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  parentId: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string
}, function (props) {
  return {
    parentRoute: resolveChildRoute(props.parentRoute, props.forRoute),
    parentId: props.id
  };
}));

var mapStateToProps = function mapStateToProps(state) {
  return {
    location: state.router
  };
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_recompose_compose___default()(Object(__WEBPACK_IMPORTED_MODULE_5_react_redux__["a" /* connect */])(mapStateToProps), withIdAndContext)(FragmentComponent));

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(2);

var _setDisplayName = __webpack_require__(38);

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = __webpack_require__(39);

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getContext = function getContext(contextTypes) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);
    var GetContext = function GetContext(ownerProps, context) {
      return factory(_extends({}, ownerProps, context));
    };

    GetContext.contextTypes = contextTypes;

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'getContext'))(GetContext);
    }
    return GetContext;
  };
};

exports.default = getContext;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var setStatic = function setStatic(key, value) {
  return function (BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */
    return BaseComponent;
  };
};

exports.default = setStatic;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

exports.default = getDisplayName;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _react = __webpack_require__(2);

var _setDisplayName = __webpack_require__(38);

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = __webpack_require__(39);

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withContext = function withContext(childContextTypes, getChildContext) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);

    var WithContext = function (_Component) {
      _inherits(WithContext, _Component);

      function WithContext() {
        var _temp, _this, _ret;

        _classCallCheck(this, WithContext);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getChildContext = function () {
          return getChildContext(_this.props);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      WithContext.prototype.render = function render() {
        return factory(this.props);
      };

      return WithContext;
    }(_react.Component);

    WithContext.childContextTypes = childContextTypes;

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'withContext'))(WithContext);
    }
    return WithContext;
  };
};

exports.default = withContext;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = compose;
function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * Returns a psuedo-unique identifier used by fragments
 * to track match status within MatchCache.
 * @returns {String} id
 */
/* harmony default export */ __webpack_exports__["a"] = (function () {
  var radix = 16;
  var length = 8;
  return (Math.random() * Date.now()).toString(radix).slice(0, length);
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxN2ZkOWQzMzY4MTI2ZWE1NTlkZiIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi91dGlsL25vcm1hbGl6ZS1ocmVmLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCJ9Iiwid2VicGFjazovLy8uL3R5cGVzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9pbnN0YWxsLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXBhdGhuYW1lL2VzbS9yZXNvbHZlLXBhdGhuYW1lLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdmFsdWUtZXF1YWwvZXNtL3ZhbHVlLWVxdWFsLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdGlueS13YXJuaW5nL2Rpc3QvdGlueS13YXJuaW5nLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3RpbnktaW52YXJpYW50L2Rpc3QvdGlueS1pbnZhcmlhbnQuZXNtLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcXVlcnktc3RyaW5nL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGlzdG9yeS93YXJuQWJvdXREZXByZWNhdGVkQ0pTUmVxdWlyZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hpc3RvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbC9tZXJnZS1xdWVyaWVzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy93YXJuaW5nLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbC9mbGF0dGVuLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi91dGlsL21hdGNoLWNhY2hlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdXJsLXBhdHRlcm4vbGliL3VybC1wYXR0ZXJuLmpzIiwid2VicGFjazovLy8uL3V0aWwvdGhyb3ctZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2NyZWF0ZU1lbW9yeUhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzTG9vc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9Qcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy91dGlscy93YXJuaW5nLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3Qvd3JhcE1hcFRvUHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy92ZXJpZnlQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlY29tcG9zZS9zZXREaXNwbGF5TmFtZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlY29tcG9zZS93cmFwRGlzcGxheU5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2VzbS9oaXN0b3J5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9kZWNvZGUtdXJpLWNvbXBvbmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZW52aXJvbm1lbnQvYnJvd3Nlci1yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2NyZWF0ZUJyb3dzZXJIaXN0b3J5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9janMvaGlzdG9yeS5taW4uanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2Nqcy9oaXN0b3J5LmpzIiwid2VicGFjazovLy8uL3JlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vLi9lbmhhbmNlci5qcyIsIndlYnBhY2s6Ly8vLi91dGlsL2NyZWF0ZS1pbnN0YWxsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbC9jcmVhdGUtbWF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi91dGlsL3ZhbGlkYXRlLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9lbnZpcm9ubWVudC9oYXNoLXJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hpc3RvcnkvY3JlYXRlSGFzaEhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vZW52aXJvbm1lbnQvZXhwcmVzcy1yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZW52aXJvbm1lbnQvaGFwaS1yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9saW5rLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29tcG9uZW50cy9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvZGlzdC9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy5janMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9pbnZhcmlhbnQvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL1N1YnNjcmlwdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvY29ubmVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3NoYWxsb3dFcXVhbC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWFwRGlzcGF0Y2hUb1Byb3BzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9oYXJtb255LW1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tYmluZVJlZHVjZXJzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYmluZEFjdGlvbkNyZWF0b3JzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYXBwbHlNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvaXNQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWFwU3RhdGVUb1Byb3BzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tZXJnZVByb3BzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9zZWxlY3RvckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3ZlcmlmeVN1YnNlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi91dGlsL3N0cmluZ2lmeS1ocmVmLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvZnJhZ21lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWNvbXBvc2UvZ2V0Q29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlY29tcG9zZS9zZXRTdGF0aWMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWNvbXBvc2UvZ2V0RGlzcGxheU5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWNvbXBvc2Uvd2l0aENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWNvbXBvc2UvY29tcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlsL2dlbmVyYXRlLWlkLmpzIl0sIm5hbWVzIjpbImhyZWYiLCJwYXJzZVBhdGgiLCJzZWFyY2giLCJvdGhlciIsInF1ZXJ5IiwicXMiLCJwYXJzZSIsInJlc29sdmVkU2VhcmNoIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsInN0cmluZ2lmeSIsInJlc29sdmVkUXVlcnkiLCJMT0NBVElPTl9DSEFOR0VEIiwiUFVTSCIsIlJFUExBQ0UiLCJHTyIsIkdPX0JBQ0siLCJHT19GT1JXQVJEIiwiUE9QIiwiQkxPQ0siLCJVTkJMT0NLIiwiUkVQTEFDRV9ST1VURVMiLCJESURfUkVQTEFDRV9ST1VURVMiLCJhY3Rpb25zV2l0aFBheWxvYWQiLCJhY3Rpb25zIiwiaXNOYXZpZ2F0aW9uQWN0aW9uIiwiYWN0aW9uIiwiaW5kZXhPZiIsInR5cGUiLCJpc05hdmlnYXRpb25BY3Rpb25XaXRoUGF5bG9hZCIsImNyZWF0ZUluc3RhbGxlciIsInJlZHVjZXIiLCJtaWRkbGV3YXJlIiwiZW5oYW5jZXIiLCJwdXNoIiwib3B0aW9ucyIsInBheWxvYWQiLCJub3JtYWxpemVIcmVmIiwicmVwbGFjZSIsImdvIiwiaW5kZXgiLCJnb0JhY2siLCJnb0ZvcndhcmQiLCJibG9jayIsImhpc3RvcnlTaG91bGRCbG9jayIsInVuYmxvY2siLCJsb2NhdGlvbkRpZENoYW5nZSIsImxvY2F0aW9uIiwiaW5pdGlhbGl6ZUN1cnJlbnRMb2NhdGlvbiIsInJlcGxhY2VSb3V0ZXMiLCJyb3V0ZXMiLCJmbGF0dGVuUm91dGVzIiwidXBkYXRlUm91dGVzIiwiZGlkUmVwbGFjZVJvdXRlcyIsIm9sZFF1ZXJ5IiwibmV3UXVlcnkiLCJtZXJnZWRRdWVyeSIsImZpbHRlck9iamVjdCIsInRhcmdldCIsInByZWRpY2F0ZSIsInJlZHVjZSIsImFjYyIsImtleSIsIm1hcE9iamVjdCIsInRyYW5zZm9ybUtleSIsInRyYW5zZm9ybVZhbHVlIiwibmV3S2V5IiwibmV3VmFsdWUiLCJvbmx5Um91dGVzIiwid2l0aG91dFJvdXRlcyIsImZvckVhY2giLCJiYXNlUm91dGUiLCJyb3V0ZUtleSIsInJvdXRlVmFsdWUiLCJwYXJlbnQiLCJyb3V0ZSIsImFzc2lnbiIsIlJPVVRFX0ZBTExCQUNLIiwiTWF0Y2hDYWNoZSIsIl9kYXRhIiwicGFyZW50SWQiLCJlcnJvck1zZyIsImFyZ3MiLCJhcmdzU3RyaW5nIiwic3RyIiwiYXJnIiwiRXJyb3IiLCJjcmVhdGVCcm93c2VyUm91dGVyIiwiaW5zdGFsbGVyIiwiYmFzZW5hbWUiLCJoaXN0b3J5T3B0aW9ucyIsImhpc3RvcnkiLCJjcmVhdGVCcm93c2VySGlzdG9yeSIsImZ1bGxQYXRobmFtZSIsInBhdGhuYW1lIiwiaGFzaCIsInN0YXRlIiwic2xpY2UiLCJkZXNjcmlwdG9yIiwiaW5zdGFsbCIsImZsb3ciLCJmdW5jcyIsInByZXYiLCJjdXJyIiwicmVzb2x2ZVF1ZXJ5Iiwib2xkTG9jYXRpb24iLCJuZXdMb2NhdGlvbiIsInBlcnNpc3RRdWVyeSIsIm1lcmdlUXVlcmllcyIsInJlc29sdmVCYXNlbmFtZSIsInJlc29sdmVQcmV2aW91cyIsInByZXZpb3VzIiwicmVzb2x2ZUxvY2F0aW9uIiwibG9jYXRpb25DaGFuZ2VSZWR1Y2VyIiwicXVldWUiLCJxdWV1ZWRMb2NhdGlvbiIsIm5ld1F1ZXVlIiwiY3VycmVudFJvdXRlcyIsInJlc29sdmVkTmV3TG9jYXRpb24iLCJpbml0aWFsTG9jYXRpb24iLCJjb25jYXQiLCJuYXZpZ2F0ZSIsImhhbmRsZU5hdmlnYXRpb25BY3Rpb24iLCJuZXh0Iiwib3JpZ2luYWxEaXNwYXRjaCIsImdldFN0YXRlIiwicm91dGVyIiwiY3JlYXRlU3RvcmVTdWJzY3JpYmVyIiwiZGlzcGF0Y2giLCJjcmVhdGVNYXRjaGVyIiwiY3VycmVudE1hdGNoZXIiLCJjcmVhdGVIaXN0b3J5TGlzdGVuZXIiLCJtYXRjaENhY2hlIiwiY2xlYXIiLCJtYXRjaCIsInN1YnNjcmliZVRvU3RvcmVBbmRIaXN0b3J5IiwibWF0Y2hSb3V0ZSIsInN1YnNjcmliZVRvU3RvcmUiLCJzdWJzY3JpYmVUb0hpc3RvcnkiLCJzdG9yZVN1YnNjcmliZXIiLCJoaXN0b3J5TGlzdGVuZXIiLCJjcmVhdGVTdG9yZSIsInVzZXJSZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwic3RvcmUiLCJzdWJzY3JpYmUiLCJsaXN0ZW4iLCJyb3V0ZXJTdGF0ZSIsIm5lc3RlZFJvdXRlcyIsIm1hdGNoZXJGYWN0b3J5IiwidmFsaWRhdGVSb3V0ZXMiLCJoYXNUcmFpbGluZ1NsYXNoIiwiZWFnZXJNYXRjaGVyIiwicm91dGVMaXN0IiwiaW5jb21pbmdVcmwiLCJzcGxpdCIsInBhdGgiLCJpIiwic3RvcmVkUm91dGUiLCJwYXR0ZXJuIiwicGFyYW1zIiwicmVzdWx0Iiwic29ydCIsInJldmVyc2UiLCJtYXAiLCJVcmxQYXR0ZXJuIiwiUkVBRE1FX01FU1NBR0UiLCJ0aHJvd0Vycm9yIiwiZXZlcnkiLCJjcmVhdGVIYXNoUm91dGVyIiwiaGFzaFR5cGUiLCJjcmVhdGVIYXNoSGlzdG9yeSIsImxvY2F0aW9uRm9yUmVxdWVzdCIsInJlcXVlc3QiLCJiYXNlVXJsIiwiY3JlYXRlRXhwcmVzc1JvdXRlciIsImNyZWF0ZU1lbW9yeUhpc3RvcnkiLCJjcmVhdGVIYXBpUm91dGVyIiwiTEVGVF9NT1VTRV9CVVRUT04iLCJpc05vdExlZnRDbGljayIsImUiLCJidXR0b24iLCJoYXNNb2RpZmllciIsIkJvb2xlYW4iLCJzaGlmdEtleSIsImFsdEtleSIsIm1ldGFLZXkiLCJjdHJsS2V5Iiwic2hvdWxkSWdub3JlQ2xpY2siLCJkZWZhdWx0UHJldmVudGVkIiwiaGFuZGxlQ2xpY2siLCJvbkNsaWNrIiwicmVwbGFjZVN0YXRlIiwicHJldmVudERlZmF1bHQiLCJjb250ZXh0aWZ5SHJlZiIsIkxpbmtDb21wb25lbnQiLCJwcm9wcyIsInJhd0hyZWYiLCJjaGlsZHJlbiIsImFjdGl2ZVByb3BzIiwicmVzdCIsIm5vcm1hbGl6ZWRIcmVmIiwiaXNBY3RpdmUiLCJhY3RpdmVSZXN0IiwiY2xpY2tIYW5kbGVyIiwic3RyaW5naWZ5SHJlZiIsIkNvbXBvbmVudCIsIlBlcnNpc3RlbnRRdWVyeUxpbmtDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJub2RlIiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwicHVzaEFjdGlvbiIsInJlcGxhY2VBY3Rpb24iLCJ3aXRoTG9jYXRpb24iLCJjb25uZWN0IiwiTGlua1dpdGhMb2NhdGlvbiIsIlBlcnNpc3RlbnRRdWVyeUxpbmtXaXRoTG9jYXRpb24iLCJ3aXRoSWQiLCJpZCIsImdlbmVyYXRlSWQiLCJyZXNvbHZlQ2hpbGRSb3V0ZSIsInBhcmVudFJvdXRlIiwiY3VycmVudFJvdXRlIiwicGFyZW50SXNSb290Um91dGUiLCJyZXNvbHZlQ3VycmVudFJvdXRlIiwiY3VycmVudElzUm9vdFJvdXRlIiwicm91dGVQcmVmaXgiLCJyb3V0ZVN1ZmZpeCIsIndpbGRjYXJkIiwic2hvdWxkU2hvd0ZyYWdtZW50IiwiZm9yUm91dGUiLCJ3aXRoQ29uZGl0aW9ucyIsIm1hdGNoZXIiLCJtYXRjaGVzUm91dGUiLCJGcmFnbWVudENvbXBvbmVudCIsIm5leHRQcm9wcyIsImZvck5vTWF0Y2giLCJzaG91bGRTaG93IiwicHJldmlvdXNNYXRjaCIsImdldCIsImFkZCIsIkNoaWxkcmVuIiwib25seSIsIndpdGhJZEFuZENvbnRleHQiLCJzdHJpbmciLCJyYWRpeCIsIk1hdGgiLCJyYW5kb20iLCJEYXRlIiwibm93IiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7Ozs7Ozs7QUM3REE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtB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c0IsbUJBQU8sQ0FBQyxFQUFtQjtBQUNqRCxtQkFBbUIsbUJBQU8sQ0FBQyxFQUFlO0FBQzFDLHNCQUFzQixtQkFBTyxDQUFDLEVBQXNCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixvQkFBb0I7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7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O0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2Is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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsdUVBQXVFLGFBQWE7QUFDcEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaU9BQWlPO0FBQ2pPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLG9PQUFvTztBQUNwTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsZ0ZBQWdGOztBQUVoRixzREFBc0QsdUJBQXVCOztBQUU3RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLG9FQUFvRTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsRUFBRTs7QUFFTDs7QUFFQTtBQUNBLGlPQUFpTztBQUNqTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxvT0FBb087QUFDcE87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoN0JBOzs7QUFPQTs7QUFhQSxJQUFNQyxPQUFPLFNBQVBBLElBQU87QUFBQSxvQ0FBSUMsS0FBSjtBQUFJQSxTQUFKO0FBQUE7O0FBQUEsU0FDWEEsTUFBTXpDLE1BQU4sQ0FBYSxVQUFDMEMsSUFBRCxFQUFPQyxJQUFQO0FBQUEsV0FBZ0I7QUFBQSxhQUF1QkEsS0FBS0QsZ0NBQUwsQ0FBdkI7QUFBQSxLQUFoQjtBQUFBLEdBQWIsQ0FEVztBQUFBLENBQWI7O0FBR0EsSUFBTUUsZUFBZSxTQUFmQSxZQUFlLE9BSWE7QUFBQSxNQUhoQ0MsV0FHZ0MsUUFIaENBLFdBR2dDO0FBQUEsTUFGaENDLFdBRWdDLFFBRmhDQSxXQUVnQztBQUFBLE1BRGhDdkUsT0FDZ0MsUUFEaENBLE9BQ2dDOztBQUNoQztBQUNBLE1BQUlBLFFBQVF3RSxZQUFaLEVBQTBCO0FBQ3hCLFFBQU1uRCxjQUFjb0QsNEVBQVlBLENBQUNILFlBQVl0RyxLQUF6QixFQUFnQ3VHLFlBQVl2RyxLQUE1QyxDQUFwQjtBQUNBLFdBQU87QUFDTHNHLDhCQURLO0FBRUxDLGdDQUNLQSxXQURMLEVBRUtsRCxXQUZMLENBRks7QUFNTHJCO0FBTkssS0FBUDtBQVFEOztBQUVELFNBQU87QUFDTHNFLDRCQURLO0FBRUxDLDhCQUNLQSxXQURMO0FBRUV2RyxhQUFPdUcsWUFBWXZHO0FBRnJCLE1BRks7QUFNTGdDO0FBTkssR0FBUDtBQVFELENBMUJEOztBQTRCQSxJQUFNMEUsa0JBQWtCLFNBQWxCQSxlQUFrQixRQUlVO0FBQUEsTUFIaENKLFdBR2dDLFNBSGhDQSxXQUdnQztBQUFBLE1BRmhDQyxXQUVnQyxTQUZoQ0EsV0FFZ0M7QUFBQSxNQURoQ3ZFLE9BQ2dDLFNBRGhDQSxPQUNnQztBQUFBLE1BQ3hCc0QsUUFEd0IsR0FDWGdCLFdBRFcsQ0FDeEJoQixRQUR3Qjs7QUFFaEMsTUFBSUEsUUFBSixFQUFjO0FBQ1osV0FBTztBQUNMZ0IsOEJBREs7QUFFTEMsOEJBQWVqQixrQkFBZixJQUE0QmlCLFdBQTVCLENBRks7QUFHTHZFO0FBSEssS0FBUDtBQUtEO0FBQ0QsU0FBTyxFQUFFc0Usd0JBQUYsRUFBZUMsd0JBQWYsRUFBNEJ2RSxnQkFBNUIsRUFBUDtBQUNELENBZEQ7O0FBZ0JBLElBQU0yRSxrQkFBa0IsU0FBbEJBLGVBQWtCO0FBQUEsTUFDdEJMLFdBRHNCLFNBQ3RCQSxXQURzQjtBQUFBLE1BRXRCQyxXQUZzQixTQUV0QkEsV0FGc0I7QUFBQSxNQUd0QnZFLE9BSHNCLFNBR3RCQSxPQUhzQjtBQUFBLFNBSVc7QUFDakNzRSw0QkFEaUM7QUFFakNDLDhCQUNLQSxXQURMO0FBRUVLLGdCQUFVTjtBQUZaLE1BRmlDO0FBTWpDdEU7QUFOaUMsR0FKWDtBQUFBLENBQXhCOztBQWFPLElBQU02RSxrQkFBa0JaLEtBQzdCSSxZQUQ2QixFQUU3QkssZUFGNkIsRUFHN0JDLGVBSDZCLENBQXhCOztBQU1QLElBQU1HLHdCQUF3QixTQUF4QkEscUJBQXdCLENBQUNqQixLQUFELEVBQVF0RSxNQUFSLEVBQW1CO0FBQy9DO0FBRCtDLHFCQUV4QnNFLEtBRndCLENBRXZDa0IsS0FGdUM7QUFBQSxNQUV2Q0EsS0FGdUMsZ0NBRS9CLEVBRitCOztBQUcvQyxNQUNFbEIsTUFBTUYsUUFBTixLQUFtQnBFLE9BQU9VLE9BQVAsQ0FBZTBELFFBQWxDLElBQ0FFLE1BQU0vRixNQUFOLEtBQWlCeUIsT0FBT1UsT0FBUCxDQUFlbkMsTUFEaEMsSUFFQStGLE1BQU1ELElBQU4sS0FBZXJFLE9BQU9VLE9BQVAsQ0FBZTJELElBRjlCLElBR0EsQ0FBQ21CLE1BQU16RyxNQUpULEVBS0U7QUFDQSxXQUFPdUYsS0FBUDtBQUNEOztBQUVELE1BQU1tQixpQkFBaUJELE1BQU0sQ0FBTixLQUFZLEVBQW5DO0FBQ0EsTUFBTUUsV0FBV0YsTUFBTWpCLEtBQU4sQ0FBWSxDQUFaLENBQWpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQWxCK0MsTUFtQnZDYyxRQW5CdUMsR0FtQmtCZixLQW5CbEIsQ0FtQnZDZSxRQW5CdUM7QUFBQSxzQkFtQmtCZixLQW5CbEIsQ0FtQjdCOUMsTUFuQjZCO0FBQUEsTUFtQnJCbUUsYUFuQnFCLGlDQW1CTCxFQW5CSztBQUFBLE1BbUJFWixXQW5CRiw0QkFtQmtCVCxLQW5CbEI7O0FBQUEsOEJBb0JWbUIsY0FwQlUsQ0FvQnZDaEYsT0FwQnVDO0FBQUEsTUFvQnZDQSxPQXBCdUMseUNBb0I3QixFQXBCNkI7QUFBQSw4QkFvQlZnRixjQXBCVSxDQW9CekJoSCxLQXBCeUI7QUFBQSxNQW9CekJBLEtBcEJ5Qix5Q0FvQmpCLEVBcEJpQjs7QUFxQi9DLE1BQU11RywyQkFBbUJoRixPQUFPVSxPQUExQixJQUFtQ2pDLFlBQW5DLEdBQU47O0FBckIrQyx5QkF1QkY2RyxnQkFBZ0I7QUFDM0RQLDRCQUQyRDtBQUUzREMsNEJBRjJEO0FBRzNEdkU7QUFIMkQsR0FBaEIsQ0F2QkU7QUFBQSxNQXVCMUJtRixtQkF2QjBCLG9CQXVCdkNaLFdBdkJ1Qzs7QUE2Qi9DLHNCQUFZWSxtQkFBWixJQUFpQ3BFLFFBQVFtRSxhQUF6QyxFQUF3REgsT0FBT0UsUUFBL0Q7QUFDRCxDQTlCRDs7QUFnQ2U7QUFBQSxrRkFBaUQsRUFBakQ7QUFBQSwyQkFBR2xFLE1BQUg7QUFBQSxNQUFHQSxNQUFILGdDQUFZLEVBQVo7QUFBQSxNQUFnQnFFLGVBQWhCLFNBQWdCQSxlQUFoQjs7QUFBQSxTQUF3RCxZQUdsRTtBQUFBLFFBRkh2QixLQUVHLG9GQUZvQnVCLGVBRXBCLElBRnFDckUsY0FFckMsRUFGNkNnRSxPQUFPLEVBRXBEO0FBQUEsUUFESHhGLE1BQ0c7O0FBQ0gsUUFBSUcscUZBQTZCQSxDQUFDSCxNQUE5QixDQUFKLEVBQTJDO0FBQ3pDLDBCQUNLc0UsS0FETDtBQUVFa0IsZUFBT2xCLE1BQU1rQixLQUFOLElBQWVsQixNQUFNa0IsS0FBTixDQUFZTSxNQUFaLENBQW1CLENBQUM5RixPQUFPVSxPQUFSLENBQW5CO0FBRnhCO0FBSUQ7O0FBRUQsUUFBSVYsT0FBT0UsSUFBUCxLQUFnQlAsOERBQXBCLEVBQW9DO0FBQ2xDLDBCQUNLMkUsS0FETDtBQUVFOUMsZ0JBQVF4QixPQUFPVSxPQUFQLENBQWVjLE1BRnpCO0FBR0VmLGlCQUFTVCxPQUFPVSxPQUFQLENBQWVEO0FBSDFCO0FBS0Q7O0FBRUQsUUFBSVQsT0FBT0UsSUFBUCxLQUFnQk4sa0VBQXBCLEVBQXdDO0FBQ3RDLDBCQUFZMEUsS0FBWixJQUFtQjdELFNBQVMsRUFBNUI7QUFDRDs7QUFFRCxRQUFJVCxPQUFPRSxJQUFQLEtBQWdCaEIsZ0VBQXBCLEVBQXNDO0FBQ3BDLGFBQU9xRyxzQkFBc0JqQixLQUF0QixFQUE2QnRFLE1BQTdCLENBQVA7QUFDRDs7QUFFRCxXQUFPc0UsS0FBUDtBQUNELEdBNUJjO0FBQUEsQ0FBZixFOzs7Ozs7Ozs7Ozs7QUNuSEE7QUFMQTs7O0FBZ0JBOztBQWFBLElBQUluRCxVQUFVLElBQWQ7O0FBRUEsSUFBTTRFLFdBQVcsU0FBWEEsUUFBVyxDQUFDOUIsT0FBRCxFQUFVakUsTUFBVixFQUFxQjtBQUNwQyxVQUFRQSxPQUFPRSxJQUFmO0FBQ0UsU0FBS2Ysb0RBQUw7QUFDRThFLGNBQVF6RCxJQUFSLENBQWFSLE9BQU9VLE9BQXBCO0FBQ0E7QUFDRixTQUFLdEIsdURBQUw7QUFDRTZFLGNBQVFyRCxPQUFSLENBQWdCWixPQUFPVSxPQUF2QjtBQUNBO0FBQ0YsU0FBS3JCLGtEQUFMO0FBQ0U0RSxjQUFRcEQsRUFBUixDQUFXYixPQUFPVSxPQUFsQjtBQUNBO0FBQ0YsU0FBS3BCLHVEQUFMO0FBQ0UyRSxjQUFRbEQsTUFBUjtBQUNBO0FBQ0YsU0FBS3hCLDBEQUFMO0FBQ0UwRSxjQUFRakQsU0FBUjtBQUNBO0FBQ0YsU0FBS3ZCLHFEQUFMO0FBQ0UwQixnQkFBVThDLFFBQVFoRCxLQUFSLENBQWNqQixPQUFPVSxPQUFyQixDQUFWO0FBQ0E7QUFDRixTQUFLaEIsdURBQUw7QUFDRSxVQUFJeUIsT0FBSixFQUFhO0FBQ1hBO0FBQ0Q7QUFDRDtBQUNGO0FBQ0U7QUF6Qko7QUEyQkQsQ0E1QkQ7O0FBOEJPLElBQU02RSx5QkFBeUIsU0FBekJBLHNCQUF5QixPQUtqQjtBQUFBLE1BSm5CQyxJQUltQixRQUpuQkEsSUFJbUI7QUFBQSxNQUhuQmpHLE1BR21CLFFBSG5CQSxNQUdtQjtBQUFBLE1BRm5CaUUsT0FFbUIsUUFGbkJBLE9BRW1CO0FBQUEsTUFEbkJ4RixLQUNtQixRQURuQkEsS0FDbUI7O0FBQ25CO0FBQ0E7QUFDQSxNQUFNeUgsbUJBQW1CRCxLQUFLakcsTUFBTCxDQUF6Qjs7QUFFQSxNQUNFLENBQUNBLE9BQU9FLElBQVAsS0FBZ0JmLG9EQUFoQixJQUF3QmEsT0FBT0UsSUFBUCxLQUFnQmQsdURBQXpDLEtBQ0FZLE9BQU9VLE9BQVAsQ0FBZUQsT0FEZixJQUVBVCxPQUFPVSxPQUFQLENBQWVELE9BQWYsQ0FBdUJ3RSxZQUh6QixFQUlFO0FBQ0FjLGFBQVM5QixPQUFULEVBQWtCO0FBQ2hCL0QsWUFBTUYsT0FBT0UsSUFERztBQUVoQlEsNEJBQ0tWLE9BQU9VLE9BRFosRUFFS3dFLDRFQUFZQSxDQUFDekcsS0FBYixFQUFvQnVCLE9BQU9VLE9BQVAsQ0FBZWpDLEtBQW5DLENBRkw7QUFGZ0IsS0FBbEI7QUFPRCxHQVpELE1BWU87QUFDTHNILGFBQVM5QixPQUFULEVBQWtCakUsTUFBbEI7QUFDRDs7QUFFRCxTQUFPa0csZ0JBQVA7QUFDRCxDQTNCTTs7QUE2QlE7QUFBQSxNQUFHakMsT0FBSCxTQUFHQSxPQUFIO0FBQUEsU0FBaUM7QUFBQSxRQUM5Q2tDLFFBRDhDLFNBQzlDQSxRQUQ4QztBQUFBLFdBRXpCLFVBQUNGLElBQUQ7QUFBQSxhQUF1QixVQUFDakcsTUFBRCxFQUEwQjtBQUFBLFlBQzlEdkIsS0FEOEQsR0FDcEQwSCxXQUFXQyxNQUR5QyxDQUM5RDNILEtBRDhEOztBQUV0RSxlQUFPc0IsMEVBQWtCQSxDQUFDQyxNQUFuQixJQUNIZ0csdUJBQXVCLEVBQUVDLFVBQUYsRUFBUWpHLGNBQVIsRUFBZ0JpRSxnQkFBaEIsRUFBeUJ4RixZQUF6QixFQUF2QixDQURHLEdBRUh3SCxLQUFLakcsTUFBTCxDQUZKO0FBR0QsT0FMc0I7QUFBQSxLQUZ5QjtBQUFBLEdBQWpDO0FBQUEsQ0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7OztBQy9FQTs7O0FBRUE7QUFDQTs7QUFFQTs7QUFpQk8sSUFBTXFHLHdCQUF3QixTQUF4QkEscUJBQXdCLENBQ25DRixRQURtQyxFQUVuQ0csUUFGbUMsRUFHbkNDLGFBSG1DO0FBQUEsU0FJaEMsVUFBQ0MsY0FBRCxFQUE4QjtBQUFBLG9CQUN3QkwsVUFEeEI7QUFBQSxRQUN6QjNFLE1BRHlCLGFBQ3pCQSxNQUR5QjtBQUFBLFFBQ2pCNEMsUUFEaUIsYUFDakJBLFFBRGlCO0FBQUEsUUFDUDdGLE1BRE8sYUFDUEEsTUFETztBQUFBLFFBQ0M4RixJQURELGFBQ0NBLElBREQ7QUFBQSxRQUNPM0MsWUFEUCxhQUNPQSxZQURQOztBQUdqQyxRQUFJQSxZQUFKLEVBQWtCO0FBQ2hCOEUsdUJBQWlCRCxjQUFjL0UsTUFBZCxDQUFqQjtBQUNBOEUsZUFBUzNFLDBFQUFnQkEsRUFBekI7QUFDQTJFLGVBQVMxRixpRUFBT0EsQ0FBQyxFQUFFd0Qsa0JBQUYsRUFBWTdGLGNBQVosRUFBb0I4RixVQUFwQixFQUFSLENBQVQ7QUFDRDs7QUFFRCxXQUFPbUMsY0FBUDtBQUNELEdBZG9DO0FBQUEsQ0FBOUI7O0FBZ0JBLElBQU1DLHdCQUF3QixTQUF4QkEscUJBQXdCLENBQUNILFFBQUQ7QUFBQSxTQUEyQixVQUM5REUsY0FEOEQsRUFFOURuRixRQUY4RCxFQUc5RHJCLE1BSDhELEVBSTNEO0FBQ0gwRyxzRUFBVUEsQ0FBQ0MsS0FBWDs7QUFFQSxRQUFNQyxRQUFRSixlQUFlbkYsU0FBUytDLFFBQXhCLENBQWQ7QUFDQSxRQUFNMUQsdUJBQ0RXLFFBREMsRUFFRHVGLEtBRkM7QUFHSm5JLGFBQU9DLG9EQUFFQSxDQUFDQyxLQUFILENBQVMwQyxTQUFTOUMsTUFBVCxJQUFtQixFQUE1QjtBQUhILE1BQU47O0FBTUE7QUFDQTtBQUNBLFFBQUl5QixXQUFXLEtBQWYsRUFBc0I7QUFDcEJzRyxlQUFTO0FBQ1BwRyxjQUFNVixtREFEQztBQUVQa0I7QUFGTyxPQUFUO0FBSUQ7O0FBRUQ0RixhQUFTbEYsMkVBQWlCQSxDQUFDVixPQUFsQixDQUFUO0FBQ0QsR0F4Qm9DO0FBQUEsQ0FBOUI7O0FBMEJBLElBQU1tRyw2QkFBNkIsU0FBN0JBLDBCQUE2QixPQU9yQjtBQUFBLE1BTm5CVixRQU1tQixRQU5uQkEsUUFNbUI7QUFBQSxNQUxuQkcsUUFLbUIsUUFMbkJBLFFBS21CO0FBQUEsTUFKbkJDLGFBSW1CLFFBSm5CQSxhQUltQjtBQUFBLE1BSG5CTyxVQUdtQixRQUhuQkEsVUFHbUI7QUFBQSxNQUZuQkMsZ0JBRW1CLFFBRm5CQSxnQkFFbUI7QUFBQSxNQURuQkMsa0JBQ21CLFFBRG5CQSxrQkFDbUI7O0FBQ25CLE1BQU1DLGtCQUFrQlosc0JBQ3RCRixRQURzQixFQUV0QkcsUUFGc0IsRUFHdEJDLGFBSHNCLENBQXhCO0FBS0EsTUFBTVcsa0JBQWtCVCxzQkFBc0JILFFBQXRCLENBQXhCOztBQUVBLE1BQUlFLGlCQUFpQk0sVUFBckI7O0FBRUE7QUFDQUMsbUJBQWlCLFlBQU07QUFDckJQLHFCQUFpQlMsZ0JBQWdCVCxjQUFoQixDQUFqQjtBQUNELEdBRkQ7O0FBSUFRLHFCQUFtQixVQUFDM0YsUUFBRCxFQUFXckIsTUFBWDtBQUFBLFdBQ2pCa0gsZ0JBQWdCVixjQUFoQixFQUFnQ25GLFFBQWhDLEVBQTBDckIsTUFBMUMsQ0FEaUI7QUFBQSxHQUFuQjtBQUdELENBekJNOztBQTJCUTtBQUFBLE1BQUdpRSxPQUFILFNBQUdBLE9BQUg7QUFBQSxNQUFZNkMsVUFBWixTQUFZQSxVQUFaO0FBQUEsTUFBd0JQLGFBQXhCLFNBQXdCQSxhQUF4QjtBQUFBLFNBQTBELFVBQ3ZFWSxXQUR1RTtBQUFBLFdBRXBFLFVBQ0hDLFdBREcsRUFFSEMsWUFGRyxFQUdIOUcsUUFIRyxFQUlBO0FBQ0gsVUFBTStHLFFBQVFILFlBQVlDLFdBQVosRUFBeUJDLFlBQXpCLEVBQXVDOUcsUUFBdkMsQ0FBZDtBQURHLFVBRUsrRixRQUZMLEdBRStDZ0IsS0FGL0MsQ0FFS2hCLFFBRkw7QUFBQSxVQUUwQlMsZ0JBRjFCLEdBRStDTyxLQUYvQyxDQUVlQyxTQUZmO0FBQUEsVUFHYVAsa0JBSGIsR0FHb0MvQyxPQUhwQyxDQUdLdUQsTUFITDs7O0FBS0gsVUFBTXJCLFdBQVcsU0FBWEEsUUFBVyxHQUFNO0FBQ3JCLFlBQU1zQixjQUFjSCxNQUFNbkIsUUFBTixHQUFpQkMsTUFBckM7QUFEcUIsbUNBRXNCcUIsV0FGdEIsQ0FFYmhILE9BRmE7QUFBQSxvRUFFZSxFQUZmO0FBQUEsWUFFRmlCLFlBRkUsd0JBRUZBLFlBRkU7O0FBR3JCLDRCQUFZK0YsV0FBWixJQUF5Qi9GLDBCQUF6QjtBQUNELE9BSkQ7O0FBTUFtRixpQ0FBMkI7QUFDekJWLDBCQUR5QjtBQUV6QkcsMEJBRnlCO0FBR3pCQyxvQ0FIeUI7QUFJekJPLDhCQUp5QjtBQUt6QkMsMENBTHlCO0FBTXpCQztBQU55QixPQUEzQjs7QUFTQSwwQkFDS00sS0FETDtBQUVFUjtBQUZGO0FBSUQsS0E5QndFO0FBQUEsR0FBMUQ7QUFBQSxDQUFmLEU7Ozs7Ozs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7O0FBZWU7QUFBQSxNQUFHekcsT0FBSCxRQUFHQSxPQUFIO0FBQUEsTUFBWUMsVUFBWixRQUFZQSxVQUFaO0FBQUEsTUFBd0JDLFFBQXhCLFFBQXdCQSxRQUF4QjtBQUFBLFNBQTBELGlCQUt0RDtBQUFBLFFBSlRtSCxZQUlTLFNBSmpCbEcsTUFJaUI7QUFBQSxRQUhqQnlDLE9BR2lCLFNBSGpCQSxPQUdpQjtBQUFBLFFBRmpCNUMsUUFFaUIsU0FGakJBLFFBRWlCO0FBQUEsb0NBRGpCa0YsYUFDaUI7QUFBQSxRQURqQkEsYUFDaUIsdUNBRERvQixxRUFDQzs7QUFDakJDLGtGQUFjQSxDQUFDRixZQUFmO0FBQ0EsUUFBTWxHLFNBQVNDLDZFQUFhQSxDQUFDaUcsWUFBZCxDQUFmO0FBQ0EsUUFBTVosYUFBYVAsY0FBYy9FLE1BQWQsQ0FBbkI7O0FBRUEsV0FBTztBQUNMbkIsZUFBU0EsUUFBUTtBQUNmbUIsc0JBRGU7QUFFZnFFLHNDQUNLeEUsUUFETCxFQUVLeUYsV0FBV3pGLFNBQVMrQyxRQUFwQixDQUZMO0FBRmUsT0FBUixDQURKO0FBUUw5RCxrQkFBWUEsV0FBVyxFQUFFMkQsZ0JBQUYsRUFBWCxDQVJQO0FBU0wxRCxnQkFBVUEsU0FBUztBQUNqQjBELHdCQURpQjtBQUVqQjZDLDhCQUZpQjtBQUdqQlA7QUFIaUIsT0FBVDtBQVRMLEtBQVA7QUFlRCxHQXpCYztBQUFBLENBQWYsRTs7Ozs7OztBQ3BCQTtBQUFBO0FBQUE7O0FBUUEsSUFBTXNCLG1CQUFtQixRQUF6Qjs7QUFFQSxJQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsU0FBRDtBQUFBLFNBQWtDLFVBQ3JEQyxXQURxRCxFQUVsRDtBQUNIO0FBQ0EsUUFBTTVELFdBQVc0RCxZQUNkQyxLQURjLENBQ1IsR0FEUSxFQUNILENBREcsRUFFZHJILE9BRmMsQ0FFTmlILGdCQUZNLEVBRVk7QUFBQSxhQUFRSyxLQUFLM0QsS0FBTCxDQUFXLENBQVgsRUFBYzJELEtBQUtuSixNQUFMLEdBQWMsQ0FBNUIsQ0FBUjtBQUFBLEtBRlosQ0FBakI7O0FBSUE7QUFDQSxTQUFLLElBQUlvSixJQUFJLENBQWIsRUFBZ0JBLElBQUlKLFVBQVVoSixNQUE5QixFQUFzQ29KLEdBQXRDLEVBQTJDO0FBQ3pDLFVBQU1DLGNBQWNMLFVBQVVJLENBQVYsQ0FBcEI7QUFDQSxVQUFNdkIsUUFBUXdCLFlBQVlDLE9BQVosQ0FBb0J6QixLQUFwQixDQUEwQnhDLFFBQTFCLENBQWQ7O0FBRUEsVUFBSXdDLEtBQUosRUFBVztBQUNUO0FBQ0EsZUFBTztBQUNMM0QsaUJBQU9tRixZQUFZbkYsS0FEZDtBQUVMcUYsa0JBQVExQixLQUZIO0FBR0wyQixrQkFBUUgsWUFBWUc7QUFIZixTQUFQO0FBS0Q7QUFDRjs7QUFFRCxXQUFPLElBQVA7QUFDRCxHQXhCb0I7QUFBQSxDQUFyQjs7QUEwQmUsbUVBQUMvRyxNQUFELEVBQW9CO0FBQ2pDLE1BQU11RyxZQUFZbEosT0FBT0MsSUFBUCxDQUFZMEMsTUFBWixFQUNmZ0gsSUFEZSxHQUVmQyxPQUZlLEdBR2ZDLEdBSGUsQ0FHWDtBQUFBLFdBQVU7QUFDYnpGLGtCQURhO0FBRWJvRixlQUFTLElBQUlNLG1EQUFKLENBQWUxRixLQUFmLENBRkk7QUFHYnNGLGNBQVEvRyxPQUFPeUIsS0FBUDtBQUhLLEtBQVY7QUFBQSxHQUhXLENBQWxCOztBQVNBLFNBQU82RSxhQUFhQyxTQUFiLENBQVA7QUFDRCxDQVhELEU7Ozs7OztBQ3JDQTtBQUNBOzs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7O0FBRU8sSUFBTWEsZ0pBQU47O0FBS1EsbUVBQUNwSCxNQUFELEVBQW9CO0FBQ2pDLE1BQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1hxSCx5RUFBVUEsaUxBS05ELGNBTEo7QUFPRDs7QUFFRDtBQUNBLE1BQUksQ0FBQy9KLE9BQU9DLElBQVAsQ0FBWTBDLE1BQVosRUFBb0JzSCxLQUFwQixDQUEwQjtBQUFBLFdBQVM3RixNQUFNaEQsT0FBTixDQUFjLEdBQWQsTUFBdUIsQ0FBaEM7QUFBQSxHQUExQixDQUFMLEVBQW1FO0FBQ2pFNEkseUVBQVVBLHVJQUlORCxjQUpKO0FBTUQ7QUFDRixDQXBCRCxFOzs7Ozs7Ozs7Ozs7OztBQ05BOzs7QUFFQTtBQUNBOztBQVVPLElBQU1HLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQUNqRixTQUFEO0FBQUEsU0FBeUIsZ0JBTW5DO0FBQUEsUUFMcEJ0QyxNQUtvQixRQUxwQkEsTUFLb0I7QUFBQSxRQUpwQnVDLFFBSW9CLFFBSnBCQSxRQUlvQjtBQUFBLDZCQUhwQmlGLFFBR29CO0FBQUEsUUFIcEJBLFFBR29CLGlDQUhULE9BR1M7QUFBQSxRQUZwQmhGLGNBRW9CLFFBRnBCQSxjQUVvQjtBQUFBLDRCQURwQkMsT0FDb0I7QUFBQSxRQURwQkEsT0FDb0IsZ0NBRFZnRixpRUFBaUJBLFlBQUdsRixrQkFBcEIsRUFBOEJpRixrQkFBOUIsSUFBMkNoRixjQUEzQyxFQUNVOztBQUNwQixRQUFNUSxhQUFhVCxzQkFDYkEsa0JBRGEsSUFDQUUsUUFBUTVDLFFBRFIsSUFFZjRDLFFBQVE1QyxRQUZaOztBQUlBLFFBQU1BLFdBQVdWLDZFQUFhQSxDQUFDNkQsVUFBZCxDQUFqQjs7QUFFQSxXQUFPVixVQUFVLEVBQUV0QyxjQUFGLEVBQVV5QyxnQkFBVixFQUFtQjVDLGtCQUFuQixFQUFWLENBQVA7QUFDRCxHQWQrQjtBQUFBLENBQXpCOztBQWdCUTBILDBFQUFpQnRFLHlEQUFqQixDQUFmLEU7Ozs7Ozs7QUMvQmE7QUFDYixtQkFBTyxDQUFDLEVBQW9DO0FBQzVDLGlCQUFpQixtQkFBTyxDQUFDLEVBQVk7Ozs7Ozs7Ozs7Ozs7OztBQ0NyQzs7O0FBRUE7QUFDQTs7QUFhQSxJQUFNeUUscUJBQXFCLFNBQXJCQSxrQkFBcUIsVUFBVztBQUFBLE1BQ3RCOUUsUUFEc0IsR0FDaUIrRSxPQURqQixDQUM1QmpCLElBRDRCO0FBQUEsTUFDSG5FLFFBREcsR0FDaUJvRixPQURqQixDQUNaQyxPQURZO0FBQUEsTUFDTzNLLEtBRFAsR0FDaUIwSyxPQURqQixDQUNPMUssS0FEUDs7QUFFcEMsTUFBTStGLGFBQWFULFdBQ2YsRUFBRUssa0JBQUYsRUFBWUwsa0JBQVosRUFBc0J0RixZQUF0QixFQURlLEdBRWYsRUFBRTJGLGtCQUFGLEVBQVkzRixZQUFaLEVBRko7QUFHQSxTQUFPa0MsNkVBQWFBLENBQUM2RCxVQUFkLENBQVA7QUFDRCxDQU5EOztBQVFPLElBQU02RSxzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFDdkYsU0FBRDtBQUFBLFNBQXlCLGdCQUlwQztBQUFBLFFBSHRCdEMsTUFHc0IsUUFIdEJBLE1BR3NCO0FBQUEsUUFGdEIySCxPQUVzQixRQUZ0QkEsT0FFc0I7QUFBQSxtQ0FEdEJuRixjQUNzQjtBQUFBLFFBRHRCQSxjQUNzQix1Q0FETCxFQUNLOztBQUN0QixRQUFNQyxVQUFVcUYsbUVBQW1CQSxDQUFDdEYsY0FBcEIsQ0FBaEI7QUFDQSxRQUFNM0MsV0FBVzZILG1CQUFtQkMsT0FBbkIsQ0FBakI7O0FBRUEsV0FBT3JGLFVBQVUsRUFBRXRDLGNBQUYsRUFBVXlDLGdCQUFWLEVBQW1CNUMsa0JBQW5CLEVBQVYsQ0FBUDtBQUNELEdBVGtDO0FBQUEsQ0FBNUI7O0FBV1FnSSw2RUFBb0I1RSx5REFBcEIsQ0FBZixFOzs7Ozs7Ozs7Ozs7OztBQ25DQTs7O0FBRUE7QUFDQTs7QUFZTyxJQUFNOEUsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ3pGLFNBQUQ7QUFBQSxTQUF5QixnQkFJakM7QUFBQSxRQUh0QnRDLE1BR3NCLFFBSHRCQSxNQUdzQjtBQUFBLFFBRnRCMkgsT0FFc0IsUUFGdEJBLE9BRXNCO0FBQUEsbUNBRHRCbkYsY0FDc0I7QUFBQSxRQUR0QkEsY0FDc0IsdUNBREwsRUFDSzs7QUFDdEIsUUFBTUMsVUFBVXFGLG1FQUFtQkEsQ0FBQ3RGLGNBQXBCLENBQWhCOztBQUVBLFFBQU0zQyxXQUFXViw2RUFBYUEsQ0FBQztBQUM3QnlELGdCQUFVK0UsUUFBUWpCLElBRFc7QUFFN0J6SixhQUFPMEssUUFBUTFLO0FBRmMsS0FBZCxDQUFqQjs7QUFLQSxXQUFPcUYsVUFBVSxFQUFFdEMsY0FBRixFQUFVeUMsZ0JBQVYsRUFBbUI1QyxrQkFBbkIsRUFBVixDQUFQO0FBQ0QsR0FiK0I7QUFBQSxDQUF6Qjs7QUFlUWtJLDBFQUFpQjlFLHlEQUFqQixDQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBbUJBLElBQU0rRSxvQkFBb0IsQ0FBMUI7O0FBRUEsSUFBTUMsaUJBQWlCLFNBQWpCQSxjQUFpQjtBQUFBLFNBQUtDLEVBQUVDLE1BQUYsSUFBWUQsRUFBRUMsTUFBRixLQUFhSCxpQkFBOUI7QUFBQSxDQUF2Qjs7QUFFQSxJQUFNSSxjQUFjLFNBQWRBLFdBQWM7QUFBQSxTQUNsQkMsUUFBUUgsRUFBRUksUUFBRixJQUFjSixFQUFFSyxNQUFoQixJQUEwQkwsRUFBRU0sT0FBNUIsSUFBdUNOLEVBQUVPLE9BQWpELENBRGtCO0FBQUEsQ0FBcEI7O0FBR0EsSUFBTUMsb0JBQW9CLFNBQXBCQSxpQkFBb0I7QUFBQSxNQUFHUixDQUFILFFBQUdBLENBQUg7QUFBQSxNQUFNMUgsTUFBTixRQUFNQSxNQUFOO0FBQUEsU0FDeEI0SCxZQUFZRixDQUFaLEtBQWtCRCxlQUFlQyxDQUFmLENBQWxCLElBQXVDQSxFQUFFUyxnQkFBekMsSUFBNkRuSSxNQURyQztBQUFBLENBQTFCOztBQUdBLElBQU1vSSxjQUFjLFNBQWRBLFdBQWMsUUFTZDtBQUFBLE1BUkpWLENBUUksU0FSSkEsQ0FRSTtBQUFBLE1BUEoxSCxNQU9JLFNBUEpBLE1BT0k7QUFBQSxNQU5KM0QsSUFNSSxTQU5KQSxJQU1JO0FBQUEsTUFMSmdNLE9BS0ksU0FMSkEsT0FLSTtBQUFBLE1BSkpDLFlBSUksU0FKSkEsWUFJSTtBQUFBLE1BSEpyRixZQUdJLFNBSEpBLFlBR0k7QUFBQSxNQUZKekUsSUFFSSxTQUZKQSxJQUVJO0FBQUEsTUFESkksT0FDSSxTQURKQSxPQUNJOztBQUNKLE1BQUl5SixPQUFKLEVBQWE7QUFDWEEsWUFBUVgsQ0FBUjtBQUNEOztBQUVELE1BQUlRLGtCQUFrQixFQUFFUixJQUFGLEVBQUsxSCxjQUFMLEVBQWxCLENBQUosRUFBc0M7QUFDcEM7QUFDRDs7QUFFRDBILElBQUVhLGNBQUY7O0FBRUEsTUFBTXhFLFdBQVd1RSxlQUFlMUosT0FBZixHQUF5QkosSUFBMUM7QUFDQXVGLFdBQVMxSCxJQUFULEVBQWUsRUFBRTRHLDBCQUFGLEVBQWY7QUFDRCxDQXRCRDs7QUF3QkE7QUFDQTtBQUNBLElBQU11RixpQkFBaUIsU0FBakJBLGNBQWlCLENBQUNuTSxJQUFELEVBQU9nRCxRQUFQLEVBQWlCNEQsWUFBakIsRUFBa0M7QUFDdkQsTUFBSSxDQUFDQSxZQUFMLEVBQW1CO0FBQ2pCLFdBQU81RyxJQUFQO0FBQ0Q7O0FBRUQsTUFBTXlELGNBQWNvRCw0RUFBWUEsQ0FBQzdELFNBQVM1QyxLQUF0QixFQUE2QkosS0FBS0ksS0FBbEMsQ0FBcEI7O0FBRUEsc0JBQ0tKLElBREwsRUFFS3lELFdBRkw7QUFJRCxDQVhEOztJQWFNMkksYTs7O0FBQ0oseUJBQVlDLEtBQVosRUFBMEI7QUFBQTs7QUFBQSx5SEFDbEJBLEtBRGtCO0FBRXpCOzs7OzZCQUVRO0FBQUEsbUJBYUgsS0FBS0EsS0FiRjtBQUFBLFVBRUNDLE9BRkQsVUFFTHRNLElBRks7QUFBQSxVQUdMZ0QsUUFISyxVQUdMQSxRQUhLO0FBQUEsVUFJTHVKLFFBSkssVUFJTEEsUUFKSztBQUFBLFVBS0xQLE9BTEssVUFLTEEsT0FMSztBQUFBLFVBTUxySSxNQU5LLFVBTUxBLE1BTks7QUFBQSxVQU9MNkksV0FQSyxVQU9MQSxXQVBLO0FBQUEsVUFRTFAsWUFSSyxVQVFMQSxZQVJLO0FBQUEsVUFTTHJGLFlBVEssVUFTTEEsWUFUSztBQUFBLFVBVUx6RSxJQVZLLFVBVUxBLElBVks7QUFBQSxVQVdMSSxPQVhLLFVBV0xBLE9BWEs7QUFBQSxVQVlGa0ssSUFaRTs7QUFlUDs7O0FBQ0EsVUFBTUMsaUJBQWlCcEssNkVBQWFBLENBQUNnSyxPQUFkLENBQXZCO0FBQ0EsVUFBTXRNLE9BQU9tTSxlQUFlTyxjQUFmLEVBQStCMUosUUFBL0IsRUFBeUM0RCxZQUF6QyxDQUFiO0FBQ0EsVUFBTStGLFdBQVczTSxLQUFLK0YsUUFBTCxLQUFrQi9DLFNBQVMrQyxRQUE1QztBQUNBLFVBQU02RyxhQUFjRCxZQUFZSCxXQUFiLElBQTZCLEVBQWhEOztBQUVBLFVBQU1LLGVBQWUsU0FBZkEsWUFBZTtBQUFBLGVBQ25CZCxZQUFZO0FBQ1ZWLGNBRFU7QUFFVjFILHdCQUZVO0FBR1YzRCxvQkFIVTtBQUlWZ00sMEJBSlU7QUFLVkMsb0NBTFU7QUFNVnJGLG9DQU5VO0FBT1Z6RSxvQkFQVTtBQVFWSTtBQVJVLFNBQVosQ0FEbUI7QUFBQSxPQUFyQjs7QUFZQSxhQUNFO0FBQUE7QUFBQTtBQUNFLGdCQUFNdUssNkVBQWFBLENBQUM5TSxJQUFkLEVBQW9CZ0QsU0FBUzBDLFFBQTdCLENBRFI7QUFFRSxtQkFBU21ILFlBRlg7QUFHRSxrQkFBUWxKO0FBSFYsV0FJTThJLElBSk4sRUFLTUcsVUFMTjtBQU9HTDtBQVBILE9BREY7QUFXRDs7OztFQWpEeUJRLGdEOztBQW9ENUIsSUFBTUM7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLDZCQUNLO0FBQUEsb0JBQ3VCLEtBQUtYLEtBRDVCO0FBQUEsVUFDQ0UsUUFERCxXQUNDQSxRQUREO0FBQUEsVUFDY0UsSUFEZDs7QUFFUCxhQUNFO0FBQUMscUJBQUQ7QUFBQSxxQkFBbUJBLElBQW5CLElBQXlCLGtCQUF6QjtBQUNHRjtBQURILE9BREY7QUFLRDtBQVJHOztBQUFBO0FBQUEsRUFBNkNRLGdEQUE3QyxDQUFOOztBQVdBQyw2QkFBNkJDLFNBQTdCLEdBQXlDO0FBQ3ZDVixZQUFVVyxrREFBU0EsQ0FBQ0M7QUFEbUIsQ0FBekM7O0FBSUEsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQVUsRUFBRXBLLFVBQVVpRCxNQUFNOEIsTUFBbEIsRUFBVjtBQUFBLENBQXhCO0FBQ0EsSUFBTXNGLHFCQUFxQjtBQUN6QmxMLFFBQU1tTCxzREFEbUI7QUFFekIvSyxXQUFTZ0wseURBQWFBO0FBRkcsQ0FBM0I7QUFJQSxJQUFNQyxlQUFlQyxvRUFBT0EsQ0FBQ0wsZUFBUixFQUF5QkMsa0JBQXpCLENBQXJCOztBQUVBLElBQU1LLG1CQUFtQkYsYUFBYXBCLGFBQWIsQ0FBekI7QUFDQSxJQUFNdUIsa0NBQWtDSCxhQUN0Q1IsNEJBRHNDLENBQXhDOzs7Ozs7Ozs7QUMxSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzRTtBQUNuQjtBQUNoQjtBQUNnQztBQUM1QjtBQUN2QywwQ0FBMEMsNkNBQUs7QUFDL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLHVFQUFPO0FBQ1Q7O0FBRU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpR0FBYzs7QUFFbEI7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsK0NBQVE7QUFDckI7O0FBRUE7QUFDQSxHQUFHLENBQUMsZ0RBQVM7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsb0VBQVU7QUFDckIsY0FBYyxrREFBUztBQUN2QjtBQUNBLDBEQUEwRCxvQ0FBb0Msb0VBQVUsc0RBQXNELDJFQUFpQjtBQUMvSztBQUNBO0FBQ2UsMEZBQWdCLEU7Ozs7Ozs7O0FDeEUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhLDRDQUE0QyxTQUFTO0FBQ2xFO0FBQ0Esa01BQWtNLGNBQWMsa0NBQWtDLGlCQUFpQixVQUFVLDBCQUEwQixtREFBbUQsa0NBQWtDLDhCQUE4QixrQkFBa0IsZ0NBQWdDLGNBQWM7QUFDMWQsaUJBQWlCLG9CQUFvQix5QkFBeUIsMEJBQTBCLDBCQUEwQixrQkFBa0IscUJBQXFCLG1CQUFtQixlQUFlLGVBQWUsaUJBQWlCLG1CQUFtQixxQkFBcUI7QUFDblEsdUNBQXVDLDZQQUE2UCxnQ0FBZ0MsdUJBQXVCLDJCQUEyQixzQ0FBc0MsaUJBQWlCLHNDQUFzQztBQUNuZCw4QkFBOEIscURBQXFELGlDQUFpQyxpQkFBaUIsK0JBQStCLGlCQUFpQiwyQkFBMkIsaUJBQWlCLDJCQUEyQixpQkFBaUIsNkJBQTZCLGlCQUFpQiwrQkFBK0IsaUJBQWlCLGlDQUFpQyxpQkFBaUIsK0JBQStCOzs7Ozs7OztBQ2Q1YjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOzs7O0FBSWI7QUFDQTtBQUNBOztBQUVBLDhDQUE4QyxjQUFjOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEU7QUFDMUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEZBQTBGLGFBQWE7QUFDdkc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0dBQWdHLGVBQWU7QUFDL0c7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7QUMzT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGNBQWMsbUJBQU8sQ0FBQyxDQUFVO0FBQ2hDLGFBQWEsbUJBQU8sQ0FBQyxFQUFlOztBQUVwQywyQkFBMkIsbUJBQU8sQ0FBQyxFQUE0QjtBQUMvRCxxQkFBcUIsbUJBQU8sQ0FBQyxFQUFrQjs7QUFFL0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQzs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLDZCQUE2QjtBQUM3QixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRCQUE0QjtBQUM1QixPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixnQ0FBZ0M7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDOWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7O0FBRUE7QUFDQSw2QkFBNkIsbUJBQU8sQ0FBQyxFQUE0QjtBQUNqRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRHQUE0RztBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLDJCQUEyQixtQkFBTyxDQUFDLEVBQTRCOztBQUUvRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUMvREE7QUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEM7Ozs7Ozs7QUNOYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxDQUFVO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHlCQUF5QixFQUFFO0FBQ3JFO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUNoREE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQSxHQUFHO0FBQ0gsQzs7Ozs7Ozs7QUN2QkE7Ozs7O0FBS2UscUVBQWM7QUFDM0IsTUFBTVcsUUFBUSxFQUFkO0FBQ0EsTUFBTTlPLFNBQVMsQ0FBZjtBQUNBLFNBQU8sQ0FBQytPLEtBQUtDLE1BQUwsS0FBZ0JDLEtBQUtDLEdBQUwsRUFBakIsRUFBNkJDLFFBQTdCLENBQXNDTCxLQUF0QyxFQUE2Q3RKLEtBQTdDLENBQW1ELENBQW5ELEVBQXNEeEYsTUFBdEQsQ0FBUDtBQUNELENBSkQsRSIsImZpbGUiOiJyZWR1eC1saXR0bGUtcm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVkdXhMaXR0bGVSb3V0ZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUmVkdXhMaXR0bGVSb3V0ZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJSZWFjdFwiXSk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE3ZmQ5ZDMzNjgxMjZlYTU1OWRmIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCB0eXBlIHsgSHJlZiwgTG9jYXRpb24gfSBmcm9tICcuLi90eXBlcyc7XG5cbmltcG9ydCB7IHBhcnNlUGF0aCB9IGZyb20gJ2hpc3RvcnknO1xuaW1wb3J0IHFzIGZyb20gJ3F1ZXJ5LXN0cmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IChocmVmOiBIcmVmKTogTG9jYXRpb24gPT4ge1xuICBpZiAodHlwZW9mIGhyZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgeyBzZWFyY2ggPSAnJywgLi4ub3RoZXIgfSA9IHBhcnNlUGF0aChocmVmKTtcbiAgICBjb25zdCBxdWVyeSA9IHNlYXJjaCAmJiBxcy5wYXJzZShzZWFyY2gpO1xuXG4gICAgcmV0dXJuIHF1ZXJ5ID8geyAuLi5vdGhlciwgcXVlcnksIHNlYXJjaCB9IDogeyAuLi5vdGhlciB9O1xuICB9XG5cbiAgY29uc3QgeyBzZWFyY2gsIHF1ZXJ5IH0gPSBocmVmO1xuXG4gIGNvbnN0IHJlc29sdmVkU2VhcmNoID1cbiAgICBzZWFyY2ggfHxcbiAgICAocXVlcnkgJiYgT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCAmJiBgPyR7cXMuc3RyaW5naWZ5KHF1ZXJ5KX1gKSB8fFxuICAgICcnO1xuICBjb25zdCByZXNvbHZlZFF1ZXJ5ID0gcXVlcnkgfHwgcXMucGFyc2Uoc2VhcmNoIHx8ICcnKTtcblxuICByZXR1cm4ge1xuICAgIC4uLmhyZWYsXG4gICAgc2VhcmNoOiByZXNvbHZlZFNlYXJjaCxcbiAgICBxdWVyeTogcmVzb2x2ZWRRdWVyeVxuICB9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWwvbm9ybWFsaXplLWhyZWYuanMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIlJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJjb21tb25qc1wiOlwicmVhY3RcIixcImFtZFwiOlwicmVhY3RcIn1cbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCB0eXBlIHsgTG9jYXRpb24gYXMgSGlzdG9yeUxvY2F0aW9uLCBCbG9ja0NhbGxiYWNrIH0gZnJvbSAnaGlzdG9yeSc7XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5ID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcbmV4cG9ydCB0eXBlIFBhcmFtcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG5cbmV4cG9ydCB0eXBlIExvY2F0aW9uT3B0aW9ucyA9IHtcbiAgcGVyc2lzdFF1ZXJ5PzogYm9vbGVhbixcbiAgdXBkYXRlUm91dGVzPzogYm9vbGVhblxufTtcblxuZXhwb3J0IHR5cGUgTG9jYXRpb24gPSAkU2hhcGU8XG4gIEhpc3RvcnlMb2NhdGlvbiAmIHtcbiAgICBiYXNlbmFtZT86IHN0cmluZyxcbiAgICBvcHRpb25zPzogTG9jYXRpb25PcHRpb25zLFxuICAgIHBhcmFtcz86IFBhcmFtcyxcbiAgICBwcmV2aW91cz86IExvY2F0aW9uLFxuICAgIHF1ZXJ5PzogUXVlcnksXG4gICAgcmVzdWx0PzogT2JqZWN0LFxuICAgIHJvdXRlcz86IE9iamVjdCxcbiAgICBxdWV1ZT86IEFycmF5PExvY2F0aW9uPlxuICB9XG4+O1xuXG5leHBvcnQgdHlwZSBTdGF0ZSA9IHtcbiAgcm91dGVyOiBMb2NhdGlvblxufTtcblxuZXhwb3J0IHR5cGUgSHJlZiA9IHN0cmluZyB8IExvY2F0aW9uO1xuXG5leHBvcnQgY29uc3QgTE9DQVRJT05fQ0hBTkdFRCA9ICdST1VURVJfTE9DQVRJT05fQ0hBTkdFRCc7XG5leHBvcnQgY29uc3QgUFVTSCA9ICdST1VURVJfUFVTSCc7XG5leHBvcnQgY29uc3QgUkVQTEFDRSA9ICdST1VURVJfUkVQTEFDRSc7XG5leHBvcnQgY29uc3QgR08gPSAnUk9VVEVSX0dPJztcbmV4cG9ydCBjb25zdCBHT19CQUNLID0gJ1JPVVRFUl9HT19CQUNLJztcbmV4cG9ydCBjb25zdCBHT19GT1JXQVJEID0gJ1JPVVRFUl9HT19GT1JXQVJEJztcbmV4cG9ydCBjb25zdCBQT1AgPSAnUk9VVEVSX1BPUCc7XG5leHBvcnQgY29uc3QgQkxPQ0sgPSAnUk9VVEVSX0JMT0NLJztcbmV4cG9ydCBjb25zdCBVTkJMT0NLID0gJ1JPVVRFUl9VTkJMT0NLJztcbmV4cG9ydCBjb25zdCBSRVBMQUNFX1JPVVRFUyA9ICdST1VURVJfUkVQTEFDRV9ST1VURVMnO1xuZXhwb3J0IGNvbnN0IERJRF9SRVBMQUNFX1JPVVRFUyA9ICdST1VURVJfRElEX1JFUExBQ0VfUk9VVEVTJztcblxuY29uc3QgYWN0aW9uc1dpdGhQYXlsb2FkID0gW1BVU0gsIFJFUExBQ0UsIEdPLCBQT1BdO1xuY29uc3QgYWN0aW9ucyA9IFtcbiAgLi4uYWN0aW9uc1dpdGhQYXlsb2FkLFxuICBHT19GT1JXQVJELFxuICBHT19CQUNLLFxuICBQT1AsXG4gIEJMT0NLLFxuICBVTkJMT0NLXG5dO1xuXG5leHBvcnQgY29uc3QgaXNOYXZpZ2F0aW9uQWN0aW9uID0gKGFjdGlvbjogeyB0eXBlOiAkU3VidHlwZTxzdHJpbmc+IH0pID0+XG4gIGFjdGlvbnMuaW5kZXhPZihhY3Rpb24udHlwZSkgIT09IC0xO1xuXG5leHBvcnQgY29uc3QgaXNOYXZpZ2F0aW9uQWN0aW9uV2l0aFBheWxvYWQgPSAoYWN0aW9uOiB7XG4gIHR5cGU6ICRTdWJ0eXBlPHN0cmluZz5cbn0pID0+IGFjdGlvbnNXaXRoUGF5bG9hZC5pbmRleE9mKGFjdGlvbi50eXBlKSAhPT0gLTE7XG5cbmV4cG9ydCB0eXBlIEJhcmVBY3Rpb24gPSB7XG4gIHR5cGU6ICdST1VURVJfR09fQkFDSycgfCAnUk9VVEVSX0dPX0ZPUldBUkQnIHwgJ1JPVVRFUl9VTkJMT0NLJ1xufTtcblxuZXhwb3J0IHR5cGUgRnVuY3Rpb25BY3Rpb24gPSB7XG4gIHR5cGU6ICdST1VURVJfQkxPQ0snLFxuICBwYXlsb2FkOiBCbG9ja0NhbGxiYWNrXG59O1xuXG5leHBvcnQgdHlwZSBJbmRleGVkQWN0aW9uID0ge1xuICB0eXBlOiAnUk9VVEVSX0dPJyxcbiAgcGF5bG9hZDogbnVtYmVyXG59O1xuXG5leHBvcnQgdHlwZSBMb2NhdGlvbkFjdGlvbiA9IHtcbiAgdHlwZTogJ1JPVVRFUl9MT0NBVElPTl9DSEFOR0VEJyB8ICdST1VURVJfUFVTSCcgfCAnUk9VVEVSX1JFUExBQ0UnLFxuICBwYXlsb2FkOiBMb2NhdGlvblxufTtcblxuZXhwb3J0IHR5cGUgUm91dGVyQWN0aW9uID1cbiAgfCBCYXJlQWN0aW9uXG4gIHwgRnVuY3Rpb25BY3Rpb25cbiAgfCBJbmRleGVkQWN0aW9uXG4gIHwgTG9jYXRpb25BY3Rpb247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90eXBlcy5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCByZWR1Y2VyIGZyb20gJy4vcmVkdWNlcic7XG5pbXBvcnQgbWlkZGxld2FyZSBmcm9tICcuL21pZGRsZXdhcmUnO1xuaW1wb3J0IGVuaGFuY2VyIGZyb20gJy4vZW5oYW5jZXInO1xuXG5pbXBvcnQgY3JlYXRlSW5zdGFsbGVyIGZyb20gJy4vdXRpbC9jcmVhdGUtaW5zdGFsbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSW5zdGFsbGVyKHsgcmVkdWNlciwgbWlkZGxld2FyZSwgZW5oYW5jZXIgfSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbnN0YWxsLmpzIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShSZWFjdElzLmlzRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLnByb2R1Y3Rpb24ubWluLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzJyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCB0eXBlIHsgQmxvY2tDYWxsYmFjayB9IGZyb20gJ2hpc3RvcnknO1xuaW1wb3J0IHR5cGUgeyBMb2NhdGlvbiwgTG9jYXRpb25PcHRpb25zLCBIcmVmIH0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCB7XG4gIFBVU0gsXG4gIFJFUExBQ0UsXG4gIEdPLFxuICBHT19CQUNLLFxuICBHT19GT1JXQVJELFxuICBCTE9DSyxcbiAgVU5CTE9DSyxcbiAgTE9DQVRJT05fQ0hBTkdFRCxcbiAgUkVQTEFDRV9ST1VURVMsXG4gIERJRF9SRVBMQUNFX1JPVVRFU1xufSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IG5vcm1hbGl6ZUhyZWYgZnJvbSAnLi91dGlsL25vcm1hbGl6ZS1ocmVmJztcbmltcG9ydCBmbGF0dGVuUm91dGVzIGZyb20gJy4vdXRpbC9mbGF0dGVuLXJvdXRlcyc7XG5cbmV4cG9ydCBjb25zdCBwdXNoID0gKGhyZWY6IEhyZWYsIG9wdGlvbnM6IExvY2F0aW9uT3B0aW9ucyA9IHt9KSA9PiAoe1xuICB0eXBlOiBQVVNILFxuICBwYXlsb2FkOiB7IC4uLm5vcm1hbGl6ZUhyZWYoaHJlZiksIG9wdGlvbnMgfVxufSk7XG5cbmV4cG9ydCBjb25zdCByZXBsYWNlID0gKGhyZWY6IEhyZWYsIG9wdGlvbnM6IExvY2F0aW9uT3B0aW9ucyA9IHt9KSA9PiAoe1xuICB0eXBlOiBSRVBMQUNFLFxuICBwYXlsb2FkOiB7IC4uLm5vcm1hbGl6ZUhyZWYoaHJlZiksIG9wdGlvbnMgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBnbyA9IChpbmRleDogbnVtYmVyKSA9PiAoe1xuICB0eXBlOiBHTyxcbiAgcGF5bG9hZDogaW5kZXhcbn0pO1xuXG5leHBvcnQgY29uc3QgZ29CYWNrID0gKCkgPT4gKHsgdHlwZTogR09fQkFDSyB9KTtcbmV4cG9ydCBjb25zdCBnb0ZvcndhcmQgPSAoKSA9PiAoeyB0eXBlOiBHT19GT1JXQVJEIH0pO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSAoaGlzdG9yeVNob3VsZEJsb2NrOiBCbG9ja0NhbGxiYWNrKSA9PiAoe1xuICB0eXBlOiBCTE9DSyxcbiAgcGF5bG9hZDogaGlzdG9yeVNob3VsZEJsb2NrXG59KTtcblxuZXhwb3J0IGNvbnN0IHVuYmxvY2sgPSAoKSA9PiAoeyB0eXBlOiBVTkJMT0NLIH0pO1xuXG5leHBvcnQgY29uc3QgbG9jYXRpb25EaWRDaGFuZ2UgPSAobG9jYXRpb246IExvY2F0aW9uKSA9PiAoe1xuICB0eXBlOiBMT0NBVElPTl9DSEFOR0VELFxuICBwYXlsb2FkOiBsb2NhdGlvblxufSk7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplQ3VycmVudExvY2F0aW9uID0gKGxvY2F0aW9uOiBMb2NhdGlvbikgPT4gKHtcbiAgdHlwZTogTE9DQVRJT05fQ0hBTkdFRCxcbiAgcGF5bG9hZDogbG9jYXRpb25cbn0pO1xuXG5leHBvcnQgY29uc3QgcmVwbGFjZVJvdXRlcyA9IChyb3V0ZXM6IE9iamVjdCkgPT4gKHtcbiAgdHlwZTogUkVQTEFDRV9ST1VURVMsXG4gIHBheWxvYWQ6IHtcbiAgICByb3V0ZXM6IGZsYXR0ZW5Sb3V0ZXMocm91dGVzKSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB1cGRhdGVSb3V0ZXM6IHRydWVcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgZGlkUmVwbGFjZVJvdXRlcyA9ICgpID0+ICh7XG4gIHR5cGU6IERJRF9SRVBMQUNFX1JPVVRFU1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hY3Rpb25zLmpzIiwiZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRobmFtZSkge1xuICByZXR1cm4gcGF0aG5hbWUuY2hhckF0KDApID09PSAnLyc7XG59XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKVxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAodmFyIGkgPSBpbmRleCwgayA9IGkgKyAxLCBuID0gbGlzdC5sZW5ndGg7IGsgPCBuOyBpICs9IDEsIGsgKz0gMSkge1xuICAgIGxpc3RbaV0gPSBsaXN0W2tdO1xuICB9XG5cbiAgbGlzdC5wb3AoKTtcbn1cblxuLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBoZWF2aWx5IG9uIG5vZGUncyB1cmwucGFyc2VcbmZ1bmN0aW9uIHJlc29sdmVQYXRobmFtZSh0bywgZnJvbSkge1xuICBpZiAoZnJvbSA9PT0gdW5kZWZpbmVkKSBmcm9tID0gJyc7XG5cbiAgdmFyIHRvUGFydHMgPSAodG8gJiYgdG8uc3BsaXQoJy8nKSkgfHwgW107XG4gIHZhciBmcm9tUGFydHMgPSAoZnJvbSAmJiBmcm9tLnNwbGl0KCcvJykpIHx8IFtdO1xuXG4gIHZhciBpc1RvQWJzID0gdG8gJiYgaXNBYnNvbHV0ZSh0byk7XG4gIHZhciBpc0Zyb21BYnMgPSBmcm9tICYmIGlzQWJzb2x1dGUoZnJvbSk7XG4gIHZhciBtdXN0RW5kQWJzID0gaXNUb0FicyB8fCBpc0Zyb21BYnM7XG5cbiAgaWYgKHRvICYmIGlzQWJzb2x1dGUodG8pKSB7XG4gICAgLy8gdG8gaXMgYWJzb2x1dGVcbiAgICBmcm9tUGFydHMgPSB0b1BhcnRzO1xuICB9IGVsc2UgaWYgKHRvUGFydHMubGVuZ3RoKSB7XG4gICAgLy8gdG8gaXMgcmVsYXRpdmUsIGRyb3AgdGhlIGZpbGVuYW1lXG4gICAgZnJvbVBhcnRzLnBvcCgpO1xuICAgIGZyb21QYXJ0cyA9IGZyb21QYXJ0cy5jb25jYXQodG9QYXJ0cyk7XG4gIH1cblxuICBpZiAoIWZyb21QYXJ0cy5sZW5ndGgpIHJldHVybiAnLyc7XG5cbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2g7XG4gIGlmIChmcm9tUGFydHMubGVuZ3RoKSB7XG4gICAgdmFyIGxhc3QgPSBmcm9tUGFydHNbZnJvbVBhcnRzLmxlbmd0aCAtIDFdO1xuICAgIGhhc1RyYWlsaW5nU2xhc2ggPSBsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJyB8fCBsYXN0ID09PSAnJztcbiAgfSBlbHNlIHtcbiAgICBoYXNUcmFpbGluZ1NsYXNoID0gZmFsc2U7XG4gIH1cblxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gZnJvbVBhcnRzLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgcGFydCA9IGZyb21QYXJ0c1tpXTtcblxuICAgIGlmIChwYXJ0ID09PSAnLicpIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgIH0gZWxzZSBpZiAocGFydCA9PT0gJy4uJykge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICBpZiAoIW11c3RFbmRBYnMpIGZvciAoOyB1cC0tOyB1cCkgZnJvbVBhcnRzLnVuc2hpZnQoJy4uJyk7XG5cbiAgaWYgKFxuICAgIG11c3RFbmRBYnMgJiZcbiAgICBmcm9tUGFydHNbMF0gIT09ICcnICYmXG4gICAgKCFmcm9tUGFydHNbMF0gfHwgIWlzQWJzb2x1dGUoZnJvbVBhcnRzWzBdKSlcbiAgKVxuICAgIGZyb21QYXJ0cy51bnNoaWZ0KCcnKTtcblxuICB2YXIgcmVzdWx0ID0gZnJvbVBhcnRzLmpvaW4oJy8nKTtcblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiByZXN1bHQuc3Vic3RyKC0xKSAhPT0gJy8nKSByZXN1bHQgKz0gJy8nO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlc29sdmVQYXRobmFtZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXBhdGhuYW1lL2VzbS9yZXNvbHZlLXBhdGhuYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIHZhbHVlT2Yob2JqKSB7XG4gIHJldHVybiBvYmoudmFsdWVPZiA/IG9iai52YWx1ZU9mKCkgOiBPYmplY3QucHJvdG90eXBlLnZhbHVlT2YuY2FsbChvYmopO1xufVxuXG5mdW5jdGlvbiB2YWx1ZUVxdWFsKGEsIGIpIHtcbiAgLy8gVGVzdCBmb3Igc3RyaWN0IGVxdWFsaXR5IGZpcnN0LlxuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgLy8gT3RoZXJ3aXNlLCBpZiBlaXRoZXIgb2YgdGhlbSA9PSBudWxsIHRoZXkgYXJlIG5vdCBlcXVhbC5cbiAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgIHJldHVybiAoXG4gICAgICBBcnJheS5pc0FycmF5KGIpICYmXG4gICAgICBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiZcbiAgICAgIGEuZXZlcnkoZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlRXF1YWwoaXRlbSwgYltpbmRleF0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYVZhbHVlID0gdmFsdWVPZihhKTtcbiAgICB2YXIgYlZhbHVlID0gdmFsdWVPZihiKTtcblxuICAgIGlmIChhVmFsdWUgIT09IGEgfHwgYlZhbHVlICE9PSBiKSByZXR1cm4gdmFsdWVFcXVhbChhVmFsdWUsIGJWYWx1ZSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgYSwgYikpLmV2ZXJ5KGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIHZhbHVlRXF1YWwoYVtrZXldLCBiW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWx1ZUVxdWFsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3ZhbHVlLWVxdWFsL2VzbS92YWx1ZS1lcXVhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG5mdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICBpZiAoIWlzUHJvZHVjdGlvbikge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdGV4dCA9IFwiV2FybmluZzogXCIgKyBtZXNzYWdlO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKHRleHQpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aHJvdyBFcnJvcih0ZXh0KTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdhcm5pbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvdGlueS13YXJuaW5nL2Rpc3QvdGlueS13YXJuaW5nLmVzbS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG52YXIgcHJlZml4ID0gJ0ludmFyaWFudCBmYWlsZWQnO1xuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICBpZiAoY29uZGl0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihwcmVmaXgpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihwcmVmaXggKyBcIjogXCIgKyAobWVzc2FnZSB8fCAnJykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGludmFyaWFudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy90aW55LWludmFyaWFudC9kaXN0L3RpbnktaW52YXJpYW50LmVzbS5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cmljdFVyaUVuY29kZSA9IHJlcXVpcmUoJ3N0cmljdC11cmktZW5jb2RlJyk7XG52YXIgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIGRlY29kZUNvbXBvbmVudCA9IHJlcXVpcmUoJ2RlY29kZS11cmktY29tcG9uZW50Jyk7XG5cbmZ1bmN0aW9uIGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRzKSB7XG5cdHN3aXRjaCAob3B0cy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgaW5kZXgpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSBudWxsID8gW1xuXHRcdFx0XHRcdGVuY29kZShrZXksIG9wdHMpLFxuXHRcdFx0XHRcdCdbJyxcblx0XHRcdFx0XHRpbmRleCxcblx0XHRcdFx0XHQnXSdcblx0XHRcdFx0XS5qb2luKCcnKSA6IFtcblx0XHRcdFx0XHRlbmNvZGUoa2V5LCBvcHRzKSxcblx0XHRcdFx0XHQnWycsXG5cdFx0XHRcdFx0ZW5jb2RlKGluZGV4LCBvcHRzKSxcblx0XHRcdFx0XHQnXT0nLFxuXHRcdFx0XHRcdGVuY29kZSh2YWx1ZSwgb3B0cylcblx0XHRcdFx0XS5qb2luKCcnKTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdicmFja2V0Jzpcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPT09IG51bGwgPyBlbmNvZGUoa2V5LCBvcHRzKSA6IFtcblx0XHRcdFx0XHRlbmNvZGUoa2V5LCBvcHRzKSxcblx0XHRcdFx0XHQnW109Jyxcblx0XHRcdFx0XHRlbmNvZGUodmFsdWUsIG9wdHMpXG5cdFx0XHRcdF0uam9pbignJyk7XG5cdFx0XHR9O1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPT09IG51bGwgPyBlbmNvZGUoa2V5LCBvcHRzKSA6IFtcblx0XHRcdFx0XHRlbmNvZGUoa2V5LCBvcHRzKSxcblx0XHRcdFx0XHQnPScsXG5cdFx0XHRcdFx0ZW5jb2RlKHZhbHVlLCBvcHRzKVxuXHRcdFx0XHRdLmpvaW4oJycpO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiBwYXJzZXJGb3JBcnJheUZvcm1hdChvcHRzKSB7XG5cdHZhciByZXN1bHQ7XG5cblx0c3dpdGNoIChvcHRzLmFycmF5Rm9ybWF0KSB7XG5cdFx0Y2FzZSAnaW5kZXgnOlxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikge1xuXHRcdFx0XHRyZXN1bHQgPSAvXFxbKFxcZCopXFxdJC8uZXhlYyhrZXkpO1xuXG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXGQqXFxdJC8sICcnKTtcblxuXHRcdFx0XHRpZiAoIXJlc3VsdCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHt9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XVtyZXN1bHRbMV1dID0gdmFsdWU7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSB7XG5cdFx0XHRcdHJlc3VsdCA9IC8oXFxbXFxdKSQvLmV4ZWMoa2V5KTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1xcW1xcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbdmFsdWVdO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSB7XG5cdFx0XHRcdGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IFtdLmNvbmNhdChhY2N1bXVsYXRvcltrZXldLCB2YWx1ZSk7XG5cdFx0XHR9O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWx1ZSwgb3B0cykge1xuXHRpZiAob3B0cy5lbmNvZGUpIHtcblx0XHRyZXR1cm4gb3B0cy5zdHJpY3QgPyBzdHJpY3RVcmlFbmNvZGUodmFsdWUpIDogZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24ga2V5c1NvcnRlcihpbnB1dCkge1xuXHRpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcblx0XHRyZXR1cm4gaW5wdXQuc29ydCgpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4ga2V5c1NvcnRlcihPYmplY3Qua2V5cyhpbnB1dCkpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRcdHJldHVybiBOdW1iZXIoYSkgLSBOdW1iZXIoYik7XG5cdFx0fSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiBpbnB1dFtrZXldO1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBleHRyYWN0KHN0cikge1xuXHR2YXIgcXVlcnlTdGFydCA9IHN0ci5pbmRleE9mKCc/Jyk7XG5cdGlmIChxdWVyeVN0YXJ0ID09PSAtMSkge1xuXHRcdHJldHVybiAnJztcblx0fVxuXHRyZXR1cm4gc3RyLnNsaWNlKHF1ZXJ5U3RhcnQgKyAxKTtcbn1cblxuZnVuY3Rpb24gcGFyc2Uoc3RyLCBvcHRzKSB7XG5cdG9wdHMgPSBvYmplY3RBc3NpZ24oe2FycmF5Rm9ybWF0OiAnbm9uZSd9LCBvcHRzKTtcblxuXHR2YXIgZm9ybWF0dGVyID0gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0cyk7XG5cblx0Ly8gQ3JlYXRlIGFuIG9iamVjdCB3aXRoIG5vIHByb3RvdHlwZVxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3F1ZXJ5LXN0cmluZy9pc3N1ZXMvNDdcblx0dmFyIHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdHN0ciA9IHN0ci50cmltKCkucmVwbGFjZSgvXls/IyZdLywgJycpO1xuXG5cdGlmICghc3RyKSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdHN0ci5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24gKHBhcmFtKSB7XG5cdFx0dmFyIHBhcnRzID0gcGFyYW0ucmVwbGFjZSgvXFwrL2csICcgJykuc3BsaXQoJz0nKTtcblx0XHQvLyBGaXJlZm94IChwcmUgNDApIGRlY29kZXMgYCUzRGAgdG8gYD1gXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9xdWVyeS1zdHJpbmcvcHVsbC8zN1xuXHRcdHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpO1xuXHRcdHZhciB2YWwgPSBwYXJ0cy5sZW5ndGggPiAwID8gcGFydHMuam9pbignPScpIDogdW5kZWZpbmVkO1xuXG5cdFx0Ly8gbWlzc2luZyBgPWAgc2hvdWxkIGJlIGBudWxsYDpcblx0XHQvLyBodHRwOi8vdzMub3JnL1RSLzIwMTIvV0QtdXJsLTIwMTIwNTI0LyNjb2xsZWN0LXVybC1wYXJhbWV0ZXJzXG5cdFx0dmFsID0gdmFsID09PSB1bmRlZmluZWQgPyBudWxsIDogZGVjb2RlQ29tcG9uZW50KHZhbCk7XG5cblx0XHRmb3JtYXR0ZXIoZGVjb2RlQ29tcG9uZW50KGtleSksIHZhbCwgcmV0KTtcblx0fSk7XG5cblx0cmV0dXJuIE9iamVjdC5rZXlzKHJldCkuc29ydCgpLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBrZXkpIHtcblx0XHR2YXIgdmFsID0gcmV0W2tleV07XG5cdFx0aWYgKEJvb2xlYW4odmFsKSAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWwpKSB7XG5cdFx0XHQvLyBTb3J0IG9iamVjdCBrZXlzLCBub3QgdmFsdWVzXG5cdFx0XHRyZXN1bHRba2V5XSA9IGtleXNTb3J0ZXIodmFsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0W2tleV0gPSB2YWw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG59XG5cbmV4cG9ydHMuZXh0cmFjdCA9IGV4dHJhY3Q7XG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5cbmV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKG9iaiwgb3B0cykge1xuXHR2YXIgZGVmYXVsdHMgPSB7XG5cdFx0ZW5jb2RlOiB0cnVlLFxuXHRcdHN0cmljdDogdHJ1ZSxcblx0XHRhcnJheUZvcm1hdDogJ25vbmUnXG5cdH07XG5cblx0b3B0cyA9IG9iamVjdEFzc2lnbihkZWZhdWx0cywgb3B0cyk7XG5cblx0aWYgKG9wdHMuc29ydCA9PT0gZmFsc2UpIHtcblx0XHRvcHRzLnNvcnQgPSBmdW5jdGlvbiAoKSB7fTtcblx0fVxuXG5cdHZhciBmb3JtYXR0ZXIgPSBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0cyk7XG5cblx0cmV0dXJuIG9iaiA/IE9iamVjdC5rZXlzKG9iaikuc29ydChvcHRzLnNvcnQpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dmFyIHZhbCA9IG9ialtrZXldO1xuXG5cdFx0aWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXG5cdFx0aWYgKHZhbCA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShrZXksIG9wdHMpO1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcblx0XHRcdHZhciByZXN1bHQgPSBbXTtcblxuXHRcdFx0dmFsLnNsaWNlKCkuZm9yRWFjaChmdW5jdGlvbiAodmFsMikge1xuXHRcdFx0XHRpZiAodmFsMiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVzdWx0LnB1c2goZm9ybWF0dGVyKGtleSwgdmFsMiwgcmVzdWx0Lmxlbmd0aCkpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiByZXN1bHQuam9pbignJicpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbmNvZGUoa2V5LCBvcHRzKSArICc9JyArIGVuY29kZSh2YWwsIG9wdHMpO1xuXHR9KS5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcblx0XHRyZXR1cm4geC5sZW5ndGggPiAwO1xuXHR9KS5qb2luKCcmJykgOiAnJztcbn07XG5cbmV4cG9ydHMucGFyc2VVcmwgPSBmdW5jdGlvbiAoc3RyLCBvcHRzKSB7XG5cdHJldHVybiB7XG5cdFx0dXJsOiBzdHIuc3BsaXQoJz8nKVswXSB8fCAnJyxcblx0XHRxdWVyeTogcGFyc2UoZXh0cmFjdChzdHIpLCBvcHRzKVxuXHR9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9xdWVyeS1zdHJpbmcvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKGZvcm1hdCwgc3Vicykge1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPVxuICAgICAgJ1dhcm5pbmc6ICcgK1xuICAgICAgKHN1YnMubGVuZ3RoID4gMFxuICAgICAgICA/IGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzdWJzW2luZGV4KytdO1xuICAgICAgICAgIH0pXG4gICAgICAgIDogZm9ybWF0KTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBoaXN0b3J5IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGVcbiAgICAgIC8vIHN0YWNrIHRyYWNlIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgdHJpZ2dlcmVkIHRoaXMgd2FybmluZy5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1lbWJlcikge1xuICBwcmludFdhcm5pbmcoXG4gICAgJ1BsZWFzZSB1c2UgYHJlcXVpcmUoXCJoaXN0b3J5XCIpLiVzYCBpbnN0ZWFkIG9mIGByZXF1aXJlKFwiaGlzdG9yeS8lc1wiKWAuICcgK1xuICAgICAgJ1N1cHBvcnQgZm9yIHRoZSBsYXR0ZXIgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuJyxcbiAgICBbbWVtYmVyLCBtZW1iZXJdXG4gICk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2hpc3Rvcnkvd2FybkFib3V0RGVwcmVjYXRlZENKU1JlcXVpcmUuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9oaXN0b3J5Lm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9oaXN0b3J5LmpzJyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCB0eXBlIHsgTG9jYXRpb24sIFF1ZXJ5IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbXBvcnQgcXMgZnJvbSAncXVlcnktc3RyaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgKG9sZFF1ZXJ5OiA/UXVlcnksIG5ld1F1ZXJ5OiA/UXVlcnkpOiBMb2NhdGlvbiA9PiB7XG4gIGNvbnN0IG1lcmdlZFF1ZXJ5ID0ge1xuICAgIC4uLm9sZFF1ZXJ5LFxuICAgIC4uLm5ld1F1ZXJ5XG4gIH07XG4gIGNvbnN0IHNlYXJjaDogc3RyaW5nID0gYD8ke3FzLnN0cmluZ2lmeShtZXJnZWRRdWVyeSl9YDtcblxuICByZXR1cm4ge1xuICAgIHF1ZXJ5OiBtZXJnZWRRdWVyeSxcbiAgICBzZWFyY2hcbiAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlsL21lcmdlLXF1ZXJpZXMuanMiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuXG5cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG5cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCBhc3NpZ24gZnJvbSAnbG9kYXNoLmFzc2lnbic7XG5cbmNvbnN0IGZpbHRlck9iamVjdCA9ICh0YXJnZXQsIHByZWRpY2F0ZSkgPT5cbiAgT2JqZWN0LmtleXModGFyZ2V0KS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgcmV0dXJuIHByZWRpY2F0ZShrZXkpID8geyAuLi5hY2MsIFtrZXldOiB0YXJnZXRba2V5XSB9IDogYWNjO1xuICB9LCB7fSk7XG5cbmNvbnN0IG1hcE9iamVjdCA9ICh0YXJnZXQsIHRyYW5zZm9ybUtleSwgdHJhbnNmb3JtVmFsdWUpID0+XG4gIE9iamVjdC5rZXlzKHRhcmdldCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgIGNvbnN0IG5ld0tleSA9IHRyYW5zZm9ybUtleSA/IHRyYW5zZm9ybUtleShrZXkpIDoga2V5O1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gdHJhbnNmb3JtVmFsdWUgPyB0cmFuc2Zvcm1WYWx1ZSh0YXJnZXRba2V5XSkgOiB0YXJnZXRba2V5XTtcbiAgICByZXR1cm4geyAuLi5hY2MsIFtuZXdLZXldOiBuZXdWYWx1ZSB9O1xuICB9LCB7fSk7XG5cbmNvbnN0IG9ubHlSb3V0ZXMgPSByb3V0ZXMgPT5cbiAgZmlsdGVyT2JqZWN0KHJvdXRlcywga2V5ID0+IGtleS5pbmRleE9mKCcvJykgPT09IDApO1xuXG5jb25zdCB3aXRob3V0Um91dGVzID0gcm91dGVzID0+XG4gIGZpbHRlck9iamVjdChyb3V0ZXMsIGtleSA9PiBrZXkuaW5kZXhPZignLycpICE9PSAwKTtcblxuY29uc3QgZmxhdHRlblJvdXRlcyA9IChyb3V0ZXM6IE9iamVjdCwgYWNjOiBPYmplY3QgPSB7fSkgPT4ge1xuICBPYmplY3Qua2V5cyhyb3V0ZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICBjb25zdCBiYXNlUm91dGUgPSBrZXkgPT09ICcvJyA/ICcnIDoga2V5O1xuICAgIGZsYXR0ZW5Sb3V0ZXMoXG4gICAgICBtYXBPYmplY3QoXG4gICAgICAgIG9ubHlSb3V0ZXMocm91dGVzW2tleV0pLFxuICAgICAgICByb3V0ZUtleSA9PiBgJHtiYXNlUm91dGV9JHtyb3V0ZUtleX1gLFxuICAgICAgICByb3V0ZVZhbHVlID0+ICh7XG4gICAgICAgICAgLi4ucm91dGVWYWx1ZSxcbiAgICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICAgIC4uLndpdGhvdXRSb3V0ZXMocm91dGVzW2tleV0pLFxuICAgICAgICAgICAgcm91dGU6IGtleVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBhY2NcbiAgICApO1xuICB9KTtcblxuICBhc3NpZ24oYWNjLCBtYXBPYmplY3Qocm91dGVzLCBudWxsLCB3aXRob3V0Um91dGVzKSk7XG5cbiAgcmV0dXJuIGFjYztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZsYXR0ZW5Sb3V0ZXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlsL2ZsYXR0ZW4tcm91dGVzLmpzIiwiLy8gQGZsb3dcbmNvbnN0IFJPVVRFX0ZBTExCQUNLID0gJ0BST1VURV9GQUxMQkFDSyc7XG5cbmV4cG9ydCBjbGFzcyBNYXRjaENhY2hlIHtcbiAgX2RhdGE6IHsgW3BhcmVudElkOiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fZGF0YSA9IHt9O1xuICB9XG5cbiAgYWRkKHBhcmVudElkOiBzdHJpbmcsIHJvdXRlOiA/c3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0YVtwYXJlbnRJZF0gPSByb3V0ZSB8fCBST1VURV9GQUxMQkFDSztcbiAgfVxuXG4gIGdldChwYXJlbnRJZDogc3RyaW5nKTogbnVsbCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFbcGFyZW50SWRdIHx8IG51bGw7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRhID0ge307XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IE1hdGNoQ2FjaGUoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWwvbWF0Y2gtY2FjaGUuanMiLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTAuMFxudmFyIHNsaWNlID0gW10uc2xpY2U7XG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gIGlmICgoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGRlZmluZSkgJiYgKGRlZmluZS5hbWQgIT0gbnVsbCkpIHtcbiAgICByZXR1cm4gZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBleHBvcnRzICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByb290LlVybFBhdHRlcm4gPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xuICB2YXIgUCwgVXJsUGF0dGVybiwgYXN0Tm9kZUNvbnRhaW5zU2VnbWVudHNGb3JQcm92aWRlZFBhcmFtcywgYXN0Tm9kZVRvTmFtZXMsIGFzdE5vZGVUb1JlZ2V4U3RyaW5nLCBiYXNlQXN0Tm9kZVRvUmVnZXhTdHJpbmcsIGNvbmNhdE1hcCwgZGVmYXVsdE9wdGlvbnMsIGVzY2FwZUZvclJlZ2V4LCBnZXRQYXJhbSwga2V5c0FuZFZhbHVlc1RvT2JqZWN0LCBuZXdQYXJzZXIsIHJlZ2V4R3JvdXBDb3VudCwgc3RyaW5nQ29uY2F0TWFwLCBzdHJpbmdpZnk7XG4gIGVzY2FwZUZvclJlZ2V4ID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcbiAgfTtcbiAgY29uY2F0TWFwID0gZnVuY3Rpb24oYXJyYXksIGYpIHtcbiAgICB2YXIgaSwgbGVuZ3RoLCByZXN1bHRzO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBpID0gLTE7XG4gICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBsZW5ndGgpIHtcbiAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChmKGFycmF5W2ldKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuICBzdHJpbmdDb25jYXRNYXAgPSBmdW5jdGlvbihhcnJheSwgZikge1xuICAgIHZhciBpLCBsZW5ndGgsIHJlc3VsdDtcbiAgICByZXN1bHQgPSAnJztcbiAgICBpID0gLTE7XG4gICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBsZW5ndGgpIHtcbiAgICAgIHJlc3VsdCArPSBmKGFycmF5W2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcmVnZXhHcm91cENvdW50ID0gZnVuY3Rpb24ocmVnZXgpIHtcbiAgICByZXR1cm4gKG5ldyBSZWdFeHAocmVnZXgudG9TdHJpbmcoKSArICd8JykpLmV4ZWMoJycpLmxlbmd0aCAtIDE7XG4gIH07XG4gIGtleXNBbmRWYWx1ZXNUb09iamVjdCA9IGZ1bmN0aW9uKGtleXMsIHZhbHVlcykge1xuICAgIHZhciBpLCBrZXksIGxlbmd0aCwgb2JqZWN0LCB2YWx1ZTtcbiAgICBvYmplY3QgPSB7fTtcbiAgICBpID0gLTE7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgd2hpbGUgKCsraSA8IGxlbmd0aCkge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAob2JqZWN0W2tleV0gIT0gbnVsbCkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0W2tleV0pKSB7XG4gICAgICAgICAgb2JqZWN0W2tleV0gPSBbb2JqZWN0W2tleV1dO1xuICAgICAgICB9XG4gICAgICAgIG9iamVjdFtrZXldLnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbiAgUCA9IHt9O1xuICBQLlJlc3VsdCA9IGZ1bmN0aW9uKHZhbHVlLCByZXN0KSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmVzdCA9IHJlc3Q7XG4gIH07XG4gIFAuVGFnZ2VkID0gZnVuY3Rpb24odGFnLCB2YWx1ZSkge1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfTtcbiAgUC50YWcgPSBmdW5jdGlvbih0YWcsIHBhcnNlcikge1xuICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgdmFyIHJlc3VsdCwgdGFnZ2VkO1xuICAgICAgcmVzdWx0ID0gcGFyc2VyKGlucHV0KTtcbiAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0YWdnZWQgPSBuZXcgUC5UYWdnZWQodGFnLCByZXN1bHQudmFsdWUpO1xuICAgICAgcmV0dXJuIG5ldyBQLlJlc3VsdCh0YWdnZWQsIHJlc3VsdC5yZXN0KTtcbiAgICB9O1xuICB9O1xuICBQLnJlZ2V4ID0gZnVuY3Rpb24ocmVnZXgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgIHZhciBtYXRjaGVzLCByZXN1bHQ7XG4gICAgICBtYXRjaGVzID0gcmVnZXguZXhlYyhpbnB1dCk7XG4gICAgICBpZiAobWF0Y2hlcyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IG1hdGNoZXNbMF07XG4gICAgICByZXR1cm4gbmV3IFAuUmVzdWx0KHJlc3VsdCwgaW5wdXQuc2xpY2UocmVzdWx0Lmxlbmd0aCkpO1xuICAgIH07XG4gIH07XG4gIFAuc2VxdWVuY2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGFyc2VycztcbiAgICBwYXJzZXJzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICB2YXIgaSwgbGVuZ3RoLCBwYXJzZXIsIHJlc3QsIHJlc3VsdCwgdmFsdWVzO1xuICAgICAgaSA9IC0xO1xuICAgICAgbGVuZ3RoID0gcGFyc2Vycy5sZW5ndGg7XG4gICAgICB2YWx1ZXMgPSBbXTtcbiAgICAgIHJlc3QgPSBpbnB1dDtcbiAgICAgIHdoaWxlICgrK2kgPCBsZW5ndGgpIHtcbiAgICAgICAgcGFyc2VyID0gcGFyc2Vyc1tpXTtcbiAgICAgICAgcmVzdWx0ID0gcGFyc2VyKHJlc3QpO1xuICAgICAgICBpZiAocmVzdWx0ID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgcmVzdCA9IHJlc3VsdC5yZXN0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBQLlJlc3VsdCh2YWx1ZXMsIHJlc3QpO1xuICAgIH07XG4gIH07XG4gIFAucGljayA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbmRleGVzLCBwYXJzZXJzO1xuICAgIGluZGV4ZXMgPSBhcmd1bWVudHNbMF0sIHBhcnNlcnMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgIHZhciBhcnJheSwgcmVzdWx0O1xuICAgICAgcmVzdWx0ID0gUC5zZXF1ZW5jZS5hcHBseShQLCBwYXJzZXJzKShpbnB1dCk7XG4gICAgICBpZiAocmVzdWx0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXJyYXkgPSByZXN1bHQudmFsdWU7XG4gICAgICByZXN1bHQudmFsdWUgPSBhcnJheVtpbmRleGVzXTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcbiAgUC5zdHJpbmcgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICB2YXIgbGVuZ3RoO1xuICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICBpZiAoaW5wdXQuc2xpY2UoMCwgbGVuZ3RoKSA9PT0gc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUC5SZXN1bHQoc3RyaW5nLCBpbnB1dC5zbGljZShsZW5ndGgpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuICBQLmxhenkgPSBmdW5jdGlvbihmbikge1xuICAgIHZhciBjYWNoZWQ7XG4gICAgY2FjaGVkID0gbnVsbDtcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgIGlmIChjYWNoZWQgPT0gbnVsbCkge1xuICAgICAgICBjYWNoZWQgPSBmbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNhY2hlZChpbnB1dCk7XG4gICAgfTtcbiAgfTtcbiAgUC5iYXNlTWFueSA9IGZ1bmN0aW9uKHBhcnNlciwgZW5kLCBzdHJpbmdSZXN1bHQsIGF0TGVhc3RPbmVSZXN1bHRSZXF1aXJlZCwgaW5wdXQpIHtcbiAgICB2YXIgZW5kUmVzdWx0LCBwYXJzZXJSZXN1bHQsIHJlc3QsIHJlc3VsdHM7XG4gICAgcmVzdCA9IGlucHV0O1xuICAgIHJlc3VsdHMgPSBzdHJpbmdSZXN1bHQgPyAnJyA6IFtdO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoZW5kICE9IG51bGwpIHtcbiAgICAgICAgZW5kUmVzdWx0ID0gZW5kKHJlc3QpO1xuICAgICAgICBpZiAoZW5kUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcGFyc2VyUmVzdWx0ID0gcGFyc2VyKHJlc3QpO1xuICAgICAgaWYgKHBhcnNlclJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHN0cmluZ1Jlc3VsdCkge1xuICAgICAgICByZXN1bHRzICs9IHBhcnNlclJlc3VsdC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChwYXJzZXJSZXN1bHQudmFsdWUpO1xuICAgICAgfVxuICAgICAgcmVzdCA9IHBhcnNlclJlc3VsdC5yZXN0O1xuICAgIH1cbiAgICBpZiAoYXRMZWFzdE9uZVJlc3VsdFJlcXVpcmVkICYmIHJlc3VsdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBuZXcgUC5SZXN1bHQocmVzdWx0cywgcmVzdCk7XG4gIH07XG4gIFAubWFueTEgPSBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgIHJldHVybiBQLmJhc2VNYW55KHBhcnNlciwgbnVsbCwgZmFsc2UsIHRydWUsIGlucHV0KTtcbiAgICB9O1xuICB9O1xuICBQLmNvbmNhdE1hbnkxVGlsbCA9IGZ1bmN0aW9uKHBhcnNlciwgZW5kKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICByZXR1cm4gUC5iYXNlTWFueShwYXJzZXIsIGVuZCwgdHJ1ZSwgdHJ1ZSwgaW5wdXQpO1xuICAgIH07XG4gIH07XG4gIFAuZmlyc3RDaG9pY2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGFyc2VycztcbiAgICBwYXJzZXJzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICB2YXIgaSwgbGVuZ3RoLCBwYXJzZXIsIHJlc3VsdDtcbiAgICAgIGkgPSAtMTtcbiAgICAgIGxlbmd0aCA9IHBhcnNlcnMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCsraSA8IGxlbmd0aCkge1xuICAgICAgICBwYXJzZXIgPSBwYXJzZXJzW2ldO1xuICAgICAgICByZXN1bHQgPSBwYXJzZXIoaW5wdXQpO1xuICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbiAgbmV3UGFyc2VyID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBVO1xuICAgIFUgPSB7fTtcbiAgICBVLndpbGRjYXJkID0gUC50YWcoJ3dpbGRjYXJkJywgUC5zdHJpbmcob3B0aW9ucy53aWxkY2FyZENoYXIpKTtcbiAgICBVLm9wdGlvbmFsID0gUC50YWcoJ29wdGlvbmFsJywgUC5waWNrKDEsIFAuc3RyaW5nKG9wdGlvbnMub3B0aW9uYWxTZWdtZW50U3RhcnRDaGFyKSwgUC5sYXp5KGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFUucGF0dGVybjtcbiAgICB9KSwgUC5zdHJpbmcob3B0aW9ucy5vcHRpb25hbFNlZ21lbnRFbmRDaGFyKSkpO1xuICAgIFUubmFtZSA9IFAucmVnZXgobmV3IFJlZ0V4cChcIl5bXCIgKyBvcHRpb25zLnNlZ21lbnROYW1lQ2hhcnNldCArIFwiXStcIikpO1xuICAgIFUubmFtZWQgPSBQLnRhZygnbmFtZWQnLCBQLnBpY2soMSwgUC5zdHJpbmcob3B0aW9ucy5zZWdtZW50TmFtZVN0YXJ0Q2hhciksIFAubGF6eShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBVLm5hbWU7XG4gICAgfSkpKTtcbiAgICBVLmVzY2FwZWRDaGFyID0gUC5waWNrKDEsIFAuc3RyaW5nKG9wdGlvbnMuZXNjYXBlQ2hhciksIFAucmVnZXgoL14uLykpO1xuICAgIFVbXCJzdGF0aWNcIl0gPSBQLnRhZygnc3RhdGljJywgUC5jb25jYXRNYW55MVRpbGwoUC5maXJzdENob2ljZShQLmxhenkoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gVS5lc2NhcGVkQ2hhcjtcbiAgICB9KSwgUC5yZWdleCgvXi4vKSksIFAuZmlyc3RDaG9pY2UoUC5zdHJpbmcob3B0aW9ucy5zZWdtZW50TmFtZVN0YXJ0Q2hhciksIFAuc3RyaW5nKG9wdGlvbnMub3B0aW9uYWxTZWdtZW50U3RhcnRDaGFyKSwgUC5zdHJpbmcob3B0aW9ucy5vcHRpb25hbFNlZ21lbnRFbmRDaGFyKSwgVS53aWxkY2FyZCkpKTtcbiAgICBVLnRva2VuID0gUC5sYXp5KGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFAuZmlyc3RDaG9pY2UoVS53aWxkY2FyZCwgVS5vcHRpb25hbCwgVS5uYW1lZCwgVVtcInN0YXRpY1wiXSk7XG4gICAgfSk7XG4gICAgVS5wYXR0ZXJuID0gUC5tYW55MShQLmxhenkoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gVS50b2tlbjtcbiAgICB9KSk7XG4gICAgcmV0dXJuIFU7XG4gIH07XG4gIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGVzY2FwZUNoYXI6ICdcXFxcJyxcbiAgICBzZWdtZW50TmFtZVN0YXJ0Q2hhcjogJzonLFxuICAgIHNlZ21lbnRWYWx1ZUNoYXJzZXQ6ICdhLXpBLVowLTktX34gJScsXG4gICAgc2VnbWVudE5hbWVDaGFyc2V0OiAnYS16QS1aMC05JyxcbiAgICBvcHRpb25hbFNlZ21lbnRTdGFydENoYXI6ICcoJyxcbiAgICBvcHRpb25hbFNlZ21lbnRFbmRDaGFyOiAnKScsXG4gICAgd2lsZGNhcmRDaGFyOiAnKidcbiAgfTtcbiAgYmFzZUFzdE5vZGVUb1JlZ2V4U3RyaW5nID0gZnVuY3Rpb24oYXN0Tm9kZSwgc2VnbWVudFZhbHVlQ2hhcnNldCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFzdE5vZGUpKSB7XG4gICAgICByZXR1cm4gc3RyaW5nQ29uY2F0TWFwKGFzdE5vZGUsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGJhc2VBc3ROb2RlVG9SZWdleFN0cmluZyhub2RlLCBzZWdtZW50VmFsdWVDaGFyc2V0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBzd2l0Y2ggKGFzdE5vZGUudGFnKSB7XG4gICAgICBjYXNlICd3aWxkY2FyZCc6XG4gICAgICAgIHJldHVybiAnKC4qPyknO1xuICAgICAgY2FzZSAnbmFtZWQnOlxuICAgICAgICByZXR1cm4gXCIoW1wiICsgc2VnbWVudFZhbHVlQ2hhcnNldCArIFwiXSspXCI7XG4gICAgICBjYXNlICdzdGF0aWMnOlxuICAgICAgICByZXR1cm4gZXNjYXBlRm9yUmVnZXgoYXN0Tm9kZS52YWx1ZSk7XG4gICAgICBjYXNlICdvcHRpb25hbCc6XG4gICAgICAgIHJldHVybiAnKD86JyArIGJhc2VBc3ROb2RlVG9SZWdleFN0cmluZyhhc3ROb2RlLnZhbHVlLCBzZWdtZW50VmFsdWVDaGFyc2V0KSArICcpPyc7XG4gICAgfVxuICB9O1xuICBhc3ROb2RlVG9SZWdleFN0cmluZyA9IGZ1bmN0aW9uKGFzdE5vZGUsIHNlZ21lbnRWYWx1ZUNoYXJzZXQpIHtcbiAgICBpZiAoc2VnbWVudFZhbHVlQ2hhcnNldCA9PSBudWxsKSB7XG4gICAgICBzZWdtZW50VmFsdWVDaGFyc2V0ID0gZGVmYXVsdE9wdGlvbnMuc2VnbWVudFZhbHVlQ2hhcnNldDtcbiAgICB9XG4gICAgcmV0dXJuICdeJyArIGJhc2VBc3ROb2RlVG9SZWdleFN0cmluZyhhc3ROb2RlLCBzZWdtZW50VmFsdWVDaGFyc2V0KSArICckJztcbiAgfTtcbiAgYXN0Tm9kZVRvTmFtZXMgPSBmdW5jdGlvbihhc3ROb2RlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXN0Tm9kZSkpIHtcbiAgICAgIHJldHVybiBjb25jYXRNYXAoYXN0Tm9kZSwgYXN0Tm9kZVRvTmFtZXMpO1xuICAgIH1cbiAgICBzd2l0Y2ggKGFzdE5vZGUudGFnKSB7XG4gICAgICBjYXNlICd3aWxkY2FyZCc6XG4gICAgICAgIHJldHVybiBbJ18nXTtcbiAgICAgIGNhc2UgJ25hbWVkJzpcbiAgICAgICAgcmV0dXJuIFthc3ROb2RlLnZhbHVlXTtcbiAgICAgIGNhc2UgJ3N0YXRpYyc6XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIGNhc2UgJ29wdGlvbmFsJzpcbiAgICAgICAgcmV0dXJuIGFzdE5vZGVUb05hbWVzKGFzdE5vZGUudmFsdWUpO1xuICAgIH1cbiAgfTtcbiAgZ2V0UGFyYW0gPSBmdW5jdGlvbihwYXJhbXMsIGtleSwgbmV4dEluZGV4ZXMsIHNpZGVFZmZlY3RzKSB7XG4gICAgdmFyIGluZGV4LCBtYXhJbmRleCwgcmVzdWx0LCB2YWx1ZTtcbiAgICBpZiAoc2lkZUVmZmVjdHMgPT0gbnVsbCkge1xuICAgICAgc2lkZUVmZmVjdHMgPSBmYWxzZTtcbiAgICB9XG4gICAgdmFsdWUgPSBwYXJhbXNba2V5XTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgaWYgKHNpZGVFZmZlY3RzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIHZhbHVlcyBwcm92aWRlZCBmb3Iga2V5IGBcIiArIGtleSArIFwiYFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgaW5kZXggPSBuZXh0SW5kZXhlc1trZXldIHx8IDA7XG4gICAgbWF4SW5kZXggPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCAtIDEgOiAwO1xuICAgIGlmIChpbmRleCA+IG1heEluZGV4KSB7XG4gICAgICBpZiAoc2lkZUVmZmVjdHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidG9vIGZldyB2YWx1ZXMgcHJvdmlkZWQgZm9yIGtleSBgXCIgKyBrZXkgKyBcImBcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWVbaW5kZXhdIDogdmFsdWU7XG4gICAgaWYgKHNpZGVFZmZlY3RzKSB7XG4gICAgICBuZXh0SW5kZXhlc1trZXldID0gaW5kZXggKyAxO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBhc3ROb2RlQ29udGFpbnNTZWdtZW50c0ZvclByb3ZpZGVkUGFyYW1zID0gZnVuY3Rpb24oYXN0Tm9kZSwgcGFyYW1zLCBuZXh0SW5kZXhlcykge1xuICAgIHZhciBpLCBsZW5ndGg7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXN0Tm9kZSkpIHtcbiAgICAgIGkgPSAtMTtcbiAgICAgIGxlbmd0aCA9IGFzdE5vZGUubGVuZ3RoO1xuICAgICAgd2hpbGUgKCsraSA8IGxlbmd0aCkge1xuICAgICAgICBpZiAoYXN0Tm9kZUNvbnRhaW5zU2VnbWVudHNGb3JQcm92aWRlZFBhcmFtcyhhc3ROb2RlW2ldLCBwYXJhbXMsIG5leHRJbmRleGVzKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHN3aXRjaCAoYXN0Tm9kZS50YWcpIHtcbiAgICAgIGNhc2UgJ3dpbGRjYXJkJzpcbiAgICAgICAgcmV0dXJuIGdldFBhcmFtKHBhcmFtcywgJ18nLCBuZXh0SW5kZXhlcywgZmFsc2UpICE9IG51bGw7XG4gICAgICBjYXNlICduYW1lZCc6XG4gICAgICAgIHJldHVybiBnZXRQYXJhbShwYXJhbXMsIGFzdE5vZGUudmFsdWUsIG5leHRJbmRleGVzLCBmYWxzZSkgIT0gbnVsbDtcbiAgICAgIGNhc2UgJ3N0YXRpYyc6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIGNhc2UgJ29wdGlvbmFsJzpcbiAgICAgICAgcmV0dXJuIGFzdE5vZGVDb250YWluc1NlZ21lbnRzRm9yUHJvdmlkZWRQYXJhbXMoYXN0Tm9kZS52YWx1ZSwgcGFyYW1zLCBuZXh0SW5kZXhlcyk7XG4gICAgfVxuICB9O1xuICBzdHJpbmdpZnkgPSBmdW5jdGlvbihhc3ROb2RlLCBwYXJhbXMsIG5leHRJbmRleGVzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXN0Tm9kZSkpIHtcbiAgICAgIHJldHVybiBzdHJpbmdDb25jYXRNYXAoYXN0Tm9kZSwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICByZXR1cm4gc3RyaW5naWZ5KG5vZGUsIHBhcmFtcywgbmV4dEluZGV4ZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHN3aXRjaCAoYXN0Tm9kZS50YWcpIHtcbiAgICAgIGNhc2UgJ3dpbGRjYXJkJzpcbiAgICAgICAgcmV0dXJuIGdldFBhcmFtKHBhcmFtcywgJ18nLCBuZXh0SW5kZXhlcywgdHJ1ZSk7XG4gICAgICBjYXNlICduYW1lZCc6XG4gICAgICAgIHJldHVybiBnZXRQYXJhbShwYXJhbXMsIGFzdE5vZGUudmFsdWUsIG5leHRJbmRleGVzLCB0cnVlKTtcbiAgICAgIGNhc2UgJ3N0YXRpYyc6XG4gICAgICAgIHJldHVybiBhc3ROb2RlLnZhbHVlO1xuICAgICAgY2FzZSAnb3B0aW9uYWwnOlxuICAgICAgICBpZiAoYXN0Tm9kZUNvbnRhaW5zU2VnbWVudHNGb3JQcm92aWRlZFBhcmFtcyhhc3ROb2RlLnZhbHVlLCBwYXJhbXMsIG5leHRJbmRleGVzKSkge1xuICAgICAgICAgIHJldHVybiBzdHJpbmdpZnkoYXN0Tm9kZS52YWx1ZSwgcGFyYW1zLCBuZXh0SW5kZXhlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuICB9O1xuICBVcmxQYXR0ZXJuID0gZnVuY3Rpb24oYXJnMSwgYXJnMikge1xuICAgIHZhciBncm91cENvdW50LCBvcHRpb25zLCBwYXJzZWQsIHBhcnNlciwgd2l0aG91dFdoaXRlc3BhY2U7XG4gICAgaWYgKGFyZzEgaW5zdGFuY2VvZiBVcmxQYXR0ZXJuKSB7XG4gICAgICB0aGlzLmlzUmVnZXggPSBhcmcxLmlzUmVnZXg7XG4gICAgICB0aGlzLnJlZ2V4ID0gYXJnMS5yZWdleDtcbiAgICAgIHRoaXMuYXN0ID0gYXJnMS5hc3Q7XG4gICAgICB0aGlzLm5hbWVzID0gYXJnMS5uYW1lcztcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc1JlZ2V4ID0gYXJnMSBpbnN0YW5jZW9mIFJlZ0V4cDtcbiAgICBpZiAoISgoJ3N0cmluZycgPT09IHR5cGVvZiBhcmcxKSB8fCB0aGlzLmlzUmVnZXgpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBtdXN0IGJlIGEgcmVnZXggb3IgYSBzdHJpbmcnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNSZWdleCkge1xuICAgICAgdGhpcy5yZWdleCA9IGFyZzE7XG4gICAgICBpZiAoYXJnMiAhPSBudWxsKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcmcyKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaWYgZmlyc3QgYXJndW1lbnQgaXMgYSByZWdleCB0aGUgc2Vjb25kIGFyZ3VtZW50IG1heSBiZSBhbiBhcnJheSBvZiBncm91cCBuYW1lcyBidXQgeW91IHByb3ZpZGVkIHNvbWV0aGluZyBlbHNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZ3JvdXBDb3VudCA9IHJlZ2V4R3JvdXBDb3VudCh0aGlzLnJlZ2V4KTtcbiAgICAgICAgaWYgKGFyZzIubGVuZ3RoICE9PSBncm91cENvdW50KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicmVnZXggY29udGFpbnMgXCIgKyBncm91cENvdW50ICsgXCIgZ3JvdXBzIGJ1dCBhcnJheSBvZiBncm91cCBuYW1lcyBjb250YWlucyBcIiArIGFyZzIubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hbWVzID0gYXJnMjtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFyZzEgPT09ICcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3VtZW50IG11c3Qgbm90IGJlIHRoZSBlbXB0eSBzdHJpbmcnKTtcbiAgICB9XG4gICAgd2l0aG91dFdoaXRlc3BhY2UgPSBhcmcxLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgIGlmICh3aXRob3V0V2hpdGVzcGFjZSAhPT0gYXJnMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmd1bWVudCBtdXN0IG5vdCBjb250YWluIHdoaXRlc3BhY2UnKTtcbiAgICB9XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGVzY2FwZUNoYXI6IChhcmcyICE9IG51bGwgPyBhcmcyLmVzY2FwZUNoYXIgOiB2b2lkIDApIHx8IGRlZmF1bHRPcHRpb25zLmVzY2FwZUNoYXIsXG4gICAgICBzZWdtZW50TmFtZVN0YXJ0Q2hhcjogKGFyZzIgIT0gbnVsbCA/IGFyZzIuc2VnbWVudE5hbWVTdGFydENoYXIgOiB2b2lkIDApIHx8IGRlZmF1bHRPcHRpb25zLnNlZ21lbnROYW1lU3RhcnRDaGFyLFxuICAgICAgc2VnbWVudE5hbWVDaGFyc2V0OiAoYXJnMiAhPSBudWxsID8gYXJnMi5zZWdtZW50TmFtZUNoYXJzZXQgOiB2b2lkIDApIHx8IGRlZmF1bHRPcHRpb25zLnNlZ21lbnROYW1lQ2hhcnNldCxcbiAgICAgIHNlZ21lbnRWYWx1ZUNoYXJzZXQ6IChhcmcyICE9IG51bGwgPyBhcmcyLnNlZ21lbnRWYWx1ZUNoYXJzZXQgOiB2b2lkIDApIHx8IGRlZmF1bHRPcHRpb25zLnNlZ21lbnRWYWx1ZUNoYXJzZXQsXG4gICAgICBvcHRpb25hbFNlZ21lbnRTdGFydENoYXI6IChhcmcyICE9IG51bGwgPyBhcmcyLm9wdGlvbmFsU2VnbWVudFN0YXJ0Q2hhciA6IHZvaWQgMCkgfHwgZGVmYXVsdE9wdGlvbnMub3B0aW9uYWxTZWdtZW50U3RhcnRDaGFyLFxuICAgICAgb3B0aW9uYWxTZWdtZW50RW5kQ2hhcjogKGFyZzIgIT0gbnVsbCA/IGFyZzIub3B0aW9uYWxTZWdtZW50RW5kQ2hhciA6IHZvaWQgMCkgfHwgZGVmYXVsdE9wdGlvbnMub3B0aW9uYWxTZWdtZW50RW5kQ2hhcixcbiAgICAgIHdpbGRjYXJkQ2hhcjogKGFyZzIgIT0gbnVsbCA/IGFyZzIud2lsZGNhcmRDaGFyIDogdm9pZCAwKSB8fCBkZWZhdWx0T3B0aW9ucy53aWxkY2FyZENoYXJcbiAgICB9O1xuICAgIHBhcnNlciA9IG5ld1BhcnNlcihvcHRpb25zKTtcbiAgICBwYXJzZWQgPSBwYXJzZXIucGF0dGVybihhcmcxKTtcbiAgICBpZiAocGFyc2VkID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNvdWxkbid0IHBhcnNlIHBhdHRlcm5cIik7XG4gICAgfVxuICAgIGlmIChwYXJzZWQucmVzdCAhPT0gJycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNvdWxkIG9ubHkgcGFydGlhbGx5IHBhcnNlIHBhdHRlcm5cIik7XG4gICAgfVxuICAgIHRoaXMuYXN0ID0gcGFyc2VkLnZhbHVlO1xuICAgIHRoaXMucmVnZXggPSBuZXcgUmVnRXhwKGFzdE5vZGVUb1JlZ2V4U3RyaW5nKHRoaXMuYXN0LCBvcHRpb25zLnNlZ21lbnRWYWx1ZUNoYXJzZXQpKTtcbiAgICB0aGlzLm5hbWVzID0gYXN0Tm9kZVRvTmFtZXModGhpcy5hc3QpO1xuICB9O1xuICBVcmxQYXR0ZXJuLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKHVybCkge1xuICAgIHZhciBncm91cHMsIG1hdGNoO1xuICAgIG1hdGNoID0gdGhpcy5yZWdleC5leGVjKHVybCk7XG4gICAgaWYgKG1hdGNoID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBncm91cHMgPSBtYXRjaC5zbGljZSgxKTtcbiAgICBpZiAodGhpcy5uYW1lcykge1xuICAgICAgcmV0dXJuIGtleXNBbmRWYWx1ZXNUb09iamVjdCh0aGlzLm5hbWVzLCBncm91cHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ3JvdXBzO1xuICAgIH1cbiAgfTtcbiAgVXJsUGF0dGVybi5wcm90b3R5cGUuc3RyaW5naWZ5ID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcyA9PSBudWxsKSB7XG4gICAgICBwYXJhbXMgPSB7fTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNSZWdleCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuJ3Qgc3RyaW5naWZ5IHBhdHRlcm5zIGdlbmVyYXRlZCBmcm9tIGEgcmVnZXhcIik7XG4gICAgfVxuICAgIGlmIChwYXJhbXMgIT09IE9iamVjdChwYXJhbXMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdCBvciB1bmRlZmluZWRcIik7XG4gICAgfVxuICAgIHJldHVybiBzdHJpbmdpZnkodGhpcy5hc3QsIHBhcmFtcywge30pO1xuICB9O1xuICBVcmxQYXR0ZXJuLmVzY2FwZUZvclJlZ2V4ID0gZXNjYXBlRm9yUmVnZXg7XG4gIFVybFBhdHRlcm4uY29uY2F0TWFwID0gY29uY2F0TWFwO1xuICBVcmxQYXR0ZXJuLnN0cmluZ0NvbmNhdE1hcCA9IHN0cmluZ0NvbmNhdE1hcDtcbiAgVXJsUGF0dGVybi5yZWdleEdyb3VwQ291bnQgPSByZWdleEdyb3VwQ291bnQ7XG4gIFVybFBhdHRlcm4ua2V5c0FuZFZhbHVlc1RvT2JqZWN0ID0ga2V5c0FuZFZhbHVlc1RvT2JqZWN0O1xuICBVcmxQYXR0ZXJuLlAgPSBQO1xuICBVcmxQYXR0ZXJuLm5ld1BhcnNlciA9IG5ld1BhcnNlcjtcbiAgVXJsUGF0dGVybi5kZWZhdWx0T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICBVcmxQYXR0ZXJuLmFzdE5vZGVUb1JlZ2V4U3RyaW5nID0gYXN0Tm9kZVRvUmVnZXhTdHJpbmc7XG4gIFVybFBhdHRlcm4uYXN0Tm9kZVRvTmFtZXMgPSBhc3ROb2RlVG9OYW1lcztcbiAgVXJsUGF0dGVybi5nZXRQYXJhbSA9IGdldFBhcmFtO1xuICBVcmxQYXR0ZXJuLmFzdE5vZGVDb250YWluc1NlZ21lbnRzRm9yUHJvdmlkZWRQYXJhbXMgPSBhc3ROb2RlQ29udGFpbnNTZWdtZW50c0ZvclByb3ZpZGVkUGFyYW1zO1xuICBVcmxQYXR0ZXJuLnN0cmluZ2lmeSA9IHN0cmluZ2lmeTtcbiAgcmV0dXJuIFVybFBhdHRlcm47XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy91cmwtcGF0dGVybi9saWIvdXJsLXBhdHRlcm4uanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IChlcnJvck1zZz86IHN0cmluZykgPT4gKC4uLmFyZ3M6IEFycmF5PCo+KSA9PiB7XG4gIGNvbnN0IGFyZ3NTdHJpbmcgPSBhcmdzLnJlZHVjZShcbiAgICAoc3RyLCBhcmcpID0+IGAke3N0ciAmJiBgJHtzdHJ9LCBgfSR7YXJnfWAsXG4gICAgJydcbiAgKTtcbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgIGAke2Vycm9yTXNnICYmIGAke2Vycm9yTXNnfSBgfSAke2FyZ3NTdHJpbmcgJiZcbiAgICAgIGBXYXMgY2FsbGVkIHdpdGggYXJndW1lbnRzICR7YXJnc1N0cmluZ30uYH1gXG4gICk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbC90aHJvdy1lcnJvci5qcyIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4vd2FybkFib3V0RGVwcmVjYXRlZENKU1JlcXVpcmUuanMnKSgnY3JlYXRlTWVtb3J5SGlzdG9yeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2luZGV4LmpzJykuY3JlYXRlTWVtb3J5SGlzdG9yeTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2NyZWF0ZU1lbW9yeUhpc3RvcnkuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBQcm92aWRlciwgeyBjcmVhdGVQcm92aWRlciB9IGZyb20gJy4vY29tcG9uZW50cy9Qcm92aWRlcic7XG5pbXBvcnQgY29ubmVjdEFkdmFuY2VkIGZyb20gJy4vY29tcG9uZW50cy9jb25uZWN0QWR2YW5jZWQnO1xuaW1wb3J0IGNvbm5lY3QgZnJvbSAnLi9jb25uZWN0L2Nvbm5lY3QnO1xuZXhwb3J0IHsgUHJvdmlkZXIsIGNyZWF0ZVByb3ZpZGVyLCBjb25uZWN0QWR2YW5jZWQsIGNvbm5lY3QgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmV4cG9ydCB2YXIgc3Vic2NyaXB0aW9uU2hhcGUgPSBQcm9wVHlwZXMuc2hhcGUoe1xuICB0cnlTdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRyeVVuc3Vic2NyaWJlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBub3RpZnlOZXN0ZWRTdWJzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpc1N1YnNjcmliZWQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn0pO1xuZXhwb3J0IHZhciBzdG9yZVNoYXBlID0gUHJvcFR5cGVzLnNoYXBlKHtcbiAgc3Vic2NyaWJlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZ2V0U3RhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9Qcm9wVHlwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZVwiO1xuaW1wb3J0IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiO1xuaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBob2lzdFN0YXRpY3MgZnJvbSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgY3JlYXRlRWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGlzVmFsaWRFbGVtZW50VHlwZSB9IGZyb20gJ3JlYWN0LWlzJztcbmltcG9ydCBTdWJzY3JpcHRpb24gZnJvbSAnLi4vdXRpbHMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHN0b3JlU2hhcGUsIHN1YnNjcmlwdGlvblNoYXBlIH0gZnJvbSAnLi4vdXRpbHMvUHJvcFR5cGVzJztcbnZhciBwcmVmaXhVbnNhZmVMaWZlY3ljbGVNZXRob2RzID0gdHlwZW9mIFJlYWN0LmZvcndhcmRSZWYgIT09IFwidW5kZWZpbmVkXCI7XG52YXIgaG90UmVsb2FkaW5nVmVyc2lvbiA9IDA7XG52YXIgZHVtbXlTdGF0ZSA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gbWFrZVNlbGVjdG9yU3RhdGVmdWwoc291cmNlU2VsZWN0b3IsIHN0b3JlKSB7XG4gIC8vIHdyYXAgdGhlIHNlbGVjdG9yIGluIGFuIG9iamVjdCB0aGF0IHRyYWNrcyBpdHMgcmVzdWx0cyBiZXR3ZWVuIHJ1bnMuXG4gIHZhciBzZWxlY3RvciA9IHtcbiAgICBydW46IGZ1bmN0aW9uIHJ1bkNvbXBvbmVudFNlbGVjdG9yKHByb3BzKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgbmV4dFByb3BzID0gc291cmNlU2VsZWN0b3Ioc3RvcmUuZ2V0U3RhdGUoKSwgcHJvcHMpO1xuXG4gICAgICAgIGlmIChuZXh0UHJvcHMgIT09IHNlbGVjdG9yLnByb3BzIHx8IHNlbGVjdG9yLmVycm9yKSB7XG4gICAgICAgICAgc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICBzZWxlY3Rvci5wcm9wcyA9IG5leHRQcm9wcztcbiAgICAgICAgICBzZWxlY3Rvci5lcnJvciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IHRydWU7XG4gICAgICAgIHNlbGVjdG9yLmVycm9yID0gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICByZXR1cm4gc2VsZWN0b3I7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbm5lY3RBZHZhbmNlZChcbi8qXG4gIHNlbGVjdG9yRmFjdG9yeSBpcyBhIGZ1bmMgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgcmV0dXJuaW5nIHRoZSBzZWxlY3RvciBmdW5jdGlvbiB1c2VkIHRvXG4gIGNvbXB1dGUgbmV3IHByb3BzIGZyb20gc3RhdGUsIHByb3BzLCBhbmQgZGlzcGF0Y2guIEZvciBleGFtcGxlOlxuICAgICBleHBvcnQgZGVmYXVsdCBjb25uZWN0QWR2YW5jZWQoKGRpc3BhdGNoLCBvcHRpb25zKSA9PiAoc3RhdGUsIHByb3BzKSA9PiAoe1xuICAgICAgdGhpbmc6IHN0YXRlLnRoaW5nc1twcm9wcy50aGluZ0lkXSxcbiAgICAgIHNhdmVUaGluZzogZmllbGRzID0+IGRpc3BhdGNoKGFjdGlvbkNyZWF0b3JzLnNhdmVUaGluZyhwcm9wcy50aGluZ0lkLCBmaWVsZHMpKSxcbiAgICB9KSkoWW91ckNvbXBvbmVudClcbiAgIEFjY2VzcyB0byBkaXNwYXRjaCBpcyBwcm92aWRlZCB0byB0aGUgZmFjdG9yeSBzbyBzZWxlY3RvckZhY3RvcmllcyBjYW4gYmluZCBhY3Rpb25DcmVhdG9yc1xuICBvdXRzaWRlIG9mIHRoZWlyIHNlbGVjdG9yIGFzIGFuIG9wdGltaXphdGlvbi4gT3B0aW9ucyBwYXNzZWQgdG8gY29ubmVjdEFkdmFuY2VkIGFyZSBwYXNzZWQgdG9cbiAgdGhlIHNlbGVjdG9yRmFjdG9yeSwgYWxvbmcgd2l0aCBkaXNwbGF5TmFtZSBhbmQgV3JhcHBlZENvbXBvbmVudCwgYXMgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgIE5vdGUgdGhhdCBzZWxlY3RvckZhY3RvcnkgaXMgcmVzcG9uc2libGUgZm9yIGFsbCBjYWNoaW5nL21lbW9pemF0aW9uIG9mIGluYm91bmQgYW5kIG91dGJvdW5kXG4gIHByb3BzLiBEbyBub3QgdXNlIGNvbm5lY3RBZHZhbmNlZCBkaXJlY3RseSB3aXRob3V0IG1lbW9pemluZyByZXN1bHRzIGJldHdlZW4gY2FsbHMgdG8geW91clxuICBzZWxlY3Rvciwgb3RoZXJ3aXNlIHRoZSBDb25uZWN0IGNvbXBvbmVudCB3aWxsIHJlLXJlbmRlciBvbiBldmVyeSBzdGF0ZSBvciBwcm9wcyBjaGFuZ2UuXG4qL1xuc2VsZWN0b3JGYWN0b3J5LCAvLyBvcHRpb25zIG9iamVjdDpcbl9yZWYpIHtcbiAgdmFyIF9jb250ZXh0VHlwZXMsIF9jaGlsZENvbnRleHRUeXBlcztcblxuICBpZiAoX3JlZiA9PT0gdm9pZCAwKSB7XG4gICAgX3JlZiA9IHt9O1xuICB9XG5cbiAgdmFyIF9yZWYyID0gX3JlZixcbiAgICAgIF9yZWYyJGdldERpc3BsYXlOYW1lID0gX3JlZjIuZ2V0RGlzcGxheU5hbWUsXG4gICAgICBnZXREaXNwbGF5TmFtZSA9IF9yZWYyJGdldERpc3BsYXlOYW1lID09PSB2b2lkIDAgPyBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBcIkNvbm5lY3RBZHZhbmNlZChcIiArIG5hbWUgKyBcIilcIjtcbiAgfSA6IF9yZWYyJGdldERpc3BsYXlOYW1lLFxuICAgICAgX3JlZjIkbWV0aG9kTmFtZSA9IF9yZWYyLm1ldGhvZE5hbWUsXG4gICAgICBtZXRob2ROYW1lID0gX3JlZjIkbWV0aG9kTmFtZSA9PT0gdm9pZCAwID8gJ2Nvbm5lY3RBZHZhbmNlZCcgOiBfcmVmMiRtZXRob2ROYW1lLFxuICAgICAgX3JlZjIkcmVuZGVyQ291bnRQcm9wID0gX3JlZjIucmVuZGVyQ291bnRQcm9wLFxuICAgICAgcmVuZGVyQ291bnRQcm9wID0gX3JlZjIkcmVuZGVyQ291bnRQcm9wID09PSB2b2lkIDAgPyB1bmRlZmluZWQgOiBfcmVmMiRyZW5kZXJDb3VudFByb3AsXG4gICAgICBfcmVmMiRzaG91bGRIYW5kbGVTdGEgPSBfcmVmMi5zaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMsXG4gICAgICBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMgPSBfcmVmMiRzaG91bGRIYW5kbGVTdGEgPT09IHZvaWQgMCA/IHRydWUgOiBfcmVmMiRzaG91bGRIYW5kbGVTdGEsXG4gICAgICBfcmVmMiRzdG9yZUtleSA9IF9yZWYyLnN0b3JlS2V5LFxuICAgICAgc3RvcmVLZXkgPSBfcmVmMiRzdG9yZUtleSA9PT0gdm9pZCAwID8gJ3N0b3JlJyA6IF9yZWYyJHN0b3JlS2V5LFxuICAgICAgX3JlZjIkd2l0aFJlZiA9IF9yZWYyLndpdGhSZWYsXG4gICAgICB3aXRoUmVmID0gX3JlZjIkd2l0aFJlZiA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmMiR3aXRoUmVmLFxuICAgICAgY29ubmVjdE9wdGlvbnMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmMiwgW1wiZ2V0RGlzcGxheU5hbWVcIiwgXCJtZXRob2ROYW1lXCIsIFwicmVuZGVyQ291bnRQcm9wXCIsIFwic2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzXCIsIFwic3RvcmVLZXlcIiwgXCJ3aXRoUmVmXCJdKTtcblxuICB2YXIgc3Vic2NyaXB0aW9uS2V5ID0gc3RvcmVLZXkgKyAnU3Vic2NyaXB0aW9uJztcbiAgdmFyIHZlcnNpb24gPSBob3RSZWxvYWRpbmdWZXJzaW9uKys7XG4gIHZhciBjb250ZXh0VHlwZXMgPSAoX2NvbnRleHRUeXBlcyA9IHt9LCBfY29udGV4dFR5cGVzW3N0b3JlS2V5XSA9IHN0b3JlU2hhcGUsIF9jb250ZXh0VHlwZXNbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvblNoYXBlLCBfY29udGV4dFR5cGVzKTtcbiAgdmFyIGNoaWxkQ29udGV4dFR5cGVzID0gKF9jaGlsZENvbnRleHRUeXBlcyA9IHt9LCBfY2hpbGRDb250ZXh0VHlwZXNbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvblNoYXBlLCBfY2hpbGRDb250ZXh0VHlwZXMpO1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcFdpdGhDb25uZWN0KFdyYXBwZWRDb21wb25lbnQpIHtcbiAgICBpbnZhcmlhbnQoaXNWYWxpZEVsZW1lbnRUeXBlKFdyYXBwZWRDb21wb25lbnQpLCBcIllvdSBtdXN0IHBhc3MgYSBjb21wb25lbnQgdG8gdGhlIGZ1bmN0aW9uIHJldHVybmVkIGJ5IFwiICsgKG1ldGhvZE5hbWUgKyBcIi4gSW5zdGVhZCByZWNlaXZlZCBcIiArIEpTT04uc3RyaW5naWZ5KFdyYXBwZWRDb21wb25lbnQpKSk7XG4gICAgdmFyIHdyYXBwZWRDb21wb25lbnROYW1lID0gV3JhcHBlZENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBXcmFwcGVkQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCc7XG4gICAgdmFyIGRpc3BsYXlOYW1lID0gZ2V0RGlzcGxheU5hbWUod3JhcHBlZENvbXBvbmVudE5hbWUpO1xuXG4gICAgdmFyIHNlbGVjdG9yRmFjdG9yeU9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgY29ubmVjdE9wdGlvbnMsIHtcbiAgICAgIGdldERpc3BsYXlOYW1lOiBnZXREaXNwbGF5TmFtZSxcbiAgICAgIG1ldGhvZE5hbWU6IG1ldGhvZE5hbWUsXG4gICAgICByZW5kZXJDb3VudFByb3A6IHJlbmRlckNvdW50UHJvcCxcbiAgICAgIHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlczogc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzLFxuICAgICAgc3RvcmVLZXk6IHN0b3JlS2V5LFxuICAgICAgd2l0aFJlZjogd2l0aFJlZixcbiAgICAgIGRpc3BsYXlOYW1lOiBkaXNwbGF5TmFtZSxcbiAgICAgIHdyYXBwZWRDb21wb25lbnROYW1lOiB3cmFwcGVkQ29tcG9uZW50TmFtZSxcbiAgICAgIFdyYXBwZWRDb21wb25lbnQ6IFdyYXBwZWRDb21wb25lbnQgLy8gVE9ETyBBY3R1YWxseSBmaXggb3VyIHVzZSBvZiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXG5cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWRlcHJlY2F0ZWQgKi9cblxuICAgIH0pO1xuXG4gICAgdmFyIENvbm5lY3QgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgICAgX2luaGVyaXRzTG9vc2UoQ29ubmVjdCwgX0NvbXBvbmVudCk7XG5cbiAgICAgIGZ1bmN0aW9uIENvbm5lY3QocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzO1xuXG4gICAgICAgIF90aGlzID0gX0NvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgX3RoaXMucmVuZGVyQ291bnQgPSAwO1xuICAgICAgICBfdGhpcy5zdG9yZSA9IHByb3BzW3N0b3JlS2V5XSB8fCBjb250ZXh0W3N0b3JlS2V5XTtcbiAgICAgICAgX3RoaXMucHJvcHNNb2RlID0gQm9vbGVhbihwcm9wc1tzdG9yZUtleV0pO1xuICAgICAgICBfdGhpcy5zZXRXcmFwcGVkSW5zdGFuY2UgPSBfdGhpcy5zZXRXcmFwcGVkSW5zdGFuY2UuYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSk7XG4gICAgICAgIGludmFyaWFudChfdGhpcy5zdG9yZSwgXCJDb3VsZCBub3QgZmluZCBcXFwiXCIgKyBzdG9yZUtleSArIFwiXFxcIiBpbiBlaXRoZXIgdGhlIGNvbnRleHQgb3IgcHJvcHMgb2YgXCIgKyAoXCJcXFwiXCIgKyBkaXNwbGF5TmFtZSArIFwiXFxcIi4gRWl0aGVyIHdyYXAgdGhlIHJvb3QgY29tcG9uZW50IGluIGEgPFByb3ZpZGVyPiwgXCIpICsgKFwib3IgZXhwbGljaXRseSBwYXNzIFxcXCJcIiArIHN0b3JlS2V5ICsgXCJcXFwiIGFzIGEgcHJvcCB0byBcXFwiXCIgKyBkaXNwbGF5TmFtZSArIFwiXFxcIi5cIikpO1xuXG4gICAgICAgIF90aGlzLmluaXRTZWxlY3RvcigpO1xuXG4gICAgICAgIF90aGlzLmluaXRTdWJzY3JpcHRpb24oKTtcblxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICB9XG5cbiAgICAgIHZhciBfcHJvdG8gPSBDb25uZWN0LnByb3RvdHlwZTtcblxuICAgICAgX3Byb3RvLmdldENoaWxkQ29udGV4dCA9IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgICAgdmFyIF9yZWYzO1xuXG4gICAgICAgIC8vIElmIHRoaXMgY29tcG9uZW50IHJlY2VpdmVkIHN0b3JlIGZyb20gcHJvcHMsIGl0cyBzdWJzY3JpcHRpb24gc2hvdWxkIGJlIHRyYW5zcGFyZW50XG4gICAgICAgIC8vIHRvIGFueSBkZXNjZW5kYW50cyByZWNlaXZpbmcgc3RvcmUrc3Vic2NyaXB0aW9uIGZyb20gY29udGV4dDsgaXQgcGFzc2VzIGFsb25nXG4gICAgICAgIC8vIHN1YnNjcmlwdGlvbiBwYXNzZWQgdG8gaXQuIE90aGVyd2lzZSwgaXQgc2hhZG93cyB0aGUgcGFyZW50IHN1YnNjcmlwdGlvbiwgd2hpY2ggYWxsb3dzXG4gICAgICAgIC8vIENvbm5lY3QgdG8gY29udHJvbCBvcmRlcmluZyBvZiBub3RpZmljYXRpb25zIHRvIGZsb3cgdG9wLWRvd24uXG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLnByb3BzTW9kZSA/IG51bGwgOiB0aGlzLnN1YnNjcmlwdGlvbjtcbiAgICAgICAgcmV0dXJuIF9yZWYzID0ge30sIF9yZWYzW3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb24gfHwgdGhpcy5jb250ZXh0W3N1YnNjcmlwdGlvbktleV0sIF9yZWYzO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICghc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzKSByZXR1cm47IC8vIGNvbXBvbmVudFdpbGxNb3VudCBmaXJlcyBkdXJpbmcgc2VydmVyIHNpZGUgcmVuZGVyaW5nLCBidXQgY29tcG9uZW50RGlkTW91bnQgYW5kXG4gICAgICAgIC8vIGNvbXBvbmVudFdpbGxVbm1vdW50IGRvIG5vdC4gQmVjYXVzZSBvZiB0aGlzLCB0cnlTdWJzY3JpYmUgaGFwcGVucyBkdXJpbmcgLi4uZGlkTW91bnQuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgdW5zdWJzY3JpcHRpb24gd291bGQgbmV2ZXIgdGFrZSBwbGFjZSBkdXJpbmcgU1NSLCBjYXVzaW5nIGEgbWVtb3J5IGxlYWsuXG4gICAgICAgIC8vIFRvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSBhIGNoaWxkIGNvbXBvbmVudCBtYXkgaGF2ZSB0cmlnZ2VyZWQgYSBzdGF0ZSBjaGFuZ2UgYnlcbiAgICAgICAgLy8gZGlzcGF0Y2hpbmcgYW4gYWN0aW9uIGluIGl0cyBjb21wb25lbnRXaWxsTW91bnQsIHdlIGhhdmUgdG8gcmUtcnVuIHRoZSBzZWxlY3QgYW5kIG1heWJlXG4gICAgICAgIC8vIHJlLXJlbmRlci5cblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi50cnlTdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4odGhpcy5wcm9wcyk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSkgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgfTsgLy8gTm90ZTogdGhpcyBpcyByZW5hbWVkIGJlbG93IHRvIHRoZSBVTlNBRkVfIHZlcnNpb24gaW4gUmVhY3QgPj0xNi4zLjBcblxuXG4gICAgICBfcHJvdG8uY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKG5leHRQcm9wcyk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGU7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB0aGlzLnN1YnNjcmlwdGlvbi50cnlVbnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicyA9IG5vb3A7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1biA9IG5vb3A7XG4gICAgICAgIHRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uZ2V0V3JhcHBlZEluc3RhbmNlID0gZnVuY3Rpb24gZ2V0V3JhcHBlZEluc3RhbmNlKCkge1xuICAgICAgICBpbnZhcmlhbnQod2l0aFJlZiwgXCJUbyBhY2Nlc3MgdGhlIHdyYXBwZWQgaW5zdGFuY2UsIHlvdSBuZWVkIHRvIHNwZWNpZnkgXCIgKyAoXCJ7IHdpdGhSZWY6IHRydWUgfSBpbiB0aGUgb3B0aW9ucyBhcmd1bWVudCBvZiB0aGUgXCIgKyBtZXRob2ROYW1lICsgXCIoKSBjYWxsLlwiKSk7XG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZWRJbnN0YW5jZTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5zZXRXcmFwcGVkSW5zdGFuY2UgPSBmdW5jdGlvbiBzZXRXcmFwcGVkSW5zdGFuY2UocmVmKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZEluc3RhbmNlID0gcmVmO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmluaXRTZWxlY3RvciA9IGZ1bmN0aW9uIGluaXRTZWxlY3RvcigpIHtcbiAgICAgICAgdmFyIHNvdXJjZVNlbGVjdG9yID0gc2VsZWN0b3JGYWN0b3J5KHRoaXMuc3RvcmUuZGlzcGF0Y2gsIHNlbGVjdG9yRmFjdG9yeU9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gbWFrZVNlbGVjdG9yU3RhdGVmdWwoc291cmNlU2VsZWN0b3IsIHRoaXMuc3RvcmUpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bih0aGlzLnByb3BzKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5pbml0U3Vic2NyaXB0aW9uID0gZnVuY3Rpb24gaW5pdFN1YnNjcmlwdGlvbigpIHtcbiAgICAgICAgaWYgKCFzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMpIHJldHVybjsgLy8gcGFyZW50U3ViJ3Mgc291cmNlIHNob3VsZCBtYXRjaCB3aGVyZSBzdG9yZSBjYW1lIGZyb206IHByb3BzIHZzLiBjb250ZXh0LiBBIGNvbXBvbmVudFxuICAgICAgICAvLyBjb25uZWN0ZWQgdG8gdGhlIHN0b3JlIHZpYSBwcm9wcyBzaG91bGRuJ3QgdXNlIHN1YnNjcmlwdGlvbiBmcm9tIGNvbnRleHQsIG9yIHZpY2UgdmVyc2EuXG5cbiAgICAgICAgdmFyIHBhcmVudFN1YiA9ICh0aGlzLnByb3BzTW9kZSA/IHRoaXMucHJvcHMgOiB0aGlzLmNvbnRleHQpW3N1YnNjcmlwdGlvbktleV07XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbih0aGlzLnN0b3JlLCBwYXJlbnRTdWIsIHRoaXMub25TdGF0ZUNoYW5nZS5iaW5kKHRoaXMpKTsgLy8gYG5vdGlmeU5lc3RlZFN1YnNgIGlzIGR1cGxpY2F0ZWQgdG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSBjb21wb25lbnQgaXMgdW5tb3VudGVkIGluXG4gICAgICAgIC8vIHRoZSBtaWRkbGUgb2YgdGhlIG5vdGlmaWNhdGlvbiBsb29wLCB3aGVyZSBgdGhpcy5zdWJzY3JpcHRpb25gIHdpbGwgdGhlbiBiZSBudWxsLiBBblxuICAgICAgICAvLyBleHRyYSBudWxsIGNoZWNrIGV2ZXJ5IGNoYW5nZSBjYW4gYmUgYXZvaWRlZCBieSBjb3B5aW5nIHRoZSBtZXRob2Qgb250byBgdGhpc2AgYW5kIHRoZW5cbiAgICAgICAgLy8gcmVwbGFjaW5nIGl0IHdpdGggYSBuby1vcCBvbiB1bm1vdW50LiBUaGlzIGNhbiBwcm9iYWJseSBiZSBhdm9pZGVkIGlmIFN1YnNjcmlwdGlvbidzXG4gICAgICAgIC8vIGxpc3RlbmVycyBsb2dpYyBpcyBjaGFuZ2VkIHRvIG5vdCBjYWxsIGxpc3RlbmVycyB0aGF0IGhhdmUgYmVlbiB1bnN1YnNjcmliZWQgaW4gdGhlXG4gICAgICAgIC8vIG1pZGRsZSBvZiB0aGUgbm90aWZpY2F0aW9uIGxvb3AuXG5cbiAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzID0gdGhpcy5zdWJzY3JpcHRpb24ubm90aWZ5TmVzdGVkU3Vicy5iaW5kKHRoaXMuc3Vic2NyaXB0aW9uKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5vblN0YXRlQ2hhbmdlID0gZnVuY3Rpb24gb25TdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4odGhpcy5wcm9wcyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSkge1xuICAgICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlID0gdGhpcy5ub3RpZnlOZXN0ZWRTdWJzT25Db21wb25lbnREaWRVcGRhdGU7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZShkdW1teVN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLm5vdGlmeU5lc3RlZFN1YnNPbkNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIG5vdGlmeU5lc3RlZFN1YnNPbkNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgLy8gYGNvbXBvbmVudERpZFVwZGF0ZWAgaXMgY29uZGl0aW9uYWxseSBpbXBsZW1lbnRlZCB3aGVuIGBvblN0YXRlQ2hhbmdlYCBkZXRlcm1pbmVzIGl0XG4gICAgICAgIC8vIG5lZWRzIHRvIG5vdGlmeSBuZXN0ZWQgc3Vicy4gT25jZSBjYWxsZWQsIGl0IHVuaW1wbGVtZW50cyBpdHNlbGYgdW50aWwgZnVydGhlciBzdGF0ZVxuICAgICAgICAvLyBjaGFuZ2VzIG9jY3VyLiBEb2luZyBpdCB0aGlzIHdheSB2cyBoYXZpbmcgYSBwZXJtYW5lbnQgYGNvbXBvbmVudERpZFVwZGF0ZWAgdGhhdCBkb2VzXG4gICAgICAgIC8vIGEgYm9vbGVhbiBjaGVjayBldmVyeSB0aW1lIGF2b2lkcyBhbiBleHRyYSBtZXRob2QgY2FsbCBtb3N0IG9mIHRoZSB0aW1lLCByZXN1bHRpbmdcbiAgICAgICAgLy8gaW4gc29tZSBwZXJmIGJvb3N0LlxuICAgICAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzKCk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uaXNTdWJzY3JpYmVkID0gZnVuY3Rpb24gaXNTdWJzY3JpYmVkKCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnN1YnNjcmlwdGlvbikgJiYgdGhpcy5zdWJzY3JpcHRpb24uaXNTdWJzY3JpYmVkKCk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uYWRkRXh0cmFQcm9wcyA9IGZ1bmN0aW9uIGFkZEV4dHJhUHJvcHMocHJvcHMpIHtcbiAgICAgICAgaWYgKCF3aXRoUmVmICYmICFyZW5kZXJDb3VudFByb3AgJiYgISh0aGlzLnByb3BzTW9kZSAmJiB0aGlzLnN1YnNjcmlwdGlvbikpIHJldHVybiBwcm9wczsgLy8gbWFrZSBhIHNoYWxsb3cgY29weSBzbyB0aGF0IGZpZWxkcyBhZGRlZCBkb24ndCBsZWFrIHRvIHRoZSBvcmlnaW5hbCBzZWxlY3Rvci5cbiAgICAgICAgLy8gdGhpcyBpcyBlc3BlY2lhbGx5IGltcG9ydGFudCBmb3IgJ3JlZicgc2luY2UgdGhhdCdzIGEgcmVmZXJlbmNlIGJhY2sgdG8gdGhlIGNvbXBvbmVudFxuICAgICAgICAvLyBpbnN0YW5jZS4gYSBzaW5nbGV0b24gbWVtb2l6ZWQgc2VsZWN0b3Igd291bGQgdGhlbiBiZSBob2xkaW5nIGEgcmVmZXJlbmNlIHRvIHRoZVxuICAgICAgICAvLyBpbnN0YW5jZSwgcHJldmVudGluZyB0aGUgaW5zdGFuY2UgZnJvbSBiZWluZyBnYXJiYWdlIGNvbGxlY3RlZCwgYW5kIHRoYXQgd291bGQgYmUgYmFkXG5cbiAgICAgICAgdmFyIHdpdGhFeHRyYXMgPSBfZXh0ZW5kcyh7fSwgcHJvcHMpO1xuXG4gICAgICAgIGlmICh3aXRoUmVmKSB3aXRoRXh0cmFzLnJlZiA9IHRoaXMuc2V0V3JhcHBlZEluc3RhbmNlO1xuICAgICAgICBpZiAocmVuZGVyQ291bnRQcm9wKSB3aXRoRXh0cmFzW3JlbmRlckNvdW50UHJvcF0gPSB0aGlzLnJlbmRlckNvdW50Kys7XG4gICAgICAgIGlmICh0aGlzLnByb3BzTW9kZSAmJiB0aGlzLnN1YnNjcmlwdGlvbikgd2l0aEV4dHJhc1tzdWJzY3JpcHRpb25LZXldID0gdGhpcy5zdWJzY3JpcHRpb247XG4gICAgICAgIHJldHVybiB3aXRoRXh0cmFzO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcjtcbiAgICAgICAgc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHNlbGVjdG9yLmVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgc2VsZWN0b3IuZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoV3JhcHBlZENvbXBvbmVudCwgdGhpcy5hZGRFeHRyYVByb3BzKHNlbGVjdG9yLnByb3BzKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDb25uZWN0O1xuICAgIH0oQ29tcG9uZW50KTtcblxuICAgIGlmIChwcmVmaXhVbnNhZmVMaWZlY3ljbGVNZXRob2RzKSB7XG4gICAgICAvLyBVc2UgVU5TQUZFXyBldmVudCBuYW1lIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuVU5TQUZFX2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzO1xuICAgICAgZGVsZXRlIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM7XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3Qvbm8tZGVwcmVjYXRlZCAqL1xuXG5cbiAgICBDb25uZWN0LldyYXBwZWRDb21wb25lbnQgPSBXcmFwcGVkQ29tcG9uZW50O1xuICAgIENvbm5lY3QuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgICBDb25uZWN0LmNoaWxkQ29udGV4dFR5cGVzID0gY2hpbGRDb250ZXh0VHlwZXM7XG4gICAgQ29ubmVjdC5jb250ZXh0VHlwZXMgPSBjb250ZXh0VHlwZXM7XG4gICAgQ29ubmVjdC5wcm9wVHlwZXMgPSBjb250ZXh0VHlwZXM7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gVXNlIFVOU0FGRV8gZXZlbnQgbmFtZSB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgIHZhciBldmVudE5hbWUgPSBwcmVmaXhVbnNhZmVMaWZlY3ljbGVNZXRob2RzID8gJ1VOU0FGRV9jb21wb25lbnRXaWxsVXBkYXRlJyA6ICdjb21wb25lbnRXaWxsVXBkYXRlJztcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGVbZXZlbnROYW1lXSA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIC8vIFdlIGFyZSBob3QgcmVsb2FkaW5nIVxuICAgICAgICBpZiAodGhpcy52ZXJzaW9uICE9PSB2ZXJzaW9uKSB7XG4gICAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgICB0aGlzLmluaXRTZWxlY3RvcigpOyAvLyBJZiBhbnkgY29ubmVjdGVkIGRlc2NlbmRhbnRzIGRvbid0IGhvdCByZWxvYWQgKGFuZCByZXN1YnNjcmliZSBpbiB0aGUgcHJvY2VzcyksIHRoZWlyXG4gICAgICAgICAgLy8gbGlzdGVuZXJzIHdpbGwgYmUgbG9zdCB3aGVuIHdlIHVuc3Vic2NyaWJlLiBVbmZvcnR1bmF0ZWx5LCBieSBjb3B5aW5nIG92ZXIgYWxsXG4gICAgICAgICAgLy8gbGlzdGVuZXJzLCB0aGlzIGRvZXMgbWVhbiB0aGF0IHRoZSBvbGQgdmVyc2lvbnMgb2YgY29ubmVjdGVkIGRlc2NlbmRhbnRzIHdpbGwgc3RpbGwgYmVcbiAgICAgICAgICAvLyBub3RpZmllZCBvZiBzdGF0ZSBjaGFuZ2VzOyBob3dldmVyLCB0aGVpciBvblN0YXRlQ2hhbmdlIGZ1bmN0aW9uIGlzIGEgbm8tb3Agc28gdGhpc1xuICAgICAgICAgIC8vIGlzbid0IGEgaHVnZSBkZWFsLlxuXG4gICAgICAgICAgdmFyIG9sZExpc3RlbmVycyA9IFtdO1xuXG4gICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBvbGRMaXN0ZW5lcnMgPSB0aGlzLnN1YnNjcmlwdGlvbi5saXN0ZW5lcnMuZ2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi50cnlVbnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuaW5pdFN1YnNjcmlwdGlvbigpO1xuXG4gICAgICAgICAgaWYgKHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udHJ5U3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBvbGRMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5zdWJzY3JpcHRpb24ubGlzdGVuZXJzLnN1YnNjcmliZShsaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGhvaXN0U3RhdGljcyhDb25uZWN0LCBXcmFwcGVkQ29tcG9uZW50KTtcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29tcG9uZW50cy9jb25uZWN0QWR2YW5jZWQuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0JztcbmltcG9ydCAkJG9ic2VydmFibGUgZnJvbSAnc3ltYm9sLW9ic2VydmFibGUnO1xuXG4vKipcbiAqIFRoZXNlIGFyZSBwcml2YXRlIGFjdGlvbiB0eXBlcyByZXNlcnZlZCBieSBSZWR1eC5cbiAqIEZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB5b3UgbXVzdCByZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBJZiB0aGUgY3VycmVudCBzdGF0ZSBpcyB1bmRlZmluZWQsIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAqIERvIG5vdCByZWZlcmVuY2UgdGhlc2UgYWN0aW9uIHR5cGVzIGRpcmVjdGx5IGluIHlvdXIgY29kZS5cbiAqL1xuZXhwb3J0IHZhciBBY3Rpb25UeXBlcyA9IHtcbiAgSU5JVDogJ0BAcmVkdXgvSU5JVCdcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFJlZHV4IHN0b3JlIHRoYXQgaG9sZHMgdGhlIHN0YXRlIHRyZWUuXG4gICAqIFRoZSBvbmx5IHdheSB0byBjaGFuZ2UgdGhlIGRhdGEgaW4gdGhlIHN0b3JlIGlzIHRvIGNhbGwgYGRpc3BhdGNoKClgIG9uIGl0LlxuICAgKlxuICAgKiBUaGVyZSBzaG91bGQgb25seSBiZSBhIHNpbmdsZSBzdG9yZSBpbiB5b3VyIGFwcC4gVG8gc3BlY2lmeSBob3cgZGlmZmVyZW50XG4gICAqIHBhcnRzIG9mIHRoZSBzdGF0ZSB0cmVlIHJlc3BvbmQgdG8gYWN0aW9ucywgeW91IG1heSBjb21iaW5lIHNldmVyYWwgcmVkdWNlcnNcbiAgICogaW50byBhIHNpbmdsZSByZWR1Y2VyIGZ1bmN0aW9uIGJ5IHVzaW5nIGBjb21iaW5lUmVkdWNlcnNgLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWR1Y2VyIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuZXh0IHN0YXRlIHRyZWUsIGdpdmVuXG4gICAqIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBhY3Rpb24gdG8gaGFuZGxlLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gW3ByZWxvYWRlZFN0YXRlXSBUaGUgaW5pdGlhbCBzdGF0ZS4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAgICogdG8gaHlkcmF0ZSB0aGUgc3RhdGUgZnJvbSB0aGUgc2VydmVyIGluIHVuaXZlcnNhbCBhcHBzLCBvciB0byByZXN0b3JlIGFcbiAgICogcHJldmlvdXNseSBzZXJpYWxpemVkIHVzZXIgc2Vzc2lvbi5cbiAgICogSWYgeW91IHVzZSBgY29tYmluZVJlZHVjZXJzYCB0byBwcm9kdWNlIHRoZSByb290IHJlZHVjZXIgZnVuY3Rpb24sIHRoaXMgbXVzdCBiZVxuICAgKiBhbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZSBhcyBgY29tYmluZVJlZHVjZXJzYCBrZXlzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZW5oYW5jZXJdIFRoZSBzdG9yZSBlbmhhbmNlci4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAgICogdG8gZW5oYW5jZSB0aGUgc3RvcmUgd2l0aCB0aGlyZC1wYXJ0eSBjYXBhYmlsaXRpZXMgc3VjaCBhcyBtaWRkbGV3YXJlLFxuICAgKiB0aW1lIHRyYXZlbCwgcGVyc2lzdGVuY2UsIGV0Yy4gVGhlIG9ubHkgc3RvcmUgZW5oYW5jZXIgdGhhdCBzaGlwcyB3aXRoIFJlZHV4XG4gICAqIGlzIGBhcHBseU1pZGRsZXdhcmUoKWAuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdG9yZX0gQSBSZWR1eCBzdG9yZSB0aGF0IGxldHMgeW91IHJlYWQgdGhlIHN0YXRlLCBkaXNwYXRjaCBhY3Rpb25zXG4gICAqIGFuZCBzdWJzY3JpYmUgdG8gY2hhbmdlcy5cbiAgICovXG59O2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICB2YXIgX3JlZjI7XG5cbiAgaWYgKHR5cGVvZiBwcmVsb2FkZWRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW5oYW5jZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZW5oYW5jZXIgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgICBwcmVsb2FkZWRTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgZW5oYW5jZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW5oYW5jZXIoY3JlYXRlU3RvcmUpKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIHJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciBjdXJyZW50UmVkdWNlciA9IHJlZHVjZXI7XG4gIHZhciBjdXJyZW50U3RhdGUgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgdmFyIGN1cnJlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzO1xuICB2YXIgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKG5leHRMaXN0ZW5lcnMgPT09IGN1cnJlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIHRoZSBzdGF0ZSB0cmVlIG1hbmFnZWQgYnkgdGhlIHN0b3JlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7YW55fSBUaGUgY3VycmVudCBzdGF0ZSB0cmVlIG9mIHlvdXIgYXBwbGljYXRpb24uXG4gICAqL1xuICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGFuZ2UgbGlzdGVuZXIuIEl0IHdpbGwgYmUgY2FsbGVkIGFueSB0aW1lIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLFxuICAgKiBhbmQgc29tZSBwYXJ0IG9mIHRoZSBzdGF0ZSB0cmVlIG1heSBwb3RlbnRpYWxseSBoYXZlIGNoYW5nZWQuIFlvdSBtYXkgdGhlblxuICAgKiBjYWxsIGBnZXRTdGF0ZSgpYCB0byByZWFkIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgaW5zaWRlIHRoZSBjYWxsYmFjay5cbiAgICpcbiAgICogWW91IG1heSBjYWxsIGBkaXNwYXRjaCgpYCBmcm9tIGEgY2hhbmdlIGxpc3RlbmVyLCB3aXRoIHRoZSBmb2xsb3dpbmdcbiAgICogY2F2ZWF0czpcbiAgICpcbiAgICogMS4gVGhlIHN1YnNjcmlwdGlvbnMgYXJlIHNuYXBzaG90dGVkIGp1c3QgYmVmb3JlIGV2ZXJ5IGBkaXNwYXRjaCgpYCBjYWxsLlxuICAgKiBJZiB5b3Ugc3Vic2NyaWJlIG9yIHVuc3Vic2NyaWJlIHdoaWxlIHRoZSBsaXN0ZW5lcnMgYXJlIGJlaW5nIGludm9rZWQsIHRoaXNcbiAgICogd2lsbCBub3QgaGF2ZSBhbnkgZWZmZWN0IG9uIHRoZSBgZGlzcGF0Y2goKWAgdGhhdCBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MuXG4gICAqIEhvd2V2ZXIsIHRoZSBuZXh0IGBkaXNwYXRjaCgpYCBjYWxsLCB3aGV0aGVyIG5lc3RlZCBvciBub3QsIHdpbGwgdXNlIGEgbW9yZVxuICAgKiByZWNlbnQgc25hcHNob3Qgb2YgdGhlIHN1YnNjcmlwdGlvbiBsaXN0LlxuICAgKlxuICAgKiAyLiBUaGUgbGlzdGVuZXIgc2hvdWxkIG5vdCBleHBlY3QgdG8gc2VlIGFsbCBzdGF0ZSBjaGFuZ2VzLCBhcyB0aGUgc3RhdGVcbiAgICogbWlnaHQgaGF2ZSBiZWVuIHVwZGF0ZWQgbXVsdGlwbGUgdGltZXMgZHVyaW5nIGEgbmVzdGVkIGBkaXNwYXRjaCgpYCBiZWZvcmVcbiAgICogdGhlIGxpc3RlbmVyIGlzIGNhbGxlZC4gSXQgaXMsIGhvd2V2ZXIsIGd1YXJhbnRlZWQgdGhhdCBhbGwgc3Vic2NyaWJlcnNcbiAgICogcmVnaXN0ZXJlZCBiZWZvcmUgdGhlIGBkaXNwYXRjaCgpYCBzdGFydGVkIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGxhdGVzdFxuICAgKiBzdGF0ZSBieSB0aGUgdGltZSBpdCBleGl0cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgQSBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGV2ZXJ5IGRpc3BhdGNoLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoaXMgY2hhbmdlIGxpc3RlbmVyLlxuICAgKi9cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBsaXN0ZW5lciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBpc1N1YnNjcmliZWQgPSB0cnVlO1xuXG4gICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgIG5leHRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICBpZiAoIWlzU3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuXG4gICAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgICB2YXIgaW5kZXggPSBuZXh0TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgICAgbmV4dExpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24uIEl0IGlzIHRoZSBvbmx5IHdheSB0byB0cmlnZ2VyIGEgc3RhdGUgY2hhbmdlLlxuICAgKlxuICAgKiBUaGUgYHJlZHVjZXJgIGZ1bmN0aW9uLCB1c2VkIHRvIGNyZWF0ZSB0aGUgc3RvcmUsIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlXG4gICAqIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGdpdmVuIGBhY3Rpb25gLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGxcbiAgICogYmUgY29uc2lkZXJlZCB0aGUgKipuZXh0Kiogc3RhdGUgb2YgdGhlIHRyZWUsIGFuZCB0aGUgY2hhbmdlIGxpc3RlbmVyc1xuICAgKiB3aWxsIGJlIG5vdGlmaWVkLlxuICAgKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvbmx5IHN1cHBvcnRzIHBsYWluIG9iamVjdCBhY3Rpb25zLiBJZiB5b3Ugd2FudCB0b1xuICAgKiBkaXNwYXRjaCBhIFByb21pc2UsIGFuIE9ic2VydmFibGUsIGEgdGh1bmssIG9yIHNvbWV0aGluZyBlbHNlLCB5b3UgbmVlZCB0b1xuICAgKiB3cmFwIHlvdXIgc3RvcmUgY3JlYXRpbmcgZnVuY3Rpb24gaW50byB0aGUgY29ycmVzcG9uZGluZyBtaWRkbGV3YXJlLiBGb3JcbiAgICogZXhhbXBsZSwgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgYHJlZHV4LXRodW5rYCBwYWNrYWdlLiBFdmVuIHRoZVxuICAgKiBtaWRkbGV3YXJlIHdpbGwgZXZlbnR1YWxseSBkaXNwYXRjaCBwbGFpbiBvYmplY3QgYWN0aW9ucyB1c2luZyB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBBIHBsYWluIG9iamVjdCByZXByZXNlbnRpbmcg4oCcd2hhdCBjaGFuZ2Vk4oCdLiBJdCBpc1xuICAgKiBhIGdvb2QgaWRlYSB0byBrZWVwIGFjdGlvbnMgc2VyaWFsaXphYmxlIHNvIHlvdSBjYW4gcmVjb3JkIGFuZCByZXBsYXkgdXNlclxuICAgKiBzZXNzaW9ucywgb3IgdXNlIHRoZSB0aW1lIHRyYXZlbGxpbmcgYHJlZHV4LWRldnRvb2xzYC4gQW4gYWN0aW9uIG11c3QgaGF2ZVxuICAgKiBhIGB0eXBlYCBwcm9wZXJ0eSB3aGljaCBtYXkgbm90IGJlIGB1bmRlZmluZWRgLiBJdCBpcyBhIGdvb2QgaWRlYSB0byB1c2VcbiAgICogc3RyaW5nIGNvbnN0YW50cyBmb3IgYWN0aW9uIHR5cGVzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBGb3IgY29udmVuaWVuY2UsIHRoZSBzYW1lIGFjdGlvbiBvYmplY3QgeW91IGRpc3BhdGNoZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCwgaWYgeW91IHVzZSBhIGN1c3RvbSBtaWRkbGV3YXJlLCBpdCBtYXkgd3JhcCBgZGlzcGF0Y2goKWAgdG9cbiAgICogcmV0dXJuIHNvbWV0aGluZyBlbHNlIChmb3IgZXhhbXBsZSwgYSBQcm9taXNlIHlvdSBjYW4gYXdhaXQpLlxuICAgKi9cbiAgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGFjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtdXN0IGJlIHBsYWluIG9iamVjdHMuICcgKyAnVXNlIGN1c3RvbSBtaWRkbGV3YXJlIGZvciBhc3luYyBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbWF5IG5vdCBoYXZlIGFuIHVuZGVmaW5lZCBcInR5cGVcIiBwcm9wZXJ0eS4gJyArICdIYXZlIHlvdSBtaXNzcGVsbGVkIGEgY29uc3RhbnQ/Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlcnMgbWF5IG5vdCBkaXNwYXRjaCBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzID0gbmV4dExpc3RlbmVycztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgbGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSByZWR1Y2VyIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBzdG9yZSB0byBjYWxjdWxhdGUgdGhlIHN0YXRlLlxuICAgKlxuICAgKiBZb3UgbWlnaHQgbmVlZCB0aGlzIGlmIHlvdXIgYXBwIGltcGxlbWVudHMgY29kZSBzcGxpdHRpbmcgYW5kIHlvdSB3YW50IHRvXG4gICAqIGxvYWQgc29tZSBvZiB0aGUgcmVkdWNlcnMgZHluYW1pY2FsbHkuIFlvdSBtaWdodCBhbHNvIG5lZWQgdGhpcyBpZiB5b3VcbiAgICogaW1wbGVtZW50IGEgaG90IHJlbG9hZGluZyBtZWNoYW5pc20gZm9yIFJlZHV4LlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0UmVkdWNlciBUaGUgcmVkdWNlciBmb3IgdGhlIHN0b3JlIHRvIHVzZSBpbnN0ZWFkLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIHJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKSB7XG4gICAgaWYgKHR5cGVvZiBuZXh0UmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgbmV4dFJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBjdXJyZW50UmVkdWNlciA9IG5leHRSZWR1Y2VyO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcm9wZXJhYmlsaXR5IHBvaW50IGZvciBvYnNlcnZhYmxlL3JlYWN0aXZlIGxpYnJhcmllcy5cbiAgICogQHJldHVybnMge29ic2VydmFibGV9IEEgbWluaW1hbCBvYnNlcnZhYmxlIG9mIHN0YXRlIGNoYW5nZXMuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIG9ic2VydmFibGUgcHJvcG9zYWw6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9ic2VydmFibGVcbiAgICovXG4gIGZ1bmN0aW9uIG9ic2VydmFibGUoKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICB2YXIgb3V0ZXJTdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgcmV0dXJuIF9yZWYgPSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBtaW5pbWFsIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYnNlcnZlciBBbnkgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgYW4gb2JzZXJ2ZXIuXG4gICAgICAgKiBUaGUgb2JzZXJ2ZXIgb2JqZWN0IHNob3VsZCBoYXZlIGEgYG5leHRgIG1ldGhvZC5cbiAgICAgICAqIEByZXR1cm5zIHtzdWJzY3JpcHRpb259IEFuIG9iamVjdCB3aXRoIGFuIGB1bnN1YnNjcmliZWAgbWV0aG9kIHRoYXQgY2FuXG4gICAgICAgKiBiZSB1c2VkIHRvIHVuc3Vic2NyaWJlIHRoZSBvYnNlcnZhYmxlIGZyb20gdGhlIHN0b3JlLCBhbmQgcHJldmVudCBmdXJ0aGVyXG4gICAgICAgKiBlbWlzc2lvbiBvZiB2YWx1ZXMgZnJvbSB0aGUgb2JzZXJ2YWJsZS5cbiAgICAgICAqL1xuICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlciAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgb2JzZXJ2ZXIgdG8gYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb2JzZXJ2ZVN0YXRlKCkge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5uZXh0KSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGdldFN0YXRlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9ic2VydmVTdGF0ZSgpO1xuICAgICAgICB2YXIgdW5zdWJzY3JpYmUgPSBvdXRlclN1YnNjcmliZShvYnNlcnZlU3RhdGUpO1xuICAgICAgICByZXR1cm4geyB1bnN1YnNjcmliZTogdW5zdWJzY3JpYmUgfTtcbiAgICAgIH1cbiAgICB9LCBfcmVmWyQkb2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBfcmVmO1xuICB9XG5cbiAgLy8gV2hlbiBhIHN0b3JlIGlzIGNyZWF0ZWQsIGFuIFwiSU5JVFwiIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHNvIHRoYXQgZXZlcnlcbiAgLy8gcmVkdWNlciByZXR1cm5zIHRoZWlyIGluaXRpYWwgc3RhdGUuIFRoaXMgZWZmZWN0aXZlbHkgcG9wdWxhdGVzXG4gIC8vIHRoZSBpbml0aWFsIHN0YXRlIHRyZWUuXG4gIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICByZXR1cm4gX3JlZjIgPSB7XG4gICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgIHN1YnNjcmliZTogc3Vic2NyaWJlLFxuICAgIGdldFN0YXRlOiBnZXRTdGF0ZSxcbiAgICByZXBsYWNlUmVkdWNlcjogcmVwbGFjZVJlZHVjZXJcbiAgfSwgX3JlZjJbJCRvYnNlcnZhYmxlXSA9IG9ic2VydmFibGUsIF9yZWYyO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jcmVhdGVTdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29tcG9zZXMgc2luZ2xlLWFyZ3VtZW50IGZ1bmN0aW9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQuIFRoZSByaWdodG1vc3RcbiAqIGZ1bmN0aW9uIGNhbiB0YWtlIG11bHRpcGxlIGFyZ3VtZW50cyBhcyBpdCBwcm92aWRlcyB0aGUgc2lnbmF0dXJlIGZvclxuICogdGhlIHJlc3VsdGluZyBjb21wb3NpdGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3MgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIG9idGFpbmVkIGJ5IGNvbXBvc2luZyB0aGUgYXJndW1lbnQgZnVuY3Rpb25zXG4gKiBmcm9tIHJpZ2h0IHRvIGxlZnQuIEZvciBleGFtcGxlLCBjb21wb3NlKGYsIGcsIGgpIGlzIGlkZW50aWNhbCB0byBkb2luZ1xuICogKC4uLmFyZ3MpID0+IGYoZyhoKC4uLmFyZ3MpKSkuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgZnVuY3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZnVuY3NbMF07XG4gIH1cblxuICByZXR1cm4gZnVuY3MucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhKGIuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHZlcmlmeVBsYWluT2JqZWN0IGZyb20gJy4uL3V0aWxzL3ZlcmlmeVBsYWluT2JqZWN0JztcbmV4cG9ydCBmdW5jdGlvbiB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50KGdldENvbnN0YW50KSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbml0Q29uc3RhbnRTZWxlY3RvcihkaXNwYXRjaCwgb3B0aW9ucykge1xuICAgIHZhciBjb25zdGFudCA9IGdldENvbnN0YW50KGRpc3BhdGNoLCBvcHRpb25zKTtcblxuICAgIGZ1bmN0aW9uIGNvbnN0YW50U2VsZWN0b3IoKSB7XG4gICAgICByZXR1cm4gY29uc3RhbnQ7XG4gICAgfVxuXG4gICAgY29uc3RhbnRTZWxlY3Rvci5kZXBlbmRzT25Pd25Qcm9wcyA9IGZhbHNlO1xuICAgIHJldHVybiBjb25zdGFudFNlbGVjdG9yO1xuICB9O1xufSAvLyBkZXBlbmRzT25Pd25Qcm9wcyBpcyB1c2VkIGJ5IGNyZWF0ZU1hcFRvUHJvcHNQcm94eSB0byBkZXRlcm1pbmUgd2hldGhlciB0byBwYXNzIHByb3BzIGFzIGFyZ3Ncbi8vIHRvIHRoZSBtYXBUb1Byb3BzIGZ1bmN0aW9uIGJlaW5nIHdyYXBwZWQuIEl0IGlzIGFsc28gdXNlZCBieSBtYWtlUHVyZVByb3BzU2VsZWN0b3IgdG8gZGV0ZXJtaW5lXG4vLyB3aGV0aGVyIG1hcFRvUHJvcHMgbmVlZHMgdG8gYmUgaW52b2tlZCB3aGVuIHByb3BzIGhhdmUgY2hhbmdlZC5cbi8vIFxuLy8gQSBsZW5ndGggb2Ygb25lIHNpZ25hbHMgdGhhdCBtYXBUb1Byb3BzIGRvZXMgbm90IGRlcGVuZCBvbiBwcm9wcyBmcm9tIHRoZSBwYXJlbnQgY29tcG9uZW50LlxuLy8gQSBsZW5ndGggb2YgemVybyBpcyBhc3N1bWVkIHRvIG1lYW4gbWFwVG9Qcm9wcyBpcyBnZXR0aW5nIGFyZ3MgdmlhIGFyZ3VtZW50cyBvciAuLi5hcmdzIGFuZFxuLy8gdGhlcmVmb3JlIG5vdCByZXBvcnRpbmcgaXRzIGxlbmd0aCBhY2N1cmF0ZWx5Li5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlcGVuZHNPbk93blByb3BzKG1hcFRvUHJvcHMpIHtcbiAgcmV0dXJuIG1hcFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMgIT09IG51bGwgJiYgbWFwVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcyAhPT0gdW5kZWZpbmVkID8gQm9vbGVhbihtYXBUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSA6IG1hcFRvUHJvcHMubGVuZ3RoICE9PSAxO1xufSAvLyBVc2VkIGJ5IHdoZW5NYXBTdGF0ZVRvUHJvcHNJc0Z1bmN0aW9uIGFuZCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNGdW5jdGlvbixcbi8vIHRoaXMgZnVuY3Rpb24gd3JhcHMgbWFwVG9Qcm9wcyBpbiBhIHByb3h5IGZ1bmN0aW9uIHdoaWNoIGRvZXMgc2V2ZXJhbCB0aGluZ3M6XG4vLyBcbi8vICAqIERldGVjdHMgd2hldGhlciB0aGUgbWFwVG9Qcm9wcyBmdW5jdGlvbiBiZWluZyBjYWxsZWQgZGVwZW5kcyBvbiBwcm9wcywgd2hpY2hcbi8vICAgIGlzIHVzZWQgYnkgc2VsZWN0b3JGYWN0b3J5IHRvIGRlY2lkZSBpZiBpdCBzaG91bGQgcmVpbnZva2Ugb24gcHJvcHMgY2hhbmdlcy5cbi8vICAgIFxuLy8gICogT24gZmlyc3QgY2FsbCwgaGFuZGxlcyBtYXBUb1Byb3BzIGlmIHJldHVybnMgYW5vdGhlciBmdW5jdGlvbiwgYW5kIHRyZWF0cyB0aGF0XG4vLyAgICBuZXcgZnVuY3Rpb24gYXMgdGhlIHRydWUgbWFwVG9Qcm9wcyBmb3Igc3Vic2VxdWVudCBjYWxscy5cbi8vICAgIFxuLy8gICogT24gZmlyc3QgY2FsbCwgdmVyaWZpZXMgdGhlIGZpcnN0IHJlc3VsdCBpcyBhIHBsYWluIG9iamVjdCwgaW4gb3JkZXIgdG8gd2FyblxuLy8gICAgdGhlIGRldmVsb3BlciB0aGF0IHRoZWlyIG1hcFRvUHJvcHMgZnVuY3Rpb24gaXMgbm90IHJldHVybmluZyBhIHZhbGlkIHJlc3VsdC5cbi8vICAgIFxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcE1hcFRvUHJvcHNGdW5jKG1hcFRvUHJvcHMsIG1ldGhvZE5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGluaXRQcm94eVNlbGVjdG9yKGRpc3BhdGNoLCBfcmVmKSB7XG4gICAgdmFyIGRpc3BsYXlOYW1lID0gX3JlZi5kaXNwbGF5TmFtZTtcblxuICAgIHZhciBwcm94eSA9IGZ1bmN0aW9uIG1hcFRvUHJvcHNQcm94eShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKSB7XG4gICAgICByZXR1cm4gcHJveHkuZGVwZW5kc09uT3duUHJvcHMgPyBwcm94eS5tYXBUb1Byb3BzKHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpIDogcHJveHkubWFwVG9Qcm9wcyhzdGF0ZU9yRGlzcGF0Y2gpO1xuICAgIH07IC8vIGFsbG93IGRldGVjdEZhY3RvcnlBbmRWZXJpZnkgdG8gZ2V0IG93blByb3BzXG5cblxuICAgIHByb3h5LmRlcGVuZHNPbk93blByb3BzID0gdHJ1ZTtcblxuICAgIHByb3h5Lm1hcFRvUHJvcHMgPSBmdW5jdGlvbiBkZXRlY3RGYWN0b3J5QW5kVmVyaWZ5KHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpIHtcbiAgICAgIHByb3h5Lm1hcFRvUHJvcHMgPSBtYXBUb1Byb3BzO1xuICAgICAgcHJveHkuZGVwZW5kc09uT3duUHJvcHMgPSBnZXREZXBlbmRzT25Pd25Qcm9wcyhtYXBUb1Byb3BzKTtcbiAgICAgIHZhciBwcm9wcyA9IHByb3h5KHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpO1xuXG4gICAgICBpZiAodHlwZW9mIHByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByb3h5Lm1hcFRvUHJvcHMgPSBwcm9wcztcbiAgICAgICAgcHJveHkuZGVwZW5kc09uT3duUHJvcHMgPSBnZXREZXBlbmRzT25Pd25Qcm9wcyhwcm9wcyk7XG4gICAgICAgIHByb3BzID0gcHJveHkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB2ZXJpZnlQbGFpbk9iamVjdChwcm9wcywgZGlzcGxheU5hbWUsIG1ldGhvZE5hbWUpO1xuICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH07XG5cbiAgICByZXR1cm4gcHJveHk7XG4gIH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3Qvd3JhcE1hcFRvUHJvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJy4vaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3dhcm5pbmcnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmVyaWZ5UGxhaW5PYmplY3QodmFsdWUsIGRpc3BsYXlOYW1lLCBtZXRob2ROYW1lKSB7XG4gIGlmICghaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICB3YXJuaW5nKG1ldGhvZE5hbWUgKyBcIigpIGluIFwiICsgZGlzcGxheU5hbWUgKyBcIiBtdXN0IHJldHVybiBhIHBsYWluIG9iamVjdC4gSW5zdGVhZCByZWNlaXZlZCBcIiArIHZhbHVlICsgXCIuXCIpO1xuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3ZlcmlmeVBsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2V0U3RhdGljID0gcmVxdWlyZSgnLi9zZXRTdGF0aWMnKTtcblxudmFyIF9zZXRTdGF0aWMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0U3RhdGljKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHNldERpc3BsYXlOYW1lID0gZnVuY3Rpb24gc2V0RGlzcGxheU5hbWUoZGlzcGxheU5hbWUpIHtcbiAgcmV0dXJuICgwLCBfc2V0U3RhdGljMi5kZWZhdWx0KSgnZGlzcGxheU5hbWUnLCBkaXNwbGF5TmFtZSk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBzZXREaXNwbGF5TmFtZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVjb21wb3NlL3NldERpc3BsYXlOYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZ2V0RGlzcGxheU5hbWUgPSByZXF1aXJlKCcuL2dldERpc3BsYXlOYW1lJyk7XG5cbnZhciBfZ2V0RGlzcGxheU5hbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0RGlzcGxheU5hbWUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgd3JhcERpc3BsYXlOYW1lID0gZnVuY3Rpb24gd3JhcERpc3BsYXlOYW1lKEJhc2VDb21wb25lbnQsIGhvY05hbWUpIHtcbiAgcmV0dXJuIGhvY05hbWUgKyAnKCcgKyAoMCwgX2dldERpc3BsYXlOYW1lMi5kZWZhdWx0KShCYXNlQ29tcG9uZW50KSArICcpJztcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHdyYXBEaXNwbGF5TmFtZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVjb21wb3NlL3dyYXBEaXNwbGF5TmFtZS5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCB7XG4gIExPQ0FUSU9OX0NIQU5HRUQsXG4gIFBVU0gsXG4gIFJFUExBQ0UsXG4gIEdPLFxuICBHT19CQUNLLFxuICBHT19GT1JXQVJELFxuICBQT1AsXG4gIEJMT0NLLFxuICBVTkJMT0NLLFxuICBSRVBMQUNFX1JPVVRFUyxcbiAgRElEX1JFUExBQ0VfUk9VVEVTXG59IGZyb20gJy4vdHlwZXMnO1xuXG5pbXBvcnQge1xuICBwdXNoLFxuICByZXBsYWNlLFxuICBnbyxcbiAgZ29CYWNrLFxuICBnb0ZvcndhcmQsXG4gIGJsb2NrLFxuICB1bmJsb2NrLFxuICByZXBsYWNlUm91dGVzLFxuICBpbml0aWFsaXplQ3VycmVudExvY2F0aW9uXG59IGZyb20gJy4vYWN0aW9ucyc7XG5cbmltcG9ydCByb3V0ZXJGb3JCcm93c2VyIGZyb20gJy4vZW52aXJvbm1lbnQvYnJvd3Nlci1yb3V0ZXInO1xuaW1wb3J0IHJvdXRlckZvckhhc2ggZnJvbSAnLi9lbnZpcm9ubWVudC9oYXNoLXJvdXRlcic7XG5pbXBvcnQgcm91dGVyRm9yRXhwcmVzcyBmcm9tICcuL2Vudmlyb25tZW50L2V4cHJlc3Mtcm91dGVyJztcbmltcG9ydCByb3V0ZXJGb3JIYXBpIGZyb20gJy4vZW52aXJvbm1lbnQvaGFwaS1yb3V0ZXInO1xuXG5pbXBvcnQgeyBMaW5rLCBQZXJzaXN0ZW50UXVlcnlMaW5rIH0gZnJvbSAnLi9jb21wb25lbnRzL2xpbmsnO1xuaW1wb3J0IEZyYWdtZW50IGZyb20gJy4vY29tcG9uZW50cy9mcmFnbWVudCc7XG5cbmV4cG9ydCB7XG4gIC8vIEhpZ2gtbGV2ZWwgUmVkdXggQVBJXG4gIHJvdXRlckZvckJyb3dzZXIsXG4gIHJvdXRlckZvckV4cHJlc3MsXG4gIHJvdXRlckZvckhhcGksXG4gIHJvdXRlckZvckhhc2gsXG4gIGluaXRpYWxpemVDdXJyZW50TG9jYXRpb24sXG4gIC8vIFJlYWN0IEFQSVxuICBMaW5rLFxuICBQZXJzaXN0ZW50UXVlcnlMaW5rLFxuICBGcmFnbWVudCxcbiAgLy8gUHVibGljIGFjdGlvbiBjcmVhdG9yc1xuICBwdXNoLFxuICByZXBsYWNlLFxuICBnbyxcbiAgZ29CYWNrLFxuICBnb0ZvcndhcmQsXG4gIGJsb2NrLFxuICB1bmJsb2NrLFxuICByZXBsYWNlUm91dGVzLFxuICAvLyBQdWJsaWMgYWN0aW9uIHR5cGVzXG4gIExPQ0FUSU9OX0NIQU5HRUQsXG4gIFBVU0gsXG4gIFJFUExBQ0UsXG4gIEdPLFxuICBHT19GT1JXQVJELFxuICBHT19CQUNLLFxuICBQT1AsXG4gIEJMT0NLLFxuICBVTkJMT0NLLFxuICBSRVBMQUNFX1JPVVRFUyxcbiAgRElEX1JFUExBQ0VfUk9VVEVTXG59O1xuXG5leHBvcnQgdHlwZSB7XG4gIFF1ZXJ5LFxuICBQYXJhbXMsXG4gIExvY2F0aW9uT3B0aW9ucyxcbiAgTG9jYXRpb24sXG4gIFN0YXRlLFxuICBIcmVmLFxuICBCYXJlQWN0aW9uLFxuICBJbmRleGVkQWN0aW9uLFxuICBMb2NhdGlvbkFjdGlvbixcbiAgUm91dGVyQWN0aW9uXG59IGZyb20gJy4vdHlwZXMnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kcyc7XG5pbXBvcnQgcmVzb2x2ZVBhdGhuYW1lIGZyb20gJ3Jlc29sdmUtcGF0aG5hbWUnO1xuaW1wb3J0IHZhbHVlRXF1YWwgZnJvbSAndmFsdWUtZXF1YWwnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAndGlueS13YXJuaW5nJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAndGlueS1pbnZhcmlhbnQnO1xuXG5mdW5jdGlvbiBhZGRMZWFkaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJyA/IHBhdGggOiAnLycgKyBwYXRoO1xufVxuZnVuY3Rpb24gc3RyaXBMZWFkaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJyA/IHBhdGguc3Vic3RyKDEpIDogcGF0aDtcbn1cbmZ1bmN0aW9uIGhhc0Jhc2VuYW1lKHBhdGgsIHByZWZpeCkge1xuICByZXR1cm4gcGF0aC50b0xvd2VyQ2FzZSgpLmluZGV4T2YocHJlZml4LnRvTG93ZXJDYXNlKCkpID09PSAwICYmICcvPyMnLmluZGV4T2YocGF0aC5jaGFyQXQocHJlZml4Lmxlbmd0aCkpICE9PSAtMTtcbn1cbmZ1bmN0aW9uIHN0cmlwQmFzZW5hbWUocGF0aCwgcHJlZml4KSB7XG4gIHJldHVybiBoYXNCYXNlbmFtZShwYXRoLCBwcmVmaXgpID8gcGF0aC5zdWJzdHIocHJlZml4Lmxlbmd0aCkgOiBwYXRoO1xufVxuZnVuY3Rpb24gc3RyaXBUcmFpbGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KHBhdGgubGVuZ3RoIC0gMSkgPT09ICcvJyA/IHBhdGguc2xpY2UoMCwgLTEpIDogcGF0aDtcbn1cbmZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoKSB7XG4gIHZhciBwYXRobmFtZSA9IHBhdGggfHwgJy8nO1xuICB2YXIgc2VhcmNoID0gJyc7XG4gIHZhciBoYXNoID0gJyc7XG4gIHZhciBoYXNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCcjJyk7XG5cbiAgaWYgKGhhc2hJbmRleCAhPT0gLTEpIHtcbiAgICBoYXNoID0gcGF0aG5hbWUuc3Vic3RyKGhhc2hJbmRleCk7XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZS5zdWJzdHIoMCwgaGFzaEluZGV4KTtcbiAgfVxuXG4gIHZhciBzZWFyY2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJz8nKTtcblxuICBpZiAoc2VhcmNoSW5kZXggIT09IC0xKSB7XG4gICAgc2VhcmNoID0gcGF0aG5hbWUuc3Vic3RyKHNlYXJjaEluZGV4KTtcbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnN1YnN0cigwLCBzZWFyY2hJbmRleCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBhdGhuYW1lOiBwYXRobmFtZSxcbiAgICBzZWFyY2g6IHNlYXJjaCA9PT0gJz8nID8gJycgOiBzZWFyY2gsXG4gICAgaGFzaDogaGFzaCA9PT0gJyMnID8gJycgOiBoYXNoXG4gIH07XG59XG5mdW5jdGlvbiBjcmVhdGVQYXRoKGxvY2F0aW9uKSB7XG4gIHZhciBwYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoLFxuICAgICAgaGFzaCA9IGxvY2F0aW9uLmhhc2g7XG4gIHZhciBwYXRoID0gcGF0aG5hbWUgfHwgJy8nO1xuICBpZiAoc2VhcmNoICYmIHNlYXJjaCAhPT0gJz8nKSBwYXRoICs9IHNlYXJjaC5jaGFyQXQoMCkgPT09ICc/JyA/IHNlYXJjaCA6IFwiP1wiICsgc2VhcmNoO1xuICBpZiAoaGFzaCAmJiBoYXNoICE9PSAnIycpIHBhdGggKz0gaGFzaC5jaGFyQXQoMCkgPT09ICcjJyA/IGhhc2ggOiBcIiNcIiArIGhhc2g7XG4gIHJldHVybiBwYXRoO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwga2V5LCBjdXJyZW50TG9jYXRpb24pIHtcbiAgdmFyIGxvY2F0aW9uO1xuXG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBUd28tYXJnIGZvcm06IHB1c2gocGF0aCwgc3RhdGUpXG4gICAgbG9jYXRpb24gPSBwYXJzZVBhdGgocGF0aCk7XG4gICAgbG9jYXRpb24uc3RhdGUgPSBzdGF0ZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBPbmUtYXJnIGZvcm06IHB1c2gobG9jYXRpb24pXG4gICAgbG9jYXRpb24gPSBfZXh0ZW5kcyh7fSwgcGF0aCk7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lID09PSB1bmRlZmluZWQpIGxvY2F0aW9uLnBhdGhuYW1lID0gJyc7XG5cbiAgICBpZiAobG9jYXRpb24uc2VhcmNoKSB7XG4gICAgICBpZiAobG9jYXRpb24uc2VhcmNoLmNoYXJBdCgwKSAhPT0gJz8nKSBsb2NhdGlvbi5zZWFyY2ggPSAnPycgKyBsb2NhdGlvbi5zZWFyY2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2F0aW9uLnNlYXJjaCA9ICcnO1xuICAgIH1cblxuICAgIGlmIChsb2NhdGlvbi5oYXNoKSB7XG4gICAgICBpZiAobG9jYXRpb24uaGFzaC5jaGFyQXQoMCkgIT09ICcjJykgbG9jYXRpb24uaGFzaCA9ICcjJyArIGxvY2F0aW9uLmhhc2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2F0aW9uLmhhc2ggPSAnJztcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBsb2NhdGlvbi5zdGF0ZSA9PT0gdW5kZWZpbmVkKSBsb2NhdGlvbi5zdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBsb2NhdGlvbi5wYXRobmFtZSA9IGRlY29kZVVSSShsb2NhdGlvbi5wYXRobmFtZSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIFVSSUVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgVVJJRXJyb3IoJ1BhdGhuYW1lIFwiJyArIGxvY2F0aW9uLnBhdGhuYW1lICsgJ1wiIGNvdWxkIG5vdCBiZSBkZWNvZGVkLiAnICsgJ1RoaXMgaXMgbGlrZWx5IGNhdXNlZCBieSBhbiBpbnZhbGlkIHBlcmNlbnQtZW5jb2RpbmcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGtleSkgbG9jYXRpb24ua2V5ID0ga2V5O1xuXG4gIGlmIChjdXJyZW50TG9jYXRpb24pIHtcbiAgICAvLyBSZXNvbHZlIGluY29tcGxldGUvcmVsYXRpdmUgcGF0aG5hbWUgcmVsYXRpdmUgdG8gY3VycmVudCBsb2NhdGlvbi5cbiAgICBpZiAoIWxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBsb2NhdGlvbi5wYXRobmFtZSA9IGN1cnJlbnRMb2NhdGlvbi5wYXRobmFtZTtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSB7XG4gICAgICBsb2NhdGlvbi5wYXRobmFtZSA9IHJlc29sdmVQYXRobmFtZShsb2NhdGlvbi5wYXRobmFtZSwgY3VycmVudExvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gV2hlbiB0aGVyZSBpcyBubyBwcmlvciBsb2NhdGlvbiBhbmQgcGF0aG5hbWUgaXMgZW1wdHksIHNldCBpdCB0byAvXG4gICAgaWYgKCFsb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSAnLyc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxvY2F0aW9uO1xufVxuZnVuY3Rpb24gbG9jYXRpb25zQXJlRXF1YWwoYSwgYikge1xuICByZXR1cm4gYS5wYXRobmFtZSA9PT0gYi5wYXRobmFtZSAmJiBhLnNlYXJjaCA9PT0gYi5zZWFyY2ggJiYgYS5oYXNoID09PSBiLmhhc2ggJiYgYS5rZXkgPT09IGIua2V5ICYmIHZhbHVlRXF1YWwoYS5zdGF0ZSwgYi5zdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCkge1xuICB2YXIgcHJvbXB0ID0gbnVsbDtcblxuICBmdW5jdGlvbiBzZXRQcm9tcHQobmV4dFByb21wdCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcocHJvbXB0ID09IG51bGwsICdBIGhpc3Rvcnkgc3VwcG9ydHMgb25seSBvbmUgcHJvbXB0IGF0IGEgdGltZScpIDogdm9pZCAwO1xuICAgIHByb21wdCA9IG5leHRQcm9tcHQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChwcm9tcHQgPT09IG5leHRQcm9tcHQpIHByb21wdCA9IG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgY2FsbGJhY2spIHtcbiAgICAvLyBUT0RPOiBJZiBhbm90aGVyIHRyYW5zaXRpb24gc3RhcnRzIHdoaWxlIHdlJ3JlIHN0aWxsIGNvbmZpcm1pbmdcbiAgICAvLyB0aGUgcHJldmlvdXMgb25lLCB3ZSBtYXkgZW5kIHVwIGluIGEgd2VpcmQgc3RhdGUuIEZpZ3VyZSBvdXQgdGhlXG4gICAgLy8gYmVzdCB3YXkgdG8gaGFuZGxlIHRoaXMuXG4gICAgaWYgKHByb21wdCAhPSBudWxsKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gdHlwZW9mIHByb21wdCA9PT0gJ2Z1bmN0aW9uJyA/IHByb21wdChsb2NhdGlvbiwgYWN0aW9uKSA6IHByb21wdDtcblxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZ2V0VXNlckNvbmZpcm1hdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGdldFVzZXJDb25maXJtYXRpb24ocmVzdWx0LCBjYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhmYWxzZSwgJ0EgaGlzdG9yeSBuZWVkcyBhIGdldFVzZXJDb25maXJtYXRpb24gZnVuY3Rpb24gaW4gb3JkZXIgdG8gdXNlIGEgcHJvbXB0IG1lc3NhZ2UnKSA6IHZvaWQgMDtcbiAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmV0dXJuIGZhbHNlIGZyb20gYSB0cmFuc2l0aW9uIGhvb2sgdG8gY2FuY2VsIHRoZSB0cmFuc2l0aW9uLlxuICAgICAgICBjYWxsYmFjayhyZXN1bHQgIT09IGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGFwcGVuZExpc3RlbmVyKGZuKSB7XG4gICAgdmFyIGlzQWN0aXZlID0gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgaWYgKGlzQWN0aXZlKSBmbi5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbSAhPT0gbGlzdGVuZXI7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm90aWZ5TGlzdGVuZXJzKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBsaXN0ZW5lci5hcHBseSh2b2lkIDAsIGFyZ3MpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXRQcm9tcHQ6IHNldFByb21wdCxcbiAgICBjb25maXJtVHJhbnNpdGlvblRvOiBjb25maXJtVHJhbnNpdGlvblRvLFxuICAgIGFwcGVuZExpc3RlbmVyOiBhcHBlbmRMaXN0ZW5lcixcbiAgICBub3RpZnlMaXN0ZW5lcnM6IG5vdGlmeUxpc3RlbmVyc1xuICB9O1xufVxuXG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbmZ1bmN0aW9uIGdldENvbmZpcm1hdGlvbihtZXNzYWdlLCBjYWxsYmFjaykge1xuICBjYWxsYmFjayh3aW5kb3cuY29uZmlybShtZXNzYWdlKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBIVE1MNSBoaXN0b3J5IEFQSSBpcyBzdXBwb3J0ZWQuIFRha2VuIGZyb20gTW9kZXJuaXpyLlxuICpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9oaXN0b3J5LmpzXG4gKiBjaGFuZ2VkIHRvIGF2b2lkIGZhbHNlIG5lZ2F0aXZlcyBmb3IgV2luZG93cyBQaG9uZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdGpzL3JlYWN0LXJvdXRlci9pc3N1ZXMvNTg2XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNIaXN0b3J5KCkge1xuICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgaWYgKCh1YS5pbmRleE9mKCdBbmRyb2lkIDIuJykgIT09IC0xIHx8IHVhLmluZGV4T2YoJ0FuZHJvaWQgNC4wJykgIT09IC0xKSAmJiB1YS5pbmRleE9mKCdNb2JpbGUgU2FmYXJpJykgIT09IC0xICYmIHVhLmluZGV4T2YoJ0Nocm9tZScpID09PSAtMSAmJiB1YS5pbmRleE9mKCdXaW5kb3dzIFBob25lJykgPT09IC0xKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB3aW5kb3cuaGlzdG9yeSAmJiAncHVzaFN0YXRlJyBpbiB3aW5kb3cuaGlzdG9yeTtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGJyb3dzZXIgZmlyZXMgcG9wc3RhdGUgb24gaGFzaCBjaGFuZ2UuXG4gKiBJRTEwIGFuZCBJRTExIGRvIG5vdC5cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c1BvcFN0YXRlT25IYXNoQ2hhbmdlKCkge1xuICByZXR1cm4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignVHJpZGVudCcpID09PSAtMTtcbn1cbi8qKlxuICogUmV0dXJucyBmYWxzZSBpZiB1c2luZyBnbyhuKSB3aXRoIGhhc2ggaGlzdG9yeSBjYXVzZXMgYSBmdWxsIHBhZ2UgcmVsb2FkLlxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCkge1xuICByZXR1cm4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpID09PSAtMTtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgZ2l2ZW4gcG9wc3RhdGUgZXZlbnQgaXMgYW4gZXh0cmFuZW91cyBXZWJLaXQgZXZlbnQuXG4gKiBBY2NvdW50cyBmb3IgdGhlIGZhY3QgdGhhdCBDaHJvbWUgb24gaU9TIGZpcmVzIHJlYWwgcG9wc3RhdGUgZXZlbnRzXG4gKiBjb250YWluaW5nIHVuZGVmaW5lZCBzdGF0ZSB3aGVuIHByZXNzaW5nIHRoZSBiYWNrIGJ1dHRvbi5cbiAqL1xuXG5mdW5jdGlvbiBpc0V4dHJhbmVvdXNQb3BzdGF0ZUV2ZW50KGV2ZW50KSB7XG4gIHJldHVybiBldmVudC5zdGF0ZSA9PT0gdW5kZWZpbmVkICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ3JpT1MnKSA9PT0gLTE7XG59XG5cbnZhciBQb3BTdGF0ZUV2ZW50ID0gJ3BvcHN0YXRlJztcbnZhciBIYXNoQ2hhbmdlRXZlbnQgPSAnaGFzaGNoYW5nZSc7XG5cbmZ1bmN0aW9uIGdldEhpc3RvcnlTdGF0ZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93Lmhpc3Rvcnkuc3RhdGUgfHwge307XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBJRSAxMSBzb21ldGltZXMgdGhyb3dzIHdoZW4gYWNjZXNzaW5nIHdpbmRvdy5oaXN0b3J5LnN0YXRlXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9SZWFjdFRyYWluaW5nL2hpc3RvcnkvcHVsbC8yODlcbiAgICByZXR1cm4ge307XG4gIH1cbn1cbi8qKlxuICogQ3JlYXRlcyBhIGhpc3Rvcnkgb2JqZWN0IHRoYXQgdXNlcyB0aGUgSFRNTDUgaGlzdG9yeSBBUEkgaW5jbHVkaW5nXG4gKiBwdXNoU3RhdGUsIHJlcGxhY2VTdGF0ZSwgYW5kIHRoZSBwb3BzdGF0ZSBldmVudC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZUJyb3dzZXJIaXN0b3J5KHByb3BzKSB7XG4gIGlmIChwcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgcHJvcHMgPSB7fTtcbiAgfVxuXG4gICFjYW5Vc2VET00gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsICdCcm93c2VyIGhpc3RvcnkgbmVlZHMgYSBET00nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIHZhciBnbG9iYWxIaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG4gIHZhciBjYW5Vc2VIaXN0b3J5ID0gc3VwcG9ydHNIaXN0b3J5KCk7XG4gIHZhciBuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lciA9ICFzdXBwb3J0c1BvcFN0YXRlT25IYXNoQ2hhbmdlKCk7XG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIF9wcm9wcyRmb3JjZVJlZnJlc2ggPSBfcHJvcHMuZm9yY2VSZWZyZXNoLFxuICAgICAgZm9yY2VSZWZyZXNoID0gX3Byb3BzJGZvcmNlUmVmcmVzaCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcHJvcHMkZm9yY2VSZWZyZXNoLFxuICAgICAgX3Byb3BzJGdldFVzZXJDb25maXJtID0gX3Byb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBnZXRVc2VyQ29uZmlybWF0aW9uID0gX3Byb3BzJGdldFVzZXJDb25maXJtID09PSB2b2lkIDAgPyBnZXRDb25maXJtYXRpb24gOiBfcHJvcHMkZ2V0VXNlckNvbmZpcm0sXG4gICAgICBfcHJvcHMka2V5TGVuZ3RoID0gX3Byb3BzLmtleUxlbmd0aCxcbiAgICAgIGtleUxlbmd0aCA9IF9wcm9wcyRrZXlMZW5ndGggPT09IHZvaWQgMCA/IDYgOiBfcHJvcHMka2V5TGVuZ3RoO1xuICB2YXIgYmFzZW5hbWUgPSBwcm9wcy5iYXNlbmFtZSA/IHN0cmlwVHJhaWxpbmdTbGFzaChhZGRMZWFkaW5nU2xhc2gocHJvcHMuYmFzZW5hbWUpKSA6ICcnO1xuXG4gIGZ1bmN0aW9uIGdldERPTUxvY2F0aW9uKGhpc3RvcnlTdGF0ZSkge1xuICAgIHZhciBfcmVmID0gaGlzdG9yeVN0YXRlIHx8IHt9LFxuICAgICAgICBrZXkgPSBfcmVmLmtleSxcbiAgICAgICAgc3RhdGUgPSBfcmVmLnN0YXRlO1xuXG4gICAgdmFyIF93aW5kb3ckbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24sXG4gICAgICAgIHBhdGhuYW1lID0gX3dpbmRvdyRsb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgc2VhcmNoID0gX3dpbmRvdyRsb2NhdGlvbi5zZWFyY2gsXG4gICAgICAgIGhhc2ggPSBfd2luZG93JGxvY2F0aW9uLmhhc2g7XG4gICAgdmFyIHBhdGggPSBwYXRobmFtZSArIHNlYXJjaCArIGhhc2g7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghYmFzZW5hbWUgfHwgaGFzQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpLCAnWW91IGFyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGJhc2VuYW1lIG9uIGEgcGFnZSB3aG9zZSBVUkwgcGF0aCBkb2VzIG5vdCBiZWdpbiAnICsgJ3dpdGggdGhlIGJhc2VuYW1lLiBFeHBlY3RlZCBwYXRoIFwiJyArIHBhdGggKyAnXCIgdG8gYmVnaW4gd2l0aCBcIicgKyBiYXNlbmFtZSArICdcIi4nKSA6IHZvaWQgMDtcbiAgICBpZiAoYmFzZW5hbWUpIHBhdGggPSBzdHJpcEJhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKTtcbiAgICByZXR1cm4gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGtleSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCBrZXlMZW5ndGgpO1xuICB9XG5cbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBnbG9iYWxIaXN0b3J5Lmxlbmd0aDtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wU3RhdGUoZXZlbnQpIHtcbiAgICAvLyBJZ25vcmUgZXh0cmFuZW91cyBwb3BzdGF0ZSBldmVudHMgaW4gV2ViS2l0LlxuICAgIGlmIChpc0V4dHJhbmVvdXNQb3BzdGF0ZUV2ZW50KGV2ZW50KSkgcmV0dXJuO1xuICAgIGhhbmRsZVBvcChnZXRET01Mb2NhdGlvbihldmVudC5zdGF0ZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlSGFzaENoYW5nZSgpIHtcbiAgICBoYW5kbGVQb3AoZ2V0RE9NTG9jYXRpb24oZ2V0SGlzdG9yeVN0YXRlKCkpKTtcbiAgfVxuXG4gIHZhciBmb3JjZU5leHRQb3AgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBoYW5kbGVQb3AobG9jYXRpb24pIHtcbiAgICBpZiAoZm9yY2VOZXh0UG9wKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSBmYWxzZTtcbiAgICAgIHNldFN0YXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhY3Rpb24gPSAnUE9QJztcbiAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV2ZXJ0UG9wKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0UG9wKGZyb21Mb2NhdGlvbikge1xuICAgIHZhciB0b0xvY2F0aW9uID0gaGlzdG9yeS5sb2NhdGlvbjsgLy8gVE9ETzogV2UgY291bGQgcHJvYmFibHkgbWFrZSB0aGlzIG1vcmUgcmVsaWFibGUgYnlcbiAgICAvLyBrZWVwaW5nIGEgbGlzdCBvZiBrZXlzIHdlJ3ZlIHNlZW4gaW4gc2Vzc2lvblN0b3JhZ2UuXG4gICAgLy8gSW5zdGVhZCwgd2UganVzdCBkZWZhdWx0IHRvIDAgZm9yIGtleXMgd2UgZG9uJ3Qga25vdy5cblxuICAgIHZhciB0b0luZGV4ID0gYWxsS2V5cy5pbmRleE9mKHRvTG9jYXRpb24ua2V5KTtcbiAgICBpZiAodG9JbmRleCA9PT0gLTEpIHRvSW5kZXggPSAwO1xuICAgIHZhciBmcm9tSW5kZXggPSBhbGxLZXlzLmluZGV4T2YoZnJvbUxvY2F0aW9uLmtleSk7XG4gICAgaWYgKGZyb21JbmRleCA9PT0gLTEpIGZyb21JbmRleCA9IDA7XG4gICAgdmFyIGRlbHRhID0gdG9JbmRleCAtIGZyb21JbmRleDtcblxuICAgIGlmIChkZWx0YSkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gdHJ1ZTtcbiAgICAgIGdvKGRlbHRhKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaW5pdGlhbExvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oZ2V0SGlzdG9yeVN0YXRlKCkpO1xuICB2YXIgYWxsS2V5cyA9IFtpbml0aWFsTG9jYXRpb24ua2V5XTsgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24pIHtcbiAgICByZXR1cm4gYmFzZW5hbWUgKyBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHB1c2ggd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgaHJlZiA9IGNyZWF0ZUhyZWYobG9jYXRpb24pO1xuICAgICAgdmFyIGtleSA9IGxvY2F0aW9uLmtleSxcbiAgICAgICAgICBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlO1xuXG4gICAgICBpZiAoY2FuVXNlSGlzdG9yeSkge1xuICAgICAgICBnbG9iYWxIaXN0b3J5LnB1c2hTdGF0ZSh7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICAgIH0sIG51bGwsIGhyZWYpO1xuXG4gICAgICAgIGlmIChmb3JjZVJlZnJlc2gpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHByZXZJbmRleCA9IGFsbEtleXMuaW5kZXhPZihoaXN0b3J5LmxvY2F0aW9uLmtleSk7XG4gICAgICAgICAgdmFyIG5leHRLZXlzID0gYWxsS2V5cy5zbGljZSgwLCBwcmV2SW5kZXggKyAxKTtcbiAgICAgICAgICBuZXh0S2V5cy5wdXNoKGxvY2F0aW9uLmtleSk7XG4gICAgICAgICAgYWxsS2V5cyA9IG5leHRLZXlzO1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0Jyb3dzZXIgaGlzdG9yeSBjYW5ub3QgcHVzaCBzdGF0ZSBpbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IEhUTUw1IGhpc3RvcnknKSA6IHZvaWQgMDtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcmVwbGFjZSB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBocmVmID0gY3JlYXRlSHJlZihsb2NhdGlvbik7XG4gICAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5LFxuICAgICAgICAgIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG5cbiAgICAgIGlmIChjYW5Vc2VIaXN0b3J5KSB7XG4gICAgICAgIGdsb2JhbEhpc3RvcnkucmVwbGFjZVN0YXRlKHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgfSwgbnVsbCwgaHJlZik7XG5cbiAgICAgICAgaWYgKGZvcmNlUmVmcmVzaCkge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGhyZWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YoaGlzdG9yeS5sb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSBhbGxLZXlzW3ByZXZJbmRleF0gPSBsb2NhdGlvbi5rZXk7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnQnJvd3NlciBoaXN0b3J5IGNhbm5vdCByZXBsYWNlIHN0YXRlIGluIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgSFRNTDUgaGlzdG9yeScpIDogdm9pZCAwO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShocmVmKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICBnbG9iYWxIaXN0b3J5LmdvKG4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIGdvKC0xKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICBnbygxKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RPTUxpc3RlbmVycyhkZWx0YSkge1xuICAgIGxpc3RlbmVyQ291bnQgKz0gZGVsdGE7XG5cbiAgICBpZiAobGlzdGVuZXJDb3VudCA9PT0gMSAmJiBkZWx0YSA9PT0gMSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoUG9wU3RhdGVFdmVudCwgaGFuZGxlUG9wU3RhdGUpO1xuICAgICAgaWYgKG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH0gZWxzZSBpZiAobGlzdGVuZXJDb3VudCA9PT0gMCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoUG9wU3RhdGVFdmVudCwgaGFuZGxlUG9wU3RhdGUpO1xuICAgICAgaWYgKG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyKSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpc0Jsb2NrZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBibG9jayhwcm9tcHQpIHtcbiAgICBpZiAocHJvbXB0ID09PSB2b2lkIDApIHtcbiAgICAgIHByb21wdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB1bmJsb2NrID0gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG5cbiAgICBpZiAoIWlzQmxvY2tlZCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaXNCbG9ja2VkKSB7XG4gICAgICAgIGlzQmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmJsb2NrKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHZhciB1bmxpc3RlbiA9IHRyYW5zaXRpb25NYW5hZ2VyLmFwcGVuZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgdW5saXN0ZW4oKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBnbG9iYWxIaXN0b3J5Lmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBpbml0aWFsTG9jYXRpb24sXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICBwdXNoOiBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgZ286IGdvLFxuICAgIGdvQmFjazogZ29CYWNrLFxuICAgIGdvRm9yd2FyZDogZ29Gb3J3YXJkLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxudmFyIEhhc2hDaGFuZ2VFdmVudCQxID0gJ2hhc2hjaGFuZ2UnO1xudmFyIEhhc2hQYXRoQ29kZXJzID0ge1xuICBoYXNoYmFuZzoge1xuICAgIGVuY29kZVBhdGg6IGZ1bmN0aW9uIGVuY29kZVBhdGgocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnIScgPyBwYXRoIDogJyEvJyArIHN0cmlwTGVhZGluZ1NsYXNoKHBhdGgpO1xuICAgIH0sXG4gICAgZGVjb2RlUGF0aDogZnVuY3Rpb24gZGVjb2RlUGF0aChwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICchJyA/IHBhdGguc3Vic3RyKDEpIDogcGF0aDtcbiAgICB9XG4gIH0sXG4gIG5vc2xhc2g6IHtcbiAgICBlbmNvZGVQYXRoOiBzdHJpcExlYWRpbmdTbGFzaCxcbiAgICBkZWNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2hcbiAgfSxcbiAgc2xhc2g6IHtcbiAgICBlbmNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2gsXG4gICAgZGVjb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoXG4gIH1cbn07XG5cbmZ1bmN0aW9uIHN0cmlwSGFzaCh1cmwpIHtcbiAgdmFyIGhhc2hJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gIHJldHVybiBoYXNoSW5kZXggPT09IC0xID8gdXJsIDogdXJsLnNsaWNlKDAsIGhhc2hJbmRleCk7XG59XG5cbmZ1bmN0aW9uIGdldEhhc2hQYXRoKCkge1xuICAvLyBXZSBjYW4ndCB1c2Ugd2luZG93LmxvY2F0aW9uLmhhc2ggaGVyZSBiZWNhdXNlIGl0J3Mgbm90XG4gIC8vIGNvbnNpc3RlbnQgYWNyb3NzIGJyb3dzZXJzIC0gRmlyZWZveCB3aWxsIHByZS1kZWNvZGUgaXQhXG4gIHZhciBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIHZhciBoYXNoSW5kZXggPSBocmVmLmluZGV4T2YoJyMnKTtcbiAgcmV0dXJuIGhhc2hJbmRleCA9PT0gLTEgPyAnJyA6IGhyZWYuc3Vic3RyaW5nKGhhc2hJbmRleCArIDEpO1xufVxuXG5mdW5jdGlvbiBwdXNoSGFzaFBhdGgocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VIYXNoUGF0aChwYXRoKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHN0cmlwSGFzaCh3aW5kb3cubG9jYXRpb24uaHJlZikgKyAnIycgKyBwYXRoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGFzaEhpc3RvcnkocHJvcHMpIHtcbiAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICBwcm9wcyA9IHt9O1xuICB9XG5cbiAgIWNhblVzZURPTSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgJ0hhc2ggaGlzdG9yeSBuZWVkcyBhIERPTScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgdmFyIGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdmFyIGNhbkdvV2l0aG91dFJlbG9hZCA9IHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCk7XG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9PT0gdm9pZCAwID8gZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGhhc2hUeXBlID0gX3Byb3BzLmhhc2hUeXBlLFxuICAgICAgaGFzaFR5cGUgPSBfcHJvcHMkaGFzaFR5cGUgPT09IHZvaWQgMCA/ICdzbGFzaCcgOiBfcHJvcHMkaGFzaFR5cGU7XG4gIHZhciBiYXNlbmFtZSA9IHByb3BzLmJhc2VuYW1lID8gc3RyaXBUcmFpbGluZ1NsYXNoKGFkZExlYWRpbmdTbGFzaChwcm9wcy5iYXNlbmFtZSkpIDogJyc7XG4gIHZhciBfSGFzaFBhdGhDb2RlcnMkaGFzaFQgPSBIYXNoUGF0aENvZGVyc1toYXNoVHlwZV0sXG4gICAgICBlbmNvZGVQYXRoID0gX0hhc2hQYXRoQ29kZXJzJGhhc2hULmVuY29kZVBhdGgsXG4gICAgICBkZWNvZGVQYXRoID0gX0hhc2hQYXRoQ29kZXJzJGhhc2hULmRlY29kZVBhdGg7XG5cbiAgZnVuY3Rpb24gZ2V0RE9NTG9jYXRpb24oKSB7XG4gICAgdmFyIHBhdGggPSBkZWNvZGVQYXRoKGdldEhhc2hQYXRoKCkpO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJykgOiB2b2lkIDA7XG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gc3RyaXBCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgpO1xuICB9XG5cbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBnbG9iYWxIaXN0b3J5Lmxlbmd0aDtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9XG5cbiAgdmFyIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICB2YXIgaWdub3JlUGF0aCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gbG9jYXRpb25zQXJlRXF1YWwkJDEoYSwgYikge1xuICAgIHJldHVybiBhLnBhdGhuYW1lID09PSBiLnBhdGhuYW1lICYmIGEuc2VhcmNoID09PSBiLnNlYXJjaCAmJiBhLmhhc2ggPT09IGIuaGFzaDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUhhc2hDaGFuZ2UoKSB7XG4gICAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgocGF0aCk7XG5cbiAgICBpZiAocGF0aCAhPT0gZW5jb2RlZFBhdGgpIHtcbiAgICAgIC8vIEVuc3VyZSB3ZSBhbHdheXMgaGF2ZSBhIHByb3Blcmx5LWVuY29kZWQgaGFzaC5cbiAgICAgIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBsb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKCk7XG4gICAgICB2YXIgcHJldkxvY2F0aW9uID0gaGlzdG9yeS5sb2NhdGlvbjtcbiAgICAgIGlmICghZm9yY2VOZXh0UG9wICYmIGxvY2F0aW9uc0FyZUVxdWFsJCQxKHByZXZMb2NhdGlvbiwgbG9jYXRpb24pKSByZXR1cm47IC8vIEEgaGFzaGNoYW5nZSBkb2Vzbid0IGFsd2F5cyA9PSBsb2NhdGlvbiBjaGFuZ2UuXG5cbiAgICAgIGlmIChpZ25vcmVQYXRoID09PSBjcmVhdGVQYXRoKGxvY2F0aW9uKSkgcmV0dXJuOyAvLyBJZ25vcmUgdGhpcyBjaGFuZ2U7IHdlIGFscmVhZHkgc2V0U3RhdGUgaW4gcHVzaC9yZXBsYWNlLlxuXG4gICAgICBpZ25vcmVQYXRoID0gbnVsbDtcbiAgICAgIGhhbmRsZVBvcChsb2NhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wKGxvY2F0aW9uKSB7XG4gICAgaWYgKGZvcmNlTmV4dFBvcCkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldmVydFBvcChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydFBvcChmcm9tTG9jYXRpb24pIHtcbiAgICB2YXIgdG9Mb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247IC8vIFRPRE86IFdlIGNvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyBtb3JlIHJlbGlhYmxlIGJ5XG4gICAgLy8ga2VlcGluZyBhIGxpc3Qgb2YgcGF0aHMgd2UndmUgc2VlbiBpbiBzZXNzaW9uU3RvcmFnZS5cbiAgICAvLyBJbnN0ZWFkLCB3ZSBqdXN0IGRlZmF1bHQgdG8gMCBmb3IgcGF0aHMgd2UgZG9uJ3Qga25vdy5cblxuICAgIHZhciB0b0luZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoY3JlYXRlUGF0aCh0b0xvY2F0aW9uKSk7XG4gICAgaWYgKHRvSW5kZXggPT09IC0xKSB0b0luZGV4ID0gMDtcbiAgICB2YXIgZnJvbUluZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoY3JlYXRlUGF0aChmcm9tTG9jYXRpb24pKTtcbiAgICBpZiAoZnJvbUluZGV4ID09PSAtMSkgZnJvbUluZGV4ID0gMDtcbiAgICB2YXIgZGVsdGEgPSB0b0luZGV4IC0gZnJvbUluZGV4O1xuXG4gICAgaWYgKGRlbHRhKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSB0cnVlO1xuICAgICAgZ28oZGVsdGEpO1xuICAgIH1cbiAgfSAvLyBFbnN1cmUgdGhlIGhhc2ggaXMgZW5jb2RlZCBwcm9wZXJseSBiZWZvcmUgZG9pbmcgYW55dGhpbmcgZWxzZS5cblxuXG4gIHZhciBwYXRoID0gZ2V0SGFzaFBhdGgoKTtcbiAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChwYXRoKTtcbiAgaWYgKHBhdGggIT09IGVuY29kZWRQYXRoKSByZXBsYWNlSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICB2YXIgaW5pdGlhbExvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oKTtcbiAgdmFyIGFsbFBhdGhzID0gW2NyZWF0ZVBhdGgoaW5pdGlhbExvY2F0aW9uKV07IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgdmFyIGJhc2VUYWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdiYXNlJyk7XG4gICAgdmFyIGhyZWYgPSAnJztcblxuICAgIGlmIChiYXNlVGFnICYmIGJhc2VUYWcuZ2V0QXR0cmlidXRlKCdocmVmJykpIHtcbiAgICAgIGhyZWYgPSBzdHJpcEhhc2god2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIH1cblxuICAgIHJldHVybiBocmVmICsgJyMnICsgZW5jb2RlUGF0aChiYXNlbmFtZSArIGNyZWF0ZVBhdGgobG9jYXRpb24pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdIYXNoIGhpc3RvcnkgY2Fubm90IHB1c2ggc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIHBhdGggPSBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgoYmFzZW5hbWUgKyBwYXRoKTtcbiAgICAgIHZhciBoYXNoQ2hhbmdlZCA9IGdldEhhc2hQYXRoKCkgIT09IGVuY29kZWRQYXRoO1xuXG4gICAgICBpZiAoaGFzaENoYW5nZWQpIHtcbiAgICAgICAgLy8gV2UgY2Fubm90IHRlbGwgaWYgYSBoYXNoY2hhbmdlIHdhcyBjYXVzZWQgYnkgYSBQVVNILCBzbyB3ZSdkXG4gICAgICAgIC8vIHJhdGhlciBzZXRTdGF0ZSBoZXJlIGFuZCBpZ25vcmUgdGhlIGhhc2hjaGFuZ2UuIFRoZSBjYXZlYXQgaGVyZVxuICAgICAgICAvLyBpcyB0aGF0IG90aGVyIGhhc2ggaGlzdG9yaWVzIGluIHRoZSBwYWdlIHdpbGwgY29uc2lkZXIgaXQgYSBQT1AuXG4gICAgICAgIGlnbm9yZVBhdGggPSBwYXRoO1xuICAgICAgICBwdXNoSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoY3JlYXRlUGF0aChoaXN0b3J5LmxvY2F0aW9uKSk7XG4gICAgICAgIHZhciBuZXh0UGF0aHMgPSBhbGxQYXRocy5zbGljZSgwLCBwcmV2SW5kZXggKyAxKTtcbiAgICAgICAgbmV4dFBhdGhzLnB1c2gocGF0aCk7XG4gICAgICAgIGFsbFBhdGhzID0gbmV4dFBhdGhzO1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhmYWxzZSwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgUFVTSCB0aGUgc2FtZSBwYXRoOyBhIG5ldyBlbnRyeSB3aWxsIG5vdCBiZSBhZGRlZCB0byB0aGUgaGlzdG9yeSBzdGFjaycpIDogdm9pZCAwO1xuICAgICAgICBzZXRTdGF0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgcmVwbGFjZSBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUkVQTEFDRSc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgcGF0aCA9IGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICAgICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChiYXNlbmFtZSArIHBhdGgpO1xuICAgICAgdmFyIGhhc2hDaGFuZ2VkID0gZ2V0SGFzaFBhdGgoKSAhPT0gZW5jb2RlZFBhdGg7XG5cbiAgICAgIGlmIChoYXNoQ2hhbmdlZCkge1xuICAgICAgICAvLyBXZSBjYW5ub3QgdGVsbCBpZiBhIGhhc2hjaGFuZ2Ugd2FzIGNhdXNlZCBieSBhIFJFUExBQ0UsIHNvIHdlJ2RcbiAgICAgICAgLy8gcmF0aGVyIHNldFN0YXRlIGhlcmUgYW5kIGlnbm9yZSB0aGUgaGFzaGNoYW5nZS4gVGhlIGNhdmVhdCBoZXJlXG4gICAgICAgIC8vIGlzIHRoYXQgb3RoZXIgaGFzaCBoaXN0b3JpZXMgaW4gdGhlIHBhZ2Ugd2lsbCBjb25zaWRlciBpdCBhIFBPUC5cbiAgICAgICAgaWdub3JlUGF0aCA9IHBhdGg7XG4gICAgICAgIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxQYXRocy5pbmRleE9mKGNyZWF0ZVBhdGgoaGlzdG9yeS5sb2NhdGlvbikpO1xuICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIGFsbFBhdGhzW3ByZXZJbmRleF0gPSBwYXRoO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGNhbkdvV2l0aG91dFJlbG9hZCwgJ0hhc2ggaGlzdG9yeSBnbyhuKSBjYXVzZXMgYSBmdWxsIHBhZ2UgcmVsb2FkIGluIHRoaXMgYnJvd3NlcicpIDogdm9pZCAwO1xuICAgIGdsb2JhbEhpc3RvcnkuZ28obik7XG4gIH1cblxuICBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgZ28oLTEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29Gb3J3YXJkKCkge1xuICAgIGdvKDEpO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyQ291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIGNoZWNrRE9NTGlzdGVuZXJzKGRlbHRhKSB7XG4gICAgbGlzdGVuZXJDb3VudCArPSBkZWx0YTtcblxuICAgIGlmIChsaXN0ZW5lckNvdW50ID09PSAxICYmIGRlbHRhID09PSAxKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQkMSwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfSBlbHNlIGlmIChsaXN0ZW5lckNvdW50ID09PSAwKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQkMSwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGlzQmxvY2tlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGJsb2NrKHByb21wdCkge1xuICAgIGlmIChwcm9tcHQgPT09IHZvaWQgMCkge1xuICAgICAgcHJvbXB0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHVuYmxvY2sgPSB0cmFuc2l0aW9uTWFuYWdlci5zZXRQcm9tcHQocHJvbXB0KTtcblxuICAgIGlmICghaXNCbG9ja2VkKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICAgIGlzQmxvY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0Jsb2NrZWQpIHtcbiAgICAgICAgaXNCbG9ja2VkID0gZmFsc2U7XG4gICAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuYmxvY2soKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgdmFyIHVubGlzdGVuID0gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB1bmxpc3RlbigpO1xuICAgIH07XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IHtcbiAgICBsZW5ndGg6IGdsb2JhbEhpc3RvcnkubGVuZ3RoLFxuICAgIGFjdGlvbjogJ1BPUCcsXG4gICAgbG9jYXRpb246IGluaXRpYWxMb2NhdGlvbixcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgYmxvY2s6IGJsb2NrLFxuICAgIGxpc3RlbjogbGlzdGVuXG4gIH07XG4gIHJldHVybiBoaXN0b3J5O1xufVxuXG5mdW5jdGlvbiBjbGFtcChuLCBsb3dlckJvdW5kLCB1cHBlckJvdW5kKSB7XG4gIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChuLCBsb3dlckJvdW5kKSwgdXBwZXJCb3VuZCk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBoaXN0b3J5IG9iamVjdCB0aGF0IHN0b3JlcyBsb2NhdGlvbnMgaW4gbWVtb3J5LlxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlTWVtb3J5SGlzdG9yeShwcm9wcykge1xuICBpZiAocHJvcHMgPT09IHZvaWQgMCkge1xuICAgIHByb3BzID0ge307XG4gIH1cblxuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBnZXRVc2VyQ29uZmlybWF0aW9uID0gX3Byb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBfcHJvcHMkaW5pdGlhbEVudHJpZXMgPSBfcHJvcHMuaW5pdGlhbEVudHJpZXMsXG4gICAgICBpbml0aWFsRW50cmllcyA9IF9wcm9wcyRpbml0aWFsRW50cmllcyA9PT0gdm9pZCAwID8gWycvJ10gOiBfcHJvcHMkaW5pdGlhbEVudHJpZXMsXG4gICAgICBfcHJvcHMkaW5pdGlhbEluZGV4ID0gX3Byb3BzLmluaXRpYWxJbmRleCxcbiAgICAgIGluaXRpYWxJbmRleCA9IF9wcm9wcyRpbml0aWFsSW5kZXggPT09IHZvaWQgMCA/IDAgOiBfcHJvcHMkaW5pdGlhbEluZGV4LFxuICAgICAgX3Byb3BzJGtleUxlbmd0aCA9IF9wcm9wcy5rZXlMZW5ndGgsXG4gICAgICBrZXlMZW5ndGggPSBfcHJvcHMka2V5TGVuZ3RoID09PSB2b2lkIDAgPyA2IDogX3Byb3BzJGtleUxlbmd0aDtcbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBoaXN0b3J5LmVudHJpZXMubGVuZ3RoO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCBrZXlMZW5ndGgpO1xuICB9XG5cbiAgdmFyIGluZGV4ID0gY2xhbXAoaW5pdGlhbEluZGV4LCAwLCBpbml0aWFsRW50cmllcy5sZW5ndGggLSAxKTtcbiAgdmFyIGVudHJpZXMgPSBpbml0aWFsRW50cmllcy5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlbnRyeSA9PT0gJ3N0cmluZycgPyBjcmVhdGVMb2NhdGlvbihlbnRyeSwgdW5kZWZpbmVkLCBjcmVhdGVLZXkoKSkgOiBjcmVhdGVMb2NhdGlvbihlbnRyeSwgdW5kZWZpbmVkLCBlbnRyeS5rZXkgfHwgY3JlYXRlS2V5KCkpO1xuICB9KTsgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIHZhciBjcmVhdGVIcmVmID0gY3JlYXRlUGF0aDtcblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byBwdXNoIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIHByZXZJbmRleCA9IGhpc3RvcnkuaW5kZXg7XG4gICAgICB2YXIgbmV4dEluZGV4ID0gcHJldkluZGV4ICsgMTtcbiAgICAgIHZhciBuZXh0RW50cmllcyA9IGhpc3RvcnkuZW50cmllcy5zbGljZSgwKTtcblxuICAgICAgaWYgKG5leHRFbnRyaWVzLmxlbmd0aCA+IG5leHRJbmRleCkge1xuICAgICAgICBuZXh0RW50cmllcy5zcGxpY2UobmV4dEluZGV4LCBuZXh0RW50cmllcy5sZW5ndGggLSBuZXh0SW5kZXgsIGxvY2F0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRFbnRyaWVzLnB1c2gobG9jYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICAgIGluZGV4OiBuZXh0SW5kZXgsXG4gICAgICAgIGVudHJpZXM6IG5leHRFbnRyaWVzXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHJlcGxhY2Ugd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICBoaXN0b3J5LmVudHJpZXNbaGlzdG9yeS5pbmRleF0gPSBsb2NhdGlvbjtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgdmFyIG5leHRJbmRleCA9IGNsYW1wKGhpc3RvcnkuaW5kZXggKyBuLCAwLCBoaXN0b3J5LmVudHJpZXMubGVuZ3RoIC0gMSk7XG4gICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuICAgIHZhciBsb2NhdGlvbiA9IGhpc3RvcnkuZW50cmllc1tuZXh0SW5kZXhdO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAob2spIHtcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgICBpbmRleDogbmV4dEluZGV4XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTWltaWMgdGhlIGJlaGF2aW9yIG9mIERPTSBoaXN0b3JpZXMgYnlcbiAgICAgICAgLy8gY2F1c2luZyBhIHJlbmRlciBhZnRlciBhIGNhbmNlbGxlZCBQT1AuXG4gICAgICAgIHNldFN0YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgZ28oLTEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29Gb3J3YXJkKCkge1xuICAgIGdvKDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuR28obikge1xuICAgIHZhciBuZXh0SW5kZXggPSBoaXN0b3J5LmluZGV4ICsgbjtcbiAgICByZXR1cm4gbmV4dEluZGV4ID49IDAgJiYgbmV4dEluZGV4IDwgaGlzdG9yeS5lbnRyaWVzLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJsb2NrKHByb21wdCkge1xuICAgIGlmIChwcm9tcHQgPT09IHZvaWQgMCkge1xuICAgICAgcHJvbXB0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgcmV0dXJuIHRyYW5zaXRpb25NYW5hZ2VyLmFwcGVuZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZW50cmllcy5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogZW50cmllc1tpbmRleF0sXG4gICAgaW5kZXg6IGluZGV4LFxuICAgIGVudHJpZXM6IGVudHJpZXMsXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICBwdXNoOiBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgZ286IGdvLFxuICAgIGdvQmFjazogZ29CYWNrLFxuICAgIGdvRm9yd2FyZDogZ29Gb3J3YXJkLFxuICAgIGNhbkdvOiBjYW5HbyxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZUJyb3dzZXJIaXN0b3J5LCBjcmVhdGVIYXNoSGlzdG9yeSwgY3JlYXRlTWVtb3J5SGlzdG9yeSwgY3JlYXRlTG9jYXRpb24sIGxvY2F0aW9uc0FyZUVxdWFsLCBwYXJzZVBhdGgsIGNyZWF0ZVBhdGggfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2VzbS9oaXN0b3J5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpKl0vZywgZnVuY3Rpb24gKGMpIHtcblx0XHRyZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHR9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciB0b2tlbiA9ICclW2EtZjAtOV17Mn0nO1xudmFyIHNpbmdsZU1hdGNoZXIgPSBuZXcgUmVnRXhwKHRva2VuLCAnZ2knKTtcbnZhciBtdWx0aU1hdGNoZXIgPSBuZXcgUmVnRXhwKCcoJyArIHRva2VuICsgJykrJywgJ2dpJyk7XG5cbmZ1bmN0aW9uIGRlY29kZUNvbXBvbmVudHMoY29tcG9uZW50cywgc3BsaXQpIHtcblx0dHJ5IHtcblx0XHQvLyBUcnkgdG8gZGVjb2RlIHRoZSBlbnRpcmUgc3RyaW5nIGZpcnN0XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChjb21wb25lbnRzLmpvaW4oJycpKTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gRG8gbm90aGluZ1xuXHR9XG5cblx0aWYgKGNvbXBvbmVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudHM7XG5cdH1cblxuXHRzcGxpdCA9IHNwbGl0IHx8IDE7XG5cblx0Ly8gU3BsaXQgdGhlIGFycmF5IGluIDIgcGFydHNcblx0dmFyIGxlZnQgPSBjb21wb25lbnRzLnNsaWNlKDAsIHNwbGl0KTtcblx0dmFyIHJpZ2h0ID0gY29tcG9uZW50cy5zbGljZShzcGxpdCk7XG5cblx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuY2FsbChbXSwgZGVjb2RlQ29tcG9uZW50cyhsZWZ0KSwgZGVjb2RlQ29tcG9uZW50cyhyaWdodCkpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0KTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0dmFyIHRva2VucyA9IGlucHV0Lm1hdGNoKHNpbmdsZU1hdGNoZXIpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlucHV0ID0gZGVjb2RlQ29tcG9uZW50cyh0b2tlbnMsIGkpLmpvaW4oJycpO1xuXG5cdFx0XHR0b2tlbnMgPSBpbnB1dC5tYXRjaChzaW5nbGVNYXRjaGVyKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3VzdG9tRGVjb2RlVVJJQ29tcG9uZW50KGlucHV0KSB7XG5cdC8vIEtlZXAgdHJhY2sgb2YgYWxsIHRoZSByZXBsYWNlbWVudHMgYW5kIHByZWZpbGwgdGhlIG1hcCB3aXRoIHRoZSBgQk9NYFxuXHR2YXIgcmVwbGFjZU1hcCA9IHtcblx0XHQnJUZFJUZGJzogJ1xcdUZGRkRcXHVGRkZEJyxcblx0XHQnJUZGJUZFJzogJ1xcdUZGRkRcXHVGRkZEJ1xuXHR9O1xuXG5cdHZhciBtYXRjaCA9IG11bHRpTWF0Y2hlci5leGVjKGlucHV0KTtcblx0d2hpbGUgKG1hdGNoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIERlY29kZSBhcyBiaWcgY2h1bmtzIGFzIHBvc3NpYmxlXG5cdFx0XHRyZXBsYWNlTWFwW21hdGNoWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFswXSk7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVjb2RlKG1hdGNoWzBdKTtcblxuXHRcdFx0aWYgKHJlc3VsdCAhPT0gbWF0Y2hbMF0pIHtcblx0XHRcdFx0cmVwbGFjZU1hcFttYXRjaFswXV0gPSByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bWF0Y2ggPSBtdWx0aU1hdGNoZXIuZXhlYyhpbnB1dCk7XG5cdH1cblxuXHQvLyBBZGQgYCVDMmAgYXQgdGhlIGVuZCBvZiB0aGUgbWFwIHRvIG1ha2Ugc3VyZSBpdCBkb2VzIG5vdCByZXBsYWNlIHRoZSBjb21iaW5hdG9yIGJlZm9yZSBldmVyeXRoaW5nIGVsc2Vcblx0cmVwbGFjZU1hcFsnJUMyJ10gPSAnXFx1RkZGRCc7XG5cblx0dmFyIGVudHJpZXMgPSBPYmplY3Qua2V5cyhyZXBsYWNlTWFwKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHQvLyBSZXBsYWNlIGFsbCBkZWNvZGVkIGNvbXBvbmVudHNcblx0XHR2YXIga2V5ID0gZW50cmllc1tpXTtcblx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UobmV3IFJlZ0V4cChrZXksICdnJyksIHJlcGxhY2VNYXBba2V5XSk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVuY29kZWRVUkkpIHtcblx0aWYgKHR5cGVvZiBlbmNvZGVkVVJJICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGBlbmNvZGVkVVJJYCB0byBiZSBvZiB0eXBlIGBzdHJpbmdgLCBnb3QgYCcgKyB0eXBlb2YgZW5jb2RlZFVSSSArICdgJyk7XG5cdH1cblxuXHR0cnkge1xuXHRcdGVuY29kZWRVUkkgPSBlbmNvZGVkVVJJLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuXG5cdFx0Ly8gVHJ5IHRoZSBidWlsdCBpbiBkZWNvZGVyIGZpcnN0XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkVVJJKTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gRmFsbGJhY2sgdG8gYSBtb3JlIGFkdmFuY2VkIGRlY29kZXJcblx0XHRyZXR1cm4gY3VzdG9tRGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZWRVUkkpO1xuXHR9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2RlY29kZS11cmktY29tcG9uZW50L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KSxcbiAgICBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqIERldGVjdCBpZiBwcm9wZXJ0aWVzIHNoYWRvd2luZyB0aG9zZSBvbiBgT2JqZWN0LnByb3RvdHlwZWAgYXJlIG5vbi1lbnVtZXJhYmxlLiAqL1xudmFyIG5vbkVudW1TaGFkb3dzID0gIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAndmFsdWVPZic6IDEgfSwgJ3ZhbHVlT2YnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBc3NpZ25zIGB2YWx1ZWAgdG8gYGtleWAgb2YgYG9iamVjdGAgaWYgdGhlIGV4aXN0aW5nIHZhbHVlIGlzIG5vdCBlcXVpdmFsZW50XG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgaWYgKCEoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYgZXEob2JqVmFsdWUsIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IGFycmF5O1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVtrZXldIDogbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBBc3NpZ25zIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIHRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gKiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAgYW5kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgT2JqZWN0LmFzc2lnbmBdKGh0dHBzOi8vbWRuLmlvL09iamVjdC9hc3NpZ24pLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAc2VlIF8uYXNzaWduSW5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIGZ1bmN0aW9uIEJhcigpIHtcbiAqICAgdGhpcy5jID0gMztcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmIgPSAyO1xuICogQmFyLnByb3RvdHlwZS5kID0gNDtcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMCB9LCBuZXcgRm9vLCBuZXcgQmFyKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYyc6IDMgfVxuICovXG52YXIgYXNzaWduID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgaWYgKG5vbkVudW1TaGFkb3dzIHx8IGlzUHJvdG90eXBlKHNvdXJjZSkgfHwgaXNBcnJheUxpa2Uoc291cmNlKSkge1xuICAgIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzKHNvdXJjZSksIG9iamVjdCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfVxuICB9XG59KTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5pbXBvcnQgdHlwZSB7IEhpc3RvcnksIEJyb3dzZXJIaXN0b3J5T3B0aW9ucyB9IGZyb20gJ2hpc3RvcnknO1xuXG5pbXBvcnQgY3JlYXRlQnJvd3Nlckhpc3RvcnkgZnJvbSAnaGlzdG9yeS9jcmVhdGVCcm93c2VySGlzdG9yeSc7XG5cbmltcG9ydCBub3JtYWxpemVIcmVmIGZyb20gJy4uL3V0aWwvbm9ybWFsaXplLWhyZWYnO1xuaW1wb3J0IGluc3RhbGwgZnJvbSAnLi4vaW5zdGFsbCc7XG5cbnR5cGUgQnJvd3NlclJvdXRlckFyZ3MgPSB7XG4gIHJvdXRlczogT2JqZWN0LFxuICBiYXNlbmFtZT86IHN0cmluZyxcbiAgaGlzdG9yeU9wdGlvbnM/OiBCcm93c2VySGlzdG9yeU9wdGlvbnMsXG4gIGhpc3Rvcnk/OiBIaXN0b3J5XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQnJvd3NlclJvdXRlciA9IChpbnN0YWxsZXI6IEZ1bmN0aW9uKSA9PiAoe1xuICByb3V0ZXMsXG4gIGJhc2VuYW1lLFxuICBoaXN0b3J5T3B0aW9ucyA9IHt9LFxuICBoaXN0b3J5ID0gY3JlYXRlQnJvd3Nlckhpc3RvcnkoeyBiYXNlbmFtZSwgLi4uaGlzdG9yeU9wdGlvbnMgfSlcbn06IEJyb3dzZXJSb3V0ZXJBcmdzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBwYXRobmFtZTogZnVsbFBhdGhuYW1lLFxuICAgIHNlYXJjaCxcbiAgICBoYXNoLFxuICAgIHN0YXRlOiB7IGtleSwgc3RhdGUgfSA9IHt9XG4gIH0gPSBoaXN0b3J5LmxvY2F0aW9uO1xuXG4gIC8vIFN0cmlwIHRoZSBiYXNlbmFtZSBmcm9tIHRoZSBpbml0aWFsIHBhdGhuYW1lXG4gIGNvbnN0IHBhdGhuYW1lID1cbiAgICBiYXNlbmFtZSAmJiBmdWxsUGF0aG5hbWUuaW5kZXhPZihiYXNlbmFtZSkgPT09IDBcbiAgICAgID8gZnVsbFBhdGhuYW1lLnNsaWNlKGJhc2VuYW1lLmxlbmd0aClcbiAgICAgIDogZnVsbFBhdGhuYW1lO1xuXG4gIGNvbnN0IGRlc2NyaXB0b3IgPSBiYXNlbmFtZVxuICAgID8geyBwYXRobmFtZSwgYmFzZW5hbWUsIHNlYXJjaCwgaGFzaCwga2V5LCBzdGF0ZSB9XG4gICAgOiB7IHBhdGhuYW1lLCBzZWFyY2gsIGhhc2gsIGtleSwgc3RhdGUgfTtcblxuICBjb25zdCBsb2NhdGlvbiA9IG5vcm1hbGl6ZUhyZWYoZGVzY3JpcHRvcik7XG5cbiAgcmV0dXJuIGluc3RhbGxlcih7IHJvdXRlcywgaGlzdG9yeSwgbG9jYXRpb24gfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCcm93c2VyUm91dGVyKGluc3RhbGwpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZW52aXJvbm1lbnQvYnJvd3Nlci1yb3V0ZXIuanMiLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuL3dhcm5BYm91dERlcHJlY2F0ZWRDSlNSZXF1aXJlLmpzJykoJ2NyZWF0ZUJyb3dzZXJIaXN0b3J5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaW5kZXguanMnKS5jcmVhdGVCcm93c2VySGlzdG9yeTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2NyZWF0ZUJyb3dzZXJIaXN0b3J5LmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcERlZmF1bHQodCl7cmV0dXJuIHQmJlwib2JqZWN0XCI9PXR5cGVvZiB0JiZcImRlZmF1bHRcImluIHQ/dC5kZWZhdWx0OnR9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHJlc29sdmVQYXRobmFtZT1faW50ZXJvcERlZmF1bHQocmVxdWlyZShcInJlc29sdmUtcGF0aG5hbWVcIikpLHZhbHVlRXF1YWw9X2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoXCJ2YWx1ZS1lcXVhbFwiKSk7cmVxdWlyZShcInRpbnktd2FybmluZ1wiKTt2YXIgaW52YXJpYW50PV9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKFwidGlueS1pbnZhcmlhbnRcIikpO2Z1bmN0aW9uIF9leHRlbmRzKCl7cmV0dXJuKF9leHRlbmRzPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKHQpe2Zvcih2YXIgbj0xO248YXJndW1lbnRzLmxlbmd0aDtuKyspe3ZhciBlPWFyZ3VtZW50c1tuXTtmb3IodmFyIGEgaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxhKSYmKHRbYV09ZVthXSl9cmV0dXJuIHR9KS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHQpe3JldHVyblwiL1wiPT09dC5jaGFyQXQoMCk/dDpcIi9cIit0fWZ1bmN0aW9uIHN0cmlwTGVhZGluZ1NsYXNoKHQpe3JldHVyblwiL1wiPT09dC5jaGFyQXQoMCk/dC5zdWJzdHIoMSk6dH1mdW5jdGlvbiBoYXNCYXNlbmFtZSh0LG4pe3JldHVybiAwPT09dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yobi50b0xvd2VyQ2FzZSgpKSYmLTEhPT1cIi8/I1wiLmluZGV4T2YodC5jaGFyQXQobi5sZW5ndGgpKX1mdW5jdGlvbiBzdHJpcEJhc2VuYW1lKHQsbil7cmV0dXJuIGhhc0Jhc2VuYW1lKHQsbik/dC5zdWJzdHIobi5sZW5ndGgpOnR9ZnVuY3Rpb24gc3RyaXBUcmFpbGluZ1NsYXNoKHQpe3JldHVyblwiL1wiPT09dC5jaGFyQXQodC5sZW5ndGgtMSk/dC5zbGljZSgwLC0xKTp0fWZ1bmN0aW9uIHBhcnNlUGF0aCh0KXt2YXIgbj10fHxcIi9cIixlPVwiXCIsYT1cIlwiLHI9bi5pbmRleE9mKFwiI1wiKTstMSE9PXImJihhPW4uc3Vic3RyKHIpLG49bi5zdWJzdHIoMCxyKSk7dmFyIG89bi5pbmRleE9mKFwiP1wiKTtyZXR1cm4tMSE9PW8mJihlPW4uc3Vic3RyKG8pLG49bi5zdWJzdHIoMCxvKSkse3BhdGhuYW1lOm4sc2VhcmNoOlwiP1wiPT09ZT9cIlwiOmUsaGFzaDpcIiNcIj09PWE/XCJcIjphfX1mdW5jdGlvbiBjcmVhdGVQYXRoKHQpe3ZhciBuPXQucGF0aG5hbWUsZT10LnNlYXJjaCxhPXQuaGFzaCxyPW58fFwiL1wiO3JldHVybiBlJiZcIj9cIiE9PWUmJihyKz1cIj9cIj09PWUuY2hhckF0KDApP2U6XCI/XCIrZSksYSYmXCIjXCIhPT1hJiYocis9XCIjXCI9PT1hLmNoYXJBdCgwKT9hOlwiI1wiK2EpLHJ9ZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24odCxuLGUsYSl7dmFyIHI7XCJzdHJpbmdcIj09dHlwZW9mIHQ/KHI9cGFyc2VQYXRoKHQpKS5zdGF0ZT1uOih2b2lkIDA9PT0ocj1fZXh0ZW5kcyh7fSx0KSkucGF0aG5hbWUmJihyLnBhdGhuYW1lPVwiXCIpLHIuc2VhcmNoP1wiP1wiIT09ci5zZWFyY2guY2hhckF0KDApJiYoci5zZWFyY2g9XCI/XCIrci5zZWFyY2gpOnIuc2VhcmNoPVwiXCIsci5oYXNoP1wiI1wiIT09ci5oYXNoLmNoYXJBdCgwKSYmKHIuaGFzaD1cIiNcIityLmhhc2gpOnIuaGFzaD1cIlwiLHZvaWQgMCE9PW4mJnZvaWQgMD09PXIuc3RhdGUmJihyLnN0YXRlPW4pKTt0cnl7ci5wYXRobmFtZT1kZWNvZGVVUkkoci5wYXRobmFtZSl9Y2F0Y2godCl7dGhyb3cgdCBpbnN0YW5jZW9mIFVSSUVycm9yP25ldyBVUklFcnJvcignUGF0aG5hbWUgXCInK3IucGF0aG5hbWUrJ1wiIGNvdWxkIG5vdCBiZSBkZWNvZGVkLiBUaGlzIGlzIGxpa2VseSBjYXVzZWQgYnkgYW4gaW52YWxpZCBwZXJjZW50LWVuY29kaW5nLicpOnR9cmV0dXJuIGUmJihyLmtleT1lKSxhP3IucGF0aG5hbWU/XCIvXCIhPT1yLnBhdGhuYW1lLmNoYXJBdCgwKSYmKHIucGF0aG5hbWU9cmVzb2x2ZVBhdGhuYW1lKHIucGF0aG5hbWUsYS5wYXRobmFtZSkpOnIucGF0aG5hbWU9YS5wYXRobmFtZTpyLnBhdGhuYW1lfHwoci5wYXRobmFtZT1cIi9cIikscn1mdW5jdGlvbiBsb2NhdGlvbnNBcmVFcXVhbCh0LG4pe3JldHVybiB0LnBhdGhuYW1lPT09bi5wYXRobmFtZSYmdC5zZWFyY2g9PT1uLnNlYXJjaCYmdC5oYXNoPT09bi5oYXNoJiZ0LmtleT09PW4ua2V5JiZ2YWx1ZUVxdWFsKHQuc3RhdGUsbi5zdGF0ZSl9ZnVuY3Rpb24gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKXt2YXIgbz1udWxsO3ZhciBhPVtdO3JldHVybntzZXRQcm9tcHQ6ZnVuY3Rpb24odCl7cmV0dXJuIG89dCxmdW5jdGlvbigpe289PT10JiYobz1udWxsKX19LGNvbmZpcm1UcmFuc2l0aW9uVG86ZnVuY3Rpb24odCxuLGUsYSl7aWYobnVsbCE9byl7dmFyIHI9XCJmdW5jdGlvblwiPT10eXBlb2Ygbz9vKHQsbik6bztcInN0cmluZ1wiPT10eXBlb2Ygcj9cImZ1bmN0aW9uXCI9PXR5cGVvZiBlP2UocixhKTphKCEwKTphKCExIT09cil9ZWxzZSBhKCEwKX0sYXBwZW5kTGlzdGVuZXI6ZnVuY3Rpb24odCl7dmFyIG49ITA7ZnVuY3Rpb24gZSgpe24mJnQuYXBwbHkodm9pZCAwLGFyZ3VtZW50cyl9cmV0dXJuIGEucHVzaChlKSxmdW5jdGlvbigpe249ITEsYT1hLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4gdCE9PWV9KX19LG5vdGlmeUxpc3RlbmVyczpmdW5jdGlvbigpe2Zvcih2YXIgdD1hcmd1bWVudHMubGVuZ3RoLG49bmV3IEFycmF5KHQpLGU9MDtlPHQ7ZSsrKW5bZV09YXJndW1lbnRzW2VdO2EuZm9yRWFjaChmdW5jdGlvbih0KXtyZXR1cm4gdC5hcHBseSh2b2lkIDAsbil9KX19fXZhciBjYW5Vc2VET009IShcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93fHwhd2luZG93LmRvY3VtZW50fHwhd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO2Z1bmN0aW9uIGdldENvbmZpcm1hdGlvbih0LG4pe24od2luZG93LmNvbmZpcm0odCkpfWZ1bmN0aW9uIHN1cHBvcnRzSGlzdG9yeSgpe3ZhciB0PXdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O3JldHVybigtMT09PXQuaW5kZXhPZihcIkFuZHJvaWQgMi5cIikmJi0xPT09dC5pbmRleE9mKFwiQW5kcm9pZCA0LjBcIil8fC0xPT09dC5pbmRleE9mKFwiTW9iaWxlIFNhZmFyaVwiKXx8LTEhPT10LmluZGV4T2YoXCJDaHJvbWVcIil8fC0xIT09dC5pbmRleE9mKFwiV2luZG93cyBQaG9uZVwiKSkmJih3aW5kb3cuaGlzdG9yeSYmXCJwdXNoU3RhdGVcImluIHdpbmRvdy5oaXN0b3J5KX1mdW5jdGlvbiBzdXBwb3J0c1BvcFN0YXRlT25IYXNoQ2hhbmdlKCl7cmV0dXJuLTE9PT13aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiVHJpZGVudFwiKX1mdW5jdGlvbiBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpe3JldHVybi0xPT09d2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIil9ZnVuY3Rpb24gaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudCh0KXtyZXR1cm4gdm9pZCAwPT09dC5zdGF0ZSYmLTE9PT1uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDcmlPU1wiKX12YXIgUG9wU3RhdGVFdmVudD1cInBvcHN0YXRlXCIsSGFzaENoYW5nZUV2ZW50PVwiaGFzaGNoYW5nZVwiO2Z1bmN0aW9uIGdldEhpc3RvcnlTdGF0ZSgpe3RyeXtyZXR1cm4gd2luZG93Lmhpc3Rvcnkuc3RhdGV8fHt9fWNhdGNoKHQpe3JldHVybnt9fX1mdW5jdGlvbiBjcmVhdGVCcm93c2VySGlzdG9yeSh0KXt2b2lkIDA9PT10JiYodD17fSksY2FuVXNlRE9NfHxpbnZhcmlhbnQoITEpO3ZhciBzPXdpbmRvdy5oaXN0b3J5LGM9c3VwcG9ydHNIaXN0b3J5KCksbj0hc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpLGU9dCxhPWUuZm9yY2VSZWZyZXNoLGg9dm9pZCAwIT09YSYmYSxyPWUuZ2V0VXNlckNvbmZpcm1hdGlvbix1PXZvaWQgMD09PXI/Z2V0Q29uZmlybWF0aW9uOnIsbz1lLmtleUxlbmd0aCxpPXZvaWQgMD09PW8/NjpvLGY9dC5iYXNlbmFtZT9zdHJpcFRyYWlsaW5nU2xhc2goYWRkTGVhZGluZ1NsYXNoKHQuYmFzZW5hbWUpKTpcIlwiO2Z1bmN0aW9uIGwodCl7dmFyIG49dHx8e30sZT1uLmtleSxhPW4uc3RhdGUscj13aW5kb3cubG9jYXRpb24sbz1yLnBhdGhuYW1lK3Iuc2VhcmNoK3IuaGFzaDtyZXR1cm4gZiYmKG89c3RyaXBCYXNlbmFtZShvLGYpKSxjcmVhdGVMb2NhdGlvbihvLGEsZSl9ZnVuY3Rpb24gZCgpe3JldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMixpKX12YXIgdj1jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO2Z1bmN0aW9uIHAodCl7X2V4dGVuZHMoVCx0KSxULmxlbmd0aD1zLmxlbmd0aCx2Lm5vdGlmeUxpc3RlbmVycyhULmxvY2F0aW9uLFQuYWN0aW9uKX1mdW5jdGlvbiBnKHQpe2lzRXh0cmFuZW91c1BvcHN0YXRlRXZlbnQodCl8fHcobCh0LnN0YXRlKSl9ZnVuY3Rpb24gUCgpe3cobChnZXRIaXN0b3J5U3RhdGUoKSkpfXZhciBtPSExO2Z1bmN0aW9uIHcobil7aWYobSltPSExLHAoKTtlbHNle3YuY29uZmlybVRyYW5zaXRpb25UbyhuLFwiUE9QXCIsdSxmdW5jdGlvbih0KXt0P3Aoe2FjdGlvbjpcIlBPUFwiLGxvY2F0aW9uOm59KTpmdW5jdGlvbih0KXt2YXIgbj1ULmxvY2F0aW9uLGU9SC5pbmRleE9mKG4ua2V5KTstMT09PWUmJihlPTApO3ZhciBhPUguaW5kZXhPZih0LmtleSk7LTE9PT1hJiYoYT0wKTt2YXIgcj1lLWE7ciYmKG09ITAsTChyKSl9KG4pfSl9fXZhciB5PWwoZ2V0SGlzdG9yeVN0YXRlKCkpLEg9W3kua2V5XTtmdW5jdGlvbiB4KHQpe3JldHVybiBmK2NyZWF0ZVBhdGgodCl9ZnVuY3Rpb24gTCh0KXtzLmdvKHQpfXZhciBPPTA7ZnVuY3Rpb24gRSh0KXsxPT09KE8rPXQpJiYxPT09dD8od2luZG93LmFkZEV2ZW50TGlzdGVuZXIoUG9wU3RhdGVFdmVudCxnKSxuJiZ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQsUCkpOjA9PT1PJiYod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoUG9wU3RhdGVFdmVudCxnKSxuJiZ3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQsUCkpfXZhciBTPSExO3ZhciBUPXtsZW5ndGg6cy5sZW5ndGgsYWN0aW9uOlwiUE9QXCIsbG9jYXRpb246eSxjcmVhdGVIcmVmOngscHVzaDpmdW5jdGlvbih0LG4pe3ZhciBpPWNyZWF0ZUxvY2F0aW9uKHQsbixkKCksVC5sb2NhdGlvbik7di5jb25maXJtVHJhbnNpdGlvblRvKGksXCJQVVNIXCIsdSxmdW5jdGlvbih0KXtpZih0KXt2YXIgbj14KGkpLGU9aS5rZXksYT1pLnN0YXRlO2lmKGMpaWYocy5wdXNoU3RhdGUoe2tleTplLHN0YXRlOmF9LG51bGwsbiksaCl3aW5kb3cubG9jYXRpb24uaHJlZj1uO2Vsc2V7dmFyIHI9SC5pbmRleE9mKFQubG9jYXRpb24ua2V5KSxvPUguc2xpY2UoMCxyKzEpO28ucHVzaChpLmtleSksSD1vLHAoe2FjdGlvbjpcIlBVU0hcIixsb2NhdGlvbjppfSl9ZWxzZSB3aW5kb3cubG9jYXRpb24uaHJlZj1ufX0pfSxyZXBsYWNlOmZ1bmN0aW9uKHQsbil7dmFyIG89XCJSRVBMQUNFXCIsaT1jcmVhdGVMb2NhdGlvbih0LG4sZCgpLFQubG9jYXRpb24pO3YuY29uZmlybVRyYW5zaXRpb25UbyhpLG8sdSxmdW5jdGlvbih0KXtpZih0KXt2YXIgbj14KGkpLGU9aS5rZXksYT1pLnN0YXRlO2lmKGMpaWYocy5yZXBsYWNlU3RhdGUoe2tleTplLHN0YXRlOmF9LG51bGwsbiksaCl3aW5kb3cubG9jYXRpb24ucmVwbGFjZShuKTtlbHNle3ZhciByPUguaW5kZXhPZihULmxvY2F0aW9uLmtleSk7LTEhPT1yJiYoSFtyXT1pLmtleSkscCh7YWN0aW9uOm8sbG9jYXRpb246aX0pfWVsc2Ugd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uobil9fSl9LGdvOkwsZ29CYWNrOmZ1bmN0aW9uKCl7TCgtMSl9LGdvRm9yd2FyZDpmdW5jdGlvbigpe0woMSl9LGJsb2NrOmZ1bmN0aW9uKHQpe3ZvaWQgMD09PXQmJih0PSExKTt2YXIgbj12LnNldFByb21wdCh0KTtyZXR1cm4gU3x8KEUoMSksUz0hMCksZnVuY3Rpb24oKXtyZXR1cm4gUyYmKFM9ITEsRSgtMSkpLG4oKX19LGxpc3RlbjpmdW5jdGlvbih0KXt2YXIgbj12LmFwcGVuZExpc3RlbmVyKHQpO3JldHVybiBFKDEpLGZ1bmN0aW9uKCl7RSgtMSksbigpfX19O3JldHVybiBUfXZhciBIYXNoQ2hhbmdlRXZlbnQkMT1cImhhc2hjaGFuZ2VcIixIYXNoUGF0aENvZGVycz17aGFzaGJhbmc6e2VuY29kZVBhdGg6ZnVuY3Rpb24odCl7cmV0dXJuXCIhXCI9PT10LmNoYXJBdCgwKT90OlwiIS9cIitzdHJpcExlYWRpbmdTbGFzaCh0KX0sZGVjb2RlUGF0aDpmdW5jdGlvbih0KXtyZXR1cm5cIiFcIj09PXQuY2hhckF0KDApP3Quc3Vic3RyKDEpOnR9fSxub3NsYXNoOntlbmNvZGVQYXRoOnN0cmlwTGVhZGluZ1NsYXNoLGRlY29kZVBhdGg6YWRkTGVhZGluZ1NsYXNofSxzbGFzaDp7ZW5jb2RlUGF0aDphZGRMZWFkaW5nU2xhc2gsZGVjb2RlUGF0aDphZGRMZWFkaW5nU2xhc2h9fTtmdW5jdGlvbiBzdHJpcEhhc2godCl7dmFyIG49dC5pbmRleE9mKFwiI1wiKTtyZXR1cm4tMT09PW4/dDp0LnNsaWNlKDAsbil9ZnVuY3Rpb24gZ2V0SGFzaFBhdGgoKXt2YXIgdD13aW5kb3cubG9jYXRpb24uaHJlZixuPXQuaW5kZXhPZihcIiNcIik7cmV0dXJuLTE9PT1uP1wiXCI6dC5zdWJzdHJpbmcobisxKX1mdW5jdGlvbiBwdXNoSGFzaFBhdGgodCl7d2luZG93LmxvY2F0aW9uLmhhc2g9dH1mdW5jdGlvbiByZXBsYWNlSGFzaFBhdGgodCl7d2luZG93LmxvY2F0aW9uLnJlcGxhY2Uoc3RyaXBIYXNoKHdpbmRvdy5sb2NhdGlvbi5ocmVmKStcIiNcIit0KX1mdW5jdGlvbiBjcmVhdGVIYXNoSGlzdG9yeSh0KXt2b2lkIDA9PT10JiYodD17fSksY2FuVXNlRE9NfHxpbnZhcmlhbnQoITEpO3ZhciBuPXdpbmRvdy5oaXN0b3J5LGU9KHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCksdCksYT1lLmdldFVzZXJDb25maXJtYXRpb24saT12b2lkIDA9PT1hP2dldENvbmZpcm1hdGlvbjphLHI9ZS5oYXNoVHlwZSxvPXZvaWQgMD09PXI/XCJzbGFzaFwiOnIscz10LmJhc2VuYW1lP3N0cmlwVHJhaWxpbmdTbGFzaChhZGRMZWFkaW5nU2xhc2godC5iYXNlbmFtZSkpOlwiXCIsYz1IYXNoUGF0aENvZGVyc1tvXSxoPWMuZW5jb2RlUGF0aCx1PWMuZGVjb2RlUGF0aDtmdW5jdGlvbiBmKCl7dmFyIHQ9dShnZXRIYXNoUGF0aCgpKTtyZXR1cm4gcyYmKHQ9c3RyaXBCYXNlbmFtZSh0LHMpKSxjcmVhdGVMb2NhdGlvbih0KX12YXIgbD1jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO2Z1bmN0aW9uIGQodCl7X2V4dGVuZHMoRSx0KSxFLmxlbmd0aD1uLmxlbmd0aCxsLm5vdGlmeUxpc3RlbmVycyhFLmxvY2F0aW9uLEUuYWN0aW9uKX12YXIgdj0hMSxwPW51bGw7ZnVuY3Rpb24gZygpe3ZhciB0PWdldEhhc2hQYXRoKCksbj1oKHQpO2lmKHQhPT1uKXJlcGxhY2VIYXNoUGF0aChuKTtlbHNle3ZhciBlPWYoKSxhPUUubG9jYXRpb247aWYoIXYmJmZ1bmN0aW9uKHQsbil7cmV0dXJuIHQucGF0aG5hbWU9PT1uLnBhdGhuYW1lJiZ0LnNlYXJjaD09PW4uc2VhcmNoJiZ0Lmhhc2g9PT1uLmhhc2h9KGEsZSkpcmV0dXJuO2lmKHA9PT1jcmVhdGVQYXRoKGUpKXJldHVybjtwPW51bGwsZnVuY3Rpb24obil7aWYodil2PSExLGQoKTtlbHNle2wuY29uZmlybVRyYW5zaXRpb25UbyhuLFwiUE9QXCIsaSxmdW5jdGlvbih0KXt0P2Qoe2FjdGlvbjpcIlBPUFwiLGxvY2F0aW9uOm59KTpmdW5jdGlvbih0KXt2YXIgbj1FLmxvY2F0aW9uLGU9eS5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKG4pKTstMT09PWUmJihlPTApO3ZhciBhPXkubGFzdEluZGV4T2YoY3JlYXRlUGF0aCh0KSk7LTE9PT1hJiYoYT0wKTt2YXIgcj1lLWE7ciYmKHY9ITAsSChyKSl9KG4pfSl9fShlKX19dmFyIFA9Z2V0SGFzaFBhdGgoKSxtPWgoUCk7UCE9PW0mJnJlcGxhY2VIYXNoUGF0aChtKTt2YXIgdz1mKCkseT1bY3JlYXRlUGF0aCh3KV07ZnVuY3Rpb24gSCh0KXtuLmdvKHQpfXZhciB4PTA7ZnVuY3Rpb24gTCh0KXsxPT09KHgrPXQpJiYxPT09dD93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQkMSxnKTowPT09eCYmd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50JDEsZyl9dmFyIE89ITE7dmFyIEU9e2xlbmd0aDpuLmxlbmd0aCxhY3Rpb246XCJQT1BcIixsb2NhdGlvbjp3LGNyZWF0ZUhyZWY6ZnVuY3Rpb24odCl7dmFyIG49ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJhc2VcIiksZT1cIlwiO3JldHVybiBuJiZuLmdldEF0dHJpYnV0ZShcImhyZWZcIikmJihlPXN0cmlwSGFzaCh3aW5kb3cubG9jYXRpb24uaHJlZikpLGUrXCIjXCIraChzK2NyZWF0ZVBhdGgodCkpfSxwdXNoOmZ1bmN0aW9uKHQsbil7dmFyIG89Y3JlYXRlTG9jYXRpb24odCx2b2lkIDAsdm9pZCAwLEUubG9jYXRpb24pO2wuY29uZmlybVRyYW5zaXRpb25UbyhvLFwiUFVTSFwiLGksZnVuY3Rpb24odCl7aWYodCl7dmFyIG49Y3JlYXRlUGF0aChvKSxlPWgocytuKTtpZihnZXRIYXNoUGF0aCgpIT09ZSl7cD1uLHB1c2hIYXNoUGF0aChlKTt2YXIgYT15Lmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgoRS5sb2NhdGlvbikpLHI9eS5zbGljZSgwLGErMSk7ci5wdXNoKG4pLHk9cixkKHthY3Rpb246XCJQVVNIXCIsbG9jYXRpb246b30pfWVsc2UgZCgpfX0pfSxyZXBsYWNlOmZ1bmN0aW9uKHQsbil7dmFyIHI9XCJSRVBMQUNFXCIsbz1jcmVhdGVMb2NhdGlvbih0LHZvaWQgMCx2b2lkIDAsRS5sb2NhdGlvbik7bC5jb25maXJtVHJhbnNpdGlvblRvKG8scixpLGZ1bmN0aW9uKHQpe2lmKHQpe3ZhciBuPWNyZWF0ZVBhdGgobyksZT1oKHMrbik7Z2V0SGFzaFBhdGgoKSE9PWUmJihwPW4scmVwbGFjZUhhc2hQYXRoKGUpKTt2YXIgYT15LmluZGV4T2YoY3JlYXRlUGF0aChFLmxvY2F0aW9uKSk7LTEhPT1hJiYoeVthXT1uKSxkKHthY3Rpb246cixsb2NhdGlvbjpvfSl9fSl9LGdvOkgsZ29CYWNrOmZ1bmN0aW9uKCl7SCgtMSl9LGdvRm9yd2FyZDpmdW5jdGlvbigpe0goMSl9LGJsb2NrOmZ1bmN0aW9uKHQpe3ZvaWQgMD09PXQmJih0PSExKTt2YXIgbj1sLnNldFByb21wdCh0KTtyZXR1cm4gT3x8KEwoMSksTz0hMCksZnVuY3Rpb24oKXtyZXR1cm4gTyYmKE89ITEsTCgtMSkpLG4oKX19LGxpc3RlbjpmdW5jdGlvbih0KXt2YXIgbj1sLmFwcGVuZExpc3RlbmVyKHQpO3JldHVybiBMKDEpLGZ1bmN0aW9uKCl7TCgtMSksbigpfX19O3JldHVybiBFfWZ1bmN0aW9uIGNsYW1wKHQsbixlKXtyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodCxuKSxlKX1mdW5jdGlvbiBjcmVhdGVNZW1vcnlIaXN0b3J5KHQpe3ZvaWQgMD09PXQmJih0PXt9KTt2YXIgbj10LHI9bi5nZXRVc2VyQ29uZmlybWF0aW9uLGU9bi5pbml0aWFsRW50cmllcyxhPXZvaWQgMD09PWU/W1wiL1wiXTplLG89bi5pbml0aWFsSW5kZXgsaT12b2lkIDA9PT1vPzA6byxzPW4ua2V5TGVuZ3RoLGM9dm9pZCAwPT09cz82OnMsaD1jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO2Z1bmN0aW9uIHUodCl7X2V4dGVuZHMoZyx0KSxnLmxlbmd0aD1nLmVudHJpZXMubGVuZ3RoLGgubm90aWZ5TGlzdGVuZXJzKGcubG9jYXRpb24sZy5hY3Rpb24pfWZ1bmN0aW9uIGYoKXtyZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsYyl9dmFyIGw9Y2xhbXAoaSwwLGEubGVuZ3RoLTEpLGQ9YS5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHQsdm9pZCAwLFwic3RyaW5nXCI9PXR5cGVvZiB0P2YoKTp0LmtleXx8ZigpKX0pLHY9Y3JlYXRlUGF0aDtmdW5jdGlvbiBwKHQpe3ZhciBuPWNsYW1wKGcuaW5kZXgrdCwwLGcuZW50cmllcy5sZW5ndGgtMSksZT1nLmVudHJpZXNbbl07aC5jb25maXJtVHJhbnNpdGlvblRvKGUsXCJQT1BcIixyLGZ1bmN0aW9uKHQpe3Q/dSh7YWN0aW9uOlwiUE9QXCIsbG9jYXRpb246ZSxpbmRleDpufSk6dSgpfSl9dmFyIGc9e2xlbmd0aDpkLmxlbmd0aCxhY3Rpb246XCJQT1BcIixsb2NhdGlvbjpkW2xdLGluZGV4OmwsZW50cmllczpkLGNyZWF0ZUhyZWY6dixwdXNoOmZ1bmN0aW9uKHQsbil7dmFyIGE9Y3JlYXRlTG9jYXRpb24odCxuLGYoKSxnLmxvY2F0aW9uKTtoLmNvbmZpcm1UcmFuc2l0aW9uVG8oYSxcIlBVU0hcIixyLGZ1bmN0aW9uKHQpe2lmKHQpe3ZhciBuPWcuaW5kZXgrMSxlPWcuZW50cmllcy5zbGljZSgwKTtlLmxlbmd0aD5uP2Uuc3BsaWNlKG4sZS5sZW5ndGgtbixhKTplLnB1c2goYSksdSh7YWN0aW9uOlwiUFVTSFwiLGxvY2F0aW9uOmEsaW5kZXg6bixlbnRyaWVzOmV9KX19KX0scmVwbGFjZTpmdW5jdGlvbih0LG4pe3ZhciBlPVwiUkVQTEFDRVwiLGE9Y3JlYXRlTG9jYXRpb24odCxuLGYoKSxnLmxvY2F0aW9uKTtoLmNvbmZpcm1UcmFuc2l0aW9uVG8oYSxlLHIsZnVuY3Rpb24odCl7dCYmKGcuZW50cmllc1tnLmluZGV4XT1hLHUoe2FjdGlvbjplLGxvY2F0aW9uOmF9KSl9KX0sZ286cCxnb0JhY2s6ZnVuY3Rpb24oKXtwKC0xKX0sZ29Gb3J3YXJkOmZ1bmN0aW9uKCl7cCgxKX0sY2FuR286ZnVuY3Rpb24odCl7dmFyIG49Zy5pbmRleCt0O3JldHVybiAwPD1uJiZuPGcuZW50cmllcy5sZW5ndGh9LGJsb2NrOmZ1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10JiYodD0hMSksaC5zZXRQcm9tcHQodCl9LGxpc3RlbjpmdW5jdGlvbih0KXtyZXR1cm4gaC5hcHBlbmRMaXN0ZW5lcih0KX19O3JldHVybiBnfWV4cG9ydHMuY3JlYXRlQnJvd3Nlckhpc3Rvcnk9Y3JlYXRlQnJvd3Nlckhpc3RvcnksZXhwb3J0cy5jcmVhdGVIYXNoSGlzdG9yeT1jcmVhdGVIYXNoSGlzdG9yeSxleHBvcnRzLmNyZWF0ZU1lbW9yeUhpc3Rvcnk9Y3JlYXRlTWVtb3J5SGlzdG9yeSxleHBvcnRzLmNyZWF0ZUxvY2F0aW9uPWNyZWF0ZUxvY2F0aW9uLGV4cG9ydHMubG9jYXRpb25zQXJlRXF1YWw9bG9jYXRpb25zQXJlRXF1YWwsZXhwb3J0cy5wYXJzZVBhdGg9cGFyc2VQYXRoLGV4cG9ydHMuY3JlYXRlUGF0aD1jcmVhdGVQYXRoO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2hpc3RvcnkvY2pzL2hpc3RvcnkubWluLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZXgpIHsgcmV0dXJuIChleCAmJiAodHlwZW9mIGV4ID09PSAnb2JqZWN0JykgJiYgJ2RlZmF1bHQnIGluIGV4KSA/IGV4WydkZWZhdWx0J10gOiBleDsgfVxuXG52YXIgcmVzb2x2ZVBhdGhuYW1lID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3Jlc29sdmUtcGF0aG5hbWUnKSk7XG52YXIgdmFsdWVFcXVhbCA9IF9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKCd2YWx1ZS1lcXVhbCcpKTtcbnZhciB3YXJuaW5nID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3Rpbnktd2FybmluZycpKTtcbnZhciBpbnZhcmlhbnQgPSBfaW50ZXJvcERlZmF1bHQocmVxdWlyZSgndGlueS1pbnZhcmlhbnQnKSk7XG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIGFkZExlYWRpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nID8gcGF0aCA6ICcvJyArIHBhdGg7XG59XG5mdW5jdGlvbiBzdHJpcExlYWRpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nID8gcGF0aC5zdWJzdHIoMSkgOiBwYXRoO1xufVxuZnVuY3Rpb24gaGFzQmFzZW5hbWUocGF0aCwgcHJlZml4KSB7XG4gIHJldHVybiBwYXRoLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihwcmVmaXgudG9Mb3dlckNhc2UoKSkgPT09IDAgJiYgJy8/IycuaW5kZXhPZihwYXRoLmNoYXJBdChwcmVmaXgubGVuZ3RoKSkgIT09IC0xO1xufVxuZnVuY3Rpb24gc3RyaXBCYXNlbmFtZShwYXRoLCBwcmVmaXgpIHtcbiAgcmV0dXJuIGhhc0Jhc2VuYW1lKHBhdGgsIHByZWZpeCkgPyBwYXRoLnN1YnN0cihwcmVmaXgubGVuZ3RoKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBzdHJpcFRyYWlsaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQocGF0aC5sZW5ndGggLSAxKSA9PT0gJy8nID8gcGF0aC5zbGljZSgwLCAtMSkgOiBwYXRoO1xufVxuZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgdmFyIHBhdGhuYW1lID0gcGF0aCB8fCAnLyc7XG4gIHZhciBzZWFyY2ggPSAnJztcbiAgdmFyIGhhc2ggPSAnJztcbiAgdmFyIGhhc2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJyMnKTtcblxuICBpZiAoaGFzaEluZGV4ICE9PSAtMSkge1xuICAgIGhhc2ggPSBwYXRobmFtZS5zdWJzdHIoaGFzaEluZGV4KTtcbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnN1YnN0cigwLCBoYXNoSW5kZXgpO1xuICB9XG5cbiAgdmFyIHNlYXJjaEluZGV4ID0gcGF0aG5hbWUuaW5kZXhPZignPycpO1xuXG4gIGlmIChzZWFyY2hJbmRleCAhPT0gLTEpIHtcbiAgICBzZWFyY2ggPSBwYXRobmFtZS5zdWJzdHIoc2VhcmNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKDAsIHNlYXJjaEluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgIHNlYXJjaDogc2VhcmNoID09PSAnPycgPyAnJyA6IHNlYXJjaCxcbiAgICBoYXNoOiBoYXNoID09PSAnIycgPyAnJyA6IGhhc2hcbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhdGgobG9jYXRpb24pIHtcbiAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2gsXG4gICAgICBoYXNoID0gbG9jYXRpb24uaGFzaDtcbiAgdmFyIHBhdGggPSBwYXRobmFtZSB8fCAnLyc7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoICE9PSAnPycpIHBhdGggKz0gc2VhcmNoLmNoYXJBdCgwKSA9PT0gJz8nID8gc2VhcmNoIDogXCI/XCIgKyBzZWFyY2g7XG4gIGlmIChoYXNoICYmIGhhc2ggIT09ICcjJykgcGF0aCArPSBoYXNoLmNoYXJBdCgwKSA9PT0gJyMnID8gaGFzaCA6IFwiI1wiICsgaGFzaDtcbiAgcmV0dXJuIHBhdGg7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXksIGN1cnJlbnRMb2NhdGlvbikge1xuICB2YXIgbG9jYXRpb247XG5cbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgIC8vIFR3by1hcmcgZm9ybTogcHVzaChwYXRoLCBzdGF0ZSlcbiAgICBsb2NhdGlvbiA9IHBhcnNlUGF0aChwYXRoKTtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IHN0YXRlO1xuICB9IGVsc2Uge1xuICAgIC8vIE9uZS1hcmcgZm9ybTogcHVzaChsb2NhdGlvbilcbiAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBwYXRoKTtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUgPT09IHVuZGVmaW5lZCkgbG9jYXRpb24ucGF0aG5hbWUgPSAnJztcblxuICAgIGlmIChsb2NhdGlvbi5zZWFyY2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5zZWFyY2guY2hhckF0KDApICE9PSAnPycpIGxvY2F0aW9uLnNlYXJjaCA9ICc/JyArIGxvY2F0aW9uLnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uc2VhcmNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKGxvY2F0aW9uLmhhc2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5oYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBsb2NhdGlvbi5oYXNoID0gJyMnICsgbG9jYXRpb24uaGFzaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uaGFzaCA9ICcnO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkICYmIGxvY2F0aW9uLnN0YXRlID09PSB1bmRlZmluZWQpIGxvY2F0aW9uLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICB0cnkge1xuICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgVVJJRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBVUklFcnJvcignUGF0aG5hbWUgXCInICsgbG9jYXRpb24ucGF0aG5hbWUgKyAnXCIgY291bGQgbm90IGJlIGRlY29kZWQuICcgKyAnVGhpcyBpcyBsaWtlbHkgY2F1c2VkIGJ5IGFuIGludmFsaWQgcGVyY2VudC1lbmNvZGluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBpZiAoa2V5KSBsb2NhdGlvbi5rZXkgPSBrZXk7XG5cbiAgaWYgKGN1cnJlbnRMb2NhdGlvbikge1xuICAgIC8vIFJlc29sdmUgaW5jb21wbGV0ZS9yZWxhdGl2ZSBwYXRobmFtZSByZWxhdGl2ZSB0byBjdXJyZW50IGxvY2F0aW9uLlxuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gY3VycmVudExvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24ucGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gcmVzb2x2ZVBhdGhuYW1lKGxvY2F0aW9uLnBhdGhuYW1lLCBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBXaGVuIHRoZXJlIGlzIG5vIHByaW9yIGxvY2F0aW9uIGFuZCBwYXRobmFtZSBpcyBlbXB0eSwgc2V0IGl0IHRvIC9cbiAgICBpZiAoIWxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBsb2NhdGlvbi5wYXRobmFtZSA9ICcvJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbG9jYXRpb247XG59XG5mdW5jdGlvbiBsb2NhdGlvbnNBcmVFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhLnBhdGhuYW1lID09PSBiLnBhdGhuYW1lICYmIGEuc2VhcmNoID09PSBiLnNlYXJjaCAmJiBhLmhhc2ggPT09IGIuaGFzaCAmJiBhLmtleSA9PT0gYi5rZXkgJiYgdmFsdWVFcXVhbChhLnN0YXRlLCBiLnN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKSB7XG4gIHZhciBwcm9tcHQgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldFByb21wdChuZXh0UHJvbXB0KSB7XG4gICAgd2FybmluZyhwcm9tcHQgPT0gbnVsbCwgJ0EgaGlzdG9yeSBzdXBwb3J0cyBvbmx5IG9uZSBwcm9tcHQgYXQgYSB0aW1lJyk7XG4gICAgcHJvbXB0ID0gbmV4dFByb21wdDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHByb21wdCA9PT0gbmV4dFByb21wdCkgcHJvbXB0ID0gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBjYWxsYmFjaykge1xuICAgIC8vIFRPRE86IElmIGFub3RoZXIgdHJhbnNpdGlvbiBzdGFydHMgd2hpbGUgd2UncmUgc3RpbGwgY29uZmlybWluZ1xuICAgIC8vIHRoZSBwcmV2aW91cyBvbmUsIHdlIG1heSBlbmQgdXAgaW4gYSB3ZWlyZCBzdGF0ZS4gRmlndXJlIG91dCB0aGVcbiAgICAvLyBiZXN0IHdheSB0byBoYW5kbGUgdGhpcy5cbiAgICBpZiAocHJvbXB0ICE9IG51bGwpIHtcbiAgICAgIHZhciByZXN1bHQgPSB0eXBlb2YgcHJvbXB0ID09PSAnZnVuY3Rpb24nID8gcHJvbXB0KGxvY2F0aW9uLCBhY3Rpb24pIDogcHJvbXB0O1xuXG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBnZXRVc2VyQ29uZmlybWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbihyZXN1bHQsIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnQSBoaXN0b3J5IG5lZWRzIGEgZ2V0VXNlckNvbmZpcm1hdGlvbiBmdW5jdGlvbiBpbiBvcmRlciB0byB1c2UgYSBwcm9tcHQgbWVzc2FnZScpO1xuICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXR1cm4gZmFsc2UgZnJvbSBhIHRyYW5zaXRpb24gaG9vayB0byBjYW5jZWwgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgIGNhbGxiYWNrKHJlc3VsdCAhPT0gZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgZnVuY3Rpb24gYXBwZW5kTGlzdGVuZXIoZm4pIHtcbiAgICB2YXIgaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoaXNBY3RpdmUpIGZuLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlzQWN0aXZlID0gZmFsc2U7XG4gICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtICE9PSBsaXN0ZW5lcjtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub3RpZnlMaXN0ZW5lcnMoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyLmFwcGx5KHZvaWQgMCwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldFByb21wdDogc2V0UHJvbXB0LFxuICAgIGNvbmZpcm1UcmFuc2l0aW9uVG86IGNvbmZpcm1UcmFuc2l0aW9uVG8sXG4gICAgYXBwZW5kTGlzdGVuZXI6IGFwcGVuZExpc3RlbmVyLFxuICAgIG5vdGlmeUxpc3RlbmVyczogbm90aWZ5TGlzdGVuZXJzXG4gIH07XG59XG5cbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuZnVuY3Rpb24gZ2V0Q29uZmlybWF0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKHdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGlzIHN1cHBvcnRlZC4gVGFrZW4gZnJvbSBNb2Rlcm5penIuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAqIGNoYW5nZWQgdG8gYXZvaWQgZmFsc2UgbmVnYXRpdmVzIGZvciBXaW5kb3dzIFBob25lczogaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3Qtcm91dGVyL2lzc3Vlcy81ODZcbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0hpc3RvcnkoKSB7XG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICBpZiAoKHVhLmluZGV4T2YoJ0FuZHJvaWQgMi4nKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignQW5kcm9pZCA0LjAnKSAhPT0gLTEpICYmIHVhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSAhPT0gLTEgJiYgdWEuaW5kZXhPZignQ2hyb21lJykgPT09IC0xICYmIHVhLmluZGV4T2YoJ1dpbmRvd3MgUGhvbmUnKSA9PT0gLTEpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYnJvd3NlciBmaXJlcyBwb3BzdGF0ZSBvbiBoYXNoIGNoYW5nZS5cbiAqIElFMTAgYW5kIElFMTEgZG8gbm90LlxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzUG9wU3RhdGVPbkhhc2hDaGFuZ2UoKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdUcmlkZW50JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIGZhbHNlIGlmIHVzaW5nIGdvKG4pIHdpdGggaGFzaCBoaXN0b3J5IGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQuXG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2goKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBnaXZlbiBwb3BzdGF0ZSBldmVudCBpcyBhbiBleHRyYW5lb3VzIFdlYktpdCBldmVudC5cbiAqIEFjY291bnRzIGZvciB0aGUgZmFjdCB0aGF0IENocm9tZSBvbiBpT1MgZmlyZXMgcmVhbCBwb3BzdGF0ZSBldmVudHNcbiAqIGNvbnRhaW5pbmcgdW5kZWZpbmVkIHN0YXRlIHdoZW4gcHJlc3NpbmcgdGhlIGJhY2sgYnV0dG9uLlxuICovXG5cbmZ1bmN0aW9uIGlzRXh0cmFuZW91c1BvcHN0YXRlRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LnN0YXRlID09PSB1bmRlZmluZWQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDcmlPUycpID09PSAtMTtcbn1cblxudmFyIFBvcFN0YXRlRXZlbnQgPSAncG9wc3RhdGUnO1xudmFyIEhhc2hDaGFuZ2VFdmVudCA9ICdoYXNoY2hhbmdlJztcblxuZnVuY3Rpb24gZ2V0SGlzdG9yeVN0YXRlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cuaGlzdG9yeS5zdGF0ZSB8fCB7fTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIElFIDExIHNvbWV0aW1lcyB0aHJvd3Mgd2hlbiBhY2Nlc3Npbmcgd2luZG93Lmhpc3Rvcnkuc3RhdGVcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0VHJhaW5pbmcvaGlzdG9yeS9wdWxsLzI4OVxuICAgIHJldHVybiB7fTtcbiAgfVxufVxuLyoqXG4gKiBDcmVhdGVzIGEgaGlzdG9yeSBvYmplY3QgdGhhdCB1c2VzIHRoZSBIVE1MNSBoaXN0b3J5IEFQSSBpbmNsdWRpbmdcbiAqIHB1c2hTdGF0ZSwgcmVwbGFjZVN0YXRlLCBhbmQgdGhlIHBvcHN0YXRlIGV2ZW50LlxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlQnJvd3Nlckhpc3RvcnkocHJvcHMpIHtcbiAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICBwcm9wcyA9IHt9O1xuICB9XG5cbiAgIWNhblVzZURPTSA/IGludmFyaWFudChmYWxzZSwgJ0Jyb3dzZXIgaGlzdG9yeSBuZWVkcyBhIERPTScpIDogdm9pZCAwO1xuICB2YXIgZ2xvYmFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICB2YXIgY2FuVXNlSGlzdG9yeSA9IHN1cHBvcnRzSGlzdG9yeSgpO1xuICB2YXIgbmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIgPSAhc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpO1xuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBfcHJvcHMkZm9yY2VSZWZyZXNoID0gX3Byb3BzLmZvcmNlUmVmcmVzaCxcbiAgICAgIGZvcmNlUmVmcmVzaCA9IF9wcm9wcyRmb3JjZVJlZnJlc2ggPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGZvcmNlUmVmcmVzaCxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9PT0gdm9pZCAwID8gZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGtleUxlbmd0aCA9IF9wcm9wcy5rZXlMZW5ndGgsXG4gICAgICBrZXlMZW5ndGggPSBfcHJvcHMka2V5TGVuZ3RoID09PSB2b2lkIDAgPyA2IDogX3Byb3BzJGtleUxlbmd0aDtcbiAgdmFyIGJhc2VuYW1lID0gcHJvcHMuYmFzZW5hbWUgPyBzdHJpcFRyYWlsaW5nU2xhc2goYWRkTGVhZGluZ1NsYXNoKHByb3BzLmJhc2VuYW1lKSkgOiAnJztcblxuICBmdW5jdGlvbiBnZXRET01Mb2NhdGlvbihoaXN0b3J5U3RhdGUpIHtcbiAgICB2YXIgX3JlZiA9IGhpc3RvcnlTdGF0ZSB8fCB7fSxcbiAgICAgICAga2V5ID0gX3JlZi5rZXksXG4gICAgICAgIHN0YXRlID0gX3JlZi5zdGF0ZTtcblxuICAgIHZhciBfd2luZG93JGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgICBwYXRobmFtZSA9IF93aW5kb3ckbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHNlYXJjaCA9IF93aW5kb3ckbG9jYXRpb24uc2VhcmNoLFxuICAgICAgICBoYXNoID0gX3dpbmRvdyRsb2NhdGlvbi5oYXNoO1xuICAgIHZhciBwYXRoID0gcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xuICAgIHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJyk7XG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gc3RyaXBCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlS2V5KCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwga2V5TGVuZ3RoKTtcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gZ2xvYmFsSGlzdG9yeS5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcFN0YXRlKGV2ZW50KSB7XG4gICAgLy8gSWdub3JlIGV4dHJhbmVvdXMgcG9wc3RhdGUgZXZlbnRzIGluIFdlYktpdC5cbiAgICBpZiAoaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkpIHJldHVybjtcbiAgICBoYW5kbGVQb3AoZ2V0RE9NTG9jYXRpb24oZXZlbnQuc3RhdGUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUhhc2hDaGFuZ2UoKSB7XG4gICAgaGFuZGxlUG9wKGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKSk7XG4gIH1cblxuICB2YXIgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wKGxvY2F0aW9uKSB7XG4gICAgaWYgKGZvcmNlTmV4dFBvcCkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldmVydFBvcChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydFBvcChmcm9tTG9jYXRpb24pIHtcbiAgICB2YXIgdG9Mb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247IC8vIFRPRE86IFdlIGNvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyBtb3JlIHJlbGlhYmxlIGJ5XG4gICAgLy8ga2VlcGluZyBhIGxpc3Qgb2Yga2V5cyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBrZXlzIHdlIGRvbid0IGtub3cuXG5cbiAgICB2YXIgdG9JbmRleCA9IGFsbEtleXMuaW5kZXhPZih0b0xvY2F0aW9uLmtleSk7XG4gICAgaWYgKHRvSW5kZXggPT09IC0xKSB0b0luZGV4ID0gMDtcbiAgICB2YXIgZnJvbUluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGZyb21Mb2NhdGlvbi5rZXkpO1xuICAgIGlmIChmcm9tSW5kZXggPT09IC0xKSBmcm9tSW5kZXggPSAwO1xuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGluaXRpYWxMb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKTtcbiAgdmFyIGFsbEtleXMgPSBbaW5pdGlhbExvY2F0aW9uLmtleV07IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGJhc2VuYW1lICsgY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byBwdXNoIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIGhyZWYgPSBjcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXksXG4gICAgICAgICAgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcblxuICAgICAgaWYgKGNhblVzZUhpc3RvcnkpIHtcbiAgICAgICAgZ2xvYmFsSGlzdG9yeS5wdXNoU3RhdGUoe1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICB9LCBudWxsLCBocmVmKTtcblxuICAgICAgICBpZiAoZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YoaGlzdG9yeS5sb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIHZhciBuZXh0S2V5cyA9IGFsbEtleXMuc2xpY2UoMCwgcHJldkluZGV4ICsgMSk7XG4gICAgICAgICAgbmV4dEtleXMucHVzaChsb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIGFsbEtleXMgPSBuZXh0S2V5cztcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdCcm93c2VyIGhpc3RvcnkgY2Fubm90IHB1c2ggc3RhdGUgaW4gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBIVE1MNSBoaXN0b3J5Jyk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UocGF0aCwgc3RhdGUpIHtcbiAgICB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHJlcGxhY2Ugd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJyk7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgaHJlZiA9IGNyZWF0ZUhyZWYobG9jYXRpb24pO1xuICAgICAgdmFyIGtleSA9IGxvY2F0aW9uLmtleSxcbiAgICAgICAgICBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlO1xuXG4gICAgICBpZiAoY2FuVXNlSGlzdG9yeSkge1xuICAgICAgICBnbG9iYWxIaXN0b3J5LnJlcGxhY2VTdGF0ZSh7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICAgIH0sIG51bGwsIGhyZWYpO1xuXG4gICAgICAgIGlmIChmb3JjZVJlZnJlc2gpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShocmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGhpc3RvcnkubG9jYXRpb24ua2V5KTtcbiAgICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkgYWxsS2V5c1twcmV2SW5kZXhdID0gbG9jYXRpb24ua2V5O1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0Jyb3dzZXIgaGlzdG9yeSBjYW5ub3QgcmVwbGFjZSBzdGF0ZSBpbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IEhUTUw1IGhpc3RvcnknKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoaHJlZik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tET01MaXN0ZW5lcnMoZGVsdGEpIHtcbiAgICBsaXN0ZW5lckNvdW50ICs9IGRlbHRhO1xuXG4gICAgaWYgKGxpc3RlbmVyQ291bnQgPT09IDEgJiYgZGVsdGEgPT09IDEpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFBvcFN0YXRlRXZlbnQsIGhhbmRsZVBvcFN0YXRlKTtcbiAgICAgIGlmIChuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lcikgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGxpc3RlbmVyQ291bnQgPT09IDApIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFBvcFN0YXRlRXZlbnQsIGhhbmRsZVBvcFN0YXRlKTtcbiAgICAgIGlmIChuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lcikgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdW5ibG9jayA9IHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuXG4gICAgaWYgKCFpc0Jsb2NrZWQpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgICAgaXNCbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgICBpc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5ibG9jaygpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICB2YXIgdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIHVubGlzdGVuKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZ2xvYmFsSGlzdG9yeS5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogaW5pdGlhbExvY2F0aW9uLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbnZhciBIYXNoQ2hhbmdlRXZlbnQkMSA9ICdoYXNoY2hhbmdlJztcbnZhciBIYXNoUGF0aENvZGVycyA9IHtcbiAgaGFzaGJhbmc6IHtcbiAgICBlbmNvZGVQYXRoOiBmdW5jdGlvbiBlbmNvZGVQYXRoKHBhdGgpIHtcbiAgICAgIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJyEnID8gcGF0aCA6ICchLycgKyBzdHJpcExlYWRpbmdTbGFzaChwYXRoKTtcbiAgICB9LFxuICAgIGRlY29kZVBhdGg6IGZ1bmN0aW9uIGRlY29kZVBhdGgocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnIScgPyBwYXRoLnN1YnN0cigxKSA6IHBhdGg7XG4gICAgfVxuICB9LFxuICBub3NsYXNoOiB7XG4gICAgZW5jb2RlUGF0aDogc3RyaXBMZWFkaW5nU2xhc2gsXG4gICAgZGVjb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoXG4gIH0sXG4gIHNsYXNoOiB7XG4gICAgZW5jb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoLFxuICAgIGRlY29kZVBhdGg6IGFkZExlYWRpbmdTbGFzaFxuICB9XG59O1xuXG5mdW5jdGlvbiBzdHJpcEhhc2godXJsKSB7XG4gIHZhciBoYXNoSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICByZXR1cm4gaGFzaEluZGV4ID09PSAtMSA/IHVybCA6IHVybC5zbGljZSgwLCBoYXNoSW5kZXgpO1xufVxuXG5mdW5jdGlvbiBnZXRIYXNoUGF0aCgpIHtcbiAgLy8gV2UgY2FuJ3QgdXNlIHdpbmRvdy5sb2NhdGlvbi5oYXNoIGhlcmUgYmVjYXVzZSBpdCdzIG5vdFxuICAvLyBjb25zaXN0ZW50IGFjcm9zcyBicm93c2VycyAtIEZpcmVmb3ggd2lsbCBwcmUtZGVjb2RlIGl0IVxuICB2YXIgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICB2YXIgaGFzaEluZGV4ID0gaHJlZi5pbmRleE9mKCcjJyk7XG4gIHJldHVybiBoYXNoSW5kZXggPT09IC0xID8gJycgOiBocmVmLnN1YnN0cmluZyhoYXNoSW5kZXggKyAxKTtcbn1cblxuZnVuY3Rpb24gcHVzaEhhc2hQYXRoKHBhdGgpIHtcbiAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBwYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlSGFzaFBhdGgocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShzdHJpcEhhc2god2luZG93LmxvY2F0aW9uLmhyZWYpICsgJyMnICsgcGF0aCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhhc2hIaXN0b3J5KHByb3BzKSB7XG4gIGlmIChwcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgcHJvcHMgPSB7fTtcbiAgfVxuXG4gICFjYW5Vc2VET00gPyBpbnZhcmlhbnQoZmFsc2UsICdIYXNoIGhpc3RvcnkgbmVlZHMgYSBET00nKSA6IHZvaWQgMDtcbiAgdmFyIGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdmFyIGNhbkdvV2l0aG91dFJlbG9hZCA9IHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCk7XG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9PT0gdm9pZCAwID8gZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGhhc2hUeXBlID0gX3Byb3BzLmhhc2hUeXBlLFxuICAgICAgaGFzaFR5cGUgPSBfcHJvcHMkaGFzaFR5cGUgPT09IHZvaWQgMCA/ICdzbGFzaCcgOiBfcHJvcHMkaGFzaFR5cGU7XG4gIHZhciBiYXNlbmFtZSA9IHByb3BzLmJhc2VuYW1lID8gc3RyaXBUcmFpbGluZ1NsYXNoKGFkZExlYWRpbmdTbGFzaChwcm9wcy5iYXNlbmFtZSkpIDogJyc7XG4gIHZhciBfSGFzaFBhdGhDb2RlcnMkaGFzaFQgPSBIYXNoUGF0aENvZGVyc1toYXNoVHlwZV0sXG4gICAgICBlbmNvZGVQYXRoID0gX0hhc2hQYXRoQ29kZXJzJGhhc2hULmVuY29kZVBhdGgsXG4gICAgICBkZWNvZGVQYXRoID0gX0hhc2hQYXRoQ29kZXJzJGhhc2hULmRlY29kZVBhdGg7XG5cbiAgZnVuY3Rpb24gZ2V0RE9NTG9jYXRpb24oKSB7XG4gICAgdmFyIHBhdGggPSBkZWNvZGVQYXRoKGdldEhhc2hQYXRoKCkpO1xuICAgIHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJyk7XG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gc3RyaXBCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgpO1xuICB9XG5cbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBnbG9iYWxIaXN0b3J5Lmxlbmd0aDtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9XG5cbiAgdmFyIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICB2YXIgaWdub3JlUGF0aCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gbG9jYXRpb25zQXJlRXF1YWwkJDEoYSwgYikge1xuICAgIHJldHVybiBhLnBhdGhuYW1lID09PSBiLnBhdGhuYW1lICYmIGEuc2VhcmNoID09PSBiLnNlYXJjaCAmJiBhLmhhc2ggPT09IGIuaGFzaDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUhhc2hDaGFuZ2UoKSB7XG4gICAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgocGF0aCk7XG5cbiAgICBpZiAocGF0aCAhPT0gZW5jb2RlZFBhdGgpIHtcbiAgICAgIC8vIEVuc3VyZSB3ZSBhbHdheXMgaGF2ZSBhIHByb3Blcmx5LWVuY29kZWQgaGFzaC5cbiAgICAgIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBsb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKCk7XG4gICAgICB2YXIgcHJldkxvY2F0aW9uID0gaGlzdG9yeS5sb2NhdGlvbjtcbiAgICAgIGlmICghZm9yY2VOZXh0UG9wICYmIGxvY2F0aW9uc0FyZUVxdWFsJCQxKHByZXZMb2NhdGlvbiwgbG9jYXRpb24pKSByZXR1cm47IC8vIEEgaGFzaGNoYW5nZSBkb2Vzbid0IGFsd2F5cyA9PSBsb2NhdGlvbiBjaGFuZ2UuXG5cbiAgICAgIGlmIChpZ25vcmVQYXRoID09PSBjcmVhdGVQYXRoKGxvY2F0aW9uKSkgcmV0dXJuOyAvLyBJZ25vcmUgdGhpcyBjaGFuZ2U7IHdlIGFscmVhZHkgc2V0U3RhdGUgaW4gcHVzaC9yZXBsYWNlLlxuXG4gICAgICBpZ25vcmVQYXRoID0gbnVsbDtcbiAgICAgIGhhbmRsZVBvcChsb2NhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wKGxvY2F0aW9uKSB7XG4gICAgaWYgKGZvcmNlTmV4dFBvcCkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldmVydFBvcChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydFBvcChmcm9tTG9jYXRpb24pIHtcbiAgICB2YXIgdG9Mb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247IC8vIFRPRE86IFdlIGNvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyBtb3JlIHJlbGlhYmxlIGJ5XG4gICAgLy8ga2VlcGluZyBhIGxpc3Qgb2YgcGF0aHMgd2UndmUgc2VlbiBpbiBzZXNzaW9uU3RvcmFnZS5cbiAgICAvLyBJbnN0ZWFkLCB3ZSBqdXN0IGRlZmF1bHQgdG8gMCBmb3IgcGF0aHMgd2UgZG9uJ3Qga25vdy5cblxuICAgIHZhciB0b0luZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoY3JlYXRlUGF0aCh0b0xvY2F0aW9uKSk7XG4gICAgaWYgKHRvSW5kZXggPT09IC0xKSB0b0luZGV4ID0gMDtcbiAgICB2YXIgZnJvbUluZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoY3JlYXRlUGF0aChmcm9tTG9jYXRpb24pKTtcbiAgICBpZiAoZnJvbUluZGV4ID09PSAtMSkgZnJvbUluZGV4ID0gMDtcbiAgICB2YXIgZGVsdGEgPSB0b0luZGV4IC0gZnJvbUluZGV4O1xuXG4gICAgaWYgKGRlbHRhKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSB0cnVlO1xuICAgICAgZ28oZGVsdGEpO1xuICAgIH1cbiAgfSAvLyBFbnN1cmUgdGhlIGhhc2ggaXMgZW5jb2RlZCBwcm9wZXJseSBiZWZvcmUgZG9pbmcgYW55dGhpbmcgZWxzZS5cblxuXG4gIHZhciBwYXRoID0gZ2V0SGFzaFBhdGgoKTtcbiAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChwYXRoKTtcbiAgaWYgKHBhdGggIT09IGVuY29kZWRQYXRoKSByZXBsYWNlSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICB2YXIgaW5pdGlhbExvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oKTtcbiAgdmFyIGFsbFBhdGhzID0gW2NyZWF0ZVBhdGgoaW5pdGlhbExvY2F0aW9uKV07IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgdmFyIGJhc2VUYWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdiYXNlJyk7XG4gICAgdmFyIGhyZWYgPSAnJztcblxuICAgIGlmIChiYXNlVGFnICYmIGJhc2VUYWcuZ2V0QXR0cmlidXRlKCdocmVmJykpIHtcbiAgICAgIGhyZWYgPSBzdHJpcEhhc2god2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIH1cblxuICAgIHJldHVybiBocmVmICsgJyMnICsgZW5jb2RlUGF0aChiYXNlbmFtZSArIGNyZWF0ZVBhdGgobG9jYXRpb24pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdIYXNoIGhpc3RvcnkgY2Fubm90IHB1c2ggc3RhdGU7IGl0IGlzIGlnbm9yZWQnKTtcbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIHBhdGggPSBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgoYmFzZW5hbWUgKyBwYXRoKTtcbiAgICAgIHZhciBoYXNoQ2hhbmdlZCA9IGdldEhhc2hQYXRoKCkgIT09IGVuY29kZWRQYXRoO1xuXG4gICAgICBpZiAoaGFzaENoYW5nZWQpIHtcbiAgICAgICAgLy8gV2UgY2Fubm90IHRlbGwgaWYgYSBoYXNoY2hhbmdlIHdhcyBjYXVzZWQgYnkgYSBQVVNILCBzbyB3ZSdkXG4gICAgICAgIC8vIHJhdGhlciBzZXRTdGF0ZSBoZXJlIGFuZCBpZ25vcmUgdGhlIGhhc2hjaGFuZ2UuIFRoZSBjYXZlYXQgaGVyZVxuICAgICAgICAvLyBpcyB0aGF0IG90aGVyIGhhc2ggaGlzdG9yaWVzIGluIHRoZSBwYWdlIHdpbGwgY29uc2lkZXIgaXQgYSBQT1AuXG4gICAgICAgIGlnbm9yZVBhdGggPSBwYXRoO1xuICAgICAgICBwdXNoSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoY3JlYXRlUGF0aChoaXN0b3J5LmxvY2F0aW9uKSk7XG4gICAgICAgIHZhciBuZXh0UGF0aHMgPSBhbGxQYXRocy5zbGljZSgwLCBwcmV2SW5kZXggKyAxKTtcbiAgICAgICAgbmV4dFBhdGhzLnB1c2gocGF0aCk7XG4gICAgICAgIGFsbFBhdGhzID0gbmV4dFBhdGhzO1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybmluZyhmYWxzZSwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgUFVTSCB0aGUgc2FtZSBwYXRoOyBhIG5ldyBlbnRyeSB3aWxsIG5vdCBiZSBhZGRlZCB0byB0aGUgaGlzdG9yeSBzdGFjaycpO1xuICAgICAgICBzZXRTdGF0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgcmVwbGFjZSBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpO1xuICAgIHZhciBhY3Rpb24gPSAnUkVQTEFDRSc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgcGF0aCA9IGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICAgICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChiYXNlbmFtZSArIHBhdGgpO1xuICAgICAgdmFyIGhhc2hDaGFuZ2VkID0gZ2V0SGFzaFBhdGgoKSAhPT0gZW5jb2RlZFBhdGg7XG5cbiAgICAgIGlmIChoYXNoQ2hhbmdlZCkge1xuICAgICAgICAvLyBXZSBjYW5ub3QgdGVsbCBpZiBhIGhhc2hjaGFuZ2Ugd2FzIGNhdXNlZCBieSBhIFJFUExBQ0UsIHNvIHdlJ2RcbiAgICAgICAgLy8gcmF0aGVyIHNldFN0YXRlIGhlcmUgYW5kIGlnbm9yZSB0aGUgaGFzaGNoYW5nZS4gVGhlIGNhdmVhdCBoZXJlXG4gICAgICAgIC8vIGlzIHRoYXQgb3RoZXIgaGFzaCBoaXN0b3JpZXMgaW4gdGhlIHBhZ2Ugd2lsbCBjb25zaWRlciBpdCBhIFBPUC5cbiAgICAgICAgaWdub3JlUGF0aCA9IHBhdGg7XG4gICAgICAgIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxQYXRocy5pbmRleE9mKGNyZWF0ZVBhdGgoaGlzdG9yeS5sb2NhdGlvbikpO1xuICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIGFsbFBhdGhzW3ByZXZJbmRleF0gPSBwYXRoO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICB3YXJuaW5nKGNhbkdvV2l0aG91dFJlbG9hZCwgJ0hhc2ggaGlzdG9yeSBnbyhuKSBjYXVzZXMgYSBmdWxsIHBhZ2UgcmVsb2FkIGluIHRoaXMgYnJvd3NlcicpO1xuICAgIGdsb2JhbEhpc3RvcnkuZ28obik7XG4gIH1cblxuICBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgZ28oLTEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29Gb3J3YXJkKCkge1xuICAgIGdvKDEpO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyQ291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIGNoZWNrRE9NTGlzdGVuZXJzKGRlbHRhKSB7XG4gICAgbGlzdGVuZXJDb3VudCArPSBkZWx0YTtcblxuICAgIGlmIChsaXN0ZW5lckNvdW50ID09PSAxICYmIGRlbHRhID09PSAxKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQkMSwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfSBlbHNlIGlmIChsaXN0ZW5lckNvdW50ID09PSAwKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQkMSwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGlzQmxvY2tlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGJsb2NrKHByb21wdCkge1xuICAgIGlmIChwcm9tcHQgPT09IHZvaWQgMCkge1xuICAgICAgcHJvbXB0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHVuYmxvY2sgPSB0cmFuc2l0aW9uTWFuYWdlci5zZXRQcm9tcHQocHJvbXB0KTtcblxuICAgIGlmICghaXNCbG9ja2VkKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICAgIGlzQmxvY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0Jsb2NrZWQpIHtcbiAgICAgICAgaXNCbG9ja2VkID0gZmFsc2U7XG4gICAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuYmxvY2soKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgdmFyIHVubGlzdGVuID0gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB1bmxpc3RlbigpO1xuICAgIH07XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IHtcbiAgICBsZW5ndGg6IGdsb2JhbEhpc3RvcnkubGVuZ3RoLFxuICAgIGFjdGlvbjogJ1BPUCcsXG4gICAgbG9jYXRpb246IGluaXRpYWxMb2NhdGlvbixcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgYmxvY2s6IGJsb2NrLFxuICAgIGxpc3RlbjogbGlzdGVuXG4gIH07XG4gIHJldHVybiBoaXN0b3J5O1xufVxuXG5mdW5jdGlvbiBjbGFtcChuLCBsb3dlckJvdW5kLCB1cHBlckJvdW5kKSB7XG4gIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChuLCBsb3dlckJvdW5kKSwgdXBwZXJCb3VuZCk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBoaXN0b3J5IG9iamVjdCB0aGF0IHN0b3JlcyBsb2NhdGlvbnMgaW4gbWVtb3J5LlxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlTWVtb3J5SGlzdG9yeShwcm9wcykge1xuICBpZiAocHJvcHMgPT09IHZvaWQgMCkge1xuICAgIHByb3BzID0ge307XG4gIH1cblxuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBnZXRVc2VyQ29uZmlybWF0aW9uID0gX3Byb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBfcHJvcHMkaW5pdGlhbEVudHJpZXMgPSBfcHJvcHMuaW5pdGlhbEVudHJpZXMsXG4gICAgICBpbml0aWFsRW50cmllcyA9IF9wcm9wcyRpbml0aWFsRW50cmllcyA9PT0gdm9pZCAwID8gWycvJ10gOiBfcHJvcHMkaW5pdGlhbEVudHJpZXMsXG4gICAgICBfcHJvcHMkaW5pdGlhbEluZGV4ID0gX3Byb3BzLmluaXRpYWxJbmRleCxcbiAgICAgIGluaXRpYWxJbmRleCA9IF9wcm9wcyRpbml0aWFsSW5kZXggPT09IHZvaWQgMCA/IDAgOiBfcHJvcHMkaW5pdGlhbEluZGV4LFxuICAgICAgX3Byb3BzJGtleUxlbmd0aCA9IF9wcm9wcy5rZXlMZW5ndGgsXG4gICAgICBrZXlMZW5ndGggPSBfcHJvcHMka2V5TGVuZ3RoID09PSB2b2lkIDAgPyA2IDogX3Byb3BzJGtleUxlbmd0aDtcbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBoaXN0b3J5LmVudHJpZXMubGVuZ3RoO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCBrZXlMZW5ndGgpO1xuICB9XG5cbiAgdmFyIGluZGV4ID0gY2xhbXAoaW5pdGlhbEluZGV4LCAwLCBpbml0aWFsRW50cmllcy5sZW5ndGggLSAxKTtcbiAgdmFyIGVudHJpZXMgPSBpbml0aWFsRW50cmllcy5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlbnRyeSA9PT0gJ3N0cmluZycgPyBjcmVhdGVMb2NhdGlvbihlbnRyeSwgdW5kZWZpbmVkLCBjcmVhdGVLZXkoKSkgOiBjcmVhdGVMb2NhdGlvbihlbnRyeSwgdW5kZWZpbmVkLCBlbnRyeS5rZXkgfHwgY3JlYXRlS2V5KCkpO1xuICB9KTsgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIHZhciBjcmVhdGVIcmVmID0gY3JlYXRlUGF0aDtcblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byBwdXNoIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIHByZXZJbmRleCA9IGhpc3RvcnkuaW5kZXg7XG4gICAgICB2YXIgbmV4dEluZGV4ID0gcHJldkluZGV4ICsgMTtcbiAgICAgIHZhciBuZXh0RW50cmllcyA9IGhpc3RvcnkuZW50cmllcy5zbGljZSgwKTtcblxuICAgICAgaWYgKG5leHRFbnRyaWVzLmxlbmd0aCA+IG5leHRJbmRleCkge1xuICAgICAgICBuZXh0RW50cmllcy5zcGxpY2UobmV4dEluZGV4LCBuZXh0RW50cmllcy5sZW5ndGggLSBuZXh0SW5kZXgsIGxvY2F0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRFbnRyaWVzLnB1c2gobG9jYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICAgIGluZGV4OiBuZXh0SW5kZXgsXG4gICAgICAgIGVudHJpZXM6IG5leHRFbnRyaWVzXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UocGF0aCwgc3RhdGUpIHtcbiAgICB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHJlcGxhY2Ugd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJyk7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICBoaXN0b3J5LmVudHJpZXNbaGlzdG9yeS5pbmRleF0gPSBsb2NhdGlvbjtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgdmFyIG5leHRJbmRleCA9IGNsYW1wKGhpc3RvcnkuaW5kZXggKyBuLCAwLCBoaXN0b3J5LmVudHJpZXMubGVuZ3RoIC0gMSk7XG4gICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuICAgIHZhciBsb2NhdGlvbiA9IGhpc3RvcnkuZW50cmllc1tuZXh0SW5kZXhdO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAob2spIHtcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgICBpbmRleDogbmV4dEluZGV4XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTWltaWMgdGhlIGJlaGF2aW9yIG9mIERPTSBoaXN0b3JpZXMgYnlcbiAgICAgICAgLy8gY2F1c2luZyBhIHJlbmRlciBhZnRlciBhIGNhbmNlbGxlZCBQT1AuXG4gICAgICAgIHNldFN0YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgZ28oLTEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29Gb3J3YXJkKCkge1xuICAgIGdvKDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuR28obikge1xuICAgIHZhciBuZXh0SW5kZXggPSBoaXN0b3J5LmluZGV4ICsgbjtcbiAgICByZXR1cm4gbmV4dEluZGV4ID49IDAgJiYgbmV4dEluZGV4IDwgaGlzdG9yeS5lbnRyaWVzLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJsb2NrKHByb21wdCkge1xuICAgIGlmIChwcm9tcHQgPT09IHZvaWQgMCkge1xuICAgICAgcHJvbXB0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgcmV0dXJuIHRyYW5zaXRpb25NYW5hZ2VyLmFwcGVuZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZW50cmllcy5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogZW50cmllc1tpbmRleF0sXG4gICAgaW5kZXg6IGluZGV4LFxuICAgIGVudHJpZXM6IGVudHJpZXMsXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICBwdXNoOiBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgZ286IGdvLFxuICAgIGdvQmFjazogZ29CYWNrLFxuICAgIGdvRm9yd2FyZDogZ29Gb3J3YXJkLFxuICAgIGNhbkdvOiBjYW5HbyxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbmV4cG9ydHMuY3JlYXRlQnJvd3Nlckhpc3RvcnkgPSBjcmVhdGVCcm93c2VySGlzdG9yeTtcbmV4cG9ydHMuY3JlYXRlSGFzaEhpc3RvcnkgPSBjcmVhdGVIYXNoSGlzdG9yeTtcbmV4cG9ydHMuY3JlYXRlTWVtb3J5SGlzdG9yeSA9IGNyZWF0ZU1lbW9yeUhpc3Rvcnk7XG5leHBvcnRzLmNyZWF0ZUxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb247XG5leHBvcnRzLmxvY2F0aW9uc0FyZUVxdWFsID0gbG9jYXRpb25zQXJlRXF1YWw7XG5leHBvcnRzLnBhcnNlUGF0aCA9IHBhcnNlUGF0aDtcbmV4cG9ydHMuY3JlYXRlUGF0aCA9IGNyZWF0ZVBhdGg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9janMvaGlzdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCB0eXBlIHsgTG9jYXRpb24sIExvY2F0aW9uT3B0aW9ucywgTG9jYXRpb25BY3Rpb24gfSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IHtcbiAgTE9DQVRJT05fQ0hBTkdFRCxcbiAgUkVQTEFDRV9ST1VURVMsXG4gIERJRF9SRVBMQUNFX1JPVVRFUyxcbiAgaXNOYXZpZ2F0aW9uQWN0aW9uV2l0aFBheWxvYWRcbn0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCBtZXJnZVF1ZXJpZXMgZnJvbSAnLi91dGlsL21lcmdlLXF1ZXJpZXMnO1xuXG50eXBlIFJlc29sdmVyQXJncyA9IHtcbiAgb2xkTG9jYXRpb246IExvY2F0aW9uLFxuICBuZXdMb2NhdGlvbjogTG9jYXRpb24sXG4gIG9wdGlvbnM6IExvY2F0aW9uT3B0aW9uc1xufTtcblxuZXhwb3J0IHR5cGUgUmVkdWNlckFyZ3MgPSB7fFxuICByb3V0ZXM6IE9iamVjdCxcbiAgaW5pdGlhbExvY2F0aW9uOiBMb2NhdGlvblxufH07XG5cbmNvbnN0IGZsb3cgPSAoLi4uZnVuY3M6IEFycmF5PCo+KSA9PlxuICBmdW5jcy5yZWR1Y2UoKHByZXYsIGN1cnIpID0+ICguLi5hcmdzOiBBcnJheTwqPikgPT4gY3VycihwcmV2KC4uLmFyZ3MpKSk7XG5cbmNvbnN0IHJlc29sdmVRdWVyeSA9ICh7XG4gIG9sZExvY2F0aW9uLFxuICBuZXdMb2NhdGlvbixcbiAgb3B0aW9uc1xufTogUmVzb2x2ZXJBcmdzKTogUmVzb2x2ZXJBcmdzID0+IHtcbiAgLy8gTWVyZ2UgdGhlIG9sZCBhbmQgbmV3IHF1ZXJpZXMgaWYgYXNrZWQgdG8gcGVyc2lzdFxuICBpZiAob3B0aW9ucy5wZXJzaXN0UXVlcnkpIHtcbiAgICBjb25zdCBtZXJnZWRRdWVyeSA9IG1lcmdlUXVlcmllcyhvbGRMb2NhdGlvbi5xdWVyeSwgbmV3TG9jYXRpb24ucXVlcnkpO1xuICAgIHJldHVybiB7XG4gICAgICBvbGRMb2NhdGlvbixcbiAgICAgIG5ld0xvY2F0aW9uOiB7XG4gICAgICAgIC4uLm5ld0xvY2F0aW9uLFxuICAgICAgICAuLi5tZXJnZWRRdWVyeVxuICAgICAgfSxcbiAgICAgIG9wdGlvbnNcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvbGRMb2NhdGlvbixcbiAgICBuZXdMb2NhdGlvbjoge1xuICAgICAgLi4ubmV3TG9jYXRpb24sXG4gICAgICBxdWVyeTogbmV3TG9jYXRpb24ucXVlcnlcbiAgICB9LFxuICAgIG9wdGlvbnNcbiAgfTtcbn07XG5cbmNvbnN0IHJlc29sdmVCYXNlbmFtZSA9ICh7XG4gIG9sZExvY2F0aW9uLFxuICBuZXdMb2NhdGlvbixcbiAgb3B0aW9uc1xufTogUmVzb2x2ZXJBcmdzKTogUmVzb2x2ZXJBcmdzID0+IHtcbiAgY29uc3QgeyBiYXNlbmFtZSB9ID0gb2xkTG9jYXRpb247XG4gIGlmIChiYXNlbmFtZSkge1xuICAgIHJldHVybiB7XG4gICAgICBvbGRMb2NhdGlvbixcbiAgICAgIG5ld0xvY2F0aW9uOiB7IGJhc2VuYW1lLCAuLi5uZXdMb2NhdGlvbiB9LFxuICAgICAgb3B0aW9uc1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIHsgb2xkTG9jYXRpb24sIG5ld0xvY2F0aW9uLCBvcHRpb25zIH07XG59O1xuXG5jb25zdCByZXNvbHZlUHJldmlvdXMgPSAoe1xuICBvbGRMb2NhdGlvbixcbiAgbmV3TG9jYXRpb24sXG4gIG9wdGlvbnNcbn06IFJlc29sdmVyQXJncyk6IFJlc29sdmVyQXJncyA9PiAoe1xuICBvbGRMb2NhdGlvbixcbiAgbmV3TG9jYXRpb246IHtcbiAgICAuLi5uZXdMb2NhdGlvbixcbiAgICBwcmV2aW91czogb2xkTG9jYXRpb25cbiAgfSxcbiAgb3B0aW9uc1xufSk7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlTG9jYXRpb24gPSBmbG93KFxuICByZXNvbHZlUXVlcnksXG4gIHJlc29sdmVCYXNlbmFtZSxcbiAgcmVzb2x2ZVByZXZpb3VzXG4pO1xuXG5jb25zdCBsb2NhdGlvbkNoYW5nZVJlZHVjZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAvLyBOby1vcCB0aGUgaW5pdGlhbCByb3V0ZSBhY3Rpb25cbiAgY29uc3QgeyBxdWV1ZSA9IFtdIH0gPSBzdGF0ZTtcbiAgaWYgKFxuICAgIHN0YXRlLnBhdGhuYW1lID09PSBhY3Rpb24ucGF5bG9hZC5wYXRobmFtZSAmJlxuICAgIHN0YXRlLnNlYXJjaCA9PT0gYWN0aW9uLnBheWxvYWQuc2VhcmNoICYmXG4gICAgc3RhdGUuaGFzaCA9PT0gYWN0aW9uLnBheWxvYWQuaGFzaCAmJlxuICAgICFxdWV1ZS5sZW5ndGhcbiAgKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3QgcXVldWVkTG9jYXRpb24gPSBxdWV1ZVswXSB8fCB7fTtcbiAgY29uc3QgbmV3UXVldWUgPSBxdWV1ZS5zbGljZSgxKTtcblxuICAvLyBFeHRyYWN0IHRoZSBwcmV2aW91cyBzdGF0ZSwgYnV0IGR1bXAgdGhlXG4gIC8vIHByZXZpb3VzIHN0YXRlJ3MgcHJldmlvdXMgc3RhdGUgc28gdGhhdCB0aGVcbiAgLy8gc3RhdGUgdHJlZSBkb2Vzbid0IGtlZXAgZ3Jvd2luZyBpbmRlZmluaXRlbHlcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGNvbnN0IHsgcHJldmlvdXMsIHJvdXRlczogY3VycmVudFJvdXRlcyA9IHt9LCAuLi5vbGRMb2NhdGlvbiB9ID0gc3RhdGU7XG4gIGNvbnN0IHsgb3B0aW9ucyA9IHt9LCBxdWVyeSA9IHt9IH0gPSBxdWV1ZWRMb2NhdGlvbjtcbiAgY29uc3QgbmV3TG9jYXRpb24gPSB7IC4uLmFjdGlvbi5wYXlsb2FkLCBxdWVyeSB9O1xuXG4gIGNvbnN0IHsgbmV3TG9jYXRpb246IHJlc29sdmVkTmV3TG9jYXRpb24gfSA9IHJlc29sdmVMb2NhdGlvbih7XG4gICAgb2xkTG9jYXRpb24sXG4gICAgbmV3TG9jYXRpb24sXG4gICAgb3B0aW9uc1xuICB9KTtcblxuICByZXR1cm4geyAuLi5yZXNvbHZlZE5ld0xvY2F0aW9uLCByb3V0ZXM6IGN1cnJlbnRSb3V0ZXMsIHF1ZXVlOiBuZXdRdWV1ZSB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKHsgcm91dGVzID0ge30sIGluaXRpYWxMb2NhdGlvbiB9OiBSZWR1Y2VyQXJncyA9IHt9KSA9PiAoXG4gIHN0YXRlOiBMb2NhdGlvbiA9IHsgLi4uaW5pdGlhbExvY2F0aW9uLCByb3V0ZXMsIHF1ZXVlOiBbXSB9LFxuICBhY3Rpb246IExvY2F0aW9uQWN0aW9uXG4pID0+IHtcbiAgaWYgKGlzTmF2aWdhdGlvbkFjdGlvbldpdGhQYXlsb2FkKGFjdGlvbikpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBxdWV1ZTogc3RhdGUucXVldWUgJiYgc3RhdGUucXVldWUuY29uY2F0KFthY3Rpb24ucGF5bG9hZF0pXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gUkVQTEFDRV9ST1VURVMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICByb3V0ZXM6IGFjdGlvbi5wYXlsb2FkLnJvdXRlcyxcbiAgICAgIG9wdGlvbnM6IGFjdGlvbi5wYXlsb2FkLm9wdGlvbnNcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBESURfUkVQTEFDRV9ST1VURVMpIHtcbiAgICByZXR1cm4geyAuLi5zdGF0ZSwgb3B0aW9uczoge30gfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gTE9DQVRJT05fQ0hBTkdFRCkge1xuICAgIHJldHVybiBsb2NhdGlvbkNoYW5nZVJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVkdWNlci5qcyIsIi8vIEBmbG93XG4vKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuaW1wb3J0IHR5cGUgeyBIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XG5pbXBvcnQgdHlwZSB7IERpc3BhdGNoLCBTdG9yZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB0eXBlIHsgUm91dGVyQWN0aW9uLCBRdWVyeSwgU3RhdGUgfSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IHtcbiAgUFVTSCxcbiAgUkVQTEFDRSxcbiAgR08sXG4gIEdPX0JBQ0ssXG4gIEdPX0ZPUldBUkQsXG4gIEJMT0NLLFxuICBVTkJMT0NLLFxuICBpc05hdmlnYXRpb25BY3Rpb25cbn0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCBtZXJnZVF1ZXJpZXMgZnJvbSAnLi91dGlsL21lcmdlLXF1ZXJpZXMnO1xuXG5leHBvcnQgdHlwZSBNaWRkbGV3YXJlQXJncyA9IHtcbiAgaGlzdG9yeTogSGlzdG9yeVxufTtcblxudHlwZSBIYW5kbGVOYXZBcmdzID0ge1xuICBuZXh0OiBEaXNwYXRjaDwqPixcbiAgYWN0aW9uOiBSb3V0ZXJBY3Rpb24sXG4gIGhpc3Rvcnk6IEhpc3RvcnksXG4gIHF1ZXJ5PzogUXVlcnlcbn07XG5cbmxldCB1bmJsb2NrID0gbnVsbDtcblxuY29uc3QgbmF2aWdhdGUgPSAoaGlzdG9yeSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFBVU0g6XG4gICAgICBoaXN0b3J5LnB1c2goYWN0aW9uLnBheWxvYWQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBSRVBMQUNFOlxuICAgICAgaGlzdG9yeS5yZXBsYWNlKGFjdGlvbi5wYXlsb2FkKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgR086XG4gICAgICBoaXN0b3J5LmdvKGFjdGlvbi5wYXlsb2FkKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgR09fQkFDSzpcbiAgICAgIGhpc3RvcnkuZ29CYWNrKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEdPX0ZPUldBUkQ6XG4gICAgICBoaXN0b3J5LmdvRm9yd2FyZCgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBCTE9DSzpcbiAgICAgIHVuYmxvY2sgPSBoaXN0b3J5LmJsb2NrKGFjdGlvbi5wYXlsb2FkKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgVU5CTE9DSzpcbiAgICAgIGlmICh1bmJsb2NrKSB7XG4gICAgICAgIHVuYmxvY2soKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZU5hdmlnYXRpb25BY3Rpb24gPSAoe1xuICBuZXh0LFxuICBhY3Rpb24sXG4gIGhpc3RvcnksXG4gIHF1ZXJ5XG59OiBIYW5kbGVOYXZBcmdzKSA9PiB7XG4gIC8vIFN5bmNocm9ub3VzbHkgZGlzcGF0Y2ggdGhlIG9yaWdpbmFsIGFjdGlvbiBzbyB0aGF0IHRoZVxuICAvLyByZWR1Y2VyIGNhbiBhZGQgaXQgdG8gaXRzIGxvY2F0aW9uIHF1ZXVlXG4gIGNvbnN0IG9yaWdpbmFsRGlzcGF0Y2ggPSBuZXh0KGFjdGlvbik7XG5cbiAgaWYgKFxuICAgIChhY3Rpb24udHlwZSA9PT0gUFVTSCB8fCBhY3Rpb24udHlwZSA9PT0gUkVQTEFDRSkgJiZcbiAgICBhY3Rpb24ucGF5bG9hZC5vcHRpb25zICYmXG4gICAgYWN0aW9uLnBheWxvYWQub3B0aW9ucy5wZXJzaXN0UXVlcnlcbiAgKSB7XG4gICAgbmF2aWdhdGUoaGlzdG9yeSwge1xuICAgICAgdHlwZTogYWN0aW9uLnR5cGUsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAgICAgICAuLi5tZXJnZVF1ZXJpZXMocXVlcnksIGFjdGlvbi5wYXlsb2FkLnF1ZXJ5KVxuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG5hdmlnYXRlKGhpc3RvcnksIGFjdGlvbik7XG4gIH1cblxuICByZXR1cm4gb3JpZ2luYWxEaXNwYXRjaDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICh7IGhpc3RvcnkgfTogTWlkZGxld2FyZUFyZ3MpID0+ICh7XG4gIGdldFN0YXRlXG59OiBTdG9yZTxTdGF0ZSwgKj4pID0+IChuZXh0OiBEaXNwYXRjaDwqPikgPT4gKGFjdGlvbjogUm91dGVyQWN0aW9uKSA9PiB7XG4gIGNvbnN0IHsgcXVlcnkgfSA9IGdldFN0YXRlKCkucm91dGVyO1xuICByZXR1cm4gaXNOYXZpZ2F0aW9uQWN0aW9uKGFjdGlvbilcbiAgICA/IGhhbmRsZU5hdmlnYXRpb25BY3Rpb24oeyBuZXh0LCBhY3Rpb24sIGhpc3RvcnksIHF1ZXJ5IH0pXG4gICAgOiBuZXh0KGFjdGlvbik7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbWlkZGxld2FyZS5qcyIsIi8vIEBmbG93XG5pbXBvcnQgdHlwZSB7XG4gIFN0b3JlQ3JlYXRvcixcbiAgUmVkdWNlcixcbiAgU3RvcmVFbmhhbmNlcixcbiAgRGlzcGF0Y2gsXG4gIFN0b3JlXG59IGZyb20gJ3JlZHV4JztcbmltcG9ydCB0eXBlIHsgSGlzdG9yeSwgQWN0aW9uLCBMb2NhdGlvbiBhcyBIaXN0b3J5TG9jYXRpb24gfSBmcm9tICdoaXN0b3J5JztcblxuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5pbXBvcnQgcXMgZnJvbSAncXVlcnktc3RyaW5nJztcblxuaW1wb3J0IHsgUE9QIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBsb2NhdGlvbkRpZENoYW5nZSwgZGlkUmVwbGFjZVJvdXRlcywgcmVwbGFjZSB9IGZyb20gJy4vYWN0aW9ucyc7XG5cbmltcG9ydCBtYXRjaENhY2hlIGZyb20gJy4vdXRpbC9tYXRjaC1jYWNoZSc7XG5cbnR5cGUgU3Vic2NyaWJlQXJncyA9IHtcbiAgZ2V0U3RhdGU6IEZ1bmN0aW9uLFxuICBkaXNwYXRjaDogRGlzcGF0Y2g8Kj4sXG4gIGNyZWF0ZU1hdGNoZXI6IEZ1bmN0aW9uLFxuICBtYXRjaFJvdXRlOiBGdW5jdGlvbixcbiAgc3Vic2NyaWJlVG9TdG9yZTogJFByb3BlcnR5VHlwZTxTdG9yZTwqLCAqPiwgJ3N1YnNjcmliZSc+LFxuICBzdWJzY3JpYmVUb0hpc3Rvcnk6ICRQcm9wZXJ0eVR5cGU8SGlzdG9yeSwgJ2xpc3Rlbic+XG59O1xuXG5leHBvcnQgdHlwZSBFbmhhbmNlckFyZ3MgPSB7fFxuICBoaXN0b3J5OiBIaXN0b3J5LFxuICBtYXRjaFJvdXRlOiBGdW5jdGlvbixcbiAgY3JlYXRlTWF0Y2hlcjogRnVuY3Rpb25cbnx9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3RvcmVTdWJzY3JpYmVyID0gKFxuICBnZXRTdGF0ZTogRnVuY3Rpb24sXG4gIGRpc3BhdGNoOiBEaXNwYXRjaDwqPixcbiAgY3JlYXRlTWF0Y2hlcjogRnVuY3Rpb25cbikgPT4gKGN1cnJlbnRNYXRjaGVyOiBGdW5jdGlvbikgPT4ge1xuICBjb25zdCB7IHJvdXRlcywgcGF0aG5hbWUsIHNlYXJjaCwgaGFzaCwgdXBkYXRlUm91dGVzIH0gPSBnZXRTdGF0ZSgpO1xuXG4gIGlmICh1cGRhdGVSb3V0ZXMpIHtcbiAgICBjdXJyZW50TWF0Y2hlciA9IGNyZWF0ZU1hdGNoZXIocm91dGVzKTtcbiAgICBkaXNwYXRjaChkaWRSZXBsYWNlUm91dGVzKCkpO1xuICAgIGRpc3BhdGNoKHJlcGxhY2UoeyBwYXRobmFtZSwgc2VhcmNoLCBoYXNoIH0pKTtcbiAgfVxuXG4gIHJldHVybiBjdXJyZW50TWF0Y2hlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVIaXN0b3J5TGlzdGVuZXIgPSAoZGlzcGF0Y2g6IERpc3BhdGNoPCo+KSA9PiAoXG4gIGN1cnJlbnRNYXRjaGVyOiBGdW5jdGlvbixcbiAgbG9jYXRpb246IEhpc3RvcnlMb2NhdGlvbixcbiAgYWN0aW9uPzogQWN0aW9uXG4pID0+IHtcbiAgbWF0Y2hDYWNoZS5jbGVhcigpO1xuXG4gIGNvbnN0IG1hdGNoID0gY3VycmVudE1hdGNoZXIobG9jYXRpb24ucGF0aG5hbWUpO1xuICBjb25zdCBwYXlsb2FkID0ge1xuICAgIC4uLmxvY2F0aW9uLFxuICAgIC4uLm1hdGNoLFxuICAgIHF1ZXJ5OiBxcy5wYXJzZShsb2NhdGlvbi5zZWFyY2ggfHwgJycpXG4gIH07XG5cbiAgLy8gT3RoZXIgYWN0aW9ucyBjb21lIGZyb20gdGhlIHVzZXIsIHNvIHRoZXkgYWxyZWFkeSBoYXZlIGFcbiAgLy8gY29ycmVzcG9uZGluZyBxdWV1ZWQgbmF2aWdhdGlvbiBhY3Rpb24uXG4gIGlmIChhY3Rpb24gPT09ICdQT1AnKSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogUE9QLFxuICAgICAgcGF5bG9hZFxuICAgIH0pO1xuICB9XG5cbiAgZGlzcGF0Y2gobG9jYXRpb25EaWRDaGFuZ2UocGF5bG9hZCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHN1YnNjcmliZVRvU3RvcmVBbmRIaXN0b3J5ID0gKHtcbiAgZ2V0U3RhdGUsXG4gIGRpc3BhdGNoLFxuICBjcmVhdGVNYXRjaGVyLFxuICBtYXRjaFJvdXRlLFxuICBzdWJzY3JpYmVUb1N0b3JlLFxuICBzdWJzY3JpYmVUb0hpc3Rvcnlcbn06IFN1YnNjcmliZUFyZ3MpID0+IHtcbiAgY29uc3Qgc3RvcmVTdWJzY3JpYmVyID0gY3JlYXRlU3RvcmVTdWJzY3JpYmVyKFxuICAgIGdldFN0YXRlLFxuICAgIGRpc3BhdGNoLFxuICAgIGNyZWF0ZU1hdGNoZXJcbiAgKTtcbiAgY29uc3QgaGlzdG9yeUxpc3RlbmVyID0gY3JlYXRlSGlzdG9yeUxpc3RlbmVyKGRpc3BhdGNoKTtcblxuICBsZXQgY3VycmVudE1hdGNoZXIgPSBtYXRjaFJvdXRlO1xuXG4gIC8vIFJlcGxhY2UgdGhlIG1hdGNoZXIgd2hlbiByZXBsYWNpbmcgcm91dGVzXG4gIHN1YnNjcmliZVRvU3RvcmUoKCkgPT4ge1xuICAgIGN1cnJlbnRNYXRjaGVyID0gc3RvcmVTdWJzY3JpYmVyKGN1cnJlbnRNYXRjaGVyKTtcbiAgfSk7XG5cbiAgc3Vic2NyaWJlVG9IaXN0b3J5KChsb2NhdGlvbiwgYWN0aW9uKSA9PlxuICAgIGhpc3RvcnlMaXN0ZW5lcihjdXJyZW50TWF0Y2hlciwgbG9jYXRpb24sIGFjdGlvbilcbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICh7IGhpc3RvcnksIG1hdGNoUm91dGUsIGNyZWF0ZU1hdGNoZXIgfTogRW5oYW5jZXJBcmdzKSA9PiAoXG4gIGNyZWF0ZVN0b3JlOiBTdG9yZUNyZWF0b3I8KiwgKj5cbikgPT4gKFxuICB1c2VyUmVkdWNlcjogUmVkdWNlcjwqLCAqPixcbiAgaW5pdGlhbFN0YXRlOiBTdGF0ZSxcbiAgZW5oYW5jZXI6IFN0b3JlRW5oYW5jZXI8KiwgKj5cbikgPT4ge1xuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHVzZXJSZWR1Y2VyLCBpbml0aWFsU3RhdGUsIGVuaGFuY2VyKTtcbiAgY29uc3QgeyBkaXNwYXRjaCwgc3Vic2NyaWJlOiBzdWJzY3JpYmVUb1N0b3JlIH0gPSBzdG9yZTtcbiAgY29uc3QgeyBsaXN0ZW46IHN1YnNjcmliZVRvSGlzdG9yeSB9ID0gaGlzdG9yeTtcblxuICBjb25zdCBnZXRTdGF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCByb3V0ZXJTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCkucm91dGVyO1xuICAgIGNvbnN0IHsgb3B0aW9uczogeyB1cGRhdGVSb3V0ZXMgfSA9IHt9IH0gPSByb3V0ZXJTdGF0ZTtcbiAgICByZXR1cm4geyAuLi5yb3V0ZXJTdGF0ZSwgdXBkYXRlUm91dGVzIH07XG4gIH07XG5cbiAgc3Vic2NyaWJlVG9TdG9yZUFuZEhpc3Rvcnkoe1xuICAgIGdldFN0YXRlLFxuICAgIGRpc3BhdGNoLFxuICAgIGNyZWF0ZU1hdGNoZXIsXG4gICAgbWF0Y2hSb3V0ZSxcbiAgICBzdWJzY3JpYmVUb1N0b3JlLFxuICAgIHN1YnNjcmliZVRvSGlzdG9yeVxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0b3JlLFxuICAgIG1hdGNoUm91dGVcbiAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9lbmhhbmNlci5qcyIsIi8vIEBmbG93XG5pbXBvcnQgdHlwZSB7IEhpc3RvcnkgfSBmcm9tICdoaXN0b3J5JztcbmltcG9ydCB0eXBlIHsgTG9jYXRpb24gfSBmcm9tICcuLi90eXBlcyc7XG5cbmltcG9ydCB7IGRlZmF1bHQgYXMgbWF0Y2hlckZhY3RvcnkgfSBmcm9tICcuLi91dGlsL2NyZWF0ZS1tYXRjaGVyJztcbmltcG9ydCB2YWxpZGF0ZVJvdXRlcyBmcm9tICcuLi91dGlsL3ZhbGlkYXRlLXJvdXRlcyc7XG5pbXBvcnQgZmxhdHRlblJvdXRlcyBmcm9tICcuLi91dGlsL2ZsYXR0ZW4tcm91dGVzJztcblxudHlwZSBDcmVhdGVJbnN0YWxsQXJncyA9IHt8XG4gIHJlZHVjZXI6IEZ1bmN0aW9uLFxuICBtaWRkbGV3YXJlOiBGdW5jdGlvbixcbiAgZW5oYW5jZXI6IEZ1bmN0aW9uXG58fTtcblxudHlwZSBJbnN0YWxsQXJncyA9IHt8XG4gIHJvdXRlczogT2JqZWN0LFxuICBoaXN0b3J5OiBIaXN0b3J5LFxuICBsb2NhdGlvbjogTG9jYXRpb24sXG4gIGNyZWF0ZU1hdGNoZXI/OiBGdW5jdGlvblxufH07XG5cbmV4cG9ydCBkZWZhdWx0ICh7IHJlZHVjZXIsIG1pZGRsZXdhcmUsIGVuaGFuY2VyIH06IENyZWF0ZUluc3RhbGxBcmdzKSA9PiAoe1xuICByb3V0ZXM6IG5lc3RlZFJvdXRlcyxcbiAgaGlzdG9yeSxcbiAgbG9jYXRpb24sXG4gIGNyZWF0ZU1hdGNoZXIgPSBtYXRjaGVyRmFjdG9yeVxufTogSW5zdGFsbEFyZ3MpID0+IHtcbiAgdmFsaWRhdGVSb3V0ZXMobmVzdGVkUm91dGVzKTtcbiAgY29uc3Qgcm91dGVzID0gZmxhdHRlblJvdXRlcyhuZXN0ZWRSb3V0ZXMpO1xuICBjb25zdCBtYXRjaFJvdXRlID0gY3JlYXRlTWF0Y2hlcihyb3V0ZXMpO1xuXG4gIHJldHVybiB7XG4gICAgcmVkdWNlcjogcmVkdWNlcih7XG4gICAgICByb3V0ZXMsXG4gICAgICBpbml0aWFsTG9jYXRpb246IHtcbiAgICAgICAgLi4ubG9jYXRpb24sXG4gICAgICAgIC4uLm1hdGNoUm91dGUobG9jYXRpb24ucGF0aG5hbWUpXG4gICAgICB9XG4gICAgfSksXG4gICAgbWlkZGxld2FyZTogbWlkZGxld2FyZSh7IGhpc3RvcnkgfSksXG4gICAgZW5oYW5jZXI6IGVuaGFuY2VyKHtcbiAgICAgIGhpc3RvcnksXG4gICAgICBtYXRjaFJvdXRlLFxuICAgICAgY3JlYXRlTWF0Y2hlclxuICAgIH0pXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbC9jcmVhdGUtaW5zdGFsbGVyLmpzIiwiLy8gQGZsb3dcbmltcG9ydCBVcmxQYXR0ZXJuIGZyb20gJ3VybC1wYXR0ZXJuJztcblxudHlwZSBSb3V0ZUNhY2hlID0ge1xuICByb3V0ZTogc3RyaW5nLFxuICBwYXR0ZXJuOiBVcmxQYXR0ZXJuLFxuICByZXN1bHQ6IE9iamVjdFxufTtcblxuY29uc3QgaGFzVHJhaWxpbmdTbGFzaCA9IC9cXHcrXFwvJC87XG5cbmNvbnN0IGVhZ2VyTWF0Y2hlciA9IChyb3V0ZUxpc3Q6IEFycmF5PFJvdXRlQ2FjaGU+KSA9PiAoXG4gIGluY29taW5nVXJsOiBzdHJpbmdcbikgPT4ge1xuICAvLyBEaXNjYXJkIHF1ZXJ5IHN0cmluZ3NcbiAgY29uc3QgcGF0aG5hbWUgPSBpbmNvbWluZ1VybFxuICAgIC5zcGxpdCgnPycpWzBdXG4gICAgLnJlcGxhY2UoaGFzVHJhaWxpbmdTbGFzaCwgcGF0aCA9PiBwYXRoLnNsaWNlKDAsIHBhdGgubGVuZ3RoIC0gMSkpO1xuXG4gIC8vIEZpbmQgdGhlIHJvdXRlIHRoYXQgbWF0Y2hlcyB0aGUgVVJMXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgc3RvcmVkUm91dGUgPSByb3V0ZUxpc3RbaV07XG4gICAgY29uc3QgbWF0Y2ggPSBzdG9yZWRSb3V0ZS5wYXR0ZXJuLm1hdGNoKHBhdGhuYW1lKTtcblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgLy8gUmV0dXJuIHRoZSBtYXRjaGVkIHBhcmFtcyBhbmQgdXNlci1kZWZpbmVkIHJlc3VsdCBvYmplY3RcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvdXRlOiBzdG9yZWRSb3V0ZS5yb3V0ZSxcbiAgICAgICAgcGFyYW1zOiBtYXRjaCxcbiAgICAgICAgcmVzdWx0OiBzdG9yZWRSb3V0ZS5yZXN1bHRcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAocm91dGVzOiBPYmplY3QpID0+IHtcbiAgY29uc3Qgcm91dGVMaXN0ID0gT2JqZWN0LmtleXMocm91dGVzKVxuICAgIC5zb3J0KClcbiAgICAucmV2ZXJzZSgpXG4gICAgLm1hcChyb3V0ZSA9PiAoe1xuICAgICAgcm91dGUsXG4gICAgICBwYXR0ZXJuOiBuZXcgVXJsUGF0dGVybihyb3V0ZSksXG4gICAgICByZXN1bHQ6IHJvdXRlc1tyb3V0ZV1cbiAgICB9KSk7XG5cbiAgcmV0dXJuIGVhZ2VyTWF0Y2hlcihyb3V0ZUxpc3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWwvY3JlYXRlLW1hdGNoZXIuanMiLCIvKiBnbG9iYWxzIF9fd2VicGFja19hbWRfb3B0aW9uc19fICovXHJcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vYW1kLW9wdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5pbXBvcnQgdGhyb3dFcnJvciBmcm9tICcuL3Rocm93LWVycm9yJztcblxuZXhwb3J0IGNvbnN0IFJFQURNRV9NRVNTQUdFID0gYFxuICBTZWUgdGhlIFJFQURNRSBmb3IgbW9yZSBpbmZvcm1hdGlvbjpcbiAgaHR0cHM6Ly9naXRodWIuY29tL0Zvcm1pZGFibGVMYWJzL3JlZHV4LWxpdHRsZS1yb3V0ZXIjd2lyaW5nLXVwLXRoZS1ib2lsZXJwbGF0ZVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgKHJvdXRlczogT2JqZWN0KSA9PiB7XG4gIGlmICghcm91dGVzKSB7XG4gICAgdGhyb3dFcnJvcihgXG4gICAgICBNaXNzaW5nIHJvdXRlIGNvbmZpZ3VyYXRpb24uIFlvdSBtdXN0IGRlZmluZSB5b3VyIHJvdXRlcyBhc1xuICAgICAgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSByb3V0ZXMgYW5kIHRoZSB2YWx1ZXMgYXJlIGFueVxuICAgICAgcm91dGUtc3BlY2lmaWMgZGF0YS5cblxuICAgICAgJHtSRUFETUVfTUVTU0FHRX1cbiAgICBgKSgpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW1hZ2ljLW51bWJlcnNcbiAgaWYgKCFPYmplY3Qua2V5cyhyb3V0ZXMpLmV2ZXJ5KHJvdXRlID0+IHJvdXRlLmluZGV4T2YoJy8nKSA9PT0gMCkpIHtcbiAgICB0aHJvd0Vycm9yKGBcbiAgICAgIFRoZSByb3V0ZSBjb25maWd1cmF0aW9uIHlvdSBwcm92aWRlZCBpcyBtYWxmb3JtZWQuIE1ha2Ugc3VyZVxuICAgICAgdGhhdCBhbGwgb2YgeW91ciByb3V0ZXMgc3RhcnQgd2l0aCBhIHNsYXNoLlxuXG4gICAgICAke1JFQURNRV9NRVNTQUdFfVxuICAgIGApKCk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlsL3ZhbGlkYXRlLXJvdXRlcy5qcyIsIi8vIEBmbG93XG5pbXBvcnQgdHlwZSB7IEhpc3RvcnksIEhhc2hIaXN0b3J5T3B0aW9ucyB9IGZyb20gJ2hpc3RvcnknO1xuaW1wb3J0IGNyZWF0ZUhhc2hIaXN0b3J5IGZyb20gJ2hpc3RvcnkvY3JlYXRlSGFzaEhpc3RvcnknO1xuXG5pbXBvcnQgbm9ybWFsaXplSHJlZiBmcm9tICcuLi91dGlsL25vcm1hbGl6ZS1ocmVmJztcbmltcG9ydCBpbnN0YWxsIGZyb20gJy4uL2luc3RhbGwnO1xuXG50eXBlIEhhc2hSb3V0ZXJBcmdzID0ge1xuICByb3V0ZXM6IE9iamVjdCxcbiAgYmFzZW5hbWU6IHN0cmluZyxcbiAgaGFzaFR5cGU6IHN0cmluZyxcbiAgaGlzdG9yeU9wdGlvbnM6IEhhc2hIaXN0b3J5T3B0aW9ucyxcbiAgaGlzdG9yeTogSGlzdG9yeVxufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUhhc2hSb3V0ZXIgPSAoaW5zdGFsbGVyOiBGdW5jdGlvbikgPT4gKHtcbiAgcm91dGVzLFxuICBiYXNlbmFtZSxcbiAgaGFzaFR5cGUgPSAnc2xhc2gnLFxuICBoaXN0b3J5T3B0aW9ucyxcbiAgaGlzdG9yeSA9IGNyZWF0ZUhhc2hIaXN0b3J5KHsgYmFzZW5hbWUsIGhhc2hUeXBlLCAuLi5oaXN0b3J5T3B0aW9ucyB9KVxufTogSGFzaFJvdXRlckFyZ3MpID0+IHtcbiAgY29uc3QgZGVzY3JpcHRvciA9IGJhc2VuYW1lXG4gICAgPyB7IGJhc2VuYW1lLCAuLi5oaXN0b3J5LmxvY2F0aW9uIH1cbiAgICA6IGhpc3RvcnkubG9jYXRpb247XG5cbiAgY29uc3QgbG9jYXRpb24gPSBub3JtYWxpemVIcmVmKGRlc2NyaXB0b3IpO1xuXG4gIHJldHVybiBpbnN0YWxsZXIoeyByb3V0ZXMsIGhpc3RvcnksIGxvY2F0aW9uIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSGFzaFJvdXRlcihpbnN0YWxsKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Vudmlyb25tZW50L2hhc2gtcm91dGVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi93YXJuQWJvdXREZXByZWNhdGVkQ0pTUmVxdWlyZS5qcycpKCdjcmVhdGVIYXNoSGlzdG9yeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2luZGV4LmpzJykuY3JlYXRlSGFzaEhpc3Rvcnk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9jcmVhdGVIYXNoSGlzdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCB0eXBlIHsgTWVtb3J5SGlzdG9yeU9wdGlvbnMgfSBmcm9tICdoaXN0b3J5JztcblxuaW1wb3J0IGNyZWF0ZU1lbW9yeUhpc3RvcnkgZnJvbSAnaGlzdG9yeS9jcmVhdGVNZW1vcnlIaXN0b3J5JztcblxuaW1wb3J0IG5vcm1hbGl6ZUhyZWYgZnJvbSAnLi4vdXRpbC9ub3JtYWxpemUtaHJlZic7XG5pbXBvcnQgaW5zdGFsbCBmcm9tICcuLi9pbnN0YWxsJztcblxudHlwZSBTZXJ2ZXJSb3V0ZXJBcmdzID0ge1xuICByb3V0ZXM6IE9iamVjdCxcbiAgcmVxdWVzdDoge1xuICAgIHBhdGg6IHN0cmluZyxcbiAgICBiYXNlVXJsOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcXVlcnk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH1cbiAgfSxcbiAgaGlzdG9yeU9wdGlvbnM6IE1lbW9yeUhpc3RvcnlPcHRpb25zXG59O1xuXG5jb25zdCBsb2NhdGlvbkZvclJlcXVlc3QgPSByZXF1ZXN0ID0+IHtcbiAgY29uc3QgeyBwYXRoOiBwYXRobmFtZSwgYmFzZVVybDogYmFzZW5hbWUsIHF1ZXJ5IH0gPSByZXF1ZXN0O1xuICBjb25zdCBkZXNjcmlwdG9yID0gYmFzZW5hbWVcbiAgICA/IHsgcGF0aG5hbWUsIGJhc2VuYW1lLCBxdWVyeSB9XG4gICAgOiB7IHBhdGhuYW1lLCBxdWVyeSB9O1xuICByZXR1cm4gbm9ybWFsaXplSHJlZihkZXNjcmlwdG9yKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFeHByZXNzUm91dGVyID0gKGluc3RhbGxlcjogRnVuY3Rpb24pID0+ICh7XG4gIHJvdXRlcyxcbiAgcmVxdWVzdCxcbiAgaGlzdG9yeU9wdGlvbnMgPSB7fVxufTogU2VydmVyUm91dGVyQXJncykgPT4ge1xuICBjb25zdCBoaXN0b3J5ID0gY3JlYXRlTWVtb3J5SGlzdG9yeShoaXN0b3J5T3B0aW9ucyk7XG4gIGNvbnN0IGxvY2F0aW9uID0gbG9jYXRpb25Gb3JSZXF1ZXN0KHJlcXVlc3QpO1xuXG4gIHJldHVybiBpbnN0YWxsZXIoeyByb3V0ZXMsIGhpc3RvcnksIGxvY2F0aW9uIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRXhwcmVzc1JvdXRlcihpbnN0YWxsKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Vudmlyb25tZW50L2V4cHJlc3Mtcm91dGVyLmpzIiwiLy8gQGZsb3dcbmltcG9ydCB0eXBlIHsgTWVtb3J5SGlzdG9yeU9wdGlvbnMgfSBmcm9tICdoaXN0b3J5JztcblxuaW1wb3J0IGNyZWF0ZU1lbW9yeUhpc3RvcnkgZnJvbSAnaGlzdG9yeS9jcmVhdGVNZW1vcnlIaXN0b3J5JztcblxuaW1wb3J0IG5vcm1hbGl6ZUhyZWYgZnJvbSAnLi4vdXRpbC9ub3JtYWxpemUtaHJlZic7XG5pbXBvcnQgaW5zdGFsbCBmcm9tICcuLi9pbnN0YWxsJztcblxudHlwZSBTZXJ2ZXJSb3V0ZXJBcmdzID0ge1xuICByb3V0ZXM6IE9iamVjdCxcbiAgcmVxdWVzdDoge1xuICAgIHBhdGg6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBxdWVyeTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfVxuICB9LFxuICBoaXN0b3J5T3B0aW9uczogTWVtb3J5SGlzdG9yeU9wdGlvbnNcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVIYXBpUm91dGVyID0gKGluc3RhbGxlcjogRnVuY3Rpb24pID0+ICh7XG4gIHJvdXRlcyxcbiAgcmVxdWVzdCxcbiAgaGlzdG9yeU9wdGlvbnMgPSB7fVxufTogU2VydmVyUm91dGVyQXJncykgPT4ge1xuICBjb25zdCBoaXN0b3J5ID0gY3JlYXRlTWVtb3J5SGlzdG9yeShoaXN0b3J5T3B0aW9ucyk7XG5cbiAgY29uc3QgbG9jYXRpb24gPSBub3JtYWxpemVIcmVmKHtcbiAgICBwYXRobmFtZTogcmVxdWVzdC5wYXRoLFxuICAgIHF1ZXJ5OiByZXF1ZXN0LnF1ZXJ5XG4gIH0pO1xuXG4gIHJldHVybiBpbnN0YWxsZXIoeyByb3V0ZXMsIGhpc3RvcnksIGxvY2F0aW9uIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSGFwaVJvdXRlcihpbnN0YWxsKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Vudmlyb25tZW50L2hhcGktcm91dGVyLmpzIiwiLy8gQGZsb3dcbmltcG9ydCB0eXBlIHsgTm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgSHJlZiwgTG9jYXRpb24gfSBmcm9tICcuLi90eXBlcyc7XG5cbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgcHVzaCBhcyBwdXNoQWN0aW9uLCByZXBsYWNlIGFzIHJlcGxhY2VBY3Rpb24gfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCBtZXJnZVF1ZXJpZXMgZnJvbSAnLi4vdXRpbC9tZXJnZS1xdWVyaWVzJztcbmltcG9ydCBub3JtYWxpemVIcmVmIGZyb20gJy4uL3V0aWwvbm9ybWFsaXplLWhyZWYnO1xuaW1wb3J0IHN0cmluZ2lmeUhyZWYgZnJvbSAnLi4vdXRpbC9zdHJpbmdpZnktaHJlZic7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBOb2RlLFxuICBjbGFzc05hbWU6IHN0cmluZyxcbiAgaHJlZjogSHJlZixcbiAgcGVyc2lzdFF1ZXJ5OiBib29sZWFuLFxuICByZXBsYWNlU3RhdGU6IGJvb2xlYW4sXG4gIHRhcmdldDogc3RyaW5nLFxuICBvbkNsaWNrOiBFdmVudEhhbmRsZXIsXG4gIHN0eWxlOiBPYmplY3QsXG4gIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgcHVzaDogdHlwZW9mIHB1c2hBY3Rpb24sXG4gIHJlcGxhY2U6IHR5cGVvZiByZXBsYWNlQWN0aW9uLFxuICAvLyBUT0RPOiByZXBsYWNlIHdpdGggcmVjdXJzaXZlIFByb3BzIGRlZmluaXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3lhbm5pY2tjci9lc2xpbnQtcGx1Z2luLXJlYWN0L2lzc3Vlcy85MTNcbiAgYWN0aXZlUHJvcHM6IE9iamVjdFxufTtcblxuY29uc3QgTEVGVF9NT1VTRV9CVVRUT04gPSAwO1xuXG5jb25zdCBpc05vdExlZnRDbGljayA9IGUgPT4gZS5idXR0b24gJiYgZS5idXR0b24gIT09IExFRlRfTU9VU0VfQlVUVE9OO1xuXG5jb25zdCBoYXNNb2RpZmllciA9IGUgPT5cbiAgQm9vbGVhbihlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5IHx8IGUubWV0YUtleSB8fCBlLmN0cmxLZXkpO1xuXG5jb25zdCBzaG91bGRJZ25vcmVDbGljayA9ICh7IGUsIHRhcmdldCB9KSA9PlxuICBoYXNNb2RpZmllcihlKSB8fCBpc05vdExlZnRDbGljayhlKSB8fCBlLmRlZmF1bHRQcmV2ZW50ZWQgfHwgdGFyZ2V0O1xuXG5jb25zdCBoYW5kbGVDbGljayA9ICh7XG4gIGUsXG4gIHRhcmdldCxcbiAgaHJlZixcbiAgb25DbGljayxcbiAgcmVwbGFjZVN0YXRlLFxuICBwZXJzaXN0UXVlcnksXG4gIHB1c2gsXG4gIHJlcGxhY2Vcbn0pID0+IHtcbiAgaWYgKG9uQ2xpY2spIHtcbiAgICBvbkNsaWNrKGUpO1xuICB9XG5cbiAgaWYgKHNob3VsZElnbm9yZUNsaWNrKHsgZSwgdGFyZ2V0IH0pKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IG5hdmlnYXRlID0gcmVwbGFjZVN0YXRlID8gcmVwbGFjZSA6IHB1c2g7XG4gIG5hdmlnYXRlKGhyZWYsIHsgcGVyc2lzdFF1ZXJ5IH0pO1xufTtcblxuLy8gV2hlbiBwZXJzaXN0aW5nIHF1ZXJpZXMsIHdlIG5lZWQgdG8gbWVyZ2UgdGhlIHBlcnNpc3RlZFxuLy8gcXVlcnkgd2l0aCB0aGUgbGluaydzIG5ldyBxdWVyeS5cbmNvbnN0IGNvbnRleHRpZnlIcmVmID0gKGhyZWYsIGxvY2F0aW9uLCBwZXJzaXN0UXVlcnkpID0+IHtcbiAgaWYgKCFwZXJzaXN0UXVlcnkpIHtcbiAgICByZXR1cm4gaHJlZjtcbiAgfVxuXG4gIGNvbnN0IG1lcmdlZFF1ZXJ5ID0gbWVyZ2VRdWVyaWVzKGxvY2F0aW9uLnF1ZXJ5LCBocmVmLnF1ZXJ5KTtcblxuICByZXR1cm4ge1xuICAgIC4uLmhyZWYsXG4gICAgLi4ubWVyZ2VkUXVlcnlcbiAgfTtcbn07XG5cbmNsYXNzIExpbmtDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQ8Kj4ge1xuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgaHJlZjogcmF3SHJlZixcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBvbkNsaWNrLFxuICAgICAgdGFyZ2V0LFxuICAgICAgYWN0aXZlUHJvcHMsXG4gICAgICByZXBsYWNlU3RhdGUsXG4gICAgICBwZXJzaXN0UXVlcnksXG4gICAgICBwdXNoLFxuICAgICAgcmVwbGFjZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vIEVuc3VyZSB0aGUgaHJlZiBoYXMgYm90aCBhIHNlYXJjaCBhbmQgYSBxdWVyeSB3aGVuIG5lZWRlZFxuICAgIGNvbnN0IG5vcm1hbGl6ZWRIcmVmID0gbm9ybWFsaXplSHJlZihyYXdIcmVmKTtcbiAgICBjb25zdCBocmVmID0gY29udGV4dGlmeUhyZWYobm9ybWFsaXplZEhyZWYsIGxvY2F0aW9uLCBwZXJzaXN0UXVlcnkpO1xuICAgIGNvbnN0IGlzQWN0aXZlID0gaHJlZi5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgY29uc3QgYWN0aXZlUmVzdCA9IChpc0FjdGl2ZSAmJiBhY3RpdmVQcm9wcykgfHwge307XG5cbiAgICBjb25zdCBjbGlja0hhbmRsZXIgPSBlID0+XG4gICAgICBoYW5kbGVDbGljayh7XG4gICAgICAgIGUsXG4gICAgICAgIHRhcmdldCxcbiAgICAgICAgaHJlZixcbiAgICAgICAgb25DbGljayxcbiAgICAgICAgcmVwbGFjZVN0YXRlLFxuICAgICAgICBwZXJzaXN0UXVlcnksXG4gICAgICAgIHB1c2gsXG4gICAgICAgIHJlcGxhY2VcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxhXG4gICAgICAgIGhyZWY9e3N0cmluZ2lmeUhyZWYoaHJlZiwgbG9jYXRpb24uYmFzZW5hbWUpfVxuICAgICAgICBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9XG4gICAgICAgIHRhcmdldD17dGFyZ2V0fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgey4uLmFjdGl2ZVJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvYT5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IFBlcnNpc3RlbnRRdWVyeUxpbmtDb21wb25lbnQgPSBjbGFzcyBleHRlbmRzIENvbXBvbmVudDwqPiB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5yZXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8TGlua0NvbXBvbmVudCB7Li4ucmVzdH0gcGVyc2lzdFF1ZXJ5PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0xpbmtDb21wb25lbnQ+XG4gICAgKTtcbiAgfVxufTtcblxuUGVyc2lzdGVudFF1ZXJ5TGlua0NvbXBvbmVudC5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZVxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKHsgbG9jYXRpb246IHN0YXRlLnJvdXRlciB9KTtcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgcHVzaDogcHVzaEFjdGlvbixcbiAgcmVwbGFjZTogcmVwbGFjZUFjdGlvblxufTtcbmNvbnN0IHdpdGhMb2NhdGlvbiA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5jb25zdCBMaW5rV2l0aExvY2F0aW9uID0gd2l0aExvY2F0aW9uKExpbmtDb21wb25lbnQpO1xuY29uc3QgUGVyc2lzdGVudFF1ZXJ5TGlua1dpdGhMb2NhdGlvbiA9IHdpdGhMb2NhdGlvbihcbiAgUGVyc2lzdGVudFF1ZXJ5TGlua0NvbXBvbmVudFxuKTtcblxuZXhwb3J0IHtcbiAgTGlua1dpdGhMb2NhdGlvbiBhcyBMaW5rLFxuICBQZXJzaXN0ZW50UXVlcnlMaW5rV2l0aExvY2F0aW9uIGFzIFBlcnNpc3RlbnRRdWVyeUxpbmssXG4gIExpbmtDb21wb25lbnQsXG4gIFBlcnNpc3RlbnRRdWVyeUxpbmtDb21wb25lbnQsXG4gIG1hcERpc3BhdGNoVG9Qcm9wc1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbGluay5qcyIsImltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZVwiO1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgQ2hpbGRyZW4gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgc3RvcmVTaGFwZSwgc3Vic2NyaXB0aW9uU2hhcGUgfSBmcm9tICcuLi91dGlscy9Qcm9wVHlwZXMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi4vdXRpbHMvd2FybmluZyc7XG52YXIgcHJlZml4VW5zYWZlTGlmZWN5Y2xlTWV0aG9kcyA9IHR5cGVvZiBSZWFjdC5mb3J3YXJkUmVmICE9PSBcInVuZGVmaW5lZFwiO1xudmFyIGRpZFdhcm5BYm91dFJlY2VpdmluZ1N0b3JlID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHdhcm5BYm91dFJlY2VpdmluZ1N0b3JlKCkge1xuICBpZiAoZGlkV2FybkFib3V0UmVjZWl2aW5nU3RvcmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkaWRXYXJuQWJvdXRSZWNlaXZpbmdTdG9yZSA9IHRydWU7XG4gIHdhcm5pbmcoJzxQcm92aWRlcj4gZG9lcyBub3Qgc3VwcG9ydCBjaGFuZ2luZyBgc3RvcmVgIG9uIHRoZSBmbHkuICcgKyAnSXQgaXMgbW9zdCBsaWtlbHkgdGhhdCB5b3Ugc2VlIHRoaXMgZXJyb3IgYmVjYXVzZSB5b3UgdXBkYXRlZCB0byAnICsgJ1JlZHV4IDIueCBhbmQgUmVhY3QgUmVkdXggMi54IHdoaWNoIG5vIGxvbmdlciBob3QgcmVsb2FkIHJlZHVjZXJzICcgKyAnYXV0b21hdGljYWxseS4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9yZWR1eGpzL3JlYWN0LXJlZHV4L3JlbGVhc2VzLycgKyAndGFnL3YyLjAuMCBmb3IgdGhlIG1pZ3JhdGlvbiBpbnN0cnVjdGlvbnMuJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm92aWRlcihzdG9yZUtleSkge1xuICB2YXIgX1Byb3ZpZGVyJGNoaWxkQ29udGV4O1xuXG4gIGlmIChzdG9yZUtleSA9PT0gdm9pZCAwKSB7XG4gICAgc3RvcmVLZXkgPSAnc3RvcmUnO1xuICB9XG5cbiAgdmFyIHN1YnNjcmlwdGlvbktleSA9IHN0b3JlS2V5ICsgXCJTdWJzY3JpcHRpb25cIjtcblxuICB2YXIgUHJvdmlkZXIgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzTG9vc2UoUHJvdmlkZXIsIF9Db21wb25lbnQpO1xuXG4gICAgdmFyIF9wcm90byA9IFByb3ZpZGVyLnByb3RvdHlwZTtcblxuICAgIF9wcm90by5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgcmV0dXJuIF9yZWYgPSB7fSwgX3JlZltzdG9yZUtleV0gPSB0aGlzW3N0b3JlS2V5XSwgX3JlZltzdWJzY3JpcHRpb25LZXldID0gbnVsbCwgX3JlZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUHJvdmlkZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgIHZhciBfdGhpcztcblxuICAgICAgX3RoaXMgPSBfQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICBfdGhpc1tzdG9yZUtleV0gPSBwcm9wcy5zdG9yZTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIENoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfTtcblxuICAgIHJldHVybiBQcm92aWRlcjtcbiAgfShDb21wb25lbnQpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gVXNlIFVOU0FGRV8gZXZlbnQgbmFtZSB3aGVyZSBzdXBwb3J0ZWRcbiAgICB2YXIgZXZlbnROYW1lID0gcHJlZml4VW5zYWZlTGlmZWN5Y2xlTWV0aG9kcyA/ICdVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycgOiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyc7XG5cbiAgICBQcm92aWRlci5wcm90b3R5cGVbZXZlbnROYW1lXSA9IGZ1bmN0aW9uIChuZXh0UHJvcHMpIHtcbiAgICAgIGlmICh0aGlzW3N0b3JlS2V5XSAhPT0gbmV4dFByb3BzLnN0b3JlKSB7XG4gICAgICAgIHdhcm5BYm91dFJlY2VpdmluZ1N0b3JlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIFByb3ZpZGVyLnByb3BUeXBlcyA9IHtcbiAgICBzdG9yZTogc3RvcmVTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuZWxlbWVudC5pc1JlcXVpcmVkXG4gIH07XG4gIFByb3ZpZGVyLmNoaWxkQ29udGV4dFR5cGVzID0gKF9Qcm92aWRlciRjaGlsZENvbnRleCA9IHt9LCBfUHJvdmlkZXIkY2hpbGRDb250ZXhbc3RvcmVLZXldID0gc3RvcmVTaGFwZS5pc1JlcXVpcmVkLCBfUHJvdmlkZXIkY2hpbGRDb250ZXhbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvblNoYXBlLCBfUHJvdmlkZXIkY2hpbGRDb250ZXgpO1xuICByZXR1cm4gUHJvdmlkZXI7XG59XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQcm92aWRlcigpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL1Byb3ZpZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjEwLjJcbiAqIHJlYWN0LWlzLnByb2R1Y3Rpb24ubWluLmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO1xudmFyIGI9XCJmdW5jdGlvblwiPT09dHlwZW9mIFN5bWJvbCYmU3ltYm9sLmZvcixjPWI/U3ltYm9sLmZvcihcInJlYWN0LmVsZW1lbnRcIik6NjAxMDMsZD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5wb3J0YWxcIik6NjAxMDYsZT1iP1N5bWJvbC5mb3IoXCJyZWFjdC5mcmFnbWVudFwiKTo2MDEwNyxmPWI/U3ltYm9sLmZvcihcInJlYWN0LnN0cmljdF9tb2RlXCIpOjYwMTA4LGc9Yj9TeW1ib2wuZm9yKFwicmVhY3QucHJvZmlsZXJcIik6NjAxMTQsaD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5wcm92aWRlclwiKTo2MDEwOSxrPWI/U3ltYm9sLmZvcihcInJlYWN0LmNvbnRleHRcIik6NjAxMTAsbD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5hc3luY19tb2RlXCIpOjYwMTExLG09Yj9TeW1ib2wuZm9yKFwicmVhY3QuY29uY3VycmVudF9tb2RlXCIpOjYwMTExLG49Yj9TeW1ib2wuZm9yKFwicmVhY3QuZm9yd2FyZF9yZWZcIik6NjAxMTIscD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5zdXNwZW5zZVwiKTo2MDExMyxxPWI/U3ltYm9sLmZvcihcInJlYWN0LnN1c3BlbnNlX2xpc3RcIik6XG42MDEyMCxyPWI/U3ltYm9sLmZvcihcInJlYWN0Lm1lbW9cIik6NjAxMTUsdD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5sYXp5XCIpOjYwMTE2LHY9Yj9TeW1ib2wuZm9yKFwicmVhY3QuZnVuZGFtZW50YWxcIik6NjAxMTcsdz1iP1N5bWJvbC5mb3IoXCJyZWFjdC5yZXNwb25kZXJcIik6NjAxMTgseD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5zY29wZVwiKTo2MDExOTtmdW5jdGlvbiB5KGEpe2lmKFwib2JqZWN0XCI9PT10eXBlb2YgYSYmbnVsbCE9PWEpe3ZhciB1PWEuJCR0eXBlb2Y7c3dpdGNoKHUpe2Nhc2UgYzpzd2l0Y2goYT1hLnR5cGUsYSl7Y2FzZSBsOmNhc2UgbTpjYXNlIGU6Y2FzZSBnOmNhc2UgZjpjYXNlIHA6cmV0dXJuIGE7ZGVmYXVsdDpzd2l0Y2goYT1hJiZhLiQkdHlwZW9mLGEpe2Nhc2UgazpjYXNlIG46Y2FzZSBoOnJldHVybiBhO2RlZmF1bHQ6cmV0dXJuIHV9fWNhc2UgdDpjYXNlIHI6Y2FzZSBkOnJldHVybiB1fX19ZnVuY3Rpb24geihhKXtyZXR1cm4geShhKT09PW19XG5leHBvcnRzLnR5cGVPZj15O2V4cG9ydHMuQXN5bmNNb2RlPWw7ZXhwb3J0cy5Db25jdXJyZW50TW9kZT1tO2V4cG9ydHMuQ29udGV4dENvbnN1bWVyPWs7ZXhwb3J0cy5Db250ZXh0UHJvdmlkZXI9aDtleHBvcnRzLkVsZW1lbnQ9YztleHBvcnRzLkZvcndhcmRSZWY9bjtleHBvcnRzLkZyYWdtZW50PWU7ZXhwb3J0cy5MYXp5PXQ7ZXhwb3J0cy5NZW1vPXI7ZXhwb3J0cy5Qb3J0YWw9ZDtleHBvcnRzLlByb2ZpbGVyPWc7ZXhwb3J0cy5TdHJpY3RNb2RlPWY7ZXhwb3J0cy5TdXNwZW5zZT1wO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGU9ZnVuY3Rpb24oYSl7cmV0dXJuXCJzdHJpbmdcIj09PXR5cGVvZiBhfHxcImZ1bmN0aW9uXCI9PT10eXBlb2YgYXx8YT09PWV8fGE9PT1tfHxhPT09Z3x8YT09PWZ8fGE9PT1wfHxhPT09cXx8XCJvYmplY3RcIj09PXR5cGVvZiBhJiZudWxsIT09YSYmKGEuJCR0eXBlb2Y9PT10fHxhLiQkdHlwZW9mPT09cnx8YS4kJHR5cGVvZj09PWh8fGEuJCR0eXBlb2Y9PT1rfHxhLiQkdHlwZW9mPT09bnx8YS4kJHR5cGVvZj09PXZ8fGEuJCR0eXBlb2Y9PT13fHxhLiQkdHlwZW9mPT09eCl9O2V4cG9ydHMuaXNBc3luY01vZGU9ZnVuY3Rpb24oYSl7cmV0dXJuIHooYSl8fHkoYSk9PT1sfTtleHBvcnRzLmlzQ29uY3VycmVudE1vZGU9ejtleHBvcnRzLmlzQ29udGV4dENvbnN1bWVyPWZ1bmN0aW9uKGEpe3JldHVybiB5KGEpPT09a307ZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlcj1mdW5jdGlvbihhKXtyZXR1cm4geShhKT09PWh9O1xuZXhwb3J0cy5pc0VsZW1lbnQ9ZnVuY3Rpb24oYSl7cmV0dXJuXCJvYmplY3RcIj09PXR5cGVvZiBhJiZudWxsIT09YSYmYS4kJHR5cGVvZj09PWN9O2V4cG9ydHMuaXNGb3J3YXJkUmVmPWZ1bmN0aW9uKGEpe3JldHVybiB5KGEpPT09bn07ZXhwb3J0cy5pc0ZyYWdtZW50PWZ1bmN0aW9uKGEpe3JldHVybiB5KGEpPT09ZX07ZXhwb3J0cy5pc0xhenk9ZnVuY3Rpb24oYSl7cmV0dXJuIHkoYSk9PT10fTtleHBvcnRzLmlzTWVtbz1mdW5jdGlvbihhKXtyZXR1cm4geShhKT09PXJ9O2V4cG9ydHMuaXNQb3J0YWw9ZnVuY3Rpb24oYSl7cmV0dXJuIHkoYSk9PT1kfTtleHBvcnRzLmlzUHJvZmlsZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIHkoYSk9PT1nfTtleHBvcnRzLmlzU3RyaWN0TW9kZT1mdW5jdGlvbihhKXtyZXR1cm4geShhKT09PWZ9O2V4cG9ydHMuaXNTdXNwZW5zZT1mdW5jdGlvbihhKXtyZXR1cm4geShhKT09PXB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi4xMC4yXG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7IC8vIFRPRE86IFdlIGRvbid0IHVzZSBBc3luY01vZGUgb3IgQ29uY3VycmVudE1vZGUgYW55bW9yZS4gVGhleSB3ZXJlIHRlbXBvcmFyeVxuLy8gKHVuc3RhYmxlKSBBUElzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWQuIENhbiB3ZSByZW1vdmUgdGhlIHN5bWJvbHM/XG5cbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZV9saXN0JykgOiAweGVhZDg7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubWVtbycpIDogMHhlYWQzO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcbnZhciBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnVuZGFtZW50YWwnKSA6IDB4ZWFkNTtcbnZhciBSRUFDVF9SRVNQT05ERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnJlc3BvbmRlcicpIDogMHhlYWQ2O1xudmFyIFJFQUNUX1NDT1BFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zY29wZScpIDogMHhlYWQ3O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9SRVNQT05ERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9TQ09QRV9UWVBFKTtcbn1cblxuLyoqXG4gKiBGb3JrZWQgZnJvbSBmYmpzL3dhcm5pbmc6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmJqcy9ibG9iL2U2NmJhMjBhZDViZTQzM2ViNTQ0MjNmMmIwOTdkODI5MzI0ZDlkZTYvcGFja2FnZXMvZmJqcy9zcmMvX19mb3Jrc19fL3dhcm5pbmcuanNcbiAqXG4gKiBPbmx5IGNoYW5nZSBpcyB3ZSB1c2UgY29uc29sZS53YXJuIGluc3RlYWQgb2YgY29uc29sZS5lcnJvcixcbiAqIGFuZCBkbyBub3RoaW5nIHdoZW4gJ2NvbnNvbGUnIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKiBUaGlzIHJlYWxseSBzaW1wbGlmaWVzIHRoZSBjb2RlLlxuICogLS0tXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cbnZhciBsb3dQcmlvcml0eVdhcm5pbmdXaXRob3V0U3RhY2sgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIGxvd1ByaW9yaXR5V2FybmluZ1dpdGhvdXRTdGFjayA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbG93UHJpb3JpdHlXYXJuaW5nV2l0aG91dFN0YWNrKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodm9pZCAwLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZ1dpdGhvdXRTdGFjayQxID0gbG93UHJpb3JpdHlXYXJuaW5nV2l0aG91dFN0YWNrO1xuXG5mdW5jdGlvbiB0eXBlT2Yob2JqZWN0KSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwpIHtcbiAgICB2YXIgJCR0eXBlb2YgPSBvYmplY3QuJCR0eXBlb2Y7XG5cbiAgICBzd2l0Y2ggKCQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgdmFyIHR5cGUgPSBvYmplY3QudHlwZTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0FTWU5DX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2ZUeXBlO1xuXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufSAvLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG5cbnZhciBBc3luY01vZGUgPSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG52YXIgQ29uY3VycmVudE1vZGUgPSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbnZhciBDb250ZXh0Q29uc3VtZXIgPSBSRUFDVF9DT05URVhUX1RZUEU7XG52YXIgQ29udGV4dFByb3ZpZGVyID0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbnZhciBFbGVtZW50ID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xudmFyIEZvcndhcmRSZWYgPSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xudmFyIEZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbnZhciBMYXp5ID0gUkVBQ1RfTEFaWV9UWVBFO1xudmFyIE1lbW8gPSBSRUFDVF9NRU1PX1RZUEU7XG52YXIgUG9ydGFsID0gUkVBQ1RfUE9SVEFMX1RZUEU7XG52YXIgUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xudmFyIFN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xudmFyIFN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlOyAvLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcblxuZnVuY3Rpb24gaXNBc3luY01vZGUob2JqZWN0KSB7XG4gIHtcbiAgICBpZiAoIWhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlKSB7XG4gICAgICBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IHRydWU7XG4gICAgICBsb3dQcmlvcml0eVdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE3Ky4gVXBkYXRlIHlvdXIgY29kZSB0byB1c2UgJyArICdSZWFjdElzLmlzQ29uY3VycmVudE1vZGUoKSBpbnN0ZWFkLiBJdCBoYXMgdGhlIGV4YWN0IHNhbWUgQVBJLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkgfHwgdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRDb25zdW1lcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05URVhUX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRQcm92aWRlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9WSURFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNGb3J3YXJkUmVmKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZyYWdtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0xhenkob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTEFaWV9UWVBFO1xufVxuZnVuY3Rpb24gaXNNZW1vKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX01FTU9fVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUG9ydGFsKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BPUlRBTF9UWVBFO1xufVxuZnVuY3Rpb24gaXNQcm9maWxlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdHJpY3RNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG59XG5cbmV4cG9ydHMudHlwZU9mID0gdHlwZU9mO1xuZXhwb3J0cy5Bc3luY01vZGUgPSBBc3luY01vZGU7XG5leHBvcnRzLkNvbmN1cnJlbnRNb2RlID0gQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLkNvbnRleHRDb25zdW1lciA9IENvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuQ29udGV4dFByb3ZpZGVyID0gQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5FbGVtZW50ID0gRWxlbWVudDtcbmV4cG9ydHMuRm9yd2FyZFJlZiA9IEZvcndhcmRSZWY7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnQ7XG5leHBvcnRzLkxhenkgPSBMYXp5O1xuZXhwb3J0cy5NZW1vID0gTWVtbztcbmV4cG9ydHMuUG9ydGFsID0gUG9ydGFsO1xuZXhwb3J0cy5Qcm9maWxlciA9IFByb2ZpbGVyO1xuZXhwb3J0cy5TdHJpY3RNb2RlID0gU3RyaWN0TW9kZTtcbmV4cG9ydHMuU3VzcGVuc2UgPSBTdXNwZW5zZTtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlO1xuZXhwb3J0cy5pc0FzeW5jTW9kZSA9IGlzQXN5bmNNb2RlO1xuZXhwb3J0cy5pc0NvbmN1cnJlbnRNb2RlID0gaXNDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuaXNDb250ZXh0Q29uc3VtZXIgPSBpc0NvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuaXNDb250ZXh0UHJvdmlkZXIgPSBpc0NvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuaXNFbGVtZW50ID0gaXNFbGVtZW50O1xuZXhwb3J0cy5pc0ZvcndhcmRSZWYgPSBpc0ZvcndhcmRSZWY7XG5leHBvcnRzLmlzRnJhZ21lbnQgPSBpc0ZyYWdtZW50O1xuZXhwb3J0cy5pc0xhenkgPSBpc0xhenk7XG5leHBvcnRzLmlzTWVtbyA9IGlzTWVtbztcbmV4cG9ydHMuaXNQb3J0YWwgPSBpc1BvcnRhbDtcbmV4cG9ydHMuaXNQcm9maWxlciA9IGlzUHJvZmlsZXI7XG5leHBvcnRzLmlzU3RyaWN0TW9kZSA9IGlzU3RyaWN0TW9kZTtcbmV4cG9ydHMuaXNTdXNwZW5zZSA9IGlzU3VzcGVuc2U7XG4gIH0pKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxudmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBlbGVtZW50VHlwZTogY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgcHJvcCBvbiBgJyArIGNvbXBvbmVudE5hbWUgICsgJ2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFSZWFjdElzLmlzVmFsaWRFbGVtZW50VHlwZShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudCB0eXBlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnRzIHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheSwgZ290ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyBhcmd1bWVudHMuICcgK1xuICAgICAgICAgICAgJ0EgY29tbW9uIG1pc3Rha2UgaXMgdG8gd3JpdGUgb25lT2YoeCwgeSwgeikgaW5zdGVhZCBvZiBvbmVPZihbeCwgeSwgel0pLidcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzLCBmdW5jdGlvbiByZXBsYWNlcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBTdHJpbmcocHJvcFZhbHVlKSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAoaGFzKHByb3BWYWx1ZSwga2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJyArIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSArICcgYXQgaW5kZXggJyArIGkgKyAnLidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGZhbHN5IHZhbHVlIGNhbid0IGJlIGEgU3ltYm9sXG4gICAgaWYgKCFwcm9wVmFsdWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB2YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuXG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmIChoYXModHlwZVNwZWNzLCB0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcihcbiAgICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICtcbiAgICAgICAgICAgICAgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yICYmICEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnRmFpbGVkICcgKyBsb2NhdGlvbiArICcgdHlwZTogJyArIGVycm9yLm1lc3NhZ2UgKyAoc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlc2V0cyB3YXJuaW5nIGNhY2hlIHdoZW4gdGVzdGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fVxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvbldpdGhSZXNldCgpIHt9XG5lbXB0eUZ1bmN0aW9uV2l0aFJlc2V0LnJlc2V0V2FybmluZ0NhY2hlID0gZW1wdHlGdW5jdGlvbjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gc2hpbShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGlmIChzZWNyZXQgPT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAnVXNlIFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICApO1xuICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIHRocm93IGVycjtcbiAgfTtcbiAgc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcbiAgZnVuY3Rpb24gZ2V0U2hpbSgpIHtcbiAgICByZXR1cm4gc2hpbTtcbiAgfTtcbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBzaGltLFxuICAgIGJvb2w6IHNoaW0sXG4gICAgZnVuYzogc2hpbSxcbiAgICBudW1iZXI6IHNoaW0sXG4gICAgb2JqZWN0OiBzaGltLFxuICAgIHN0cmluZzogc2hpbSxcbiAgICBzeW1ib2w6IHNoaW0sXG5cbiAgICBhbnk6IHNoaW0sXG4gICAgYXJyYXlPZjogZ2V0U2hpbSxcbiAgICBlbGVtZW50OiBzaGltLFxuICAgIGVsZW1lbnRUeXBlOiBzaGltLFxuICAgIGluc3RhbmNlT2Y6IGdldFNoaW0sXG4gICAgbm9kZTogc2hpbSxcbiAgICBvYmplY3RPZjogZ2V0U2hpbSxcbiAgICBvbmVPZjogZ2V0U2hpbSxcbiAgICBvbmVPZlR5cGU6IGdldFNoaW0sXG4gICAgc2hhcGU6IGdldFNoaW0sXG4gICAgZXhhY3Q6IGdldFNoaW0sXG5cbiAgICBjaGVja1Byb3BUeXBlczogZW1wdHlGdW5jdGlvbldpdGhSZXNldCxcbiAgICByZXNldFdhcm5pbmdDYWNoZTogZW1wdHlGdW5jdGlvblxuICB9O1xuXG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG52YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG52YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgICBjaGlsZENvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZTogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZXM6IHRydWUsXG4gICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3I6IHRydWUsXG4gICAgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzOiB0cnVlLFxuICAgIG1peGluczogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWUsXG4gICAgdHlwZTogdHJ1ZVxufTtcblxudmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gICAgbmFtZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHRydWUsXG4gICAgcHJvdG90eXBlOiB0cnVlLFxuICAgIGNhbGxlcjogdHJ1ZSxcbiAgICBjYWxsZWU6IHRydWUsXG4gICAgYXJndW1lbnRzOiB0cnVlLFxuICAgIGFyaXR5OiB0cnVlXG59O1xuXG52YXIgRk9SV0FSRF9SRUZfU1RBVElDUyA9IHtcbiAgICAnJCR0eXBlb2YnOiB0cnVlLFxuICAgIHJlbmRlcjogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlXG59O1xuXG52YXIgTUVNT19TVEFUSUNTID0ge1xuICAgICckJHR5cGVvZic6IHRydWUsXG4gICAgY29tcGFyZTogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlLFxuICAgIHR5cGU6IHRydWVcbn07XG5cbnZhciBUWVBFX1NUQVRJQ1MgPSB7fTtcblRZUEVfU1RBVElDU1tSZWFjdElzLkZvcndhcmRSZWZdID0gRk9SV0FSRF9SRUZfU1RBVElDUztcblxuZnVuY3Rpb24gZ2V0U3RhdGljcyhjb21wb25lbnQpIHtcbiAgICBpZiAoUmVhY3RJcy5pc01lbW8oY29tcG9uZW50KSkge1xuICAgICAgICByZXR1cm4gTUVNT19TVEFUSUNTO1xuICAgIH1cbiAgICByZXR1cm4gVFlQRV9TVEFUSUNTW2NvbXBvbmVudFsnJCR0eXBlb2YnXV0gfHwgUkVBQ1RfU1RBVElDUztcbn1cblxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIGdldE93blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgb2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuZnVuY3Rpb24gaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBzb3VyY2VDb21wb25lbnQsIGJsYWNrbGlzdCkge1xuICAgIGlmICh0eXBlb2Ygc291cmNlQ29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBkb24ndCBob2lzdCBvdmVyIHN0cmluZyAoaHRtbCkgY29tcG9uZW50c1xuXG4gICAgICAgIGlmIChvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgICAgICAgIHZhciBpbmhlcml0ZWRDb21wb25lbnQgPSBnZXRQcm90b3R5cGVPZihzb3VyY2VDb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKGluaGVyaXRlZENvbXBvbmVudCAmJiBpbmhlcml0ZWRDb21wb25lbnQgIT09IG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgaW5oZXJpdGVkQ29tcG9uZW50LCBibGFja2xpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZUNvbXBvbmVudCk7XG5cbiAgICAgICAgaWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2VDb21wb25lbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0YXJnZXRTdGF0aWNzID0gZ2V0U3RhdGljcyh0YXJnZXRDb21wb25lbnQpO1xuICAgICAgICB2YXIgc291cmNlU3RhdGljcyA9IGdldFN0YXRpY3Moc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgaWYgKCFLTk9XTl9TVEFUSUNTW2tleV0gJiYgIShibGFja2xpc3QgJiYgYmxhY2tsaXN0W2tleV0pICYmICEoc291cmNlU3RhdGljcyAmJiBzb3VyY2VTdGF0aWNzW2tleV0pICYmICEodGFyZ2V0U3RhdGljcyAmJiB0YXJnZXRTdGF0aWNzW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlQ29tcG9uZW50LCBrZXkpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEF2b2lkIGZhaWx1cmVzIGZyb20gcmVhZC1vbmx5IHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0Q29tcG9uZW50LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaG9pc3ROb25SZWFjdFN0YXRpY3M7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2Rpc3QvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MuY2pzLmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaW52YXJpYW50L2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGVuY2Fwc3VsYXRlcyB0aGUgc3Vic2NyaXB0aW9uIGxvZ2ljIGZvciBjb25uZWN0aW5nIGEgY29tcG9uZW50IHRvIHRoZSByZWR1eCBzdG9yZSwgYXNcbi8vIHdlbGwgYXMgbmVzdGluZyBzdWJzY3JpcHRpb25zIG9mIGRlc2NlbmRhbnQgY29tcG9uZW50cywgc28gdGhhdCB3ZSBjYW4gZW5zdXJlIHRoZVxuLy8gYW5jZXN0b3IgY29tcG9uZW50cyByZS1yZW5kZXIgYmVmb3JlIGRlc2NlbmRhbnRzXG52YXIgQ0xFQVJFRCA9IG51bGw7XG52YXIgbnVsbExpc3RlbmVycyA9IHtcbiAgbm90aWZ5OiBmdW5jdGlvbiBub3RpZnkoKSB7fVxufTtcblxuZnVuY3Rpb24gY3JlYXRlTGlzdGVuZXJDb2xsZWN0aW9uKCkge1xuICAvLyB0aGUgY3VycmVudC9uZXh0IHBhdHRlcm4gaXMgY29waWVkIGZyb20gcmVkdXgncyBjcmVhdGVTdG9yZSBjb2RlLlxuICAvLyBUT0RPOiByZWZhY3RvcitleHBvc2UgdGhhdCBjb2RlIHRvIGJlIHJldXNhYmxlIGhlcmU/XG4gIHZhciBjdXJyZW50ID0gW107XG4gIHZhciBuZXh0ID0gW107XG4gIHJldHVybiB7XG4gICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgbmV4dCA9IENMRUFSRUQ7XG4gICAgICBjdXJyZW50ID0gQ0xFQVJFRDtcbiAgICB9LFxuICAgIG5vdGlmeTogZnVuY3Rpb24gbm90aWZ5KCkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnQgPSBuZXh0O1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsaXN0ZW5lcnNbaV0oKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICBpZiAobmV4dCA9PT0gY3VycmVudCkgbmV4dCA9IGN1cnJlbnQuc2xpY2UoKTtcbiAgICAgIG5leHQucHVzaChsaXN0ZW5lcik7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIGlmICghaXNTdWJzY3JpYmVkIHx8IGN1cnJlbnQgPT09IENMRUFSRUQpIHJldHVybjtcbiAgICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG4gICAgICAgIGlmIChuZXh0ID09PSBjdXJyZW50KSBuZXh0ID0gY3VycmVudC5zbGljZSgpO1xuICAgICAgICBuZXh0LnNwbGljZShuZXh0LmluZGV4T2YobGlzdGVuZXIpLCAxKTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuXG52YXIgU3Vic2NyaXB0aW9uID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKHN0b3JlLCBwYXJlbnRTdWIsIG9uU3RhdGVDaGFuZ2UpIHtcbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgdGhpcy5wYXJlbnRTdWIgPSBwYXJlbnRTdWI7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gb25TdGF0ZUNoYW5nZTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcbiAgICB0aGlzLmxpc3RlbmVycyA9IG51bGxMaXN0ZW5lcnM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU3Vic2NyaXB0aW9uLnByb3RvdHlwZTtcblxuICBfcHJvdG8uYWRkTmVzdGVkU3ViID0gZnVuY3Rpb24gYWRkTmVzdGVkU3ViKGxpc3RlbmVyKSB7XG4gICAgdGhpcy50cnlTdWJzY3JpYmUoKTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgfTtcblxuICBfcHJvdG8ubm90aWZ5TmVzdGVkU3VicyA9IGZ1bmN0aW9uIG5vdGlmeU5lc3RlZFN1YnMoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMubm90aWZ5KCk7XG4gIH07XG5cbiAgX3Byb3RvLmlzU3Vic2NyaWJlZCA9IGZ1bmN0aW9uIGlzU3Vic2NyaWJlZCgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLnVuc3Vic2NyaWJlKTtcbiAgfTtcblxuICBfcHJvdG8udHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gdHJ5U3Vic2NyaWJlKCkge1xuICAgIGlmICghdGhpcy51bnN1YnNjcmliZSkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZSA9IHRoaXMucGFyZW50U3ViID8gdGhpcy5wYXJlbnRTdWIuYWRkTmVzdGVkU3ViKHRoaXMub25TdGF0ZUNoYW5nZSkgOiB0aGlzLnN0b3JlLnN1YnNjcmliZSh0aGlzLm9uU3RhdGVDaGFuZ2UpO1xuICAgICAgdGhpcy5saXN0ZW5lcnMgPSBjcmVhdGVMaXN0ZW5lckNvbGxlY3Rpb24oKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnRyeVVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdHJ5VW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKHRoaXMudW5zdWJzY3JpYmUpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSBudWxsO1xuICAgICAgdGhpcy5saXN0ZW5lcnMuY2xlYXIoKTtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gbnVsbExpc3RlbmVycztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKTtcblxuZXhwb3J0IHsgU3Vic2NyaXB0aW9uIGFzIGRlZmF1bHQgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvU3Vic2NyaXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNvbm5lY3RBZHZhbmNlZCBmcm9tICcuLi9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZCc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWxzL3NoYWxsb3dFcXVhbCc7XG5pbXBvcnQgZGVmYXVsdE1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyBmcm9tICcuL21hcERpc3BhdGNoVG9Qcm9wcyc7XG5pbXBvcnQgZGVmYXVsdE1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyBmcm9tICcuL21hcFN0YXRlVG9Qcm9wcyc7XG5pbXBvcnQgZGVmYXVsdE1lcmdlUHJvcHNGYWN0b3JpZXMgZnJvbSAnLi9tZXJnZVByb3BzJztcbmltcG9ydCBkZWZhdWx0U2VsZWN0b3JGYWN0b3J5IGZyb20gJy4vc2VsZWN0b3JGYWN0b3J5Jztcbi8qXG4gIGNvbm5lY3QgaXMgYSBmYWNhZGUgb3ZlciBjb25uZWN0QWR2YW5jZWQuIEl0IHR1cm5zIGl0cyBhcmdzIGludG8gYSBjb21wYXRpYmxlXG4gIHNlbGVjdG9yRmFjdG9yeSwgd2hpY2ggaGFzIHRoZSBzaWduYXR1cmU6XG5cbiAgICAoZGlzcGF0Y2gsIG9wdGlvbnMpID0+IChuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykgPT4gbmV4dEZpbmFsUHJvcHNcbiAgXG4gIGNvbm5lY3QgcGFzc2VzIGl0cyBhcmdzIHRvIGNvbm5lY3RBZHZhbmNlZCBhcyBvcHRpb25zLCB3aGljaCB3aWxsIGluIHR1cm4gcGFzcyB0aGVtIHRvXG4gIHNlbGVjdG9yRmFjdG9yeSBlYWNoIHRpbWUgYSBDb25uZWN0IGNvbXBvbmVudCBpbnN0YW5jZSBpcyBpbnN0YW50aWF0ZWQgb3IgaG90IHJlbG9hZGVkLlxuXG4gIHNlbGVjdG9yRmFjdG9yeSByZXR1cm5zIGEgZmluYWwgcHJvcHMgc2VsZWN0b3IgZnJvbSBpdHMgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLCBtZXJnZVByb3BzLFxuICBtZXJnZVByb3BzRmFjdG9yaWVzLCBhbmQgcHVyZSBhcmdzLlxuXG4gIFRoZSByZXN1bHRpbmcgZmluYWwgcHJvcHMgc2VsZWN0b3IgaXMgY2FsbGVkIGJ5IHRoZSBDb25uZWN0IGNvbXBvbmVudCBpbnN0YW5jZSB3aGVuZXZlclxuICBpdCByZWNlaXZlcyBuZXcgcHJvcHMgb3Igc3RvcmUgc3RhdGUuXG4gKi9cblxuZnVuY3Rpb24gbWF0Y2goYXJnLCBmYWN0b3JpZXMsIG5hbWUpIHtcbiAgZm9yICh2YXIgaSA9IGZhY3Rvcmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciByZXN1bHQgPSBmYWN0b3JpZXNbaV0oYXJnKTtcbiAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCwgb3B0aW9ucykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgb2YgdHlwZSBcIiArIHR5cGVvZiBhcmcgKyBcIiBmb3IgXCIgKyBuYW1lICsgXCIgYXJndW1lbnQgd2hlbiBjb25uZWN0aW5nIGNvbXBvbmVudCBcIiArIG9wdGlvbnMud3JhcHBlZENvbXBvbmVudE5hbWUgKyBcIi5cIik7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0cmljdEVxdWFsKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59IC8vIGNyZWF0ZUNvbm5lY3Qgd2l0aCBkZWZhdWx0IGFyZ3MgYnVpbGRzIHRoZSAnb2ZmaWNpYWwnIGNvbm5lY3QgYmVoYXZpb3IuIENhbGxpbmcgaXQgd2l0aFxuLy8gZGlmZmVyZW50IG9wdGlvbnMgb3BlbnMgdXAgc29tZSB0ZXN0aW5nIGFuZCBleHRlbnNpYmlsaXR5IHNjZW5hcmlvc1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb25uZWN0KF90ZW1wKSB7XG4gIHZhciBfcmVmID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXAsXG4gICAgICBfcmVmJGNvbm5lY3RIT0MgPSBfcmVmLmNvbm5lY3RIT0MsXG4gICAgICBjb25uZWN0SE9DID0gX3JlZiRjb25uZWN0SE9DID09PSB2b2lkIDAgPyBjb25uZWN0QWR2YW5jZWQgOiBfcmVmJGNvbm5lY3RIT0MsXG4gICAgICBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YgPSBfcmVmLm1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWFwU3RhdGVUb1Byb3BzRiA9PT0gdm9pZCAwID8gZGVmYXVsdE1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyA6IF9yZWYkbWFwU3RhdGVUb1Byb3BzRixcbiAgICAgIF9yZWYkbWFwRGlzcGF0Y2hUb1BybyA9IF9yZWYubWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLFxuICAgICAgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzID0gX3JlZiRtYXBEaXNwYXRjaFRvUHJvID09PSB2b2lkIDAgPyBkZWZhdWx0TWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzIDogX3JlZiRtYXBEaXNwYXRjaFRvUHJvLFxuICAgICAgX3JlZiRtZXJnZVByb3BzRmFjdG9yID0gX3JlZi5tZXJnZVByb3BzRmFjdG9yaWVzLFxuICAgICAgbWVyZ2VQcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWVyZ2VQcm9wc0ZhY3RvciA9PT0gdm9pZCAwID8gZGVmYXVsdE1lcmdlUHJvcHNGYWN0b3JpZXMgOiBfcmVmJG1lcmdlUHJvcHNGYWN0b3IsXG4gICAgICBfcmVmJHNlbGVjdG9yRmFjdG9yeSA9IF9yZWYuc2VsZWN0b3JGYWN0b3J5LFxuICAgICAgc2VsZWN0b3JGYWN0b3J5ID0gX3JlZiRzZWxlY3RvckZhY3RvcnkgPT09IHZvaWQgMCA/IGRlZmF1bHRTZWxlY3RvckZhY3RvcnkgOiBfcmVmJHNlbGVjdG9yRmFjdG9yeTtcblxuICByZXR1cm4gZnVuY3Rpb24gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgX3JlZjIpIHtcbiAgICBpZiAoX3JlZjIgPT09IHZvaWQgMCkge1xuICAgICAgX3JlZjIgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgX3JlZjMgPSBfcmVmMixcbiAgICAgICAgX3JlZjMkcHVyZSA9IF9yZWYzLnB1cmUsXG4gICAgICAgIHB1cmUgPSBfcmVmMyRwdXJlID09PSB2b2lkIDAgPyB0cnVlIDogX3JlZjMkcHVyZSxcbiAgICAgICAgX3JlZjMkYXJlU3RhdGVzRXF1YWwgPSBfcmVmMy5hcmVTdGF0ZXNFcXVhbCxcbiAgICAgICAgYXJlU3RhdGVzRXF1YWwgPSBfcmVmMyRhcmVTdGF0ZXNFcXVhbCA9PT0gdm9pZCAwID8gc3RyaWN0RXF1YWwgOiBfcmVmMyRhcmVTdGF0ZXNFcXVhbCxcbiAgICAgICAgX3JlZjMkYXJlT3duUHJvcHNFcXVhID0gX3JlZjMuYXJlT3duUHJvcHNFcXVhbCxcbiAgICAgICAgYXJlT3duUHJvcHNFcXVhbCA9IF9yZWYzJGFyZU93blByb3BzRXF1YSA9PT0gdm9pZCAwID8gc2hhbGxvd0VxdWFsIDogX3JlZjMkYXJlT3duUHJvcHNFcXVhLFxuICAgICAgICBfcmVmMyRhcmVTdGF0ZVByb3BzRXEgPSBfcmVmMy5hcmVTdGF0ZVByb3BzRXF1YWwsXG4gICAgICAgIGFyZVN0YXRlUHJvcHNFcXVhbCA9IF9yZWYzJGFyZVN0YXRlUHJvcHNFcSA9PT0gdm9pZCAwID8gc2hhbGxvd0VxdWFsIDogX3JlZjMkYXJlU3RhdGVQcm9wc0VxLFxuICAgICAgICBfcmVmMyRhcmVNZXJnZWRQcm9wc0UgPSBfcmVmMy5hcmVNZXJnZWRQcm9wc0VxdWFsLFxuICAgICAgICBhcmVNZXJnZWRQcm9wc0VxdWFsID0gX3JlZjMkYXJlTWVyZ2VkUHJvcHNFID09PSB2b2lkIDAgPyBzaGFsbG93RXF1YWwgOiBfcmVmMyRhcmVNZXJnZWRQcm9wc0UsXG4gICAgICAgIGV4dHJhT3B0aW9ucyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYzLCBbXCJwdXJlXCIsIFwiYXJlU3RhdGVzRXF1YWxcIiwgXCJhcmVPd25Qcm9wc0VxdWFsXCIsIFwiYXJlU3RhdGVQcm9wc0VxdWFsXCIsIFwiYXJlTWVyZ2VkUHJvcHNFcXVhbFwiXSk7XG5cbiAgICB2YXIgaW5pdE1hcFN0YXRlVG9Qcm9wcyA9IG1hdGNoKG1hcFN0YXRlVG9Qcm9wcywgbWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzLCAnbWFwU3RhdGVUb1Byb3BzJyk7XG4gICAgdmFyIGluaXRNYXBEaXNwYXRjaFRvUHJvcHMgPSBtYXRjaChtYXBEaXNwYXRjaFRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcywgJ21hcERpc3BhdGNoVG9Qcm9wcycpO1xuICAgIHZhciBpbml0TWVyZ2VQcm9wcyA9IG1hdGNoKG1lcmdlUHJvcHMsIG1lcmdlUHJvcHNGYWN0b3JpZXMsICdtZXJnZVByb3BzJyk7XG4gICAgcmV0dXJuIGNvbm5lY3RIT0Moc2VsZWN0b3JGYWN0b3J5LCBfZXh0ZW5kcyh7XG4gICAgICAvLyB1c2VkIGluIGVycm9yIG1lc3NhZ2VzXG4gICAgICBtZXRob2ROYW1lOiAnY29ubmVjdCcsXG4gICAgICAvLyB1c2VkIHRvIGNvbXB1dGUgQ29ubmVjdCdzIGRpc3BsYXlOYW1lIGZyb20gdGhlIHdyYXBwZWQgY29tcG9uZW50J3MgZGlzcGxheU5hbWUuXG4gICAgICBnZXREaXNwbGF5TmFtZTogZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUobmFtZSkge1xuICAgICAgICByZXR1cm4gXCJDb25uZWN0KFwiICsgbmFtZSArIFwiKVwiO1xuICAgICAgfSxcbiAgICAgIC8vIGlmIG1hcFN0YXRlVG9Qcm9wcyBpcyBmYWxzeSwgdGhlIENvbm5lY3QgY29tcG9uZW50IGRvZXNuJ3Qgc3Vic2NyaWJlIHRvIHN0b3JlIHN0YXRlIGNoYW5nZXNcbiAgICAgIHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlczogQm9vbGVhbihtYXBTdGF0ZVRvUHJvcHMpLFxuICAgICAgLy8gcGFzc2VkIHRocm91Z2ggdG8gc2VsZWN0b3JGYWN0b3J5XG4gICAgICBpbml0TWFwU3RhdGVUb1Byb3BzOiBpbml0TWFwU3RhdGVUb1Byb3BzLFxuICAgICAgaW5pdE1hcERpc3BhdGNoVG9Qcm9wczogaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyxcbiAgICAgIGluaXRNZXJnZVByb3BzOiBpbml0TWVyZ2VQcm9wcyxcbiAgICAgIHB1cmU6IHB1cmUsXG4gICAgICBhcmVTdGF0ZXNFcXVhbDogYXJlU3RhdGVzRXF1YWwsXG4gICAgICBhcmVPd25Qcm9wc0VxdWFsOiBhcmVPd25Qcm9wc0VxdWFsLFxuICAgICAgYXJlU3RhdGVQcm9wc0VxdWFsOiBhcmVTdGF0ZVByb3BzRXF1YWwsXG4gICAgICBhcmVNZXJnZWRQcm9wc0VxdWFsOiBhcmVNZXJnZWRQcm9wc0VxdWFsXG4gICAgfSwgZXh0cmFPcHRpb25zKSk7XG4gIH07XG59XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb25uZWN0KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvY29ubmVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgaWYgKHggPT09IHkpIHtcbiAgICByZXR1cm4geCAhPT0gMCB8fCB5ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIGlmIChpcyhvYmpBLCBvYmpCKSkgcmV0dXJuIHRydWU7XG5cbiAgaWYgKHR5cGVvZiBvYmpBICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8IHR5cGVvZiBvYmpCICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuICBpZiAoa2V5c0EubGVuZ3RoICE9PSBrZXlzQi5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFoYXNPd24uY2FsbChvYmpCLCBrZXlzQVtpXSkgfHwgIWlzKG9iakFba2V5c0FbaV1dLCBvYmpCW2tleXNBW2ldXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvc2hhbGxvd0VxdWFsLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50LCB3cmFwTWFwVG9Qcm9wc0Z1bmMgfSBmcm9tICcuL3dyYXBNYXBUb1Byb3BzJztcbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNGdW5jdGlvbihtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtYXBEaXNwYXRjaFRvUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwRGlzcGF0Y2hUb1Byb3BzLCAnbWFwRGlzcGF0Y2hUb1Byb3BzJykgOiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzTWlzc2luZyhtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgcmV0dXJuICFtYXBEaXNwYXRjaFRvUHJvcHMgPyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50KGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgIHJldHVybiB7XG4gICAgICBkaXNwYXRjaDogZGlzcGF0Y2hcbiAgICB9O1xuICB9KSA6IHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNPYmplY3QobWFwRGlzcGF0Y2hUb1Byb3BzKSB7XG4gIHJldHVybiBtYXBEaXNwYXRjaFRvUHJvcHMgJiYgdHlwZW9mIG1hcERpc3BhdGNoVG9Qcm9wcyA9PT0gJ29iamVjdCcgPyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50KGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcnMobWFwRGlzcGF0Y2hUb1Byb3BzLCBkaXNwYXRjaCk7XG4gIH0pIDogdW5kZWZpbmVkO1xufVxuZXhwb3J0IGRlZmF1bHQgW3doZW5NYXBEaXNwYXRjaFRvUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNNaXNzaW5nLCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNPYmplY3RdO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21hcERpc3BhdGNoVG9Qcm9wcy5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGNyZWF0ZVN0b3JlIGZyb20gJy4vY3JlYXRlU3RvcmUnO1xuaW1wb3J0IGNvbWJpbmVSZWR1Y2VycyBmcm9tICcuL2NvbWJpbmVSZWR1Y2Vycyc7XG5pbXBvcnQgYmluZEFjdGlvbkNyZWF0b3JzIGZyb20gJy4vYmluZEFjdGlvbkNyZWF0b3JzJztcbmltcG9ydCBhcHBseU1pZGRsZXdhcmUgZnJvbSAnLi9hcHBseU1pZGRsZXdhcmUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vdXRpbHMvd2FybmluZyc7XG5cbi8qXG4qIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cbiogSWYgdGhlIGZ1bmN0aW9uIGhhcyBiZWVuIG1pbmlmaWVkIGFuZCBOT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLCB3YXJuIHRoZSB1c2VyLlxuKi9cbmZ1bmN0aW9uIGlzQ3J1c2hlZCgpIHt9XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG4gIHdhcm5pbmcoJ1lvdSBhcmUgY3VycmVudGx5IHVzaW5nIG1pbmlmaWVkIGNvZGUgb3V0c2lkZSBvZiBOT0RFX0VOViA9PT0gXFwncHJvZHVjdGlvblxcJy4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIERlZmluZVBsdWdpbiBmb3Igd2VicGFjayAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDAzMDAzMSkgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnQgeyBjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBiaW5kQWN0aW9uQ3JlYXRvcnMsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IGdldFJhd1RhZyBmcm9tICcuL19nZXRSYXdUYWcuanMnO1xuaW1wb3J0IG9iamVjdFRvU3RyaW5nIGZyb20gJy4vX29iamVjdFRvU3RyaW5nLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXRUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZnJlZUdsb2JhbCBmcm9tICcuL19mcmVlR2xvYmFsLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5leHBvcnQgZGVmYXVsdCByb290O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSYXdUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanNcbi8vIG1vZHVsZSBpZCA9IDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX29iamVjdFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qc1xuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJBcmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vdmVyQXJnLmpzXG4vLyBtb2R1bGUgaWQgPSA4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3RMaWtlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmltcG9ydCBwb255ZmlsbCBmcm9tICcuL3BvbnlmaWxsLmpzJztcblxudmFyIHJvb3Q7XG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9IHBvbnlmaWxsKHJvb3QpO1xuZXhwb3J0IGRlZmF1bHQgcmVzdWx0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsTW9kdWxlKSB7XHJcblx0aWYoIW9yaWdpbmFsTW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0dmFyIG1vZHVsZSA9IE9iamVjdC5jcmVhdGUob3JpZ2luYWxNb2R1bGUpO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZighbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2hhcm1vbnktbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdFN5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBBY3Rpb25UeXBlcyB9IGZyb20gJy4vY3JlYXRlU3RvcmUnO1xuaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi91dGlscy93YXJuaW5nJztcblxuZnVuY3Rpb24gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pIHtcbiAgdmFyIGFjdGlvblR5cGUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGU7XG4gIHZhciBhY3Rpb25OYW1lID0gYWN0aW9uVHlwZSAmJiAnXCInICsgYWN0aW9uVHlwZS50b1N0cmluZygpICsgJ1wiJyB8fCAnYW4gYWN0aW9uJztcblxuICByZXR1cm4gJ0dpdmVuIGFjdGlvbiAnICsgYWN0aW9uTmFtZSArICcsIHJlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZC4gJyArICdUbyBpZ25vcmUgYW4gYWN0aW9uLCB5b3UgbXVzdCBleHBsaWNpdGx5IHJldHVybiB0aGUgcHJldmlvdXMgc3RhdGUuICcgKyAnSWYgeW91IHdhbnQgdGhpcyByZWR1Y2VyIHRvIGhvbGQgbm8gdmFsdWUsIHlvdSBjYW4gcmV0dXJuIG51bGwgaW5zdGVhZCBvZiB1bmRlZmluZWQuJztcbn1cblxuZnVuY3Rpb24gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShpbnB1dFN0YXRlLCByZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgYXJndW1lbnROYW1lID0gYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBBY3Rpb25UeXBlcy5JTklUID8gJ3ByZWxvYWRlZFN0YXRlIGFyZ3VtZW50IHBhc3NlZCB0byBjcmVhdGVTdG9yZScgOiAncHJldmlvdXMgc3RhdGUgcmVjZWl2ZWQgYnkgdGhlIHJlZHVjZXInO1xuXG4gIGlmIChyZWR1Y2VyS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJ1N0b3JlIGRvZXMgbm90IGhhdmUgYSB2YWxpZCByZWR1Y2VyLiBNYWtlIHN1cmUgdGhlIGFyZ3VtZW50IHBhc3NlZCAnICsgJ3RvIGNvbWJpbmVSZWR1Y2VycyBpcyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSByZWR1Y2Vycy4nO1xuICB9XG5cbiAgaWYgKCFpc1BsYWluT2JqZWN0KGlucHV0U3RhdGUpKSB7XG4gICAgcmV0dXJuICdUaGUgJyArIGFyZ3VtZW50TmFtZSArICcgaGFzIHVuZXhwZWN0ZWQgdHlwZSBvZiBcIicgKyB7fS50b1N0cmluZy5jYWxsKGlucHV0U3RhdGUpLm1hdGNoKC9cXHMoW2EtenxBLVpdKykvKVsxXSArICdcIi4gRXhwZWN0ZWQgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyAnICsgKCdrZXlzOiBcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIicpO1xuICB9XG5cbiAgdmFyIHVuZXhwZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMoaW5wdXRTdGF0ZSkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gIXJlZHVjZXJzLmhhc093blByb3BlcnR5KGtleSkgJiYgIXVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldO1xuICB9KTtcblxuICB1bmV4cGVjdGVkS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XSA9IHRydWU7XG4gIH0pO1xuXG4gIGlmICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuICdVbmV4cGVjdGVkICcgKyAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMSA/ICdrZXlzJyA6ICdrZXknKSArICcgJyArICgnXCInICsgdW5leHBlY3RlZEtleXMuam9pbignXCIsIFwiJykgKyAnXCIgZm91bmQgaW4gJyArIGFyZ3VtZW50TmFtZSArICcuICcpICsgJ0V4cGVjdGVkIHRvIGZpbmQgb25lIG9mIHRoZSBrbm93biByZWR1Y2VyIGtleXMgaW5zdGVhZDogJyArICgnXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCIuIFVuZXhwZWN0ZWQga2V5cyB3aWxsIGJlIGlnbm9yZWQuJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0UmVkdWNlclNoYXBlKHJlZHVjZXJzKSB7XG4gIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcmVkdWNlciA9IHJlZHVjZXJzW2tleV07XG4gICAgdmFyIGluaXRpYWxTdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIGR1cmluZyBpbml0aWFsaXphdGlvbi4gJyArICdJZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZSByZWR1Y2VyIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgJyArICdleHBsaWNpdGx5IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5ICcgKyAnbm90IGJlIHVuZGVmaW5lZC4gSWYgeW91IGRvblxcJ3Qgd2FudCB0byBzZXQgYSB2YWx1ZSBmb3IgdGhpcyByZWR1Y2VyLCAnICsgJ3lvdSBjYW4gdXNlIG51bGwgaW5zdGVhZCBvZiB1bmRlZmluZWQuJyk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSAnQEByZWR1eC9QUk9CRV9VTktOT1dOX0FDVElPTl8nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJyk7XG4gICAgaWYgKHR5cGVvZiByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiB0eXBlIH0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgd2hlbiBwcm9iZWQgd2l0aCBhIHJhbmRvbSB0eXBlLiAnICsgKCdEb25cXCd0IHRyeSB0byBoYW5kbGUgJyArIEFjdGlvblR5cGVzLklOSVQgKyAnIG9yIG90aGVyIGFjdGlvbnMgaW4gXCJyZWR1eC8qXCIgJykgKyAnbmFtZXNwYWNlLiBUaGV5IGFyZSBjb25zaWRlcmVkIHByaXZhdGUuIEluc3RlYWQsIHlvdSBtdXN0IHJldHVybiB0aGUgJyArICdjdXJyZW50IHN0YXRlIGZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB1bmxlc3MgaXQgaXMgdW5kZWZpbmVkLCAnICsgJ2luIHdoaWNoIGNhc2UgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLCByZWdhcmRsZXNzIG9mIHRoZSAnICsgJ2FjdGlvbiB0eXBlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgbm90IGJlIHVuZGVmaW5lZCwgYnV0IGNhbiBiZSBudWxsLicpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgZGlmZmVyZW50IHJlZHVjZXIgZnVuY3Rpb25zLCBpbnRvIGEgc2luZ2xlXG4gKiByZWR1Y2VyIGZ1bmN0aW9uLiBJdCB3aWxsIGNhbGwgZXZlcnkgY2hpbGQgcmVkdWNlciwgYW5kIGdhdGhlciB0aGVpciByZXN1bHRzXG4gKiBpbnRvIGEgc2luZ2xlIHN0YXRlIG9iamVjdCwgd2hvc2Uga2V5cyBjb3JyZXNwb25kIHRvIHRoZSBrZXlzIG9mIHRoZSBwYXNzZWRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWR1Y2VycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGNvcnJlc3BvbmQgdG8gZGlmZmVyZW50XG4gKiByZWR1Y2VyIGZ1bmN0aW9ucyB0aGF0IG5lZWQgdG8gYmUgY29tYmluZWQgaW50byBvbmUuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluXG4gKiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhcyByZWR1Y2Vyc2Agc3ludGF4LiBUaGUgcmVkdWNlcnMgbWF5IG5ldmVyIHJldHVyblxuICogdW5kZWZpbmVkIGZvciBhbnkgYWN0aW9uLiBJbnN0ZWFkLCB0aGV5IHNob3VsZCByZXR1cm4gdGhlaXIgaW5pdGlhbCBzdGF0ZVxuICogaWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGVtIHdhcyB1bmRlZmluZWQsIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBmb3IgYW55XG4gKiB1bnJlY29nbml6ZWQgYWN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSByZWR1Y2VyIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBldmVyeSByZWR1Y2VyIGluc2lkZSB0aGVcbiAqIHBhc3NlZCBvYmplY3QsIGFuZCBidWlsZHMgYSBzdGF0ZSBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVJlZHVjZXJzKHJlZHVjZXJzKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGZpbmFsUmVkdWNlcnMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWR1Y2VyS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSByZWR1Y2VyS2V5c1tpXTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdhcm5pbmcoJ05vIHJlZHVjZXIgcHJvdmlkZWQgZm9yIGtleSBcIicgKyBrZXkgKyAnXCInKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZpbmFsUmVkdWNlcnNba2V5XSA9IHJlZHVjZXJzW2tleV07XG4gICAgfVxuICB9XG4gIHZhciBmaW5hbFJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMoZmluYWxSZWR1Y2Vycyk7XG5cbiAgdmFyIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHZvaWQgMDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB1bmV4cGVjdGVkS2V5Q2FjaGUgPSB7fTtcbiAgfVxuXG4gIHZhciBzaGFwZUFzc2VydGlvbkVycm9yID0gdm9pZCAwO1xuICB0cnkge1xuICAgIGFzc2VydFJlZHVjZXJTaGFwZShmaW5hbFJlZHVjZXJzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNoYXBlQXNzZXJ0aW9uRXJyb3IgPSBlO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbWJpbmF0aW9uKCkge1xuICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50c1sxXTtcblxuICAgIGlmIChzaGFwZUFzc2VydGlvbkVycm9yKSB7XG4gICAgICB0aHJvdyBzaGFwZUFzc2VydGlvbkVycm9yO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgd2FybmluZ01lc3NhZ2UgPSBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKHN0YXRlLCBmaW5hbFJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSk7XG4gICAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgICAgd2FybmluZyh3YXJuaW5nTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhhc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgbmV4dFN0YXRlID0ge307XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGZpbmFsUmVkdWNlcktleXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2tleSA9IGZpbmFsUmVkdWNlcktleXNbX2ldO1xuICAgICAgdmFyIHJlZHVjZXIgPSBmaW5hbFJlZHVjZXJzW19rZXldO1xuICAgICAgdmFyIHByZXZpb3VzU3RhdGVGb3JLZXkgPSBzdGF0ZVtfa2V5XTtcbiAgICAgIHZhciBuZXh0U3RhdGVGb3JLZXkgPSByZWR1Y2VyKHByZXZpb3VzU3RhdGVGb3JLZXksIGFjdGlvbik7XG4gICAgICBpZiAodHlwZW9mIG5leHRTdGF0ZUZvcktleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKF9rZXksIGFjdGlvbik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgbmV4dFN0YXRlW19rZXldID0gbmV4dFN0YXRlRm9yS2V5O1xuICAgICAgaGFzQ2hhbmdlZCA9IGhhc0NoYW5nZWQgfHwgbmV4dFN0YXRlRm9yS2V5ICE9PSBwcmV2aW91c1N0YXRlRm9yS2V5O1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2hhbmdlZCA/IG5leHRTdGF0ZSA6IHN0YXRlO1xuICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21iaW5lUmVkdWNlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3IuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb24gY3JlYXRvcnMsIGludG8gYW4gb2JqZWN0IHdpdGggdGhlXG4gKiBzYW1lIGtleXMsIGJ1dCB3aXRoIGV2ZXJ5IGZ1bmN0aW9uIHdyYXBwZWQgaW50byBhIGBkaXNwYXRjaGAgY2FsbCBzbyB0aGV5XG4gKiBtYXkgYmUgaW52b2tlZCBkaXJlY3RseS4gVGhpcyBpcyBqdXN0IGEgY29udmVuaWVuY2UgbWV0aG9kLCBhcyB5b3UgY2FuIGNhbGxcbiAqIGBzdG9yZS5kaXNwYXRjaChNeUFjdGlvbkNyZWF0b3JzLmRvU29tZXRoaW5nKCkpYCB5b3Vyc2VsZiBqdXN0IGZpbmUuXG4gKlxuICogRm9yIGNvbnZlbmllbmNlLCB5b3UgY2FuIGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQsXG4gKiBhbmQgZ2V0IGEgZnVuY3Rpb24gaW4gcmV0dXJuLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBhY3Rpb25DcmVhdG9ycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb25cbiAqIGNyZWF0b3IgZnVuY3Rpb25zLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpbiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhc2BcbiAqIHN5bnRheC4gWW91IG1heSBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2ggVGhlIGBkaXNwYXRjaGAgZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHlvdXIgUmVkdXhcbiAqIHN0b3JlLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFRoZSBvYmplY3QgbWltaWNraW5nIHRoZSBvcmlnaW5hbCBvYmplY3QsIGJ1dCB3aXRoXG4gKiBldmVyeSBhY3Rpb24gY3JlYXRvciB3cmFwcGVkIGludG8gdGhlIGBkaXNwYXRjaGAgY2FsbC4gSWYgeW91IHBhc3NlZCBhXG4gKiBmdW5jdGlvbiBhcyBgYWN0aW9uQ3JlYXRvcnNgLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYWxzbyBiZSBhIHNpbmdsZVxuICogZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyAhPT0gJ29iamVjdCcgfHwgYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBY3Rpb25DcmVhdG9ycyBleHBlY3RlZCBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvbiwgaW5zdGVhZCByZWNlaXZlZCAnICsgKGFjdGlvbkNyZWF0b3JzID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGFjdGlvbkNyZWF0b3JzKSArICcuICcgKyAnRGlkIHlvdSB3cml0ZSBcImltcG9ydCBBY3Rpb25DcmVhdG9ycyBmcm9tXCIgaW5zdGVhZCBvZiBcImltcG9ydCAqIGFzIEFjdGlvbkNyZWF0b3JzIGZyb21cIj8nKTtcbiAgfVxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWN0aW9uQ3JlYXRvcnMpO1xuICB2YXIgYm91bmRBY3Rpb25DcmVhdG9ycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICB2YXIgYWN0aW9uQ3JlYXRvciA9IGFjdGlvbkNyZWF0b3JzW2tleV07XG4gICAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBib3VuZEFjdGlvbkNyZWF0b3JzW2tleV0gPSBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib3VuZEFjdGlvbkNyZWF0b3JzO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9iaW5kQWN0aW9uQ3JlYXRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmltcG9ydCBjb21wb3NlIGZyb20gJy4vY29tcG9zZSc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0b3JlIGVuaGFuY2VyIHRoYXQgYXBwbGllcyBtaWRkbGV3YXJlIHRvIHRoZSBkaXNwYXRjaCBtZXRob2RcbiAqIG9mIHRoZSBSZWR1eCBzdG9yZS4gVGhpcyBpcyBoYW5keSBmb3IgYSB2YXJpZXR5IG9mIHRhc2tzLCBzdWNoIGFzIGV4cHJlc3NpbmdcbiAqIGFzeW5jaHJvbm91cyBhY3Rpb25zIGluIGEgY29uY2lzZSBtYW5uZXIsIG9yIGxvZ2dpbmcgZXZlcnkgYWN0aW9uIHBheWxvYWQuXG4gKlxuICogU2VlIGByZWR1eC10aHVua2AgcGFja2FnZSBhcyBhbiBleGFtcGxlIG9mIHRoZSBSZWR1eCBtaWRkbGV3YXJlLlxuICpcbiAqIEJlY2F1c2UgbWlkZGxld2FyZSBpcyBwb3RlbnRpYWxseSBhc3luY2hyb25vdXMsIHRoaXMgc2hvdWxkIGJlIHRoZSBmaXJzdFxuICogc3RvcmUgZW5oYW5jZXIgaW4gdGhlIGNvbXBvc2l0aW9uIGNoYWluLlxuICpcbiAqIE5vdGUgdGhhdCBlYWNoIG1pZGRsZXdhcmUgd2lsbCBiZSBnaXZlbiB0aGUgYGRpc3BhdGNoYCBhbmQgYGdldFN0YXRlYCBmdW5jdGlvbnNcbiAqIGFzIG5hbWVkIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBtaWRkbGV3YXJlcyBUaGUgbWlkZGxld2FyZSBjaGFpbiB0byBiZSBhcHBsaWVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHN0b3JlIGVuaGFuY2VyIGFwcGx5aW5nIHRoZSBtaWRkbGV3YXJlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcHBseU1pZGRsZXdhcmUoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBtaWRkbGV3YXJlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIG1pZGRsZXdhcmVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChjcmVhdGVTdG9yZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gICAgICB2YXIgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpO1xuICAgICAgdmFyIF9kaXNwYXRjaCA9IHN0b3JlLmRpc3BhdGNoO1xuICAgICAgdmFyIGNoYWluID0gW107XG5cbiAgICAgIHZhciBtaWRkbGV3YXJlQVBJID0ge1xuICAgICAgICBnZXRTdGF0ZTogc3RvcmUuZ2V0U3RhdGUsXG4gICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICAgICAgICByZXR1cm4gX2Rpc3BhdGNoKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjaGFpbiA9IG1pZGRsZXdhcmVzLm1hcChmdW5jdGlvbiAobWlkZGxld2FyZSkge1xuICAgICAgICByZXR1cm4gbWlkZGxld2FyZShtaWRkbGV3YXJlQVBJKTtcbiAgICAgIH0pO1xuICAgICAgX2Rpc3BhdGNoID0gY29tcG9zZS5hcHBseSh1bmRlZmluZWQsIGNoYWluKShzdG9yZS5kaXNwYXRjaCk7XG5cbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RvcmUsIHtcbiAgICAgICAgZGlzcGF0Y2g6IF9kaXNwYXRjaFxuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYXBwbHlNaWRkbGV3YXJlLmpzXG4vLyBtb2R1bGUgaWQgPSA4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQHBhcmFtIHthbnl9IG9iaiBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBhcmd1bWVudCBhcHBlYXJzIHRvIGJlIGEgcGxhaW4gb2JqZWN0LlxyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gIGlmIChwcm90byA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIHZhciBiYXNlUHJvdG8gPSBwcm90bztcblxuICB3aGlsZSAoT2JqZWN0LmdldFByb3RvdHlwZU9mKGJhc2VQcm90bykgIT09IG51bGwpIHtcbiAgICBiYXNlUHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYmFzZVByb3RvKTtcbiAgfVxuXG4gIHJldHVybiBwcm90byA9PT0gYmFzZVByb3RvO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9pc1BsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50LCB3cmFwTWFwVG9Qcm9wc0Z1bmMgfSBmcm9tICcuL3dyYXBNYXBUb1Byb3BzJztcbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbihtYXBTdGF0ZVRvUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtYXBTdGF0ZVRvUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwU3RhdGVUb1Byb3BzLCAnbWFwU3RhdGVUb1Byb3BzJykgOiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gd2hlbk1hcFN0YXRlVG9Qcm9wc0lzTWlzc2luZyhtYXBTdGF0ZVRvUHJvcHMpIHtcbiAgcmV0dXJuICFtYXBTdGF0ZVRvUHJvcHMgPyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50KGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge307XG4gIH0pIDogdW5kZWZpbmVkO1xufVxuZXhwb3J0IGRlZmF1bHQgW3doZW5NYXBTdGF0ZVRvUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWFwU3RhdGVUb1Byb3BzSXNNaXNzaW5nXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tYXBTdGF0ZVRvUHJvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IHZlcmlmeVBsYWluT2JqZWN0IGZyb20gJy4uL3V0aWxzL3ZlcmlmeVBsYWluT2JqZWN0JztcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0TWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcykge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIG93blByb3BzLCBzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3cmFwTWVyZ2VQcm9wc0Z1bmMobWVyZ2VQcm9wcykge1xuICByZXR1cm4gZnVuY3Rpb24gaW5pdE1lcmdlUHJvcHNQcm94eShkaXNwYXRjaCwgX3JlZikge1xuICAgIHZhciBkaXNwbGF5TmFtZSA9IF9yZWYuZGlzcGxheU5hbWUsXG4gICAgICAgIHB1cmUgPSBfcmVmLnB1cmUsXG4gICAgICAgIGFyZU1lcmdlZFByb3BzRXF1YWwgPSBfcmVmLmFyZU1lcmdlZFByb3BzRXF1YWw7XG4gICAgdmFyIGhhc1J1bk9uY2UgPSBmYWxzZTtcbiAgICB2YXIgbWVyZ2VkUHJvcHM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlUHJvcHNQcm94eShzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcykge1xuICAgICAgdmFyIG5leHRNZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuXG4gICAgICBpZiAoaGFzUnVuT25jZSkge1xuICAgICAgICBpZiAoIXB1cmUgfHwgIWFyZU1lcmdlZFByb3BzRXF1YWwobmV4dE1lcmdlZFByb3BzLCBtZXJnZWRQcm9wcykpIG1lcmdlZFByb3BzID0gbmV4dE1lcmdlZFByb3BzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFzUnVuT25jZSA9IHRydWU7XG4gICAgICAgIG1lcmdlZFByb3BzID0gbmV4dE1lcmdlZFByb3BzO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgdmVyaWZ5UGxhaW5PYmplY3QobWVyZ2VkUHJvcHMsIGRpc3BsYXlOYW1lLCAnbWVyZ2VQcm9wcycpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gICAgfTtcbiAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWVyZ2VQcm9wc0lzRnVuY3Rpb24obWVyZ2VQcm9wcykge1xuICByZXR1cm4gdHlwZW9mIG1lcmdlUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWVyZ2VQcm9wc0Z1bmMobWVyZ2VQcm9wcykgOiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gd2hlbk1lcmdlUHJvcHNJc09taXR0ZWQobWVyZ2VQcm9wcykge1xuICByZXR1cm4gIW1lcmdlUHJvcHMgPyBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNZXJnZVByb3BzO1xuICB9IDogdW5kZWZpbmVkO1xufVxuZXhwb3J0IGRlZmF1bHQgW3doZW5NZXJnZVByb3BzSXNGdW5jdGlvbiwgd2hlbk1lcmdlUHJvcHNJc09taXR0ZWRdO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21lcmdlUHJvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IHZlcmlmeVN1YnNlbGVjdG9ycyBmcm9tICcuL3ZlcmlmeVN1YnNlbGVjdG9ycyc7XG5leHBvcnQgZnVuY3Rpb24gaW1wdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGltcHVyZUZpbmFsUHJvcHNTZWxlY3RvcihzdGF0ZSwgb3duUHJvcHMpIHtcbiAgICByZXR1cm4gbWVyZ2VQcm9wcyhtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKSwgbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyksIG93blByb3BzKTtcbiAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gsIF9yZWYpIHtcbiAgdmFyIGFyZVN0YXRlc0VxdWFsID0gX3JlZi5hcmVTdGF0ZXNFcXVhbCxcbiAgICAgIGFyZU93blByb3BzRXF1YWwgPSBfcmVmLmFyZU93blByb3BzRXF1YWwsXG4gICAgICBhcmVTdGF0ZVByb3BzRXF1YWwgPSBfcmVmLmFyZVN0YXRlUHJvcHNFcXVhbDtcbiAgdmFyIGhhc1J1bkF0TGVhc3RPbmNlID0gZmFsc2U7XG4gIHZhciBzdGF0ZTtcbiAgdmFyIG93blByb3BzO1xuICB2YXIgc3RhdGVQcm9wcztcbiAgdmFyIGRpc3BhdGNoUHJvcHM7XG4gIHZhciBtZXJnZWRQcm9wcztcblxuICBmdW5jdGlvbiBoYW5kbGVGaXJzdENhbGwoZmlyc3RTdGF0ZSwgZmlyc3RPd25Qcm9wcykge1xuICAgIHN0YXRlID0gZmlyc3RTdGF0ZTtcbiAgICBvd25Qcm9wcyA9IGZpcnN0T3duUHJvcHM7XG4gICAgc3RhdGVQcm9wcyA9IG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpO1xuICAgIGRpc3BhdGNoUHJvcHMgPSBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG93blByb3BzKTtcbiAgICBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuICAgIGhhc1J1bkF0TGVhc3RPbmNlID0gdHJ1ZTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVOZXdQcm9wc0FuZE5ld1N0YXRlKCkge1xuICAgIHN0YXRlUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKTtcbiAgICBpZiAobWFwRGlzcGF0Y2hUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSBkaXNwYXRjaFByb3BzID0gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG4gICAgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVOZXdQcm9wcygpIHtcbiAgICBpZiAobWFwU3RhdGVUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSBzdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG4gICAgaWYgKG1hcERpc3BhdGNoVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgZGlzcGF0Y2hQcm9wcyA9IG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpO1xuICAgIG1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTmV3U3RhdGUoKSB7XG4gICAgdmFyIG5leHRTdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG4gICAgdmFyIHN0YXRlUHJvcHNDaGFuZ2VkID0gIWFyZVN0YXRlUHJvcHNFcXVhbChuZXh0U3RhdGVQcm9wcywgc3RhdGVQcm9wcyk7XG4gICAgc3RhdGVQcm9wcyA9IG5leHRTdGF0ZVByb3BzO1xuICAgIGlmIChzdGF0ZVByb3BzQ2hhbmdlZCkgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVTdWJzZXF1ZW50Q2FsbHMobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpIHtcbiAgICB2YXIgcHJvcHNDaGFuZ2VkID0gIWFyZU93blByb3BzRXF1YWwobmV4dE93blByb3BzLCBvd25Qcm9wcyk7XG4gICAgdmFyIHN0YXRlQ2hhbmdlZCA9ICFhcmVTdGF0ZXNFcXVhbChuZXh0U3RhdGUsIHN0YXRlKTtcbiAgICBzdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICBvd25Qcm9wcyA9IG5leHRPd25Qcm9wcztcbiAgICBpZiAocHJvcHNDaGFuZ2VkICYmIHN0YXRlQ2hhbmdlZCkgcmV0dXJuIGhhbmRsZU5ld1Byb3BzQW5kTmV3U3RhdGUoKTtcbiAgICBpZiAocHJvcHNDaGFuZ2VkKSByZXR1cm4gaGFuZGxlTmV3UHJvcHMoKTtcbiAgICBpZiAoc3RhdGVDaGFuZ2VkKSByZXR1cm4gaGFuZGxlTmV3U3RhdGUoKTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gcHVyZUZpbmFsUHJvcHNTZWxlY3RvcihuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykge1xuICAgIHJldHVybiBoYXNSdW5BdExlYXN0T25jZSA/IGhhbmRsZVN1YnNlcXVlbnRDYWxscyhuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykgOiBoYW5kbGVGaXJzdENhbGwobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpO1xuICB9O1xufSAvLyBUT0RPOiBBZGQgbW9yZSBjb21tZW50c1xuLy8gSWYgcHVyZSBpcyB0cnVlLCB0aGUgc2VsZWN0b3IgcmV0dXJuZWQgYnkgc2VsZWN0b3JGYWN0b3J5IHdpbGwgbWVtb2l6ZSBpdHMgcmVzdWx0cyxcbi8vIGFsbG93aW5nIGNvbm5lY3RBZHZhbmNlZCdzIHNob3VsZENvbXBvbmVudFVwZGF0ZSB0byByZXR1cm4gZmFsc2UgaWYgZmluYWxcbi8vIHByb3BzIGhhdmUgbm90IGNoYW5nZWQuIElmIGZhbHNlLCB0aGUgc2VsZWN0b3Igd2lsbCBhbHdheXMgcmV0dXJuIGEgbmV3XG4vLyBvYmplY3QgYW5kIHNob3VsZENvbXBvbmVudFVwZGF0ZSB3aWxsIGFsd2F5cyByZXR1cm4gdHJ1ZS5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShkaXNwYXRjaCwgX3JlZjIpIHtcbiAgdmFyIGluaXRNYXBTdGF0ZVRvUHJvcHMgPSBfcmVmMi5pbml0TWFwU3RhdGVUb1Byb3BzLFxuICAgICAgaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyA9IF9yZWYyLmluaXRNYXBEaXNwYXRjaFRvUHJvcHMsXG4gICAgICBpbml0TWVyZ2VQcm9wcyA9IF9yZWYyLmluaXRNZXJnZVByb3BzLFxuICAgICAgb3B0aW9ucyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYyLCBbXCJpbml0TWFwU3RhdGVUb1Byb3BzXCIsIFwiaW5pdE1hcERpc3BhdGNoVG9Qcm9wc1wiLCBcImluaXRNZXJnZVByb3BzXCJdKTtcblxuICB2YXIgbWFwU3RhdGVUb1Byb3BzID0gaW5pdE1hcFN0YXRlVG9Qcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG4gIHZhciBtYXBEaXNwYXRjaFRvUHJvcHMgPSBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvcHRpb25zKTtcbiAgdmFyIG1lcmdlUHJvcHMgPSBpbml0TWVyZ2VQcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2ZXJpZnlTdWJzZWxlY3RvcnMobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIG9wdGlvbnMuZGlzcGxheU5hbWUpO1xuICB9XG5cbiAgdmFyIHNlbGVjdG9yRmFjdG9yeSA9IG9wdGlvbnMucHVyZSA/IHB1cmVGaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5IDogaW1wdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeTtcbiAgcmV0dXJuIHNlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gsIG9wdGlvbnMpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3NlbGVjdG9yRmFjdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi4vdXRpbHMvd2FybmluZyc7XG5cbmZ1bmN0aW9uIHZlcmlmeShzZWxlY3RvciwgbWV0aG9kTmFtZSwgZGlzcGxheU5hbWUpIHtcbiAgaWYgKCFzZWxlY3Rvcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgdmFsdWUgZm9yIFwiICsgbWV0aG9kTmFtZSArIFwiIGluIFwiICsgZGlzcGxheU5hbWUgKyBcIi5cIik7XG4gIH0gZWxzZSBpZiAobWV0aG9kTmFtZSA9PT0gJ21hcFN0YXRlVG9Qcm9wcycgfHwgbWV0aG9kTmFtZSA9PT0gJ21hcERpc3BhdGNoVG9Qcm9wcycpIHtcbiAgICBpZiAoIXNlbGVjdG9yLmhhc093blByb3BlcnR5KCdkZXBlbmRzT25Pd25Qcm9wcycpKSB7XG4gICAgICB3YXJuaW5nKFwiVGhlIHNlbGVjdG9yIGZvciBcIiArIG1ldGhvZE5hbWUgKyBcIiBvZiBcIiArIGRpc3BsYXlOYW1lICsgXCIgZGlkIG5vdCBzcGVjaWZ5IGEgdmFsdWUgZm9yIGRlcGVuZHNPbk93blByb3BzLlwiKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmVyaWZ5U3Vic2VsZWN0b3JzKG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2ZXJpZnkobWFwU3RhdGVUb1Byb3BzLCAnbWFwU3RhdGVUb1Byb3BzJywgZGlzcGxheU5hbWUpO1xuICB2ZXJpZnkobWFwRGlzcGF0Y2hUb1Byb3BzLCAnbWFwRGlzcGF0Y2hUb1Byb3BzJywgZGlzcGxheU5hbWUpO1xuICB2ZXJpZnkobWVyZ2VQcm9wcywgJ21lcmdlUHJvcHMnLCBkaXNwbGF5TmFtZSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvdmVyaWZ5U3Vic2VsZWN0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBAZmxvd1xuaW1wb3J0IHR5cGUgeyBIcmVmIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCAoaHJlZjogSHJlZiwgYmFzZW5hbWU6ID9zdHJpbmcpID0+IHtcbiAgaWYgKHR5cGVvZiBocmVmID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBgJHtiYXNlbmFtZSB8fCAnJ30ke2hyZWZ9YDtcbiAgfVxuXG4gIGNvbnN0IHsgcGF0aG5hbWUsIHNlYXJjaCB9ID0gaHJlZjtcbiAgcmV0dXJuIGAke2Jhc2VuYW1lIHx8ICcnfSR7cGF0aG5hbWV9JHtzZWFyY2ggfHwgJyd9YDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlsL3N0cmluZ2lmeS1ocmVmLmpzIiwiLy8gQGZsb3dcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3NvcnQtY29tcCAqL1xuaW1wb3J0IHR5cGUgeyBOb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBNYXBTdGF0ZVRvUHJvcHMgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgdHlwZSB7IExvY2F0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbXBvcnQgVXJsUGF0dGVybiBmcm9tICd1cmwtcGF0dGVybic7XG5pbXBvcnQgUmVhY3QsIHsgQ2hpbGRyZW4sIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBjb21wb3NlLCB3aXRoQ29udGV4dCwgZ2V0Q29udGV4dCB9IGZyb20gJ3JlY29tcG9zZSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgbWF0Y2hDYWNoZSBmcm9tICcuLi91dGlsL21hdGNoLWNhY2hlJztcbmltcG9ydCBnZW5lcmF0ZUlkIGZyb20gJy4uL3V0aWwvZ2VuZXJhdGUtaWQnO1xuaW1wb3J0IHRocm93RXJyb3IgZnJvbSAnLi4vdXRpbC90aHJvdy1lcnJvcic7XG5cbmNvbnN0IHdpdGhJZCA9IENvbXBvc2VkQ29tcG9uZW50ID0+XG4gIGNsYXNzIFdpdGhJZCBleHRlbmRzIENvbXBvbmVudDwqPiB7XG4gICAgaWQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuaWQgPSBnZW5lcmF0ZUlkKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIDxDb21wb3NlZENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gaWQ9e3RoaXMuaWR9IC8+O1xuICAgIH1cbiAgfTtcblxuY29uc3QgcmVzb2x2ZUNoaWxkUm91dGUgPSAocGFyZW50Um91dGUsIGN1cnJlbnRSb3V0ZSkgPT4ge1xuICBjb25zdCBwYXJlbnRJc1Jvb3RSb3V0ZSA9XG4gICAgcGFyZW50Um91dGUgJiYgcGFyZW50Um91dGUgIT09ICcvJyAmJiBwYXJlbnRSb3V0ZSAhPT0gY3VycmVudFJvdXRlO1xuXG4gIHJldHVybiBwYXJlbnRJc1Jvb3RSb3V0ZVxuICAgID8gYCR7cGFyZW50Um91dGV9JHtjdXJyZW50Um91dGUgfHwgJyd9YFxuICAgIDogY3VycmVudFJvdXRlO1xufTtcblxuY29uc3QgcmVzb2x2ZUN1cnJlbnRSb3V0ZSA9IChwYXJlbnRSb3V0ZSwgY3VycmVudFJvdXRlKSA9PiB7XG4gIGlmICghY3VycmVudFJvdXRlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBGaXJzdCByb3V0ZSB3aWxsIGFsd2F5cyBiZSBhIHdpbGRjYXJkXG4gIGlmICghcGFyZW50Um91dGUpIHtcbiAgICByZXR1cm4gYCR7Y3VycmVudFJvdXRlfSpgO1xuICB9XG5cbiAgY29uc3QgY3VycmVudElzUm9vdFJvdXRlID0gY3VycmVudFJvdXRlID09PSAnLyc7XG4gIGNvbnN0IHBhcmVudElzUm9vdFJvdXRlID0gcGFyZW50Um91dGUgPT09ICcvJztcblxuICAvLyBPbmx5IHByZWZpeCBub24tcm9vdCBwYXJlbnQgcm91dGVzXG4gIGNvbnN0IHJvdXRlUHJlZml4ID0gKCFwYXJlbnRJc1Jvb3RSb3V0ZSAmJiBwYXJlbnRSb3V0ZSkgfHwgJyc7XG5cbiAgLy8gU3VwcG9ydCBcImluZGV4XCIgcm91dGVzOlxuICAvLyA8RnJhZ21lbnQgZm9yUm91dGU9Jy9ob21lJz5cbiAgLy8gICA8RnJhZ21lbnQgZm9yUm91dGU9Jy8nPlxuICAvLyAgIDwvRnJhZ21lbnQ+XG4gIC8vIDwvRnJhZ21lbnQ+XG4gIGNvbnN0IHJvdXRlU3VmZml4ID1cbiAgICBjdXJyZW50SXNSb290Um91dGUgJiYgIXBhcmVudElzUm9vdFJvdXRlID8gJycgOiBjdXJyZW50Um91dGU7XG5cbiAgY29uc3Qgd2lsZGNhcmQgPSBjdXJyZW50SXNSb290Um91dGUgJiYgcGFyZW50SXNSb290Um91dGUgPyAnJyA6ICcqJztcblxuICByZXR1cm4gYCR7cm91dGVQcmVmaXh9JHtyb3V0ZVN1ZmZpeH0ke3dpbGRjYXJkfWA7XG59O1xuXG5jb25zdCBzaG91bGRTaG93RnJhZ21lbnQgPSAoe1xuICBmb3JSb3V0ZSxcbiAgd2l0aENvbmRpdGlvbnMsXG4gIG1hdGNoZXIsXG4gIGxvY2F0aW9uXG59KSA9PiB7XG4gIGlmICghZm9yUm91dGUpIHtcbiAgICByZXR1cm4gd2l0aENvbmRpdGlvbnMgJiYgd2l0aENvbmRpdGlvbnMobG9jYXRpb24pO1xuICB9XG5cbiAgY29uc3QgbWF0Y2hlc1JvdXRlID0gbWF0Y2hlciAmJiBtYXRjaGVyLm1hdGNoKGxvY2F0aW9uLnBhdGhuYW1lKTtcblxuICByZXR1cm4gd2l0aENvbmRpdGlvbnNcbiAgICA/IG1hdGNoZXNSb3V0ZSAmJiB3aXRoQ29uZGl0aW9ucyhsb2NhdGlvbilcbiAgICA6IG1hdGNoZXNSb3V0ZTtcbn07XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgbWF0Y2hSb3V0ZTogRnVuY3Rpb24sXG4gIG1hdGNoV2lsZGNhcmRSb3V0ZTogRnVuY3Rpb24sXG4gIGZvclJvdXRlPzogc3RyaW5nLFxuICBwYXJlbnRSb3V0ZT86IHN0cmluZyxcbiAgd2l0aENvbmRpdGlvbnM/OiAobG9jYXRpb246IExvY2F0aW9uKSA9PiBib29sZWFuLFxuICBmb3JOb01hdGNoPzogYm9vbGVhbixcbiAgcGFyZW50SWQ/OiBzdHJpbmcsXG4gIGNoaWxkcmVuOiBOb2RlXG59O1xuXG5leHBvcnQgY2xhc3MgRnJhZ21lbnRDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQ8Kj4ge1xuICBtYXRjaGVyOiA/T2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IGN1cnJlbnRSb3V0ZSA9IHJlc29sdmVDdXJyZW50Um91dGUocHJvcHMucGFyZW50Um91dGUsIHByb3BzLmZvclJvdXRlKTtcblxuICAgIHRoaXMubWF0Y2hlciA9IChjdXJyZW50Um91dGUgJiYgbmV3IFVybFBhdHRlcm4oY3VycmVudFJvdXRlKSkgfHwgbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLmZvclJvdXRlICE9PSBuZXh0UHJvcHMuZm9yUm91dGUpIHtcbiAgICAgIHRocm93RXJyb3IoJ1VwZGF0aW5nIHJvdXRlIHByb3BzIGlzIG5vdCB5ZXQgc3VwcG9ydGVkJykoKTtcbiAgICB9XG5cbiAgICAvLyBXaGVuIEZyYWdtZW50IHJlcmVuZGVycywgbWF0Y2hDYWNoZSBjYW4gZ2V0IG91dCBvZiBzeW5jLlxuICAgIC8vIEJsb3cgaXQgYXdheSBhdCB0aGUgcm9vdCBGcmFnbWVudCBvbiBldmVyeSByZW5kZXIuXG4gICAgaWYgKCF0aGlzLnByb3BzLnBhcmVudElkKSB7XG4gICAgICBtYXRjaENhY2hlLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbWF0Y2hlciB9ID0gdGhpcztcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGZvclJvdXRlLFxuICAgICAgd2l0aENvbmRpdGlvbnMsXG4gICAgICBmb3JOb01hdGNoLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBwYXJlbnRSb3V0ZSxcbiAgICAgIHBhcmVudElkXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzaG91bGRTaG93ID0gc2hvdWxkU2hvd0ZyYWdtZW50KHtcbiAgICAgIGZvclJvdXRlLFxuICAgICAgd2l0aENvbmRpdGlvbnMsXG4gICAgICBtYXRjaGVyLFxuICAgICAgbG9jYXRpb25cbiAgICB9KTtcblxuICAgIGlmICghc2hvdWxkU2hvdyAmJiAhZm9yTm9NYXRjaCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFJvdXRlID0gcmVzb2x2ZUN1cnJlbnRSb3V0ZShwYXJlbnRSb3V0ZSwgZm9yUm91dGUpO1xuXG4gICAgaWYgKHBhcmVudElkKSB7XG4gICAgICBjb25zdCBwcmV2aW91c01hdGNoID0gbWF0Y2hDYWNoZS5nZXQocGFyZW50SWQpO1xuICAgICAgaWYgKHByZXZpb3VzTWF0Y2ggJiYgcHJldmlvdXNNYXRjaCAhPT0gY3VycmVudFJvdXRlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF0Y2hDYWNoZS5hZGQocGFyZW50SWQsIGN1cnJlbnRSb3V0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIENoaWxkcmVuLm9ubHkoY2hpbGRyZW4pO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB3aXRoSWRBbmRDb250ZXh0ID0gY29tcG9zZShcbiAgZ2V0Q29udGV4dCh7XG4gICAgcGFyZW50Um91dGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGFyZW50SWQ6IFByb3BUeXBlcy5zdHJpbmdcbiAgfSksXG4gIHdpdGhJZCxcbiAgd2l0aENvbnRleHQoXG4gICAge1xuICAgICAgcGFyZW50Um91dGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBwYXJlbnRJZDogUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgcHJvcHMgPT4gKHtcbiAgICAgIHBhcmVudFJvdXRlOiByZXNvbHZlQ2hpbGRSb3V0ZShwcm9wcy5wYXJlbnRSb3V0ZSwgcHJvcHMuZm9yUm91dGUpLFxuICAgICAgcGFyZW50SWQ6IHByb3BzLmlkXG4gICAgfSlcbiAgKVxuKTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzOiBNYXBTdGF0ZVRvUHJvcHM8KiwgKiwgKj4gPSBzdGF0ZSA9PiAoe1xuICBsb2NhdGlvbjogc3RhdGUucm91dGVyXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZShjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcyksIHdpdGhJZEFuZENvbnRleHQpKFxuICBGcmFnbWVudENvbXBvbmVudFxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvZnJhZ21lbnQuanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3NldERpc3BsYXlOYW1lID0gcmVxdWlyZSgnLi9zZXREaXNwbGF5TmFtZScpO1xuXG52YXIgX3NldERpc3BsYXlOYW1lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldERpc3BsYXlOYW1lKTtcblxudmFyIF93cmFwRGlzcGxheU5hbWUgPSByZXF1aXJlKCcuL3dyYXBEaXNwbGF5TmFtZScpO1xuXG52YXIgX3dyYXBEaXNwbGF5TmFtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93cmFwRGlzcGxheU5hbWUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZ2V0Q29udGV4dCA9IGZ1bmN0aW9uIGdldENvbnRleHQoY29udGV4dFR5cGVzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoQmFzZUNvbXBvbmVudCkge1xuICAgIHZhciBmYWN0b3J5ID0gKDAsIF9yZWFjdC5jcmVhdGVGYWN0b3J5KShCYXNlQ29tcG9uZW50KTtcbiAgICB2YXIgR2V0Q29udGV4dCA9IGZ1bmN0aW9uIEdldENvbnRleHQob3duZXJQcm9wcywgY29udGV4dCkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoX2V4dGVuZHMoe30sIG93bmVyUHJvcHMsIGNvbnRleHQpKTtcbiAgICB9O1xuXG4gICAgR2V0Q29udGV4dC5jb250ZXh0VHlwZXMgPSBjb250ZXh0VHlwZXM7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcmV0dXJuICgwLCBfc2V0RGlzcGxheU5hbWUyLmRlZmF1bHQpKCgwLCBfd3JhcERpc3BsYXlOYW1lMi5kZWZhdWx0KShCYXNlQ29tcG9uZW50LCAnZ2V0Q29udGV4dCcpKShHZXRDb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIEdldENvbnRleHQ7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRDb250ZXh0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWNvbXBvc2UvZ2V0Q29udGV4dC5qc1xuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgc2V0U3RhdGljID0gZnVuY3Rpb24gc2V0U3RhdGljKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChCYXNlQ29tcG9uZW50KSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICBCYXNlQ29tcG9uZW50W2tleV0gPSB2YWx1ZTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgcmV0dXJuIEJhc2VDb21wb25lbnQ7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBzZXRTdGF0aWM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3JlY29tcG9zZS9zZXRTdGF0aWMuanNcbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBnZXREaXNwbGF5TmFtZSA9IGZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKENvbXBvbmVudCkge1xuICBpZiAodHlwZW9mIENvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gQ29tcG9uZW50O1xuICB9XG5cbiAgaWYgKCFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50Jztcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGdldERpc3BsYXlOYW1lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWNvbXBvc2UvZ2V0RGlzcGxheU5hbWUuanNcbi8vIG1vZHVsZSBpZCA9IDk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfc2V0RGlzcGxheU5hbWUgPSByZXF1aXJlKCcuL3NldERpc3BsYXlOYW1lJyk7XG5cbnZhciBfc2V0RGlzcGxheU5hbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0RGlzcGxheU5hbWUpO1xuXG52YXIgX3dyYXBEaXNwbGF5TmFtZSA9IHJlcXVpcmUoJy4vd3JhcERpc3BsYXlOYW1lJyk7XG5cbnZhciBfd3JhcERpc3BsYXlOYW1lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dyYXBEaXNwbGF5TmFtZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIHdpdGhDb250ZXh0ID0gZnVuY3Rpb24gd2l0aENvbnRleHQoY2hpbGRDb250ZXh0VHlwZXMsIGdldENoaWxkQ29udGV4dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKEJhc2VDb21wb25lbnQpIHtcbiAgICB2YXIgZmFjdG9yeSA9ICgwLCBfcmVhY3QuY3JlYXRlRmFjdG9yeSkoQmFzZUNvbXBvbmVudCk7XG5cbiAgICB2YXIgV2l0aENvbnRleHQgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgICAgX2luaGVyaXRzKFdpdGhDb250ZXh0LCBfQ29tcG9uZW50KTtcblxuICAgICAgZnVuY3Rpb24gV2l0aENvbnRleHQoKSB7XG4gICAgICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdpdGhDb250ZXh0KTtcblxuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbC5hcHBseShfQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnZXRDaGlsZENvbnRleHQoX3RoaXMucHJvcHMpO1xuICAgICAgICB9LCBfdGVtcCksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgICAgIH1cblxuICAgICAgV2l0aENvbnRleHQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIGZhY3RvcnkodGhpcy5wcm9wcyk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gV2l0aENvbnRleHQ7XG4gICAgfShfcmVhY3QuQ29tcG9uZW50KTtcblxuICAgIFdpdGhDb250ZXh0LmNoaWxkQ29udGV4dFR5cGVzID0gY2hpbGRDb250ZXh0VHlwZXM7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcmV0dXJuICgwLCBfc2V0RGlzcGxheU5hbWUyLmRlZmF1bHQpKCgwLCBfd3JhcERpc3BsYXlOYW1lMi5kZWZhdWx0KShCYXNlQ29tcG9uZW50LCAnd2l0aENvbnRleHQnKSkoV2l0aENvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gV2l0aENvbnRleHQ7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSB3aXRoQ29udGV4dDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVjb21wb3NlL3dpdGhDb250ZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNvbXBvc2U7XG5mdW5jdGlvbiBjb21wb3NlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9O1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmdW5jc1swXTtcbiAgfVxuXG4gIHJldHVybiBmdW5jcy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGEoYi5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9yZWNvbXBvc2UvY29tcG9zZS5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG4vKipcbiAqIFJldHVybnMgYSBwc3VlZG8tdW5pcXVlIGlkZW50aWZpZXIgdXNlZCBieSBmcmFnbWVudHNcbiAqIHRvIHRyYWNrIG1hdGNoIHN0YXR1cyB3aXRoaW4gTWF0Y2hDYWNoZS5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IGlkXG4gKi9cbmV4cG9ydCBkZWZhdWx0ICgpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByYWRpeCA9IDE2O1xuICBjb25zdCBsZW5ndGggPSA4O1xuICByZXR1cm4gKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKS50b1N0cmluZyhyYWRpeCkuc2xpY2UoMCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlsL2dlbmVyYXRlLWlkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==