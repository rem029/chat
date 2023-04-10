import { UICommonInterface, uiColors } from "./types";

export const TextField = ({
	fontSize = "text-sm",
	borderColor = "primary",
	...props
}: TextFieldInterface): JSX.Element => {
	return (
		<input
			className={`border rounded border-solid p-2 border-${uiColors[borderColor]} {${fontSize}`}
			{...props}
		/>
	);
};

interface TextFieldInterface
	extends UICommonInterface,
		React.DetailedHTMLProps<
			React.InputHTMLAttributes<HTMLInputElement>,
			HTMLInputElement
		> {
	icon?: JSX.Element;
}
