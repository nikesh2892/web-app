import * as actionTypes from "./actionTypes";
import { LOCALATION, ACTIONMENU, MDMS } from "egov-ui-kit/utils/endPoints";
import { httpRequest } from "egov-ui-kit/utils/api";
import { getCurrentAddress } from "egov-ui-kit/utils/commons";
import commonConfig from "config/common";
import { debug } from "util";

export const setRoute = (route) => {
  return { type: actionTypes.SET_ROUTE, route };
};

export const setBottomNavigationIndex = (bottomNavigationIndex) => {
  return { type: actionTypes.CHANGE_BOTTOM_NAVIGATION_INDEX, bottomNavigationIndex };
};

const setLocalizationLabels = (locale, localizationLabels) => {
  window.localStorage.setItem(`localization_${locale}`, JSON.stringify(localizationLabels));
  window.localStorage.setItem("locale", locale);
  return { type: actionTypes.ADD_LOCALIZATION, locale, localizationLabels };
};

export const toggleSnackbarAndSetText = (open, message, error) => {
  return {
    type: actionTypes.SHOW_TOAST,
    open,
    message,
    error,
  };
};

export const fetchLocalizationLabel = (locale) => {
  return async (dispatch) => {
    try {
      //let payload = { messages: JSON.parse(window.localStorage.getItem(`localization_${locale}`)) || [] };
      //if (!payload.messages.length) {
      const payload = await httpRequest(LOCALATION.GET.URL, LOCALATION.GET.ACTION, [
        { key: "module", value: "rainmaker-pgr,rainmaker-pt,rainmaker-tl,finance-erp" },
        { key: "locale", value: locale },
        { key: "tenantId", value: commonConfig.tenantId },
      ]);
      //}
      dispatch(setLocalizationLabels(locale, payload.messages));
    } catch (error) {}
  };
};
const setActionItems = (payload) => {
  return {
    type: actionTypes.FETCH_ACTIONMENU,
    payload,
  };
};
const setCurrentLocation = (currentLocation) => {
  return {
    type: actionTypes.SET_USER_CURRENT_LOCATION,
    currentLocation,
  };
};

export const addBreadCrumbs = (url) => {
  return { type: actionTypes.ADD_BREADCRUMB_ITEM, url };
};

export const fetchCurrentLocation = () => {
  return async (dispatch) => {
    const currAddress = await getCurrentAddress();
    dispatch(setCurrentLocation(currAddress));
  };
};
export const fetchActionItems = (role, ts) => {
  return async (dispatch, getState) => {
    try {
      const payload = await httpRequest(ACTIONMENU.GET.URL, ACTIONMENU.GET.ACTION, [], role, [], ts);

      dispatch(setActionItems(payload.actions));
    } catch (error) {
      // dispatch(complaintFetchError(error.message));
    }
  };
};

export const setExternalUrls = (payload) => {
  return {
    type: actionTypes.FETCH_EXTERNAL_URLS,
    payload,
  };
};
export const fetchExternalUrls = () => {
  debug;
  return async (dispatch) => {
    const requestBody = {
      MdmsCriteria: {
        tenantId: "pb",
        moduleDetails: [
          {
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "Ui-Common-Config",
              },
            ],
          },
        ],
      },
    };
    try {
      const payload = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], requestBody);
      const { MdmsRes } = payload;
      const commonMasters = MdmsRes["common-masters"];
      const UiCommonConfig = commonMasters["Ui-Common-Config"];
      // const payload = {
      //   tradelicense: {
      //     routes: {
      //       search: {
      //         routePath: "/employee-tradelicence/mihy-ui-framework/tradelicence/search",
      //         isOrigin: false,
      //         domain: "https://egov-micro-dev.egovernments.org",
      //       },
      //     },
      //   },
      //   ws: {
      //     routes: {
      //       dashboard: {
      //         routePath: "",
      //         isOrigin: false,
      //         domain: "https://dashboard-pbuat.egovernments.org/app/kibana#/dashboards?title=W%20%26%20S%20Consumers%20Dashboard&embed=true",
      //       },
      //     },
      //   },
      // };
      dispatch(setExternalUrls(UiCommonConfig[0]));
    } catch (error) {
      console.log(error);
    }
  };
};
