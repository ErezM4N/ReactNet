import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';


//const theme = createTheme();

export default function Login() {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });

    async function submitForm(data: FieldValues) {
        await dispatch(signInUser(data));
        history.push('/catalog');
        // try {
        //     await agent.Account.login(data);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    // const handleSubmit = (event:any) => {
    //     event.preventDefault();
    //     agent.Account.login(values);
    // };

    // function handleInputChange(event: any) {
    //     const { name, value } = event.target;
    //     setValues({
    //         ...values, [name]: value
    //     })
    // }

    return (
        // <ThemeProvider theme={theme}>
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <CssBaseline />
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', { required: 'Username is required' })}
                    error={!!errors.username}
                    helperText={errors?.username?.message}
                //name="username"
                // onChange={handleInputChange}
                // value={values.username}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                //name="password"
                // onChange={handleInputChange}
                // value={values.password}
                />
                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to={'/register'}>{"Don't have an account? Sign Up"}</Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        // </ThemeProvider>
    );
}