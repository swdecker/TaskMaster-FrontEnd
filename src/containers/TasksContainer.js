import GeoCodeContainer from "./GeoCodeContainer";
import React, { Component } from 'react';
import Task from '../components/Task'
import TaskForm from '../components/TaskForm'
import axios from 'axios'

class TasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      categories: []
    }
  }

  componentDidMount(){
    this.shouldRedirect()
    this.initialFetch()
    this.userFetch()
  }
  componentDidUpdate(){
    this.shouldRedirect()
  }
  shouldRedirect = ()=>{
    if(this.props.fetchComplete && !this.props.loggedInStatus) {
      console.log(this.props.loggedInStatus)
      this.props.history.push('/home')
    }
  }

  initialFetch = ()=>{
    fetch('/api/tasks')
      .then(response => { return response.json()})
      .then(userData => { 
        this.setState({
          tasks: userData['tasks'],
          categories: userData['categories']
        })
      })
  }

  userFetch = ()=>{
    if (this.props.user){
      axios.get(`http://localhost:3001/api/tasks/${this.props.user.id}`, {withCredentials: true})
      .then(response=>{
        console.log(response)
      })
    }
  }

  updateCategories = (catObject) => {
    this.setState({
      categories: [...this.state.categories, catObject]
    })

  }

  updateTasks = (taskObject) => {
    this.setState({
      tasks: [...this.state.tasks, taskObject]
    })
  }

  removeTask = (taskId) => {
    this.setState({
      tasks: this.state.tasks.filter(task => (task.id !== taskId))
    })
  }

  deleteTask = (task_id) => {
    fetch('/api/tasks/' + task_id,{
      method: 'DELETE'
    })
    this.removeTask(task_id)
  }

  render() {
    return (
      <div>

          <h2 align="center"> Tasks </h2>
          {this.state.tasks.map(task => (
            <Task
              key={task.id}
              id={task.id}
              name={task.name}
              description={task.description}
              priority={task.priority}
              duration={task.duration}
              deleteTask={this.deleteTask}
            />))
          }
            <TaskForm
              userCategories={this.state.categories}
              updateCategories={this.updateCategories}
              updateTasks={this.updateTasks}
            />
        <div>
          <GeoCodeContainer />
        </div>

        </div>
      )
  }
}

export default TasksContainer;
