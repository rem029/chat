import express, { Request, Router } from "express";
import { handleServerResponse, routerWrapper } from "handlers/index";
import { getAllRooms } from "controllers/roomController";
import { authenticateTokenRoute } from "middlewares/authToken";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get(
		"/",
		authenticateTokenRoute,
		routerWrapper("getAllRooms", async (req: Request, res, _) => {
			const response = await getAllRooms();

			handleServerResponse(res, req, 200, {
				__typename: response[0].__typename,
				success: true,
				message: "Get messages success",
				data: response,
			});
		})
	);

	return router;
};

export const roomRoutes = initializeRouter();
