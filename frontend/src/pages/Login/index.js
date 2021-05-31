import React from "react";
import "./index.css";
import { Content } from "antd/es/layout/layout";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Redirect, Link } from "react-router-dom";
import { getUser, login } from "../../services/auth";

export default function Login({ user, setUser }) {
  if (user) return <Redirect to="/" />;

  const onFinish = ({ username, password }) => {
    login(username, password)
      .then(() => setUser(getUser()))
      .catch((err) => {
        console.log(err);
        window.alert("wrong username or password");
      });
  };

  return (
    <Content
      className={"page loginPage"}
      style={{
        paddingTop: 48,
        paddingBottom: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={"loginCard"}
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        <div
          className={"cardTitle"}
          style={{
            textAlign: "center",
            marginBottom: "32px",
            marginTop: "16px",
          }}
        >
          <h2 style={{ paddingBottom: "8px" }}>LOGIN</h2>
          <div id={"underline-title"} />
        </div>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <div style={{ marginTop: "4px" }}>
              Or <Link to={"/register"}>register now!</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
}
