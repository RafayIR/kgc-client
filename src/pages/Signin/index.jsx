import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, replace } from 'formik';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { logInUser, logInFailure } from '../../redux/Auth/loginSlice';
import { useNavigate } from 'react-router-dom'

function LogIn() {
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        pass: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .matches(/^[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,4}|com)$/i, 'Invalid email format')
            .required('Email is required'),
        pass: Yup.string().required('Password is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsSubmitting(true);
        setError('')
        try {
            // Dispatch the login action and wait for it to complete
            await dispatch(logInUser(values)).unwrap();

        } catch (error) {
            setError(error.message)
            // You might want to clear the form or reset any state related to login here
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        if (isLoggedIn === true) {
            navigate(`/vendors`, { replace: true });
        } else {
            return navigate(`/`, { replace: true });
        }
    }, [isLoggedIn , navigate])

    return (
        <div>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Sign in
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

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={isSubmitting}
                                    >
                                        Sign In
                                    </Button>

                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    <Copyright sx={{ mt: 5 }} />

                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Grid>

            </Grid>

        </div>
    )
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.kaysons-group.com" target="_blank">
                kaysons Group
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default LogIn