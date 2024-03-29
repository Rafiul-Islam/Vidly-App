import React, {Component} from 'react';
import Joi from "joi-browser/dist/joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {

    state = {
        data: {},
        errors: {}
    };

    validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const new_schema = {[name]: this.schema[name]}
        const {error} = Joi.validate(obj, new_schema)
        return error ? error.details[0].message : null;
    }

    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {abortEarly: false})
        const {error} = result
        if (!error) return null;
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input)
        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]

        const data = {...this.state.data}
        data[input.name] = input.value;

        this.setState({data, errors});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}})
        if (errors) return;

        this.doSubmit();
    }

    renderButton(label) {
        return <button
            disabled={this.validate()}
            className='btn btn-primary'
        >
            {label}
        </button>
    }

    renderInput(label, name, type = 'text') {
        const {data, errors} = this.state;
        return <Input
            name={name}
            type={type}
            label={label}
            value={data[name]}
            onChange={this.handleChange}
            error={errors[name]}
        />
    }

    renderSelect(label, name, options) {
        const {data, errors} = this.state;
        return <Select
            name={name}
            value={data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            error={errors[name]}
        />
    }
};

export default Form;
