import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import dashReducer from "./dashReducer";
import authReducer from "./authReducer";

// Front
import Layout from ".././layout/reducer";

// Authentication
import Login from ".././auth/login/reducer";
import Account from ".././auth/register/reducer";
import ForgetPassword from ".././auth/forgetpwd/reducer";
import Profile from ".././auth/profile/reducer";

const allReducers = combineReducers({
  auth: authReducer,
  dash: dashReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
});

export default allReducers;
