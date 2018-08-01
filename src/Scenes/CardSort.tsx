import * as React from "react";
import db from "db";
import * as classNames from "classnames";
import { Grid, Paper } from "@material-ui/core";
import { StyleRules, Theme, withStyles } from "@material-ui/core/styles";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Card, CardSortTest } from "models";
import { RouteComponentProps } from "react-router";
import { CardItem } from "components/CardSort";

const styles = (theme: Theme): StyleRules => ({
    page: {
        margin: "24px",
        height: "calc(100% - " + theme.spacing.unit * 14 + "px)"
    },
    container: {
        height: "100%",
        overflow: "hidden",
        clear: "both"
    },
    full: {
        height: "100%"
    },
    bin: {
        width: "300px"
    }
});

interface CardSortState {
    cards: Card[];
}

type Props = { classes: any } & RouteComponentProps<any>;

class CardSort extends React.Component<Props, CardSortState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cards: undefined
        };
    }

    async componentDidMount() {
        // set this to secret code for test which creator can set or copy
        const testId = this.props.location.pathname.split("/").reverse()[0];
        const cards: Card[] = [];
        this.setState({ cards });
    }

    render() {
        console.log(this.state.cards);
        const { classes } = this.props;
        const { cards } = this.state;
        return (
            <div className={classes.page}>
                {/* <DragDropContextProvider backend={HTML5Backend}> */}
                    <Grid container spacing={16} className={classes.full}>
                        <Grid item className={classNames(classes.full, classes.bin)}>
                            <Paper className={classes.container}>
                                {cards && Object.keys(cards).map(index => {
                                    console.log(index);
                                    return <CardItem key={cards[index]} card={cards[index]} />;
                                })}
                            </Paper>
                        </Grid>
                        <Grid item xs className={classes.full}>
                            <Paper className={classes.container}>
                                Temp 2
                            </Paper>
                        </Grid>
                    </Grid>
                {/* </DragDropContextProvider> */}
            </div>
        );
    }
}

export default withStyles(styles)(CardSort);
