/*
 * Handle users command
 */
import TelegramBot, { Message } from 'node-telegram-bot-api';

export const users = (bot: TelegramBot) => async (message: Message) => {
	const chatId = message.chat.id;
	try {
		bot.sendChatAction(chatId, 'typing');
		// Activate / create a new user
		// const tgUser = message.from;
		// const user = await User.firstOrCreate(tgUser);
		// if (user.status === "blocked") {
		// 	user.status = "active";
		// 	await user.save();
		// }

		await bot.sendMessage(chatId, 'Users');
	} catch (error) {
		// errorHandler(bot, chatId, error);
	}
};
