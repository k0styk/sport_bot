import TelegramBot, { Message } from 'node-telegram-bot-api';

import { errorHandler } from '@/handlers/error-handler';

/*
 * Handle getChat command
 */
export const getChat =
	(bot: TelegramBot) =>
	async (message: Message, match: RegExpExecArray | null) => {
		const chatId = message.chat.id;

		bot.getChat(-816762711).then((res) => console.log(res, '\n-----------\n'));
		bot
			.getChatAdministrators(-816762711)
			.then((res) => console.log(res, '\n-----------\n'));
		bot
			.getChatMember(-816762711, '133066125')
			.then((res) => console.log(res, '\n-----------\n'));
		bot
			.getChatMember(-816762711, '1006062356')
			.then((res) => console.log(res, '\n-----------\n'));
		// console.log('Match get chat');
		// console.log(match);
		// console.log(match[1]);
		// console.log(message);
		try {
			// bot.sendChatAction(chatId, 'typing');
			// Activate / create a new user
			// const tgUser = message.from;
			// const user = await User.firstOrCreate(tgUser);
			// if (user.status === "blocked") {
			// 	user.status = "active";
			// 	await user.save();
			// }
			// await bot.sendMessage(chatId, 'Hello');
			// const msg = await bot.sendPoll(chatId, 'Football?', ['+', '-'], {
			// 	is_anonymous: false,
			// 	type: 'quiz',
			// 	correct_option_id: 0,
			// });
			// console.log(msg);
			// await bot.stopPoll(chatId)
		} catch (error) {
			errorHandler(bot, chatId, error);
		}
	};
