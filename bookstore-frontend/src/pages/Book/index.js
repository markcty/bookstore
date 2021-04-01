import React from "react";
import {Content} from "antd/es/layout/layout";
import {Button, Col, Row} from "antd";
import "./index.css"


export default class Book extends React.Component {
    constructor(props) {
        super(props);
        const id = this.props.match.params.id
        this.state = {
            id: id,
            books: [
                {
                    id: 1,
                    title: "Frankenstein",
                    author: "Mary Shelley",
                    price: 50.9,
                    cover: "https://s-media-cache-ak0.pinimg.com/564x/f9/8e/2d/f98e2d661445620266c0855d418aab71.jpg",
                    description: "Frankenstein; or, The Modern Prometheus is an 1818 novel written by English author Mary Shelley. Frankenstein tells the story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment. Shelley started writing the story when she was 18, and the first edition was published anonymously in London on 1 January 1818, when she was 20. Her name first appeared in the second edition, which was published in Paris in 1821."
                },
                {
                    id: 2,
                    title: "A Little Princess",
                    author: "Frances Hodgson Burnett",
                    price: 38.9,
                    cover: "http://www.publishersweekly.com/images/data/ARTICLE_PHOTO/photo/000/028/28129-1.JPG",
                    description: "Frankenstein; or, The Modern Prometheus is an 1818 novel written by English author Mary Shelley. Frankenstein tells the story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment. Shelley started writing the story when she was 18, and the first edition was published anonymously in London on 1 January 1818, when she was 20. Her name first appeared in the second edition, which was published in Paris in 1821."
                },
                {
                    id: 3,
                    title: "Bird By Bird",
                    author: "Anne Lamott",
                    price: 98.0,
                    cover: "http://talkingwriting.com//sites/default/files/Bird-by-Bird-image1.jpg",
                    description: "Frankenstein; or, The Modern Prometheus is an 1818 novel written by English author Mary Shelley. Frankenstein tells the story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment. Shelley started writing the story when she was 18, and the first edition was published anonymously in London on 1 January 1818, when she was 20. Her name first appeared in the second edition, which was published in Paris in 1821."
                },
                {
                    id: 4,
                    title: "Girl at War",
                    author: "Sara Novic",
                    price: 14.3,
                    cover: "http://d.gr-assets.com/books/1414348859l/23209971.jpg",
                    description: "Frankenstein; or, The Modern Prometheus is an 1818 novel written by English author Mary Shelley. Frankenstein tells the story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment. Shelley started writing the story when she was 18, and the first edition was published anonymously in London on 1 January 1818, when she was 20. Her name first appeared in the second edition, which was published in Paris in 1821."
                },
                {
                    id: 5,
                    title: "The Alchemist",
                    author: "Paulo Coelho",
                    price: 67.2,
                    cover: "http://prodimage.images-bn.com/pimages/9780062315007_p0_v2_s192x300.jpg",
                    description: "Frankenstein; or, The Modern Prometheus is an 1818 novel written by English author Mary Shelley. Frankenstein tells the story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment. Shelley started writing the story when she was 18, and the first edition was published anonymously in London on 1 January 1818, when she was 20. Her name first appeared in the second edition, which was published in Paris in 1821."
                }
            ]
        }
    }

    render() {
        const {title, author, cover, price, description} = this.state.books[this.state.id - 1];
        console.log(cover);
        return (
            <Content className={"page"}>
                <Row justify={"center"} gutter={64}>
                    <Col xs={22} sm={22} md={8} lg={6} xl={5}>
                        <img src={cover} alt={" "}
                             style={{width: "100%", objectFit: "cover", border: "3px solid black"}}/>
                    </Col>
                    <Col xs={22} sm={22} md={10} lg={10} xl={10}>
                        <div style={{borderBottom: "3px solid #E1E8EE", marginBottom: "24px"}}>
                            <h3 className={"title"}
                                style={{fontSize: "2.2em", marginBottom: "16px"}}>{title}</h3>
                            <h4 className={"author"}
                                style={{fontSize: "1em", marginBottom: "50px"}}> {author}</h4>
                            <p className={"description"}>{description}</p>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                            <h1 className={"price"}
                                style={{fontSize: "2.2em", margin: 0, marginRight: "24px"}}
                            >
                                ${price}
                            </h1>
                            {/*<h2 className={"cartButton"}>Add To Cart</h2>*/}
                            <Button type={"primary"} size={"large"}>Add To Cart</Button>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}