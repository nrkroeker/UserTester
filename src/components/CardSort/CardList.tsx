import * as React from "react";
import { findDOMNode } from "react-dom";
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
        minHeight: "48px",
        height: "calc(100% - 16px)",
        width: "284px",
        padding: "8px"
    },
    placeholder: {
        width: "284px",
        minHeight: "32px",
        marginBottom: "8px",
        borderRadius: 4,
        backgroundColor: "#bdbdbd"
    }
});

const cardTarget = {
    hover(props: CardListProps, monitor: DropTargetMonitor, component: Element | null): any {
        const item = monitor.getItem();
        const { placeholder, location: to } = props;
        if (placeholder && placeholder.location.position === to.position && placeholder.location.groupIndex === to.groupIndex) return undefined;
        const hoverBoundingRect = (findDOMNode(
            component,
        ) as Element).getBoundingClientRect();
        const height = item.height;
        if (props.cards.length === 0) {
            props.setPlaceholder({ location: {...to, cardIndex: 0}, height });
        } else {
            props.setPlaceholder({ location: {...to, cardIndex: props.cards.length}, height });
        }
    },
    drop(props: CardListProps, monitor: DropTargetMonitor) {
        const from = monitor.getItem().location;
        props.moveCard(from, props.placeholder.location);
    }
};

interface CardListProps {
    isOver?: boolean;
    canDrop?: boolean;
    connectDropTarget?: ConnectDropTarget;
    cards?: models.Card[];
    location: CardLocation;
    placeholder?: {
        location: CardLocation,
        height: number
    };
    setPlaceholder(placeholder: { location: CardLocation, height: number }): void;
    moveCard(from: CardLocation, to: CardLocation): void;
}
type Props = { classes: any } & CardListProps;

@DropTarget(Types.CARD, cardTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
}))
class CardList extends React.Component<Props> {
    render() {
        const { canDrop, cards, classes, connectDropTarget, isOver, location, placeholder } = this.props;
        const isPlaceholder = placeholder && placeholder.location.position === location.position && placeholder.location.groupIndex === location.groupIndex;
        const placeholderItem = <div className={classes.placeholder} style={{ height: placeholder ? placeholder.height : 32 }} />;
        return connectDropTarget &&
            connectDropTarget(
                <div className={classes.container}>
                    {cards.length > 0 ? cards.map((card, index) => (
                        <React.Fragment key={"cardGroup" + index}>
                            {isPlaceholder && placeholder.location.cardIndex === index && index === 0 && placeholderItem}
                            <Card
                                key={"card" + card.id}
                                card={card}
                                location={{...this.props.location, cardIndex: index }}
                                setPlaceholder={this.props.setPlaceholder}
                            />
                            {isPlaceholder && placeholder.location.cardIndex === index + 1 && placeholderItem}
                        </React.Fragment>
                    ))
                    : isPlaceholder && placeholderItem}
                </div>
            );
    }
}

export default withStyles(styles)(CardList);
