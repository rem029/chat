import express, { Express } from "express";
import cors from "cors";

import { v1Router } from "routes/v1";
import { RequestWithMetrics } from "interfaces";
import { errorHandler } from "handlers";

const initializeExpress = (): Express => {
	const app = express();

	const corsOptions = {
		origin: "*",
		optionsSuccessStatus: 200,
	};

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cors(corsOptions));

	const startDate = new Date();

	app.all("*", (req: RequestWithMetrics, _, next) => {
		req.startTime = new Date(new Date().getTime());
		req.startDate = startDate;
		next();
	});

	app.use("/v1", v1Router);
	app.use(errorHandler);

	return app;
};

export const app = initializeExpress();
