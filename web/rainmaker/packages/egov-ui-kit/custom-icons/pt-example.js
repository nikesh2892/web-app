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

var PtExampleIcon = function PtExampleIcon(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 0 24 24", className: "custom-icon" }, props),
    _react2.default.createElement("path", {
      d: "M18.4638423,0 C19.3115546,0 20,0.687760769 20,1.53615769 L20,18.4638423 C20,19.3115546 19.3122392,20 18.4638423,20 L1.53615769,20 C0.688445385,20 0,19.3122392 0,18.4638423 L0,1.53615769 C0,0.688445385 0.687760769,0 1.53615769,0 L18.4638423,0 Z M4.5,12 C5.32842675,12 6,11.3284267 6,10.5 C6,9.67157325 5.32842675,9 4.5,9 C3.67157325,9 3,9.67157325 3,10.5 C3,11.3284267 3.67157325,12 4.5,12 Z M10.5,12 C11.3284268,12 12,11.3284267 12,10.5 C12,9.67157325 11.3284268,9 10.5,9 C9.67157325,9 9,9.67157325 9,10.5 C9,11.3284267 9.67157325,12 10.5,12 Z M16.5,12 C17.3284268,12 18,11.3284267 18,10.5 C18,9.67157325 17.3284268,9 16.5,9 C15.6715732,9 15,9.67157325 15,10.5 C15,11.3284267 15.6715732,12 16.5,12 Z",
      id: "path-1"
    })
  );
};

exports.default = PtExampleIcon;