import http from "http";
import { Server as IOServer, Socket } from "socket.io";
import { logger } from "utilities/logger";

import { getAllMessagesByRoomID, createMessage } from "controllers/messageController";
import { authenticateTokenSocket } from "middlewares/authToken";
import { SocketAuthInterface } from "types";

export const initializeSocketIO = (httpServer: http.Server): void => {
	const io = new IOServer(httpServer, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket: SocketAuthInterface) => {
		const userId = socket.user?.id || -1;
		logger.info(`User connected ${socket.user?.email}`);

		socket.on("join", async (roomId: number) => {
			// Join the room
			socket.join(roomId.toString());

			// Get the last 50 messages for the room
			const messages = await getAllMessagesByRoomID(roomId);
			// Emit the messages to the user
			socket.emit("messages", messages);

			// Notify the other users in the room that a new user has joined
			socket.to(roomId.toString()).emit("user joined", userId);
		});

		socket.on("message", async (roomId: number, message: string) => {
			// Save the message to the database
			const response = await createMessage({ room_id: roomId, user_id: userId, message: message });

			// Emit the message to the other users in the room
			socket.to(roomId.toString()).emit("message", response);
		});

		// Handle Socket.IO errors
		io.on("error", (err) => {
			logger.error(`Socket.IO error: ${JSON.stringify(err)}`);
		});

		// Handle Socket.IO errors
		socket.on("error", (err) => {
			logger.error(`Socket error: ${JSON.stringify(err)}`);
		});

		socket.on("disconnect", () => {
			logger.info(`User disconnected ${socket.user?.email}`);
		});
	});

	io.use(authenticateTokenSocket);
};
