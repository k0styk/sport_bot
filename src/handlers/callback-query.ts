import TelegramBot, { CallbackQuery } from 'node-telegram-bot-api';

export const callbackQuery =
	(bot: TelegramBot) => async (cbq: CallbackQuery) => {
		const message = cbq.message;
		// const chatId = message.chat.id;

		try {
			bot.answerCallbackQuery(cbq.id);
			if (cbq.message)
				await bot.sendMessage(
					cbq.message?.chat.id,
					'\u{1F6A7} This feature is not available yet.'
				);
		} catch (error) {
			// errorHandler(bot, chatId, error);
		}
	};
