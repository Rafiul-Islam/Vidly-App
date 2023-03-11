import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = config.apiUrl + "/auth ";
const tokenKey = "token";

const getJWT = () => {
    return localStorage.getItem(tokenKey);
}

http.setJwt(getJWT());

const login = async (user) => {
    const {username, password} = user;
    const {data: jwt} = await http.post(apiEndPoint, {email: username, password: password});
    localStorage.setItem(tokenKey, jwt);
}

const loginWithJWT = (jwt) => {
    localStorage.setItem(tokenKey, jwt);
}

const logout = () => {
    localStorage.removeItem(tokenKey);
}

const getCurrentUser = () => {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}


export default {login, logout, getCurrentUser, loginWithJWT, getJWT};
