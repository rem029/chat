import { ChatRoom } from "../components/chat/room";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const PageChat = (): JSX.Element => {
	const { id } = useParams();

	const selectedRoom: number = useMemo(() => {
		return id ? Number(id) : 0;
	}, [id]);

	return (
		<div className="p-4 flex flex-1 flex-row gap-8">
			<ChatRoom roomNumber={selectedRoom} />
		</div>
	);
};
