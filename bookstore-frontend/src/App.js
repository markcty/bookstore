import {Layout} from "antd";
import BookstoreHeader from "./components/Header";
import React from "react";
import 'antd/dist/antd.css';
import Home from "./pages/Home"

const {Footer} = Layout;

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Layout>
                <BookstoreHeader/>
                <Home/>
                <Footer style={{textAlign: 'center'}}>Created by markcty</Footer>
            </Layout>
        );
    }
}

export default App;
