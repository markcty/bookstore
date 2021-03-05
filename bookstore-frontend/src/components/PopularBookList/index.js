import React from "react";
import {Col, PageHeader, Row} from "antd";
import {HeartTwoTone} from "@ant-design/icons";
import BookCard from "../BookCard";

export default class PopularBookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popularBooks: []
        }
    }

    componentDidMount() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(books => this.setState({popularBooks: books.slice(0, 8)}));
    }

    render() {
        const {popularBooks} = this.state;
        return (
            <Row className={"popularBooksContainer"} gutter={[32, 16]}>
                <Col span={24}>
                    <PageHeader
                        title={<>
                            <HeartTwoTone twoToneColor="#eb2f96" style={{marginLeft: 8, marginRight: 12}}/>
                            {"   "}
                            热销书籍
                        </>}
                        style={{padding: 0, marginTop: 8}}
                    />
                </Col>
                {popularBooks.map(book => (
                        <Col key={book.id} xs={12} sm={12} md={8} lg={8}>
                            <BookCard {...book}/>
                        </Col>
                    )
                )}
            </Row>
        )
    }
}