const logoSize: Record<string, string> = {
	sm: "text-sm",
	md: "text-md",
	lg: "text-5xl",
	xl: "text-xl",
};

interface LogoInterface {
	size: "sm" | "md" | "lg" | "xl";
}

export const Logo = ({ size }: LogoInterface): JSX.Element => {
	return (
		<span
			className={`${logoSize[size]} uppercase text-primary-light font-display text-center tracking-tighter font-bold`}
		>
			Chat
		</span>
	);
};
