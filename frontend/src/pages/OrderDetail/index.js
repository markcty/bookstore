import { Col, Row, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderDetail } from "../../services/api";
import Search from "antd/es/input/Search";

export default function OrderDetail() {
  const { orderId } = useParams();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getOrderDetail(orderId).then((res) => setBooks(res.data));
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
              <Search
                placeholder="input book title"
                allowClear
                onSearch={(v) => setSearchText(v.toLowerCase())}
                style={{ width: 300 }}
              />
            </Col>
            <Col span={24}>
              <Table
                dataSource={books.filter((book) =>
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
