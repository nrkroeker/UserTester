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
        margin: "8px",
        height: "32px",
        borderRadius: 4
    },
    draggingCard: {
        opacity: 0,
        height: 0
    },
    dragSpace: {
        backgroundColor: "lightgray",
    }
};

export interface CardProps {
    card: models.Card;
    index?: number;
    isDragging?: boolean;
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    moveCard?(originalIndex: number, atIndex: number): void;
}
type Props = CardProps & { classes: any };

const cardSource = {
    beginDrag(props: CardProps) {
        return {
            card: props.card,
            index: props.index
        };
    },
};

const cardTarget = {
    canDrop() {
        return false;
    },
    hover(props: CardProps, monitor: DropTargetMonitor, component: Card | null): any {
        const dragIndex = monitor.getItem().index;
        const { index: overIndex } = props;

        if (dragIndex !== overIndex) {
            const hoverBoundingRect = (findDOMNode(
                component,
            ) as Element).getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (dragIndex < overIndex && hoverClientY < hoverMiddleY) {
                return undefined;
            }
            if (dragIndex > overIndex && hoverClientY > hoverMiddleY) {
                return undefined;
            }
            props.moveCard(dragIndex, overIndex);
            monitor.getItem().index = overIndex;
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
