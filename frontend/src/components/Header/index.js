import React from "react";
import { Avatar, Col, Dropdown, Image, Input, Layout, Menu, Popover, Row } from "antd";
import logo from "../../assets/logo.svg";
import PropTypes from "prop-types";
import avatar from "./avatar.JPG"
import "./index.css"
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, withRouter } from "react-router-dom";
import { useAuth } from "../../services/auth";

const { Header: AntHeader } = Layout;
const { Search } = Input;

function Header(props) {
    const auth = useAuth();

    const loginMenu = (
        <Menu>
            <Menu.Item><Link to={"/cart"}><span>My Cart</span></Link></Menu.Item>
            <Menu.Item>
                <Link to={"/orders"}><span>My Orders</span></Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item><span>Profile</span></Menu.Item>
            <Menu.Item><Link to={"/admin/manage"}><span>Manage</span></Link></Menu.Item>
            <Menu.Item><span onClick={auth.logout}>Log Out</span></Menu.Item>
        </Menu>
    );
    return (
        <AntHeader className={'desktopHeader'}>
            <Row className={'headerContainer'} justify={"center"} gutter={16} wrap={false}>
                {/*logo*/}
                <Col span={1}>
                    <Link to={"/"}>
                        <img alt="" src={logo} className={'logo'} />
                    </Link>
                </Col>
                {/*bookstore*/}
                <Col xs={0} sm={0} md={0} lg={2}>
                    <span
                        style={{ fontSize: '1.2em', whiteSpace: 'nowrap' }}
                    >
                        Book Store
                        </span>
                </Col>
                {/*menu*/}
                <Col sm={16} md={9} lg={7} xl={4}>
                    <Menu
                        className={'menu'}
                        style={{ background: 'none', height: 54 }}
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
                <Col xs={0} md={8} lg={10}>
                    <Search placeholder="input book title or author" allowClear
                        style={{ marginTop: 8 }}
                        onSearch={(query) => props.history.push('/search?q=' + query)}
                    />
                </Col>
                {/*search small*/}
                <Col xs={1} md={0}>
                    <Popover
                        content={(
                            <Input.Search
                                placeholder="search"
                                onSearch={(query) => props.history.push('/search?q=' + query)}
                            />
                        )}
                        placement="bottom"
                    >
                        <SearchOutlined style={{ fontSize: "1.4em", marginTop: 14 }} />
                    </Popover>
                </Col>
                {/*cart icon*/}
                <Col>
                    <Link to={"/cart"}>
                        <ShoppingCartOutlined style={{ fontSize: "1.7em", marginTop: 12, color: "black" }} />
                    </Link>
                </Col>
                {/*avatar*/}
                <Col>
                    {(auth.isLogin ?
                        <Dropdown overlay={loginMenu} placement="bottomRight">
                            <div style={{ cursor: "pointer", whiteSpace: "nowrap" }}>
                                <Avatar
                                    src={
                                        <Image src={avatar} preview={false} />
                                    }
                                />
                                {/*<span style={{marginLeft: 8}}>*/}
                                {/*    {this.state.username}*/}
                                {/*</span>*/}
                            </div>
                        </Dropdown>
                        :
                        <Link to={"/login"}>Log In</Link>
                    )}
                </Col>
            </Row>
        </AntHeader>
    )
}

Header.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Header);