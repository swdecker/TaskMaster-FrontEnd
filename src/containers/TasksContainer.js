import GeoCodeContainer from "./GeoCodeContainer";
import React, { Component } from 'react';
import Task from '../components/Task'
import FilterTasks from '../components/FilterTasks'
import TaskForm from '../components/TaskForm'
import TaskZoom from '../components/TaskZoom'


class TasksContainer extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      categories: [],
      task_id: null,
      category_filter: null
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


  deleteTask = (task_id) => {
    fetch('/api/tasks/' + task_id,{
      method: 'DELETE'
    })
    this.removeTask(task_id)
  }

  removeTask = (taskId) => {
    this.setState({
      tasks: this.state.tasks.filter(task => (task.id !== taskId))
    })
  }

  taskIdHolder = (id) => {
    console.log("KAAAREN!")
    !this.state.task_id ?
    this.setState({
      task_id: id
      }) :
    this.setState({
      task_id: null
      })
  }

  onFilterChange = (cat_id) => {
    this.setState({
      category_filter: cat_id
    })
  }

  filterTasksByCategory = () => {
    if(this.state.category_filter) {
      return this.state.tasks.filter(task => (task.category_id === this.state.category_filter))
    }
    else {
      return this.state.tasks
    }
  }




  render() {
    return (
      <div>

          <h2 align="center"> Tasks </h2>
          {this.filterTasksByCategory().map(task => (
            <Task
              key={task.id}
              id={task.id}
              name={task.name}
              description={task.description}
              priority={task.priority}
              duration={task.duration}
              category={1}
              deleteTask={this.deleteTask}
              taskIdHolder={this.taskIdHolder}
            />))
          }
          <FilterTasks
          userCategories={this.state.categories}
          onFilterChange={this.onFilterChange}
          />
          {this.state.tasks.filter(task => task.id === this.state.task_id).map(task => (
            <TaskZoom
              key={task.id}
              id={task.id}
              name={task.name}
              description={task.description}
              priority={task.priority}
              duration={task.duration}
              category={1}
              deleteTask={this.deleteTask}
            />))
          }
            <TaskForm
              userCategories={this.state.categories}
              updateCategories={this.updateCategories}
              updateTasks={this.updateTasks}
            />

          <GeoCodeContainer />


      </div>
    )
  }
}

export default TasksContainer;
