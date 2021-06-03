import { Column } from "@ant-design/charts";
import { Col, DatePicker, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getHotSales } from "../../services/api";

const { RangePicker } = DatePicker;
export default function BookStatistics() {
  const [dateRange, setDateRange] = useState([
    moment("1-1-1999", "MM-DD-YYYY"),
    moment("1-1-2099", "MM-DD-YYYY"),
  ]);

  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    getHotSales(dateRange[0].format(), dateRange[1].format()).then((res) =>
      setStatistics(res)
    );
  }, [dateRange]);

  const config = {
    data: statistics,
    xField: "title",
    yField: "sales",
    xAxis: { label: { autoRotate: false } },
    slider: {
      start: 0,
      end: 0.8,
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    scrollbar: { type: "horizontal" },
  };

  return (
    <Content className={"page"}>
      <Row justify={"center"}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <Row gutter={[32, 16]}>
            <Col span={24} style={{ display: "flex" }}>
              <RangePicker
                onChange={(range) => {
                  setDateRange(range);
                }}
              />
            </Col>
            <Col span={24}>
              <Column {...config} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
