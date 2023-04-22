import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfo } from "@common";
import { deleteToken, saveToken } from "../utilities/storage";
import { getUserInfo, login } from "../api/user";

export type Status = "idle" | "loading" | "failed";

export interface UserState {
	userInfo: UserInfo | undefined;
	status: Status;
	error?: string;
}

const initialState: UserState = {
	userInfo: undefined,
	status: "idle",
};

export const authUserAsync = createAsyncThunk(
	"user/auth",
	async (params: { username: string; password?: string }) => {
		const { username, password } = params;
		const token = await login(username, password);
		saveToken(token);
		return await getUserInfo(token);
	}
);

export const authTokenAsync = createAsyncThunk(
	"user/authToken",
	async (params: { token: string }) => {
		const { token } = params;
		return await getUserInfo(token);
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
			.addCase(authUserAsync.pending, (state) => {
				state.status = "loading";
				state.userInfo = undefined;
				state.error = "";
				deleteToken();
			})
			.addCase(authUserAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.userInfo = action.payload;
				state.error = "";
			})
			.addCase(authUserAsync.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message?.includes("404")
					? "Username or password invalid."
					: action.error.message;

				deleteToken();
			})
			.addCase(authTokenAsync.pending, (state) => {
				state.status = "loading";
				state.error = "";
			})
			.addCase(authTokenAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.userInfo = action.payload;
				state.error = "";
			})
			.addCase(authTokenAsync.rejected, (state, action) => {
				state.status = "failed";
				state.userInfo = undefined;
				state.error = action.error.message?.includes("404")
					? "Token expired or invalid."
					: action.error.message;
				deleteToken();
			});
	},
});

export const { logout } = userSlice.actions;

export const getUserState = (state: RootState): UserState => state.user;

export default userSlice.reducer;
