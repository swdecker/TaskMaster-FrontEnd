import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Signup extends Component {
    state = {
        username: "",
        password: "",
        confirmPW: ""
    }
    onChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) =>{
        event.preventDefault()
        // validate the form
        // send the username and password to back end
    }

    render() {
        return (
            <div className='container'>
            Welcome to the login page
                <Form onSubmit={this.handleSubmit} className='.col-sm-10 .col-md-4 .offset-md-4'>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input onChange={this.onChange} value={this.state.username} type="text" name="username" id="username" placeholder="Your username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Password">Password</Label>
                        <Input onChange={this.onChange} value={this.state.password} type="password" name="password" id="Password" placeholder="password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input onChange={this.onChange} value={this.state.confirmPW} type="password" name="confirmPW" id="confirmPassword" placeholder="password again" />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}
