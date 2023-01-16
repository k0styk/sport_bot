/*
 * Handle start command
 */
import TelegramBot, { Message } from 'node-telegram-bot-api';
// const User = require("../models/user");

export const start = (bot: TelegramBot) => async (message: Message) => {
	const chatId = message.chat.id;
	// console.log(message);
	try {
		bot.sendChatAction(chatId, 'typing');
		// Activate / create a new user
		// const tgUser = message.from;
		// const user = await User.firstOrCreate(tgUser);
		// if (user.status === "blocked") {
		// 	user.status = "active";
		// 	await user.save();
		// }

		await bot.sendMessage(chatId, 'Hello');
		const msg = await bot.sendPoll(chatId, 'Football?', ['+', '-'], {
			is_anonymous: false,
			type: 'quiz',
			correct_option_id: 0,
		});

		// console.log(msg);
		// await bot.stopPoll(chatId)
	} catch (error) {
		// errorHandler(bot, chatId, error);
	}
};

/*

//! chat
{
  message_id: 8,
  from: {
    id: 133066125,
    is_bot: false,
    first_name: 'kostyk',
    last_name: '_',
    username: 'kostyk',
    language_code: 'ru'
  },
  chat: {
    id: -816762711,
    title: 'Test polls',
    type: 'group',
    all_members_are_administrators: true
  },
  date: 1673303259,
  text: '/start',
  entities: [ { offset: 0, length: 6, type: 'bot_command' } ]
}


//! LS
{
  message_id: 10,
  from: {
    id: 133066125,
    is_bot: false,
    first_name: 'kostyk',
    last_name: '_',
    username: 'kostyk',
    language_code: 'ru'
  },
  chat: {
    id: 133066125,
    first_name: 'kostyk',
    last_name: '_',
    username: 'kostyk',
    type: 'private'
  },
  date: 1673303308,
  text: '/start',
  entities: [ { offset: 0, length: 6, type: 'bot_command' } ]
}

*/
