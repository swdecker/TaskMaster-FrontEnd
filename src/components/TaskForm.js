import React, { Component } from "react";
import NewCategoryModal from "./NewCategoryModal";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row
} from "reactstrap";

class TaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      priority: "",
      location: "",
      description: "",
      category: "",
      duration: "",
      modal: false,
      cat_id: null,
      dropdownCatOpen: false
    };
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  postCat = name => {
    this.toggleModal();
    fetch("/api/categories", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        user_id: 1
      })
    })
      .then(response => {
        return response.json();
      })
      .then(catObj => {
        this.props.updateCategories(catObj);
      });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    fetch("/api/tasks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        priority: this.state.priority,
        description: this.state.description,
        category_id: this.state.category,
        location_id: 1,
        duration: this.state.duration,
        is_completed: false,
        deadline: null,
        user_id: 1
      })
    })
      .then(response => {
        return response.json();
      })
      .then(taskObj => {
        this.props.updateTasks(taskObj);
      });
  };

  handleCatToggle = e => {
    this.setState({
      dropdownCatOpen: !this.state.dropdownCatOpen
    });
  };

  render() {
    const {
      name,
      priority,
      location,
      description,
      duration,
      dropdownCatOpen
    } = this.state;

    return (
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h3>Add a New Task</h3>
        <Form onSubmit={this.submitHandler}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name of Task..."
                  value={name}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="task-description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="task-description"
                  value={description}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="priority">Priority</Label>
                <Input
                  type="select"
                  name="priority"
                  id="priority"
                  value={priority}
                  onChange={this.changeHandler}
                >
                  <option>low</option>
                  <option>medium</option>
                  <option>high</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for="task-duration">Duration</Label>

                <Input
                  type="text"
                  name="task-duration"
                  id="task-duration"
                  placeholder="Length of time in minutes..."
                  value={duration}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for="category">Category</Label>
                <Dropdown
                  isOpen={dropdownCatOpen}
                  toggle={this.handleCatToggle}
                >
                  <DropdownToggle block id="category" caret>
                    Choose Category
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.props.userCategories &&
                    this.props.userCategories.length > 0
                      ? this.props.userCategories.map(cat => {
                          return (
                            <DropdownItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </DropdownItem>
                          );
                        })
                      : null}
                    <DropdownItem divider />
                    <DropdownItem onClick={this.toggleModal}>
                      Add new category
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="task-location">Your Saved Locations</Label>
                <Dropdown>
                  <DropdownToggle block id="task-location" caret>
                    Choose Location
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.toggleLocModal}>
                      Add new location
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
            </Col>
          </Row>

          <Button type="submit" color="primary">
            Add new task
          </Button>
        </Form>

        <NewCategoryModal
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          handleCatPost={this.handleCatPost}
          postCat={this.postCat}
        />
      </div>
    );
  }
}

export default TaskForm;
