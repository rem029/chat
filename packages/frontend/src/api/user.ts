import { UserInfo } from "@common";
import axios from "axios";
import { URL_LOGIN, URL_USER_INFO } from "../utilities/constant";
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

export const login = async (username: string, password: string): Promise<string> => {
	const tokenResponse = await axios(URL_LOGIN, {
		method: "POST",
		headers: {
			Authorization: `Basic ${Buffer.from(username + ":" + password).toString("base64")}`,
		},
	});

	return tokenResponse.data.data.token;
};
