import http from "./httpService";
import config from "../config.json";
import * as genresAPI from "./fakeGenreService";

const apiEndPoint = config.apiUrl + "/movies";

export function getMovies() {
    return http.get(apiEndPoint);
}

export function getMovie(id) {
    return http.get(`${apiEndPoint}/${id}`);
}

export function saveMovie(movie) {
    console.log(movie)
}

export function deleteMovie(id) {
    return http.delete(`${apiEndPoint}/${id}`);
}
