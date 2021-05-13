import React, { useState } from "react";
import { Button, Col, Row, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import BookEditCard from "../../components/BookEditCard";
import Search from "antd/es/input/Search";

export default function Manage(props) {
    const [books, setBooks] = useState(
        [
            {
                ISBN: 1,
                title: "Frankenstein",
                author: "Mary Shelley",
                price: 50.9,
                inventory: 5
            },
            {
                ISBN: 2,
                title: "A Little Princess",
                author: "Frances Hodgson Burnett",
                price: 38.9,
                inventory: 9
            },
            {
                ISBN: 3,
                title: "Bird By Bird",
                author: "Anne Lamott",
                price: 98.0,
                inventory: 1
            },
            {
                ISBN: 4,
                title: "Girl at War",
                author: "Sara Novic",
                price: 14.3,
                inventory: 99
            },
            {
                ISBN: 5,
                title: "The Alchemist",
                author: "Paulo Coelho",
                price: 67.2,
                inventory: 55
            }
        ]
    );
    const [currentBook, setCurrentBook] = useState(null);

    const updateBook = (bookInfo) => {
        // update the book information by ISBN
        // if ISBN does not exist then add the book
        let next = books.filter(book => book.ISBN !== bookInfo.ISBN);
        next.push({
            ISBN: bookInfo.ISBN,
            author: bookInfo.author,
            price: bookInfo.price,
            title: bookInfo.title,
            inventory: bookInfo.inventory
        });
        setCurrentBook(null);
        setBooks(next);
    }

    const deleteBook = (ISBN) => {
        setBooks(books.filter(book => book.ISBN !== ISBN));
    }

    const emptyEditCard = (
        <div
            style={{
                width: "100%",
                height: 424,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed grey",
                borderRadius: 10
            }}
        >
            <h1>Please Choose One Book To Edit</h1>
        </div>
    )

    const [searchText, setSearchText] = useState("");

    const columns = [
        {
            title: "ISBN",
            dataIndex: "ISBN",
            key: "ISBN",
            defaultSortOrder: "ascend",
            sortDirections: ['ascend', 'descend', 'ascend'],
            sorter: (a, b) => a.ISBN - b.ISBN
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "author"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            sortDirections: ['ascend', 'descend', 'ascend'],
            sorter: (a, b) => a.price - b.price
        },
        {
            title: "Inventory",
            dataIndex: "inventory",
            key: "inventory",
            sortDirections: ['ascend', 'descend', 'ascend'],
            sorter: (a, b) => a.inventory - b.inventory
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Button type={"primary"} onClick={() => setCurrentBook(record.ISBN)}>Edit</Button>
                    <Button type={"primary"} danger onClick={() => deleteBook(record.ISBN)}>Delete</Button>
                </Space>
            )
        }
    ]

    return (
        <Content className={"page"}>
            <Row justify={"center"}>
                <Col xs={24} sm={20} md={18} lg={16} xl={14}>
                    <Row gutter={[32, 16]}>
                        <Col span={24}>
                            {currentBook ?
                                <BookEditCard
                                    {...(books.find(book => book.ISBN === currentBook))}
                                    updateBook={updateBook}
                                />
                                : emptyEditCard}
                        </Col>
                        <Col span={24} style={{ display: "flex" }}>
                            <Button type={"primary"} onClick={() => setCurrentBook(-1)} style={{ marginRight: 16 }}>
                                Add A Book
                            </Button>
                            <Search placeholder="input book title or author" allowClear
                                onSearch={(v) => setSearchText(v.toLowerCase())}
                                style={{ width: 300 }} />
                        </Col>
                        <Col span={24}>
                            <Table
                                dataSource={
                                    books.filter(book =>
                                        (book.author.toLowerCase().includes(searchText))
                                        || book.title.toLowerCase().includes(searchText)
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