
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './containers/Main'

class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
          <Route render={props=> <Main {...props} />}/> 
        </Router>
      </div>
  )}
}

export default App;
