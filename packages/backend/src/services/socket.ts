import http from "http";
import { Server as IOServer, Socket } from "socket.io";
import { logger } from "utilities/logger";

import { getAllMessagesByRoomID, createMessage } from "controllers/messageController";

export const initializeSocketIO = (httpServer: http.Server): void => {
	const io = new IOServer(httpServer, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket: Socket) => {
		logger.info("User connected");

		socket.on("join", async (roomId: number, userId: number) => {
			// Join the room
			socket.join(roomId.toString());

			// Get the last 50 messages for the room
			const messages = await getAllMessagesByRoomID(roomId);
			// Emit the messages to the user
			socket.emit("messages", messages);

			// Notify the other users in the room that a new user has joined
			socket.to(roomId.toString()).emit("user joined", userId);
		});

		socket.on("message", async (roomId: number, userId: number, message: string) => {
			// Save the message to the database
			await createMessage({ room_id: roomId, user_id: userId, message: message });

			// Emit the message to the other users in the room
			socket.to(roomId.toString()).emit("message", userId, message);
		});

		socket.on("disconnect", () => {
			logger.info("User disconnected");
		});
	});
};
