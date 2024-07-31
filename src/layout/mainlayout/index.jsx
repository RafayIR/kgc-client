import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Layout, Menu, theme } from 'antd';
import Header from '../header';
import FooterCopyRight from '../footer';
import { Link } from 'react-router-dom';

const { Sider, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const items = [
        {
            key: '1',
            icon: <PersonIcon />,
            label: <Link to="/vendors">Vendor Information</Link>,
        },
        {
            key: '2',
            icon: <LocalShippingIcon />,
            label: <Link to="/billing">Billing Information</Link>,
        },
        {
            key: '3',
            icon: <LocalShippingIcon />,
            label: <Link to="/pickup">Pickup Information</Link>,
        },
    ]

    return (
        <Layout >
            <Sider trigger={null} width={250} style={{ height: 'auto' }} collapsible collapsed={collapsed}>
                <Link to='/vendors' className='logo-wrapper'>
                    <div className='logo' style={{ width: '75%', padding: '15px 10px', marginBottom : '20px' }}>
                        <img src="assets/images/logo/logo.png" alt="logo" />
                    </div>
                </Link>
                <Menu
                    style={{ height: '100vh' }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
                />
            </Sider>
            <Layout >
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>

                <Footer >
                    <FooterCopyRight style={{ textAlign: 'center', }} />
                </Footer>

            </Layout>
        </Layout>
    );
};

export default MainLayout;