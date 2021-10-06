import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Helmet } from 'react-helmet'

import { store } from "@/Logic/redux";
import { App } from "@/Components";
import './index.css';
import 'fontsource-roboto';


ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <title>Magicdex</title>
      <link href="//cdn.jsdelivr.net/npm/keyrune@latest/css/keyrune.css" rel="stylesheet" type="text/css" /> {/* keyrune */}
      <link href="//cdn.jsdelivr.net/npm/mana-font@latest/css/mana.css" rel="stylesheet" type="text/css" /> {/* mana */}
      {/* <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /> material-icons */}
    </Helmet>

    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
