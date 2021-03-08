import React from "react";
import {Col, Form, Input, Layout, Row} from "antd";
import CartCard from "../../components/CartCard";
import "./index.css"

const {Content} = Layout

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.pay = this.pay.bind(this);
    }

    pay() {
        // console.log("clicked");
        // console.log(this.form.current);
        this.form.current.submit();
    }

    render() {
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 20,
            },
        };
        /* eslint-disable no-template-curly-in-string */

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

        const onFinish = (values) => {
            console.log(values);
        };

        return (
            <Content className={"page"}>
                <Row justify={"center"}>
                    <Col sm={24} md={16} lg={16} xl={14}>
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
                    <Col sm={24} md={16} lg={16} xl={14} style={{paddingBottom: 24}}>
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
                    <Col sm={24} md={16} lg={16} xl={14}>
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
                    <Col sm={24} md={16} lg={16} xl={14} style={{display: "flex", justifyContent: "flex-start"}}>
                        <Form {...layout} name="nest-messages" onFinish={onFinish}
                              validateMessages={validateMessages} style={{width: "100%"}}
                              ref={this.form}
                        >
                            <Form.Item
                                name={['user', 'name']}
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name={['user', 'phone']}
                                label="Phone Number"
                                rules={[
                                    {
                                        required: true
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item name={['user', 'address']}
                                       label="Address"
                                       rules={[
                                           {
                                               required: true
                                           },
                                       ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item name={['user', 'Notes']} label="Notes">
                                <Input.TextArea/>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col sm={24} md={16} lg={16} xl={14}
                         style={{display: "flex", justifyContent: "flex-end", marginTop: 16}}
                    >
                        <h2 className={"payButton"} onClick={this.pay}>
                            Pay
                        </h2>
                    </Col>
                </Row>
            </Content>
        );
    }
}