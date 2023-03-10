import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App.js";
import React from "react";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
