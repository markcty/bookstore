import { Button, Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartCard from "../../components/CartCard";
import { addCartItem, delCartItem, getCartItems } from "../../services/api";
import "./index.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartItems().then((cartItems) => setCartItems(cartItems));
  }, []);

  const addBook = (bookId) =>
    addCartItem(bookId).then(() =>
      getCartItems().then((cartItems) => setCartItems(cartItems))
    );

  const delBook = (bookId) =>
    delCartItem(bookId).then(() =>
      getCartItems().then((cartItems) => setCartItems(cartItems))
    );

  return (
    <Content className={"page"}>
      <Row justify={"center"} align={"middle"}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <h1
            style={{
              borderBottom: "2px solid #E1E8EE",
              textAlign: "center",
              paddingBottom: 12,
              fontSize: "2em",
            }}
          >
            My Cart
          </h1>
        </Col>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <Row gutter={48}>
            {cartItems.map((item) => {
              return (
                <Col span={24}>
                  <CartCard
                    {...item}
                    key={item.id}
                    addBook={addBook}
                    delBook={delBook}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col span={22}>
          <Link to={"/checkout"}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "32px",
              }}
            >
              <Button type={"primary"} size={"large"}>
                Check Out
              </Button>
            </div>
          </Link>
        </Col>
      </Row>
    </Content>
  );
}
