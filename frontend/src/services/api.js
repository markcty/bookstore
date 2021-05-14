import axios from "axios";
import {apiUrl} from "./config"
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
        http.get("/book", {params: {id: id}})
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}

export function updateBook(bookDetail) {
    const {username, password} = getUser();
    return new Promise((resolve, reject) => {
        http({
            method: "POST",
            url: "/admin/book",
            auth: {username, password},
            data: bookDetail
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

export function delBook(bookId) {
    const {username, password} = getUser();
    return new Promise((resolve, reject) => {
            http.delete("/admin/book", {params: {id: bookId}, auth: {username: username, password: password}})
                .then(res => resolve(res))
                .catch(err => reject(err));
        }
    )
}

export function getCartItems() {
    const {username, password} = getUser();
    return new Promise((resolve, reject) => {
        http.get("/user/cart", {
            auth: {username: username, password: password}
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}

export function delCartItem(bookId) {
    const {username, password} = getUser();
    return new Promise((resolve, reject) => {
        http({
            method: "DELETE",
            url: "/user/cart",
            auth: {username, password},
            params: {bookId: bookId}
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

export function addCartItem(bookId) {
    const {username, password} = getUser();
    return new Promise((resolve, reject) => {
        http({
            method: "POST",
            url: "/user/cart",
            auth: {username, password},
            params: {bookId: bookId}
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

export function login(username, password) {
    return new Promise((resolve, reject) => {
        http.get("/login", {auth: {username: username, password: password}})
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

export function checkout(order) {
    const {username, password} = getUser();
    return new Promise((resolve, reject) => {
        http({
            method: "POST",
            url: "/checkout",
            auth: {username, password},
            data: order
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

export function getOrders() {
    const {username, password} = getUser();
    return new Promise((resolve, reject) => {
        http.get("/orders", {auth: {username: username, password: password}})
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

export function getOrderDetail(id) {
    const {username, password} = getUser();
    return new Promise((resolve, reject) => {
        http.get("/order", {params: {id: id}, auth: {username: username, password: password}})
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}