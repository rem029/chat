import express, { Router } from "express";
import { handleServerResponse, routerWrapper } from "@handlers/index";
import { RequestAuthInterface } from "@interfaces/index";
import { createUser, checkUserName, getUserInfo, getUserMeInfo } from "@controllers/userController";
import { authenticateTokenRoute } from "@middlewares/authToken";
import { parseBody } from "@helpers/parseBody";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get(
		"/me",
		authenticateTokenRoute,
		routerWrapper("getUserMeInfo", async (req: RequestAuthInterface, res, _) => {
			const { email } = req.user ? req.user : { email: "" };
			const response = await getUserMeInfo({ email });

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
		routerWrapper("getUserInfo", async (req, res, _) => {
			const response = await getUserInfo();

			handleServerResponse(res, req, 200, {
				__typename: response[0].__typename,
				success: true,
				message: "Get user info success",
				data: response,
			});
		})
	);

	router.get(
		"/check/:userName",
		routerWrapper("checkUserName", async (req, res, _) => {
			const userName = req.params.userName as unknown as string;
			const response = await checkUserName(userName);

			handleServerResponse(res, req, 200, {
				__typename: "boolean",
				success: true,
				message: "Check username success",
				data: response,
			});
		})
	);

	router.post(
		"/create",
		routerWrapper("createUser", async (req, res, _) => {
			const fields = parseBody<{ username: string; password: string }>("createUser", req.body, req.headers);
			const response = await createUser(fields.username, fields.password);

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
