/*
 * Handle start command
 */
import TelegramBot, { Message } from 'node-telegram-bot-api';
// const User = require("../models/user");

export const stop = (bot: TelegramBot) => async (message: Message) => {
	const chatId = message.chat.id;

	try {
		// if (messages.id) await bot.stopPoll(chatId, messages.id);
	} catch (error) {
		// errorHandler(bot, chatId, error);
	}
};
