import React, { Component } from "react";
import {
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class NewCategoryModal extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  fieldChange = e => {
    this.setState({ name: e.target.value });
  };

  addCat = () => {
    this.props.postCat(this.state.name);
  };

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggleModal}>
        <ModalHeader toggle={this.props.toggleModal}>Add Category</ModalHeader>
        <ModalBody>Add a new task category</ModalBody>
        <ModalFooter>
          Enter a category: <Input onChange={this.fieldChange} />
          <Button color="primary" onClick={this.addCat}>
            add category
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

export default NewCategoryModal;
