import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import HeaderSocial from "./sub-components/HeaderSocial";
import NavMenu from "./NavMenu";
import Logo from "./logo.gif";

const OffcanvasMenu = ({ activeState, getActiveState }) => {
  return (
    <div className={`clickable-mainmenu ${activeState ? "inside" : ""}`}>
      <div className="clickable-mainmenu-icon">
        <button
          className="clickable-mainmenu-close"
          onClick={() => getActiveState(false)}
        >
          <span className="pe-7s-close"></span>
        </button>
      </div>
      <div className="side-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img alt="" src={Logo} />
        </Link>
      </div>
      {/* nav menu*/}
      <NavMenu sidebarMenu={true} />

      {/* header social */}
      <HeaderSocial />
    </div>
  );
};

OffcanvasMenu.propTypes = {
  activeState: PropTypes.bool,
  getActiveState: PropTypes.func,
};

export default OffcanvasMenu;
