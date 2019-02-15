"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiMolecules = require("ui-molecules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchDonor = function (_React$Component) {
  (0, _inherits3.default)(SearchDonor, _React$Component);

  function SearchDonor() {
    (0, _classCallCheck3.default)(this, SearchDonor);
    return (0, _possibleConstructorReturn3.default)(this, (SearchDonor.__proto__ || Object.getPrototypeOf(SearchDonor)).apply(this, arguments));
  }

  (0, _createClass3.default)(SearchDonor, [{
    key: "render",
    value: function render() {
      var zoomLevel = 15;
      return _react2.default.createElement(_uiMolecules.Map
      // onInfoBoxToggle={handleInfoBoxToggle}
      // isEntityTypeShown={isEntityTypeShown}
      // isDirectionShown={false}
      // entityTypes={entityTypes}
      // onToggleOpen={updateLabelStatus}
      // changeBound={changeBound}
      // waypts={waypts}
      // defaultCenter={defaultCenter}
      , { zoomLevel: zoomLevel
      });
    }
  }]);
  return SearchDonor;
}(_react2.default.Component);

exports.default = SearchDonor;