import * as React from "react";
import * as _ from "lodash";
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
        width: "284px",
        cursor: "move",
        marginBottom: "8px",
    },
    label: {
        padding: "8px",
    },
    cardBox: {
    },
    draggingCard: {
        display: "none",
        // opacity: 0,
        // height: 0,
        marginBottom: 0
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
    isOver?: boolean;
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    placeholder?: { location: CardLocation, height: number };
    setPlaceholder?(placeholder: { location: CardLocation, height: number }): void;
}
type Props = CardProps & { classes: any };

const cardSource = {
    beginDrag(props: CardProps, monitor: DragSourceMonitor, component: Card | null) {
        const height = (findDOMNode(component) as Element).getBoundingClientRect().height;
        return {
            card: props.card,
            location: props.location,
            height
        };
    },
    isDragging(props: CardProps, monitor: DragSourceMonitor) {
        return props.card.id === monitor.getItem().card.id;
    }
};

const cardTarget = {
    hover(props: CardProps, monitor: DropTargetMonitor, component: Card | null): any {
        if (!component) return null;
        const item = { ...monitor.getItem() };
        const hover = { ...props.location };
        if (_.isEqual(hover, props.placeholder)) return undefined;
        const hoverBoundingRect = (findDOMNode(
            component,
        ) as Element).getBoundingClientRect();
        const placeholder = {
            location: hover,
            height: item.height
        };
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
        if (hoverClientY <= hoverMiddleY) {
            props.setPlaceholder(placeholder);
        }
        if (hoverClientY > hoverMiddleY) {
            placeholder.location.cardIndex += 1;
            props.setPlaceholder(placeholder);
        }
    },
    // drop(props: CardProps, monitor: DropTargetMonitor, component: Card | null): any {

    // }
};

@DropTarget(Types.CARD, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
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
                captureDraggingState: false,
            });
        }
    }

    render() {
        const { isDragging, classes, connectDragSource, connectDropTarget, isOver } = this.props;
        return connectDragSource && connectDropTarget &&
            connectDragSource(
                connectDropTarget(
                    <div className={classNames(classes.cardBox, { [classes.dragSpace]: isDragging && isOver })}>
                        <Paper className={classNames(classes.card, { [classes.draggingCard]: isDragging })}>
                            <Typography className={classes.label} variant="body1">{this.props.card.label}</Typography>
                        </Paper>
                    </div>
                )
        );
    }
}

export default withStyles(styles)(Card);
