import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import ReduxWrapper from "./redux";

const app = (
  <ReduxWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxWrapper>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
