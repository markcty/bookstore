import React from "react";
import {Col, Layout, PageHeader, Row} from "antd"
import Banner from "../../components/Banner/Banner";
import {HeartTwoTone} from '@ant-design/icons';
import "./index.css";

const {Content} = Layout;

class Home extends React.Component {
    render() {
        const bookCardStyle = {
            background: '#f38b0a',
            paddingTop: '150%'
        };
        return (
            <Content style={{backgroundColor: "white"}}>
                <Row justify={"center"} align={"middle"} style={{paddingTop: 80}}
                     gutter={[16, 32]}>
                    <Col xs={22} sm={16} md={13} lg={13} xl={13}>
                        <Banner/>
                    </Col>
                    <Col xs={22} sm={16} md={13} lg={13} xl={13}>
                        <Row className={"popularBooksContainer"} justify={"center"} gutter={[16, 8]}>
                            <Col span={24}>
                                <PageHeader
                                    title={<>
                                        <HeartTwoTone twoToneColor="#eb2f96" style={{marginRight: 12}}/>
                                        {"   "}
                                        热销书籍
                                    </>}
                                    style={{padding: 0, marginTop: 8}}
                                />
                            </Col>
                            <Col span={8}>
                                <div style={bookCardStyle}/>
                            </Col>
                            <Col span={8}>
                                <div style={bookCardStyle}/>
                            </Col>
                            <Col span={8}>
                                <div style={bookCardStyle}/>
                            </Col>
                            <Col span={8}>
                                <div style={bookCardStyle}/>
                            </Col>
                            <Col span={8}>
                                <div style={bookCardStyle}/>
                            </Col>
                            <Col span={8}>
                                <div style={bookCardStyle}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default Home;