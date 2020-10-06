import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import firebase from "firebase";
import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/rootReducer";
import { createFirestoreInstance } from "redux-firestore";
import App from "./App";
import {
  ReactReduxFirebaseProvider,
  getFirestore,
  getFirebase,
} from "react-redux-firebase";
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";

import { composeWithDevTools } from "redux-devtools-extension";

const firebaseConfig = {
  apiKey: "AIzaSyDqCfeEGAFooSlpMTHVRXkqdXGRdfuD4iY",
  authDomain: "hale-dd838.firebaseapp.com",
  databaseURL: "https://hale-dd838.firebaseio.com",
  projectId: "hale-dd838",
  storageBucket: "hale-dd838.appspot.com",
  messagingSenderId: "149037020644",
  appId: "1:149037020644:web:da657b3a259c14188b83f1",
};

const middlewares = [thunk.withExtraArgument(getFirebase, getFirestore)];

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(...middlewares, save()))
);

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rrfConfig = {
  userProfile: "Users",
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
