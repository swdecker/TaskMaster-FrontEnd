import React, { Component } from 'react';
import Task from '../components/Task'

class TasksContainer extends Component {
  constructor() {
    super()
    this.state = {
      tasks: []
    }
  }

  componentDidMount(){
    fetch('/api/tasks')
    .then(response => {return response.json()})
    .then(taskData => { this.setState({
      tasks: taskData
    })
    console.log(this.state.tasks)

    })
  }



  render() {
    return (
      <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{
          this.state.tasks.map(task => (<Task
            name={task.name}
            description={task.description}
            priority={task.priority}/>))

        }


        </tbody>
      </table>

      </div>
  )}

}



export default TasksContainer;
