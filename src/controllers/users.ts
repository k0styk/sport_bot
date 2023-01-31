import TelegramBot from 'node-telegram-bot-api';
import { botError } from '@/handlers';

import Users from '@/models/users';

export const UsersController = {
	async firstOrCreate(tgUser?: TelegramBot.User) {
		try {
			if (tgUser) {
				await Users.firstOrCreate(tgUser);

				return true;
			}

			return false;
		} catch (error) {
			botError(error as Error);
		}
	},
};
