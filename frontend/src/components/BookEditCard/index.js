import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { getBook, uploadBookCover } from "../../services/api";

export default function BookEditCard({ bookId, updateBook }) {
  const [form] = Form.useForm();

  const [coverUrl, setCoverUrl] = useState(null);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  useEffect(() => {
    form.resetFields();
    setCoverUrl(null);
    if (bookId !== -1)
      getBook(bookId).then((bookDetail) => {
        form.setFieldsValue(bookDetail);
        setCoverUrl(bookDetail.coverUrl);
      });
  }, [bookId, form]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div>Upload Cover</div>
    </div>
  );

  const upload = ({ file }) => {
    uploadBookCover(file)
      .then((url) => {
        setCoverUrl(url);
        message.info("Upload Succeed");
        console.log(url);
      })
      .catch((err) => message.error(err));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          overflow: "hidden",
          alignItems: "center",
          marginTop: 32,
          marginBottom: 32,
          paddingLeft: "16.66%",
        }}
      >
        <Upload
          name="cover"
          listType="picture-card"
          customRequest={upload}
          className="cover-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          style={{ overflow: "hidden" }}
        >
          {coverUrl ? (
            <img src={coverUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
      <Form
        name="nest-messages"
        onFinish={(values) =>
          updateBook({ id: bookId, ...values, coverUrl: coverUrl })
        }
        validateMessages={validateMessages}
        style={{ width: "100%" }}
        form={form}
      >
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          name={"isbn"}
          label="ISBN"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          name={"inventory"}
          label="Inventory"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          name={"price"}
          label="Price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={"title"}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"author"}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          label={"Author"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"description"}
          label="Description"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Input.TextArea style={{ resize: "none", height: 120 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
