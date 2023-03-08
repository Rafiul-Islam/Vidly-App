import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/movies";

export function getMovies() {
    return http.get(apiEndPoint);
}

export function getMovie(id) {
    return http.get(`${apiEndPoint}/${id}`);
}

export function deleteMovie(id) {
    return http.delete(`${apiEndPoint}/${id}`);
}
