import React, { Component } from "react";
import Task from "../components/Task";
import GeoCodeContainer from "./GeoCodeContainer";

class TasksContainer extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    fetch("/api/tasks")
      .then(response => {
        return response.json();
      })
      .then(taskData => {
        this.setState({
          tasks: taskData
        });
      });
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
          />
        ))}
        <div>
          <GeoCodeContainer />
        </div>
      </div>
    );
  }
}

export default TasksContainer;
