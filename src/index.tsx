/// <reference path="./def/material-ui.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>),
    document.getElementById("root") as HTMLElement
);
