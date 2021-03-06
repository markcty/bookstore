import React from "react";
import {Col, Row} from "antd";
import "./index.css"

export default class BookCard extends React.Component {
    render() {
        const {price, title, author, cover} = this.props;
        return (
            <Row className={"book read"}>
                <Col className={"cover"} span={24}>
                    <div className={"coverContainer"}>
                        <img alt={" "} src={cover}/>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={"description"}>
                        <h3 className={"title"}>{title.substring(0, 20)}</h3>
                        <h4 className={"author"}>{author}</h4>
                    </div>

                </Col>
                <Col className={"price"} sm={24} md={7}>
                    ${price}
                </Col>
            </Row>
        );
    }
}
