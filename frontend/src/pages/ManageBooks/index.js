import { Button, Col, message, Row, Space, Table } from "antd";
import Search from "antd/es/input/Search";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookEditCard from "../../components/BookEditCard";
import {
  delBook as deleteBookApi,
  getBooks,
  updateBook as updateBookApi,
} from "../../services/api";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((books) => setBooks(books));
  }, []);

  const [bookId, setBookId] = useState(null);

  const updateBook = (bookDetail) => {
    updateBookApi(bookDetail).then(() => {
      getBooks().then((books) => setBooks(books));
      message.success("Edit succeed");
      setBookId(null);
    });
  };

  const deleteBook = (bookId) => {
    deleteBookApi(bookId).then(() => {
      getBooks().then((books) => setBooks(books));
      message.success("Delete succeed");
    });
  };

  const emptyEditCard = (
    <div
      style={{
        width: "100%",
        height: 424,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed grey",
        borderRadius: 10,
      }}
    >
      <h1>Please Choose One Book To Edit</h1>
    </div>
  );

  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      defaultSortOrder: "ascend",
      sortDirections: ["ascend", "descend", "ascend"],
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <Link to={`/book/${record.id}`}>{text}</Link>,
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
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
      sortDirections: ["ascend", "descend", "ascend"],
      sorter: (a, b) => a.inventory - b.inventory,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button type={"link"} onClick={() => setBookId(record.id)}>
            Edit
          </Button>
          <Button type={"link"} danger onClick={() => deleteBook(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Content className={"page"}>
      <Row justify={"center"}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <Row gutter={[32, 16]}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                type={"primary"}
                onClick={() => setBookId(-1)}
                style={{ marginRight: 16 }}
              >
                Add A Book
              </Button>
              <Search
                placeholder="input book title or author"
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
                    book.title.toLowerCase().includes(searchText)
                )}
                columns={columns}
              />
            </Col>
            <Col span={24}>
              {bookId ? (
                <BookEditCard bookId={bookId} updateBook={updateBook} />
              ) : (
                emptyEditCard
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
