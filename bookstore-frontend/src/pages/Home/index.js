import React from "react";
import {Col, Layout, Row} from "antd"
import Banner from "../../components/Banner/Banner";
import "./index.css";

const {Content} = Layout;

class Home extends React.Component {
    render() {
        return (
            <Content>
                <Row justify={"center"} style={{paddingTop: "64px"}}>
                    <Col xs={22} sm={8} md={8} lg={8} xl={6}>
                        <Banner/>
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default Home;