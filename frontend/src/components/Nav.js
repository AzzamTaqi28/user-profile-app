import { useState, useEffect } from 'react';
import {
	Navbar,
	MobileNav,
	Typography,
	Button,
	IconButton,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function WebButton() {
	const { setAuth } = useAuth();
	const navigate = useNavigate();

	const handleClickLogin = () => {
		navigate('/');
	};

	const handleClickLogout = () => {
		setAuth({});
        localStorage.removeItem('accessToken');
		navigate('/');
	};
	if (localStorage.getItem('accessToken')?.length > 0) {
		return (
			<Button
				variant='gradient'
				size='sm'
				className='hidden lg:inline-block'
				onClick={handleClickLogout}>
				<span>Logout</span>
			</Button>
		);
	} else {
		return (
			<Button
				variant='gradient'
				size='sm'
				className='hidden lg:inline-block'
				onClick={handleClickLogin}>
				<span>Login</span>
			</Button>
		);
	}
}

function MobileButton() {
	const { setAuth } = useAuth();
	const navigate = useNavigate();

	const handleClickRegister = () => {
		navigate('/register');
	};

	const handleClickLogout = () => {
		setAuth({});
        localStorage.removeItem('accessToken');
		navigate('/');
	};
	if (localStorage.getItem('accessToken')?.length > 0) {
		return (
			<Button
				variant='gradient'
				size='sm'
				fullWidth
				className='mb-2'
				onClick={handleClickLogout}>
				<span>Logout</span>
			</Button>
		);
	} else {
		return (
			<Button
				variant='gradient'
				size='sm'
				fullWidth
				className='mb-2'
				onClick={handleClickRegister}>
				<span>Register</span>
			</Button>
		);
	}
}

export default function Example() {
	const [openNav, setOpenNav] = useState(false);

	useEffect(() => {
		window.addEventListener(
			'resize',
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	const navList = (
		<ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
            {localStorage.getItem('accessToken')?.length === 0 ? (
                <Typography
				as='li'
				variant='small'
				color='blue-gray'
				className='p-1 font-normal'>
				<a href='/' className='flex items-center'>
					Login
				</a>
			</Typography>) : null}
		</ul>
	);

	return (
		<Navbar className='mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4'>
			<div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
				<Typography
					as='a'
					href='/'
					variant='small'
					className='mr-4 cursor-pointer py-1.5 font-normal'>
					<span>Hp Management Asset Test</span>
				</Typography>
				<div className='hidden lg:block'>{navList}</div>
				<WebButton />
				<IconButton
					variant='text'
					className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
					ripple={false}
					onClick={() => setOpenNav(!openNav)}>
					{openNav ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							className='h-6 w-6'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							stroke='currentColor'
							strokeWidth={2}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M4 6h16M4 12h16M4 18h16'
							/>
						</svg>
					)}
				</IconButton>
			</div>
			<MobileNav open={openNav}>
				{navList}
				<MobileButton />
			</MobileNav>
		</Navbar>
	);
}
