/* eslint-disable no-template-curly-in-string */
import { Button, Col, Form, Input, Layout, Row } from "antd";
import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router";
import CartCard from "../../components/CartCard";
import { checkout, delCartItem, getCartItems } from "../../services/api";
import "./index.css";

const { Content } = Layout;

function Checkout(props) {
    let history = useHistory();

    const [form] = Form.useForm();

    const [cartItems, setCartItems] = useState([]);

    const updateCart = () => getCartItems().then(cartItems => setCartItems(cartItems));

    const removeItem = (id) => {
        delCartItem(id).then(updateCart);
    }

    useEffect(updateCart, []);

    if (cartItems.length === 0) return (
        <Content className={"page"}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>Add some books to your cart first</h1>
            </div>
        </Content>
    );

    const onFinish = values => {
        checkout(values.order)
            .then(() => history.push("/thanks"));
    }

    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 20,
        },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    return (
        <Content className={"page"}>
            <Row justify={"center"}>
                <Col xs={22} sm={22} md={20} lg={18} xl={16}>
                    <Row justify={"center"}>
                        <Col span={24}>
                            <h1 style={{
                                borderBottom: "2px solid #E1E8EE",
                                paddingLeft: 12,
                                paddingBottom: 12,
                                textAlign: "left",
                                fontSize: "1.8em"
                            }}>
                                Items
                            </h1>
                        </Col>
                        <Col span={24} style={{ paddingBottom: 24 }}>
                            <Row gutter={48}>
                                {cartItems.map(item => {
                                    return (
                                        <Col span={24}>
                                            <CartCard {...item} removeItem={removeItem} key={item.id} />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Col>
                        <Col span={24}>
                            <h1 style={{
                                borderBottom: "2px solid #E1E8EE",
                                paddingLeft: 12,
                                paddingBottom: 12,
                                textAlign: "left",
                                fontSize: "1.8em"
                            }}>
                                Shipping Information
                            </h1>
                        </Col>
                        <Col span={24}
                            style={{ display: "flex", justifyContent: "flex-start" }}>
                            <Form {...layout} name="nest-messages" onFinish={onFinish}
                                validateMessages={validateMessages} style={{ width: "100%" }}
                                form={form}
                            >
                                <Form.Item
                                    name={['order', 'name']}
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['order', 'phoneNumber']}
                                    label="Phone Number"
                                    rules={[
                                        {
                                            required: true
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['order', 'address']}
                                    label="Address"
                                    rules={[
                                        {
                                            required: true
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['order', 'note']} label="note">
                                    <Input.TextArea />
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={24}
                            style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}
                        >
                            <Button type={"primary"} size={"large"} style={{ width: 100 }}
                                onClick={() => form.submit()}>Pay</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Content>
    );
}

export default withRouter(Checkout);