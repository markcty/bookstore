import axios from "axios";
import { apiUrl } from "./config";

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

export function getBook(id) {
    return new Promise((resolve, reject) => {
        http.get("/book", { params: { id: id } })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}

export function getCartItems(userId) {
    return new Promise((resolve, reject) => {
        http.get("/cart", { params: { userId: userId } })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}