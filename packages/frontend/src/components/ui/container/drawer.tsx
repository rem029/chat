import { logout } from "../../../slice/userSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Link } from "../link";
import { useEffect } from "react";
import { getRoomState, getAllRoomAsync } from "../../../slice/roomSlice";
import { getToken } from "../../../utilities/storage";
import { LinkRouter } from "../linkRouter";

export const DrawerContainer = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const roomState = useAppSelector(getRoomState);

	useEffect(() => {
		const token = getToken();
		if (token) dispatch(getAllRoomAsync(token));
	}, []);

	const handleLogoutSubmit: React.MouseEventHandler<HTMLAnchorElement> | undefined = (
		e
	): void => {
		e.preventDefault();
		dispatch(logout());
		window.location.reload();
	};

	return (
		<div className="flex flex-col w-16 h-full items-center gap-8 bg-gray-800 pt-8 pb-8">
			<h2 className="text-xs text-white">Header</h2>

			{roomState.rooms?.map((room) => {
				return (
					<LinkRouter
						to={`/lobby/${room.id}`}
						fontSize="text-sm"
						fontColor="secondary"
						key={room.id}
					>
						{room.name}
					</LinkRouter>
				);
			})}

			<Link fontSize="text-sm" fontColor="secondary" onClick={handleLogoutSubmit}>
				Logout
			</Link>
		</div>
	);
};
