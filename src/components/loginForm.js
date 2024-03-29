import React from 'react';
import Redirect from "react-router-dom/Redirect";
import Joi from "joi-browser/dist/joi-browser.min";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {

    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = async () => {
        //call the server
        try {
            await auth.login(this.state.data);
            const {state} = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
    }

    render() {
        if (auth.getCurrentUser()) return <Redirect to="/"/>
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
