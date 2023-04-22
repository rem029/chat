import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "utilities/logger";
import { UserInfo, Token } from "common";
import { ErrorServer, RequestAuthInterface, SocketAuthInterface, SocketNext } from "interfaces/index";

export const generateAccessToken = (payload: object, expiresIn = "24h"): Token => {
	logger.info(`@generateAccessToken ${payload}`);
	return {
		token: jwt.sign(payload, process.env.API_TOKEN_SECRET as jwt.Secret, {
			expiresIn: expiresIn,
		}),
		expiresIn,
	};
};

export const generateRefreshToken = (payload: object, expiresIn = "1y"): Token => {
	return {
		token: jwt.sign(payload, process.env.API_TOKEN_REFRESH as jwt.Secret, {
			expiresIn: expiresIn,
		}),
		expiresIn,
	};
};

export const decodeToken = (token: string): UserInfo =>
	jwt.verify(token, process.env.API_TOKEN_SECRET as jwt.Secret) as UserInfo;

export const authenticateTokenRoute = (req: RequestAuthInterface, _res: Response, next: NextFunction): void => {
	logger.info("@middleware authenticateToken");

	try {
		const tokenFromHeader = req.headers["authorization"];
		const token = tokenFromHeader && tokenFromHeader.split(" ")[1];

		if (!token) throw new ErrorServer(403, "A token is required for authentication.");

		const decodedUser = decodeToken(token);
		logger.info(`@middleware authenticateToken decoded userId: ${decodedUser.email}`);
		req.user = decodedUser;
		next();
	} catch (error) {
		logger.error(`@middleware authenticateToken error: ${JSON.stringify(error)}`);
		next(new ErrorServer(401, "Token has expired or invalid."));
	}
};

export const authenticateTokenSocket = (socket: SocketAuthInterface, next: SocketNext): void => {
	logger.info("@middleware authenticateTokenSocket");

	try {
		const token = socket.handshake.auth.token;

		if (!token) throw new ErrorServer(403, "A token is required for authentication.");

		const decodedUser = decodeToken(token);
		socket.user = decodedUser;
		next();
	} catch (error) {
		logger.error(`@middleware authenticateTokenSocket error: ${JSON.stringify(error)}`);
		next(new ErrorServer(401, "Token has expired or invalid."));
	}
};
