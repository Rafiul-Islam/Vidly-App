import React from 'react';
import Joi from "joi-browser/dist/joi-browser.min";
import Form from "./common/form";
import userService from "../services/userService";

class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: '',
        },
        errors: {}
    };

    schema = {
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    }

    doSubmit = async () => {
        //call the server
        try {
            const response = await userService.register(this.state.data);
            localStorage.setItem('token', response.headers['x-auth-token']);
            window.location = "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
    }

    render() {
        return (
            <div>
                <h1 className='mb-4'>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('Username', 'username')}
                    {this.renderInput('Password', 'password', 'password')}
                    {this.renderInput('Name', 'name')}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
