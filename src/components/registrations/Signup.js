import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export default class Signup extends Component {
    constructor(props){
        super(props)
        this.state= {
            username: "",
            email:"",
            password: "",
            password_confirmation: '',
            errors: ''
        }
    }
     
    handleChange = (event)=>{
        const {name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        const { username, email, password, password_confirmation }  = this.state 
        let user = {
            username: username,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }

        axios.post('http://localhost:3001/api/users', {user}, {withCredentials:true})
            .then(response => {
                if (response.data.status ==="created"){
                    this.props.handleLogin(response.data)
                    this.redirect()
                } else {
                    this.setState({
                        errors: response.data.errors
                    })
                }
            })
            .catch(error=> console.log('api errors:', error))
    }

    redirect = ()=>{
        this.props.history.push('/')
    }

    handleErrors = ()=>{
        return (
            <div>
                <ul>
                    {this.state.errors.map(error=>{
                    return <li key={error}>{error}</li>
                    })}
                </ul>
            </div>
        )
    }

    render() {
        const {username, email, password, password_confirmation} = this.state
        return (
            <div className='container'>
            <h1>Sign Up</h1>
                <Form onSubmit={this.handleSubmit} className='.col-sm-10 .col-md-4 .offset-md-4'>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input onChange={this.handleChange} value={username} type="text" name="username" id="username" placeholder="Your username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input onChange={this.handleChange} value={email} type="text" name="email" id="email" placeholder="Your email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Password">Password</Label>
                        <Input onChange={this.handleChange} value={password} type="password" name="password" id="Password" placeholder="password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input onChange={this.handleChange} value={password_confirmation} type="password" name="password_confirmation" id="password_confirmation" placeholder="password again" />
                    </FormGroup>
                    <Button>Sign Up</Button>
                </Form>
                <div>
                 {
                    this.state.errors ? this.handleErrors() : null 
                 }
                </div>
            </div>
        )
    }
}
