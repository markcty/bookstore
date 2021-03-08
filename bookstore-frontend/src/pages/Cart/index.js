import React from "react";
import {Col, Row} from "antd";
import CartCard from "../../components/CartCard";
import "./index.css"
import {Content} from "antd/es/layout/layout";
import {Link} from "react-router-dom";

export default class Cart extends React.Component {

    render() {
        return (
            <Content className={"page"}>
                <Row justify={"center"}
                     align={"middle"}>
                    <Col sm={24} md={16} lg={16} xl={14}>
                        <h1 style={{
                            borderBottom: "2px solid #E1E8EE",
                            textAlign: "center",
                            paddingBottom: 12,
                            fontSize: "2em"
                        }}>My Cart</h1>
                    </Col>
                    <Col sm={24} md={16} lg={16} xl={14}>
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
                    <Col span={24}>
                        <Link to={"/checkout"}>
                            <div style={{display: "flex", justifyContent: "center", marginTop: "32px"}}>
                                <h2 className={"checkoutButton"}>Check Out</h2>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Content>
        )
    }

}