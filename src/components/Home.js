import React from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap';

const Home = (props) => {

  const handleClick = ()=>{
    axios.delete('http://localhost:3001/api/logout', {withCredentials: true})
      .then(response => {
       props.handleLogout()
       props.history.push('/')
      })
    .catch(error => console.log(error))
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
      <Jumbotron>
        <h1 className="display-3">Task Master!</h1>
        <p className="lead">Welcome to the worlds leading task management web application!</p>
        <hr className="my-2" />
        <p>Please login or sign up to get started</p>
        <p className="lead">
          <Row>
            <Col>
          <Link to='/login'><Button style={{width: "200px"}} color="primary">Log In</Button></Link>
          </Col>
          <Col>
          <Link to='/signup'><Button style={{width: "200px"}} color="primary">Sign Up</Button></Link>
          </Col>
          { 
            props.loggedInStatus ? 
            <Col><Link to='/logout' onClick={handleClick}><Button color="primary">Log Out</Button></Link></Col> : 
            null
          }
          </Row>
        </p>
      </Jumbotron>
      </Col>
      </Row>
      </Container>
    </div>
  );
};
export default Home;