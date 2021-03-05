import React from "react";
import {Col, Row} from "antd";
import "./index.css"

export default class BookCard extends React.Component {
    render() {
        const {price, title} = this.props;
        return (
            <div className={"book read"}>
                <div className={"cover"}>
                    <img alt={" "}
                         src={"https://s-media-cache-ak0.pinimg.com/564x/f9/8e/2d/f98e2d661445620266c0855d418aab71.jpg"}/>
                </div>
                <Row justify={"center"} align={"middle"} gutter={8}>
                    <Col className={"description"} sm={24} md={17}>
                        <h3 className={"title"}>{title.substring(0, 14)}</h3>
                        <h4 className={"author"}>Mary Shelley</h4>
                    </Col>
                    <Col className={"price"} sm={24} md={7}>
                        ${price}
                    </Col>
                </Row>
            </div>
        );
    }
}
