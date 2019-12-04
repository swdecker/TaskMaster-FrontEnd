import React, { Component } from 'react';
import TasksContainer from './containers/TasksContainer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  }
  
  handleLogin = (data) => {
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
  backendUrl = 'http://localhost:3001'
  // loginStatus = () => {
  //   axios.get(this.backendUrl+'/logged_in', {withCredentials: true})
  //   .then(response=>{
  //     if (response.data.logged_in) {
  //       this.handleLogin(response)
  //     } else {
  //       this.handleLogout()
  //     }
  //   })
  //   .catch(error=> console.log('api errors:', error))
  // }
  // componentDidMount() {
  //   this.loginStatus()
  // }




  render() {
    // if logged in => dashboard 
  //  if not logged in => login 
    return (
  <Router>
  <Switch>
      <Route exact path='/'>
      <div>
        <TasksContainer/>
      </div>
      </Route>
      <Route path='/home'>
          <Home />
      </Route>
      <Route path='/signup'>
          <Signup />
      </Route>
      <Route path='/login'>
          <Login />
      </Route>
  </Switch>
  </Router>
      
  )}
}

export default App;
