import React from "react"
import { Card } from 'semantic-ui-react'

const Task = (props) => {
  return(

    <Card>
        <div>
          <div>
            {props.name}
          </div>
          <div >
            <div >{props.description}</div>
          </div>
          <div >
            <span>
              <i/>
              {props.priority}
            </span>
          </div>
        </div>
      </Card>
  )
}

export default Task
