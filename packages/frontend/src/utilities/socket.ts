import { io } from "socket.io-client";
import { URL_BASE } from "./constant";
import { getToken } from "./storage";

const socket = io(URL_BASE, {
	auth: {
		token: getToken(),
	},
	autoConnect: false,
});

socket.on("connect", () => {
	console.log("connected");
});

socket.on("connect_error", (err) => {
	console.log("Connection error:", err);
});

socket.on("disconnect", () => {
	console.log("disconnected");
});

socket.io.on("error", (err) => {
	console.log("socket.io.on error", err);
});

export default socket;
