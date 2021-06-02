import { Col, DatePicker, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import Search from "antd/lib/input/Search";
import moment from "moment";
import React, { useEffect, useState } from "react";
import OrderTable from "../../components/OrderTable";
import { getOrders } from "../../services/api";

const { RangePicker } = DatePicker;

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((values) => {
      let data = values.data.map((order) => {
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
      setOrders(data);
    });
  }, []);

  const [dateRange, setDateRange] = useState([
    moment("1-1-1999", "MM-DD-YYYY"),
    moment("1-1-2099", "MM-DD-YYYY"),
  ]);

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
                placeholder="input book title or author or ISBN"
                allowClear
                onSearch={(v) => setSearchText(v.toLowerCase())}
                style={{ width: 300 }}
              />
              <RangePicker
                onChange={(range) => {
                  setDateRange(range);
                }}
              />
            </Col>
            <Col span={24}>
              <OrderTable
                orders={orders}
                dateRange={dateRange}
                searchText={searchText}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
