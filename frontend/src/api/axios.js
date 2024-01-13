import axios from 'axios';

const frontendOrigin = 'http://localhost:3000'; 

const instance = axios.create({
	baseURL: 'http://localhost:3001/api/',
	withCredentials: true,
	
});

export default instance;
