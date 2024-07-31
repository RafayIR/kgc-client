import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, replace } from 'formik';
import { Button, CssBaseline, TextField, Link, Paper, Box, Grid, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../redux/registration/signUpSlice';


function SignUp() {
    const isRegistered = useSelector(state => state.signup.isRegistered);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const initialValues = {
        email: '',
        pass: '',
        role: ''
    };
    console.log('is', isRegistered)

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .matches(/^[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,4}|com)$/i, 'Invalid email format')
            .required('Email is required'),
        pass: Yup.string().required('Password is required'),
        role: Yup.string().required('Role is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setError('')
        setIsSubmitting(true);
        try {
            // Dispatch the login action and wait for it to complete
            await dispatch(signUp(values)).unwrap();



        } catch (error) {
            console.log(error)
            setError(error.message)

            // You might want to clear the form or reset any state related to login here
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' , marginBottom : '20px'}}>
                <Button onClick={() => { navigate('/viewuser')}} variant='contained'>
                    View Users
                </Button>
            </Box>

            <Grid container component="main">
                <CssBaseline />
                <Grid item xs={12} sm={7} md={7} sx={{ width: "80%", margin: '0 auto' }} component={Paper} elevation={6} >
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {() => (
                            <Form >
                                <Box
                                    sx={{
                                        my: 8,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >

                                    <Typography component="h1" variant="h5">
                                        Register New User
                                    </Typography>


                                    <Field
                                        as={TextField}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="email"
                                        label="Email Address"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <ErrorMessage name="email" component="div" />
                                    <Field
                                        as={TextField}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="pass"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                    />
                                    <ErrorMessage name="password" component="div" />

                                    <Typography sx={{ color: 'red' }} component="p" variant="p">
                                        {error}
                                    </Typography>

                                    <Field
                                        as={TextField}
                                        margin="normal"
                                        required
                                        fullWidth
                                        select
                                        name="role"
                                        label="Role"
                                    >
                                        <MenuItem value="admin">Admin</MenuItem>
                                        <MenuItem value="user">User</MenuItem>
                                    </Field>
                                    <ErrorMessage name="role" component="div" />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={isSubmitting}
                                    >
                                        Register
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Grid>

            </Grid>

        </div>
    )
}



export default SignUp