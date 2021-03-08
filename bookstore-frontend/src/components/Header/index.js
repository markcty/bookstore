import React from "react";
import {Avatar, Col, Dropdown, Image, Input, Layout, Menu, Popover, Row} from "antd";
import logo from "../../assets/logo.svg";
import avatar from "./avatar.JPG"
import "./index.css"
import {SearchOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

const {Header} = Layout;
const {Search} = Input;

export default class BookstoreHeader extends React.Component {
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
                <Menu.Item><Link to={"/cart"}><span>My Cart</span></Link></Menu.Item>
                <Menu.Item>
                    <span>My Orders</span>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item><span>Profile</span></Menu.Item>
                <Menu.Item><span>Log Out</span></Menu.Item>
            </Menu>
        );
        return (
            <Header className={'desktopHeader'}>
                <Row className={'headerContainer'} justify={"center"} gutter={16} wrap={false}>
                    {/*logo*/}
                    <Col span={1}>
                        <Link to={"/"}>
                            <img alt="" src={logo} className={'logo'}/>
                        </Link>
                    </Col>
                    {/*bookstore*/}
                    <Col xs={0} sm={0} md={0} lg={2}>
                        <span
                            style={{fontSize: '1.2em', whiteSpace: 'nowrap'}}
                        >
                            Book Store
                        </span>
                    </Col>
                    {/*menu*/}
                    <Col sm={16} md={9} lg={7} xl={4}>
                        <Menu
                            className={'menu'}
                            style={{background: 'none', height: 54}}
                            defaultSelectedKeys={'/'}
                            mode="horizontal"
                        >
                            <Menu.Item key="/">
                                <Link to={"/"}>Home</Link>
                            </Menu.Item>
                            <Menu.Item key="/teams">
                                <Link to={"/books"}>All Books</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    {/*search large*/}
                    <Col xs={0} md={8} lg={8}>
                        <Search placeholder="search" allowClear
                                style={{marginTop: 8}}
                        />
                    </Col>
                    {/*search small*/}
                    <Col xs={1} md={0}>
                        <Popover
                            content={(
                                <Input.Search
                                    placeholder="search"
                                    onSearch={(e) => this.props.history.push('/search?q=' + e)}
                                />
                            )}
                            placement="bottom"
                        >
                            <SearchOutlined style={{fontSize: "1.4em", marginTop: 14}}/>
                        </Popover>
                    </Col>
                    {/*cart icon*/}
                    <Col span={1}>
                        <Link to={"/cart"}>
                            <ShoppingCartOutlined style={{fontSize: "1.7em", marginTop: 12, color: "#3c3636"}}/>
                        </Link>
                    </Col>
                    {/*avatar*/}
                    <Col span={2}>
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