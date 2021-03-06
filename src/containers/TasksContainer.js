import GeoCodeContainer from "./GeoCodeContainer";

import React, { Component } from "react";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import FilterTasks from "../components/FilterTasks";
import TaskZoom from "../components/TaskZoom";
import { Table } from "reactstrap";
import axios from "axios";
import { MDBContainer } from "mdbreact";

class TasksContainer extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      categories: [],
      task_id: null,
      userTasks: [],
      userCategories: [],
      userLocations: [],
      category_filter: null
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
          console.log(response.data);
          this.setState({
            userCategories: response.data.categories,
            userLocations: response.data.locations,
            userTasks: response.data.tasks.data.map(task => ({
              id: task.id,
              ...task.attributes,
              category_id: task.relationships.category.data.id,
              category: {
                id: task.relationships.category.data.id,
                name: response.data.categories.find(
                  cat => cat.id == task.relationships.category.data.id
                ).name
              },
              location_id: task.relationships.location.data.id,
              location: {
                id: task.relationships.location.data.id,
                ...response.data.locations.find(
                  l => l.id == task.relationships.location.data.id
                )
              }
            }))
          });
        });
    }
  };

  updateCategories = catObject => {
    this.setState({
      userCategories: [...this.state.userCategories, catObject]
    });
  };

  updateTasks = taskObject => {
    this.setState({
      userTasks: [...this.state.userTasks, taskObject]
    });
  };

  deleteTask = task_id => {
    fetch("/api/tasks/" + task_id, {
      method: "DELETE"
    }).then(() => this.removeTask(task_id));
  };

  removeTask = taskId => {
    this.setState({
      userTasks: this.state.userTasks.filter(task => task.id !== taskId)
    });
  };

  completeTask = task_id => {
    const taskToEdit = this.state.userTasks.find(task => task.id === task_id);
    fetch("api/tasks/" + task_id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        is_completed: !taskToEdit.is_completed
      })
    })
      .then(response => {
        return response.json();
      })
      .then(taskObj => {
        this.setState({
          userTasks: [
            ...this.state.userTasks.filter(task => task.id !== task_id),
            { ...taskToEdit, is_completed: !taskToEdit.is_completed }
          ]
        });
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

  onFilterChange = cat_id => {
    if (cat_id === "all") {
      this.setState({
        category_filter: null
      });
    } else {
      this.setState({
        category_filter: cat_id
      });
    }
  };

  filterTasksByCategory = () => {
    if (this.state.category_filter) {
      return this.state.userTasks.filter(
        task => task.category_id === this.state.category_filter
      );
    } else {
      return this.state.userTasks;
    }
  };

  render() {
    return (
      <div>
        <h2 align="center">Task Master</h2>
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
            {this.filterTasksByCategory() &&
              this.filterTasksByCategory().map(task => (
                <Task
                  key={task.id}
                  id={task.id}
                  task={task}
                  deleteTask={this.deleteTask}
                  taskIdHolder={this.taskIdHolder}
                  completeTask={this.completeTask}
                />
              ))}
          </tbody>
        </Table>

        <FilterTasks
          userCategories={this.state.userCategories}
          onFilterChange={this.onFilterChange}
        />

        {this.state.userTasks
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
          user={this.props.user}
          userLocations={this.state.userLocations}
          userCategories={this.state.userCategories}
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
