import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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

export default function SignUp() {
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [errorMessage, setErrorMessage] = React.useState([]);
	const [errCode, setErrCode] = React.useState('');

	const from = location.state?.from?.pathname || '/profile';

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		try {
			const response = await axios.post('auth/register', {
				name: data.get('name'),
				email: data.get('email'),
				password: data.get('password'),
			});
			const accessToken = response?.data?.token;
			setAuth({ accessToken });
			localStorage.setItem('accessToken', accessToken);
			navigate(from, { replace: true });
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
						Sign up
					</Typography>
					<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									error={errorMessage.length > 0 && errorMessage[0]?.name ? true : false}
									helperText={errorMessage.length > 0 && errorMessage[0]?.name}
									required
									fullWidth
									id='name'
									label='Full Name'
									name='name'
									autoComplete='name'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									error={
										errorMessage.length > 0 && errorMessage[0]?.email ? true : false
									}
									helperText={errorMessage.length > 0 && errorMessage[0]?.email}
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									error={
										errorMessage.length > 0 && errorMessage[0]?.phone ? true : false
									}
									helperText={errorMessage.length > 0 && errorMessage[0]?.phone}
									required
									fullWidth
									id='phone'
									label='Phone Number'
									name='phone'
									autoComplete='phone'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									error={
										errorMessage.length > 0 && errorMessage[0]?.password ? true : false
									}
									helperText={errorMessage.length > 0 && errorMessage[0]?.password}
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='new-password'
								/>
							</Grid>
						</Grid>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Sign Up
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link href='/' variant='body2'>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}
