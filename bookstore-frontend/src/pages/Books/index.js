import React, {useState, useEffect} from "react";
import {Col, Row} from "antd";
import "./index.css"
import BookCard from "../../components/BookCard";
import {Content} from "antd/es/layout/layout";
import {Link} from "react-router-dom";
import {getBooks} from "../../services/api";

export default function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks().then(books => setBooks(books));
    }, []);

    return (
        <Content className={"page"}>
            <Row justify={"center"}>
                <Col xs={24} sm={20} md={18} lg={16} xl={14}>
                    <Row className={"bookCards"} gutter={[32, 16]}>
                        {books.map(book => {
                            return (
                                <Col key={book.isbn} xs={24} sm={12} md={6} lg={6} xl={6}>
                                    <Link to={`/book/${book.isbn}`}> <BookCard {...book}/> </Link>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </Row>
        </Content>
    )

}