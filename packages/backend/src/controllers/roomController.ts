import { knexPostgres } from "services/database";
import { logger } from "utilities/logger";
import { Room } from "common";

const tableName = "common.rooms";

// Create a new room
export const createRoom = async (room: Room): Promise<void> => {
	logger.info("roomController.createRoom");
	await knexPostgres.raw("INSERT INTO ?? (name, created_at, updated_at) VALUES (?, ?, ?)", [
		tableName,
		room.name,
		room.created_at,
		room.updated_at,
	]);
};

// Get all rooms
export const getAllRooms = async (): Promise<Room[]> => {
	logger.info("roomController.getAllRooms");
	const result = await knexPostgres.raw("SELECT * FROM ??", [tableName]);
	return result.rows;
};

// Get a single room by ID
export const getRoomById = async (id: number): Promise<Room> => {
	logger.info("roomController.getRoomById");
	const result = await knexPostgres.raw("SELECT * FROM ?? WHERE id = ?", [tableName, id]);
	return result.rows[0];
};

// Update a room by ID
export const updateRoomById = async (id: number, room: Room): Promise<void> => {
	logger.info("roomController.updateRoomById");
	await knexPostgres.raw("UPDATE ?? SET name = ?, updated_at = NOW() WHERE id = ?", [
		tableName,
		room.name,
		room.updated_at,
		id,
	]);
};

// Delete a room by ID
export const deleteRoomById = async (id: number): Promise<void> => {
	logger.info("roomController.deleteRoomById");
	await knexPostgres.raw("DELETE FROM ?? WHERE id = ?", [tableName, id]);
};
