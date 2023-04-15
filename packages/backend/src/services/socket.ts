import http from "http";
import { Server as IOServer } from "socket.io";
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

	io.use(authenticateTokenSocket);

	io.on("connection", (socket: SocketAuthInterface) => {
		logger.info(`User connected ${socket.user?.email}`);

		/**
		 * #TODO
		 * Handle socket events on separate file
		 * Handle socket errors
		 */

		socket.on("join", async (roomId: number, userId: number, callback: () => void) => {
			// Join the room
			socket.join(roomId.toString());
			logger.info(`ID# ${userId} User ${socket.user?.email} joined room id: ${roomId}`);
			// Get the last 50 messages for the room
			const messages = await getAllMessagesByRoomID(roomId);
			// Emit the messages to the user
			socket.emit("messages", messages);

			// Notify the other users in the room that a new user has joined
			socket.to(roomId.toString()).emit("user joined", userId);
			callback();
		});

		socket.on("leave", async (roomId: number, userId: number, callback: () => void) => {
			logger.info(`ID# ${userId} User ${socket.user?.email} left room id: ${roomId}`);
			socket.leave(roomId.toString());
			callback();
		});

		socket.on("message", async (roomId: number, userId: number, message: string) => {
			// Save the message to the database
			const response = await createMessage({ room_id: roomId, user_id: userId, message: message });

			logger.info(`User id# ${response.user_email} sent message to room id: ${roomId}`);
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
};
