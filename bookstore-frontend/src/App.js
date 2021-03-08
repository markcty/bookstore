import {Layout} from "antd";
import BookstoreHeader from "./components/Header";
import React from "react";
import 'antd/dist/antd.css';
import Home from "./pages/Home"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Cart from "./pages/Cart";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

const {Footer} = Layout;

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Layout>
                    <BookstoreHeader/>
                    <Switch>
                        <Route path={"/cart"} component={Cart}/>

                        <Route path={"/books"} component={Books}/>

                        <Route path={"/book/:id"} component={Book}/>

                        <Route path={"/checkout"} component={Checkout}/>

                        <Route path={"/login"} component={Login}/>

                        <Route path={"/"} component={Home}/>
                    </Switch>
                    <Footer style={{textAlign: 'center', height: 50, marginTop: -50, paddingTop: 14}}>Created by
                        markcty</Footer>
                </Layout>
            </Router>
        );
    }
}
