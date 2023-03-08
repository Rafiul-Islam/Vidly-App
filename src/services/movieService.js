import http from "./httpService";

const apiEndPoint = "http://localhost:3900/api/movies"

export function getMovies() {
    return http.get(apiEndPoint);
}

export function getMovie(id) {
    return http.get(`${apiEndPoint}/${id}`);
}

export function deleteMovie(id) {
    return http.delete(`${apiEndPoint}/${id}`);
}
