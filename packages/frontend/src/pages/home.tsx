import { getUserState } from "slice/userSlice";
import { useAppSelector } from "store/hooks";

export const HomePage = (): JSX.Element => {
	const userState = useAppSelector(getUserState);

	return (
		<div className="p-4 flex flex-col gap-8">
			<h1 className="text-xl font-bold">Homepage here</h1>
			<p>{userState.userInfo?.email}</p>
		</div>
	);
};
