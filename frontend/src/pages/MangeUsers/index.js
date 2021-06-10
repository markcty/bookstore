import { Button, Col, message, Row, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { disableUser, getAllUsers, enableUser } from "../../services/api";

export default function ManageUsers() {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      defaultSortOrder: "ascend",
      sortDirections: ["ascend", "descend", "ascend"],
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      defaultSortOrder: "ascend",
      sortDirections: ["ascend", "descend", "ascend"],
    },
    {
      title: "Operation",
      sortDirections: ["ascend", "descend", "ascend"],
      render: (text, record) => (
        <Space>
          <Button
            type={"link"}
            primary
            onClick={() => {
              enableUser(record.id).then(() => {
                message.success("Enable succeed!");
                getAllUsers().then((users) => setUsers(users));
              });
            }}
            disabled={record.isEnabled !== 0}
          >
            Enable
          </Button>
          <Button
            type={"link"}
            danger
            onClick={() => {
              disableUser(record.id).then(() => {
                message.success("Disable succeed!");
                getAllUsers().then((users) => setUsers(users));
              });
            }}
            disabled={record.isEnabled === 0}
          >
            Disable
          </Button>
        </Space>
      ),
    },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
  }, []);

  return (
    <Content className={"page"}>
      <Row justify={"center"}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <Table dataSource={users} columns={columns} />
        </Col>
      </Row>
    </Content>
  );
}
