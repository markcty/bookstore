import axios from "axios";
import { useAuth } from "./auth";
import { apiUrl } from "./config"
import Cookies from "js-cookie";

const http = axios.create({
    baseURL: apiUrl + "/api",
});

const getUser = () => {
    return JSON.parse(Cookies.get("user"));
}

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

export function getCartItems() {
    const { id: userId, username, password } = getUser();
    return new Promise((resolve, reject) => {
        http.get("/cart", {
            params: { userId: userId },
            auth: { username: username, password: password }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}

export function delCartItem(cartItemId) {
    const { id: userId, username, password } = getUser();
    return new Promise((resolve, reject) => {
        http({
            method: "DELETE",
            url: "/cart",
            auth: { username, password },
            params: { id: cartItemId }
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

export function addCartItem(bookId) {
    const { id: userId, username, password } = getUser();
    return new Promise((resolve, reject) => {
        http({
            method: "POST",
            url: "/cart",
            auth: { username, password },
            data: { userId: userId, bookId: bookId }
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

export function login(username, password) {
    return new Promise((resolve, reject) => {
        http.get("/login", { auth: { username: username, password: password } })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}
