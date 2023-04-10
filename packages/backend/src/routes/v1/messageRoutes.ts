import express, { Request, Router } from "express";
import { handleServerResponse, routerWrapper } from "../../handlers";
import { getAllMessagesByRoomID, createMessage, updateMessageById } from "../../controllers/messageController";
import { authenticateToken } from "../../middlewares/authToken";
import { Message } from "@chat/common";
import { parseBody } from "../../helpers/parseBody";
import { addUserController } from "controllers/userController";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get(
		"/:roomId",
		authenticateToken,
		routerWrapper("getAllMessagesRoute", async (req: Request, res, _) => {
			const roomId = req.params.roomId as unknown as number;
			const response = await getAllMessagesByRoomID(roomId);

			handleServerResponse(res, req, 200, {
				__typename: response[0].__typename,
				success: true,
				message: "Get messages success",
				data: response,
			});
		})
	);

	router.post(
		"/",
		authenticateToken,
		routerWrapper("createMessageRoute", async (req, res, _) => {
			const fields = parseBody<Message>("createMessage", req.body, req.headers);
			const response = await createMessage(fields);

			handleServerResponse(res, req, 200, {
				__typename: "number",
				success: true,
				message: "Add message success.",
				data: response,
			});
		})
	);

	router.patch(
		"/",
		authenticateToken,
		routerWrapper("updateMessageByIdRoute", async (req, res, _) => {
			const fields = parseBody<Message>("updateMessage", req.body, req.headers);
			const response = await updateMessageById(fields.id as number, fields);

			handleServerResponse(res, req, 200, {
				__typename: "boolean",
				success: true,
				message: "Update message success.",
				data: response,
			});
		})
	);

	return router;
};

export const messageRoutes = initializeRouter();
