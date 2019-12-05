import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const TaskZoom = (props) => {
  return (
    <div>
      <Jumbotron >
        <h1 className="display-3">{props.name}</h1>
        <p className="lead">{props.description}</p>
        <hr className="my-2" />
        <p></p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default TaskZoom;
