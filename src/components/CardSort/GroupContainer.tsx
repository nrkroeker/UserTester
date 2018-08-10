import * as React from "react";
import * as classNames from "classnames";
import { Grid, Paper } from "@material-ui/core";
import { StyleRules, Theme, withStyles } from "@material-ui/core/styles";
import * as models from "models";
import { CardGroup, CardLocation } from "components";
import Types from "./DndTypes";

const styles = (theme: Theme): StyleRules => ({
    container: {
        width: "100%",
        height: "100%",
        padding: theme.spacing.unit,
        overflow: "auto"
    },
    groupItem: {
        height: "fit-content"
    }
});

interface GroupContainerProps {
    groups?: models.CardGroup[];
    moveCard(from: CardLocation, to: CardLocation): void;
    placeholder?: {
        location: CardLocation,
        height: number
    };
    setPlaceholder(placeholder: { location: CardLocation, height: number }): void;
}
type Props = { classes: any } & GroupContainerProps;

class GroupContainer extends React.Component<Props> {
    render() {
        const { classes } = this.props;
        return (
            <Grid container alignItems="flex-start" justify="flex-start" spacing={16} className={classes.container}>
                {this.props.groups.map((group, index) => (
                    <Grid item xs key={group.title} className={classes.groupItem}>
                        <CardGroup
                            key={group.title}
                            index={index}
                            title={group.title}
                            cards={group.cards}
                            moveCard={this.props.moveCard}
                            placeholder={this.props.placeholder}
                            setPlaceholder={this.props.setPlaceholder}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default withStyles(styles)(GroupContainer);
