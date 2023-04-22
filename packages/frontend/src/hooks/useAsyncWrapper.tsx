/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

export type AsyncFn<T, P extends any[]> = (...args: P) => Promise<T | undefined>;

export type useAxiosReturn<T, P extends any[]> = [
	{
		loading: boolean;
		error?: Error;
		data?: T;
	},
	AsyncFn<T, P>
];

export const useAsyncWrapper = <T, P extends any[]>(
	asyncFn: AsyncFn<T, P>
): useAxiosReturn<T, P> => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error>();
	const [data, setData] = useState<T>();

	const resetState = (): void => {
		setLoading(false);
		setError(undefined);
		setData(undefined);
	};

	const fetch = async (...args: P): Promise<T | undefined> => {
		try {
			resetState();
			setLoading(true);

			const response = await asyncFn(...args);

			setData(response as T);
			return response as T;
		} catch (error) {
			setError(error as Error);
			return undefined;
		} finally {
			setLoading(false);
		}
	};

	return [{ loading, data, error }, fetch];
};
