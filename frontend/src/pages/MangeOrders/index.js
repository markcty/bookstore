import { Col, DatePicker, Row, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import { getAllOrdersPage } from "../../services/api";
import OrderDetail from "../../components/OrderDetail";
import moment from "moment";

const { RangePicker } = DatePicker;

const columns = [
  {
    title: "Id",
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
    sorter: (a, b) => a.purchaseDate.isAfter(b.purchaseDate),
  },
  {
    title: "Operation",
  },
];

const initPagination = { current: 1, pageSize: 5 };

const initDate = null;

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const [pagination, setPagination] = useState(initPagination);

  const [loading, setLoading] = useState(false);

  const customFetch = (pagination) => {
    setLoading(true);
    getAllOrdersPage({
      page: pagination.current - 1,
      pageSize: pagination.pageSize,
    }).then((data) => {
      let temp = data.orders.map((order) => {
        return {
          key: order.id,
          orderId: order.id,
          receiverName: order.consignee,
          address: order.address,
          phoneNumber: order.phoneNumber,
          price: order.totalPrice,
          purchaseDate: moment(order.purchaseTime),
          orderItems: order.orderItems,
        };
      });
      setOrders(temp);
      setLoading(false);
      setPagination({ ...pagination, total: data.total });
    });
  };

  useEffect(() => {
    customFetch(initPagination);
  }, []);

  const handleSearch = (title) => {};

  const handleDateChange = (range) => {};

  const handlePaginationChange = (pagination) => {
    setPagination(pagination);
    customFetch(pagination);
  };

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
                onSearch={handleSearch}
                style={{ width: 300 }}
              />
              <RangePicker onChange={handleDateChange} />
            </Col>
            <Col span={24}>
              <Table
                dataSource={orders}
                columns={columns}
                rowKey={(record) => record.key}
                pagination={pagination}
                loading={loading}
                onChange={handlePaginationChange}
                expandable={{
                  expandedRowRender: (record) => (
                    <OrderDetail orderItems={record.orderItems} />
                  ),
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
