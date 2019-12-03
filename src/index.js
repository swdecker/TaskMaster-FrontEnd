import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './containers/Login'
import Signup from './containers/Signup'

ReactDOM.render((
    <Router>
    <Switch>
        <Route exact path='/'>
            <App />
        </Route>
        <Route path='/signup'>
            <Signup />
        </Route>
        <Route path='/login'>
            <Login />
        </Route>
        
    </Switch>
    </Router>
),
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
