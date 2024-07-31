import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../redux/Modal/modalSlice';
import { Modal as AntdModal } from 'antd';


const ModalComponent = ({ title, children }) => {
    const isModalOpen = useSelector((state) => state.modal.isModalOpen);
    const dispatch = useDispatch();

    const handleOk = () => {
        dispatch(hideModal());
    };

    const handleCancel = () => {
        dispatch(hideModal());
    };



    return (
        <>
            <AntdModal
                width={1000}
                title={title}
                style={{ top: 50}}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >

                {children}

            </AntdModal>
        </>
    )
}


export default ModalComponent;