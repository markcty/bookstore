import React from "react";
import { Col, Layout, Row } from "antd"
import Banner from "../../components/Banner/Banner";
import "./index.css";
import PopularBookList from "../../components/PopularBookList";

const { Content } = Layout;

export default function Home() {
    return (
        <Content className={"page"}>
            <Row justify={"center"}
                align={"middle"}
                gutter={[16, 32]}
            >
                <Col xs={24} sm={20} md={18} lg={16} xl={14}>
                    <Banner />
                </Col>
                <Col xs={24} sm={20} md={18} lg={16} xl={14}>
                    <PopularBookList />
                </Col>
            </Row>
        </Content>
    )
}