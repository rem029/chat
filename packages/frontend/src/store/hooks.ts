import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { CounterState } from "slice/temp_counterSlice";
import { Dispatch } from "react";

type UseAppDispatchReturn = () => ThunkDispatch<
	{
		counter: CounterState;
	},
	undefined,
	AnyAction
> &
	Dispatch<AnyAction>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: UseAppDispatchReturn = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
