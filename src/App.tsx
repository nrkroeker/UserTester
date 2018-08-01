import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "./ThemeOverride";
import { NavBar } from "components";
import { Dashboard, CardSort } from "scenes";
import "typeface-nunito";

export default class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider theme={Theme}>
                <Switch>
                    <NavBar>
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/cardsort/*" component={CardSort} />
                    </NavBar>
                </Switch>
            </MuiThemeProvider>
        );
    }
}

