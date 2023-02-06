import React from 'react';

const Input = (props) => {

    const {name, type, label, value, error, onChange} = props;

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type={type}
                   className="form-control"
                   id={name}
                   name={name}
                   value={value}
                   onChange={onChange}
            />
            {error && <div className='alert alert-danger'>{error}</div>}
        </div>
    );
};

export default Input;
