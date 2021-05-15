import { Layout } from "antd";
import React from "react";
import "./index.css";

const { Content } = Layout;

export default function Thanks() {
  return (
    <Content className={"page"}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Thank you for buying. Good Day!</h1>
      </div>
    </Content>
  );
}
