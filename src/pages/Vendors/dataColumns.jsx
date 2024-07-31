import { Tooltip } from "antd"

export const columns = [
    {
        title: 'Vendor Code'.toUpperCase(),
        dataIndex: 'vendorCode',
        key: 'vendorCode',
        fixed: 'left',
        width: 150,
        editable: true,
        showSorterTooltip: {
            target: 'full-header',
        },
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend', 'ascend'],
    },
    { title: 'Name'.toUpperCase(), dataIndex: 'name', key: 'name', width: 150, editable: true, fixed: 'left' },
    { title: 'Email'.toUpperCase(), dataIndex: 'email', key: 'email', width: 200, editable: true, },
    { title: 'Phone'.toUpperCase(), dataIndex: 'phone', key: 'phone', width: 150, editable: true, },
    {
        title: 'Address 1'.toUpperCase(),
        dataIndex: 'address_1',
        key: 'address_1',
        ellipsis: {
            showTitle: false,
        },
        render: (address) => (
            <Tooltip placement="topLeft" title={address}>
                {address}
            </Tooltip>
        ),
        width: 150,
        editable: true,
    },
    {
        title: 'Address 2'.toUpperCase(),
        dataIndex: 'address_2',
        key: 'address_2',
        ellipsis: {
            showTitle: false,
        },
        render: (address) => (
            <Tooltip placement="topLeft" title={address}>
                {address}
            </Tooltip>
        ),
        width: 150,
        editable: true,
    },
    {
        title: 'City'.toUpperCase(),
        dataIndex: 'city',
        key: 'city',
        width: 150,
        ellipsis: {
            showTitle: false,
        },
        render: (address) => (
            <Tooltip placement="topLeft" title={address}>
                {address}
            </Tooltip>
        ),
        editable: true,
    },
    { title: 'State'.toUpperCase(), dataIndex: 'state', key: 'state', width: 200, ellipsis: true, editable: true, },
    { title: 'Country'.toUpperCase(), dataIndex: 'country', key: 'country', width: 150, ellipsis: true, editable: true, },
    { title: 'Postal Code'.toUpperCase(), dataIndex: 'postal_code', align: 'right', key: 'postal_code', width: 180, editable: true, },
]