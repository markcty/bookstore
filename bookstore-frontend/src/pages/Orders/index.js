import React, { useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Col, DatePicker, Row, Table } from "antd";
import Search from "antd/es/input/Search";

const { RangePicker } = DatePicker;

export default function Orders() {
    const [books, setBooks] = useState(
        [
            {
                ISBN: 1,
                title: "Frankenstein",
                author: "Mary Shelley",
                price: 50.9,
                purchaseDate: new Date('December 17, 1995 03:24:00'),
            },
            {
                ISBN: 2,
                title: "A Little Princess",
                author: "Frances Hodgson Burnett",
                price: 38.9,
                purchaseDate: new Date('November 17, 2014 09:24:00'),
            },
            {
                ISBN: 3,
                title: "Bird By Bird",
                author: "Anne Lamott",
                price: 98.0,
                purchaseDate: new Date('January 17, 2019 09:24:00'),
            },
            {
                ISBN: 4,
                title: "Girl at War",
                author: "Sara Novic",
                price: 14.3,
                purchaseDate: new Date('June 17, 2019 09:24:00'),
            },
            {
                ISBN: 5,
                title: "The Alchemist",
                author: "Paulo Coelho",
                price: 67.2,
                purchaseDate: new Date('June 17, 2020 09:24:00'),
            }
        ]
    );

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
            title: "Purchase date",
            dataIndex: "purchaseDate",
            key: "purchaseDate",
            sortDirections: ['ascend', 'descend', 'ascend'],
            render: date => date.toLocaleString(),
            sorter: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate)
        }
    ];

    const [searchText, setSearchText] = useState("");

    const [dateRange, setDateRange] = useState(
        [new Date("January 1, 1900 00:00:00"),
        new Date("January 1, 2099 00:00:00")
        ])

    return (
        <Content className={"page"}>
            <Row justify={"center"}>
                <Col xs={22} sm={20} md={18} lg={16} xl={14}>
                    <Row gutter={[32, 16]}>
                        <Col span={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <RangePicker onChange={(range) => {
                                setDateRange(range)
                            }} />
                            <Search placeholder="input book title or author" allowClear
                                onSearch={(v) => setSearchText(v.toLowerCase())}
                                style={{ width: 300 }} />
                        </Col>
                        <Col span={24}>
                            <Table
                                dataSource={
                                    books.filter(book =>
                                        (book.author.toLowerCase().includes(searchText)
                                            || book.title.toLowerCase().includes(searchText))
                                        &&
                                        ((new Date(dateRange[0]) < new Date(book.purchaseDate))
                                            && (new Date(dateRange[1]) > new Date(book.purchaseDate))
                                        ))}
                                columns={columns}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Content>
    )
}