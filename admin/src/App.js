import React, { useState } from "react";
import firebase from "firebase";
import Login from "./views/login";
import AppLayout from "./common/appLayout";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });
  return <>{isLogged ? <AppLayout /> : <Login />}</>;
};

export default App;
