import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import roomReducer from "../slice/roomSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		rooms: roomReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
