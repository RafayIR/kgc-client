import { Form } from 'antd';
import { TextField } from '@mui/material';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {


    let inputNode;
    const rules = [
        {
            required: true,
            message: `Please Input ${title}!`,
            validateStatus: 'error',
        },
    ];
    if (inputType === 'number') {
        inputNode = (
            <TextField
                id="standard-number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
            />
        );
    } else if (inputType === 'email') {
        inputNode = (
            <TextField
                type="email"
                size="small"
                variant="standard"
            />
        );
        rules.push({
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'The input is not valid E-mail!',
        })

    }
    else if (inputType === 'name') {
        inputNode = (
            <TextField
                type="text"
                size="small"
                variant="standard"
            />
        );
        rules.push({
            pattern: /^[A-Za-z\s]+$/,
            message: 'Letters and spaces only!',
        });
    } else {
        inputNode = (
            <TextField
                type="text"
                size="small"
                variant="standard"
            />
        );
    }
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={rules}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};




export default EditableCell;