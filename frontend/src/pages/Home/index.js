import React from "react";
import { Col, Layout, Row } from "antd";
import Banner from "../../components/Banner/Banner";
import "./index.css";
import PopularBookList from "../../components/PopularBookList";

const { Content } = Layout;

export default function Home() {
  return (
    <Content className={"page"}>
      <Row justify={"center"} align={"middle"} gutter={[16, 32]}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <Banner />
        </Col>
        <Col xs={22} sm={20} md={20} lg={18} xl={16}>
          <PopularBookList />
        </Col>
      </Row>
    </Content>
  );
}
