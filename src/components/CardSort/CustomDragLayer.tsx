import * as React from "react";
import { DragLayer, XYCoord } from "react-dnd";
import Types from "./DndTypes";
import CardPreview from "./CardPreview";
import { CardProps } from "./Card";
import * as models from "models";
import { withStyles, StyleRules } from "@material-ui/core/styles";

const styles: StyleRules = {
    layer: {
        position: "fixed",
        pointerEvents: "none",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%"
    }
};

function getPosition(props: CustomDragLayerProps) {
    const { initialOffset, currentOffset } = props;
    if (!initialOffset || !currentOffset) {
        return {
            display: "none"
        };
    }
    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform
    };
}

export interface CustomDragLayerProps {
    item?: CardProps;
    initialOffset?: XYCoord;
    currentOffset?: XYCoord;
    isDragging?: boolean;
}
type Props = CustomDragLayerProps & { classes: any };

const CustomDragLayer: React.SFC<Props> = props => {
    const { item, classes, isDragging } = props;

    if (!isDragging) {
        return null;
    }
    return (
        <div className={classes.layer}>
            <div style={getPosition(props)}><CardPreview card={item.card} /></div>
        </div>
    );
};

const styledDragLayer = withStyles(styles)(CustomDragLayer);
export default DragLayer<CustomDragLayerProps>(monitor => ({
    item: monitor.getItem(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
}))(styledDragLayer);

