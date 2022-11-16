import React from "react";
import ReactDOM from "react-dom/client";
import "./ui/styles/index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./bll/store/store";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
);
