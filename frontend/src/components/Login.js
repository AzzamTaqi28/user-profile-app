import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';

function Copyright(props) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='#'>
				Hp Management Asset Test
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignIn() {
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [errorMessage, setErrorMessage] = React.useState('');
	const [errCode, setErrCode] = React.useState('');
	const from = location.state?.from?.pathname || '/profile';

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		try {
			const response = await axios.post('auth/login', {
				email: data.get('email'),
				password: data.get('password'),
			});
			const accessToken = response?.data?.token;
			setAuth({ accessToken });
			navigate(from, { replace: true });
			localStorage.setItem('accessToken', accessToken);
		} catch (error) {
			const errorCode = error?.response?.data?.code;
			const errorMessages = error?.response?.data?.message;

			setErrCode(errorCode);
			setErrorMessage(errorMessages || []);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					{[0, -1].includes(errCode) && typeof errorMessage[0] === 'string' ? (
						<Alert
							severity='error'
							variant='outlined'
							sx={{
								width: '100%',
							}}>
							{errorMessage[0]}
						</Alert>
					) : null}

					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							error={errorMessage.length > 0 && errorMessage[0]?.email ? true : false}
							helperText={errorMessage.length > 0 && errorMessage[0]?.email}
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
						/>
						<TextField
							error={
								errorMessage.length > 0 && errorMessage[0]?.password ? true : false
							}
							helperText={errorMessage.length > 0 && errorMessage[0]?.password}
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						<FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link href='/register' variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
