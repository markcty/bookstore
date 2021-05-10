import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "antd";
import CartCard from "../../components/CartCard";
import "./index.css"
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { getBook, getCartItems } from "../../services/api";
import Book from "../Book";

export default function Cart() {

    const userId = 1;

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        getCartItems(userId).then(cartItems => setCartItems(cartItems));
    }, [])

    return (
        <Content className={"page"}>
            <Row justify={"center"}
                align={"middle"}>
                <Col xs={22} sm={20} md={18} lg={16} xl={14}>
                    <h1 style={{
                        borderBottom: "2px solid #E1E8EE",
                        textAlign: "center",
                        paddingBottom: 12,
                        fontSize: "2em"
                    }}>
                        My Cart
                    </h1>
                </Col>
                <Col xs={22} sm={20} md={18} lg={16} xl={14}>
                    <Row gutter={48}>
                        {cartItems.map(book => {
                            return (
                                <Col span={24}>
                                    <CartCard {...book} key={book.id} />
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
                <Col span={22}>
                    <Link to={"/checkout"}>

                        <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
                            <Button type={"primary"} size={"large"}>Check Out</Button>
                        </div>
                    </Link>
                </Col>
            </Row>
        </Content>
    )

}