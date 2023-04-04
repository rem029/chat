import "dotenv/config";
import { httpServer } from "services/server";
import { configs } from "configs";
import { logger } from "utilities/logger";
import { initializeSocketIO } from "services/socket";
import { DEFAULT_CONNECTION_CONFIG } from "./services/database";

const port = configs.port;

initializeSocketIO(httpServer);

httpServer.listen(port, () => {
	logger.info("Server running on port:" + port);
	logger.info("Server running in mode: " + process.env.NODE_ENV);

	if (process.env.NODE_ENV !== "production")
		logger.info("Database config: " + JSON.stringify(DEFAULT_CONNECTION_CONFIG));
});
