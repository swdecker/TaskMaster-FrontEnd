import React, { Component }  from 'react'
import NewCategoryModal from './NewCategoryModal'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class TaskForm extends Component {
  constructor(){
    super()

    this.state = {
      name:'',
      priority:'',
      location:'',
      description:'',
      category:'',
      duration:'',
      modal: false


    }
  }



  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  postCat = (name) => {
    this.toggleModal()
    fetch('/api/categories', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    })
    .then(response => {return response.json()})
    .then(catData => {
      let get = this.getCategories()
      console.log(get)
    })
}

  getCategories = () => {
    let catArray
    fetch('/api/categories')
      .then(response => {return response.json()})
      .then(allCats => { catArray = allCats})

    console.log(catArray)
    return catArray
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }



  submitHandler = (e) => {
    console.log(this.state.category.id)
    e.preventDefault()
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        name: this.state.name,
        priority: this.state.priority,
        description: this.state.description,
        category_id: 1,
        location_id: 1,
        duration: this.state.duration,
        is_completed: false,
        deadline: null,
        user_id: 1

      })
    })

  }
  render() {
    const {name, priority, location, description, category, duration} = this.state
    return (
    <div>
      <Form onSubmit={this.submitHandler}>
      <FormGroup row>
        <Label for="exampleEmail" sm={2}>Name</Label>
        <Col sm={10}>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name of Task..."
            value={name}
            onChange={this.changeHandler} />
        </Col>
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Priority</Label>
        <Input
          type="select"
          name="priority"
          id="priority"
          value={priority}
          onChange={this.changeHandler} >
          <option>low</option>
          <option>medium</option>
          <option>high</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Category</Label>
        <Input
          type="select"
          name="category"
          id="category"
          value={category}
          onChange={this.changeHandler} >
          <option>ex</option>
          <option>pet</option>
          <option>car</option>
          <option>{this.state.category}</option>
        </Input>
        <Button color="danger" onClick={this.toggleModal}>add category</Button>
      </FormGroup>
      <FormGroup row>
        <Label for="examplePassword" sm={2}>Location</Label>
        <Col sm={10}>
          <Input
            type="text"
            name="location"
            id="location"
            placeholder="Location..."
            value={location}
            onChange={this.changeHandler} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleSelect" sm={2}>Duration</Label>
        <Col sm={10}>
          <Input
            type="text"
            name="duration"
            id="duration"
            placeholder="Length of time in minutes..."
            value={duration}
            onChange={this.changeHandler} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleSelect" sm={2}>Category</Label>
        <Col sm={10}>
          <Input
            type="text"
            name="category"
            id="category"
            placeholder="Category..."
            value={category}
            onChange={this.changeHandler} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleText" sm={2}>Description</Label>
        <Col sm={10}>
          <Input
            type="textarea"
            name="description"
            id="exampleText"
            value={description}
            onChange={this.changeHandler} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleFile" sm={2}>File</Label>
        <Col sm={10}>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">

          </FormText>
        </Col>
      </FormGroup>


      <button type="submit"> Submit </button>
    </Form>

    <NewCategoryModal
    modal={this.state.modal}
    toggleModal={this.toggleModal}
    handleCatPost={this.handleCatPost}
    postCat={this.postCat} />
  </div>
    )
  }
}

export default TaskForm
