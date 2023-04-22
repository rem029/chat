/** @type {import('tailwindcss').Config} */

const config = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#2DAF7F",
				secondary: "#B91C1C",
				info: "#2DAF7F",
				error: "#2DAF7F",
				success: "#2DAF7F",
				warning: "#2DAF7F",
			},
		},
		fontFamily: {
			display: ["Poppins"],
			body: ["Poppins"],
		},
	},
	plugins: [],
};

export default config;
