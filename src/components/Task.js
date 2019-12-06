import React from "react";
import { Button } from "reactstrap";

const Task = props => {
  const { name, priority, category, location, is_completed } = props.task;
  return (
    <tr onClick={() => props.taskIdHolder(props.id)}>
      <td>{props.task.id}</td>
      <td>{name}</td>
      <td>{priority}</td>
      <td>{category.name}</td>
      <td>{location.name}</td>
      <td>
        {is_completed ? <Button onClick={() => props.completeTask(props.id)} color="primary">Complete!</Button>
        : <Button onClick={() => props.completeTask(props.id)} color="danger">Incomplete</Button>}
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
