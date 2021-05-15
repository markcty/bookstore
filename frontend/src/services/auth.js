import axios from "axios";
import { apiUrl } from "./config";
import Cookies from "js-cookie";

const http = axios.create({
  baseURL: apiUrl + "/api",
});

// const AuthContext = createContext();

// export function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

// function useProvideAuth() {
//   const [isLogin, setIsLogin] = useState(Cookies.get("isLogin") === "true");

//   const login = (username, password) => {
//     return realLogin(username, password).then((res) => {
//       setIsLogin(true);
//       Cookies.set("isLogin", "true");
//       console.log(res);
//       Cookies.set("user", JSON.stringify(res.data));
//     });
//   };

//   const logout = () => {
//     setIsLogin(false);
//     Cookies.remove("isLogin");
//     Cookies.remove("user");
//   };

//   const getUser = () => {
//     return Cookies.getJSON("user");
//   };

//   return { isLogin, login, logout, getUser };
// }

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
  Cookies.remove("user");
}

export function getUser() {
  return Cookies.getJSON("user");
}
