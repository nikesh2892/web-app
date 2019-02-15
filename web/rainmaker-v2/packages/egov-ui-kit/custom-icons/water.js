"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require("material-ui/SvgIcon");

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Water = function Water(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 0 24 24", className: "custom-icon" }, props),
    _react2.default.createElement("path", { d: "M3.54772,15.7275 C2.59336,17.3145 0.17644,21.882 3.54684,21.882 C6.95068,21.882 4.44708,17.2205 3.54772,15.7275 Z M0.67408,11.1765 L0.67408,13.063 L0,13.063 L0,14.525 L7.09588,14.525 L7.09588,13.063 L6.42136,13.063 L6.42136,11.958 C6.42136,11.864 6.4944,11.7805 6.57712,11.7805 L9.262,11.7805 L9.262,12.724 C11.84172,13.8465 13.55332,13.8625 16.16604,12.7235 L16.16604,11.78 L22,11.78 L22,5.2025 L16.16648,5.2025 L16.16648,3.8075 L14.4342,2.614 L13.35796,2.614 L13.35796,1.58 L16.8718,1.58 L16.8718,0.118 L8.58572,0.118 L8.58572,1.58 L12.07096,1.58 L12.07096,2.614 L10.99296,2.614 L9.262,3.8045 L9.262,5.202 L6.57712,5.202 C3.81876,5.2025 0.67408,7.8485 0.67408,11.1765 Z" })
  );
};

exports.default = Water;