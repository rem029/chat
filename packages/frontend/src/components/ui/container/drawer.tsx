import { logout } from "slice/userSlice";
import { useAppDispatch } from "store/hooks";
import { Link } from "../link";

export const DrawerContainer = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const handleLogoutSubmit: React.MouseEventHandler<HTMLAnchorElement> | undefined = (
		e
	): void => {
		e.preventDefault();
		dispatch(logout());
		window.location.reload();
	};

	return (
		<div className="flex flex-col w-16 h-full items-center gap-8 bg-gray-800 pt-8 pb-8">
			<p className="text-xs text-white">Header</p>

			<Link fontSize="text-sm" fontColor="secondary">
				Rooms
			</Link>

			<Link fontSize="text-sm" fontColor="secondary" onClick={handleLogoutSubmit}>
				Logout
			</Link>
		</div>
	);
};
