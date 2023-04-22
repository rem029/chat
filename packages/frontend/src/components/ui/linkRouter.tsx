import { Link, LinkProps } from "react-router-dom";
import { UICommonInterface, uiColors } from "./types";

export const LinkRouter = ({
	fontSize = "text-sm",
	fontColor = "primary",
	...props
}: LinkInterface): JSX.Element => {
	return (
		<Link
			{...props}
			className={
				props.className +
				` text-${uiColors[fontColor]} text-center underline cursor-pointer ${fontSize}`
			}
		>
			{props.children}
		</Link>
	);
};

interface LinkInterface extends UICommonInterface, LinkProps {
	children?: React.ReactNode;
}
