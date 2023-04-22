import { Room } from "@common";
import axios from "axios";
import { URL_ROOMS } from "../utilities/constant";

export const getAllRooms = async (token: string): Promise<Room[]> => {
	const response = await axios(URL_ROOMS, {
		method: "GET",
		headers: {
			Authorization: `Token ${token}`,
		},
	});

	return response.data.data as Room[];
};
