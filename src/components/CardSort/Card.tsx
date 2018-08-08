import * as React from "react";
import { findDOMNode } from "react-dom";
import * as classNames from "classnames";
import { Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Types from "./DndTypes";
import { getEmptyImage } from "react-dnd-html5-backend";
import {
    ConnectDragPreview,
    ConnectDragSource,
    ConnectDropTarget,
    DragSource,
    DragSourceConnector,
    DragSourceMonitor,
    DropTarget,
    DropTargetMonitor
} from "react-dnd";
import { XYCoord } from "dnd-core";
import * as models from "models";

const styles = {
    card: {
        width: "266px",
        cursor: "move"
    },
    label: {
        padding: "8px",
    },
    cardBox: {
        width: "266px",
        marginBottom: "8px",
        height: "32px",
        borderRadius: 4
    },
    draggingCard: {
        opacity: 0,
        height: 0
    },
    dragSpace: {
        backgroundColor: "#bdbdbd",
    }
};

export interface CardLocation {
    position: "list" | "groups";
    cardIndex?: number;
    groupIndex?: number;
}

export interface CardProps {
    card: models.Card;
    location?: CardLocation;
    isDragging?: boolean;
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    moveCard?(from: CardLocation, to: CardLocation): void;
}
type Props = CardProps & { classes: any };

const cardSource = {
    beginDrag(props: CardProps) {
        return {
            card: props.card,
            location: props.location
        };
    },
};

const cardTarget = {
    canDrop() {
        return false;
    },
    hover(props: CardProps, monitor: DropTargetMonitor, component: Card | null): any {
        const from = monitor.getItem().location;
        const to = props.location;

        if (from.cardIndex !== to.cardIndex || from.groupIndex !== to.groupIndex) {
            const hoverBoundingRect = (findDOMNode(
                component,
            ) as Element).getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (from.cardIndex < to.cardIndex && hoverClientY < hoverMiddleY) {
                return undefined;
            }
            if (from.cardIndex > to.cardIndex && hoverClientY > hoverMiddleY) {
                return undefined;
            }
            props.moveCard(from, to);
            monitor.getItem().location = {...to};
        }
    }
};

@DropTarget(Types.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource(
    Types.CARD,
    cardSource,
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
        connectDragPreview: connect.dragPreview(),
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }),
)
class Card extends React.Component<Props> {
    componentDidMount() {
        const { connectDragPreview } = this.props;
        if (connectDragPreview) {
            connectDragPreview(getEmptyImage(), {
                captureDraggingState: true,
            });
        }
    }

    render() {
        const { isDragging, classes, connectDragSource, connectDropTarget } = this.props;
        return connectDragSource && connectDropTarget &&
            connectDragSource(
                connectDropTarget(
                    <div className={classNames(classes.cardBox, { [classes.dragSpace]: isDragging })}>
                        <Paper className={classNames(classes.card, { [classes.draggingCard]: isDragging})}>
                            <Typography className={classes.label} variant="body1">{this.props.card.label}</Typography>
                        </Paper>
                    </div>
                )
        );
    }
}

export default withStyles(styles)(Card);
