import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default class NavBar extends React.Component {
    render() {
        return (
            <div style={{ height: "100%" }}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title">User Tester</Typography>
                    </Toolbar>
                </AppBar>
                {this.props.children}
            </div>
        );
    }
}
