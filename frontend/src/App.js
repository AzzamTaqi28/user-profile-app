import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/LayoutWeb';
import { Routes, Route } from 'react-router-dom';


function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				{/* public routes */}
				{/* <Route index element={<Home />} /> */}
				{/* <Route path='about' element={<About />} /> */}
				<Route  index element={<Login />} />
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
