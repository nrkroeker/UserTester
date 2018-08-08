import * as React from "react";
import * as classNames from "classnames";
import * as _ from "lodash";
import { Grid, Paper } from "@material-ui/core";
import { StyleRules, Theme, withStyles } from "@material-ui/core/styles";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import * as models from "models";
import { RouteComponentProps } from "react-router";
import { GroupContainer, Card, CardList, CardLocation, CustomDragLayer } from "components";
import * as data from "data/cardSort";

const styles = (theme: Theme): StyleRules => ({
    page: {
        margin: "24px",
        height: "calc(100% - " + theme.spacing.unit * 14 + "px)"
    },
    container: {
        height: "100%",
        overflow: "hidden",
        clear: "both",
        backgroundColor: theme.palette.background.default
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
    cards: {
        list: models.Card[];
        groups: models.CardGroup[]
    };
}

type Props = { classes: any };

class CardSort extends React.Component<Props, CardSortState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cards: {
                list: [],
                groups: []
            }
        };
    }

    async componentDidMount() {
        // set this to secret code for test which creator can set or copy
        const testId = window.location.pathname.split("/").reverse()[0];
        const groups: models.CardGroup[] = data.cardSortTest.groups.map(group => ({ title: group, cards: [] }));
        this.setState({ cards: { list: data.cards, groups } });
    }

    private moveCard = (from: CardLocation, to: CardLocation) => {
        const cards = _.cloneDeep(this.state.cards);
        const card = from.position === "list" ? _.pullAt(cards[from.position], from.cardIndex)[0] : _.pullAt(cards[from.position][from.groupIndex].cards, from.cardIndex)[0];
        if (to.position === "list") {
            cards[to.position].splice(to.cardIndex, 0, card);
        } else {
            cards[to.position][to.groupIndex].cards.splice(to.cardIndex, 0, card);
        }
        this.setState({ cards });
    }

    render() {
        const { classes } = this.props;
        const { cards } = this.state;
        return (
            <div className={classes.page}>
                <CustomDragLayer />
                <Grid container spacing={16} className={classes.full}>
                    <Grid item className={classNames(classes.full, classes.bin)}>
                        <Paper component={"div"} className={classes.container}>
                            <CardList
                                cards={cards.list}
                                location={{ position: "list" }}
                                moveCard={this.moveCard}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs className={classes.full}>
                        <Paper component={"div"} className={classes.container}>
                            <GroupContainer groups={cards.groups} moveCard={this.moveCard} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export const StyledCardSort = withStyles(styles)(CardSort);
export default DragDropContext(HTML5Backend)(StyledCardSort);
