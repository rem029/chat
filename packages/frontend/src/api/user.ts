import { UserInfo } from "@common";
import axios from "axios";
import {
	URL_LOGIN,
	URL_USER_CHECK,
	URL_USER_CREATE,
	URL_USER_INFO,
} from "utilities/constant";
import { Buffer } from "buffer";

export const getUserInfo = async (token: string): Promise<UserInfo> => {
	const userInfoResponse = await axios(URL_USER_INFO, {
		method: "GET",
		headers: {
			Authorization: `Token ${token}`,
		},
	});

	return userInfoResponse.data.data as UserInfo;
};

export const login = async (username: string, password?: string): Promise<string> => {
	const tokenResponse = await axios(URL_LOGIN, {
		method: "POST",
		headers: {
			Authorization: `Basic ${Buffer.from(username + ":" + password).toString("base64")}`,
		},
	});

	return tokenResponse.data.data.token;
};

export const createUser = async (
	username: string,
	password?: string
): Promise<UserInfo> => {
	const response = await axios(URL_USER_CREATE, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-type": "application/json",
			data: JSON.stringify({ username, password }),
		},
	});

	return response.data.data;
};

export const checkUserName = async (username: string): Promise<boolean> => {
	const response = await axios(URL_USER_CHECK + "/" + username, {
		method: "GET",
	});

	return response.data.data;
};
