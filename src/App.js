import React, { Component } from 'react';
import TasksContainer from './containers/TasksContainer'
import TaskForm from './components/TaskForm'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import Home from './components/Home';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
    };
  }
  
  componentDidMount() {
    this.loginStatus()
  }
  
  backendUrl = 'http://localhost:3001/api'
  loginStatus = () => {
    axios.get(this.backendUrl+'/logged_in', {withCredentials: true})
    .then(response=>{
      if (response.data.logged_in) {
        console.log(response)
        this.handleLogin(response.data)
      } else {
        this.handleLogout()
      }
    })
    .catch(error=> console.log('api errors:', error))
  }
  
  handleLogin = (data) => {
    console.log(data.user)
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = ()=>{
    this.setState({
      isLoggedIn:false,
      user:{}
    })
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
          <Route exact path='/'>
            <div>
              <TaskForm/>
              <TasksContainer/>
            </div>
          </Route>
          <Route 
              exact path='/home' 
              render={props => (
                <Home
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
          <Route 
            exact path='/login' 
            render={props => (
              <Login
                {...props}
                handleLogin={this.handleLogin}
                loggedInStatus={this.state.isLoggedIn}
              />
            )}
          />
            <Route 
              exact path='/signup' 
              render={props => (
                <Signup
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
  )}
}

export default App;
