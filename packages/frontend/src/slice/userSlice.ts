import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfo } from "@chat/common";
import { deleteToken, getToken, saveToken } from "utilities/storage";
import axios from "axios";
import { URL_LOGIN, URL_USER_INFO } from "utilities/constant";
import { Buffer } from "buffer";

export type Status = "idle" | "loading" | "failed";

export interface UserState {
	userInfo: UserInfo | undefined;
	status: Status;
	error?: string;
}

const initialState: UserState = {
	userInfo: {} as UserInfo,
	status: "idle",
};

export const loginAsync = createAsyncThunk(
	"user/login",
	async (params: { username: string; password: string }) => {
		const { username, password } = params;

		const tokenResponse = await axios(URL_LOGIN, {
			method: "POST",
			headers: {
				Authorization: `Basic ${Buffer.from(username + ":" + password).toString(
					"base64"
				)}`,
			},
		});

		saveToken(tokenResponse.data.data.token);
		const token = getToken();

		console.log("token", token);

		const userInfoResponse = await axios(URL_USER_INFO, {
			method: "GET",
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		console.log("userInfoResponse", userInfoResponse);

		return userInfoResponse.data.data as UserInfo;
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.userInfo = initialState.userInfo;
			deleteToken();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginAsync.pending, (state) => {
				state.status = "loading";
				state.error = "";
			})
			.addCase(loginAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.userInfo = action.payload;
				state.error = "";
			})
			.addCase(loginAsync.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { logout } = userSlice.actions;

export const getUserState = (state: RootState): UserState => state.user;

export default userSlice.reducer;
