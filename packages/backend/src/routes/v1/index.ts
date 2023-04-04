import { Router } from "express";

import { loginRoute } from "./loginRoutes";
import { userRoutes } from "./usersRoutes";
import { miscRoutes } from "./miscRoutes";
import { messageRoutes } from "./messageRoutes";

const initializeIndexRouter = (): Router => {
	const router = Router();
	router.use("/", miscRoutes);
	router.use("/login", loginRoute);
	router.use("/users", userRoutes);
	router.use("/messages", messageRoutes);

	return router;
};

export const v1Router = initializeIndexRouter();
