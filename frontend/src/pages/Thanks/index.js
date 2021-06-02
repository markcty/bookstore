import { Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const { Content } = Layout;

export default function Thanks() {
  return (
    <Content className={"page"}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h1>Thank you for buying. Good Day!</h1>
          <Link
            to="/orders"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "2em",
            }}
          >
            Goto My Orders
          </Link>
        </div>
      </div>
    </Content>
  );
}
