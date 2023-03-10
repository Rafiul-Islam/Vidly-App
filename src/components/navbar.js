import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = ({user}) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light py-3">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to='/movies'>Moviely</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                to='/movies'
                                className="nav-link"
                                aria-current="page">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to='/customers'
                                className="nav-link">
                                Customs
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to='/rentals'
                                className="nav-link">
                                Rentals
                            </NavLink>
                        </li>
                        {!user &&
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to='/login'
                                        className="nav-link">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to='/register'
                                        className="nav-link">
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        }
                        {user &&
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to='/profile'
                                        className="nav-link">
                                        {user.name}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to='/logout'
                                        className="nav-link">
                                        Logout
                                    </NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
