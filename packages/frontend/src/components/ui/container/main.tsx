import { useAppSelector } from "store/hooks";
import { DrawerContainer } from "./drawer";
import { PageContainer } from "./page";
import { getUserState } from "slice/userSlice";

interface MainContainerProps {
	children: JSX.Element;
}

export const MainContainer = ({ children }: MainContainerProps): JSX.Element => {
	const userState = useAppSelector(getUserState);

	return (
		<div className="flex flex-1 justify-center items-center h-full font-display">
			{userState.userInfo && <DrawerContainer />}
			<PageContainer>{children}</PageContainer>
		</div>
	);
};
