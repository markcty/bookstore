import React, {useEffect} from "react";
import {Button, Form, Input, InputNumber} from "antd";
import {getBook} from "../../services/api";

export default function BookEditCard({bookId, updateBook}) {
    const [form] = Form.useForm();

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    useEffect(() => {
        form.resetFields();
        if (bookId !== -1) getBook(bookId).then((bookDetail) => form.setFieldsValue(bookDetail));
    }, [bookId, form]);

    return (
        <Form name="nest-messages" onFinish={(values) => updateBook({id: bookId, ...values})}
              validateMessages={validateMessages} style={{width: "100%"}}
              form={form}
        >
            <Form.Item
                labelCol={{span: 4}}
                wrapperCol={{span: 8}}
                name={"isbn"}
                label="ISBN"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                labelCol={{span: 4}}
                wrapperCol={{span: 8}}
                name={"inventory"}
                label="Inventory"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber/>
            </Form.Item>
            <Form.Item
                labelCol={{span: 4}}
                wrapperCol={{span: 8}}
                name={"price"}
                label="Price"
                rules={[
                    {
                        required: true
                    },
                ]}
            >
                <InputNumber/>
            </Form.Item>
            <Form.Item
                name={"title"}
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                label="Title"
                rules={[
                    {
                        required: true
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={"author"}
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                label={"Author"}
                rules={[
                    {
                        required: true
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={"coverUrl"}
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                label={"Cover Url"}
                rules={[
                    {
                        required: true
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={"description"}
                label="Description"
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
            >
                <Input.TextArea style={{resize: "none", height: 120}}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 4}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}