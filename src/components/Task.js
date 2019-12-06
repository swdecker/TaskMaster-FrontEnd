import React from "react";
import { Button } from "reactstrap";

const Task = props => {
  const { name, priority, category, location } = props.task;
  return (
    <tr onClick={() => props.taskIdHolder(props.id)}>
      <td>{props.task.id}</td>
      <td>{name}</td>
      <td>{priority}</td>
      <td>{category.name}</td>
      <td>{location.name}</td>
      <td>
        <Button color="primary">Done!</Button>
      </td>
      <td>
        <Button onClick={() => props.deleteTask(props.id)} color="primary">
          Delete!
        </Button>
      </td>
    </tr>
  );
};

export default Task;
