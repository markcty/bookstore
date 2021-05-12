import React from "react";
import "./index.css";
import { Content } from "antd/es/layout/layout";
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Checkbox from "antd/es/checkbox/Checkbox";
import { login } from "../../services/api";

export default function Login() {
    const onFinish = (values) => {
        console.log(values);
        login(values.username, values.password);
    };

    return (
        <Content className={"page loginPage"} style={{
            paddingTop: 48,
            paddingBottom: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div className={"loginCard"}
                style={{ display: "flex", flexDirection: "column", paddingLeft: 48, paddingRight: 48 }}>
                <div className={"cardTitle"}
                    style={{ textAlign: "center", marginBottom: "32px", marginTop: "16px" }}>
                    <h2 style={{ paddingBottom: "8px" }}>LOGIN</h2>
                    <div id={"underline-title"} />
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username" />
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
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        {/*<a className="login-form-forgot" href="">*/}
                        {/*    Forgot password*/}
                        {/*</a>*/}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        {/*Or <a href="">register now!</a>*/}
                    </Form.Item>
                </Form>
            </div>
        </Content>
    )

}