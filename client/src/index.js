import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App.js";
import React from "react";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import store from "./store/ConfigStore/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <GoogleOAuthProvider clientId="276320922714-ls8q6jdh2rbfc8qe3ck81d9a8096q5mm.apps.googleusercontent.com"> */}
    <App />
    {/* </GoogleOAuthProvider> */}
  </Provider>
);

reportWebVitals();
