import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Popconfirm, Form, Input, ConfigProvider } from 'antd'
import { Box, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllVendors, deleteVendor, updateVendor, searchVendors } from "../../redux/Vendors/vendorSlice";
import { showModal } from "../../redux/Modal/modalSlice";
import { columns } from './dataColumns'
import ModalComponent from "../../components/modal/modal";
import FormController from "../../components/form/formController";
import useFetchData from "../../hooks/useFetchData";
import LocalStorageService from "../../services/localStorageServices";
import Loader from "../../components/websiteloader/WebsiteLoader";
import EditableCell from "../../components/editable/editable";


const Vendors = () => {
    const dispatch = useDispatch()
    const { data: vendorData, isLoading, error } = useSelector(state => state.vendor);
    const role = LocalStorageService.getObject('role')
    const [tableData, setTableData] = useState([])
    const { Search } = Input;
    const [form] = Form.useForm();

    useFetchData(vendorData, fetchAllVendors, setTableData, dispatch)
    // editing
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;

    const handleOpen = () => {
        dispatch(showModal())
    }


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
                dispatch(updateVendor(updatedRow));
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


    const getInputType = (dataIndex) => {
        if (dataIndex === 'phone') return 'number';
        if (dataIndex === 'email') return 'email';
        if (['name', 'city', 'country', 'state'].includes(dataIndex)) return 'name';
        return 'text';
    };
    const formattedcolumns = [
        ...columns,
        {
            title: 'Edit',
            dataIndex: 'Edit',
            width: 100,
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
            width: 100,
            align: 'center',
            render: (_, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => { dispatch(deleteVendor(record.id)); }}>
                    <a><DeleteIcon /></a>
                </Popconfirm>
            ),
        },
    ];


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
            name: value
        };
        dispatch(searchVendors(searchCriteria));
    };

    const handleSearchChange = (e) => {
        const value = e.target.value
        if (value.length > 4) {
            const searchCriteria = {
                name: value
            };
            dispatch(searchVendors(searchCriteria));
        }

        if (value.length == 0) {
            dispatch(fetchAllVendors())
        }

    }



    return (
        <>
            <ModalComponent>
                <FormController />
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
                            <Search onChange={handleSearchChange} placeholder="search" onSearch={onSearch} enterButton />
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
                    <ConfigProvider
                        theme={{
                            token: {
                                cellFontSizeSM : '8px'
                            },
                        }}
                    >
                        <Table
                            dataSource={tableData}
                            showSorterTooltip={{
                                target: 'sorter-icon',
                            }}
                            cellFontSizeSM
                            components={{
                                body: {
                                    // row: EditableRow,
                                    cell: EditableCell,
                                },
                            }}
                            columns={role === 'admin' ? mergedColumns : columns || []}
                            size="small"
                            rowClassName="editable-row"
                            loading={isLoading}
                            scroll={{
                                x: '100vw',
                                y: 450,
                            }}
                            pagination={{
                                onChange: cancel,
                                position: 'bottomRight',
                            }}

                        />
                    </ConfigProvider>

                </Form>
            </Container>

        </>
    )
}



export default Vendors