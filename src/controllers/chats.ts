import TelegramBot from 'node-telegram-bot-api';
import { botError } from '@/handlers';

import Chats from '@/models/chats';

export const ChatsController = {
	async create(chat: TelegramBot.Chat) {
		try {
			if (chat.type === 'group') {
				const candidate = await Chats.findOne({ id: chat.id });
				if (candidate) return;
				await Chats.create(chat);
			}
		} catch (error) {
			botError(error as Error);
		}
	},
};
