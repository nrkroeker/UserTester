import * as React from "react";
import { StyleRules, Theme, withStyles } from "@material-ui/core/styles";
import Types from "./DndTypes";
import {
    DropTarget,
    DropTargetMonitor,
    ConnectDropTarget,
} from "react-dnd";
import * as models from "models";
import Card, { CardLocation } from "./Card";

const styles = (theme: Theme): StyleRules => ({
    container: {
        minHeight: "40px",
        width: "300px",
        padding: "8px"
    },
    placeholder: {
        backgroundColor: "#bdbdbd",
        width: "282px",
        height: "32px",
        borderRadius: 4
    }
});

interface CardListProps {
    isOver?: boolean;
    canDrop?: boolean;
    connectDropTarget?: ConnectDropTarget;
    cards?: models.Card[];
    location: CardLocation;
    moveCard(from: CardLocation, to: CardLocation): void;
}

const cardTarget = {
    drop(props: CardListProps, monitor: DropTargetMonitor) {
        const from = monitor.getItem().location;
        const to = { ...props.location, cardIndex: 0 };
        props.moveCard(from, to);
    }
};

type Props = { classes: any } & CardListProps;
@DropTarget(Types.CARD, cardTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
}))
class CardList extends React.Component<Props> {
    render() {
        const { canDrop, cards, classes, connectDropTarget, isOver } = this.props;
        return connectDropTarget &&
            connectDropTarget(
                <div className={classes.container}>
                    {cards.length > 0 ? cards.map((card, index) => (
                        <Card
                            key={card.id}
                            card={card}
                            location={{...this.props.location, cardIndex: index }}
                            moveCard={this.props.moveCard}
                        />
                    ))
                    : isOver && canDrop &&
                    <div className={classes.placeholder} />
                    }
                </div>
            );
    }
}

export default withStyles(styles)(CardList);
