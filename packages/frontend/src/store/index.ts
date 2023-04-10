import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../slice/temp_counterSlice";
import userReducer from "slice/userSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		user: userReducer,
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
