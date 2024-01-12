const withMT = require('@material-tailwind/react/utils/withMT');
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
	],
	theme: {
		extend: {
			screens: {
				md: { max: '767px' },
				desktop: { max: '1300px' },
			},
			colors: {
				nav: '#191A1C',
				darkBlue: '#22272A',
				modalBg: '#1B2029',
				modalInput: '#171717',
				'dark-purple': '#6F74A6',
			},
			backgroundImage: {
				'music-logo': "url('/src/Img/music-logo2.jpg')",
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide'), require('tailwind-scrollbar')],
	variants: {
		scrollbar: ['rounded'],
	},
});
