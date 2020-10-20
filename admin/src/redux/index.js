import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import { Provider, useSelector } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
// import thunk from 'redux-thunk';
import createSagaMiddleware from "redux-saga";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import allReducers from "./Reducers/allReducers";
import { firebaseConfig, rrfConfig } from "./config";
import rootSaga from "./sagas";

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <div></div>;
  return children;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  allReducers,
  compose(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const ReduxWrapper = ({ children }) => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>{children}</AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>
);

ReduxWrapper.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ReduxWrapper;
