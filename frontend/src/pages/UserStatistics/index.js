import { Col, DatePicker, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { Column } from "@ant-design/charts";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getGoldenBuyers } from "../../services/api";

const { RangePicker } = DatePicker;
export default function UserStatistics() {
  const [dateRange, setDateRange] = useState(null);

  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const defaultDateRange = [
      moment("1-1-1999", "MM-DD-YYYY"),
      moment("1-1-2099", "MM-DD-YYYY"),
    ];
    if (!dateRange)
      getGoldenBuyers(
        defaultDateRange[0].format(),
        defaultDateRange[1].format()
      ).then((res) => setStatistics(res));
    else
      getGoldenBuyers(dateRange[0].format(), dateRange[1].format()).then(
        (res) => setStatistics(res)
      );
  }, [dateRange]);

  const config = {
    data: statistics,
    xField: "username",
    yField: "moneySpent",
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
