import { Button } from "../ui/button";
import { TextField } from "../ui/textfield";
import { useEffect, useMemo, useRef, useState } from "react";
import { getUserState } from "../../slice/userSlice";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../store/hooks";
import io from "../../utilities/socket";
import { getToken } from "../../utilities/storage";
import { Message } from "@common";
import { dateFormat } from "helpers/date";

interface ChatInterface {
	roomNumber: number;
}

export const ChatRoom = ({ roomNumber }: ChatInterface): JSX.Element => {
	const [socket, setSocket] = useState<Socket>();
	const [messages, setMessages] = useState<Message[]>([]);
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState("");
	const [joined, setJoined] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	const messagesReversed = useMemo(() => {
		return [...messages].reverse();
	}, [messages]);

	const userState = useAppSelector(getUserState);

	useEffect(() => {
		setSocket(io);

		return () => {
			if (socket) socket.disconnect();
		};
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messagesReversed, scrollRef]);

	const scrollToBottom = (): void =>
		scrollRef && scrollRef.current?.scrollIntoView({ behavior: "smooth" });

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
				console.log("msgs received");
				setMessages(messages);
			});

			socket.on("message", (message: Message) => {
				setMessages((prevState) => [message, ...prevState]);
			});

			socket.on("user joined", (email: string) => {
				setStatus(`${email} has joined`);
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
			setMessages((prevState) => [newMessage, ...prevState]);
			setMessage("");
			scrollToBottom();
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-1 relative h-screen w-full">
			<div className="flex flex-col gap-1 p-1 box-content fixed bg-background-dark w-full">
				<h1 className="text-xl font-bold text-contrastText-dark">{`Chat room ${roomNumber}`}</h1>
				<p className="text-contrastText-dark text-sm">{userState.userInfo?.email}</p>{" "}
				<p className="text-contrastText-dark text-sm">{status}</p>
			</div>

			<ul className="flex flex-1 flex-col gap-4 h-full overflow-y-scroll bg-info-light p-2 pt-24">
				{messagesReversed.map((msg, index) => {
					const isSameUser = msg?.user_email === userState.userInfo?.email;

					return (
						<li
							key={`msg${index}`}
							className={`flex flex-1 ${isSameUser ? "justify-start" : "justify-end"}`}
						>
							<div
								className={`${
									isSameUser
										? "items-start bg-info-light text-contrastText-light"
										: "items-end bg-secondary-default text-contrastText-light"
								}  p-2 flex flex-col shadow-md rounded-xl`}
								style={{ width: "95%" }}
							>
								<p className="text-xs">
									<strong>{dateFormat(new Date(msg?.created_at || new Date()))}</strong>
								</p>

								<p className="text-sm">
									{isSameUser ? <strong>YOU</strong> : msg.user_email}
								</p>
								<p className="text-md p-2">{msg.message}</p>
							</div>
						</li>
					);
				})}
				<div ref={scrollRef} />
			</ul>
			<form className="flex flex-1 flex-row gap-4 max-h-20 p-4">
				<TextField
					placeholder="Message..."
					onChange={(e) => setMessage(e.target.value)}
					value={message}
					className="w-full"
				/>
				<Button
					onClick={handleSubmitMessage}
					type="submit"
					className="text-contrastText-dark border-0 bg-primary-default text-center shadow-md"
				>
					SEND
				</Button>
			</form>
		</div>
	);
};
