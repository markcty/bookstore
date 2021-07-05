import React, { useEffect, useState } from "react";
import { Col, PageHeader, Row } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import BookCard from "../BookCard";
import { Link } from "react-router-dom";
import { getBookPage } from "../../services/api";

const initPagination = { current: 1, pageSize: 4 };

export default function PopularBookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBookPage({
      page: initPagination.current - 1,
      pageSize: initPagination.pageSize,
    }).then((data) => setBooks(data.books));
  }, []);

  return (
    <Row className={"popularBooksContainer"} gutter={[32, 16]}>
      <Col span={24}>
        <PageHeader
          title={
            <>
              <HeartTwoTone
                twoToneColor="#eb2f96"
                style={{ marginLeft: 8, marginRight: 12 }}
              />
              <span>Popular Books</span>
            </>
          }
          style={{ padding: 0, marginTop: 8 }}
        />
      </Col>
      {books.map((book) => (
        <Col key={book.id} xs={12} sm={12} md={6} lg={6} xl={6}>
          <Link to={`/book/${book.id}`}>
            {" "}
            <BookCard {...book} />{" "}
          </Link>
        </Col>
      ))}
    </Row>
  );
}
