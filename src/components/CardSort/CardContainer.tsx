import * as React from "react";
import * as classNames from "classnames";
import { Grid, Paper } from "@material-ui/core";
import { StyleRules, Theme, withStyles } from "@material-ui/core/styles";
import * as models from "models";
import CardGroup from "./CardGroup";
import Types from "./DndTypes";

const styles = (theme: Theme): StyleRules => ({
    container: {
        width: "100%",
        height: "100%"
    }
});

interface CardContainerProps {
    groups?: models.CardGroup[];
    groupCard(cardIndex: number, groupIndex: number): void;
}

type Props = { classes: any } & CardContainerProps;

class CardContainer extends React.Component<Props> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                {this.props.groups.map(group => (
                    <CardGroup key={group.title} title={group.title} />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(CardContainer);
