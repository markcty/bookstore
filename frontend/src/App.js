import { Layout } from "antd";
import Header from "./components/Header";
import React, { useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./pages/Cart";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Search from "./pages/Search";
import ManageBooks from "./pages/ManageBooks";
import Orders from "./pages/Orders";
import "./App.less";
import { getUser } from "./services/auth";
import { PrivateRoute } from "./utils/privateRoute";
import Thanks from "./pages/Thanks";
import Register from "./pages/Register";
import ManageUsers from "./pages/MangeUsers";

const { Footer } = Layout;

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <Router>
      <Layout>
        <Header user={user} setUser={setUser} />
        <Switch>
          <PrivateRoute path={"/cart"} component={Cart} />
          <Route path={"/books"} component={Books} />
          <Route path={"/book/:bookId"}>
            <Book user={user} setUser={setUser} />
          </Route>
          <PrivateRoute path={"/checkout"} component={Checkout} />
          <Route path={"/login"}>
            <Login user={user} setUser={setUser} />
          </Route>
          <Route path={"/register"}>
            <Register user={user} setUser={setUser} />
          </Route>
          <Route path={"/search"} component={Search} />
          <PrivateRoute path={"/admin/books"} component={ManageBooks} />
          <PrivateRoute path={"/admin/users"} component={ManageUsers} />
          <PrivateRoute path={"/orders"} component={Orders} />
          <PrivateRoute path={"/thanks"} component={Thanks} />
          <Route exact path={"/"} component={Home} />
        </Switch>
        <Footer
          style={{
            textAlign: "center",
            height: 50,
            marginTop: -50,
            paddingTop: 14,
          }}
        >
          Created by markcty
        </Footer>
      </Layout>
    </Router>
  );
}
