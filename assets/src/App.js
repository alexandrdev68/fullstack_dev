import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import MainPage from './pages';
import NotFound from './pages/NotFound';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <Switch>
                        <Route path="/" exact component={MainPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
