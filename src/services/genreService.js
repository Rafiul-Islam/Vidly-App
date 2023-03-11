import http from "./httpService";
import config from "../config.json";

export default function getGenres() {
    return http.get(config.apiUrl + "/genres");
}
