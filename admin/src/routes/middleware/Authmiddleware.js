import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

const Authmiddleware = ({ component: Component, layout: Layout, profile }) => (
  <Route
    render={(props) => {
      // here you can apply condition
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default compose(connect(mapStateToProps), withRouter)(Authmiddleware);
