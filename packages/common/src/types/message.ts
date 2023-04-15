export interface Message {
	__typename?: "Message";
	id?: number;
	room_id: number;
	user_id: number;
	user_email?: string;
	message: string;
	created_at?: Date;
	updated_at?: Date;
}
