import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "@/Logic";
import { App } from "@/Components";
import './index.css';
import 'fontsource-roboto';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
