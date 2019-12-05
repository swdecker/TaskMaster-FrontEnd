import React, { Component }  from 'react'
import NewCategoryModal from './NewCategoryModal'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class TaskForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      name:'',
      priority:'',
      location:'',
      description:'',
      category:'',
      duration:'',
      modal: false,
      cat_id: null,
      startDate: (new Date())
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
        name: name,
        user_id: 1
      })
    })
    .then(response => { return response.json()})
    .then(catObj => { this.props.updateCategories(catObj)})

}



  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})

    console.log(this.state.category)
  }



  submitHandler = (e) => {
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
        category_id: this.state.category,
        location_id: 1,
        duration: this.state.duration,
        is_completed: false,
        deadline: this.state.startDate,
        user_id: 1


      })
    })
    .then(response => { return response.json()})
    .then(taskObj => { this.props.updateTasks(taskObj)})
  }

  setStartDate = (date) => {
  this.setState({
    startDate: date
  })

  }




  render() {
    const {name, priority, location, description, category, duration, startDate} = this.state
    return (
      <div>
        <Form onSubmit={this.submitHandler}>
        <FormGroup row>
          <Label for="name" sm={2}>Name</Label>
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
          <Label for="priority">Priority</Label>
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
        <Label for="category">Category</Label>
          <Input
            type="select"
            name="category"
            id="category"
            value={category}
            onChange={this.changeHandler}>

            <option>Hello from a basic option JSX</option>
            {this.props.userCategories && this.props.userCategories.length > 0 ? this.props.userCategories.map(cat => {
              return <option value={cat.id}>{cat.name}</option>
            })
          :
          <option> Bad option</option>
          }

           </Input>
           <Button color="danger" onClick={this.toggleModal}>add category</Button>
        </FormGroup>
        <FormGroup row>
          <Label for="location" sm={2}>Location</Label>
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
          <Label for="exampleText" sm={2}>Deadline</Label>
          <Col sm={10}>
          <DatePicker
            selected={startDate}
            onChange={date => this.setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          </Col>
        </FormGroup>
          <button type="submit"> Create Task </button>
      </Form>

      <NewCategoryModal
      modal={this.state.modal}
      toggleModal={this.toggleModal}
      handleCatPost={this.handleCatPost}
      postCat={this.postCat}
       />
    </div>
    )
  }
}


export default TaskForm
