import React, {useState} from 'react';
import Input from "./common/input";
import Joi from "joi-browser/dist/joi-browser.min";

const LoginForm = () => {

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    const [credential, setCredential] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({})

    const validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const new_schema = {[name]: schema[name]}
        const {error} = Joi.validate(obj, new_schema)
        return error ? error.details[0].message : null;
    }

    const handleInputChange = ({currentTarget: input}) => {

        const allErrors = {...errors};
        const errorMessage = validateProperty(input)
        if (errorMessage) allErrors[input.name] = errorMessage
        else delete allErrors[input.name]

        const account = {...credential}
        account[input.name] = input.value;
        setCredential(account)
        setErrors(allErrors)
    }

    const validate = () => {
        const result = Joi.validate(credential, schema, {abortEarly: false})
        const {error} = result
        if (!error) return null;
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        setErrors(errors);
        if (errors) return;

        //call the server
        console.log('submitted...');
    }

    return (
        <div>
            <h1 className='mb-4'>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    name='username'
                    type='text'
                    value={credential.username}
                    label='Username'
                    onChange={handleInputChange}
                    error={errors?.username}
                />
                <Input
                    name='password'
                    type='password'
                    value={credential.password}
                    label='Password'
                    onChange={handleInputChange}
                    error={errors?.password}
                />
                <button disabled={validate()} className='btn btn-primary'>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
