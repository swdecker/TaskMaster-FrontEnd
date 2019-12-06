import React from "react"
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';


const Task = (props) => {
  return(


    <Table dark hover borderless onClick={() => props.taskIdHolder(props.id)} >
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{props.id}</th>
              <td>{props.name}</td>
              <td>{props.description}</td>
              <td>{props.priority}</td>
              <td>{props.duration} minutes</td>
              <td>
               <Button color="primary">Done!</Button>{''}
              </td>
              <td>
               <Button onClick={() => props.deleteTask(props.id)} color="primary">Delete!</Button>{''}
              </td>
            </tr>
          </tbody>
    </Table>

  )
}

export default Task
