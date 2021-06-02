import React from "react";
import "./index.css";
import { Content } from "antd/es/layout/layout";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Redirect, Link, useHistory, withRouter } from "react-router-dom";
import { register } from "../../services/auth";

function Register({ user, setUser }) {
  let history = useHistory();

  if (user) return <Redirect to="/" />;

  const onFinish = ({ username, password }) => {
    register(username, password)
      .then(() => {
        window.alert("Register succeed! Please login now. Welcome!");
        history.push("/login");
      })
      .catch((err) => window.alert(err));
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
          <h2 style={{ paddingBottom: "8px" }}>Register</h2>
          <div id={"underline-title"} />
        </div>
        <Form
          name="register"
          className="login-form"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
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
            hasFeedback
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
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

export default withRouter(Register);
