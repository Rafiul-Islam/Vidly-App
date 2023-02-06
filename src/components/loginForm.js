import React from 'react';
import Joi from "joi-browser/dist/joi-browser.min";
import Form from "./common/form";

class LoginForm extends Form {

    state = {
        data: {
            username: '',
            password: ''
        },
        errors:{}
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = () => {
        //call the server
        console.log('submitted...');
    }

    render() {
        return (
            <div>
                <h1 className='mb-4'>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('Username', 'username')}
                    {this.renderInput('Password', 'password', 'password')}
                    {this.renderButton('Submit')}
                </form>
            </div>
        );
    }
}

export default LoginForm;
