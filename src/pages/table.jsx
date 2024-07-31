// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { Button, Form, Input, Popconfirm, Table } from 'antd';


// const TableDemo = () => {
//     const [dataSource, setDataSource] = useState([
//         {
//             key: '0',
//             name: 'Edward King 0',
//             age: '32',
//             address: 'London, Park Lane no. 0',
//         },
//         {
//             key: '1',
//             name: 'Edward King 1',
//             age: '32',
//             address: 'London, Park Lane no. 1',
//         },
//     ]);

//     const handleDelete = (key) => {
//         const newData = dataSource.filter((item) => item.key !== key);
//         setDataSource(newData);
//     };
//     const defaultColumns = [
//         {
//             title: 'name',
//             dataIndex: 'name',
//             width: '30%',
//             editable: true,
//         },
//         {
//             title: 'age',
//             dataIndex: 'age',
//         },
//         {
//             title: 'address',
//             dataIndex: 'address',
//         },
//         {
//             title: 'operation',
//             dataIndex: 'operation',
//             render: (_, record) =>
//                 dataSource.length >= 1 ? (
//                     <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
//                         <a>Delete</a>
//                     </Popconfirm>
//                 ) : null,
//         },
//     ];


//     const components = {

//     };

//     return (
//         <div>
//             <Table
//                 components={components}
//                 bordered
//                 dataSource={dataSource}
//                 columns={defaultColumns}
//             />
//         </div>
//     );
// };
// export default TableDemo;



// import React, { useState } from 'react';
// import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
// const originData = [];
// for (let i = 0; i < 100; i++) {
//     originData.push({
//         id: i.toString(),
//         name: `Edward ${i}`,
//         age: 32,
//         address: `London Park no. ${i}`,
//     });
// }
// const EditableCell = ({
//     editing,
//     dataIndex,
//     title,
//     inputType,
//     record,
//     index,
//     children,
//     ...restProps
// }) => {
//     const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
//     return (
//         <td {...restProps}>
//             {editing ? (
//                 <Form.Item
//                     name={dataIndex}
//                     style={{
//                         margin: 0,
//                     }}
//                     rules={[
//                         {
//                             required: true,
//                             message: `Please Input ${title}!`,
//                         },
//                     ]}
//                 >
//                     {inputNode}
//                 </Form.Item>
//             ) : (
//                 children
//             )}
//         </td>
//     );
// };
// const TableDemo = () => {
//     const [form] = Form.useForm();
//     const [data, setData] = useState(originData);
//     const [editingKey, setEditingKey] = useState('');
//     const isEditing = (record) => record.id === editingKey;
//     const edit = (record) => {
//         form.setFieldsValue({
//             ...record,
//         });
//         setEditingKey(record.id);
//     };
//     const cancel = () => {
//         setEditingKey('');
//     };
//     const save = async (key) => {
//         try {
//             const row = await form.validateFields();
//             const newData = [...data];
//             const index = newData.findIndex((item) => key === item.key);
//             if (index > -1) {
//                 const item = newData[index];
//                 newData.splice(index, 1, {
//                     ...item,
//                     ...row,
//                 });
//                 setData(newData);
//                 setEditingKey('');
//             } else {
//                 newData.push(row);
//                 setData(newData);
//                 setEditingKey('');
//             }
//         } catch (errInfo) {
//             console.log('Validate Failed:', errInfo);
//         }
//     };
//     const columns = [
//         {
//             title: 'name',
//             dataIndex: 'name',
//             width: '25%',
//             editable: true,
//         },
//         {
//             title: 'age',
//             dataIndex: 'age',
//             width: '15%',
//             editable: true,
//         },
//         {
//             title: 'address',
//             dataIndex: 'address',
//             width: '40%',
//             editable: true,
//         },
//         {
//             title: 'operation',
//             dataIndex: 'operation',
//             render: (_, record) => {
//                 const editable = isEditing(record);
//                 console.log('edit' , record)
//                 return editable ? (
//                     <span>
//                         <Typography.Link
//                             onClick={() => save(record.key)}
//                             style={{
//                                 marginRight: 8,
//                             }}
//                         >
//                             Save
//                         </Typography.Link>
//                         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//                             <a>Cancel</a>
//                         </Popconfirm>
//                     </span>
//                 ) : (
//                     <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//                         Edit
//                     </Typography.Link>
//                 );
//             },
//         },
//     ];
//     const mergedColumns = columns.map((col) => {
//         if (!col.editable) {
//             return col;
//         }
//         return {
//             ...col,
//             onCell: (record) => ({
//                 record,
//                 inputType: col.dataIndex === 'age' ? 'number' : 'text',
//                 dataIndex: col.dataIndex,
//                 title: col.title,
//                 editing: isEditing(record),
//             }),
//         };
//     });
//     return (
//         <Form form={form} component={false}>
//             <Table
//                 components={{
//                     body: {
//                         cell: EditableCell,
//                     },
//                 }}
//                 bordered
//                 dataSource={data}
//                 columns={mergedColumns}
//                 rowClassName="editable-row"
//                 pagination={{
//                     onChange: cancel,
//                 }}
//             />
//         </Form>
//     );
// };
// export default TableDemo;

import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];
const App = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <>
                </>
                // <Highlighter
                //     highlightStyle={{
                //         backgroundColor: '#ffc069',
                //         padding: 0,
                //     }}
                //     searchWords={[searchText]}
                //     autoEscape
                //     textToHighlight={text ? text.toString() : ''}
                // />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '20%',
            ...getColumnSearchProps('age'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];
    return <Table columns={columns} dataSource={data} />;
};
export default App;