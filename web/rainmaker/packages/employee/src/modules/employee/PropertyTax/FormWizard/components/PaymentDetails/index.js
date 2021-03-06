import React, { Component } from "react";
import ReceiptDetails from "./ReceiptDetails";
import TaxBreakUp from "./TaxBreakUp";
import PaymentModes from "./PaymentModes";
import formHoc from "egov-ui-kit/hocs/form";
import { CashInformation, ChequeInformation, DemandDraftInformation, CardInformation, PaymentModeInformation } from "./forms";
import AdditionalDetails from "modules/employee/PropertyTax/FormWizard/components/ReviewForm/components/AdditionalDetails";

const PaymentModeSelector = formHoc({ formKey: "paymentModes" })(PaymentModeInformation);

const paymentModeDetails = [
  {
    primaryText: "Cash",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation),
      },
    ],
  },
  {
    primaryText: "Cheque",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation),
      },
      {
        title: "Cheque Details",
        className: "cheque-details",
        comp: formHoc({ formKey: "chequeInfo", copyName: "chequeInfo", path: "PropertyTaxPay" })(ChequeInformation),
      },
    ],
  },
  {
    primaryText: "DD",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation),
      },
      {
        title: "Demand Draft Details",
        className: "demand-details",
        comp: formHoc({ formKey: "demandInfo", copyName: "demandInfo", path: "PropertyTaxPay" })(DemandDraftInformation),
      },
    ],
  },
  {
    primaryText: "Card",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation),
      },
      {
        title: "Card Details",
        className: "card-details",
        comp: formHoc({ formKey: "cardInfo", copyName: "cardInfo", path: "PropertyTaxPay" })(CardInformation),
      },
    ],
  },
];

class PaymentDetails extends Component {
  state = {
    paymentModeDetails,
    valueSelected: "",
    errorText: "",
    totalAmountToBePaid: 0,
  };

  getErrorMessage = (value) => {
    let { totalAmount } = this.props.estimationDetails[0] || {};
    let errorText = `amount should be numeric`;
    if (isFinite(value) && value >= totalAmount) {
      errorText = `can't be greater than ${parseInt(totalAmount) - 1}`;
    } else if (isFinite(value) && value <= 100) {
      errorText = "can't be less than 100";
    }
    return errorText;
  };

  handleFieldChange = (event, value) => {
    let { estimationDetails, updateTotalAmount } = this.props;
    let { totalAmount } = (estimationDetails && estimationDetails[0]) || {};
    if (isNaN(parseFloat(value)) || !isFinite(value) || value >= totalAmount || value < 100) {
      this.setState(
        {
          errorText: this.getErrorMessage(value),
        },
        () => {
          updateTotalAmount && updateTotalAmount(value, this.state.valueSelected === "Full_Amount", this.state.errorText);
        }
      );
    } else {
      this.setState(
        {
          errorText: "",
        },
        () => {
          updateTotalAmount && updateTotalAmount(value, this.state.valueSelected === "Full_Amount", this.state.errorText);
        }
      );
    }
  };

  // onRadioButtonChange = (e) => {
  //   const inputValue = e.target.value;
  //   this.setState({ totalAmountTobePaid: inputValue });
  // };

  onRadioButtonChange = (e) => {
    let { estimationDetails, updateTotalAmount } = this.props;
    let { totalAmount } = (estimationDetails && estimationDetails[0]) || {};
    if (e.target.value === "Full_Amount") {
      updateTotalAmount && updateTotalAmount(totalAmount, this.state.valueSelected === "Full_Amount");
      // this.setState({ totalAmountTobePaid: totalAmount, valueSelected: "Full_Amount" });
    } else {
      updateTotalAmount && updateTotalAmount(100, this.state.valueSelected === "Partial_Amount");
      // this.setState({ totalAmountTobePaid: 0, valueSelected: "Partial_Amount" });
    }
  };

  // updateTotalAmount = (value, isFullPayment) => {
  //   this.setState({
  //     totalAmountToBePaid: value,
  //     isFullPayment,
  //   });
  // };

  render() {
    const { paymentModeDetails, valueSelected, totalAmountTobePaid, errorText } = this.state;
    const { estimationDetails, importantDates, partialAmountError, isPartialPaymentInValid } = this.props;
    let { totalAmount } = (estimationDetails && estimationDetails[0]) || {};
    return (
      <div className="payment-details">
        <TaxBreakUp estimationDetails={estimationDetails} importantDates={importantDates} optionSelected={this.props.optionSelected} />
        {!isPartialPaymentInValid && (
          <AdditionalDetails
            value={this.props.totalAmountToBePaid}
            onRadioButtonChange={this.props.onRadioButtonChange}
            handleFieldChange={this.handleFieldChange}
            optionSelected={this.props.optionSelected}
            errorText={partialAmountError}
            totalAmount={totalAmount && totalAmount}
            estimationDetails={estimationDetails}
            isPartialPaymentInValid={isPartialPaymentInValid}
          />
        )}
        {totalAmount > 0 && <PaymentModes paymentModeDetails={paymentModeDetails} PaymentModeSelector={PaymentModeSelector} />}
        <ReceiptDetails />
      </div>
    );
  }
}

export default PaymentDetails;
