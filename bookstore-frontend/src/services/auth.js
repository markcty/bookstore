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
      .then((res) => { setIsLogin(true); Cookies.set("isLogin", "true"); Cookies.set("username", username); Cookies.set("password", password); });
  };

  const logout = () => { setIsLogin(false); Cookies.remove("isLogin"); Cookies.remove("username"); Cookies.remove("password"); };

  return { isLogin, login, logout };
}