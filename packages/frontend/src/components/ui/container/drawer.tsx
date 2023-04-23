import { logout } from "../../../slice/userSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Link } from "../link";
import { useEffect } from "react";
import { getRoomState, getAllRoomAsync } from "../../../slice/roomSlice";
import { getToken } from "../../../utilities/storage";
import { LinkRouter } from "../linkRouter";
import { Logo } from "../logo";

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
		<div className="flex flex-col w-24 h-screen items-center gap-8 bg-info pt-8 pb-8 bg-info-dark">
			<Logo size="sm" />

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
