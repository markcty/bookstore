import { Breadcrumb, Col, Row, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderDetail } from "../../services/api";
import Search from "antd/es/input/Search";

export default function OrderDetail() {
  const { orderId } = useParams();

  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    getOrderDetail(orderId).then((res) => {
      const data = res.data;
      const orderItems = data.map((item) => {
        const book = item.book;
        return {
          bookId: book.id,
          price: book.price,
          title: book.title,
          quantity: item.quantity,
        };
      });
      setOrderItems(orderItems);
    });
  }, [orderId]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link to={`/book/${record.bookId}`}>{text}</Link>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sortDirections: ["ascend", "descend", "ascend"],
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sortDirections: ["ascend", "descend", "ascend"],
      sorter: (a, b) => a.quantity - b.quantity,
    },
  ];

  const [searchText, setSearchText] = useState("");

  return (
    <Content className={"page"}>
      <Row justify={"center"}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <Row gutter={[32, 16]}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Breadcrumb>
                <Breadcrumb.Item href={"/orders"}>All Orders</Breadcrumb.Item>
                <Breadcrumb.Item>Order {orderId}</Breadcrumb.Item>
              </Breadcrumb>
              <Search
                placeholder="input book title"
                allowClear
                onSearch={(v) => setSearchText(v.toLowerCase())}
                style={{ width: 300 }}
              />
            </Col>
            <Col span={24}>
              <Table
                dataSource={orderItems.filter((book) =>
                  book.title.toLowerCase().includes(searchText)
                )}
                columns={columns}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
