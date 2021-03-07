import React from "react";
import {Col, Row} from "antd";
import "./index.css"
import BookCard from "../../components/BookCard";
import {Content} from "antd/es/layout/layout";
import {Link} from "react-router-dom";

export default class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [
                {
                    id: 1,
                    title: "Frankenstein",
                    author: "Mary Shelley",
                    price: 50.9,
                    cover: "https://s-media-cache-ak0.pinimg.com/564x/f9/8e/2d/f98e2d661445620266c0855d418aab71.jpg"
                },
                {
                    id: 2,
                    title: "A Little Princess",
                    author: "Frances Hodgson Burnett",
                    price: 38.9,
                    cover: "http://www.publishersweekly.com/images/data/ARTICLE_PHOTO/photo/000/028/28129-1.JPG"
                },
                {
                    id: 3,
                    title: "Bird By Bird",
                    author: "Anne Lamott",
                    price: 98.0,
                    cover: "http://talkingwriting.com//sites/default/files/Bird-by-Bird-image1.jpg"
                },
                {
                    id: 4,
                    title: "Girl at War",
                    author: "Sara Novic",
                    price: 14.3,
                    cover: "http://d.gr-assets.com/books/1414348859l/23209971.jpg"
                },
                {
                    id: 5,
                    title: "The Alchemist",
                    author: "Paulo Coelho",
                    price: 67.2,
                    cover: "http://prodimage.images-bn.com/pimages/9780062315007_p0_v2_s192x300.jpg"
                }
            ]
        }
    }

    render() {
        const {books} = this.state;
        return (
            <Content className={"page"}>
                <Row justify={"center"}>
                    <Col xs={24} sm={20} md={18} lg={16} xl={14}>
                        <Row className={"bookCards"} gutter={[32, 16]}>
                            {books.map(book => {
                                return (
                                    <Col key={book.id} xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <Link to={`/book/${book.id}`}> <BookCard {...book}/> </Link>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
            </Content>
        )
    }
}