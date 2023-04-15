import express, { Router } from "express";
import { handleServerResponse, routerWrapper } from "../../handlers";
import { RequestAuthInterface } from "../../types";
import { getUserMeInfoController, getUserInfoController, addUserController } from "../../controllers/userController";
import { authenticateTokenRoute } from "../../middlewares/authToken";
import { parseBody } from "helpers/parseBody";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get(
		"/me",
		authenticateTokenRoute,
		routerWrapper("getUserMeInfoController", async (req: RequestAuthInterface, res, _) => {
			const { email } = req.user ? req.user : { email: "" };
			const response = await getUserMeInfoController({ email });

			handleServerResponse(res, req, 200, {
				__typename: response.__typename,
				success: true,
				message: "Get user info success",
				data: response,
			});
		})
	);

	router.get(
		"/",
		authenticateTokenRoute,
		routerWrapper("getUserInfoController", async (req, res, _) => {
			const response = await getUserInfoController();

			handleServerResponse(res, req, 200, {
				__typename: response[0].__typename,
				success: true,
				message: "Get user info success",
				data: response,
			});
		})
	);

	router.post(
		"/register",
		routerWrapper("addUserController", async (req, res, _) => {
			const fields = parseBody<{ username: string; password: string }>("registerRoute", req.body, req.headers);
			const response = await addUserController(fields.username, fields.password);

			handleServerResponse(res, req, 200, {
				__typename: "UserInfo",
				success: true,
				message: "Register user success.",
				data: response,
			});
		})
	);

	return router;
};

export const userRoutes = initializeRouter();
