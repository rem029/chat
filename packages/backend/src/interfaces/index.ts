import { UserInfo } from "@common";
import { Request } from "express";
import { Socket } from "socket.io";

export interface RequestWithMetrics extends Request {
	startDate?: Date;
	startTime?: Date;
	endTime?: Date;
}
export interface RequestAuthInterface extends RequestWithMetrics {
	user?: UserInfo;
}

export interface SocketAuthInterface extends Socket {
	user?: UserInfo;
}

export type SocketNext = (err?: ErrorServer) => void;

export interface ResponseInterface<T> {
	__typename?: string;
	success: boolean;
	message: string;
	data?: T;
	errorMessage?: string;
}

export class ErrorServer extends Error {
	public statusCode;
	constructor(code: number, message: string) {
		super(message);
		this.statusCode = code;
		// 👇️ because we are extending a built-in class
		Object.setPrototypeOf(this, ErrorServer.prototype);
	}
}
