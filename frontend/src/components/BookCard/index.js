import React from "react";
import { Col, Row } from "antd";
import "./index.css";

export default function BookCard({ price, title, author, coverUrl }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Row className={"book"}>
        <Col className={"cover"}>
          <img alt={" "} src={coverUrl} />
        </Col>
        <Col span={24}>
          <div className={"description"}>
            <h3 className={"title"}>{title.substring(0, 20)}</h3>
            <h4 className={"author"}>{author}</h4>
          </div>
        </Col>
        <Col className={"price"}>${price}</Col>
      </Row>
    </div>
  );
}
