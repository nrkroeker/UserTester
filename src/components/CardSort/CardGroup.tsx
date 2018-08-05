import * as React from "react";
import { Paper, Typography } from "@material-ui/core";
import { Theme, withStyles } from "@material-ui/core/styles";
import * as models from "models";

const styles = (theme: Theme) => ({
    group: {
        width: "266px",
    },
    groupPaper: {
        padding: "8px"
    },
    cards: {
        backgroundColor: theme.palette.secondary.light,
    }
});

export interface CardGroupProps {
    title?: string;
    cards?: models.Card[];
}
type Props = CardGroupProps & { classes: any };

class CardGroup extends React.Component<Props> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.group}>
                <Paper className={classes.groupPaper}>
                    <Typography variant="body2">{this.props.title}</Typography>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(CardGroup);
