import React from 'react';

const LoginForm = () => {
    return (
        <div>
            <h1 className='mb-4'>Login</h1>
            <form action="">
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Username</label>
                    <input type="text"
                           className="form-control"
                           id="username"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                    />
                </div>
                <button className='btn btn-primary'>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
