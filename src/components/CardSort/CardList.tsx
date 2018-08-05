import * as React from "react";
import { StyleRules, Theme, withStyles } from "@material-ui/core/styles";
import Types from "./DndTypes";
import {
    DropTarget,
    ConnectDropTarget,
} from "react-dnd";
import * as models from "models";
import Card from "./Card";

const styles = (theme: Theme): StyleRules => ({
    container: {
        height: "100%"
    }
});

interface CardListProps {
    connectDropTarget?: ConnectDropTarget;
    cards: models.Card[];
    moveCard(originalIndex: number, atIndex: number): void;
}

const cardTarget = {
    drop() {
        return { name: "Card List" };
    },
};

type Props = { classes: any } & CardListProps;
@DropTarget(Types.CARD, cardTarget, connect => ({
        connectDropTarget: connect.dropTarget(),
}))
class CardList extends React.Component<Props> {
    render() {
        const { cards, classes, connectDropTarget } = this.props;
        return connectDropTarget &&
            connectDropTarget(
                <div style={{ height: "100%", width: "100%"}}>
                    {cards && cards.map((card, index) => (
                        <Card
                            key={card.id}
                            index={index}
                            card={card}
                            moveCard={this.props.moveCard}
                        />
                    ))}
                </div>
            );
    }
}

export default withStyles(styles)(CardList);
