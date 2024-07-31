import React from 'react'
import { Container, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { logOut } from '../../redux/Auth/loginSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import LocalStorageService from '../../services/localStorageServices';
import './header.css'

function Header(props) {
    const { collapsed, setCollapsed } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const role = LocalStorageService.getObject("role")

    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/', { replace: true })
    }


    const items = [
        ...(role === 'admin' ? [{
            key: '1',
            label: (
                <Link className='dropdown-menu' to={'/signup'}>
                    Register New User
                </Link>
            ),
        }] : []),
        {
            key: '2',
            label: (
                <div className='dropdown-menu' onClick={handleLogOut}>
                    Log Out
                </div>
            ),
        },
    ];

    return (
        <>
            <header className='header-wrapper'>
                <Container maxWidth="xl'" style={{ background: '#9f1b38' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 10px' }}>
                        <div className='header-wrapper'>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined style={{ color: 'white' }} /> : <MenuFoldOutlined style={{ color: 'white' }} />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </div>
                        <div className='navbar-wrapper'>

                        </div>
                        <div className='btn-wrapper'>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                trigger={['click']}
                            >
                                <Button type='primary' icon={<MenuOutlined />}
                                    style={{ background: 'transparent', border: 'none' }}>

                                </Button>
                            </Dropdown>
                        </div>
                    </Box>
                </Container>
            </header>
        </>
    )
}


export default Header