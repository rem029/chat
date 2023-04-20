import { Router } from "express";
import { loginController } from "@controllers/loginController";
import { authenticateLogin } from "@middlewares/authUser";
import { RequestAuthInterface } from "@interfaces/index";
import { handleServerResponse, routerWrapper } from "@handlers/index";

const initializeRouter = (): Router => {
	const router = Router();

	router.post(
		"/",
		authenticateLogin,
		routerWrapper("loginController", async (req: RequestAuthInterface, res, _) => {
			const body = req.body ? req.body : { email: "", password: "" };

			const response = await loginController(body);
			handleServerResponse(res, req, 200, {
				__typename: response.__typename,
				success: true,
				message: "Login success",
				data: response,
			});
		})
	);

	return router;
};

export const loginRoute = initializeRouter();
