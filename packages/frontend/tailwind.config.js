/** @type {import('tailwindcss').Config} */

const config = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: { default: "#7A28CB", dark: "#390D65", light: "#DDBBFF" },
				secondary: { default: "#E7D536", dark: "#A49303", light: "#FCF29B" },
				info: { default: "#9E9E9E", dark: "#3D3D3D", light: "#DCDCDC" },
				error: { default: "#FC60A8", dark: "#8F0545", light: "#FFD2E7" },
				success: { default: "#64BB5C", dark: "#075C00", light: "#ACFFA5" },
				warning: { default: "#FF9866", dark: "#953100", light: "#F4B393" },
				background: {
					dark: "#494368",
					light: "#F8F8F8",
				},
				contrastText: {
					dark: "#F8F8F8",
					light: "#494368",
				},
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
