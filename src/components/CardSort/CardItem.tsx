import * as React from "react";
import { Paper } from "@material-ui/core";
import { StyleComponentProps, withStyles } from "@material-ui/core/styles";
import {
    ConnectDragSource,
    DragSource,
    DragSourceConnector,
    DragSourceMonitor,
} from "react-dnd";
import { Card } from "Models";

const styles = {
    cardBox: {
        width: "268px"
    }
};

interface CardItemProps extends StyleComponentProps {
    card: Card;
}

@withStyles(styles)
class CardItem extends React.Component<CardItemProps> {
    render() {
        console.log(this.props.card);
        const { classes } = this.props;
        return (
            <Paper className={classes.cardBox}>
                {this.props.card.label}
            </Paper>
        );
    }
}

export default CardItem;
