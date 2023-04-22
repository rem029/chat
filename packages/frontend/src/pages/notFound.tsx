import { LinkRouter } from "../components/ui/linkRouter";

export const PageNotFound = (): JSX.Element => {
	return (
		<div className="p-4 flex flex-1 flex-row gap-8">
			<h1>Not Found Page</h1>
			<LinkRouter to="/">Go back</LinkRouter>
		</div>
	);
};
