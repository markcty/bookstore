import React, {useEffect, useState} from "react";
import {Content} from "antd/es/layout/layout";
import {Button, Col, Row} from "antd";
import "./index.css"
import {getBook, getBooks} from "../../services/api";


export default function Book() {
    const [bookInfo, setBookInfo] = useState(null);

    useEffect(() => {
        let s = window.location.pathname;
        let isbn = s.substring(s.lastIndexOf('/') + 1);
        console.log(isbn);
        getBook(isbn).then(bookInfo => setBookInfo(bookInfo))
    }, [])

    if (!bookInfo)
        return (
            <Content className={"page"}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <h1>No Such book</h1>
                </div>
            </Content>
        )

    const {coverUrl, title, author, price, description} = bookInfo;

    return (
        <Content className={"page"}>
            <Row justify={"center"} gutter={64}>
                <Col xs={22} sm={22} md={8} lg={6} xl={5}>
                    <img src={coverUrl} alt={" "}
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