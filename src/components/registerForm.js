import React from 'react';
import Joi from "joi-browser/dist/joi-browser.min";
import Form from "./common/form";

class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: '',
        },
        errors:{}
    };

    schema = {
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    }

    doSubmit = () => {
        //call the server
        console.log('submitted...');
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
