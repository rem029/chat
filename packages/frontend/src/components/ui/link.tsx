import { UICommonInterface, uiColors } from "./types";

export const Link = ({
	fontSize = "text-sm",
	fontColor = "primary",
	...props
}: LinkInterface): JSX.Element => {
	return (
		<a
			className={`text-${uiColors[fontColor]} text-center underline cursor-pointer ${fontSize}`}
			{...props}
		>
			{props.children}
		</a>
	);
};

interface LinkInterface
	extends UICommonInterface,
		React.DetailedHTMLProps<
			React.AnchorHTMLAttributes<HTMLAnchorElement>,
			HTMLAnchorElement
		> {
	children?: React.ReactNode;
}
