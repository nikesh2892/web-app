"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _reusableFields = require("../utils/reusableFields");

var _actions = require("egov-ui-kit/redux/common/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = (0, _extends3.default)({
  name: "plotDetails",
  fields: (0, _extends3.default)({
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMinor",
      type: "textfield",
      floatingLabelText: "PT_FORM2_USAGE_TYPE",
      value: "Other",
      required: true,
      disabled: true,
      numcols: 4
    }
  }, _reusableFields.subUsageType, _reusableFields.occupancy, _reusableFields.superArea, _reusableFields.measuringUnit, _reusableFields.annualRent),
  isFormValid: false
}, _reusableFields.beforeInitFormForPlot);

exports.default = formConfig;