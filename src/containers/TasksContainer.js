import GeoCodeContainer from "./GeoCodeContainer";
import React, { Component } from "react";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import TaskZoom from "../components/TaskZoom";
import { Table } from "reactstrap";
import axios from "axios";
import { MDBContainer } from "mdbreact";

class TasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      categories: [],
      task_id: null,
      userTasks: [],
      userCategories: [],
      userLocations: []
    };
  }

  componentDidMount() {
    this.shouldRedirect();
    this.initialFetch();
    this.userFetch();
  }
  componentDidUpdate() {
    this.shouldRedirect();
  }
  shouldRedirect = () => {
    if (this.props.fetchComplete && !this.props.loggedInStatus) {
      console.log(this.props.loggedInStatus);
      this.props.history.push("/home");
    }
  };

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
          this.setState({
            userCategories: response.data.categories,
            userLocations: response.data.locations,
            userTasks: response.data.tasks.data.map(task => ({
              id: task.id,
              ...task.attributes
            }))
          });
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

        <Table dark hover borderless>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks &&
              this.state.tasks.map(task => (
                <Task
                  key={task.id}
                  id={task.id}
                  task={task}
                  deleteTask={this.deleteTask}
                  taskIdHolder={this.taskIdHolder}
                />
              ))}
          </tbody>
        </Table>

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
        <MDBContainer>
          <div className="mx-auto">
            <GeoCodeContainer />
          </div>
        </MDBContainer>
      </div>
    );
  }
}

export default TasksContainer;
