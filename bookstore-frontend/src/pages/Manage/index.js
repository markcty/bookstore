import React, {useState} from "react";
import {Button, Col, Row, Space, Table} from "antd";
import {Content} from "antd/es/layout/layout";
import BookEditCard from "../../components/BookEditCard";

export default function Manage(props) {
    const [books, setBooks] = useState(
        [
            {
                id: 1,
                title: "Frankenstein",
                author: "Mary Shelley",
                price: 50.9,
            },
            {
                id: 2,
                title: "A Little Princess",
                author: "Frances Hodgson Burnett",
                price: 38.9,
            },
            {
                id: 3,
                title: "Bird By Bird",
                author: "Anne Lamott",
                price: 98.0,
            },
            {
                id: 4,
                title: "Girl at War",
                author: "Sara Novic",
                price: 14.3,
            },
            {
                id: 5,
                title: "The Alchemist",
                author: "Paulo Coelho",
                price: 67.2,
            }
        ]
    );
    const [currentBook, setCurrentBook] = useState(null);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "Id",
            defaultSortOrder: "ascend",
            sortDirections: ['ascend', 'descend', 'ascend'],
            sorter: (a, b) => a.id - b.id
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
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Button type={"primary"} onClick={() => setCurrentBook(record.id)}>Edit</Button>
                    <Button type={"primary"} danger onClick={() => deleteBook(record.id)}>Delete</Button>
                </Space>
            )
        }
    ]

    const updateBook = (bookInfo) => {
        // update the book information by id
        // if id does not exist then add the book
        console.log(bookInfo);
        let next = books.filter(book => book.id !== bookInfo.id);
        next.push({
            id: bookInfo.id,
            author: bookInfo.author,
            price: bookInfo.price,
            title: bookInfo.title
        });
        setCurrentBook(null);
        setBooks(next);
    }

    const deleteBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
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

    return (
        <Content className={"page"}>
            <Row justify={"center"}>
                <Col xs={24} sm={20} md={18} lg={16} xl={14}>
                    <Row gutter={[32, 16]}>
                        <Col span={24}>
                            {currentBook ?
                                <BookEditCard
                                    {...(books.find(book => book.id === currentBook))}
                                    updateBook={updateBook}
                                />
                                : emptyEditCard}
                        </Col>
                        <Col span={24}>
                            <Button style={{width: "100%"}} onClick={() => setCurrentBook(-1)}>Add A Book</Button>
                        </Col>
                        <Col span={24}><Table dataSource={books} columns={columns}/></Col>
                    </Row>
                </Col>
            </Row>
        </Content>
    );
}