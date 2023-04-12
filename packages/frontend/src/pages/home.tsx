import { Message } from "@chat/common";
import { Button } from "components/ui/button";
import { TextField } from "components/ui/textfield";
import { useEffect, useState } from "react";
import { getUserState } from "slice/userSlice";
import { Socket } from "socket.io-client";
import { useAppSelector } from "store/hooks";
import io from "utilities/socket";
import { getToken } from "utilities/storage";

export const HomePage = (): JSX.Element => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [message, setMessage] = useState("");
	const [socket, setSocket] = useState<Socket>();

	const userState = useAppSelector(getUserState);

	useEffect(() => {
		setSocket(io);

		return () => {
			if (socket) socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (socket) {
			socket.auth = { token: getToken() };
			socket.open();
			socket.emit("join", 1, userState.userInfo?.id);

			socket.on("messages", (messages: Message[]) => {
				setMessages(messages);
			});

			socket.on("message", (message: Message) => {
				setMessages((prevState) => [...prevState, message]);
			});
		}
	}, [socket]);

	const handleSubmitMessage: React.MouseEventHandler<HTMLButtonElement> | undefined = (
		e
	): void => {
		e.preventDefault();
		if (socket && message) {
			socket.emit("message", 1, message);
			setMessages((prevState) => [
				...prevState,
				{
					room_id: 1,
					user_id: userState.userInfo?.id || -1,
					message: message,
					created_at: new Date(),
				},
			]);
		}
	};

	return (
		<div className="p-4 flex flex-1 flex-row gap-8">
			<form className="flex flex-1 flex-col gap-8">
				<h1 className="text-xl font-bold">Homepage here</h1>
				<p>{userState.userInfo?.email}</p>
				<TextField
					placeholder="Message"
					onChange={(e) => setMessage(e.target.value)}
					value={message}
				/>
				<Button onClick={handleSubmitMessage} type="submit">
					SEND
				</Button>
			</form>

			<ul className="flex flex-1 flex-col gap-4">
				{messages.reverse().map((msg) => (
					<li key={msg.id}>
						<p>{msg.user_id + " " + msg.id + " " + msg.message}</p>
					</li>
				))}
			</ul>
		</div>
	);
};
