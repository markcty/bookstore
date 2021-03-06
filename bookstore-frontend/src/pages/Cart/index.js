import React from "react";
import {Col, Row} from "antd";
import CartCard from "../../components/CartCard";
import "./index.css"

export default class Cart extends React.Component {
    render() {
        return (
            <div className={"cartPage"}>
                <Row justify={"center"}
                     align={"middle"}>
                    <Col sm={24} md={16} lg={16}>
                        <h1 style={{
                            borderBottom: "2px solid #E1E8EE",
                            textAlign: "center",
                            paddingBottom: 12,
                            fontSize: "2em"
                        }}>My Cart</h1>
                    </Col>
                    <Col sm={24} md={16} lg={16}>
                        <Row gutter={48}>
                            <Col sm={24} md={12}>
                                <CartCard/>
                            </Col>
                            <Col sm={24} md={12}>
                                <CartCard/>
                            </Col>
                            <Col sm={24} md={12}>
                                <CartCard/>
                            </Col>
                            <Col sm={24} md={12}>
                                <CartCard/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }

}