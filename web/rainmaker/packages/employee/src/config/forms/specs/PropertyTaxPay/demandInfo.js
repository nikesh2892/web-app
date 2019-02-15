import { setDependentFields } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/enableDependentFields";
const formConfig = {
  name: "demandInfo ",
  fields: {
    demandNo: {
      id: "demandNo",
      type: "textfield",
      floatingLabelText: "DD No.",
      hintText: "Enter dd no.",
      jsonPath: "Receipt[0].instrument.transactionNumber",
      pattern: /^([0-9]){6}$/i,
      errorMessage: "DD should be minimum 6 digits",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      required: true,
      value: "",
    },
    demandDate: {
      id: "demandDate",
      type: "textfield",
      floatingLabelText: "DD Date",
      hintText: "dd/mm/yy",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorMessage: "",
      jsonPath: "Receipt[0].instrument.transactionDateInput",
      value: "",
    },
    ifscCode: {
      id: "ifscCode",
      type: "textFieldIcon",
      text: "SUBMIT",
      className: "pt-old-pid-text-field",
      floatingLabelText: "IFSC",
      hintText: "Enter bank IFSC",
      required: true,
      numcols: 12,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorMessage: "Please enter a valid IFSC",
      jsonPath: "Receipt[0].instrument.ifscCode",
      pattern: /^[a-zA-Z0-9]{1,11}$/i,
      value: "",
    },
    BankName: {
      id: "BankName",
      required: true,
      hideField: true,
      type: "textfield",
      disabled: true,
      floatingLabelText: "Bank Name",
      dropDownData: [{ label: "RBI", value: "10101" }],
      jsonPath: "Receipt[0].instrument.bank.name",
      value: "",
    },
    BankBranch: {
      id: "BankBranch",
      required: true,
      disabled: true,
      hideField: true,
      type: "textfield",
      floatingLabelText: "Bank Branch",
      jsonPath: "Receipt[0].instrument.branchName",
      value: "",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;