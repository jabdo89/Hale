import React from "react";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
  changeTopbarTheme,
  showRightSidebarAction,
} from "../../redux/Actions/actions";

//SimpleBar
import SimpleBar from "simplebar-react";

import { Link } from "react-router-dom";

import "./rightbar.scss";

const RightSidebar = (props) => {
  return (
    <React.Fragment>
      <div className="right-bar">
        <SimpleBar style={{ height: "900px" }}>
          <div data-simplebar className="h-100">
            <div className="rightbar-title px-3 py-4">
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  props.showRightSidebarAction(false);
                }}
                className="right-bar-toggle float-right"
              >
                <i className="mdi mdi-close noti-icon"></i>
              </Link>
              <h5 className="m-0">Settings</h5>
            </div>

            <hr className="my-0" />

            <div className="p-4">
              <div className="radio-toolbar">
                <span className="mb-2 d-block">Layouts</span>
                <input
                  type="radio"
                  id="radioVertical"
                  name="radioFruit"
                  value="vertical"
                  checked={props.layoutType === "vertical"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.changeLayout(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioVertical">Vertical</label>
                {"   "}
                <input
                  type="radio"
                  id="radioHorizontal"
                  name="radioFruit"
                  value="horizontal"
                  checked={props.layoutType === "horizontal"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.changeLayout(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioHorizontal">Horizontal</label>
              </div>

              <hr className="mt-1" />

              <div className="radio-toolbar">
                <span className="mb-2 d-block" id="radio-title">
                  Layout Width
                </span>
                <input
                  type="radio"
                  id="radioFluid"
                  name="radioWidth"
                  value="fluid"
                  checked={props.layoutWidth !== "boxed"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.changeLayoutWidth(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioFluid">Fluid</label>
                {"   "}
                <input
                  type="radio"
                  id="radioBoxed"
                  name="radioWidth"
                  value="boxed"
                  checked={props.layoutWidth === "boxed"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.changeLayoutWidth(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioBoxed">Boxed</label>
              </div>
              <hr className="mt-1" />

              <div className="radio-toolbar">
                <span className="mb-2 d-block" id="radio-title">
                  Topbar Theme
                </span>
                <input
                  type="radio"
                  id="radioThemeLight"
                  name="radioTheme"
                  value="light"
                  checked={props.topbarTheme === "light"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.changeTopbarTheme(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioThemeLight">Light</label>
                {"   "}
                <input
                  type="radio"
                  id="radioThemeDark"
                  name="radioTheme"
                  value="dark"
                  checked={props.topbarTheme === "dark"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.changeTopbarTheme(e.target.value);
                    }
                  }}
                />

                <label htmlFor="radioThemeDark">Dark</label>
                {"   "}
                {props.layoutType === "vertical" ? null : (
                  <>
                    {" "}
                    <input
                      type="radio"
                      id="radioThemeColored"
                      name="radioTheme"
                      value="colored"
                      checked={props.topbarTheme === "colored"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeTopbarTheme(e.target.value);
                        }
                      }}
                    />
                    <label htmlFor="radioThemeColored">Colored</label>{" "}
                  </>
                )}
              </div>

              {props.layoutType === "vertical" ? (
                <React.Fragment>
                  <hr className="mt-1" />
                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">
                      Left Sidebar Type{" "}
                    </span>
                    <input
                      type="radio"
                      id="sidebarDefault"
                      name="sidebarType"
                      value="default"
                      checked={props.leftSideBarType === "default"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarType(e.target.value);
                        }
                      }}
                    />
                    <label htmlFor="sidebarDefault">Default</label>
                    {"   "}
                    <input
                      type="radio"
                      id="sidebarCompact"
                      name="sidebarType"
                      value="compact"
                      checked={props.leftSideBarType === "compact"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarType(e.target.value);
                        }
                      }}
                    />
                    <label htmlFor="sidebarCompact">Compact</label>
                    {"   "}
                    <input
                      type="radio"
                      id="sidebarIcon"
                      name="sidebarType"
                      value="icon"
                      checked={props.leftSideBarType === "icon"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarType(e.target.value);
                        }
                      }}
                    />
                    <label htmlFor="sidebarIcon">Icon</label>
                  </div>

                  <hr className="mt-1" />

                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">
                      Left Sidebar Color
                    </span>
                    <input
                      type="radio"
                      id="leftsidebarThemelight"
                      name="leftsidebarTheme"
                      value="light"
                      checked={props.leftSideBarTheme === "light"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarTheme(e.target.value);
                        }
                      }}
                    />

                    <label htmlFor="leftsidebarThemelight">Light</label>
                    {"   "}
                    <input
                      type="radio"
                      id="leftsidebarThemedark"
                      name="leftsidebarTheme"
                      value="dark"
                      checked={props.leftSideBarTheme === "dark"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarTheme(e.target.value);
                        }
                      }}
                    />

                    <label htmlFor="leftsidebarThemedark">Dark</label>
                    {"   "}
                    <input
                      type="radio"
                      id="leftsidebarThemecolored"
                      name="leftsidebarTheme"
                      value="colored"
                      checked={props.leftSideBarTheme === "colored"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarTheme(e.target.value);
                        }
                      }}
                    />

                    <label htmlFor="leftsidebarThemecolored">Colored</label>
                  </div>
                  <hr className="mt-1" />
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </SimpleBar>
      </div>
      <div className="rightbar-overlay"></div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default connect(mapStatetoProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeLayoutWidth,
  changeTopbarTheme,
  changePreloader,
  showRightSidebarAction,
})(RightSidebar);
