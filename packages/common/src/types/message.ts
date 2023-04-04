export interface Message {
	__typename?: "Message";
	id?: number;
	room_id: number;
	user_id: number;
	message: string;
	created_at?: Date;
	updated_at?: Date;
}
