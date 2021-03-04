import React from "react";
import {Avatar, Col, Dropdown, Image, Input, Layout, Menu, Row} from "antd";
import logo from "../../assets/icon.svg";
import avatar from "./avatar.JPG"
import "./index.css"
import {ShoppingCartOutlined} from '@ant-design/icons';

const {Header} = Layout;
const {Search} = Input;

class BookstoreHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            username: "markcty"
        }
    }

    render() {
        const loginMenu = (
            <Menu>
                <Menu.Item><span>我的购物车</span></Menu.Item>
                <Menu.Item><span>我的订单</span></Menu.Item>
                <Menu.Item><span>我的收藏</span></Menu.Item>
                <Menu.Divider/>
                <Menu.Item><span>个人中心</span></Menu.Item>
                <Menu.Item><span>退出登陆</span></Menu.Item>
            </Menu>
        );
        return (
            <Header className={'desktopHeader'}>
                <Row className={'headerContainer'} justify={'center'} gutter={16} wrap={false}>
                    <Col><img alt="" src={logo} className={'logo'}/></Col>
                    <Col xs={0} sm={0} md={2}><span style={{fontSize: '1.2em', whiteSpace: 'nowrap'}}>Book Store</span></Col>
                    <Col>
                        <Menu
                            className={'menu'}
                            style={{background: 'none', height: 54}}
                            defaultSelectedKeys={'/'}
                            mode="horizontal"
                        >
                            <Menu.Item key="/">
                                首页
                            </Menu.Item>
                            <Menu.Item key="/teams">
                                所有书籍
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col>
                        <Search placeholder="input search text" allowClear
                                style={{marginLeft: 100, marginTop: 8, width: 300}}
                        />
                    </Col>
                    <Col>
                        <ShoppingCartOutlined style={{fontSize: "1.7em", marginTop: 12, color: "#3c3636"}}/>
                    </Col>
                    <Col>
                        <Dropdown overlay={loginMenu} placement="bottomRight">
                            <div style={{cursor: "pointer", whiteSpace: "nowrap"}}>
                                <Avatar
                                    src={
                                        <Image src={avatar} preview={false}/>
                                    }
                                />
                                <span style={{marginLeft: 8}}>
                                    {this.state.username}
                                </span>
                            </div>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default BookstoreHeader;
