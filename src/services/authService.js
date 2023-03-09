import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/auth ";

const login = (user) => {
    return http.post(apiEndPoint, {
        email: user.username,
        password: user.password
    });
}

export default {login};
