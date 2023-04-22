import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Room } from "@common";
import { getAllRooms } from "../api/room";

export type Status = "idle" | "loading" | "failed";

export interface RoomState {
	rooms: Room[] | undefined;
	status: Status;
	error?: string;
}

const initialState: RoomState = {
	rooms: undefined,
	status: "idle",
};

export const getAllRoomAsync = createAsyncThunk("rooms/get", async (token: string) => {
	return getAllRooms(token);
});

export const roomSlice = createSlice({
	name: "rooms",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllRoomAsync.pending, (state) => {
				state.status = "loading";
				state.rooms = undefined;
				state.error = "";
			})
			.addCase(getAllRoomAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.rooms = action.payload;
				state.error = "";
			})
			.addCase(getAllRoomAsync.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message?.includes("404")
					? "Username or password invalid."
					: action.error.message;
			});
	},
});

export const getRoomState = (state: RootState): RoomState => state.rooms;

export default roomSlice.reducer;
