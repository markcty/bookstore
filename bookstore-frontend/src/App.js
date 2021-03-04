import {Layout} from "antd";
import BookstoreHeader from "./components/Header";
import React from "react";
import 'antd/dist/antd.css';
import Home from "./pages/Home"

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Layout>
                <BookstoreHeader/>
                <Home/>
            </Layout>
        );
    }
}

export default App;
