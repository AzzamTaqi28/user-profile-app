import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/LayoutWeb';
import Profile from './components/Profile';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				{/* public routes */}
				{/* <Route index element={<Home />} /> */}
				<Route path='profile' element={<Profile />} />
				<Route index element={<Login />} />
				<Route path='register' element={<Register />} />

				{/* private routes */}
				{/* <Route element={<RequireAuth />}>
					<Route path='main' element={<Main />} />
				</Route> */}
			</Route>
		</Routes>
	);
}

export default App;
