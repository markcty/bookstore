import React from "react";
import {Col, Layout, Row} from "antd"
import Banner from "../../components/Banner/Banner";
import "./index.css";
import PopularBookList from "../../components/PopularBookList";

const {Content} = Layout;

export default class Home extends React.Component {
    render() {
        return (
            <Content style={{backgroundColor: "white", paddingTop: 80, paddingBottom: 80, minHeight: "100vh"}}>
                <Row justify={"center"} align={"middle"}
                     gutter={[16, 32]}>
                    <Col xs={23} sm={16} md={13} lg={16} xl={16}>
                        <Banner/>
                    </Col>
                    <Col xs={24} sm={16} md={13} lg={16} xl={16}>
                        <PopularBookList/>
                    </Col>
                </Row>
            </Content>
        )
    }
}