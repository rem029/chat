import { UICommonInterface, uiColors } from "./types";

export const Button = ({
	fontSize = "text-sm",
	bgColor = "primary",
	...props
}: ButtonInterface): JSX.Element => {
	return (
		<button
			className={`border rounded border-solid p-2 bg-${uiColors[bgColor]} text-${uiColors[bgColor]} ${fontSize}`}
			{...props}
		>
			{props.children}
		</button>
	);
};

interface ButtonInterface
	extends UICommonInterface,
		React.DetailedHTMLProps<
			React.ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		> {
	children?: React.ReactNode;
}
