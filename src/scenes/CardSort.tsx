import * as React from "react";
import * as classNames from "classnames";
import * as _ from "lodash";
import { Grid, Paper } from "@material-ui/core";
import { StyleRules, Theme, withStyles } from "@material-ui/core/styles";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import * as models from "models";
import { RouteComponentProps } from "react-router";
import { CardContainer, Card, CardList, DragLayer } from "components";
import * as data from "data/cardSort";

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
        width: "300px",
        overflow: "auto"
    }
});

interface CardSortState {
    cards: models.Card[];
    groups: models.CardGroup[];
}

type Props = { classes: any } & RouteComponentProps<any>;

class CardSort extends React.Component<Props, CardSortState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cards: undefined,
            groups: []
        };
    }

    async componentDidMount() {
        // set this to secret code for test which creator can set or copy
        const testId = this.props.location.pathname.split("/").reverse()[0];
        const groups: models.CardGroup[] = data.cardSortTest.groups.map(group => ({ title: group, cards: [] }));
        this.setState({ cards: data.cards, groups });
    }

    private moveCard = (originalIndex: number, atIndex: number) => {
        const cards = [...this.state.cards];
        const card = cards[originalIndex];
        cards.splice(originalIndex, 1);
        cards.splice(atIndex, 0, card);
        this.setState({ cards });
    }

    private groupCard = (cardIndex: number, groupIndex: number) => {
        const cards = [...this.state.cards];
        const card = cards[cardIndex];
        cards.splice(cardIndex, 1);
        const groups = [...this.state.groups];
        groups[groupIndex].cards.push(card);
        this.setState({ cards, groups });
    }

    render() {
        const { classes } = this.props;
        const { cards, groups } = this.state;
        return (
            <div className={classes.page}>
                <Grid container spacing={16} className={classes.full}>
                    <Grid item className={classNames(classes.full, classes.bin)}>
                        <Paper component={"div"} className={classes.container}>
                            <CardList
                                moveCard={this.moveCard}
                                cards={this.state.cards}
                            />
                            <DragLayer />
                        </Paper>
                    </Grid>
                    <Grid item xs className={classes.full}>
                        <Paper component={"div"} className={classes.container}>
                            <CardContainer groups={groups} groupCard={this.groupCard} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export const StyledCardSort = withStyles(styles)(CardSort);
export default DragDropContext(HTML5Backend)(StyledCardSort);
