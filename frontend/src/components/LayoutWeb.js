import { Outlet } from 'react-router-dom';
import Nav from './Nav';


const LayoutWeb = () => {
	return (
		<main>
			<Nav />
			<Outlet />
		</main>
	);
};

export default LayoutWeb;
