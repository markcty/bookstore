import { Col, DatePicker, Row, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHotSales, getOrders } from "../../services/api";
import moment from "moment";

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
          purchaseDate: moment(order.purchaseTime),
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
      render: (date) => date.format("MMM Do YYYY, h:mm:ss a"),
      // sorter: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate),
      sorter: (a, b) => a.purchaseDate.isAfter(b.purchaseDate),
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
    moment("1-1-1999", "MM-DD-YYYY"),
    moment("1-1-2099", "MM-DD-YYYY"),
  ]);

  getHotSales(dateRange[0].format(), dateRange[1].format()).then((res) =>
    console.log(res)
  );
  // console.log(dateRange[0].format(), dateRange[1].format());

  return (
    <Content className={"page"}>
      <Row justify={"center"}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <Row gutter={[32, 16]}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "flex-end" }}
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
