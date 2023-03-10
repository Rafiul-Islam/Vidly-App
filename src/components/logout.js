import React, {useState} from 'react';
import auth from "../services/authService";

const Logout = () => {
    useState(() => {
        auth.logout();
        window.location = "/";
    }, [])
    return null;
};

export default Logout;
