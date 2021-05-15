import { Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import BookTable from "../../components/BookTable";
import { getBooks } from "../../services/api";
import "./index.css";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((books) => setBooks(books));
  }, []);

  return (
    <Content className={"page"}>
      <Row justify={"center"}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <BookTable books={books} />
        </Col>
      </Row>
    </Content>
  );
}
