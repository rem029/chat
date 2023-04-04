import { knexPostgres } from "../services/database";
import { logger } from "../utilities/logger";
import { Message } from "@chat/common";

const tableName = "common.messages";

export const createMessage = async (message: Message): Promise<number> => {
	logger.info("messageController.createMessage");
	const { rows } = await knexPostgres.raw("INSERT INTO ?? (room_id,user_id,message) VALUES (?, ?, ?) RETURNING id", [
		tableName,
		message.room_id,
		message.user_id,
		message.message,
	]);

	return rows[0].id;
};

// Read all messages
export const getAllMessages = async (): Promise<Message[]> => {
	logger.info("messageController.getAllMessages");
	const results = await knexPostgres.raw("SELECT * FROM ??", [tableName]);
	return results.rows;
};

// Read all messages by room ID
export const getAllMessagesByRoomID = async (roomID: number): Promise<Message[]> => {
	logger.info("messageController.getAllMessagesByRoomID");
	const results = await knexPostgres.raw("SELECT * FROM ?? WHERE room_id = ? ORDER BY created_at DESC LIMIT 50", [
		tableName,
		roomID,
	]);
	return results.rows;
};

// Read a single message by ID
export const getMessageById = async (id: number): Promise<Message | null> => {
	logger.info("messageController.getMessageById");
	const [result] = await knexPostgres.raw("SELECT * FROM ?? WHERE id = ?", [tableName, id]);
	return result || null;
};

// Update a message by ID
export const updateMessageById = async (id: number, message: Message): Promise<boolean> => {
	logger.info("messageController.updateMessageById");
	const result = await knexPostgres.raw("UPDATE ?? SET message = ?, updated_at = NOW() WHERE id = ?", [
		tableName,
		message.message,
		id,
	]);
	return result.rowCount === 1;
};

// Delete a message by ID
export const deleteMessageById = async (id: number): Promise<boolean> => {
	logger.info("messageController.deleteMessageById");
	const result = await knexPostgres.raw("DELETE FROM ?? WHERE id = ?", [tableName, id]);
	return result.rowCount === 1;
};
