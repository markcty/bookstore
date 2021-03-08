import React from "react";
import "./index.css";
import {Content} from "antd/es/layout/layout";
import {Button, Col, Form, Input, Row} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

export default class Login extends React.Component {
    render() {
        const onFinish = (values) => {
            console.log('Received values of form: ', values);
        };
        return (
            <Content className={"page"}>
                <div id="card">
                    <Row className={"cardContent"}>
                        <Col span={24} className={"cardTitle"}
                             style={{textAlign: "center", marginBottom: "32px", marginTop: "16px"}}>
                            <h2 style={{paddingBottom: "8px"}}>LOGIN</h2>
                            <div id={"underline-title"}/>
                        </Col>
                        <Col span={24} style={{display: "flex", justifyContent: "center"}}>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                style={{width: "80%"}}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="Username"/>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon"/>}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Content>
        )
    }
}