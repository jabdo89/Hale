import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const Authmiddleware = ({ component: Component, layout: Layout }) => (
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

export default withRouter(Authmiddleware);
