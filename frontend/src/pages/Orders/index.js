import React, { useState, useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import { Col, DatePicker, Row, Space, Table } from "antd";
import { getOrders } from "../../services/api";
import { Link } from "react-router-dom";

const { RangePicker } = DatePicker;

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((values) => {
      let data = values.data.map((order) => {
        return {
          orderId: order.id,
          receiverName: order.consignee,
          address: order.address,
          phoneNumber: order.phoneNumber,
          price: order.totalPrice,
          purchaseDate: new Date(Date.parse(order.purchaseTime)),
        };
      });
      setOrders(data);
    });
  }, []);

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      defaultSortOrder: "descend",
      sortDirections: ["ascend", "descend", "ascend"],
      sorter: (a, b) => a.orderId - b.orderId,
    },
    {
      title: "Receiver Name",
      dataIndex: "receiverName",
      key: "receiverName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total Price",
      dataIndex: "price",
      key: "price",
      sortDirections: ["ascend", "descend", "ascend"],
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Purchase date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      sortDirections: ["ascend", "descend", "ascend"],
      render: (date) => date.toLocaleString(),
      sorter: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate),
    },
    {
      title: "Operation",
      dataIndex: "orderId",
      key: "orderId",
      render: (id) => (
        <Space size={"middle"}>
          <Link to={`/order/${id}`}>Detail</Link>
        </Space>
      ),
    },
  ];

  const [dateRange, setDateRange] = useState([
    new Date("January 1, 1900 00:00:00"),
    new Date("January 1, 2099 00:00:00"),
  ]);

  return (
    <Content className={"page"}>
      <Row justify={"center"}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <Row gutter={[32, 16]}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <RangePicker
                onChange={(range) => {
                  setDateRange(range);
                }}
              />
            </Col>
            <Col span={24}>
              <Table
                dataSource={orders.filter(
                  (order) =>
                    new Date(dateRange[0]) < new Date(order.purchaseDate) &&
                    new Date(dateRange[1]) > new Date(order.purchaseDate)
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
