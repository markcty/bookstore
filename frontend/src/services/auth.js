import React, { useContext, createContext, useState } from "react";
import { login as realLogin } from "./api";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [isLogin, setIsLogin] = useState(Cookies.get('isLogin') === "true");

  const login = (username, password) => {
    return realLogin(username, password)
      .then(res => {
        setIsLogin(true);
        Cookies.set("isLogin", "true");
        console.log(res);
        Cookies.set("user", JSON.stringify(res.data));
      });
  };

  const logout = () => {
    setIsLogin(false);
    Cookies.remove("isLogin");
    Cookies.remove("user");
  };

  const getUser = () => {
    return JSON.parse(Cookies.get("user"));
  }

  return { isLogin, login, logout, getUser };
}