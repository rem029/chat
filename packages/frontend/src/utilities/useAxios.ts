import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
	__typename?: string;
	success: boolean;
	data: T | undefined;
	message: string;
	axiosError?: AxiosError;
}

export const useAxios = <DT>(
	url: string,
	config?: AxiosRequestConfig,
	onAuthError?: () => void,
	// eslint-disable-next-line no-unused-vars
	onNotify?: (_message: string, _type: "error" | "warn" | "info") => void
): {
	data: DT | undefined;
	error: AxiosError | undefined;
	message: string;
	success: boolean;
	loading: boolean;
	config: AxiosRequestConfig | undefined;
	// eslint-disable-next-line no-unused-vars
	fetch: (config?: AxiosRequestConfig) => Promise<FetchResponse<DT>>;
	fetchCancel: () => void;
} => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<DT | undefined>(undefined);
	const [message, setMessage] = useState("");
	const [error, setError] = useState<AxiosError | undefined>(undefined);
	const [success, setSuccess] = useState(false);

	const axiosConfig = useMemo(() => {
		return config;
	}, [config]);

	const [axiosController, setAxiosController] = useState<AbortController>();

	useEffect(() => {
		if ((axiosConfig && axiosConfig?.method === "get") || axiosConfig?.method === "GET") {
			fetch();
		}
	}, []);

	const resetState = (): void => {
		setLoading(false);
		setData(undefined);
		setSuccess(false);
		setMessage("");
		setError(undefined);
	};

	const fetchCancel = (): void => {
		if (axiosController) axiosController.abort();
	};

	const fetch = async (config?: AxiosRequestConfig): Promise<FetchResponse<DT>> => {
		const controller = new AbortController();
		const configMerged = {
			...axiosConfig,
			...config,
			signal: controller.signal,
		} as AxiosRequestConfig;
		setAxiosController(controller);
		const request = axios.create(configMerged);

		try {
			resetState();
			setLoading(true);

			const response = await request(url);
			setLoading(false);
			setData(response.data.data ? response.data.data : response.data);
			setMessage(response.data.message ? response.data.message : response.statusText);
			setSuccess(true);

			return {
				data: response.data.data ? response.data.data : response.data,
				message: response.data.message ? response.data.message : response.statusText,
				axiosError: undefined,
				success: true,
			};
		} catch (error) {
			const axiosError = error as AxiosError<FetchResponse<DT>, never>;

			if (axiosError) {
				if (onNotify) onNotify(axiosError.response?.data.message as string, "error");

				if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
					if (onNotify) onNotify("Unauthorized request.", "error");
					if (onAuthError) onAuthError();

					resetState();
				}

				setData(axiosError.response?.data.data as DT | undefined);
				setSuccess(false);
				setMessage(axiosError.response?.data.message || axiosError.message);
				setError(axiosError);
				setLoading(false);

				return {
					data: undefined,
					message: axiosError.response?.data.message || axiosError.message,
					axiosError: axiosError,
					success: false,
				};
			}
		}

		return {
			data: data as DT | undefined,
			message: message,
			axiosError: undefined,
			success: success,
		};
	};

	return {
		success,
		loading,
		data,
		error,
		message,
		config: axiosConfig,
		fetch,
		fetchCancel,
	};
};
