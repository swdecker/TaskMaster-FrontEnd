import GeoCodeContainer from "./GeoCodeContainer";
import React, { Component } from "react";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import TaskZoom from "../components/TaskZoom";
import axios from "axios";

class TasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      categories: [],
      task_id: null,
      userTasks:[],
      userCategories:[],
      userLocations:[]
    };
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

  initialFetch = () => {
    fetch("/api/tasks")
      .then(response => {
        return response.json();
      })
      .then(userData => {
        this.setState({
          tasks: userData["tasks"],
          categories: userData["categories"]
        });
      });
  };

  userFetch = () => {
    if (this.props.user) {
      axios
        .get(`http://localhost:3001/api/tasks/${this.props.user.id}`, {
          withCredentials: true
        })
        .then(response => {
          console.log(response.data)
          this.setState({
            userCategories: response.data.categories,
            userLocations: response.data.locations,
            userTasks: response.data.tasks.data.map(task=> ({ id: task.id, ...task.attributes, category:{ id: task.relationships.category.data.id, name: response.data.categories.find(cat=>cat.id==task.relationships.category.data.id).name }, location:{id: task.relationships.location.data.id, ...response.data.locations.find(l=>l.id==task.relationships.location.data.id) } }) )
          })
        });
    }
  };

  updateCategories = catObject => {
    this.setState({
      categories: [...this.state.categories, catObject]
    });
  };

  updateTasks = taskObject => {
    this.setState({
      tasks: [...this.state.tasks, taskObject]
    });
  };

  deleteTask = task_id => {
    fetch("/api/tasks/" + task_id, {
      method: "DELETE"
    });
    this.removeTask(task_id);
  };

  removeTask = taskId => {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== taskId)
    });
  };

  taskIdHolder = id => {
    console.log("KAAAREN!");
    !this.state.task_id
      ? this.setState({
          task_id: id
        })
      : this.setState({
          task_id: null
        });
  };

  render() {
    return (
      <div>
        <h2 align="center"> Tasks </h2>
        {this.state.tasks &&
          this.state.userTasks.map(task => (
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
            />
          ))}
        {this.state.tasks
          .filter(task => task.id === this.state.task_id)
          .map(task => (
            <TaskZoom
              key={task.id}
              id={task.id}
              name={task.name}
              description={task.description}
              priority={task.priority}
              duration={task.duration}
              category={1}
              deleteTask={this.deleteTask}
            />
          ))}
        <TaskForm
          userCategories={this.state.categories}
          updateCategories={this.updateCategories}
          updateTasks={this.updateTasks}
        />
        <div>
          <GeoCodeContainer />
        </div>
      </div>
    );
  }
}

export default TasksContainer;
