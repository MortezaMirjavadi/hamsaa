import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {GlobalProvider} from "@App/store";
import App from "@Components/App";
import "@Assets/styles/main.css";

function renderApp(App) {
  const rootElement = document.getElementById("root");

  ReactDOM.render(
      <GlobalProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>,
      </GlobalProvider>,
    rootElement
  );
}

renderApp(App);
