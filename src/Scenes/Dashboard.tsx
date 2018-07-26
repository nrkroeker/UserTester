import * as React from "react";
import db from "db";

interface State {
    tests: { [key: string]: any }[];
}

export default class Example1 extends React.Component<Object, State> {
    constructor(props: Object) {
        super(props);
        this.state = {
            tests: []
        };
    }

    componentDidMount() {
        db.collection("cardSortTest")
        .get()
        .then(collection => this.setState({ tests: collection.docs.map(doc => doc.data()) }));
    }

    render() {
        console.log(this.state.tests);
        return (
            <div>
                <h1>Your Tests</h1>
            </div>
        );
    }
}
