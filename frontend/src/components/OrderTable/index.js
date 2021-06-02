import { Table } from "antd";
import OrderDetail from "../OrderDetail";

export default function OrderTable({ orders, dateRange }) {
  const columns = [
    {
      title: "Id",
      dataIndex: "orderId",
      key: "orderId",
      defaultSortOrder: "descend",
      sortDirections: ["ascend", "descend", "ascend"],
      sorter: (a, b) => a.orderId - b.orderId,
    },
    {
      title: "Receiver Name",
      dataIndex: "receiverName",
      key: "receiverName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total Price",
      dataIndex: "price",
      key: "price",
      sortDirections: ["ascend", "descend", "ascend"],
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Purchase date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      sortDirections: ["ascend", "descend", "ascend"],
      render: (date) => date.format("MMM Do YYYY, h:mm:ss a"),
      sorter: (a, b) => a.purchaseDate.isAfter(b.purchaseDate),
    },
    {
      title: "Operation",
    },
  ];
  return (
    <Table
      dataSource={orders.filter(
        (order) =>
          dateRange[0].isSameOrBefore(order.purchaseDate) &&
          order.purchaseDate.isSameOrBefore(dateRange[1])
      )}
      expandable={{
        expandedRowRender: (record) => (
          <OrderDetail orderItems={record.orderItems} />
        ),
      }}
      columns={columns}
    />
  );
}
