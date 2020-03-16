import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Sorting } from './projects/sorting/sorting';

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <div id='outer'>
                            <Link to='/'>
                                <div id='main'>
                                    Main
                                </div>
                            </Link>

                            <Link to='/sorting'>
                                <div id='sorting'>
                                    Sorting
                                </div>
                            </Link>
                        </div>
                    </Route>

                    <Route path='/sorting'>
                        <Sorting />
                    </Route> 

                </Switch>
            </Router>
        );
    }
}
