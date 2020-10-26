import React from "react";

import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

// Import Firebase Configuration file
import { initFirebaseBackend } from "./helpers/firebase_helper";

import fakeBackend from "./helpers/AuthType/fakeBackend";

import Login from "./pages/Authentication/Login";
import Logout from "./pages/Authentication/Logout";
import Register from "./pages/Authentication/Register";
import ForgetPwd from "./pages/Authentication/ForgetPassword";

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
//   apiKey: "AIzaSyDqCfeEGAFooSlpMTHVRXkqdXGRdfuD4iY",
//   authDomain: "hale-dd838.firebaseapp.com",
//   databaseURL: "https://hale-dd838.firebaseio.com",
//   projectId: "hale-dd838",
//   storageBucket: "hale-dd838.appspot.com",
//   messagingSenderId: "149037020644",
//   appId: "1:149037020644:web:da657b3a259c14188b83f1",
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

function AuthIsLoaded() {
  const auth = useSelector((state) => state.firebase.auth);
  if (auth.isEmpty) return true;
  return false;
}

const App = (props) => {
  function getLayout() {
    let layoutCls = VerticalLayout;
    console.log(props.layout);
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout();
  console.log(AuthIsLoaded());

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {AuthIsLoaded() ? (
            <div>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Register />
              </Route>
              <Route path="/recover">
                <ForgetPwd />
              </Route>
              <Redirect to="/login" />
            </div>
          ) : (
            userRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
              />
            ))
          )}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
