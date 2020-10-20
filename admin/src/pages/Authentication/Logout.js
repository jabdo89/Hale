import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logoutUser } from "../../redux/Actions/actions";

const Logout = (props) => {
  useEffect(() => {
    props.logoutUser(props.history);
  });

  return <></>;
};

export default withRouter(connect(null, { logoutUser })(Logout));
