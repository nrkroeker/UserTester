import { Color } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import "typeface-nunito";

export default createMuiTheme({
    typography: {
        fontFamily: "nunito"
    },
    palette: {
        primary: {
            light: "#FFA4A2",
            main: "#E57373",
            dark: "#AF4448",
            contrastText: "#FFFFFF"
        },
        secondary: {
            light: "#B2FEF7",
            main: "#80CBC4",
            dark: "#4F9A94"
        },
        background: {
            default: "#e0e0e0"
        },
    }
});
