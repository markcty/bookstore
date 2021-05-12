import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import "./index.css";
import { Link } from "react-router-dom";

export default function CartCard({ id, price, title, author, inventory, coverUrl, bookId, removeItem }) {
    return (
        <Row className="card" align={"middle"} gutter={16} wrap={false}
            style={{ paddingTop: 32, paddingBottom: 32, margin: 0 }}
        >
            <Col className={"deleteButton"} span={1}>
                <DeleteOutlined style={{ fontSize: "1.8em", color: "red" }}
                    onClick={() => removeItem(id)} />
            </Col>
            <Col xs={6} sm={6} md={9} lg={6} offset={1}>
                <Link to={`book/${bookId}`}>
                    <img
                        className={"cover"}
                        alt={" "}
                        src={coverUrl}
                        style={{ width: "141px", height: "200px", objectFit: "cover" }}
                    />
                </Link>
            </Col>
            <Col className="description" span={9} offset={1}>
                <Link to={`book/${bookId}`}>
                    <h3 className={"title"}>{title}</h3>
                    <h4 className={"author"}>{author}</h4>
                </Link>
            </Col>

            <Col className="price" offset={2}>${price}</Col>
        </Row>
    )
}