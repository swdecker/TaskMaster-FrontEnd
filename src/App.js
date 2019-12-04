import React, { Component } from 'react';
import TasksContainer from './containers/TasksContainer'
import TaskForm from './components/TaskForm'

class App extends Component {



  render() {
    return (
      <div>
        <TaskForm/>
        <TasksContainer/>
      </div>
  )}

}



export default App;
