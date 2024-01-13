import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles, ThemeProvider } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatarContainer: {
		position: 'relative',
		width: '50%',
		height: '50%',
		marginBottom: 2,
	},

	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 0,
		transition: 'opacity 0.3s',
		cursor: 'pointer',
	},
	uploadIcon: {
		fontSize: 40,
		color: '#333',
	},
	form: {
		width: '100%',
		marginTop: 10,
	},
	submit: {
		marginTop: 20,
		display: 'block',
	},
	hiddenInput: {
		display: 'none',
	},
	title: {
		marginBottom: 20,
		fontSize: '2rem',
		fontWeight: 'bold',
	},
}));

export default function UpdateProfileForm() {
	const classes = useStyles();
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = React.useState('');
	const [errCode, setErrCode] = React.useState('');
	const [formData, setFormData] = useState({
		image: '',
		name: '',
		email: '',
		phone: '',
		password: '',
		imagePreviewUrl: '',
	});
	const fileInputRef = useRef(null);
	const to = '/';
	useEffect(() => {
		const fetchData = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken');

				if (!accessToken) {
					navigate(to, { replace: true });
					return;
				}

				const response = await axios.get('profile', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const initialData = response?.data?.data;

				setFormData((prevData) => ({
					...prevData,
					...initialData,
					imagePreviewUrl: initialData.imageName
						? `http://localhost:3001/uploads/${initialData.imageName}`
						: null,
				}));
			} catch (error) {
				console.error('Error fetching initial data:', error);
			}
		};

		fetchData(); // Call the function when the component mounts
	}, [navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			setFormData((prevData) => ({
				...prevData,
				image: file,
				imagePreviewUrl: reader.result,
			}));
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleOverlayClick = () => {
		fileInputRef.current.click();
	};

	const handleFileInputChange = (e) => {
		handleImageChange(e);
		fileInputRef.current.value = ''; // Reset the value to allow uploading the same image
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		//make axios post
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			navigate(to, { replace: true });
			return;
		}
		const data = new FormData();
		data.append('name', formData.name);
		data.append('email', formData.email);
		data.append('phone', formData.phone);
		data.append('password', formData.password);
		data.append('image', formData.image);
		try {
			const response = await axios.post('profile', data, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const code = response?.data?.code;

			if (code === 1) {
				window.location.reload();
			}
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
				<div className={classes.root}>
					<Typography component='h1' variant='h5' className={classes.title}>
						Profile
					</Typography>
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
					<div className={classes.avatarContainer}>
						<img
							src={
								formData.imagePreviewUrl ||
								'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png'
							}
							alt='user avatar'
							className='h-52 w-52 rounded-full object-cover object-center'
						/>
						<div
							className={classes.overlay}
							onMouseEnter={() => {
								document.querySelector(`.${classes.overlay}`).style.opacity = 1;
							}}
							onMouseLeave={() => {
								document.querySelector(`.${classes.overlay}`).style.opacity = 0;
							}}
							onClick={handleOverlayClick}>
							<CloudUploadIcon className={classes.uploadIcon} />
						</div>
					</div>
					<form className={classes.form} onSubmit={handleSubmit}>
						<input
							ref={fileInputRef}
							type='file'
							accept='image/*'
							id='hiddenFileInput'
							className={classes.hiddenInput}
							onChange={handleFileInputChange}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							fullWidth
							error={errorMessage.length > 0 && errorMessage[0]?.name ? true : false}
							helperText={errorMessage.length > 0 && errorMessage[0]?.name}
							id='name'
							label='Name'
							name='name'
							autoComplete='name'
							onChange={handleChange}
							value={formData.name}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							error={errorMessage.length > 0 && errorMessage[0]?.email ? true : false}
							helperText={errorMessage.length > 0 && errorMessage[0]?.email}
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							onChange={handleChange}
							value={formData.email}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							error={errorMessage.length > 0 && errorMessage[0]?.phone ? true : false}
							helperText={errorMessage.length > 0 && errorMessage[0]?.phone}
							fullWidth
							id='phone'
							label='Phone Number'
							name='phone'
							onChange={handleChange}
							value={formData.phone}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							onChange={handleChange}
							value={formData.password}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							Save
						</Button>
					</form>
				</div>
			</Container>
		</ThemeProvider>
	);
}
