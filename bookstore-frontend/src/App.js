import {Layout} from "antd";
import BookstoreHeader from "./components/Header";
import React from "react";

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Layout>
                <BookstoreHeader/>
            </Layout>
        );
    }
}

export default App;
