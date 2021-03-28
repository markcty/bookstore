import React, {useState} from "react";
import {Col, Form, Input, Layout, Row} from "antd";
import CartCard from "../../components/CartCard";
import "./index.css"

const {Content} = Layout

export default function Checkout(props) {
    const [form] = Form.useForm();
    const [books, useBooks] = useState([
        {
            id: 1,
            title: "Frankenstein",
            author: "Mary Shelley",
            price: 50.9,
            cover: "https://s-media-cache-ak0.pinimg.com/564x/f9/8e/2d/f98e2d661445620266c0855d418aab71.jpg"
        },
        {
            id: 2,
            title: "A Little Princess",
            author: "Frances Hodgson Burnett",
            price: 38.9,
            cover: "http://www.publishersweekly.com/images/data/ARTICLE_PHOTO/photo/000/028/28129-1.JPG"
        },
        {
            id: 3,
            title: "Bird By Bird",
            author: "Anne Lamott",
            price: 98.0,
            cover: "http://talkingwriting.com//sites/default/files/Bird-by-Bird-image1.jpg"
        },
        {
            id: 4,
            title: "Girl at War",
            author: "Sara Novic",
            price: 14.3,
            cover: "http://d.gr-assets.com/books/1414348859l/23209971.jpg"
        },
        {
            id: 5,
            title: "The Alchemist",
            author: "Paulo Coelho",
            price: 67.2,
            cover: "http://prodimage.images-bn.com/pimages/9780062315007_p0_v2_s192x300.jpg"
        }
    ]);

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

    return (
        <Content className={"page"}>
            <Row justify={"center"}>
                <Col xs={24} sm={20} md={18} lg={16} xl={14}>
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
                        <Col span={24} style={{paddingBottom: 24}}>
                            <Row gutter={48}>
                                {books.map(book => {
                                    return (
                                        <Col span={24}>
                                            <CartCard {...book}/>
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
                             style={{display: "flex", justifyContent: "flex-start"}}>
                            <Form {...layout} name="nest-messages" onFinish={(value) => console.log(value)}
                                  validateMessages={validateMessages} style={{width: "100%"}}
                                  form={form}
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
                        <Col span={24}
                             style={{display: "flex", justifyContent: "flex-end", marginTop: 16}}
                        >
                            <h2 className={"payButton"} onClick={() => form.submit()}>
                                Pay
                            </h2>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Content>
    );
}