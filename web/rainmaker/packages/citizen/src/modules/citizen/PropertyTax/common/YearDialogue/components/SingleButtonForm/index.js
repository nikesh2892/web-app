import React from "react";
import { Button } from "components";
import "./index.css";

const SingleButtonForm = ({ label, form, handleFieldChange, history, resetFormWizard, urlToAppend }) => {
  const fields = form.fields || {};
  return (
    <Button
      {...fields.button}
      onClick={() => {
        handleFieldChange("button", label);
        resetFormWizard();
        localStorage.setItem("draftId", "");
        history && urlToAppend ? history.push(`${urlToAppend}&FY=${label}`) : history.push(`/property-tax/assessment-form?FY=${label}&type=new`);
      }}
      className="year-range-button"
      label={label}
      labelColor="#00bbd3"
      buttonStyle={{ borderRadius: "50px", border: "1px solid #00bbd3" }}
    />
  );
};

export default SingleButtonForm;
