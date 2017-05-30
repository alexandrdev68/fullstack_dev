import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={AccountantPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
