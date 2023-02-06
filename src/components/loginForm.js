import React from 'react';
import Input from "./common/input";
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
        const {data, errors} = this.state;
        return (
            <div>
                <h1 className='mb-4'>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name='username'
                        type='text'
                        value={data.username}
                        label='Username'
                        onChange={this.handleInputChange}
                        error={errors.username}
                    />
                    <Input
                        name='password'
                        type='password'
                        value={data.password}
                        label='Password'
                        onChange={this.handleInputChange}
                        error={errors.password}
                    />
                    <button disabled={this.validate()} className='btn btn-primary'>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
