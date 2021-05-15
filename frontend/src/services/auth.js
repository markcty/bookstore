import axios from "axios";
import { apiUrl } from "./config";
import Cookies from "js-cookie";

const http = axios.create({
  baseURL: apiUrl + "/api",
  withCredentials: true,
});

export function login(username, password) {
  return new Promise((resolve, reject) => {
    http
      .get("/login", { auth: { username: username, password: password } })
      .then((res) => {
        Cookies.set("user", JSON.stringify(res.data));
        resolve(res);
      })
      .catch((err) => reject(err));
  });
}

export function logout() {
  http.post("/logout");
  Cookies.remove("user");
}

export function getUser() {
  return Cookies.getJSON("user");
}

export function register(username, password) {
  return new Promise((resolve, reject) => {
    http
      .post("/register", { username: username, password: password })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
