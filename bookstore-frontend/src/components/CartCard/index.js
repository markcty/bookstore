import React from "react";
import {DeleteOutlined} from "@ant-design/icons";
import {Col, Row} from "antd";
import "./index.css";

export default class CartCard extends React.Component {
    render() {
        return (
            <Row className="card" align={"middle"} justify={"center"} gutter={32}
                 style={{paddingTop: 32, paddingBottom: 32, margin: 0}}>
                <Col className={"deleteButton"} span={1}>
                    <DeleteOutlined style={{fontSize: "1.8em", color: "red"}}/>
                </Col>
                <Col span={6} offset={1}>
                    <img
                        className={"cover"}
                        alt={" "}
                        src={"https://s-media-cache-ak0.pinimg.com/564x/f9/8e/2d/f98e2d661445620266c0855d418aab71.jpg"}
                        style={{width: "100%"}}
                    />
                </Col>
                <Col className="description" span={6}>
                    <h3 className={"title"}>Frank</h3>
                    <h4 className={"author"}>Mary Shelley</h4>
                </Col>

                <Col className="price" offset={2}>$549</Col>
            </Row>
        )
    }
}