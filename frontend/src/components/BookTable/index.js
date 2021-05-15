import { Col, Row, Table } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

function BookTable({ books }) {
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

  const [searchText, setSearchText] = useState("");

  return (
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
          dataSource={books.filter(
            (book) =>
              book.author.toLowerCase().includes(searchText) ||
              book.title.toLowerCase().includes(searchText) ||
              book.isbn.includes(searchText)
          )}
          columns={columns}
        />
      </Col>
    </Row>
  );
}

export default withRouter(BookTable);
