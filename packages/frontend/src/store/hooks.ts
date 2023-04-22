import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { UserState } from "../slice/userSlice";
import { RoomState } from "../slice/roomSlice";
import { Dispatch } from "react";

type UseAppDispatchReturn = () => ThunkDispatch<
	{
		user: UserState;
		rooms: RoomState;
	},
	undefined,
	AnyAction
> &
	Dispatch<AnyAction>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: UseAppDispatchReturn = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
