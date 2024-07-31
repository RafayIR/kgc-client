import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { Button, Checkbox, FormControlLabel, TextField, MenuItem, Input, Box } from '@mui/material';
import * as Yup from 'yup';
import { vendorConfig, billingConfig, pickUpConfig, testConfig } from '../../configs';
import { useSelector, useDispatch } from 'react-redux';
import { createVendor } from '../../redux/Vendors/vendorSlice';
import { createBillingInfo } from '../../redux/Vendors/billingSlice';
import { createPickUp } from '../../redux/Vendors/pickupSlice';
import { hideModal } from '../../redux/Modal/modalSlice';
import { useLocation } from 'react-router-dom';
import { fieldComponents } from '../../pages/Vendors/vendorFields';
import '../../pages/Vendors/vendor.css'

const generateValidationSchema = (fields) => {
    const shape = {};

    fields.forEach(field => {
        let validator = Yup.string();

        if (field.rules.includes("required")) {
            validator = validator.required("This field is required");
        }

        field.rules.forEach(rule => {
            if (typeof rule === 'object' && rule.type === 'matchRegexp') {
                validator = validator.matches(new RegExp(rule.data), rule.error || "Invalid format");
            }
            if (rule === 'isEmail') {
                validator = validator.email("Invalid email address");
            }
        });

        shape[field.id] = validator;
    });

    return Yup.object().shape(shape);
};


const pathMap = {
    '/vendors': {
        config: vendorConfig,
        create: createVendor,
    },
    '/billing': {
        config: billingConfig,
        create: createBillingInfo,
    },
    '/pickup': {
        config: pickUpConfig,
        create: createPickUp,
    },
};

const getPathData = (path) => {
    return pathMap[path] || { config: vendorConfig, create: null };
};

const FormController = () => {
    const isModalOpen = useSelector((state) => state.modal.isModalOpen);
    const vendorInfo = useSelector(state => state.vendor.data)
    const dispatch = useDispatch()
    const location = useLocation();
    const { config, create } = getPathData(location.pathname);

    const initialValues = config?.fields?.reduce((acc, field) => {
        acc[field.id] = field.defaultValue || '';
        return acc;
    }, {});


    const validationSchema = generateValidationSchema(config.fields);

    const handleSubmit = (values) => {
        if (create) {
            dispatch(create(values));
        }
        dispatch(hideModal(true));
    };




    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}

            >
                {({ errors, touched }) => (
                    <Form style={{ padding: '25px' }}>
                        <Box className='field-input' sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>


                            {/* <ErrorMessage name={field.id} component="span" className="error" style={{ color: 'red' }} /> */}


                            {config.fields.map((field, index) => {
                                const fieldConfig = fieldComponents[field.type] || {};
                                const Component = fieldConfig.component;
                                const isCheckbox = fieldConfig.isCheckbox;
                                const isSelect = fieldConfig.isSelect;
                                const useVendorInfo = fieldConfig.useVendorInfo;
                                const errorKey = fieldConfig.errorKey || field.id;

                                if (isCheckbox) {
                                    return (
                                        <Field
                                            key={index}
                                            as={Component}
                                            control={<Checkbox />}
                                            label={field.name}
                                            name={field.id}
                                            style={{ marginBottom: '16px', ...fieldConfig.style }}
                                        />
                                    );
                                }

                                return (
                                    <Field
                                        key={index}
                                        as={Component}
                                        type="text"
                                        id={field.id}
                                        name={field.id}
                                        error={errors[errorKey] && touched[errorKey]}
                                        helperText={<ErrorMessage name={field.id} />}
                                        label={field.name}
                                        style={{ marginBottom: '16px', height: 'auto', ...fieldConfig.style }}
                                        placeholder={field.placeholder}
                                        select={isSelect}
                                    >
                                        {isSelect && (useVendorInfo ? vendorInfo : field.options).map((option, idx) => (
                                            <MenuItem key={idx} value={option.value || option.vendorCode || ''}>
                                                {option.value || option.vendorCode} {option.name}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                );
                            })}
                        </Box>
                        <Button variant='contained' type="submit">Save</Button>
                        <ClearErrorsOnModalClose isModalOpen={isModalOpen} fields={config.fields} />
                    </Form>
                )}
            </Formik>

        </>
    )
}



const ClearErrorsOnModalClose = ({ isModalOpen, fields }) => {
    const { setFieldError } = useFormikContext()

    useEffect(() => {
        if (!isModalOpen) {
            fields.forEach((field) => {
                setFieldError(field.id, '')
            })
        }
    }, [isModalOpen, fields, setFieldError])


    return null
}


export default FormController