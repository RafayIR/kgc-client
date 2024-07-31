import React, { useState, useEffect } from 'react'
import { Table, Input, Popconfirm, ConfigProvider, Form, Typography } from 'antd'
import { Box, Container } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { fetchBillingInfo, updateBilling, deleteBilling, searchBilling } from '../../redux/Vendors/billingSlice';
import { columns } from './data';
import { Button } from 'antd'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { showModal } from '../../redux/Modal/modalSlice';
import ModalComponent from '../../components/modal/modal';
import VendorForm from '../Vendors/vendorForm';
import useFetchData from '../../hooks/useFetchData';
import LocalStorageService from '../../services/localStorageServices';
import EditableCell from '../../components/editable/editable';
import Loader from '../../components/websiteloader/WebsiteLoader';

function Billing() {
    const dispatch = useDispatch()
    const { data: billingInfo, isLoading } = useSelector(state => state.billing)
    const [tableData, setTableData] = useState([]);
    const role = LocalStorageService.getObject('role');
    const [form] = Form.useForm();
    const { Search } = Input;
    useFetchData(billingInfo, fetchBillingInfo, setTableData, dispatch)

    // EDITING 
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;

    const handleOpen = () => {
        dispatch(showModal())
    }


    const handleDelete = (vendorId) => {
        dispatch(deleteBilling(vendorId));
    };


    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const handleSave = async (id) => {
        try {
            const row = await form.validateFields();
            const newData = [...tableData];
            const index = newData.findIndex((item) => id === item.id);
            if (index > -1) {
                const item = newData[index];
                const updatedRow = {
                    ...item,
                    ...row,
                };

                newData.splice(index, 1, updatedRow);  // Replace the old row with the updated row
                setTableData(newData);

                // Dispatch the updated row to the Redux slice, including its ID
                dispatch(updateBilling(updatedRow));
                setEditingKey('');
            } else {
                newData.push(row);
                setTableData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const formattedcolumns = [
        ...columns,
        {
            title: 'Edit',
            dataIndex: 'Edit',
            width: 150,
            align: 'center',
            render: (_, record) => {
                const editable = isEditing(record);

                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => handleSave(record.id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <EditIcon />
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Delete',
            dataIndex: 'Delete',
            width: 150,
            align: 'center',
            render: (_, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                    <a><DeleteIcon /></a>
                </Popconfirm>
            ),
        },
    ];

    const getInputType = (dataIndex) => {
        if (dataIndex === 'billing_phone') return 'number';
        if (dataIndex === 'billing_email') return 'email';
        if (['billing_contact_name', 'billing_city', 'billing_state', 'billing_country'].includes(dataIndex)) return 'name';
        return 'text';
    };

    const mergedColumns = formattedcolumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: getInputType(col.dataIndex),
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });


    const onSearch = (value) => {
        const searchCriteria = {
            billing_contact_name: value,
        };
        dispatch(searchBilling(searchCriteria));
    };


    return (
        <>

            <ModalComponent>
                <VendorForm />
            </ModalComponent>

            {
                isLoading ? <Loader /> : null
            }

            <Container maxWidth="xl" sx={{ marginTop: '40px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <ConfigProvider theme={{
                            token: {
                                colorPrimary: '#001529',
                            }
                        }}>
                            <Search placeholder="search" onSearch={onSearch} enterButton />
                        </ConfigProvider>
                    </Box>
                    <Box>
                        <Button onClick={handleOpen} style={{ padding: '3px 4px' }} >
                            <AddIcon />
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: '40px' }}>
                <Form form={form} component={false}>
                    <Table
                        dataSource={tableData}
                        columns={role === 'admin' ? mergedColumns : columns || []}
                        components={{
                            body: {
                                // row: EditableRow,
                                cell: EditableCell,
                            },
                        }}
                        loading={isLoading}
                        size="middle"
                        scroll={{
                            x: '100vw',
                        }}
                        pagination={{
                            onChange: cancel,
                            position: 'bottomRight',
                        }}
                    />
                </Form>
            </Container>
        </>
    )
}

export default Billing