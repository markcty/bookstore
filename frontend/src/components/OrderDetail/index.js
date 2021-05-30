import { Table } from "antd";
import { Link } from "react-router-dom";

export default function OrderDetail({ orderItems }) {
  const data = orderItems.map((orderItem) => {
    return {
      key: orderItem.id,
      title: orderItem.book.title,
      bookId: orderItem.book.id,
      quantity: orderItem.quantity,
    };
  });
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (title, record) => (
        <Link to={`book/${record.bookId}`}>{title}</Link>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      size={"small"}
      pagination={{ position: ["none", "none"] }}
      summary={(bookData) => {
        let books = 0;
        bookData.forEach(({ quantity }) => (books += quantity));
        return (
          <Table.Summary.Row style={{ backgroundColor: "rgb(249,249,249)" }}>
            <Table.Summary.Cell>Books Bought</Table.Summary.Cell>
            <Table.Summary.Cell>{books}</Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    />
  );
}
