import express, { Request, Router } from "express";
import { handleServerResponse, routerWrapper } from "@handlers/index";
import { getAllMessagesByRoomID, createMessage, updateMessageById } from "../../controllers/messageController";
import { authenticateTokenRoute } from "@middlewares/authToken";
import { Message } from "@common";
import { parseBody } from "../../helpers/parseBody";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get(
		"/:roomId",
		authenticateTokenRoute,
		routerWrapper("getAllMessagesByRoomID", async (req: Request, res, _) => {
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
		authenticateTokenRoute,
		routerWrapper("createMessage", async (req, res, _) => {
			const fields = parseBody<Message>("createMessage", req.body, req.headers);
			const response = await createMessage(fields);

			handleServerResponse(res, req, 200, {
				__typename: "Message",
				success: true,
				message: "Add message success.",
				data: response,
			});
		})
	);

	router.patch(
		"/",
		authenticateTokenRoute,
		routerWrapper("updateMessageById", async (req, res, _) => {
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
