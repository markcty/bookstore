import { Layout } from "antd";
import Header from "./components/Header";
import React from "react";
import Home from "./pages/Home"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./pages/Cart";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Search from "./pages/Search"
import Manage from "./pages/Manage";
import Orders from "./pages/Orders";
import "./App.less";
import { ProvideAuth } from "./services/auth";
import { PrivateRoute } from "./utils/privateRoute";
import Thanks from "./pages/Thanks";
import OrderDetail from "./pages/OrderDetail";


const { Footer } = Layout;

export default function App() {

    // const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <ProvideAuth>
            <Router>
                <Layout>
                    <Header />
                    <Switch>
                        <PrivateRoute path={"/cart"} component={Cart} />
                        <Route path={"/books"} component={Books} />
                        <Route path={"/book/:bookId"} component={Book} />
                        <PrivateRoute path={"/checkout"} component={Checkout} />
                        <Route path={"/login"} component={Login} />
                        <Route path={"/search"} component={Search} />
                        <PrivateRoute path={"/admin"} component={Manage} />
                        <Route path={"/orders"} component={Orders} />
                        <Route path={"/thanks"} component={Thanks} />
                        <Route path={"/order/:orderId"} component={OrderDetail} />
                        <Route path={"/"} component={Home} />
                    </Switch>
                    <Footer style={{ textAlign: 'center', height: 50, marginTop: -50, paddingTop: 14 }}>Created by
                            markcty</Footer>
                </Layout>
            </Router>
        </ProvideAuth>
    );

}
