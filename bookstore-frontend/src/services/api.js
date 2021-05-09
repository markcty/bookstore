import axios from "axios";
import {apiUrl} from "./config";

const http = axios.create({
    baseURL: apiUrl + "/api",
});

export function getBooks() {
    return new Promise((resolve, reject) => {
        http.get("/books")
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    });
}

export function getBook(isbn) {
    return new Promise((resolve, reject) => {
        http.get("/book", {params: {ISBN: isbn}})
            .then(res => resolve(res.data))
            .catch(err => reject.err);
    })
}