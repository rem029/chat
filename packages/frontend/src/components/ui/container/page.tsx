interface PageContainerProps {
	children: JSX.Element;
}
export const PageContainer = ({ children }: PageContainerProps): JSX.Element => {
	return <div className="flex flex-1 h-full font-display">{children}</div>;
};
