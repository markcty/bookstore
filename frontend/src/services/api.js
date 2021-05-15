import axios from "axios";
import { apiUrl } from "./config";

const http = axios.create({
  baseURL: apiUrl + "/api",
  withCredentials: true,
});

export function getBooks() {
  return new Promise((resolve, reject) => {
    http
      .get("/books")
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function getBook(id) {
  return new Promise((resolve, reject) => {
    http
      .get("/book", { params: { id: id } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function updateBook(bookDetail) {
  return new Promise((resolve, reject) => {
    http({
      method: "POST",
      url: "/admin/book",
      data: bookDetail,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function delBook(bookId) {
  return new Promise((resolve, reject) => {
    http
      .delete("/admin/book", {
        params: { id: bookId },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function getCartItems() {
  return new Promise((resolve, reject) => {
    http
      .get("/user/cart", {})
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function delCartItem(bookId) {
  return new Promise((resolve, reject) => {
    http({
      method: "DELETE",
      url: "/user/cart",
      params: { bookId: bookId },
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function addCartItem(bookId) {
  return new Promise((resolve, reject) => {
    http({
      method: "POST",
      url: "/user/cart",
      params: { bookId: bookId },
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function checkout(order) {
  return new Promise((resolve, reject) => {
    http({
      method: "POST",
      url: "/checkout",
      data: order,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function getOrders() {
  return new Promise((resolve, reject) => {
    http
      .get("/orders")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function getOrderDetail(id) {
  return new Promise((resolve, reject) => {
    http
      .get("/order", {
        params: { id: id },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
