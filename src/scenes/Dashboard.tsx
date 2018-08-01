import * as React from "react";
import db from "db";
import { Button, Collapse, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, ListSubheader, Paper, Typography } from "@material-ui/core";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { Cloud, CloudDone, CloudQueue, ViewQuilt } from "@material-ui/icons";
import { CardSortTest } from "models";
import * as data from "data/cardSort";

const DraftIcon = <CloudQueue style={{ fill: "#9e9e9e"}} />;
const OpenIcon = <Cloud style={{ fill: "#4fc3f7"}} />;
const CompleteIcon = <CloudDone style={{ fill: "#8bc34a"}} />;

const StatusIcons = {
    Draft: DraftIcon,
    Open: OpenIcon,
    Complete: CompleteIcon
};

interface State {
    dialStatus: boolean;
    tests: CardSortTest[];
    expanded: { [key: string]: boolean };
}

export default class Example1 extends React.Component<Object, State> {
    constructor(props: Object) {
        super(props);
        this.state = {
            dialStatus: false,
            tests: [],
            expanded: {}
        };
    }

    componentDidMount() {
        // db.collection("cardSortTest")
        // .get()
        // .then(collection => {
        //     const tests: CardSortTest[] = collection.docs.map(doc => doc.data() as CardSortTest);
        //     const expanded = {};
        //     tests.forEach(test => expanded[test.id] = false);
        //     this.setState({ tests, expanded });
        // });
        this.setState({tests: [data.cardSortTest]});
    }

    private toggleDial = () => {
        this.setState({ dialStatus: !this.state.dialStatus });
    }

    private toggleExpanded = (id: string) => {
        const expanded = { ...this.state.expanded };
        expanded[id] = !expanded[id];
        this.setState({ expanded });
    }

    render() {
        console.log(this.state.tests);
        return (
            <div style={{ margin: "72px 72px 0 72px" }}>
                <Grid container justify="center" spacing={32}>
                    <Grid item xs={2}>
                        <Paper>
                            <List subheader={<ListSubheader>Filter by Status</ListSubheader>}>
                                {Object.keys(StatusIcons).map(status => (
                                    <ListItem key={status}>
                                        <ListItemAvatar>{StatusIcons[status]}</ListItemAvatar>
                                        <ListItemText>{status}</ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper style={{ padding: "16px"}}>
                            <Typography variant="headline">Your Tests</Typography>
                            <List>
                                {this.state.tests.length > 0 && this.state.tests.map(test => (
                                        <React.Fragment key={test.id}>
                                            <ListItem key={"test" + test.id} onClick={() => this.toggleExpanded(test.id.toString())}>
                                                <ListItemAvatar>{StatusIcons[test.status]}</ListItemAvatar>
                                                <ListItemText primary={test.title} secondary={test.type} />
                                            </ListItem>
                                            <Collapse key={"sub" + test.id} in={this.state.expanded[test.id]}>
                                                <ListItem style={{ padding: "0 20px" }}>
                                                    <ListItemText primary={test.description} />
                                                </ListItem>
                                            </Collapse>
                                        </React.Fragment>
                                    )
                                )}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                <SpeedDial
                    open={this.state.dialStatus}
                    ariaLabel="Create test"
                    icon={<SpeedDialIcon />}
                    ButtonProps={{ style: { backgroundColor: "#80CBC4", color: "black" }}}
                    style={{ position: "fixed" , right: 50, bottom: 50 }}
                    onClick={this.toggleDial}
                >
                    <SpeedDialAction tooltipTitle="Card Sort" icon={<ViewQuilt />} />
                </SpeedDial>
            </div>
        );
    }
}
