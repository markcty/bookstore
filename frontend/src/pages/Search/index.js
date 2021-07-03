import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Col, Row } from "antd";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import BookCard from "../../components/BookCard";
import * as queryString from "query-string";
import { searchBooks } from "../../services/api";

function Index(props) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const { q } = queryString.parse(props.location.search);
    searchBooks(q).then((books) => setBooks(books));
  }, [props.location.search]);

  return (
    <Content className={"page"}>
      <Row justify={"center"}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <Row className={"bookCards"} gutter={[32, 16]}>
            {books.map((book) => {
              return (
                <Col key={book.id} xs={24} sm={12} md={6} lg={6} xl={6}>
                  <Link to={`/book/${book.id}`}>
                    {" "}
                    <BookCard {...book} />{" "}
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Content>
  );
}

Index.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Index);
