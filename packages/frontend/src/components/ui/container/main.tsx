import { DrawerContainer } from "./drawer";
import { PageContainer } from "./page";
import { Outlet } from "react-router-dom";

export const MainContainer = (): JSX.Element => {
	return (
		<div className="flex flex-1 justify-center items-center h-full font-display">
			<DrawerContainer />
			<PageContainer>
				<Outlet />
			</PageContainer>
		</div>
	);
};
