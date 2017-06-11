import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Match
} from 'react-router-dom';
import MainPage from './pages/index';
import ListPage from './pages/list';
import cookie from 'js-cookie';
import NotFound from './pages/NotFound';
import EntryPage from './pages/Entry';
import 'jquery';

class App extends Component {


    render() {

        let logged = cookie.get('logged');
        return (
            <Router>
                <Switch>
                    <Route path="/entry/:id" component={!!logged ? EntryPage : MainPage} />
                    <Route path="/:issue_page" component={!!logged ? ListPage : MainPage}/>
                    <Route path="/" exact component={!!logged ? ListPage : MainPage}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
