'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHashRouter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _history = require('history');

var _normalizeHref = require('../util/normalize-href');

var _normalizeHref2 = _interopRequireDefault(_normalizeHref);

var _install = require('../install');

var _install2 = _interopRequireDefault(_install);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createHashRouter = exports.createHashRouter = function createHashRouter(installer) {
  return function (_ref) {
    var routes = _ref.routes,
        basename = _ref.basename,
        _ref$hashType = _ref.hashType,
        hashType = _ref$hashType === undefined ? 'slash' : _ref$hashType,
        historyOptions = _ref.historyOptions,
        _ref$history = _ref.history,
        history = _ref$history === undefined ? (0, _history.createHashHistory)(_extends({ basename: basename, hashType: hashType }, historyOptions)) : _ref$history;

    var descriptor = basename ? _extends({ basename: basename }, history.location) : history.location;

    var location = (0, _normalizeHref2.default)(descriptor);

    return installer({ routes: routes, history: history, location: location });
  };
};

exports.default = createHashRouter(_install2.default);