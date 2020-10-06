import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from 'firebase';
import { Button, Menu, Layout } from "antd";
import { ShoppingOutlined, InboxOutlined, DollarCircleOutlined, DatabaseOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Navbar = ({ location }) => {

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => setCollapsed(collapsed);

    const logout = () => firebase.auth().signOut();
    const pathname = location.pathname.split("/")[1] || '/';


    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
        >
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[pathname]}
            >
                <Menu.Item key='productos'>
                    <Link to="/productos"></Link>
                    <ShoppingOutlined />
                    <span className="nav-text">Productos</span>
                </Menu.Item>
                <Menu.Item key='inventario'>
                    <Link to="/inventario"></Link>
                    <InboxOutlined />
                    <span className="nav-text">Inventario</span>
                </Menu.Item>
                <SubMenu key="promocion" title="Promoción" icon={<DollarCircleOutlined />}>
                    <Menu.Item key="sliders">
                        <Link to="/sliders"></Link>
                        <DollarCircleOutlined />
                        <span className="nav-text">Sliders</span>
                    </Menu.Item>
                    <Menu.Item key="cupones">
                        <Link to="/cupones"></Link>
                        <DollarCircleOutlined />
                        <span className="nav-text">Cupones</span>
                    </Menu.Item>
                    <Menu.Item key="descuentos">
                        <Link to="/descuentos"></Link>
                        <DollarCircleOutlined />
                        <span className="nav-text">Descuentos</span>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="ordenes">
                    <Link to="/ordenes"></Link>
                    <DatabaseOutlined />
                    <span className="nav-text">Órdenes</span>
                </Menu.Item>
                <Menu.Item key="clientes">
                    <Link to="/clientes"></Link>
                    <UserOutlined />
                    <span className="nav-text">Clientes</span>
                </Menu.Item>
                <Menu.Item title='Log Out'>
                    <Button type='primary' style={{ marginLeft: collapsed ? -15 : 0 }} onClick={logout}>
                        {collapsed ? <LogoutOutlined style={{ marginTop: -5 }} /> : 'Log Out'}
                    </Button>
                </Menu.Item>
            </Menu>
        </Sider >
    );
}

export default withRouter(Navbar);