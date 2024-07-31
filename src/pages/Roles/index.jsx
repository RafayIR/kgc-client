import React, { useState } from "react"
import { Table, Button, Typography, Popconfirm, Form, Input, ConfigProvider } from 'antd'
import { Box, Container } from "@mui/material";
import useFetchData from "../../hooks/useFetchData"
import { fetchAllUsers } from "../../redux/registration/signUpSlice"
import { useDispatch, useSelector } from "react-redux"
import { columns } from "./column"

const ViewUser = () => {
    const dispatch = useDispatch()
    const { data: viewUser, isLoading, error } = useSelector(state => state.signup);
    const [tableData, setTableData] = useState()
    const form = Form.useForm()


    useFetchData(viewUser, fetchAllUsers, setTableData, dispatch)



    return (
        <>
            <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
                    <Table
                        dataSource={tableData}
                        columns={columns || []}
                        size="small"
                        loading={isLoading}
                        scroll={{
                            x: '100%',
                            y: 450,
                        }}
                        pagination={{
                            position: 'bottomRight',
                        }}
                    />
            </Container>
        </>
    )
}


export default ViewUser