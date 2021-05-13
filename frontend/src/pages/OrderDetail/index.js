import { Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookTable from "../../components/BookTable";
import { getOrderDetail } from "../../services/api";


export default function OrderDetail() {
  const { orderId } = useParams();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getOrderDetail(orderId)
      .then(res => setBooks(res.data));
  }, [orderId])

  return (
    <Content className={"page"}>
      <Row justify={"center"}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <BookTable books={books} />
        </Col>
      </Row>
    </Content>
  )
}
