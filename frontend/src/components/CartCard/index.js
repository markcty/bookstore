import React, {useState} from "react";
import {DeleteOutlined} from "@ant-design/icons";
import {Button, Col, Row, Space} from "antd";
import "./index.css";
import {Link} from "react-router-dom";
import {delCartItem} from "../../services/api";

export default function CartCard({bookId, price, title, author, quantity, coverUrl, addBook, delBook}) {
    return (
        <Row className="card" align={"middle"} gutter={16} wrap={false}
             style={{paddingTop: 32, paddingBottom: 32, margin: 0}}
        >
            <Col className={"deleteButton"} span={1}>
                <DeleteOutlined style={{fontSize: "1.8em", color: "red"}}
                                onClick={() => delCartItem(bookId)}/>
            </Col>
            <Col xs={6} sm={6} md={9} lg={6} offset={1}>
                <Link to={`book/${bookId}`}>
                    <img
                        className={"cover"}
                        alt={" "}
                        src={coverUrl}
                        style={{width: "141px", height: "200px", objectFit: "cover"}}
                    />
                </Link>
            </Col>
            <Col className="description" span={6} offset={1}>
                <Link to={`book/${bookId}`}>
                    <h3 className={"title"}>{title}</h3>
                    <h4 className={"author"}>{author}</h4>
                </Link>
            </Col>
            <Col span={4}>
                <p className="price" style={{fontSize: "1.8em"}}>${price} × </p>
            </Col>
            <Col>
                <Space>
                    <Button onClick={() => delBook(bookId)}>
                        -1
                    </Button>
                    <p style={{fontSize: "1.4em", margin: 0, padding: 0}}>{quantity}</p>
                    <Button onClick={() => addBook(bookId)}>+1</Button>
                </Space>
            </Col>
        </Row>
    )
}