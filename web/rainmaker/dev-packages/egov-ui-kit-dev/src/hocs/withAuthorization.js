import React from "react";
import { connect } from "react-redux";
import { Icon } from "components";
import { compose } from "redux";
import withData from "./withData";
import { Header } from "modules/common";
import { ActionMenu } from "modules/common";
import IconButton from "material-ui/IconButton";
import Label from "egov-ui-kit/utils/translationNode";
import { logout } from "egov-ui-kit/redux/auth/actions";
import SortDialog from "../common/common/Header/components/SortDialog";

const withAuthorization = (options = {}) => (Component) => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      if (typeof androidAppProxy !== "undefined" && window.androidAppProxy.smsReceiverRunning()) {
        window.androidAppProxy.stopSMSReceiver();
      }
    }
    state = {
      titleAddon: "",
      sortPopOpen: false,
    };
    style = {
      iconStyle: {
        height: "30px",
        width: "30px",
      },
    };

    componentWillMount() {
      const { authenticated } = this.props;
      const { redirectionUrl } = options;
      if (!authenticated) {
        const baseUrl = process.env.REACT_APP_NAME === "Citizen" ? "/user/register" : "/user/login";
        this.props.history.replace(redirectionUrl || baseUrl);
      }
    }

    roleFromUserInfo = (userInfo, role) => {
      const roleCodes =
        userInfo && userInfo.roles
          ? userInfo.roles.map((role) => {
              return role.code;
            })
          : [];
      return roleCodes && roleCodes.length && roleCodes.indexOf(role) > -1 ? true : false;
    };

    renderCustomTitle = (numberOfComplaints) => {
      const titleAddon = numberOfComplaints ? `(${numberOfComplaints})` : "(0)";
      this.setState({ titleAddon });
    };

    closeSortDialog = () => {
      this.setState({
        sortPopOpen: false,
      });
    };

    onSortClick = () => {
      this.setState({
        sortPopOpen: true,
      });
    };
    //Duplication due to lack of time for proper testing in PGR

    renderCustomTitleForPt = (title) => {
      const titleAddon = title ? title : "";
      this.setState({ titleAddon });
    };

    render() {
      const {
        hideHeader,
        hideFooter,
        customTitle,
        customFor,
        hideFor,
        title,
        isHomeScreen,
        hideTitle,
        titleBackground,
        hideActionMenu,
        refreshButton,
        sortButton,
        searchButton,
        showNumberOfComplaints,
      } = options;
      const { history, authenticated, userInfo, complaints } = this.props;
      const { titleAddon } = this.state;
      const { style } = this;
      const role = this.roleFromUserInfo(userInfo, "CITIZEN")
        ? "citizen"
        : this.roleFromUserInfo(userInfo, "GRO") || this.roleFromUserInfo(userInfo, "DGRO")
        ? "ao"
        : this.roleFromUserInfo(userInfo, "CSR")
        ? "csr"
        : this.roleFromUserInfo(userInfo, "EMPLOYEE")
        ? "employee"
        : this.roleFromUserInfo(userInfo, "PGR-ADMIN")
        ? "pgr-admin"
        : "";

      //For restricting citizen to access employee url

      if (process.env.NODE_ENV === "production") {
        const _role = role === "citizen" ? "citizen" : "employee";
        if (window.basename.slice(1).toLowerCase() !== _role) {
          this.props.logout();
        }
      }
      const getUserRole = () => {
        let { userInfo } = this.props;
        return (userInfo && userInfo.roles && userInfo.roles.length > 0 && userInfo.roles[0].code.toUpperCase()) || null;
      };
      return (
        <div className="rainmaker-header-cont" style={{ position: "relative" }}>
          {!hideHeader && authenticated ? (
            <Header
              title={title}
              titleAddon={role !== hideFor && titleAddon && titleAddon}
              userInfo={userInfo}
              role={role}
              options={options}
              history={history}
              refreshButton={refreshButton}
              sortButton={sortButton}
              searchButton={searchButton}
              className="rainmaker-header"
            />
          ) : null}
          <div className=" col-xs-12" style={{ padding: 0 }}>
            {!hideActionMenu && authenticated && (
              <div>
                <div className="col-xs-2 action-menu-drawer show-action-menu" id="menu-container">
                  <div className="rainmaker-action-menu">
                    <ActionMenu role={role} />
                  </div>
                </div>
                <div className="col-xs-2  show-action-menu" /> {/*Dummy div for proper alignment - fixed positioning drawbacks*/}
              </div>
            )}

            <div className={"col-xs-12 col-sm-10"} style={{ padding: 0 }}>
              {authenticated ? (
                <div>
                  {!hideTitle && role !== hideFor && (
                    <div>
                      <div className={"screen-title-label col-xs-8"} style={{ padding: "24px 0 8px 16px" }}>
                        <Label
                          className={titleBackground ? "title-white-background screen-title-label" : "screen-title-label"}
                          label={role === customFor ? customTitle : title}
                          containerStyle={{ marginRight: 3 }}
                          dark={true}
                          bold={true}
                          fontSize={20}
                        />
                        {titleAddon && (
                          <Label
                            className={titleBackground ? "title-white-background screen-title-label" : "screen-title-label"}
                            label={titleAddon}
                            dark={true}
                            bold={true}
                            fontSize={20}
                          />
                        )}
                      </div>
                      {sortButton && (
                        <div className="sort-button col-xs-4" style={{ padding: "20px 20px 0px 0px" }}>
                          <div
                            className="rainmaker-displayInline"
                            style={{ cursor: "pointer", justifyContent: "flex-end" }}
                            onClick={this.onSortClick}
                          >
                            <Label
                              label="ES_SORT_BOTTON"
                              color="rgba(0, 0, 0, 0.8700000047683716)"
                              containerStyle={{ marginRight: 5 }}
                              labelStyle={{ fontWeight: 500 }}
                            />
                            <Icon style={style.iconStyle} action="action" name="swap-vert" color="#484848" />
                          </div>
                          <SortDialog sortPopOpen={this.state.sortPopOpen} closeSortDialog={this.closeSortDialog} />
                        </div>
                      )}
                    </div>
                  )}
                  <Component
                    {...this.props}
                    title={title}
                    renderCustomTitleForPt={this.renderCustomTitleForPt}
                    renderCustomTitle={this.renderCustomTitle}
                  />
                </div>
              ) : null}
            </div>
          </div>
          {/* {!hideFooter && authenticated ? (
            <div className="hidden-md hidden-sm hidden-lg">
              <Footer history={history} role={role} />
            </div>
          ) : null} */}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const { authenticated, userInfo } = state.auth;
    const { complaints } = state || {};
    return { authenticated, userInfo };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logout()),
    };
  };
  return compose(
    withData,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(Wrapper);
};

export default withAuthorization;
