import { Col, Row, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { getBookPage } from "../../services/api";
import "./index.css";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text, record) => <Link to={`/book/${record.id}`}>{text}</Link>,
  },
  {
    title: "ISBN",
    dataIndex: "isbn",
    key: "isbn",
    defaultSortOrder: "ascend",
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    sortDirections: ["ascend", "descend", "ascend"],
    sorter: (a, b) => a.price - b.price,
  },
];

export default function Books() {
  const [books, setBooks] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  const [loading, setLoading] = useState(false);

  const customFetch = (pagination) => {
    setLoading(true);
    getBookPage(pagination.current - 1, pagination.pageSize).then((data) => {
      setBooks(data.books);
      setLoading(false);
      setPagination({ ...pagination, total: data.total });
    });
  };

  useEffect(() => {
    customFetch({ current: 1, pageSize: 5 });
  }, []);

  const handleChange = (pagination) => {
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
                placeholder="input book title or author or ISBN"
                allowClear
                onSearch={(v) => setSearchText(v.toLowerCase())}
                style={{ width: 300 }}
              />
            </Col>
            <Col span={24}>
              <Table
                dataSource={books}
                columns={columns}
                rowKey={(record) => record.id}
                pagination={pagination}
                loading={loading}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
