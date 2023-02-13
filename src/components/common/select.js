import React from 'react';

const Select = (props) => {

    const {name, label, error, options, ...rest} = props;

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <select
                name={name}
                id={name}
                {...rest}
                className="form-control"
            >
                <option value="">---Select---</option>
                {options.map(option => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className='alert alert-danger'>{error}</div>}
        </div>
    );
};

export default Select;
