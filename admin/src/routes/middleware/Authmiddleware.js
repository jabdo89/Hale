import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const Authmiddleware = ({ component: Component, layout: Layout, profile }) => (
  <Route
    render={(props) => {
      // here you can apply condition
      console.log(profile);
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
