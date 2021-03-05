import {Layout} from "antd";
import BookstoreHeader from "./components/Header";
import React from "react";
import 'antd/dist/antd.css';
import Home from "./pages/Home"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Cart from "./pages/Cart";

const {Footer} = Layout;

export default class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Router>
                <Layout>
                    <BookstoreHeader/>
                    <Switch>
                        <Route path={"/cart"}>
                            <Cart/>
                        </Route>
                        <Route path={"/"}>
                            <Home/>
                        </Route>
                    </Switch>
                    <Footer style={{textAlign: 'center'}}>Created by markcty</Footer>
                </Layout>
            </Router>
        );
    }
}
