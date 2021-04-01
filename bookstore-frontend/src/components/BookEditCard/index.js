import React, {useEffect} from "react";
import {Button, Form, Input, InputNumber} from "antd";

export default function BookEditCard(props) {

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
        form.setFieldsValue(props);
    });

    return (
        <div style={{display: "flex"}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div
                    style={{
                        width: 170,
                        height: 240,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px dashed grey",
                        borderRadius: 10
                    }}
                >
                    <h1>Upload Image</h1>
                </div>
            </div>
            <div style={{flex: 1, paddingLeft: 32}}>
                <Form name="nest-messages" onFinish={(values) => props.updateBook(values)}
                      validateMessages={validateMessages} style={{width: "100%"}}
                      form={form}
                >
                    <Form.Item
                        labelCol={{span: 4}}
                        wrapperCol={{span: 4}}
                        name={"id"}
                        label="id"
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
                        wrapperCol={{span: 4}}
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
            </div>
        </div>
    )
}