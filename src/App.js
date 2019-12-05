
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from "axios";

import TasksContainer from './containers/TasksContainer';
import Login from './components/registrations/Login';
import Signup from './components/registrations/Signup';
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
      fetchComplete: false
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
        this.handleLogin(response.data)
      } else {
        this.handleLogout()
      }
    })
    .catch(error=> console.log('api errors:', error))
  }


  // redirectToPath=(path)=>{
  //   this.props.history.push(path)
  //   this.forceUpdate()
  // }


  handleLogin = (data) => {
    console.log(data.user)
    this.setState({
      isLoggedIn: true,
      user: data.user,
      fetchComplete:true
    })
  }

  handleLogout = ()=>{
    this.setState({
      isLoggedIn:false,
      user:null,
      fetchComplete:true
    })
  }

  render() {
    
    return (
      <div>
        <Router>
          <Switch>
          
          { this.state.user ?
            <Route exact path='/'
            render={props=>(
            <TasksContainer
              {...props}
              fetchComplete={this.state.fetchComplete}
              loggedInStatus={this.state.isLoggedIn}
              user={this.state.user}/>
            )}
           />  
           :
           <Route 
           exact path='/' 
           render={props => (
             <Home
               {...props}
               handleLogout={this.handleLogout}
               loggedInStatus={this.state.isLoggedIn}
             />
           )}
          />
          }
          
          
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
            <Route render={props => (
             <Home
               {...props}
               handleLogout={this.handleLogout}
               loggedInStatus={this.state.isLoggedIn}
            /> )} />
              
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
