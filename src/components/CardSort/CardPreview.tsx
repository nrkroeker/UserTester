import * as React from "react";
import Card, { CardProps } from "./Card";
import { Paper, Typography } from "@material-ui/core";
import { StyleRules, withStyles } from "@material-ui/core/styles";

const styles: StyleRules = {
    preview: {
        display: "inline-block",
        transform: "rotate(3deg)",
        WebkitTransform: "rotate(3deg)",
        pointerEvents: "none"
    },
    card: {
        width: "284px",
        cursor: "move"
    },
    label: {
        padding: "8px"
    }
};
type Props = CardProps & { classes: any };
class CardPreview extends React.PureComponent<Props> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.preview}>
                <Paper className={classes.card}>
                    <Typography className={classes.label} variant="body1">{this.props.card.label}</Typography>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(CardPreview);
