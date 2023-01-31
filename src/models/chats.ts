import { Chat, ChatPhoto } from 'node-telegram-bot-api';
import mongoose, { Schema, Document } from 'mongoose';

export interface IChatsModel extends Chat, Omit<Document, 'id'> {}

const ChatPhotoShema = new Schema<ChatPhoto>({
	small_file_id: String,
	big_file_id: String,
});

export const ChatsSchema = new Schema<IChatsModel>(
	{
		id: { type: Number, required: true, unique: true },
		type: {
			type: String,
			required: true,
			enum: ['private', 'group', 'supergroup', 'channel'],
		},
		title: String,
		username: String,
		first_name: String,
		last_name: String,
		photo: ChatPhotoShema,
		description: String,
	},
	{ timestamps: true, versionKey: false }
);

const ChatsModel = mongoose.model<IChatsModel>('Chats', ChatsSchema);
export default ChatsModel;
