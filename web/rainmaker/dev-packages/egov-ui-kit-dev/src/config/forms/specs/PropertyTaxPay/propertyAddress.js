import get from "lodash/get";
import filter from "lodash/filter";
import { CITY } from "egov-ui-kit/utils/endPoints";
import { pincode, mohalla, street, colony, houseNumber, dummy } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields";
import { prepareFormData, fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";

const formConfig = {
  name: "propertyAddress",
  fields: {
    city: {
      id: "city",
      jsonPath: "PropertiesTemp[0].address.city",
      required: true,
      type: "singleValueList",
      floatingLabelText: "CORE_COMMON_CITY",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      numcols: 6,
      dataFetchConfig: {
        dependants: [
          {
            fieldKey: "mohalla",
          },
        ],
      },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFormData("Properties[0].tenantId", field.value));
        dispatch(
          prepareFormData(
            "Properties[0].address.city",
            filter(get(state, "common.cities"), (city) => {
              return city.code === field.value;
            })[0].name
          )
        );
        dispatch(setFieldProperty("propertyAddress", "mohalla", "value", ""));

        let requestBody = {
          MdmsCriteria: {
            tenantId: field.value,
            moduleDetails: [
              {
                moduleName: "PropertyTax",
                masterDetails: [
                  {
                    name: "Floor",
                  },
                  {
                    name: "OccupancyType",
                  },
                  {
                    name: "OwnerShipCategory",
                  },
                  {
                    name: "OwnerType",
                  },
                  {
                    name: "PropertySubType",
                  },
                  {
                    name: "PropertyType",
                  },
                  {
                    name: "SubOwnerShipCategory",
                  },
                  {
                    name: "UsageCategoryDetail",
                  },
                  {
                    name: "UsageCategoryMajor",
                  },
                  {
                    name: "UsageCategoryMinor",
                  },
                  {
                    name: "UsageCategorySubMinor",
                  },
                ],
              },
            ],
          },
        };

        dispatch(
          fetchGeneralMDMSData(requestBody, "PropertyTax", [
            "Floor",
            "OccupancyType",
            "OwnerShipCategory",
            "OwnerType",
            "PropertySubType",
            "PropertyType",
            "SubOwnerShipCategory",
            "UsageCategoryDetail",
            "UsageCategoryMajor",
            "UsageCategoryMinor",
            "UsageCategorySubMinor",
          ])
        );
      },
    },
    dummy: {
      numcols: 6,
      type: "dummy",
    },
    houseNumber: {
      id: "house-number",
      jsonPath: "Properties[0].address.doorNo",
      type: "textfield",
      floatingLabelText: "PT_PROPERTY_DETAILS_DOOR_NUMBER",
      hintText: "PT_PROPERTY_DETAILS_DOOR_NUMBER_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_DOOR_NUMBER_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64,
    },
    colony: {
      id: "property-colony",
      jsonPath: "Properties[0].address.buildingName",
      type: "textfield",
      floatingLabelText: "PT_PROPERTY_DETAILS_BUILDING_COLONY_NAME",
      hintText: "PT_PROPERTY_DETAILS_BUILDING_COLONY_NAME_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_COLONY_NAME_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64,
    },
    street: {
      id: "property-street",
      jsonPath: "Properties[0].address.street",
      type: "textfield",
      floatingLabelText: "PT_PROPERTY_DETAILS_STREET_NAME",
      hintText: "PT_PROPERTY_DETAILS_STREET_NAME_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_STREET_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64,
    },
    ...mohalla,
    pincode: {
      id: "pincode",
      type: "number",
      jsonPath: "Properties[0].address.pincode",
      floatingLabelText: "PT_PROPERTY_DETAILS_PINCODE",
      hintText: "PT_PROPERTY_DETAILS_PINCODE_PLACEHOLDER",
      numcols: 6,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "Pincode should be 6 digits",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: "^([0-9]){6}$",
    },
    oldPID: {
      id: "oldpid",
      type: "textFieldIcon",
      className: "pt-old-pid-text-field",
      text: "SEARCH",
      iconRedirectionURL: "https://pmidc.punjab.gov.in/propertymis/search.php",
      jsonPath: "Properties[0].oldPropertyId",
      floatingLabelText: "PT_PROPERTY_ADDRESS_EXISTING_PID",
      hintText: "PT_PROPERTY_ADDRESS_EXISTING_PID_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTip: true,
      pattern: /^[a-zA-Z0-9\:\#\/\-\s]{1,64}$/i,
      toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
      maxLength: 64,
    },
  },
  afterInitForm: (action, store, dispatch) => {
    try {
      let state = store.getState();
      const { cities, citiesByModule } = state.common;
      const PT = citiesByModule && citiesByModule.PT;
      if (PT) {
        const tenants = PT.tenants;
        const dd = tenants.reduce((dd, tenant) => {
          let selected = cities.find((city) => {
            return city.code === tenant.code;
          });
          dd.push({ label: selected.name, value: selected.code });
          return dd;
        }, []);
        dispatch(setFieldProperty("propertyAddress", "city", "dropDownData", dd));
      }
      return action;
    } catch (e) {
      console.log(e);
      return action;
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
