import React, { Component } from 'react';
import Task from '../components/Task'
import TaskForm from '../components/TaskForm'


class TasksContainer extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [],
      categories: []
    }
  }

  componentDidMount(){
    fetch('/api/tasks')
    .then(response => { return response.json()})
    .then(userData => { this.setState({
      tasks: userData['tasks'],
      categories: userData['categories']
      })
    })
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
            />))
          }
          <TaskForm userCategories={this.state.categories}
                    updateCategories={this.updateCategories}
                    updateTasks={this.updateTasks}/>

        </div>
      )
  }
}



export default TasksContainer;
