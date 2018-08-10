import * as React from "react";
import { Paper, Typography } from "@material-ui/core";
import { Theme, withStyles } from "@material-ui/core/styles";
import { CardList, CardLocation } from "components";
import * as models from "models";

const styles = (theme: Theme) => ({
    group: {
        width: "300px"
    },
    groupHeader: {
        padding: "8px"
    },
    cards: {
        backgroundColor: theme.palette.secondary.light,
        minHeight: "48px",
    }
});

export interface CardGroupProps {
    index: number;
    title?: string;
    cards?: models.Card[];
    moveCard(from: CardLocation, to: CardLocation): void;
    placeholder?: {
        location: CardLocation,
        height: number
    };
    setPlaceholder(placeholder: { location: CardLocation, height: number }): void;
}
type Props = CardGroupProps & { classes: any };

class CardGroup extends React.Component<Props> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.group}>
                <Paper>
                    <Typography className={classes.groupHeader} variant="body2">{this.props.title}</Typography>
                    <div className={classes.cards}>
                        <CardList
                            cards={this.props.cards}
                            location={{ position: "groups", groupIndex: this.props.index}}
                            moveCard={this.props.moveCard}
                            placeholder={this.props.placeholder}
                            setPlaceholder={this.props.setPlaceholder}
                        />
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(CardGroup);
