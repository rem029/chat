import { Message } from "@common";
import { Button } from "../ui/button";
import { TextField } from "../ui/textfield";
import { useEffect, useState } from "react";
import { getUserState } from "../../slice/userSlice";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../store/hooks";
import io from "../../utilities/socket";
import { getToken } from "../../utilities/storage";

interface ChatInterface {
	roomNumber: number;
}

export const ChatRoom = ({ roomNumber }: ChatInterface): JSX.Element => {
	/**
	 * #TODO
	 * Better Handle state
	 * Create socket customHook??
	 * Multiple time leaving room
	 * Better UI Design
	 */

	const [socket, setSocket] = useState<Socket>();
	const [messages, setMessages] = useState<Message[]>([]);
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState("");
	const [joined, setJoined] = useState(false);

	const userState = useAppSelector(getUserState);

	useEffect(() => {
		setSocket(io);

		return () => {
			if (socket) socket.disconnect();
		};
	}, []);

	useEffect(() => {
		console.log("roomNumber change", roomNumber);

		if (socket && !joined) {
			socket.emit("join", roomNumber, userState.userInfo?.id, () => {
				console.log("joined room", roomNumber);
				setJoined(true);
			});
		}

		return () => {
			if (socket && joined) {
				socket.emit("leave", roomNumber, userState.userInfo?.id, () => {
					console.log("left room", roomNumber);
					setJoined(false);
					setMessages([]);
				});
			}
		};
	}, [roomNumber, socket, joined]);

	useEffect(() => {
		if (socket && !joined) {
			socket.auth = { token: getToken() };
			socket.open();

			socket.on("messages", (messages: Message[]) => {
				setMessages(messages);
			});

			socket.on("message", (message: Message) => {
				setMessages((prevState) => [message, ...prevState]);
			});

			socket.on("user joined", (userId: number) => {
				setStatus(`UserID: ${userId} has joined`);
			});
		}
	}, [socket, joined]);

	const handleSubmitMessage: React.MouseEventHandler<HTMLButtonElement> | undefined = (
		e
	): void => {
		e.preventDefault();
		if (socket && message && roomNumber) {
			socket.emit("message", roomNumber, userState.userInfo?.id, message);
			const newMessage: Message = {
				message: message,
				created_at: new Date(),
				user_email: userState.userInfo?.email || "",
				room_id: roomNumber,
				user_id: userState.userInfo?.id || 0,
			};
			console.log("new message sent", newMessage);
			setMessages((prevState) => [newMessage, ...prevState]);
		}
	};

	return (
		<div className="p-4 flex flex-1 flex-row gap-8">
			<form className="flex flex-1 flex-col gap-8">
				<h1 className="text-xl font-bold">{`Chat room ${roomNumber}`}</h1>
				<p>{userState.userInfo?.email}</p>

				<TextField
					placeholder="Message..."
					onChange={(e) => setMessage(e.target.value)}
					value={message}
				/>
				<Button onClick={handleSubmitMessage} type="submit">
					SEND
				</Button>

				<p>{status}</p>
			</form>

			<ul className="flex flex-1 flex-col gap-4 max-h-screen overflow-y-scroll">
				{messages.map((msg, index) => {
					const isSameUser = msg?.user_email === userState.userInfo?.email;

					return (
						<li key={`msg${index}`}>
							<p>
								<strong>
									{new Date(msg?.created_at || new Date()).toLocaleDateString()}
								</strong>
								<span> </span>
								{new Date(msg?.created_at || new Date()).toLocaleTimeString()}
							</p>
							<p>{isSameUser ? "YOU" : msg.user_email}</p>
							<p>{msg.message}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
