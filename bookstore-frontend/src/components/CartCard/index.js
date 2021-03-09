import React from "react";
import {DeleteOutlined} from "@ant-design/icons";
import {Col, Row} from "antd";
import "./index.css";

export default class CartCard extends React.Component {
    render() {
        const {price, title, author, cover} = this.props;
        return (
            <Row className="card" align={"middle"} gutter={16} wrap={false}
                 style={{paddingTop: 32, paddingBottom: 32, margin: 0}}
            >
                <Col className={"deleteButton"} span={1}>
                    <DeleteOutlined style={{fontSize: "1.8em", color: "red"}}/>
                </Col>
                <Col span={6} offset={1}>
                    <img
                        className={"cover"}
                        alt={" "}
                        src={cover}
                        style={{width: "100%"}}
                    />
                </Col>
                <Col className="description" span={9}>
                    <h3 className={"title"}>{title}</h3>
                    <h4 className={"author"}>{author}</h4>
                </Col>

                <Col className="price" offset={2}>${price}</Col>
            </Row>
        )
    }
}