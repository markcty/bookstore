import React from "react";
import {Col, Row} from "antd";
import CartCard from "../../components/CartCard";
import "./index.css"
import {Content} from "antd/es/layout/layout";
import {Link} from "react-router-dom";

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartBooks: [
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
        const {cartBooks} = this.state;
        return (
            <Content className={"page"}>
                <Row justify={"center"}
                     align={"middle"}>
                    <Col sm={24} md={16} lg={16} xl={14}>
                        <h1 style={{
                            borderBottom: "2px solid #E1E8EE",
                            textAlign: "center",
                            paddingBottom: 12,
                            fontSize: "2em"
                        }}>My Cart</h1>
                    </Col>
                    <Col sm={24} md={16} lg={16} xl={14}>
                        <Row gutter={48}>
                            {cartBooks.map(book => {
                                return (
                                    <Col sm={24} md={12}>
                                        <Link to={`book/${book.id}`}><CartCard {...book}/></Link>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Link to={"/checkout"}>
                            <div style={{display: "flex", justifyContent: "center", marginTop: "32px"}}>
                                <h2 className={"checkoutButton"}>Check Out</h2>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Content>
        )
    }

}