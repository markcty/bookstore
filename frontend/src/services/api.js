import axios from "axios";
import { apiUrl } from "./config";

const http = axios.create({
  baseURL: apiUrl + "/api",
  withCredentials: true,
});

export function getBooks() {
  return new Promise((resolve, reject) => {
    http
      .get("/public/books")
      .then((res) =>
        resolve(
          res.data.map((book) => {
            return { ...book, key: book.id };
          })
        )
      )
      .catch((err) => reject(err));
  });
}

export function getBook(id) {
  return new Promise((resolve, reject) => {
    http
      .get("/public/book", { params: { id: id } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function getBookPage({ page, pageSize }) {
  return new Promise((resolve, reject) => {
    http
      .get("/public/bookPage", { params: { page: page, pageSize: pageSize } })
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
      .catch((err) => reject(err.response.data.message));
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

export function getAllSales(start, end) {
  return new Promise((resolve, reject) => {
    http
      .get("/admin/sales", {
        params: {
          start: start,
          end: end,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function getGoldenBuyers(start, end) {
  return new Promise((resolve, reject) => {
    http
      .get("/admin/goldenBuyers", {
        params: {
          start: start,
          end: end,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function getAllUsers() {
  return new Promise((resolve, reject) => {
    http
      .get("/admin/users")
      .then((res) =>
        resolve(
          res.data.map((user) => {
            return { ...user, key: user.id };
          })
        )
      )
      .catch((err) => reject(err));
  });
}

export function disableUser(id) {
  return new Promise((resolve, reject) => {
    http
      .delete("/admin/disableUser", { params: { id: id } })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function enableUser(id) {
  return new Promise((resolve, reject) => {
    http
      .get("/admin/enableUser", { params: { id: id } })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function getAllOrders() {
  return new Promise((resolve, reject) => {
    http
      .get("/admin/orders")
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function uploadBookCover(file) {
  return new Promise((resolve, reject) => {
    let form = new FormData();
    form.append("cover", file);
    http
      .post("/admin/uploadBookCover", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function searchBooks(title) {
  return new Promise((resolve, reject) => {
    http
      .get("/public/searchBooks", { params: { title: title } })
      .then((res) =>
        resolve(
          res.data.map((book) => {
            return { ...book, key: book.id };
          })
        )
      )
      .catch((err) => reject(err));
  });
}

export function getOrdersPage({ page, pageSize }) {
  return new Promise((resolve, reject) => {
    http
      .get("/ordersPage", { params: { page: page, pageSize: pageSize } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function getAllOrdersPage({ page, pageSize }) {
  return new Promise((resolve, reject) => {
    http
      .get("/admin/ordersPage", { params: { page: page, pageSize: pageSize } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function getOrdersByBookTitle(title) {
  return new Promise((resolve, reject) => {
    http
      .get("/getOrdersByBookTitle", { params: { title: title } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
