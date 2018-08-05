import * as React from "react";
import Card, { CardProps } from "./Card";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    preview: {
        display: "inline-block",
        transform: "rotate(3deg)",
        WebkitTransform: "rotate(3deg)"
    }
};
type Props = CardProps & { classes: any };
class CardPreview extends React.PureComponent<Props> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.preview}>
                <Card card={this.props.card} />
            </div>
        );
    }
}

export default withStyles(styles)(CardPreview);
